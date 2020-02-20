
$( document ).ready(function(){
    $('#shop-cont').hide();
    $('#history-cont').hide();
    $('#profile-cont').hide()
    $('#about-cont').hide()
    $('#home-cont').hide();
    waitingVariables.dist = $('#footer').offset()['top'] -64;
    waitingVariables.shop_opened = false;
});

$(window).load(function() {
      //get_products();
       $('#logo-left-cont').css("display","flex").hide().fadeIn(700);
       $('#popup-btn').show();
       $('#logo-right-cont').css("display","flex").hide().fadeIn(700);
       $('#home-cont').fadeIn(700);
      get_user_stats();
});

function get_products(){
    //get products
    get_eyes();
    get_backgrounds();
    get_hairColours();
    get_clothingColours();
    get_balance();

}


$('#popup-btn').click(function(){

    if($('#popup-btn').hasClass("clicked")){
        click_save("#popup-btn", "Menu closed");
        $('#logo-left-cont').fadeIn(200);
        setTimeout(function(){$('#popup').hide();},200);
        $('#popup').animate({height:'0'},200);
        AnimateRotate(180,"#popup-btn",200);
        $('#popup-btn').removeClass("clicked");
    }else{
        click_save("#popup-btn", "Menu opened");
        $('#logo-left-cont').fadeOut(200);
        $('#popup').show();
        $('#popup').animate({height: waitingVariables.dist.toString()+"px"},200);
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

    if(waitingVariables.experimental_group == "control"){
         $('#logo-left-cont').empty().append('<i class="fa fa-shopping-cart fa-2x"></i>');
    }

    //Hide all others
    $('#home-cont').hide()
    if(!waitingVariables.tutorial_complete){

        $('#tutorialNotDoneContainer').hide();
    }
    $('#history-cont').hide()
    $('#profile-cont').hide()
    $('#about-cont').hide()

    //Show shop
    $('#shop-cont').show()

     //$('#demoHolder').hide();
     if(!waitingVariables.shop_opened){
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
   if(!waitingVariables.tutorial_complete){
        $('#tutorialNotDoneContainer').show();
    }
    if(!waitingVariables.experimental_group == "control"){
        $('#logo-left-cont').empty();
    }
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
    if(!waitingVariables.tutorial_complete){
        $('#tutorialNotDoneContainer').hide();
    }
    if(!waitingVariables.experimental_group == "control"){
        $('#logo-left-cont').empty().append('<i class="fa fa-history fa-2x"></i>');
    }
    //Hide all others
    $('#home-cont').hide()
    $('#shop-cont').hide()
    $('#profile-cont').hide()
    $('#about-cont').hide()

     //Show history
     $('#history-cont').show()

     //Click burger
     $('#popup-btn').click();

     showScoresAndSentences();

}

function showScoresAndSentences() {

    waitingVariables.finishedConversationsNotTutorial = waitingVariables.conversations.filter( function( obj ) {
        
        return obj.topic !== 'tutorial';

    })

    console.log( 'waitingVariables.finishedConversationsNotTutorial:', waitingVariables.finishedConversationsNotTutorial )

    if ( waitingVariables.finishedConversationsNotTutorial.length !== 0 ) {
    
        $( '#prevSentsWaitingContainer' ).css( 'display', 'flex' );

        addAllScores( waitingVariables.finishedConversationsNotTutorial );
        
        showConversationSentences( 0 );
        //setUpPreviousSentsBtns( finishedConversationsNotTutorial[0].completed_sentences )
        //addData( 'sentences', finishedConversationsNotTutorial[0].completed_sentences )
    
    }
    $('#pronunciationClearOverlayArea').click( hidePronunciationDataContainer );

}

function open_profile(){

    if(!waitingVariables.tutorial_complete){
        $('#tutorialNotDoneContainer').hide();
    }
    if(!waitingVariables.experimental_group == "control"){
        $('#logo-left-cont').empty().append('<i class="fa fa-user fa-2x"></i>');
    }
    //Hide all others
    $('#home-cont').hide()
    $('#shop-cont').hide()
    $('#history-cont').hide()
    $('#about-cont').hide()

    //Show shop
    $('#profile-cont').show()
    fix_picture_height();
    //Click burger
    $('#popup-btn').click();

}

function open_about(){
    if(!waitingVariables.tutorial_complete){
        $('#tutorialNotDoneContainer').hide();
    }
    if(!waitingVariables.experimental_group == "control"){
        $('#logo-left-cont').empty().append('<i class="fa fa-question-circle fa-2x"></i>');
    }
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

function openTutorial() {

    bookConversation( enterTutorial=true )
    $('#tutorialButton').css({
        'background-color': 'green',
        'color': 'white',
    })

}

$('#shop-btn').click(function(){
    click_save("#shop-btn", "Shop opened");
    open_shop();
});
$('#tutorialButton').click(function(){
    click_save("#tutorialButton", "Tutorial started");
    openTutorial();
});
$('#main-logo').click(function(){
    click_save("#tutorialButton", "Home opened");
    open_home();
});
$('#history-btn').click(function(){
    click_save("#history-btn", "History opened");
    open_history()
});
$('#profile-btn').click(function(){
    click_save("#profile-btn", "Profile opened");
    open_profile()
});
$('#about-btn').click(function(){
    click_save("#profile-btn", "Profile opened");
    open_about()
});

