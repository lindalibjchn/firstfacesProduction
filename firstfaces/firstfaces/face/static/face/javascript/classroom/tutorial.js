var tiaSpeakCount = 0;
function tiaSpeak( tiaSays, needSendTTS=true, callback ) {

    // display text
    speechBubbleObject.sentence = tiaSays;
    $('.speaking-words').hide();
    $('.speaking-words').text( speechBubbleObject.sentence );
    
    // only false if TTS can be sent in advance so no need to do it again
    if ( needSendTTS ) {

        synthesisObject.text = tiaSays;
        sendTTS( synthesisObject.text, true, "talk" );

    }

    if ( cameraObject.currentState === "laptop" ) {

        displaySpeechBubble( "low", tiaTimings.speechBubbleFadeInDuration, 0.9 );
        $('#speakingWordsLaptop').fadeIn( tiaTimings.speechBubbleFadeInDuration );

    } else {

        displaySpeechBubble( "high", tiaTimings.speechBubbleFadeInDuration, 0.9 );
        $('#speakingWordsTia').fadeIn( tiaTimings.speechBubbleFadeInDuration );

    }

    setTimeout( function() {

        speakSent( tiaSays )

    }, tiaTimings.delayAfterBubbleShowUntilSpeak );

    function speakSent( s ) {

        if ( synthesisObject.gotNewSpeech ) {
            
            synthesisObject.delay = delayForListening( s )
            synthesisObject.synthAudio.play();
            synthesisObject.gotNewSpeech = false
            initTalk();
            tiaSpeakCount = 0;

            console.log('callback:', callback);

            setTimeout( callback, synthesisObject.delay );

        } else {

            if ( tiaSpeakCount < 5 ) {

                console.log('waiting for speech synthesis to return audio')
                setTimeout( function() { speakSent( s ) }, 1000 );
                tiaSpeakCount += 1;

            } else {

                tiaSpeakCount = 0;
                synthesisObject.delay = delayForListening( s )
                setTimeout( callback, synthesisObject.delay );

            }

        }

    }

}

function showSingleBtn( response, callback ) {

    $('#tutorialBtnSingle').prop( 'disabled', false )
    $('#tutorialBtnSingleCont').fadeIn( 1000 );
    $('#tutorialBtnSingle').text( response );
    $('#tutorialBtnSingle').on( 'click', callback )

}

function showDoubleBtn( response01, response02, callback01, callback02 ) {

    $('.tut-double-btn').prop( 'disabled', false )
    $('#tutorialBtnDoubleCont').fadeIn( 1000 );
    $('#tutorialBtnDouble0').text( response01 );
    $('#tutorialBtnDouble1').text( response02 );
    $('#tutorialBtnDouble0').on( 'click', callback01 );
    $('#tutorialBtnDouble1').on( 'click', callback02 );

}

function removeSingleBtn() {

    $('#tutorialBtnSingle').off( 'click' )
    $('#tutorialBtnSingle').prop( 'disabled', true )
    $('#tutorialBtnSingleCont').fadeOut( tiaTimings.speechBubbleFadeOutDuration );
    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );

}

function removeDoubleBtn() {

    $('#tutorialBtnDouble0').off( 'click' )
    $('#tutorialBtnDouble1').off( 'click' )
    $('.tut-double-btn').prop( 'disabled', true )
    $('#tutorialBtnDoubleCont').fadeOut( tiaTimings.speechBubbleFadeOutDuration );
    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );

}

function runTutorial() {

    showSingleBtn('Nice to meet you Tia.', greeting02 )

}

function greeting02() {

    removeSingleBtn();
    
    setTimeout( function() {

        tiaSpeak( "In this class, I will help you with your spoken English. Today, we will do a simple tutorial.", needSendTTS=true, function() { 
            
            showSingleBtn( "ok, let's begin", greeting03 ); 
        
        } );

    }, tiaTimings.speechBubbleFadeOutDuration * 2 );

}

function greeting03() {

    removeSingleBtn();
    
    setTimeout( function() {

        tiaSpeak( "You can talk to me by using a microphone. Do you have a microphone on your computer?", needSendTTS=true, function() { 
            
            showDoubleBtn( "yes", "no",  greeting04, greeting14 ) 
        
        } );

    }, tiaTimings.speechBubbleFadeOutDuration * 2 );

}

function greeting04() {

    removeDoubleBtn();

    setTimeout( function() {

        tiaSpeak( "Great, please make sure your microphone is on and working. We will begin testing it when you click the 'ok' button.", needSendTTS=true, function() {

            $('#recordVoiceBtn').prop( 'disabled', true );
            showSingleBtn( "ok", greeting05 )

        } );

    }, tiaTimings.speechBubbleFadeOutDuration * 2 );

}

function greeting05() {

    removeSingleBtn();

    setTimeout( function() {

        returnToLaptop('');

        $('#recordVoiceBtn').prop( 'disabled', true );

        setTimeout( function(){

            tiaSpeak( "Please click the blue microphone button and say 'nice to meet you'. Then click the red stop button.", needSendTTS=true, function() {
                
                $('#recordVoiceBtn').prop( 'disabled', false );
        
            });
    
            classVariableDict.tutorialNoMicCount = 0; // will increase if no audio detected
        
        }, tiaTimings.speechBubbleFadeOutDuration * 2 )

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting06() {

    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );

    setTimeout( function() {

        let textOnLaptop = $.trim($('#textInput').val().toLowerCase());
        console.log('text on laptop');

        if ( textOnLaptop === "nice to meet you" || textOnLaptop === "nice to meet you." ) {

            $('#listenSynthesisBtn').prop( 'disabled', true )
            $('#playRobot').prop( 'disabled', true )
            tiaSpeak( "Great work, now click the blue talking button on the right to hear your own voice.", needSendTTS=true, function() {

                $('#listenVoiceBtn').prop( 'disabled', false )

            } );

        } else if ( textOnLaptop === "" ) {

            if ( classVariableDict.tutorialNoMicCount === 0 ) {

                tiaSpeak( "There seems to be a problem with the microphone. Please check the settings and try again to say 'nice to meet you'.", needSendTTS=true, function() { 

                    $('.play-btn').prop( 'disabled', true );
                    $('#recordVoiceBtn').prop( 'disabled', false );
                    $('#recordVoiceBtn').show();

                } );

            } else if ( classVariableDict.tutorialNoMicCount = 1 ) {

                tiaSpeak( "There is still a problem with the microphone. Did you allow Google Chrome to access your microphon. If you click on the small 'i' next to 'erle.ucd.ie', you can turn it on. Then try again to say 'nice to meet you'.", needSendTTS=true, function() { 

                    $('.play-btn').prop( 'disabled', true );
                    $('#recordVoiceBtn').prop( 'disabled', false );
                    $('#recordVoiceBtn').show();

                } );

            }

        } else {

            tiaSpeak( "That is not quite correct. Try again to say 'nice to meet you'.", needSendTTS=true, function() {
                
                $('.play-btn').prop( 'disabled', true );
                $('#recordVoiceBtn').prop( 'disabled', false );
                $('#recordVoiceBtn').show();

            } );

        }

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting07() {

    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );

    setTimeout( function() {

        tiaSpeak( "Now click the green robot button on the laptop screen to hear the sentence spoken by a computer.", needSendTTS=true, function() {

            $('#playRobot').prop( 'disabled', false );

        } )

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting08() {

    $('#textInput').val('')
    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    
    setTimeout( function() {

        tiaSpeak( "You can also type sentences and then listen to native-like pronunciation. Please type 'this is my first class'. Then click the green robot button.", needSendTTS=true, function() {

            $('#playRobot').prop( 'disabled', false );
            classVariableDict.tutorialStep = 1;
            $('#textInput').focus();

        } )

    }, tiaTimings.speechBubbleFadeOutDuration * 2 );

}

function greeting28() {

    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    
    setTimeout( function() {

        tiaSpeak( "That is not quite correct. Please try again and type 'this is my first class'. Then click the green robot button.", needSendTTS=true, function() {

            $('#textInput').focus();

        } )

    }, tiaTimings.speechBubbleFadeOutDuration * 2 );

}

function greeting09() {

    removeSpeechBubble();
    let delay = tiaSpeak( "That is not quite correct. Please try again and type 'this is my first class'. Then click the speaker button.", function() {

        $('#textInput').focus();

    } )

}


function greeting10() {

    removeSpeechBubble();
    $('#textInputContainer').hide();
    initCameraMove('tia', '2')

    setTimeout( function() {

        let delay = tiaSpeak( "Well done, you can use the microphone and type very well!" );

        setTimeout( function(){

            classVariableDict.tutorialStep = 2;
            showSingleBtn( 'I am a quick learner!', greeting11 );

        }, delay )

    }, 3000)

}

function greeting11() {

    let delay = tiaSpeak( "If you use the microphone, sometimes the words on the laptop are NOT the same as what you said..." );

    setTimeout( function(){

        showSingleBtn( "why is that?", greeting12 )

    }, delay )

}

function greeting12() {

    let delay = tiaSpeak( "First, it may be a microphone problem..." );

    setTimeout( function(){

        showSingleBtn( "and second...?", greeting13 )

    }, delay )

}

function greeting13() {

    let delay = tiaSpeak( "Second, it may be that your pronunciation is not quite correct." );

    setTimeout( function(){

        showSingleBtn( "I understand", greeting14 )

    }, delay )

}

function greeting14() {

    let delay = tiaSpeak( "So, if the words are worng, listen to your own recording, and the native-like voice. Then you can try again." );

    setTimeout( function(){

        showSingleBtn( "Ok, I'm ready to begin!", greeting14 )

    }, delay )

}


function greeting14() {

    removeDoubleBtn();
    let delay = tiaSpeak( "That's ok, you can talk to me by typing also." );

    setTimeout( function(){

        showDoubleBtn( "yes", "no",  greeting04, greeting14 )

    }, delay )

}

