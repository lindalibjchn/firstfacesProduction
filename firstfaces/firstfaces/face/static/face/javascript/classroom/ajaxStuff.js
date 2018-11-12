
// text is string and tiaSpeaker is true if it is tia speaking, false if student
function sendTTS( text, tiaSpeaker, caller ) {

    // checks if speech has arrived from server
    synthesisObject.gotNewSpeech = false;

    synthesisObject.text = text;
    synthesisObject.endCount = 30 + text.length * 2.5 * ( 1 / synthesisObject.speaking_rate );

    $.ajax({
        url: "/tts",
        type: "GET",
        data: {
            'sentence': text,
            'tiaSpeaker': tiaSpeaker,
            'pitch': synthesisObject.pitch,
            'speaking_rate': synthesisObject.speaking_rate,
            'sessionID': classVariableDict.session_id,
            'caller': caller,
            'blob_no_text': classVariableDict.blob_no_text,
            'blob_no_text_sent_id': classVariableDict.blob_no_text_sent_id,
        },
        success: function(json) {

            if ( json.caller === "listen" ) {

                classVariableDict.blob_no_text = true;
                classVariableDict.blob_no_text_sent_id = json.sent_id;

            }

            //var synthAudioURL = "https://erle.ucd.ie/" + json.synthURL;
            var synthAudioURL = "http://127.0.0.1:8000/" + json.synthURL;
            synthesisObject.synthAudio = document.getElementById( 'synthClip' );
            synthesisObject.synthAudio.src = synthAudioURL;

            // now this is true, other functions waiting on it can continue
            synthesisObject.gotNewSpeech = true;
            
            if ( tiaSpeaker ) {

            } else {

                // listen is when the user click the listen button so want the audio to play asap
                if ( caller === "listen" ) {

                    setTimeout( function() {

                        synthesisObject.synthAudio.play();

                    }, 500 );

                } else {
                
                    console.log('talk speech synth made');

                }

            }

        },
        error: function() {
            console.log("that's wrong");
        },

    });

}

function calculateAlternatives() {

    $('#textInput').val( synthesisObject.transcript0 );
    $('#textInput').focus();
    $('#alt00').css( 'border', '3px solid yellow' );
    
    synthesisObject.transcriptCur = '0';

    if ( synthesisObject.alternatives === 1 ) {

        $('#alt01').hide();
        $('#alt02').hide();

    } else if ( synthesisObject.alternatives === 2 ) {
    
        $('#alt01').show();
        $('#alt02').hide();

    } else if ( synthesisObject.alternatives === 3 ) {
    
        $('#alt01').show();
        $('#alt02').show();

    }

    $('#alternativesCont').show();

}

function sendBlobToServer( blob_to_send ) {

    let fd = new FormData();
    fd.append('data', blob_to_send);
    fd.append('sessionID', classVariableDict.session_id);
    fd.append('transcript0', synthesisObject.transcript0);
    fd.append('transcript1', synthesisObject.transcript1);
    fd.append('transcript2', synthesisObject.transcript2);
    fd.append('confidence0', synthesisObject.confidence0);
    fd.append('confidence1', synthesisObject.confidence1);
    fd.append('confidence2', synthesisObject.confidence2);
    fd.append('blob_no_text', classVariableDict.blob_no_text);
    fd.append('blob_no_text_sent_id', classVariableDict.blob_no_text_sent_id);

    $.ajax({
        url: "/store_blob",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(json) {

            classVariableDict.blob_no_text = true;
            classVariableDict.blob_no_text_sent_id = json.sent_id;
            console.log('got response from sending blob to server');

            returnFromListenToSpeechSynthesis();

            // dont want to send sentence while doing tutorial
            if ( classVariableDict.tutorial === false ) {

                $('#talkBtn').prop( "disabled", false);

            } else {

                if (classVariableDict.tutorialStep === 0 ) {

                    $('#recordVoiceBtn').prop( 'disabled', true );
                    greeting06();

                }

            }

        },
        error: function() {
            console.log("that's wrong");
        },

    });

}

function sendSentToServer() {

    // reset the number of recordings for the sentence to 0.
    classVariableDict.blobs = 0;

    let sent = $('#textInput').val();

    if ( sent.length >= 300 ) {

        alert( 'This sentence is too long. Please simplify and try again.')

    } else {

        // set this to false until judgement comes in where it will be changed to true
        classVariableDict.awaitingJudgement = true;

        // if wh-question and if allowed. If not allowed, raise alert 
        isItQ = checkIfSentIsQuestion( sent );
        let allowed = true;
        if ( isItQ ) {

            if ( calculateQuestionStreak() !== 3 ) {
               
                allowed = false;
            
            }

        }

        if ( allowed ) { 

            if ( sent.length > 2 ) {
                
                talkToTia(); 

                $.ajax({
                    url: "/store_sent",
                    type: "POST",
                    data: { 
                        'sent': sent,
                        'isItQ': isItQ,
                        'blob_no_text': classVariableDict.blob_no_text,
                        'blob_no_text_sent_id': classVariableDict.blob_no_text_sent_id,
                        'sessionID': classVariableDict.session_id
                    },
                    success: function(json) {
                        
                        console.log('sentence successfully sent to server');
                        checkJudgement( json.sent_id );

                    },
                    error: function() {
                        alert("sentence failed to send to server");
                    },

                });

            } else {

                alert('this is not a sentence');

            }

        } else {

            alert("you can only ask a 'Wh-' or 'How' question after 3 correct non-question sentences. The small red circle with the number in it will turn green when you can ask these questions.");

        }

    }

}

function checkJudgement( sentId ) {

    $.ajax({
        url: "/check_judgement",
        type: "GET",
        data: { 
            'sentId': sentId,
        },
        success: function(json) {
            
            if ( json.sent_meta.receivedJudgement ) {

                console.log('got judgement');

                if ( classVariableDict.lastSentToBeSent ) {

                    if ( classVariableDict.last_sent.judgement !== "I" ) {

                        classVariableDict.classOver = true;

                    }

                }
                
                console.log('sentMeta:', json.sent_meta);
                JudgementReceived( json.sent_meta )
            
            } else {

                console.log('checking for judgement again');
                checkJudgement( sentId );

            }

        },
        error: function() {
            alert("error awaiting judgement");
        },

    });

}

function sendTranscriptViewToAjax( choice ) {

    console.log('choice:', choice);
    $.ajax({
        url: "/add_transcription_choice_view",
        type: "GET",
        data: { 
            'choice': choice,
            'blob_no_text_sent_id': classVariableDict.blob_no_text_sent_id,
        },
        success: function(json) {
            
            console.log('added transcription choice view');

        },
        error: function() {
            alert("error adding transcription choice view");
        },

    });

}

