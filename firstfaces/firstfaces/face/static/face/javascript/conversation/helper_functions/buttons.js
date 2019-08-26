function buttonsMicrophoneOnly() {

    $('#recordBtnsCont').show();
    $('#recordVoiceBtn').show();

    $('#meterContainer').hide();
    $('#emotionQuestionsCont').hide();
    $('#topicChoicesCont').hide();
    $('#submitTopicBtnCont').hide();
    $('#optionBtns').hide();
    $('#listenNextSentenceBtnCont').hide();

}

function buttonsListenNextSentence() {

    $('#listenNextSentenceBtnCont').show();
    
    $('#recordBtnsCont').hide();
    $('#meterContainer').hide();
    $('#emotionQuestionsCont').hide();
    $('#topicChoicesCont').hide();
    $('#submitTopicBtnCont').hide();
    $('#optionBtns').hide();

}

function buttonsAfterMicClicked() {

    $('#recordVoiceBtn').hide();
    $('#reRecordBtn').hide();
    $('#stopRecordVoiceBtn').show();
            

}

function buttonsHideAllStop() {

    $('#stopRecordBtn').hide();
    $('#stopRecordVoiceBtn').hide();

}


