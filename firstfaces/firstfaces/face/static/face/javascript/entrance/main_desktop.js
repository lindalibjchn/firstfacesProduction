$( document ).ready(function(){
    setHeight()
    load_screen();
    cycle_feedback();
});

function load_screen(){
    /*$('.hide2').hide();
    $('#text0').css('opacity','0');
    $('#text1').css('opacity','0');
    $('#text2').css('opacity','0');
    /*time1 = 200;
    time2 = 1300;
    sent_time = 500;
    time3 = time1 + (time2*4);
    $('.video_holder').hide();
    $('.video-cont').css({"background":"#D3D3D3", "opacity":"0.15"});

    setTimeout(function(){
        $('.hide1').show();
        setTimeout(function(){
            $('#text0').animate({opacity: 1}, sent_time);
            setTimeout(function(){
                $('#text1').animate({opacity: 1}, sent_time);
                setTimeout(function(){
                    $('#text2').animate({opacity: 1}, sent_time);
                },time2);
            },time2);
        },time2);
    },time1);
    setTimeout(function(){
        $('.hide2').fadeIn(sent_time*2);
        $('.video-cont').animate({opacity: 1}, sent_time*2);
        $('.video_holder').fadeIn(sent_time*2);
    },time3);*/

}
var curr_feedback = 1;

function cycle_feedback(){
    next_feedback = curr_feedback+1;
    if(next_feedback > 3){
        next_feedback -= 3;
    }
    $('#feedback_'+curr_feedback).fadeOut(600);
    setTimeout(function(){
        $('#feedback_'+next_feedback).fadeIn(600);
        setTimeout(function(){
            curr_feedback = next_feedback;
            cycle_feedback()
        }, 3600);
    }, 600);
}

$('.navbar_icon').click(function(){
    $( this ).effect( "shake" ,{times:3,distance:3},500);
    open_alert();
});

var dist = 0;
function setHeight(){
    console.log("Here")
    swidth = $(document).width()
    tp = parseInt($('#navbar_desktop').css('height'));
    sheight = ($('#footer_desktop').offset()['top'] - tp);

    $('#overforeground').css({"height":sheight, 'top':tp});
};

function close_alert(time1=500,time2=700){
    $('#alert_box').fadeOut(time1);

    setTimeout(function(){
        $('#overforeground').fadeOut(time2);
        $('#overfooter').fadeOut(time2);
        $('#navbar-grey-cover').fadeOut(time2);
    },0);

}
function open_alert(){
    $('#alert_box').hide()

    $('#overforeground').fadeIn(700);
    $('#overfooter').fadeIn(700);
    $('#navbar-grey-cover').fadeIn(700);
    setTimeout(function(){
        $('#alert_box').fadeIn(500);
    },0);
}
$('#navbar-grey-cover').click(close_alert);
$('#overfooter').click(close_alert);
$('#overforeground-cont').click(close_alert);