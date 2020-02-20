from django.http import JsonResponse
from django.conf import settings
from face.models import TiaAttributes, BackgroundColour, HairColour, UserProducts, Profile, ClothesColour, EyeTypes, BackgroundGIF, Conversation,Sentence
import json
import time
import math
from face.views.waiting.utils.store import eye_to_html, eye_to_json


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