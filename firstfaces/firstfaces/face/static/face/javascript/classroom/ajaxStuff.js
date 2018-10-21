
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

function sendBlobToServer( blob_to_send ) {

    let fd = new FormData();
    fd.append('data', blob_to_send);
    fd.append('sessionID', classVariableDict.session_id);
    fd.append('textFromSpeech', synthesisObject.textFromSpeech);
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

        },
        error: function() {
            console.log("that's wrong");
        },

    });

}

function sendSentToServer() {

    // set this to false until judgement comes in where it will be changed to true
    classVariableDict.awaitingJudgement = true;

    let sent = $('#textInput').val();

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

