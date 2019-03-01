
// text is string and tiaSpeaker is true if it is tia speaking, false if student
function sendTTS( text, tiaSpeaker, caller ) {

    synthesisObject.ttsServerFault = false;
    console.log('text:', text);

    // checks if speech has arrived from server
    synthesisObject.gotNewSpeech = false;

    synthesisObject.text = text;

    $.ajax({
        url: "/tts",
        type: "GET",
        data: {
            'gender': classVariableDict.gender,
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

            if ( json.synthURL === 'fault' ) {

                synthesisObject.gotNewSpeech = true;
                synthesisObject.ttsServerFault = true;

            } else {

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
    fd.append('interference', synthesisObject.interference);
    fd.append('transcript0', synthesisObject.transcript0);
    fd.append('transcript1', synthesisObject.transcript1);
    fd.append('transcript2', synthesisObject.transcript2);
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

            // if first interference, then want the flinch not to be interfered with by the return motions
            if ( classVariableDict.interference_count === 1 && synthesisObject.interference ) {

                console.log('no return');

            } else {

                console.log('return');
                returnFromListenToSpeechSynthesis();

            }

            // dont want to send sentence while doing tutorial
            if ( classVariableDict.tutorial ) {

                if (classVariableDict.tutorialStep === 5 ) {

                    $('#recordVoiceBtn').prop( 'disabled', true );
                    $('#talkBtn').prop( 'disabled', true );

                    setTimeout( greeting06, 2000 );

                } else if (classVariableDict.tutorialStep === 7 ) {

                    $('#recordVoiceBtn').prop( 'disabled', true );
                    $('#talkBtn').prop( 'disabled', true );

                    setTimeout( greeting08, 2000 );

                } else if (classVariableDict.tutorialStep === 14 ) {

                    classVariableDict.tutorialStep = 3;
                    $('#recordVoiceBtn').prop( 'disabled', true );
                    $('#talkBtn').prop( 'disabled', true );

                    setTimeout( greeting15, 2000 );

                } else if (classVariableDict.tutorialStep === 15 ) {

                    classVariableDict.tutorialStep = 4;
                    $('#recordVoiceBtn').prop( 'disabled', true );
                    $('#talkBtn').prop( 'disabled', true );

                    setTimeout( greeting1601, 2000 );

                }

            }

        },
        error: function() {
            console.log("that's wrong");
        },

    });

}

function sendSentToServer() {

    // reset to false
    classVariableDict.promptNIndexesReceived = false;
    // reset the number of recordings for the sentence to 0.
    classVariableDict.blobs = 0;

    let sent = $('#textInput').val();

    if ( sent.length >= 260 ) {

        alert( 'This sentence is too long. Please simplify and try again.')

    } else {

        // set this to false until judgement comes in where it will be changed to true
        classVariableDict.awaitingJudgement = true;

        // if wh-question and if allowed. If not allowed, raise alert 
        //isItQ = checkIfSentIsQuestion( sent );
        //let allowed = true;
        //if ( isItQ ) {

            //if ( calculateQuestionStreak() !== 3 ) {
               
                //allowed = false;
            
            //}

        //}

        //if ( allowed ) { 

        if ( sent.length > 2 ) {
            
            talkToTia(); 
            recTimes = {};
            recTimes.clickTalkBtn = Date.now() / 1000;

            $.ajax({
                url: "/store_sent",
                type: "POST",
                data: { 
                    'sent': sent,
                    //'isItQ': isItQ,
                    'blob_no_text': classVariableDict.blob_no_text,
                    'blob_no_text_sent_id': classVariableDict.blob_no_text_sent_id,
                    'sessionID': classVariableDict.session_id
                },
                success: function(json) {
                    
                    console.log('sentence successfully sent to server');
                    //console.log('json.sent_id:', json.sent_id);
                    checkJudgement( json.sent_id );

                    // for interference stuff, need to reset
                    classVariableDict.interference_count_this_sent = 0;

                },
                error: function() {
                    alert("sentence failed to send to server");
                },

            });

        } else {

            alert('this is not a sentence');

        }

        //} else {

            //alert("you can only ask a 'Wh-' or 'How' question after 3 correct non-question sentences. The small red circle with the number in it will turn green when you can ask these questions.");

        //}

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

classVariableDict.promptNINdexesCount = 0;
function checkForPromptNIndexes( sentId ) {

    $.ajax({
        url: "/check_prompt_indexes",
        type: "GET",
        data: { 
            'sentId': sentId,
        },
        success: function(json) {
            
            if ( json.sent_meta.receivedPromptNIndexes ) {

                if ( classVariableDict.promptNIndexesReceived === false ) {

                    console.log('got prompt n indexes');
                    classVariableDict.promptNINdexesCount = 0;
                    promptNIndexesReceived( json.sent_meta )

                    if ( classVariableDict.lastSentToBeSent ) {

                        classVariableDict.classOver = true;

                    }

                }
            
            } else {

                console.log('checking for prompt n indexes again');
                classVariableDict.promptNINdexesCount += 1;

                if ( classVariableDict.promptNINdexesCount < 20 ) {

                    setTimeout( function() {

                        checkForPromptNIndexes( sentId );

                    }, 2000 );

                } else {

                    classVariableDict.promptNINdexesCount = 0;
                    setTimeout( function() {

                        synthesisObject.text = "Sorry, my message has take too long to come across the internet. Please continue."

                        tiaSpeak( synthesisObject.text, needSendTTS=true, function() {
                         
                            setTimeout( function() {
                                
                                returnToLaptop( ' ' );

                            }, tiaTimings.delayBeforeReturnToLaptop );

                        })


                    }, 2000 )

                }

            }

        },
        error: function() {

            classVariableDict.promptNINdexesCount = 0;
            setTimeout( function(){
            
                console.log("error awaiting prompt n indexes");
        
                synthesisObject.text = "Sorry, my message hasn't come across the internet quickly enough. Please continue."

                tiaSpeak( synthesisObject.text, needSendTTS=true, function() {
                 
                    setTimeout( function() {
                        
                        returnToLaptop( ' ' );

                    }, tiaTimings.delayBeforeReturnToLaptop );

                })

            }, 10000 )

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

function sendListenSynth( repeat ) {

    listenTranscript = false;
    diffSent = "";
    transcriptCur = "3";
    // if not a repeat then something different - is it one of the transcripts?
    if ( repeat === false ) {

        if ( synthesisObject['transcript' + synthesisObject.transcriptCur ] === $('#textInput').val() ) {
        
            listenTranscript = true;
            transcriptCur = synthesisObject.transcriptCur;

        } else {

            // something typed by the learner
            diffSent = $('#textInput').val();

        }

    }

    $.ajax({
        url: "/add_listen_synth_data",
        type: "GET",
        data: { 
            'sessId': classVariableDict.session_id,
            'diffSent': diffSent,
            'transcriptCur': transcriptCur,
            'listenTranscript': listenTranscript,
            'repeat': repeat,
            'blob_no_text': classVariableDict.blob_no_text,
            'blob_no_text_sent_id': classVariableDict.blob_no_text_sent_id,
        },
        success: function(json) {
            
            classVariableDict.blob_no_text = true;
            classVariableDict.blob_no_text_sent_id = json.sent_id;

            console.log('added pronunciation data');

        },
        error: function() {
            alert("error adding pronunciation data");
        },

    });

}

function sendListenVoice() {

    $.ajax({
        url: "/add_voice_data",
        type: "GET",
        data: { 
            'blob_no_text_sent_id': classVariableDict.blob_no_text_sent_id,
            'transcriptCur': synthesisObject.transcriptCur,
        },
        success: function(json) {
            
            console.log('added voice data');

        },
        error: function() {
            alert("error adding pronunciation data");
        },

    });

}

function sendSoundMicToServer( device, TF ) {

    console.log('in sendSoundMicToServer:', device + " " + TF.toString());
    $.ajax({
        url: "/store_sound_mic",
        type: "GET",
        data: { 
            'device': device,
            'TF': JSON.stringify( TF ),
        },
        success: function(json) {
            
            console.log('added device status');

        },
        error: function() {
            alert("error adding device status");
        },

    });

}

function sendTimesToServer() {

    let sentID = classVariableDict.last_sent.sent_id

    $.ajax({
        url: "/timings",
        type: "GET",
        data: { 
            'sent_id': sentID,
            'timing_dict': JSON.stringify( recTimes ),
        },
        success: function(json) {
            
            console.log('added timings');

        },
        error: function() {
            alert("error adding timings");
        },

    });

}
