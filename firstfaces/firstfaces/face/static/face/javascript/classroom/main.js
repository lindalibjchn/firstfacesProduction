
$(window).on( 'load', function() {

    // begins the loading of objects
    init();

    //get audio ready
    readyAudioBtns();

    //fill prevSents
    loadPrevSents( scrollBottom );
    
    // put time remaining on screen
    showTimeRemaining();

    // show questionStreak
    showQuestionStreak();

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

            synthesisObject.text = textInBox;
            synthesisObject.length = synthesisObject.text;
            synthesisObject.endCount = 1000 + synthesisObject.length * 50;
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

                        synthesisObject.textFromSpeech = sentence.slice(0,sentence.length -1);
                        $('#textInput').val( synthesisObject.textFromSpeech );
                        $('#textInput').focus();
                    
                    }, 1000);

                }

                mediaRecorder.onstop = function( e ) {

                    blob = new Blob(chunks, { type : 'audio/ogg; codecs: opus' });

                    sendBlobToServer( blob );

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

        }

    } else {

        console.log('getUserMedia not supported on your browser!');
    
    }

}


// text is string and tiaSpeaker is true if it is tia speaking, false if student
function sendTTS( text, tiaSpeaker, caller ) {

    console.log('this:', this);

    $.ajax({
        url: "/face/tts",
        type: "GET",
        data: {
            'sentence': text,
            'tiaSpeaker': tiaSpeaker,
            'sessionID': classVariableDict.session_id
        },
        success: function(json) {

            //console.log( json.response );

            //var synthBlob = new Blob([json.response], {type: "audio/ogg; codecs: opus"})
            //var synthAudioURL = window.URL.createObjectURL( synthBlob );
            var synthAudioURL = "http://127.0.0.1:8000/" + json.synthURL;
            console.log('synthAudioURL:', synthAudioURL);
            synthesisObject.synthAudio = document.getElementById( 'synthClip' );
            //console.log( 'synthAudio:', synthAudio );
            synthesisObject.synthAudio.src = synthAudioURL;
            
            if ( tiaSpeaker ) {

                synthesisObject.speaker = "tia";


            } else {

                if ( caller === "listen" ) {

                    synthesisObject.synthAudio.play();

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

//function speak( speech ) {

    //window.speechSynthesis.speak(speech)
    
    //if ( synthesisObject.realSpeak ) {

        //// time when talk will end
        //talkObject.endCount = mainCount + speech.length * 3;

        //if ( synthesisObject.speaker === "tia" ) {

            //initTalk();

        //} else {

            //setTimeout( tiaThinkAboutSentence, speech.endCount );

        //}

    //}

//}

function sendBlobToServer( blob_to_send ) {

    let fd = new FormData();
    fd.append('data', blob_to_send);
    fd.append('sessionID', classVariableDict.session_id);
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

// this function, for some reason, means the voice changes correctly. I don't know why this is
window.speechSynthesis.onvoiceschanged = function() {
      //console.log('voice changed');
};

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
                type: "GET",
                data: { 
                    'sent': sent,
                    'isItQ': isItQ,
                    'blob_no_text': classVariableDict.blob_no_text,
                    'blob_no_text_sent_id': classVariableDict.blob_no_text_sent_id,
                    'sessionID': classVariableDict.session_id
                },
                success: function(json) {
                    
                    console.log('in sendSentToServer got judgement success');

                    // update classVariables to include new sentence. newInd gets index of next sent
                    let newInd = Object.keys(classVariableDict.sentences).length;
                    json.sent_meta.emotion = JSON.parse(json.sent_meta.emotion);
                    classVariableDict.sentences[ newInd ] = json.sent_meta;
                    classVariableDict.id_of_last_sent = newInd;
                    classVariableDict.last_sent = json.sent_meta;
                    sentenceObject.sentence = json.sent_meta.sentence;

                    // keeps state of sentence
                    classVariableDict.blob_no_text = false;
                    classVariableDict.awaitingJudgement = false;

                    // if tia is thinking then need to come back immediately
                    if ( classVariableDict.thinking ) {

                        // need to return to laptop only if not incorrect
                        if ( json.sent_meta.judgement !== "I" ) {

                            initReturnFromThinking();

                        } else {

                            tiaThinkingObject.thinking = false;
                            normalBlinkObject.bool = false;
                            //return eyes to original thinking position
                            $('#thinkingLoading').hide();
                            setTimeout(runAfterJudgement, 600);

                        }

                    }
                
                },
                error: function() {
                    console.log("that's wrong");
                },

            });

        } else {

            alert('this is not a sentence');

        }

    } else {

        alert("you can only ask a 'Wh-' or 'How' question after 3 correct non-question sentences. The small red circle with the number in it will turn green when you can ask these questions.");

    }

}


