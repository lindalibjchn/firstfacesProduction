
function buttonsHideAllContainers() {

    $('#meterContainer').hide();
    $('#emotionQuestionsCont').hide();
    $('#topicChoicesCont').hide();
    $('#submitTopicBtnCont').hide();
    $('#optionBtns').hide();
    $('#listenNextSentenceBtnCont').hide();
    $('#recordBtnsCont').hide();

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
    $('#listenNextSentenceBtnCont').show();
    $('#finishListenNextSentenceBtn').hide();
    $('#waitNextSentenceBtn').hide();
    $('#listenNextSentenceBtn').show();
    $('#listenNextSentenceBtn').attr('disabled', false);
    
}

function buttonsListenNextSentenceWaiting() {

    buttonsHideAllContainers();
    $('#listenNextSentenceBtnCont').show();
    $('#listenNextSentenceBtn').hide();
    $('#finishListenNextSentenceBtn').hide();
    $('#waitNextSentenceBtn').show();
    $('#waitNextSentenceBtn').attr('disabled', true);
    
}

function buttonsFinishListenNextSentence() {

    buttonsHideAllContainers();
    $('#listenNextSentenceBtnCont').show();
    $('#listenNextSentenceBtn').hide();
    $('#waitNextSentenceBtn').hide();
    $('#finishListenNextSentenceBtn').show();
    
}

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

}

function buttonsHideAllStop() {

    $('#stopRecordBtn').hide();
    $('#stopRecordVoiceBtn').hide();

}

