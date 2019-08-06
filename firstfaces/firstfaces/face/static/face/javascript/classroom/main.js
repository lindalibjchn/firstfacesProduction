
$(window).on( 'load', function() {
   
    // begins the loading of objects
    init();

    //get audio ready
    readyBtns();

    //fill prevSents
    loadPrevSents( scrollBottom );   
    classVariableDict.playspeed=1.0;
});

//function resetTranscripts() {

    //synthesisObject.recordedSectionCount = 0;
    //synthesisObject.transcript0 = "";
    //synthesisObject.transcript1 = "";
    //synthesisObject.transcript2 = "";

//}

//var recognition// put here so can call in clipping occurs
var recorder15sTimeout;
var mediaRecorder;
var chunks;
var record;
var stop;
var aud;
function readyBtns() {
 
    //resetTranscripts();

    $('#prevSentsIconCont').on( 'click', function() {

        $('#prevSentsContainer').fadeIn();
        $('#prevSentsIconCont').hide();

    });

    $('#finishClassIconCont').on( 'click', function() {

        showTime();
        $('#prevSentsIconCont').hide();
        $('#finishClassIconCont').hide();
        $('#dataNFinish').show();
        $('#timeOverlayCont').fadeIn();

    });

    $('#finishClassBtnPre').on( 'click', function() {

        $('#dataNFinish').hide();
        $('#confirmFinish').fadeIn();

    } );

    $('#finishClassBtn').on( 'click', function() {

        $('#confirmFinish').hide();

        if ( classVariableDict.tutorial === false ) {

            //if ( classVariableDict.awaitingJudgement ) {
            
            //} else {

            if ( classVariableDict.id_of_last_sent === null ) {
            
                endClassNoSentences()

            } else {

                if ( classVariableDict.endClassSequenceStarted !== true ) {

                    console.log('\n\n\nend class finish button\n\n\n');
                    endClass();
                    classVariableDict.endClassSequenceStarted = true;

                }

            }
                
            //}

        } else {

            if ( classVariableDict.tutorialStep === 99 ) {

                endTutorial();

            } else {
    
                window.location.href = prefixURL + "waiting"

            }


        }

    } );

    $('#cancelFinishClassBtn').on( 'click', function() {

        $('#confirmFinish').hide();
        $('#dataNFinish').show();
        $('#finishClassBtnPre').show();
    
    } );


    $('.input-btn').on( 'click', function() {

        $( '#listenVoiceBtn' ).hide();

    } );

    $('#tryAgainBtn').on( 'click', tryAgain );
    $('#whatsWrongBtn').on( 'click', whatsWrong );
    $('#showCorrectionBtn').on( 'click', showCorrection );
    $('#nextSentenceBtn').on( 'click', nextSentence );
    $('#talkBtn').on( 'click', sendSentToServer );

    $('#finishClassBtn').on( 'click', function() {
        

    });

    // check that the browser has speech recognition
    //try {

        //var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        //recognition = new SpeechRecognition();
        //recognition.maxAlternatives = 3;
        //recognition.continuous = true;
        //recognition.lang = 'en';

    //} catch(e) {

        //console.error(e);

    //}

    record = document.getElementById( 'recordVoiceBtn' );
    stop = document.getElementById( 'stopRecordVoiceBtn' );
    aud = document.getElementById('soundClip');

    recordModal = document.getElementById('reRecordBtn');
    stopModal = document.getElementById('stopRecordBtn');
    
            
$('#listenVoiceBtn').on( 'click', function() {

    aud.play();
    //sendListenVoice();

    // for tutorial
    if ( classVariableDict.tutorialStep === 6 ) {

        $('#listenVoiceBtn').prop( 'disabled', true );
        setTimeout( greeting07, 3000 );

    }

});

    //// THIS SECOND BIT SENDS THE AUDIO FILE TO THE SERVER


    //// FOR VOLUME BAR

    canvasContext = document.getElementById( "meter" ).getContext("2d");
    canvasContext.transform(1, 0, 0, -1, 0, HEIGHT_VOL)
    var mediaStreamSource = null;
    audioContext = new AudioContext();
    
    function gotStream(stream) {
        // Create an AudioNode from the stream.
        mediaStreamSource = audioContext.createMediaStreamSource(stream);

        // Create a new volume meter and connect it.
        meter = createAudioMeter(audioContext, 0.95, 0.98, 1000);

        mediaStreamSource.connect(meter);

        // kick off the visual updating
        drawLoop();
    }


	if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia (
            // constraints - only audio needed for this app
            {
                audio: {

                    "mandatory": {
                        "googEchoCancellation": "false",
                        "googAutoGainControl": "false",
                        "googNoiseSuppression": "false",
                        "googHighpassFilter": "false",
                    },    
                    
                },
                video: false
            })

            // Success callback
            .then(function(stream) {
     
                classVariableDict.audio = true;
                console.log( 'audio working' );
                gotStream( stream );

                mediaRecorder = new MediaRecorder(stream);

                function onRecord() {

                    // remove speech buuble if it is up
                    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );

                    // this is to identify main recording and allow return of mic button if user says nothing
                    classVariableDict.mainRecord = true;
                    //recognition.start();
                    console.log('Voice recognition activated. Try speaking into the microphone.');
                    mediaRecorder.start();

                    // tia leans to listen, more so at later stages
                    if ( classVariableDict.stage2 ) {

                        listenToSpeechSynthesis( 1 );

                    } else if ( classVariableDict.stage3 ) {
                    
                        listenToSpeechSynthesis( 2 );
                        $('#backOverlay').hide();

                    } else {

                        listenToSpeechSynthesis( 0 );

                    }

                    classVariableDict.blobs += 1;
                    volumeObject.bool = true;// detect volume and be ready to show volume bar
                    synthesisObject.interference = false; // start with no interference which can change if clipping occurs
        
                    //hideTextStuff();
                    showVolumeBar();

                    // will check that the user has clicked the stop button by timing them and using this boolean
                    classVariableDict.recording = true;
                    recorder15sTimeout = setTimeout( checkIfClickedStop, 15000 );

                    // hide the microphone button
                    $(this).hide();
		            if(classVariableDict.stage2 || classVariableDict.stage3){
                        
                        $('#submitOverlay').hide();
                        $('#stopRecordBtn').show();
                        $('#reRecordBtn').prop("disabled",true);
                    
                        if (classVariableDict.stage2 ) {

                            $('#keyboardOverlay').hide();
                            $('#spectrogramBtn').hide();

                        }

		            }
                    $('#stopRecordVoiceBtn').show();
                    $('.play-btn').prop( "disabled", true);
                    $('#talkBtn').prop( "disabled", true);

                }

                stop.onclick = onStopClick;
		        stopModal.onclick = onStopClick;    			

                // this function checks that the user clicked stop after speaking one sentence. If not, it automatically finishes.
                function checkIfClickedStop() {

                    // double check the boolean is true
                    if ( classVariableDict.recording ) {

                        onStopClick();

                        alert('You have 15 seconds to say each sentence. If it is a very long sentence, try breaking it up into smaller sentences.')

                    }

                }


                record.onclick = onRecord;
		        recordModal.onclick = onRecord;		

                chunks = [];

                mediaRecorder.ondataavailable = function( e ) {

                    chunks.push( e.data );

                }

                mediaRecorder.onstop = onMediaRecorderStop;
                    
            })

            // Error callback
            .catch(function(err) {
                console.log('The following getUserMedia error occured: ' + err);
                classVariableDict.audio = false;
                console.log( 'audio not working' );
                alert("If you want to speak to Tia, you must allow Chrome to use your microphone. Click the lock, or small 'i' next to the web address and then change the settings to allow the microphone.");
            }
        );
            
        //recognition.onresult = function(event) {

            //console.log('event:', event)
            //var orderedAlternatesList = createArrayOfAlternatives( event.results[ synthesisObject.recordedSectionCount ] );

            //if ( orderedAlternatesList.length > 1 ) {

                //if ( orderedAlternatesList.length === 2 ) {

                    //synthesisObject.transcript0 += orderedAlternatesList[ 0 ].transcript;
                    //synthesisObject.transcript1 += orderedAlternatesList[ 1 ].transcript;
                    //synthesisObject.transcript2 += orderedAlternatesList[ 1 ].transcript;
            
                //} else if ( orderedAlternatesList.length === 3 ) {

                    //synthesisObject.transcript0 += orderedAlternatesList[ 0 ].transcript;
                    //synthesisObject.transcript1 += orderedAlternatesList[ 1 ].transcript;
                    //synthesisObject.transcript2 += orderedAlternatesList[ 2 ].transcript;
            
                //}

            //} else {

                //synthesisObject.transcript0 += orderedAlternatesList[ 0 ].transcript;
                //synthesisObject.transcript1 += orderedAlternatesList[ 0 ].transcript;
                //synthesisObject.transcript2 += orderedAlternatesList[ 0 ].transcript;
        
            //}

            //console.log( 'transcript0:', synthesisObject.transcript0 );
            //synthesisObject.recordedSectionCount += 1;

        //}

        //recognition.onend = function( event ) {

            //let listOfAlternatives = confirmAlternatives();
            //synthesisObject.alternatives = listOfAlternatives.length;
            //fillTranscriptsAndConfidences( listOfAlternatives );

        //}

        //function confirmAlternatives() {

            //if ( synthesisObject.transcript1 === synthesisObject.transcript0 ) {
    
                //return [ synthesisObject.transcript0 ];

            //} else if ( synthesisObject.transcript2 !== synthesisObject.transcript1 ) {

                //return [ synthesisObject.transcript0,  synthesisObject.transcript1, synthesisObject.transcript2 ];

            //} else {

                //return [ synthesisObject.transcript0, synthesisObject.transcript1 ];

            //}

        //}

    } else {

        console.log('getUserMedia not supported on your browser!');
    
    }

}


// put this in a function so that I can call it later if the user doesn't click stop after X seconds.
function onStopClick() {

    clearTimeout( recorder15sTimeout );

    // little delay as some users click too soon
    setTimeout( function() {

        mediaRecorder.stop();
    
    }, 250 )

    console.log( mediaRecorder.state );
    console.log( "recorder stopped" );

    classVariableDict.recording = false;

    $('#stopRecordBtn').hide();
    $('#stopRecordVoiceBtn').hide();

    //setTimeout( function() { 
        
        //recognition.stop();

    //}, 500 );

}

function onMediaRecorderStop() {

    volumeObject.bool = false;// stop measuring volume and hide volume bar
    hideVolumeBar();

    //$('#talkBtn').prop( "disabled", true )
    classVariableDict.blob = new Blob(chunks, { type : 'audio/webm; codecs: opus' });

    // create audiourl for easy replay
    var audioURL = window.URL.createObjectURL(classVariableDict.blob);
    aud.src = audioURL;

    // reset chunks
    chunks = [];

    // send blob to server to be stored, but wait a bit to make sure it has come through
    // setTimeout( function() {
    if(!classVariableDict.stage2 && !classVariableDict.stage3){
    	sendBlobToServer( classVariableDict.blob );
	}
	else{
        if(classVariableDict.stage2){
	        sendErrorBlobToServer( classVariableDict.blob );
        }
        else{
            sendAttemptBlob( classVariableDict.blob );
        }
	}
    //}, 1000);

}

//// for drawing the volume bar
var audioContext = null;
var meter = null;
var canvasContext = null;
var WIDTH_VOL=200;
var HEIGHT_VOL=100;
var rafID = null;
var micIntAud = document.getElementById('micInterferenceClip')
var micIntAudSources = [ prefixURL + "media/00micInterference04.mp3", prefixURL + "media/00micInterference01.mp3", prefixURL + "media/00micInterference02.mp3", prefixURL + "media/00micInterference03.mp3" ];

//var micIntAudSources = ["http://erle.ucd.ie/media/00micInterference04.mp3","http://erle.ucd.ie/media/00micInterference01.mp3","http://erle.ucd.ie/media/00micInterference02.mp3","http://erle.ucd.ie/media/00micInterference03.mp3"];


function drawLoop() {

    function drawVolumeBar() {

        console.log(' in draw volume bar ')
        canvasContext.clearRect(0,0,WIDTH_VOL,HEIGHT_VOL);

        // check if we're currently clipping
        if (meter.checkClipping()) {

            canvasContext.fillRect(0, 0, 100, HEIGHT_VOL);
            canvasContext.fillStyle = "red";
            //$('#meter').css('border', '3px solid red')
            $('#volumeMic').css('color', 'red')
            
        } else {
            canvasContext.fillStyle = "#33ff00";
            // draw a bar based on the current volume
            canvasContext.fillRect(0, 0, meter.volume*WIDTH_VOL, HEIGHT_VOL);
            //$('#meter').css('border', '2px solid #33ff00')
            $('#volumeMic').css('color', '#33ff00')

        }

    }

    function tiaConfusedAfterClipping( firstTime ) {
        
        if ( firstTime ) {

            micIntAud.src = micIntAudSources[Math.floor(Math.random()*4)]
            micIntAud.play();//play interference

            // depending on how far forward Tia is, change the duration of the flinch movement
            function getTimingForFlinch() {

                let leanNo = classVariableDict.blobs
                let dur = 0.5;

                if ( leanNo >= 2 ) {

                    dur = 0.75;

                } else if ( leanNo === 1 ) {

                    dur = 0.6;

                }

                return dur;

            }

            let dur = getTimingForFlinch();

            //// first flinch
            function firstFlinch() {

                onStopClick();
                setTimeout( function() {

                    expressionController( expressionObject.abs.confused, dur )//express confusion 
                    movementController( movements.flinch, dur, dur);
                    
                    //// delay the expression and movement by a bit to create more realistic encounter
                    setTimeout( function() {

                        $('textInputContainer').hide();
                        hideVolumeBar();//always hide it even if not shown, same as if statement

                        movementController( movements.blank, 1.5, 1.5);
                        expressionController( expressionObject.abs.blank, 1.5 )//express confusion 

                        setTimeout( function() {

                            tiaSpeak( "That was very loud. Please be careful with the microphone volume.", needSendTTS=true, removeTooLoudWarning );

                            function removeTooLoudWarning() {
                                
                                $('#recordVoiceBtn').show();
                                removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );

                            }

                            //function showButtonToConfirm() {

                                //$('#textInputContainer').hide();

                                //showSingleBtn( "I will check the volume bar", function() {

                                    //removeSingleBtn();
                                    ////$('#textInputContainer').show();
                                    //$('#recordVoiceBtn').show();
                                    ////$('.listenAndSynthBtns').prop('disabled', 'false');
                                    //$('#textInputContainer').show();
                                //});

                            //}

                        }, 1500 )

                    }, 2000 );

                }, 300 );

            }

            firstFlinch();

        } else {

            // actually just face contorting a bit
            //expressionController( expressionObject.abs.blank, 0.5 )//express confusion 
            // don't return to normal face cause the setTimeout could conflict with the students clicking of the stop button

        }

        setTimeout( function() { synthesisObject.firstClip = false; }, 2000 );
        synthesisObject.interference = false;

    }

    if (meter.checkClipping()) {

        if ( classVariableDict.tutorial ) {

            if ( synthesisObject.firstClip === false ) {

                synthesisObject.firstClip = true;
                tiaConfusedAfterClipping( false );

            }

        } else {

            if ( classVariableDict.interference_count === 0 ) {

                if ( synthesisObject.firstClip === false ) {

                    classVariableDict.interference_count += 1;
                    classVariableDict.interference_count_this_sent += 1;
                    synthesisObject.firstClip = true;
                    tiaConfusedAfterClipping( true );

                }

            } else {

                if ( synthesisObject.firstClip === false ) {

                    tiaConfusedAfterClipping( false );
                    classVariableDict.interference_count_this_sent += 1;
                    classVariableDict.interference_count += 1;
                    synthesisObject.firstClip = true;

                }

            }

        }

        synthesisObject.interference = true;

    }

    drawVolumeBar();

}

function showVolumeBar() {

    $('#meterCont').show(); 

}

function hideVolumeBar() {

    $('#meterCont').hide(); 

}

//function showTextStuff() {

    //$('#altCont').css('visibility', 'visible'); 
    
    //if ( classVariableDict.tutorial === false ) {

        //$('#playRobot').show(); 
    
    //}

    //$('#textInputBox').css('border', '3px solid #33ff00');

//}

//function hideTextStuff() {

    //$('#altCont').css('visibility', 'hidden'); 
    //$('#textInput').val(''); 
    //$('#playRobot').hide(); 
    //$('#textInputBox').css('border', 'none');

//}

//function resetAllTabs() {

    //$('.sent-scores' ).css( 'background-color', '#1b8900' )
    //$('.sent-scores' ).mouseover( function() { $('.sent-scores').css('cursor', 'pointer')});
    ////also reset tab colours so that the 1st one is bright
    //$('#alt00' ).css( 'background-color', '#33ff00' )
    //$('#alt00' ).mouseover( function() { $('#alt00').css('cursor', 'default')})

//}

//function viewAlternateTranscription() {

    //let id = this.id[4]//gets the number (0-2)
    //synthesisObject.transcriptCur = id;
    //$('#textInput').val( synthesisObject['transcript' + id ] )
    ////$('.sent-scores' ).css( 'border', 'none' )
    ////make all backgrounds of the tabs dark green
    //$('.sent-scores' ).css( 'background-color', '#1b8900' )
    //$('.sent-scores' ).mouseover( function() { $('.sent-scores').css('cursor', 'pointer')});
    ////then highlight the one clicked
    //$('#alt0' + id ).css( 'background-color', '#33ff00' )
    //$('#alt0' + id ).mouseover( function() { $('#alt0' + id).css('cursor', 'default')})
    //sendTranscriptViewToAjax( synthesisObject.transcriptCur );
    //$('#textInput').focus();

//}

//function checkIfSentIsQuestion( s ) {

    //isQ = false;

    //trimmed_s = ( s.trim() ).toLowerCase();
    
    //if ( trimmed_s.substring( 0, 2 ) === "wh" || trimmed_s.substring( 0, 4 ) === "how " ) {

        //isQ = true;

    //}

    //return isQ;

//}

function judgementReceived( sentMeta ) {

    console.log('sentMeta:', sentMeta);

    // update classVariables to include new sentence. newInd gets index of next sent
    let newInd = Object.keys(classVariableDict.sentences).length;
    sentMeta.emotion = JSON.parse(sentMeta.emotion);
    classVariableDict.sentences[ newInd ] = sentMeta;
    classVariableDict.sentences[ newInd ].sentence = JSON.parse( sentMeta.sentence );
    classVariableDict.sentences[ newInd ].indexes = JSON.parse( sentMeta.indexes );
    classVariableDict.sentences[ newInd ].prompt = sentMeta.prompt;

    classVariableDict.id_of_last_sent = newInd;
    classVariableDict.tiaToSay = sentMeta.tiaToSay;
    
    classVariableDict.last_sent = sentMeta;
    classVariableDict.last_sent.sentence = sentMeta.sentence;
    classVariableDict.last_sent.indexes = sentMeta.indexes;
    classVariableDict.last_sent.prompt = sentMeta.prompt;

    // keeps state of sentence
    classVariableDict.blob_no_text = false;
    classVariableDict.awaitingJudgement = false;

    // do this here to change voices too
    if ( classVariableDict.last_sent.judgement === "B" || classVariableDict.last_sent.judgement === "C" || classVariableDict.last_sent.judgement === "P" || classVariableDict.last_sent.judgement === "M" ) {

        //if ( classVariableDict.last_sent.judgement !== "C" ) {

            //checkForPromptNIndexes( sentMeta.sent_id );

        //}

        // calculate changes in expression for these
        if ( classVariableDict.last_sent.judgement === "M" ) {

            let singleCalculatedExpressions = createSingleExpression( expressionsRel.confused, 0.5 )
            calculatedExpression = getAbsoluteCoordsOfExpressionTo( singleCalculatedExpressions[ 0 ] )
            calculatedTalkExpression = getAbsoluteCoordsOfExpressionTo( singleCalculatedExpressions[ 1 ] )

        } else {

            changeExpression();

        }

    } else if ( classVariableDict.last_sent.judgement === "D" ) {

        let singleCalculatedExpressions = createSingleExpression( expressionsRel.confused, 1 )
        calculatedExpression = getAbsoluteCoordsOfExpressionTo( singleCalculatedExpressions[ 0 ] )
        calculatedTalkExpression = getAbsoluteCoordsOfExpressionTo( singleCalculatedExpressions[ 1 ] )

    } else if ( classVariableDict.last_sent.judgement === "3" ) {

        let singleCalculatedExpressions = createSingleExpression( expressionsRel.confused, 0.75 )
        calculatedExpression = getAbsoluteCoordsOfExpressionTo( singleCalculatedExpressions[ 0 ] )
        calculatedTalkExpression = getAbsoluteCoordsOfExpressionTo( singleCalculatedExpressions[ 1 ] )

    } else if ( classVariableDict.last_sent.judgement === "I" ) {

        let singleCalculatedExpressions = createSingleExpression( expressionsRel.confused, 1 )
        calculatedExpression = getAbsoluteCoordsOfExpressionTo( singleCalculatedExpressions[ 0 ] )
        calculatedTalkExpression = getAbsoluteCoordsOfExpressionTo( singleCalculatedExpressions[ 1 ] )

    }
                
}

//function promptNIndexesReceived( sentMeta ) {

    //console.log('new sent meta:', sentMeta);

    //classVariableDict.promptNIndexesReceived = true;

    //classVariableDict.sentences[ classVariableDict.id_of_last_sent ].prompt = sentMeta.prompt;
    //classVariableDict.last_sent.prompt = sentMeta.prompt;

    //classVariableDict.sentences[ classVariableDict.id_of_last_sent ].indexes = sentMeta.indexes;
    //classVariableDict.last_sent.indexes = sentMeta.indexes;

//}


