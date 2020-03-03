function sendBlobToServer( blob_to_send ) {

    let fd = new FormData();
    fd.append('data', blob_to_send);
    fd.append('conversation_id', conversationVariables.conversation_dict.id);
    
    let sentBeingRecordedId = determineSentBeingRecordedId();
    fd.append('sentence_being_recorded_id', sentBeingRecordedId);
    
    $.ajax({
        url: "/store_blob",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(json) {
            conversationVariables.sentence_being_recorded = json.sentence,
            conversationVariables.sentence_being_recorded_audio = {
                totalAudioLength: json.audio_length,
                Aud_Fname: json.audio_file,
                alternatives: json.alternatives,
                currentAudID: json.audio_pk 
            }
            
            if ( json.audio_file !== "" ) {

                aud.src = prefixURL + json.audio_file;
            
            }

            //console.log('got response from sending blob to server');
            
            prepareToStopTyping();

        },
        error: function() {
          //console.log("that's wrong");
        },

    });

}

function determineSentBeingRecordedId() {

    let sId = null;

    if ( conversationVariables.sentence_being_recorded !== null ) {

        sId = conversationVariables.sentence_being_recorded.sent_id;

    }

    return sId;

}






