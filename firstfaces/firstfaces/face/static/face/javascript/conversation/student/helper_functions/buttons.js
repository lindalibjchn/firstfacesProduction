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
    $('#waitNextSentenceDots').hide();
    $('#listenNextSentenceBtn').show();
    $('#listenNextSentenceBtn').attr('disabled', false);
    
}

function buttonsListenNextSentenceWaiting() {

    buttonsHideAllContainers();
    $('#listenNextSentenceBtnCont').show();
    $('#listenNextSentenceBtn').hide();
    $('#finishListenNextSentenceBtn').hide();
    $('#waitNextSentenceDots').show();
    $('#waitNextSentenceDots').attr('disabled', true);
    
}

var animateWaitingDotsInterval;
var animateWaitingDotsCount;
function initAnimateWaitingDots() {

    animateWaitingDotsCount = 0;
    animateWaitingDotsInterval = setInterval( animateWaitingDots, 1000 )
    $('#waitNextSentenceDots').fadeIn();


}

function animateWaitingDots() {

    if ( animateWaitingDotsCount < 4 ) {

        $('#waitNextSentenceDots').innerHTML += ".";
        animateWaitingDotsCount += 1;

    } else {

        $('#waitNextSentenceDots').innerHTML = "";
        animateWaitingDotsCount = 0;

    }

}

function stopWaitingDots() {

    $('#waitNextSentenceDots').fadeOut();

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












