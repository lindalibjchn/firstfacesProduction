
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
$(window).on('pageshow', function() {
    get_products();
});

function get_products(){
    //get products
    get_eyes();
    get_backgrounds();
    get_hairColours();
    get_clothingColours();
}


$('#popup-btn').click(function(){
    if($('#popup-btn').hasClass("clicked")){
        $('#logo-left-cont').fadeIn(200);
        setTimeout(function(){$('#popup').hide();},200);
        $('#popup').animate({height:'0'},200);
        AnimateRotate(180,"#popup-btn",200);
        $('#popup-btn').removeClass("clicked");
    }else{
        $('#logo-left-cont').fadeOut(200);
        $('#popup').show();
        $('#popup').animate({height: dist.toString()+"px"},200);
        AnimateRotate(90,"#popup-btn",200);
        $('#popup-btn').addClass("clicked");
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
    $('#logo-left-cont').empty().append('<i class="fa fa-shopping-cart fa-2x"></i>');
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
     else{
        zoom(0,camera_values.original);
        show_click_me(time=0);
        enable_click();
     }
     //Click burger
     $('#popup-btn').click();



}
function open_home(){
    $('#logo-left-cont').empty();
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
    $('#logo-left-cont').empty().append('<i class="fa fa-history fa-2x"></i>');
    //Hide all others
    $('#home-cont').hide()
    $('#shop-cont').hide()
    $('#profile-cont').hide()
    $('#about-cont').hide()

     //Show history
     $('#history-cont').show()

     //Click burger
     $('#popup-btn').click();
}

function open_profile(){
    $('#logo-left-cont').empty().append('<i class="fa fa-user fa-2x"></i>');
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
    $('#logo-left-cont').empty().append('<i class="fa fa-question-circle fa-2x"></i>');
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

