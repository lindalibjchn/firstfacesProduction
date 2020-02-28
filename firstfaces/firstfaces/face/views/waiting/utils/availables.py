from face.models import Available, Sentence, Conversation, Profile
from django.contrib.auth.models import User
from django.conf import settings
import datetime
import time
from django.utils import timezone
from operator import itemgetter
import math
import json
from django.forms.models import model_to_dict
from google.cloud import texttospeech
import os

def get_availables_for_schedule(groups):
    
    this_weeks_dates = get_this_weeks_dates()

    # get all availables in this period
    this_weeks_availables = Available.objects.filter( avail_group__name__in=groups).filter( start_availability__gte=this_weeks_dates[ 0 ] ).filter( end_availability__lte=this_weeks_dates[ 1 ] ).order_by('end_availability') 
    print('this weeks availables: ', this_weeks_availables)

    return this_weeks_availables

def get_this_weeks_dates():

    days_add_minus = {

            'Sat': [0,7],
            'Sun': [0,6],
            'Mon': [-1,5],
            'Tue': [-2,4],
            'Wed': [-3,3],
            'Thu': [-4,2],
            'Fri': [-5,1]

    }

    todays_date = timezone.localtime().date()
    todays_day = todays_date.strftime("%a")
    today = timezone.localtime()
    date_mon = today + datetime.timedelta( days_add_minus[ todays_day ][ 0 ] )
    date_fri = today + datetime.timedelta( days_add_minus[ todays_day ][ 1 ] )

    return [ date_mon, date_fri ]



days_nums = {
                
    'Sat': -1,
    'Sun': -1,
    'Mon': 0,
    'Tue': 1,
    'Wed': 2,
    'Thu': 3,
    'Fri': 4

}

def create_list_of_javascript_available_times_from_django_objects( availables_q_set ):

    j_available_times = []
    
    for a in availables_q_set:
        print('a:', a)
        start_end_tuple = []
        start_end_tuple.append(convert_django_time_to_javascript(a.start_availability))
        start_end_tuple.append(convert_django_time_to_javascript(a.end_availability))
        j_available_times.append(start_end_tuple)

    return j_available_times

def convert_django_time_to_javascript(t):
    
    return int(time.mktime((t).timetuple()) * 1000 + 3600000 )

def check_if_currently_in_class_or_class_finished(u):

    conversations = Conversation.objects.filter(learner=u).order_by('start_time')
    todays_date = timezone.localtime().date()
    time_now = timezone.now()
    time_now_minus_30_mins = time_now - datetime.timedelta(minutes=45) #changed this cause 30 is too short

    currently_in_class = False
    class_finished_today = False

    if len(conversations) != 0:

        # close all conversations that are tutorials or over 30 mins
        for c in conversations:

            if c.end_time == None:

                if c.topic == 'tutorial' or c.start_time < time_now_minus_30_mins:

                    c.end_time = time_now
                    c.save()

                else:

                    currently_in_class = True

            if c.end_time != None:

                if c.end_time.date() == todays_date:

                    class_finished_today = True

    return [currently_in_class, class_finished_today]

# for schedule board in waiting views
def make_schedule_dict( availables ):

    # my teaching timetable starts at this time
    zero_hour = 8

    # 0, 1, 2... are Mon, Tue, Wed.. for x-axis
    # in list are y-axis top and bottom of block
    schedule_dict_prot = {

            0: [],
            1: [],
            2: [],
            3: [],
            4: []

    }

    day_now = timezone.now().strftime("%a")
    hour_now = int(timezone.localtime().strftime("%H"))
    min_now = int(timezone.localtime().strftime("%M"))

    line_now = [days_nums[ day_now ], round(hour_now - zero_hour + min_now / 60 , 1)]

    for a in availables:

        start_hour = int(timezone.localtime(a.start_availability).strftime("%H"))
        start_min = int(timezone.localtime(a.start_availability).strftime("%M"))
        end_hour = int(timezone.localtime(a.end_availability).strftime("%H"))
        end_min = int(timezone.localtime(a.end_availability).strftime("%M"))

        decimal_start = round(start_hour - zero_hour + start_min / 60, 1)
        decimal_end = round(end_hour - zero_hour + end_min / 60, 1)

        if decimal_start != decimal_end:
            schedule_dict_prot[ days_nums[ a.start_availability.strftime("%a") ] ].append( [decimal_start, decimal_end] )

    return schedule_dict_prot, line_now

def get_upcoming_class( availables ):

    """
    gets next available and next available at another day incase the student has already finished one class
    """

    time_now = timezone.now()
    todays_date = time_now.date()

    next_class = None;
    next_class_after_today = None;

    for a in availables:

        if a.start_availability > time_now:

            if next_class != None:

                if a.start_availability < next_class.start_availability:

                    next_class = a

            else:

                next_class = a
        
            if next_class_after_today != None:

                if a.start_availability.date() > todays_date:

                    if a.start_availability < next_class_after_today.start_availability:

                        next_class_after_today = a

                    else:

                        next_class_after_today = a
        
    if next_class != None:

        next_class = timezone.localtime(next_class.start_availability).strftime("%A %H:%M")

    else:

        next_class = "No Classes"

    if next_class_after_today != None:

        next_class_after_today = timezone.localtime(next_class_after_today.start_availability).strftime("%A %H:%M")

    else:

        next_class_after_today = "No Classes"

    return next_class, next_class_after_today
