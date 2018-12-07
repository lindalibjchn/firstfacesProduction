var tiaSpeakCount = 0;
function tiaSpeak( tiaSays, needSendTTS=true, callback ) {

    // display text
    speechBubbleObject.sentence = tiaSays;
    $('.speaking-words').hide();
    $('.speaking-words-inside').show();
    $('.speaking-words-inside').text( speechBubbleObject.sentence );
    
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
            synthesisObject.endCount =  ( synthesisObject.delay * 60 / 1000 ) * 0.75 //dunno why the delay needs to be curtailed, but has to be
            synthesisObject.synthAudio.play();
            synthesisObject.gotNewSpeech = false
            initTalk();
            tiaSpeakCount = 0;

            //console.log('callback:', callback);

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

    classVariableDict.tutorialStep = 1;
    showSingleBtn('ok', greeting02 )
    $('#playRobot').hide();

}

function greeting02() {

    classVariableDict.tutorialStep = 2;
    removeSingleBtn();
    
    setTimeout( function() {

        tiaSpeak( "Have you watched the instructions video? It shows you how this website works.", needSendTTS=true, function() { 
            
            showDoubleBtn( "I watched it", "I didn't watch it",  greeting03, greeting0301 ) 
        
        } );

    }, tiaTimings.speechBubbleFadeOutDuration * 2 );

}

function greeting0301() {

    classVariableDict.tutorialStep = 301;
    removeDoubleBtn();
    
    setTimeout( function() {

        tiaSpeak( "Click 'instructions' on the top right. After watching the video, click the button below.", needSendTTS=true, function() { 
            
            showSingleBtn( "I have watched the video", greeting03 ) 
        
        } );

    }, tiaTimings.speechBubbleFadeOutDuration * 2 );

}

function greeting03() {

    classVariableDict.tutorialStep = 3;
    removeSingleBtn();
    removeDoubleBtn();
    
    setTimeout( function() {

        tiaSpeak( "Fantastic! Let's check that your sound is on. Can you hear my voice?", needSendTTS=true, function() { 
            
            showDoubleBtn( "yes I can", "no I can't",  greeting04, greeting0401 ) 
        
        } );

    }, tiaTimings.speechBubbleFadeOutDuration * 2 );

}

function greeting0401() {

    classVariableDict.tutorialStep = 401;
    removeDoubleBtn();
    
    setTimeout( function() {

        tiaSpeak( "Try turning up the volume, or use a headset instead.", needSendTTS=true, function() { 
            
            showSingleBtn( "ok, try again", greeting0402 )
        
        } );

    }, tiaTimings.speechBubbleFadeOutDuration * 2 );

}

function greeting0402() {

    classVariableDict.tutorialStep = 402;
    removeSingleBtn();
    
    setTimeout( function() {

        tiaSpeak( "How about now? Can you hear my voice?", needSendTTS=true, function() { 
            
            showDoubleBtn( "yes", "no",  greeting04, greeting0403 ) 
        
        } );

    }, tiaTimings.speechBubbleFadeOutDuration * 2 );

}

function greeting0403() {

    classVariableDict.tutorialStep = 403;
    removeDoubleBtn();
    
    setTimeout( function() {

        tiaSpeak( "That's ok. You don't need to hear me. You can read my words too. Let's test your microphone now.", needSendTTS=true, function() { 
            
            showSingleBtn( "ok, let's do that", greeting04 )
        
        } );

    }, tiaTimings.speechBubbleFadeOutDuration * 2 );

}

function greeting04() {

    classVariableDict.tutorialStep = 4;
    removeDoubleBtn();
    removeSingleBtn();

    setTimeout( function() {

        tiaSpeak( "Great, now make sure your microphone is on. We will begin testing it when you click the 'start' button.", needSendTTS=true, function() {

            $('#recordVoiceBtn').prop( 'disabled', true );
            showDoubleBtn( "start", "I don't have a microphone", greeting05, greeting0501 )

        } );

    }, tiaTimings.speechBubbleFadeOutDuration * 2 );

}

function greeting0501() {

    classVariableDict.tutorialStep = 501;
    removeDoubleBtn();

    setTimeout( function(){

        tiaSpeak( "Earphones and headphones usually have microphones too. Can you try them?", needSendTTS=true, function() {
            
            showDoubleBtn( "Yes, I can", "No, I can't use them", greeting05, greeting0502 )
    
        });

    
    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting0502() {

    classVariableDict.tutorialStep = 502;
    removeDoubleBtn();

    setTimeout( function(){

        tiaSpeak( "That's ok, you can talk to me by just typing. Is typing ok?", needSendTTS=true, function() {
            
            showDoubleBtn( "Yes it is", "No, I wan't to speak", greeting0513, greeting0503 )
    
        });

    
    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting0503() {

    classVariableDict.tutorialStep = 502;
    removeDoubleBtn();
    //classVariableDict.tutorialStep = 99;

    setTimeout( function(){

        tiaSpeak( "Ok, good choice. You will need to come back later with a headset, or headphones, or a microphone. You can do this tutorial again anytime. Click 'finish class' at the top right to return to the waiting area.", needSendTTS=true, function() {
            
        });

    
    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting0513() {

    classVariableDict.tutorialStep = 513;
    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    removeDoubleBtn();
    
    setTimeout( function() {

        returnToLaptop('');

        setTimeout( function() {

            tiaSpeak( "Type 'nice to meet you' and then click the green robot button.", needSendTTS=true, function() {

                $('#altCont').css( 'visibility', 'hidden' );
                $('#textInput').val('').focus();
                $('#playRobot').fadeIn( 1000 );
                $('#playRobot').prop( 'disabled', false )

            } )

        }, tiaTimings.speechBubbleFadeOutDuration * 2 )

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting0514() {

    classVariableDict.tutorialStep = 514;
    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );

    setTimeout( function() {

        let textOnLaptop = $.trim($('#textInput').val().toLowerCase());

        if ( textOnLaptop === "nice to meet you" || textOnLaptop === "nice to meet you." ) {

            
            tiaSpeak( "Great work. You can type sentences like this and listen to their pronunciation.", needSendTTS=true, function() {

                hideTextStuff();
                showSingleBtn( "ok, what's next?", greeting16 )

            } );

        } else {

            classVariableDict.tutorialStep = 513;

            tiaSpeak( "That is not quite correct. Try again to type 'nice to meet you'.", needSendTTS=true, function() {
                
                $('#textInput').focus();

            } );

        }

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting05() {

    classVariableDict.tutorialStep = 5;
    removeSingleBtn();
    removeDoubleBtn();

    setTimeout( function() {

        returnToLaptop('');

        $('#recordVoiceBtn').prop( 'disabled', true );

        setTimeout( function(){

            tiaSpeak( "Click the blue microphone button and say 'nice to meet you'. Then click the red stop button.", needSendTTS=true, function() {
                
                $('#recordVoiceBtn').prop( 'disabled', false );
        
            });
    
            classVariableDict.tutorialNoMicCount = 0; // will increase if no audio detected
        
        }, tiaTimings.speechBubbleFadeOutDuration * 2 )

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting06() {

    classVariableDict.tutorialStep = 6;
    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    
    $('#recordVoiceBtn').show();
    $('#recordVoiceBtn').prop( 'disabled', true );
    setTimeout( function() {

        let textOnLaptop = $.trim($('#textInput').val().toLowerCase());
        console.log('text on laptop');

        if ( textOnLaptop === "nice to meet you" || textOnLaptop === "nice to meet you." ) {

            $('#listenSynthesisBtn').prop( 'disabled', true )
            $('#playRobot').prop( 'disabled', true )
            tiaSpeak( "Great work! Now click the button with the talking person on the right to hear your own voice.", needSendTTS=true, function() {

                $('#listenVoiceBtn').prop( 'disabled', false )

            } );

        } else if ( textOnLaptop === "" ) {

            if ( classVariableDict.tutorialNoMicCount === 0 ) {
                
                classVariableDict.tutorialStep = 5;
                classVariableDict.tutorialNoMicCount += 1;

                tiaSpeak( "There seems to be a problem with the microphone. Check the settings and try again to say 'nice to meet you'.", needSendTTS=true, function() { 

                    $('.play-btn').prop( 'disabled', true );
                    $('#recordVoiceBtn').prop( 'disabled', false );
                    $('#recordVoiceBtn').show();

                } );

            } else if ( classVariableDict.tutorialNoMicCount = 1 ) {

                classVariableDict.tutorialStep = 5;
                classVariableDict.tutorialNoMicCount += 1;

                tiaSpeak( "There is still a problem with the microphone. Did you allow Google Chrome to access your microphone. If you click on the small 'i' next to 'erle.ucd.ie', you can turn it on. Then try again to say 'nice to meet you'.", needSendTTS=true, function() { 

                    $('.play-btn').prop( 'disabled', true );
                    $('#recordVoiceBtn').prop( 'disabled', false );
                    $('#recordVoiceBtn').show();

                } );

            } else {

                tiaSpeak( "Ok, it seems that your microphone is not working. Let's try typing.", needSendTTS=true, function() { 

                    showSingleBtn( "ok, what's next?", greeting0513 )

                } );

            }

        } else {

            tiaSpeak( "That is not quite correct. Try again to say 'nice to meet you'.", needSendTTS=true, function() {
                
                classVariableDict.tutorialStep = 5;
                $('.play-btn').prop( 'disabled', true );
                $('#recordVoiceBtn').prop( 'disabled', false );
                $('#recordVoiceBtn').show();

            } );

        }

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting07() {

    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    classVariableDict.tutorialStep = 7;
    hideTextStuff();

    setTimeout( function() {

        tiaSpeak( "Let's try a harder sentence. Click the microphone button and say 'I have half a sandwich, and the will to eat it whole'.", needSendTTS=true, function() {

            $('.play-btn').prop( 'disabled', true );
            $('#recordVoiceBtn').show();
            $('#recordVoiceBtn').prop( 'disabled', false );

        } )

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting08() {

    classVariableDict.tutorialStep = 8;
    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    
    $('#recordVoiceBtn').show();
    $('#recordVoiceBtn').prop( 'disabled', true );

    setTimeout( function() {

        if ( synthesisObject.alternatives > 1 ) {

            tiaSpeak( "Now, there are " + synthesisObject.alternatives.toString() + " possible sentences on the laptop screen. You can click the numbers to see them.", needSendTTS=true, function() {

                $('.sent-scores').on( 'click', greeting09 );

            } )

        } else {

            classVariableDict.tutorialStep = 7;
            tiaSpeak( "Let's try that one more time. Say 'I have half a sandwich, and the will to eat it whole'.", needSendTTS=true, function() {

                $('.play-btn').prop( 'disabled', true );
                $('#recordVoiceBtn').prop( 'disabled', false );

            } )

        }

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting09() {

    classVariableDict.tutorialStep = 9;
    $('.sent-scores').off( 'click', greeting09 );
    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    
    setTimeout( function() {

        tiaSpeak( "The computer's speech recognition is not perfect. Sometimes it is confused. You can correct it by trying again, or typing.", needSendTTS=true, function() {

            hideTextStuff();
            $('#textInput').blur();
            showSingleBtn( "Why does it get confused?", greeting10 )

        } )

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting10() {

    classVariableDict.tutorialStep = 10;
    removeSingleBtn();
    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    
    setTimeout( function() {

        tiaSpeak( "If two words have similar sounds, like 'have' and 'half', or 'whole' and 'hole', the computer may not be sure which one you said.", needSendTTS=true, function() {

            showSingleBtn( "Hmmm, English pronunciation can be difficult!", greeting11 )

        } )

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting11() {

    classVariableDict.tutorialStep = 11;
    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    removeSingleBtn();
    
    setTimeout( function() {

        tiaSpeak( "Yes it can! Also, the quality of the sound from your microphone is important. If you are in a noisy room, or speak too loudly, the sound can confuse the computer.", needSendTTS=true, function() {

            showSingleBtn( "What can I do?", greeting12 )

        } )

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting12() {

    classVariableDict.tutorialStep = 12;
    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    removeSingleBtn();
    
    setTimeout( function() {

        tiaSpeak( "Try to speak clearly, and watch the microphone volume on the laptop screen. If it turns red, then it is too loud.", needSendTTS=true, function() {

            showSingleBtn( "What about my pronunciation?", greeting13 )

        } )

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting13() {

    classVariableDict.tutorialStep = 13;
    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    removeSingleBtn();
    
    setTimeout( function() {

        tiaSpeak( "The computer can help you with difficult pronunciation. Type 'she sells seashells by the seashore' and then click the robot button.", needSendTTS=true, function() {

            $('#altCont').css( 'visibility', 'hidden' );
            $('#textInput').val('').focus();
            $('#playRobot').fadeIn( 1000 );
            $('#playRobot').prop( 'disabled', false )

        } )

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting14() {

    classVariableDict.tutorialStep = 14;
    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );

    setTimeout( function() {

        let textOnLaptop = $.trim($('#textInput').val().toLowerCase());

        if ( textOnLaptop === "she sells seashells by the seashore" || textOnLaptop === "she sells seashells by the seashore." ) {

            tiaSpeak( "Well done! Now click the microphone button and try to say the same sentence, 'she sells seashells by the seashore'", needSendTTS=true, function() {

                $('.play-btn').prop( 'disabled', true );
                $('#recordVoiceBtn').prop( 'disabled', false );

            } );

        } else {

            classVariableDict.tutorialStep = 13;
            tiaSpeak( "That is not quite correct. Try again to type 'she sells seashells by the seashore'.", needSendTTS=true, function() {
                
                $('#textInput').focus();

            } );

        }

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting15() {

    classVariableDict.tutorialStep = 15;
    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );

    $('#recordVoiceBtn').show();
    $('#recordVoiceBtn').prop( 'disabled', true );

    setTimeout( function() {

        let textOnLaptop = $.trim($('#textInput').val().toLowerCase());
        console.log('text on laptop');

        if ( textOnLaptop === "she sells seashells by the seashore" || textOnLaptop === "she sells seashells by the seashore." ) {
            
            hideTextStuff();
            tiaSpeak( "That was brilliant! We are nearly finished with the tutorial now! Just one more thing.", needSendTTS=true, function() {

                hideTextStuff();
                showSingleBtn( "What is it?", greeting16 )

            } );

        } else {

            setTimeout( function() {

                tiaSpeak( "It is a difficult sentence isn't it! We are nearly finished the tutorial! Just one more thing!", needSendTTS=true, function() {
                    
                    hideTextStuff();
                    showSingleBtn( "What is it?", greeting16 )

                } );

            }, 4000 );

        }

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

//function greeting1601() {

    //classVariableDict.tutorialStep = 1601;
    //removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    //removeDoubleBtn();
    
    //setTimeout( function() {

        //let textOnLaptop = $.trim($('#textInput').val().toLowerCase());
        //console.log('text on laptop');

        //if ( textOnLaptop === "he ate eight quesadillas" || textOnLaptop === "he ate eight quesadillas." ) {
            
            //tiaSpeak( "Great work. We are nearly finished with the tutorial! Just one more thing.", needSendTTS=true, function() {

                //showSingleBtn( "What is it?", greeting16 )

            //} );

        //} else {

            //tiaSpeak( "The computer can have difficulty with these types of sentences! Ok, we are nearly finished with the tutorial. Just one more thing.", needSendTTS=true, function() {
                
                //showSingleBtn( "What is it?", greeting16 )

            //} );

        //}


    //}, tiaTimings.speechBubbleFadeOutDuration * 2 )

//}

function greeting16() {

    classVariableDict.tutorialStep = 16;
    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    removeSingleBtn();
    hideTextStuff();
    
    setTimeout( function() {

        tiaSpeak( "Can you see the green 'play' button at the bottom right?", needSendTTS=true, function() {

            showSingleBtn( "Yes, I see it!", greeting17 )
            $('#talkBtn').prop( 'disabled', false );
            $('#talkBtn').off( 'click' );

        } )

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting17() {

    classVariableDict.tutorialStep = 17;
    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    removeSingleBtn();
    
    setTimeout( function() {

        tiaSpeak( "In your next class, when you click that button, a native English speaker will check your sentence. You will see if you made any mistakes.", needSendTTS=true, function() {

            $('#talkBtn').prop( 'disabled', true );
            showSingleBtn( "So, will I talk to a robot or a human?", greeting19 );

        } )

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

//function greeting18() {

    //removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    //removeSingleBtn();
    //classVariableDict.tutorialStep = 18;
    
    //setTimeout( function() {

        //tiaSpeak( "The native speaker will check ALL vocabulary and grammar mistakes! And if you make good sentences, they can talk to you too!", needSendTTS=true, function() {

            //showSingleBtn( "So, will I talk to a robot or a human?", greeting19 );

        //})

    //}, tiaTimings.speechBubbleFadeOutDuration * 2 )

//}

function greeting19() {

    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    removeSingleBtn();
    classVariableDict.tutorialStep = 19;
    
    setTimeout( function() {

        tiaSpeak( "You will talk to a REAL person - a native English speaker from Ireland. But, you will see and hear me, in this classroom.", needSendTTS=true, function() {

            showSingleBtn( "Does it take a long time to correct my sentences?", greeting20 );

        })

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting20() {

    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    removeSingleBtn();
    classVariableDict.tutorialStep = 20;
    
    setTimeout( function() {

        tiaSpeak( "It usually takes 5 to 10 seconds. But, sometimes, it can take a little bit longer. The teachers try to be as quick as possible for you!", needSendTTS=true, function() {

            showSingleBtn( "When can I take a class?", greeting21 );

        })

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting21() {

    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    removeSingleBtn();
    classVariableDict.tutorialStep = 99;
    
    setTimeout( function() {

        tiaSpeak( "Look at the schedule in the waiting room. It will show you the available times. This tutorial is finished now. I hope to see you again soon!", needSendTTS=true, function() {
         
            let calculatedExpression = createSingleExpression( expressionsRel.happy, 0.75 )[0];
            expressionController( calculatedExpression, tiaTimings.changeExpression );
            setTimeout( endTutorial, 2000 )
            
        })

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}


//function greeting09() {

    //removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    
    //setTimeout( function() {

        //tiaSpeak( "Now click the green robot button on the laptop screen to hear the sentence spoken by a computer.", needSendTTS=true, function() {

            //$('#playRobot').prop( 'disabled', false );

        //} )

    //}, tiaTimings.speechBubbleFadeOutDuration * 2 )

//}

//function greeting08() {

    //$('#textInput').val('')
    //removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    
    //setTimeout( function() {

        //tiaSpeak( "The robot can help you with difficult words. Try typing the word", needSendTTS=true, function() {

            //$('#playRobot').prop( 'disabled', false );
            //$('#textInput').focus();

        //} )

    //}, tiaTimings.speechBubbleFadeOutDuration * 2 );

//}

//function greeting28() {

    //removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    
    //setTimeout( function() {

        //tiaSpeak( "That is not quite correct. Please try again and type 'this is my first class'. Then click the green robot button.", needSendTTS=true, function() {

            //$('#textInput').focus();

        //} )

    //}, tiaTimings.speechBubbleFadeOutDuration * 2 );

//}

//function greeting09() {

    //removeSpeechBubble();
    //let delay = tiaSpeak( "That is not quite correct. Please try again and type 'this is my first class'. Then click the speaker button.", function() {

        //$('#textInput').focus();

    //} )

//}


//function greeting10() {

    //removeSpeechBubble();
    //$('#textInputContainer').hide();
    //initCameraMove('tia', '2')

    //setTimeout( function() {

        //let delay = tiaSpeak( "Well done, you can use the microphone and type very well!" );

        //setTimeout( function(){

            //classVariableDict.tutorialStep = 2;
            //showSingleBtn( 'I am a quick learner!', greeting11 );

        //}, delay )

    //}, 3000)

//}

//function greeting11() {

    //let delay = tiaSpeak( "If you use the microphone, sometimes the words on the laptop are NOT the same as what you said..." );

    //setTimeout( function(){

        //showSingleBtn( "why is that?", greeting12 )

    //}, delay )

//}

//function greeting12() {

    //let delay = tiaSpeak( "First, it may be a microphone problem..." );

    //setTimeout( function(){

        //showSingleBtn( "and second...?", greeting13 )

    //}, delay )

//}

//function greeting13() {

    //let delay = tiaSpeak( "Second, it may be that your pronunciation is not quite correct." );

    //setTimeout( function(){

        //showSingleBtn( "I understand", greeting14 )

    //}, delay )

//}

//function greeting14() {

    //let delay = tiaSpeak( "So, if the words are worng, listen to your own recording, and the native-like voice. Then you can try again." );

    //setTimeout( function(){

        //showSingleBtn( "Ok, I'm ready to begin!", greeting14 )

    //}, delay )

//}


//function greeting24() {

    //removeDoubleBtn();
    //let delay = tiaSpeak( "That's ok, you can talk to me by typing also." );

    //setTimeout( function(){

        //showDoubleBtn( "yes", "no",  greeting04, greeting14 )

    //}, delay )

//}

//function greeting08() {

    //$('#textInput').val('')
    //removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    
    //setTimeout( function() {

        //tiaSpeak( "You can also type sentences and then listen to native-like pronunciation. Please type 'this is my first class'. Then click the green robot button.", needSendTTS=true, function() {

            //$('#playRobot').prop( 'disabled', false );
            //classVariableDict.tutorialStep = 1;
            //$('#textInput').focus();

        //} )

    //}, tiaTimings.speechBubbleFadeOutDuration * 2 );

//}

