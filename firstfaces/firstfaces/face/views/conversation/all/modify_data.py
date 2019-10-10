import json
import time
from django.utils import timezone

def jsonify_or_none(item_from_db):

    if item_from_db != None:
        return json.loads(item_from_db)
    else:
        return None

def floatify( decimal_from_db ):

    if decimal_from_db != None:
        return float(decimal_from_db)
    else:
        return None

def int_time_or_none( timestamp_from_db ):

    if timestamp_from_db != None:
        return int(time.mktime(timezone.localtime(timestamp_from_db).timetuple())) * 1000
    else:
        return None


