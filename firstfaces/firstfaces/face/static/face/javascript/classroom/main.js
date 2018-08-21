
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

        synthesisObject.textInBox = $('#textInput').val();
        synthesisObject.toSpeak = synthesisObject.textInBox;
        synthesisObject.speaker = "male";
        synthesisObject.realSpeak = false;
        getVoices( setVoice );

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



function getVoices( setVoice ) {

    // get voices
    let voices = speechSynthesis.getVoices();

    setVoice( voices, speak );

}
    
function setVoice( voices, speak ) {

    let speech = new SpeechSynthesisUtterance();
    let speaker = synthesisObject.speaker;

    if ( speaker === "tia" ) {
        
        speech.voice = voices[1];

    } else if ( speaker === "female" ) {

        speech.voice = voices[2];

    } else if ( speaker === "male" ) {

        speech.voice = voices[3];

    }

    // Set the text and voice attributes.
    speech.text = synthesisObject.toSpeak;
    speech.length = synthesisObject.toSpeak.length;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    speak( speech );
    
}

function speak( speech ) {

    window.speechSynthesis.speak(speech)
    
    if ( synthesisObject.realSpeak ) {

        // time when talk will end
        talkObject.endCount = mainCount + speech.length * 4;

        if ( synthesisObject.speaker === "tia" ) {

            initTalk();

        } else {

            setTimeout( thinkAndTurn, speech.endCount );

        }

    }

}

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

function sendSentToServer() {

    // set this to false until judgement comes in where it will be changed to true
    classVariableDict.awaitingJudgement = true;
    //tiaThinkingObject.thinking = false;

    let sent = $('#textInput').val();
    console.log('sent:', sent);
    
    if ( sent.length > 2 ) {
        
        talkToTia(); 

        $.ajax({
            url: "/face/store_sent",
            type: "POST",
            data: { 
                'sent': sent,
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

}


