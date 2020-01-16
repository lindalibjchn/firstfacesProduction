
var dist;
waitingVariables.products = {};
$( document ).ready(function(){
    $('#shop-cont').hide();
    $('#history-cont').hide();
    $('#profile-cont').hide()
    $('#about-cont').hide()
    dist = $('#footer').offset()['top'] -64;
    shop_opened = false;
});


$('#popup-btn').click(function(){
    if($('#popup-btn').hasClass("clicked")){
        setTimeout(function(){$('#popup').hide();},200);
        $('#popup').animate({height:'0'},200);
        AnimateRotate(180,"#popup-btn",200);
        $('#popup-btn').removeClass("clicked");
        console.log("here");
    }else{
        $('#popup').show();
        $('#popup').animate({height: dist.toString()+"px"},200);
        AnimateRotate(90,"#popup-btn",200);
        $('#popup-btn').addClass("clicked");
         console.log("there");
    }
});

function AnimateRotate(angle,id,duration) {
    // caching the object for performance reasons
    var $elem = $(id);

    // we use a pseudo object for the animation
    // (starts from `0` to `angle`), you can name it as you want
    $({deg: 0}).animate({deg: angle}, {
        duration: duration,
        step: function(now) {
            $elem.css({
                transform: 'rotate(' + now + 'deg)'
            });
        }
    });
}


function open_shop(){
    //Hide all others
    $('#home-cont').hide()
    $('#history-cont').hide()
    $('#profile-cont').hide()
    $('#about-cont').hide()

    //Show shop
    $('#shop-cont').show()

    //$('#demoHolder').hide();
    if(!shop_opened){

        setHeight();
        get_tia_attributes();
        shop_opened = true;
    }
    //Click burger
    $('#popup-btn').click();
}
function open_home(){
    //Hide all others
    $('#shop-cont').hide()
    $('#history-cont').hide()
    $('#profile-cont').hide()
    $('#about-cont').hide()

    //Show shop
    $('#home-cont').show()

    //Click burger
    if ($('#popup-btn').hasClass("clicked")){
        $('#popup-btn').click();
    };
}
function open_history(){
    //Hide all others
    $('#home-cont').hide()
    $('#shop-cont').hide()
    $('#profile-cont').hide()
    $('#about-cont').hide()

    //Show shop
    $('#history-cont').show()

    //Click burger
    $('#popup-btn').click();
}

function open_profile(){
    //Hide all others
    $('#home-cont').hide()
    $('#shop-cont').hide()
    $('#history-cont').hide()
    $('#about-cont').hide()

    //Show shop
    $('#profile-cont').show()

    //Click burger
    $('#popup-btn').click();
}

function open_about(){
    //Hide all others
    $('#home-cont').hide()
    $('#shop-cont').hide()
    $('#history-cont').hide()
    $('#profile-cont').hide()

    //Show shop
    $('#about-cont').show()

    //Click burger
    $('#popup-btn').click();
}

$('#shop-btn').click(function(){open_shop()});
$('#main-logo').click(function(){open_home()});
$('#history-btn').click(function(){open_history()});
$('#profile-btn').click(function(){open_profile()});
$('#about-btn').click(function(){open_about()});

