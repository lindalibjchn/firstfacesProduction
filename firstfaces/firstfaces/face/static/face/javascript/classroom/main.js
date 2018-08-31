
$(window).on( 'load', function() {

    // begins the loading of objects
    init();

    //get audio ready
    readyAudioBtns();

    //fill prevSents
    loadPrevSents( scrollBottom );
    
    $('#tryAgainBtn').on( 'click', tryAgain );
    $('#whatsWrongBtn').on( 'click', whatsWrong );
    $('#showCorrectionBtn').on( 'click', showCorrection );
    $('#nextSentenceBtn').on( 'click', nextSentence );

});

var blob;

function readyAudioBtns() {
    
    $('#talkBtn').on( 'click', sendSentToServer );

    // check that the browser has speech recognition
    try {

        var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        var recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.lang = 'en';

    } catch(e) {

        console.error(e);

    }

    let sentence = "";

    var record = document.getElementById( 'recordVoiceBtn' );
    var stop = document.getElementById( 'stopRecordVoiceBtn' );

    $('#listenVoiceBtn').on( 'click', function() {

        let aud = document.getElementById('soundClip')
        aud.play();

    });

    $('#listenSynthesisBtn').on( 'click', function() {

        // checks if play is repeat - dont need to send to server again
        let textInBox = $('#textInput').val();
        if ( textInBox === synthesisObject.text ) {

            synthesisObject.synthAudio.play();
            console.log('repeating play');

        } else {

            sendTTS( textInBox, false, "listen" );

        }

    });

    //// THIS SECOND BIT SENDS THE AUDIO FILE TO THE SERVER

	if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia (
            // constraints - only audio needed for this app
            {
                audio: true,
                video: false
            })

            // Success callback
            .then(function(stream) {
     
                var mediaRecorder = new MediaRecorder(stream);

                record.onclick = function() {

                    mediaRecorder.start();
                    console.log( mediaRecorder.state );
                    console.log( "recorder started" );


                    // this is the live stuff
                    sentence = "";

                    $(this).hide();
                    $('#stopRecordVoiceBtn').show();
                    recognition.start();
                    console.log('Voice recognition activated. Try speaking into the microphone.');

                }

                var chunks = [];

                mediaRecorder.ondataavailable = function( e ) {

                    chunks.push( e.data );

                }

                stop.onclick = function() {

                    mediaRecorder.stop();
                    console.log( mediaRecorder.state );
                    console.log( "recorder stopped" );

                    $(this).hide();
                    $('#recordVoiceBtn').show();
                    recognition.stop();

                    //show play buttons below
                    $('.play-btn').prop( "disabled", false);
                    $('#talkBtn').prop( "disabled", false);

                    setTimeout( function(){

                        $('#textInput').val( synthesisObject.textFromSpeech );
                        $('#textInput').focus();
                    
                    }, 1000);

                }

                mediaRecorder.onstop = function( e ) {

                    blob = new Blob(chunks, { type : 'audio/ogg; codecs: opus' });

                    console.log( 'blob size:', blob.size );
                    console.log( 'blob type:', blob.type );
                    chunks = [];
                    var audioURL = window.URL.createObjectURL(blob);

                    var audio = document.getElementById( 'soundClip' );
                    audio.src = audioURL;

                }

            })

            // Error callback
            .catch(function(err) {
                console.log('The following getUserMedia error occured: ' + err);
            }
        );
            
        recognition.onresult = function(event) {

            var current = event.resultIndex;
            var transcript = event.results[current][0].transcript;
            sentence += transcript + " ";
            synthesisObject.textFromSpeech = sentence.slice(0,sentence.length -1);
            sendBlobToServer( blob );


        }

    } else {

        console.log('getUserMedia not supported on your browser!');
    
    }

}


// text is string and tiaSpeaker is true if it is tia speaking, false if student
function sendTTS( text, tiaSpeaker, caller ) {

    synthesisObject.gotNewSpeech = false;
    synthesisObject.text = text;
    synthesisObject.endCount = 60 + text.length * 2.0 * ( 1 / synthesisObject.speaking_rate );

    $.ajax({
        url: "/face/tts",
        type: "GET",
        data: {
            'sentence': text,
            'tiaSpeaker': tiaSpeaker,
            'pitch': synthesisObject.pitch,
            'speaking_rate': synthesisObject.speaking_rate,
            'sessionID': classVariableDict.session_id
        },
        success: function(json) {

            //console.log( json.response );

            //var synthBlob = new Blob([json.response], {type: "audio/ogg; codecs: opus"})
            //var synthAudioURL = window.URL.createObjectURL( synthBlob );
            //var synthAudioURL = "https://erle.ucd.ie/" + json.synthURL;
            var synthAudioURL = "http://127.0.0.1:8000/" + json.synthURL;
            console.log('synthAudioURL:', synthAudioURL);
            synthesisObject.synthAudio = document.getElementById( 'synthClip' );
            //console.log( 'synthAudio:', synthAudio );
            synthesisObject.synthAudio.src = synthAudioURL;
            synthesisObject.gotNewSpeech = true;
            
            if ( tiaSpeaker ) {

            } else {

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
        url: "/face/store_blob",
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

function checkIfSentIsQuestion( s ) {

    isQ = false;

    trimmed_s = ( s.trim() ).toLowerCase();
    
    if ( trimmed_s.substring( 0, 2 ) === "wh" || trimmed_s.substring( 0, 4 ) === "how " ) {

        isQ = true;

    }

    return isQ;

}

function sendSentToServer() {

    // set this to false until judgement comes in where it will be changed to true
    classVariableDict.awaitingJudgement = true;
    //tiaThinkingObject.thinking = false;

    let sent = $('#textInput').val();

    // if wh-question and 
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
                url: "/face/store_sent",
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
        url: "/face/check_judgement",
        type: "GET",
        data: { 
            'sentId': sentId,
        },
        success: function(json) {
            
            if ( json.sent_meta.receivedJudgement ) {

                console.log('got judgement');

                if ( classVariableDict.lastSentToBeSent ) {

                    classVariableDict.classOver = true;

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

function JudgementReceived( sentMeta ) {

    console.log('sentMeta:', sentMeta);

    // update classVariables to include new sentence. newInd gets index of next sent
    let newInd = Object.keys(classVariableDict.sentences).length;
    sentMeta.emotion = JSON.parse(sentMeta.emotion);
    classVariableDict.sentences[ newInd ] = sentMeta;
    classVariableDict.id_of_last_sent = newInd;
    classVariableDict.last_sent = sentMeta;
    sentenceObject.sentence = sentMeta.sentence;

    // keeps state of sentence
    classVariableDict.blob_no_text = false;
    classVariableDict.awaitingJudgement = false;

    // do this here to change voices too
    if ( classVariableDict.last_sent.judgement === "B" || classVariableDict.last_sent.judgement === "C" ) {
        changeExpression();

    }

    // if tia is thinking then need to come back immediately
    if ( tiaThinkingObject.thinking ) {

        tiaThinkingObject.thinking = false;
        makeAllBoolsFalse();

        // just incase there is a blink underway
        whenAllMovFinished( function() {

            // need to return to laptop only if not incorrect
            if ( sentMeta.judgement === "I" ) {

                //return eyes to original thinking position
                $('#thinkingLoading').hide();
                runAfterJudgement();

            } else {

                initReturnFromThinking();

            }

        });

    }
                
}

function makeAllBoolsFalse() {

    expressionObject.bool = false;
    cameraObject.bool = false;
    movementObject.bool = false;
    eyelidObject.bool = false;
    eyeObject.bool = false;
    blinkNowObject.bool = false;
    normalBlinkObject.bool = false;
    nodObject.bool = false;
    shakeObject.bool = false;

}
