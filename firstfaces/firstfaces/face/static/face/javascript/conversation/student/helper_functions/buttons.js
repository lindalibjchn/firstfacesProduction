
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
    $('#recordBtnsCont').show();
    $('#recordVoiceBtn').show();

}

function buttonsListenNextSentence() {

    buttonsHideAllContainers();
    $('#listenNextSentenceBtnCont').show();
    
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

