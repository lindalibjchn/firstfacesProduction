
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
    if(conversationVariables.stage2 || conversationVariables.stage3){
        console.log("Got here")
        $('#stopRecordBtn').show()
    }
    else{
        $('#stopRecordVoiceBtn').show();
    }


}

function buttonsHideAllStop() {

    $('#stopRecordBtn').hide();
    $('#stopRecordVoiceBtn').hide();

}

