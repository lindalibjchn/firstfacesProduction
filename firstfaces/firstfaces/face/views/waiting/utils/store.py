from django.http import JsonResponse
from django.conf import settings
from face.models import TiaAttributes, BackgroundColour, HairColour, UserProducts, Profile, ClothesColour, EyeTypes, BackgroundGIF
import json


def get_attributes(request):
    user = request.user
    attr = TiaAttributes.objects.filter(learner=user)[0]

    hc = HairColour.objects.get(pk=attr.hairColour)
    cc = ClothesColour.objects.get(pk=attr.clothesColour)
    print()
    if attr.color_background:
        bc = BackgroundColour.objects.get(pk=attr.backgroundColour)
        gif = ""
    else:
        bc = ""
        gif = BackgroundGIF.objects.get(pk=attr.gif_background)

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


def get_balance(request):
    user = request.user
    balance = Profile.objects.filter(learner=user)[0].points
    response_data = {
        "balance": balance,
    }
    return JsonResponse(response_data)


def equip_background(request):
    # Change tia attributes and tia attributes on json
    user = request.user
    attr = TiaAttributes.objects.filter(learner=user)[0]
    id_ = request.POST['id_']
    attr.backgroundColour = id_
    attr.save()
    owned = [f[1:-1] for f in UserProducts.objects.filter(learner=user)[0].backgroundColours[1:-1].split(",") if
             f.strip() != ""]
    equipped = id_
    balance = Profile.objects.filter(learner=user)[0].points
    bcs = BackgroundColour.objects.all()
    out = {}
    for bc in bcs:
        if str(bc.pk) in owned:
            if str(equipped) == str(bc.pk):
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
    response_data = {
        "eyes": out
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
    response_data = {
        "balance": balance,
        "eyes": out
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
            if str(equipped) == str(bc.pk):
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

    response_data = {
        "balance": balance,
        "clothes": out
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
    out = {}
    for bc in bcs:
        if str(bc.pk) in owned:
            if attr.backgroundColour == str(bc.pk):
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
                gifs_out[bc.pk] = eye_to_json("owned", g.name, g.price, g.hex, html, g.filename)
            else:
                html = gif_to_html("owned", g.price, g.filename, g.pk)
                gifs_out[bc.pk] = eye_to_json("owned", g.name, g.price, g.hex, html, g.filename)
        elif bc.price > balance:
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

    response_data = {
        "eyes": out,
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
    response_data = {
        "clothes": out,
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
    response_data = {
        "clothes": out
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
    response_data = {
        "hair": out,
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
    response_data = {
        "hair": out,
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

    response_data = {
        "balance": balance,
        "hair": out
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

