function buttonsHideAllContainers() {

    //$('#meterContainer').hide();
    $('#emotionQuestionsCont').hide();
    //$('#submitTopicBtnCont').hide();
    $('#optionBtns').hide();
    $('#listenNextSentenceBtnCont').hide();
    $('#recordBtnsCont').hide();
    $('#tutorialBtnDoubleCont').hide();
    $('#tutorialBtnSingleCont').hide();

}

function buttonsMicrophoneOnly() {

    buttonsHideAllContainers();
    $('.record-btn').prop( "disabled", false );
    $('.record-btn').hide();
    $('#recordBtnsCont').show();
    $('#recordVoiceBtn').show();

}

function buttonsListenNextSentence() {

    buttonsHideAllContainers();
    stopWaitingDots()
    $('#listenNextSentenceBtnCont').show();
    $('#finishListenNextSentenceBtn').hide();
    $('#listenNextSentenceBtn').show();
    $('#listenNextSentenceBtn').attr('disabled', false);
    
}

function buttonsListenNextSentenceWaiting() {

    buttonsHideAllContainers();
    $('#listenNextSentenceBtnCont').show();
    $('#listenNextSentenceBtn').hide();
    $('#finishListenNextSentenceBtn').hide();
    initAnimateWaitingDots();
    
}

var animateWaitingDotsBool = false;
var animateWaitingDotsCount;
function initAnimateWaitingDots() {

    animateWaitingDotsCount = 0;
    animateWaitingDotsBool = true;
    animateWaitingDots()
    $('#waitNextSentenceDotsCont').fadeIn();

}

function animateWaitingDots() {

    console.log('in animateWaitingDots')
    if ( animateWaitingDotsCount < 5 ) {

        $('#dot' + animateWaitingDotsCount.toString() ).fadeIn();
        animateWaitingDotsCount += 1;

    } else {

        $('.dots').fadeOut();
        animateWaitingDotsCount = 0;

    }
    setTimeout( function() {

        if ( animateWaitingDotsBool ) {

            animateWaitingDots();

        }

    }, 1200);

}

function stopWaitingDots() {

    $('#waitNextSentenceDotsCont').hide();
    animateWaitingDotsBool = false;

}


//function buttonsFinishListenNextSentence() {

    //buttonsHideAllContainers();
    //$('#listenNextSentenceBtnCont').show();
    //$('#listenNextSentenceBtn').hide();
    //$('#waitNextSentenceDots').hide();
    //$('#finishListenNextSentenceBtn').show();
    
//}

function buttonsAfterMicClicked() {

    $('.record-btn').hide();
    if(conversationVariables.stage2 || conversationVariables.stage3){
        $('#stopRecordBtn').show()
    }
    else{
        $('#stopRecordVoiceBtn').show();

    }

}

function buttonsAfterTiaListensToLearnersSentenceAndTaps() {

    $('.record-btn').hide();
    $('#recordVoiceBtn').show();
    $('#talkBtn').show();
    $('#listenVoiceBtn').show();
    $('.play-btn').prop( "disabled", false);
    $('#talkBtn').prop( "disabled", false);

}

function buttonsHideAllStop() {

    $('#stopRecordBtn').hide();
    $('#stopRecordVoiceBtn').hide();

}

function buttonsShowOnlyForwardErrorCorrection() {

    buttonsHideAllContainers();
    $('.record-btn').prop( "disabled", false );
    $('.record-btn').hide();
    $('#recordBtnsCont').show();
    $('#forwardErrorSelection').show();
    $('#forwardArrow').addClass('flash');

}

function hideTopButtons() {

    $('#finishClassIconContainer').hide();
    $('#prevSentsIconContainer').hide();

}

var flashButtonBool = false;
var flashButtonCount;
var flashButtonDivId = ''
function initFlashButton( divId ) {

    flashButtonCount = 0;
    flashButtonBool = true;
    flashButtonDivId = divId
    flashButton()

}

function flashButton() {

    console.log('in flashButton')
    if ( flashButtonCount === 0 ) {

        $( '#' + flashButtonDivId ).fadeTo( 700, 0.5 );
        flashButtonCount += 1;

    } else {

        $( '#' + flashButtonDivId ).fadeTo( 700, 1 );
        flashButtonCount = 0;

    }
    setTimeout( function() {

        if ( flashButtonBool ) {

            flashButton();

        }

    }, 800);

}

//function changeNextSentenceButtonAppearanceToAgree() {

    //$('#listenNextSentenceBtnCont').fadeIn();
    //$('#listenNextSentenceBtn').text('✔')
    //$('#listenNextSentenceBtn').css({
     
        //'font-size': '5vw',

    //})
    //$('#listenNextSentenceBtn').addClass('w3-green');

//}

//function resetNextSentenceButtonAppearance() {

    //$('#listenNextSentenceBtn').text('>>')
    //$('#listenNextSentenceBtn').css({
     
        ////'font-size': '5vw',
        //'font-size': '15px',

    //})
    //$('#listenNextSentenceBtn').removeClass('w3-green');

//}












