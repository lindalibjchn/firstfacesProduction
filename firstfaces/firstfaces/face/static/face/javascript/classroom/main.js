
$(window).on( 'load', function() {

    // begins the loading of objects
    init();

    //get audio ready
    readyBtns();

    //fill prevSents
    loadPrevSents( scrollBottom );
    
});

function readyBtns() {
    
    $('#tryAgainBtn').on( 'click', tryAgain );
    $('#whatsWrongBtn').on( 'click', whatsWrong );
    $('#showCorrectionBtn').on( 'click', showCorrection );
    $('#nextSentenceBtn').on( 'click', nextSentence );
    $('#talkBtn').on( 'click', sendSentToServer );

    $('#finishClassBtn').on( 'click', function() {
        
        if ( classVariableDict.awaitingJudgement ) {
        
        } else {

            endClass();
            
        }

    });

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
    var aud = document.getElementById('soundClip')

    $('#listenVoiceBtn').on( 'click', function() {

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

                var recorder15sTimeout;

                function onRecord() {

                    mediaRecorder.start();

                    // will check that the user has clicked the stop button by timing them and using this boolean
                    classVariableDict.recording = true;
                    recorder15sTimeout = setTimeout( checkIfClickedStop, 20000 );

                    // this is the live stuff
                    sentence = "";

                    // hide the microphone button
                    $(this).hide();
                    $('#stopRecordVoiceBtn').show();
                    recognition.start();
                    console.log('Voice recognition activated. Try speaking into the microphone.');

                }

                // this function checks that the user clicked stop after speaking one sentence. If not, it automatically finishes.
                function checkIfClickedStop() {

                    // double check the boolean is true
                    if ( classVariableDict.recording ) {

                        onStopClick();

                        alert('You have 20 seconds to say each sentence. If it is a very long sentence, try breaking it up into smaller sentences.')

                    }

                }


                record.onclick = onRecord;

                var chunks = [];

                mediaRecorder.ondataavailable = function( e ) {

                    chunks.push( e.data );

                }

                // put this in a function so that I can call it later if the user doesn't click stop after X seconds.
                function onStopClick() {

                    clearTimeout( recorder15sTimeout );

                    mediaRecorder.stop();
                    console.log( mediaRecorder.state );
                    console.log( "recorder stopped" );

                    classVariableDict.recording = false;

                    $('#stopRecordVoiceBtn').hide();
                    recognition.stop();

                }

                stop.onclick = onStopClick;
                    
                function onMediaRecorderStop() {

                    $('#talkBtn').prop( "disabled", true )
                    classVariableDict.blob = new Blob(chunks, { type : 'audio/ogg; codecs: opus' });

                    // create audiourl for easy replay
                    var audioURL = window.URL.createObjectURL(classVariableDict.blob);
                    aud.src = audioURL;

                    // reset chunks
                    chunks = [];

                    // send blob to server to be stored, but wait a bit to make sure it has come through
                    setTimeout( function() {
                        
                        sendBlobToServer( classVariableDict.blob );

                    }, 1000);

                }

                mediaRecorder.onstop = onMediaRecorderStop;
                    
            })

            // Error callback
            .catch(function(err) {
                console.log('The following getUserMedia error occured: ' + err);
                alert("If you want to speak to Tia, you must allow Chrome to use your microphone. Click the small 'i' next to the web address and then change the settings to allow the microphone.");
            }
        );
            
        recognition.onresult = function(event) {

            var current = event.resultIndex;
            var transcript = event.results[current][0].transcript;
            sentence += transcript + " ";
            synthesisObject.textFromSpeech = sentence.slice(0,sentence.length -1);

        }

    } else {

        console.log('getUserMedia not supported on your browser!');
    
    }

}


function checkIfSentIsQuestion( s ) {

    isQ = false;

    trimmed_s = ( s.trim() ).toLowerCase();
    
    if ( trimmed_s.substring( 0, 2 ) === "wh" || trimmed_s.substring( 0, 4 ) === "how " ) {

        isQ = true;

    }

    return isQ;

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
