from django.http import JsonResponse
from django.conf import settings
from face.models import TiaAttributes, BackgroundColour, HairColour, UserProducts, Profile

def get_attributes(request):

    user = request.user
    attr = TiaAttributes.objects.filter(learner=user)[0]
    bc = BackgroundColour.objects.get(pk=attr.backgroundColour)
    hc = HairColour.objects.get(pk=attr.hairColour)

    response_data = {
        'BC': bc.hex,
        'BC_id': bc.pk,
        'HC_id': hc.pk,
        "HairC": hc.hair_hex,
        "BrowC": hc.brow_hex,
    }

    return JsonResponse(response_data)



def get_background_colors(request):
    bcs = BackgroundColour.objects.all()
    user = request.user
    print(UserProducts.objects.filter(learner=user)[0].backgroundColours[1:-1])

    owned = [f[1:-1] for f in UserProducts.objects.filter(learner=user)[0].backgroundColours[1:-1].split(",") if f.strip() != ""]
    print("\n\n",owned,'\n\n')
    balance = Profile.objects.filter(learner=user)[0].points
    print(owned)
    out = {}
    for bc in bcs:

        if str(bc.pk) in owned:
            print("\n\n\nHERE\n\n\n")
            html = background_to_html("owned", bc.price, bc.hex, bc.pk)
            out[bc.pk] = background_to_json("owned", bc.name, bc.price, bc.hex, html)
        elif bc.price > balance:
            html = background_to_html("locked", bc.price, bc.hex, bc.pk)
            out[bc.pk] = background_to_json("locked", bc.name, bc.price, bc.hex, html)
        else:
            html = background_to_html("affordable", bc.price, bc.hex, bc.pk)
            out[bc.pk] = background_to_json("affordable", bc.name, bc.price, bc.hex, html)
    out = sort_products(out)
    response_data = {
        "backgrounds": out,
    }

    return JsonResponse(response_data)


def background_to_html(class_, price, hex_, id_):
    if class_ == "owned":
        price = '<i class="fa fa-check"></i>'
    out = '<div class="product {}" id="{}" onclick="clicked_background(this.id)" ><div class="lockHolder"><div class="lock-div"><i class="fa fa-lock"></i></div></div><div class="product-img-cont"><div class="background-color-img" style="background-color:#{};"></div></div><div class="product-price">{}</div></div>'.format(class_,id_,hex_, price)
    return out


def background_to_json(class_, name, price, hex_, html):
    out = {'name': name, 'price': price, "hex": hex_, "class": class_, "html": html}
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

