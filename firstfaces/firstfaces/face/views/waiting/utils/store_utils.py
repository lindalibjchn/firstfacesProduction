from django.http import JsonResponse
from django.conf import settings
from face.models import TiaAttributes, BackgroundColour, HairColour, UserProducts, Profile, ClothesColour, EyeTypes, BackgroundGIF, Conversation,Sentence
import json
import time
import math
from face.views.waiting.utils.store import eye_to_html, eye_to_json, background_to_html, gif_to_html, background_to_json, clothes_to_html, hair_to_html, hair_to_json


def get_eye_colors(user):
    bcs = EyeTypes.objects.all()
    owned = [f[1:-1] for f in UserProducts.objects.filter(learner=user)[0].EyeTypes[1:-1].split(",") if
             f.strip() != ""]
    balance = Profile.objects.filter(learner=user)[0].points
    attr = TiaAttributes.objects.filter(learner=user)[0]
    out = {}
    for bc in bcs:
        if str(bc.pk) in owned:
            if attr.eyeColour == str(bc.pk):
                html = eye_to_html("owned equipped", bc.price, bc.filename, bc.pk)
                out[bc.pk] = eye_to_json("owned", bc.name, bc.price, bc.hex, html, bc.filename)
            else:
                html = eye_to_html("owned", bc.price, bc.filename, bc.pk)
                out[bc.pk] = eye_to_json("owned", bc.name, bc.price, bc.hex, html, bc.filename)
        elif bc.price > balance:
            html = eye_to_html("locked", bc.price, bc.filename, bc.pk)
            out[bc.pk] = eye_to_json("locked", bc.name, bc.price, bc.hex, html, bc.filename)
        else:
            html = eye_to_html("affordable", bc.price, bc.filename, bc.pk)
            out[bc.pk] = eye_to_json("affordable", bc.name, bc.price, bc.hex, html, bc.filename)
    final = {"colours": out}

    return final


def get_attributes(user):
    try:
        attr = TiaAttributes.objects.get(learner=user)
    except:
        attr = create_default_attributes(user)
    hc = HairColour.objects.get(pk=attr.hairColour)
    cc = ClothesColour.objects.get(pk=attr.clothesColour)
    bc = BackgroundColour.objects.get(pk=attr.backgroundColour)
    if attr.color_background:
        gif = attr.gif_background
    else:
        gif = None

    response_data = {
        'BC': bc.hex,
        'BC_id': bc.pk,
        'HC_id': hc.pk,
        "HairC": hc.hair_hex,
        "BrowC": hc.brow_hex,
        "CC_id": cc.pk,
        "CC": cc.hex,
        'eyes': attr.eyeColour,
        "gif_bool": attr.color_background,
        "gif": gif,
    }

    return response_data


def create_default_attributes(user):
    # Create user products
    up = UserProducts(learner=user, backgroundColours='["1"]', hairColours='["1"]',
                      clothesColour='["1"]', EyeTypes='["1"]', gif_backgrounds='[]')
    up.save()

    # Create tia attributes
    ta = TiaAttributes(learner=user, backgroundColour=1, hairColour=1, clothesColour=1, eyeColour=1,
                       color_background=True)
    ta.save()
    return ta


def get_background_colors(user):
    bcs = BackgroundColour.objects.all()
    gifs = BackgroundGIF.objects.all()
    user_products = UserProducts.objects.filter(learner=user)[0]

    backgrounds = {}
    owned = [f[1:-1] for f in user_products.backgroundColours[1:-1].split(",") if
             f.strip() != ""]
    balance = Profile.objects.filter(learner=user)[0].points
    attr = TiaAttributes.objects.filter(learner=user)[0]
    gif_bool = attr.color_background
    out = {}
    for bc in bcs:
        if str(bc.pk) in owned:
            if attr.backgroundColour == str(bc.pk) and gif_bool:
                html = background_to_html("owned equipped", bc.price, bc.hex, bc.pk)
                out[bc.pk] = background_to_json("owned", bc.name, bc.price, bc.hex, html)
            else:
                html = background_to_html("owned", bc.price, bc.hex, bc.pk)
                out[bc.pk] = background_to_json("owned", bc.name, bc.price, bc.hex, html)
        elif bc.price > balance:
            html = background_to_html("locked", bc.price, bc.hex, bc.pk)
            out[bc.pk] = background_to_json("locked", bc.name, bc.price, bc.hex, html)
        else:
            html = background_to_html("affordable", bc.price, bc.hex, bc.pk)
            out[bc.pk] = background_to_json("affordable", bc.name, bc.price, bc.hex, html)
    backgrounds['colours'] = out

    gifs_out = {}
    owned = [f[1:-1] for f in user_products.gif_backgrounds[1:-1].split(",") if
             f.strip() != ""]
    for g in gifs:
        if str(g.pk) in owned:
            if attr.gif_background == str(g.pk) and not attr.color_background:
                html = gif_to_html("owned equipped", g.price, g.filename, g.pk)
                gifs_out[g.pk] = eye_to_json("owned", g.name, g.price, g.hex, html, g.filename)
            else:
                html = gif_to_html("owned", g.price, g.filename, g.pk)
                gifs_out[g.pk] = eye_to_json("owned", g.name, g.price, g.hex, html, g.filename)
        elif g.price > balance:
            html = gif_to_html("locked", g.price, g.filename, g.pk)
            gifs_out[g.pk] = eye_to_json("locked", g.name, g.price, g.hex, html, g.filename)
        else:
            html = gif_to_html("affordable", g.price, g.filename, g.pk)
            gifs_out[g.pk] = eye_to_json("affordable", g.name, g.price, g.hex, html, g.filename)

    backgrounds['gifs'] = gifs_out


    return backgrounds


def get_clothes_colors(user):
    bcs = ClothesColour.objects.all()
    owned = [f[1:-1] for f in UserProducts.objects.filter(learner=user)[0].clothesColour[1:-1].split(",") if
             f.strip() != ""]
    balance = Profile.objects.filter(learner=user)[0].points
    attr = TiaAttributes.objects.filter(learner=user)[0]
    out = {}
    for bc in bcs:
        if str(bc.pk) in owned:
            if attr.clothesColour == str(bc.pk):
                html = clothes_to_html("owned equipped", bc.price, bc.hex, bc.pk)
                out[bc.pk] = background_to_json("owned", bc.name, bc.price, bc.hex, html)
            else:
                html = clothes_to_html("owned", bc.price, bc.hex, bc.pk)
                out[bc.pk] = background_to_json("owned", bc.name, bc.price, bc.hex, html)
        elif bc.price > balance:
            html = clothes_to_html("locked", bc.price, bc.hex, bc.pk)
            out[bc.pk] = background_to_json("locked", bc.name, bc.price, bc.hex, html)
        else:
            html = clothes_to_html("affordable", bc.price, bc.hex, bc.pk)
            out[bc.pk] = background_to_json("affordable", bc.name, bc.price, bc.hex, html)
    final = {"colours": out}

    return final


def get_hair_colors(user):
    hcs = HairColour.objects.all()
    owned = [f[1:-1] for f in UserProducts.objects.filter(learner=user)[0].hairColours[1:-1].split(",") if
             f.strip() != ""]
    balance = Profile.objects.filter(learner=user)[0].points
    attr = TiaAttributes.objects.filter(learner=user)[0]
    out = {}
    for hc in hcs:
        if str(hc.pk) in owned:
            if attr.hairColour == str(hc.pk):
                html = hair_to_html("owned equipped", hc.price, hc.hair_hex, hc.pk)
                out[hc.pk] = hair_to_json("owned", hc.name, hc.price, hc.hair_hex, hc.brow_hex, html)
            else:
                html = hair_to_html("owned", hc.price, hc.hair_hex, hc.pk)
                out[hc.pk] = hair_to_json("owned", hc.name, hc.price, hc.hair_hex, hc.brow_hex, html)
        elif hc.price > balance:
            html = hair_to_html("locked", hc.price, hc.hair_hex, hc.pk)
            out[hc.pk] = hair_to_json("locked", hc.name, hc.price, hc.hair_hex, hc.brow_hex, html)
        else:
            html = hair_to_html("affordable", hc.price, hc.hair_hex, hc.pk)
            out[hc.pk] = hair_to_json("affordable", hc.name, hc.price, hc.hair_hex, hc.brow_hex, html)
    final = {"colours": out}
    response_data = {
        "hair": final,
    }
    return final


def get_stats(user):

    # Get number of products
    products = 0;
    up = UserProducts.objects.get(learner=user)
    products += (len(up.backgroundColours[1:-1].split(",")) - 1)
    products += (len(up.hairColours[1:-1].split(",")) - 1)
    products += (len(up.clothesColour[1:-1].split(",")) - 1)
    products += (len(up.EyeTypes[1:-1].split(",")) - 1)
    products += (len(up.gif_backgrounds[1:-1].split(",")) - 1)


    username = user.username

    date = convert_django_time_to_javascript(user.date_joined)
    profile = Profile.objects.get(learner=user)
    points = profile.total_points
    num_sent = 0
    conversations = Conversation.objects.filter(learner=user)
    num_conversations = len(conversations)
    rating = 0
    num_secs = 0
    if num_conversations > 0:
        for conv in conversations:
            if conv.topic != 'tutorial':
                try:
                    secs = get_second_diff(convert_django_time_to_javascript(conv.end_time),convert_django_time_to_javascript(conv.start_time))/1000
                except:
                    secs = 0
                if secs < 300:
                    num_conversations -= 1
                else:
                    num_secs += secs
                    if conv.rating != None:
                        rating += int(conv.rating)
                    for sent in Sentence.objects.filter(conversation=conv):
                        if sent.sentence != None:
                            num_sent += 1
            else:
                num_conversations -= 1

    if num_secs <= 100:
        label = "Seconds"
        total_time = math.floor(num_secs)
    elif num_secs/60 <= 100:
        label = "Minutes"
        total_time = math.floor(num_secs/60)
    else:
        label = "Hours"
        total_time = math.floor(num_secs/(3600))


    flag_fname = "media/flags/"+get_nationality_code(profile.nationality).lower()+".svg"
    if num_conversations != 0:
        rating /= num_conversations
        rating = round(rating*2)/2
    else:
        rating == 0

    response_data = {
        "flag_name": flag_fname,
        "username": username,
        "date": date,
        "num_conv": num_conversations,
        "time_tot": total_time,
        "time_label": label,
        "num_sent": num_sent,
        "rating": rating,
        "points": points,
        "products": products
    }
    return response_data


def convert_django_time_to_javascript(t):
    return int(time.mktime((t).timetuple()) * 1000 + 3600000)

def get_second_diff(end,start):
    return float(end) - float(start)


def get_nationality_code(country_name):
    with open(settings.BASE_DIR + '/face/static/face/images/country-flags/countries_flipped.json') as f:
        countries = json.load(f)

    return countries.get(country_name)