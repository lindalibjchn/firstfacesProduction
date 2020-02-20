from django.http import JsonResponse
from django.conf import settings
from face.models import TiaAttributes, BackgroundColour, HairColour, UserProducts, Profile, ClothesColour, EyeTypes, BackgroundGIF, Conversation,Sentence
import json
import time
import math
from django.utils import timezone


def get_attributes(request):
    user = request.user
    attr = TiaAttributes.objects.get(learner=user)

    hc = HairColour.objects.get(pk=attr.hairColour)
    cc = ClothesColour.objects.get(pk=attr.clothesColour)
    bc = BackgroundColour.objects.get(pk=attr.backgroundColour)
    gif = attr.gif_background


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

    return JsonResponse(response_data)


def get_attributes_conv(request):
    user = request.user
    try:
        attr = TiaAttributes.objects.get(learner=user)
    except:
        attr = create_default_attributes(user)

    hc = HairColour.objects.get(pk=attr.hairColour)
    cc = ClothesColour.objects.get(pk=attr.clothesColour)
    bc = BackgroundColour.objects.get(pk=attr.backgroundColour)
    if not attr.color_background:
        gif = BackgroundGIF.objects.get(pk=attr.gif_background).filename

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
    else:
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
            "gif": "",
        }
    return JsonResponse(response_data)


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


def get_balance(request):

    user = request.user
    balance = Profile.objects.get(learner=user).points
    response_data = {
        "balance": balance,
    }
    return JsonResponse(response_data)


def equip_background(request):
    # Change tia attributes and tia attributes on json

    user = request.user
    attr = TiaAttributes.objects.filter(learner=user)[0]
    gif_bool = attr.color_background
    id_ = request.POST['id_']
    attr.backgroundColour = id_
    attr.color_background = True
    attr.save()
    owned = [f[1:-1] for f in UserProducts.objects.filter(learner=user)[0].backgroundColours[1:-1].split(",") if
             f.strip() != ""]
    equipped = id_
    balance = Profile.objects.filter(learner=user)[0].points
    bcs = BackgroundColour.objects.all()
    out = {}
    for bc in bcs:
        if str(bc.pk) in owned:
            if str(equipped) == str(bc.pk) and gif_bool:
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
    response_data = {
        "backgrounds": out
    }


    return JsonResponse(response_data)


def equip_background_gif(request):
    # Change tia attributes and tia attributes on json
    user = request.user
    attr = TiaAttributes.objects.filter(learner=user)[0]
    gif_bool = attr.color_background
    id_ = request.POST['id_']
    attr.gif_background = id_
    attr.color_background = False
    attr.save()
    owned = [f[1:-1] for f in UserProducts.objects.filter(learner=user)[0].gif_backgrounds[1:-1].split(",") if
             f.strip() != ""]
    equipped = id_
    balance = Profile.objects.filter(learner=user)[0].points
    bcs = BackgroundGIF.objects.all()
    out = {}
    for g in bcs:
        if str(g.pk) in owned:
            if attr.gif_background == str(g.pk) and not attr.color_background:
                html = gif_to_html("owned equipped", g.price, g.filename, g.pk)
                out[g.pk] = eye_to_json("owned", g.name, g.price, g.hex, html, g.filename)
            else:
                html = gif_to_html("owned", g.price, g.filename, g.pk)
                out[g.pk] = eye_to_json("owned", g.name, g.price, g.hex, html, g.filename)
        elif g.price > balance:
            html = gif_to_html("locked", g.price, g.filename, g.pk)
            out[g.pk] = eye_to_json("locked", g.name, g.price, g.hex, html, g.filename)
        else:
            html = gif_to_html("affordable", g.price, g.filename, g.pk)
            out[g.pk] = eye_to_json("affordable", g.name, g.price, g.hex, html, g.filename)
    response_data = {
        "backgrounds": out
    }

    return JsonResponse(response_data)


def equip_eyes(request):
    # Change tia attributes and tia attributes on json
    user = request.user
    attr = TiaAttributes.objects.filter(learner=user)[0]
    id_ = request.POST['id_']
    attr.eyeColour = id_
    attr.save()
    owned = [f[1:-1] for f in UserProducts.objects.filter(learner=user)[0].EyeTypes[1:-1].split(",") if
             f.strip() != ""]
    equipped = id_
    balance = Profile.objects.filter(learner=user)[0].points
    bcs = EyeTypes.objects.all()
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
    response_data = {
        "eyes": final
    }
    return JsonResponse(response_data)


def buy_eyes(request):
    user = request.user
    # deduct balance and return new
    profile = Profile.objects.filter(learner=user)[0]
    profile.points = int(profile.points) - int(request.POST['price'])
    balance = profile.points
    profile.save()

    # set bought background as current
    attr = TiaAttributes.objects.filter(learner=user)[0]
    id_ = request.POST['id_']
    attr.eyeColour = id_
    attr.save()

    # Add to user products
    user_products = UserProducts.objects.filter(learner=user)[0]
    colours = [f for f in user_products.EyeTypes[1:-1].split(",") if f.strip() != ""]
    colours.append('"' + request.POST['id_'] + '"')
    user_products.EyeTypes = "[" + ",".join(colours) + "]"
    user_products.save()

    # reset backgrounds
    owned = [f[1:-1] for f in colours]
    equipped = request.POST['id_']

    out = {}
    bcs = EyeTypes.objects.all()
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
    response_data = {
        "balance": balance,
        "eyes": final
    }
    return JsonResponse(response_data)


def buy_background(request):
    user = request.user

    # deduct balance and return new
    profile = Profile.objects.filter(learner=user)[0]
    profile.points = int(profile.points) - int(request.POST['price'])
    balance = profile.points
    profile.save()

    # set bought background as current
    attr = TiaAttributes.objects.filter(learner=user)[0]
    attr.color_background = True
    gif_bool = attr.color_background
    id_ = request.POST['id_']
    attr.backgroundColour = id_
    attr.save()

    # Add to user products
    user_products = UserProducts.objects.filter(learner=user)[0]
    colours = [f for f in user_products.backgroundColours[1:-1].split(",") if f.strip() != ""]
    colours.append('"' + request.POST['id_'] + '"')
    user_products.backgroundColours = "[" + ",".join(colours) + "]"
    user_products.save()

    # reset backgrounds
    owned = [f[1:-1] for f in colours]
    equipped = request.POST['id_']

    out = {}
    bcs = BackgroundColour.objects.all()
    for bc in bcs:
        if str(bc.pk) in owned:
            if str(equipped) == str(bc.pk) and gif_bool:
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

    # Change attibutes

    response_data = {
        "balance": balance,
        "backgrounds": out
    }
    return JsonResponse(response_data)


def buy_background_gif(request):
    user = request.user

    # deduct balance and return new
    profile = Profile.objects.filter(learner=user)[0]
    profile.points = int(profile.points) - int(request.POST['price'])
    balance = profile.points
    profile.save()

    # set bought background as current
    attr = TiaAttributes.objects.filter(learner=user)[0]
    id_ = request.POST['id_']
    attr.color_background = False
    attr.gif_background= id_
    attr.save()

    # Add to user products
    user_products = UserProducts.objects.filter(learner=user)[0]
    gifs = [f for f in user_products.gif_backgrounds[1:-1].split(",") if f.strip() != ""]
    gifs.append('"' + request.POST['id_'] + '"')
    user_products.gif_backgrounds = "[" + ",".join(gifs) + "]"
    user_products.save()

    # reset backgrounds
    owned = [f[1:-1] for f in gifs]
    equipped = request.POST['id_']

    out = {}
    bcs = BackgroundGIF.objects.all()
    for g in bcs:
        if str(g.pk) in owned:
            if attr.gif_background == str(g.pk) and not attr.color_background:
                html = gif_to_html("owned equipped", g.price, g.filename, g.pk)
                out[g.pk] = eye_to_json("owned", g.name, g.price, g.hex, html, g.filename)
            else:
                html = gif_to_html("owned", g.price, g.filename, g.pk)
                out[g.pk] = eye_to_json("owned", g.name, g.price, g.hex, html, g.filename)
        elif g.price > balance:
            html = gif_to_html("locked", g.price, g.filename, g.pk)
            out[g.pk] = eye_to_json("locked", g.name, g.price, g.hex, html, g.filename)
        else:
            html = gif_to_html("affordable", g.price, g.filename, g.pk)
            out[g.pk] = eye_to_json("affordable", g.name, g.price, g.hex, html, g.filename)

    # Change attibutes

    response_data = {
        "balance": balance,
        "backgrounds": out
    }
    return JsonResponse(response_data)



def buy_clothes(request):
    user = request.user

    # deduct balance and return new
    profile = Profile.objects.filter(learner=user)[0]
    profile.points = int(profile.points) - int(request.POST['price'])
    balance = profile.points
    profile.save()

    # set bought background as current
    attr = TiaAttributes.objects.filter(learner=user)[0]
    id_ = request.POST['id_']
    attr.clothesColour = id_
    attr.save()

    # Add to user products
    user_products = UserProducts.objects.filter(learner=user)[0]
    colours = [f for f in user_products.clothesColour[1:-1].split(",") if f.strip() != ""]
    colours.append('"' + request.POST['id_'] + '"')
    user_products.clothesColour = "[" + ",".join(colours) + "]"
    user_products.save()

    # reset backgrounds
    owned = [f[1:-1] for f in colours]
    equipped = request.POST['id_']

    out = {}
    bcs = ClothesColour.objects.all()
    for bc in bcs:
        if str(bc.pk) in owned:
            if str(equipped) == str(bc.pk):
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

    # Change attibutes
    final = {"colours": out}
    response_data = {
        "balance": balance,
        "clothes": final
    }
    return JsonResponse(response_data)


def get_background_colors(request):
    bcs = BackgroundColour.objects.all()
    gifs = BackgroundGIF.objects.all()

    user = request.user
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

    response_data = {
        "backgrounds": backgrounds,
    }

    return JsonResponse(response_data)


def get_eye_colors(request):
    bcs = EyeTypes.objects.all()
    user = request.user
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
    response_data = {
        "eyes": final,
    }

    return JsonResponse(response_data)


def get_clothes_colors(request):
    bcs = ClothesColour.objects.all()
    user = request.user
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
    response_data = {
        "clothes": final,
    }

    return JsonResponse(response_data)


def equip_clothes(request):
    # Change tia attributes and tia attributes on json
    user = request.user
    attr = TiaAttributes.objects.filter(learner=user)[0]
    id_ = request.POST['id_']
    attr.clothesColour = id_
    attr.save()
    owned = [f[1:-1] for f in UserProducts.objects.filter(learner=user)[0].clothesColour[1:-1].split(",") if
             f.strip() != ""]
    equipped = id_
    balance = Profile.objects.filter(learner=user)[0].points
    bcs = ClothesColour.objects.all()
    out = {}
    for bc in bcs:
        if str(bc.pk) in owned:
            if str(equipped) == str(bc.pk):
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
    response_data = {
        "clothes": final
    }
    return JsonResponse(response_data)


def get_hair_colors(request):
    hcs = HairColour.objects.all()
    user = request.user
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

    return JsonResponse(response_data)



def equip_hair(request):
    # Change tia attributes and tia attributes on json
    user = request.user
    attr = TiaAttributes.objects.filter(learner=user)[0]
    id_ = request.POST['id_']
    attr.hairColour = id_
    attr.save()
    owned = [f[1:-1] for f in UserProducts.objects.filter(learner=user)[0].hairColours[1:-1].split(",") if
             f.strip() != ""]
    equipped = id_
    balance = Profile.objects.filter(learner=user)[0].points
    hcs = HairColour.objects.all()
    out = {}
    for hc in hcs:
        if str(hc.pk) in owned:
            if attr.backgroundColour == str(hc.pk):
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
    return JsonResponse(response_data)


def buy_hair(request):
    user = request.user

    # deduct balance and return new
    profile = Profile.objects.filter(learner=user)[0]
    profile.points = int(profile.points) - int(request.POST['price'])
    balance = profile.points
    profile.save()

    # set bought background as current
    attr = TiaAttributes.objects.filter(learner=user)[0]
    id_ = request.POST['id_']
    attr.hairColour = id_
    attr.save()

    # Add to user products
    user_products = UserProducts.objects.filter(learner=user)[0]
    colours = [f for f in user_products.hairColours[1:-1].split(",") if f.strip() != ""]
    colours.append('"' + request.POST['id_'] + '"')
    user_products.hairColours = "[" + ",".join(colours) + "]"
    user_products.save()

    # reset backgrounds
    owned = [f[1:-1] for f in colours]
    equipped = request.POST['id_']

    out = {}
    hcs = HairColour.objects.all()
    for hc in hcs:
        if str(hc.pk) in owned:
            if attr.backgroundColour == str(hc.pk):
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

    # Change attibutes
    final = {"colours": out}
    response_data = {
        "balance": balance,
        "hair": final
    }
    return JsonResponse(response_data)


def background_to_html(class_, price, hex_, id_):
    if class_ == "owned" or class_ == "owned equipped":
        price = '<i class="fa fa-check"></i>'
    if 'equipped' not in class_ and 'locked' not in class_:
        class_ += " unequipped"
        print("Meme")
    out = '<div class="product {} tile_smaller" id="{}" onclick="clicked_background(this.id)" ><div class="lockHolder"><div class="lock-div"><i class="fa fa-lock"></i></div></div><div class="product-img-cont"><div class="background-color-img" style="background-color:#{};"></div></div><div class="product-price">{}</div></div>'.format(
        class_, id_, hex_, price)
    return out


def hair_to_html(class_, price, hex_, id_):
    if class_ == "owned" or class_ == "owned equipped":
        price = '<i class="fa fa-check"></i>'
    out = '<div class="product {} tile_smaller" id="{}" onclick="clicked_hair(this.id)" ><div class="lockHolder"><div class="lock-div"><i class="fa fa-lock"></i></div></div><div class="product-img-cont"><div class="background-color-img" style="background-color:#{};"></div></div><div class="product-price">{}</div></div>'.format(
        class_, id_, hex_, price)
    return out


def eye_to_html(class_, price, eye_file_name, id_):
    prefixURL = 'http://127.0.0.1:8000/'
    prefix = 'media/eyes/'
    if class_ == "owned" or class_ == "owned equipped":
        price = '<i class="fa fa-check"></i>'
    html = '<div class="product {} tile_smaller" id="{}" onclick="clicked_eye(this.id)" ><div class="lockHolder"><div class="lock-div"><i class="fa fa-lock"></i></div></div><div class="product-img-cont"><div class="background-color-img"><img class="img_product" src="{}"/></div></div><div class="product-price">{}</div></div>'
    return html.format(class_, id_, prefixURL+prefix+eye_file_name, price)


def gif_to_html(class_, price, eye_file_name, id_):
    prefixURL = 'http://127.0.0.1:8000/'
    prefix = 'media/gifs/'
    if class_ == "owned" or class_ == "owned equipped":
        price = '<i class="fa fa-check"></i>'
    html = '<div class="product {} tile_smaller" id="{}" onclick="clicked_gif(this.id)" ><div class="lockHolder"><div class="lock-div"><i class="fa fa-lock"></i></div></div><div class="product-img-cont"><div class="background-color-img"><img class="img_product" src="{}"/></div></div><div class="product-price">{}</div></div>'
    return html.format(class_, id_, prefixURL+prefix+eye_file_name, price)


def clothes_to_html(class_, price, hex_, id_):
    if class_ == "owned" or class_ == "owned equipped":
        price = '<i class="fa fa-check"></i>'
    out = '<div class="product {} tile_smaller" id="{}" onclick="clicked_clothes(this.id)" ><div class="lockHolder"><div class="lock-div"><i class="fa fa-lock"></i></div></div><div class="product-img-cont"><div class="background-color-img" style="background-color:#{};"></div></div><div class="product-price">{}</div></div>'.format(
        class_, id_, hex_, price)
    return out


def background_to_json(class_, name, price, hex_, html):
    out = {'name': name, 'price': price, "hex": hex_, "class": class_, "html": html}
    return out


def eye_to_json(class_, name, price, hex_, html, filename):
    out = {'name': name, 'price': price, "hex": hex_, "class": class_, "html": html, "filename": filename}
    return out


def hair_to_json(class_, name, price, hex_hair, hex_brow, html):
    out = {'name': name, 'price': price, "hex_hair": hex_hair, 'hex_brow': hex_brow, "class": class_, "html": html}
    return out


def get_price(p):
    return p['price']


def sort_products(js):
    print(js)
    out = {}
    other = []
    for k in js:
        if js[k]['class'] == "owned":
            out[k] = js[k]
        else:
            temp = js[k]
            temp["id"] = k
            other.append(temp)
    sorted_ = sorted(other, key=get_price)
    for s in sorted_:
        temp = {'name': s['name'], 'price': s['price'], 'hex': s['hex'], 'class': s['class'], "html": s['html']}
        out[s['id']] = temp
    print(out)
    return out


def parse_json(url):
    with open(url) as json_file:
        data = json.load(json_file)
    return data


def set_eyes(data, eye):
    temp = data
    temp["materials"][0]['mapDiffuse'] = eye
    return temp


def save_json(data, out_path):
    with open(out_path, 'w+') as outfile:
        json.dump(data, outfile)


def change_eyes(url, eye):
    save_json(change_eyes(parse_json(url), eye), url)
    return


def get_stats(request):
    user = request.user

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
    return JsonResponse(response_data)


def convert_django_time_to_javascript(t):
    return int(time.mktime((t).timetuple()) * 1000 + 3600000)

def get_second_diff(end,start):
    return float(end) - float(start)


def get_nationality_code(country_name):
    with open(settings.BASE_DIR + '/face/static/face/images/country-flags/countries_flipped.json') as f:
        countries = json.load(f)

    return countries.get(country_name)
