function runTutorial() {

    conversationVariables.tutorialStep = 0;
    //tiaPrepareToSpeak("Hello,_and_welcome_to_ERLE", speakCb=function(){
    tiaPrepareToSpeak("tutorial_start", speakCb=function(){

        showDoubleBtn( tutorialOption000, tutorialOption001 ) 

    })
    buttonsListenNextSentence();

}

function tutorialOption000() {

    conversationVariables.tutorialStep = '000';
    removeDoubleBtn();
    createSingleExpression( expressionObject.rel.sad, 0.5 );
    expressionController( expressionObject.calculated, 0.5 );
    //tiaPrepareToSpeak("tutorial_010", speakCb=function(){

    initNod(0.5, 0.5, function() {

        tiaPrepareToSpeak("That's_fine", speakCb=function(){
            
        
        })

        buttonsListenNextSentence();

    });

}

function tutorialOption001() {

    conversationVariables.tutorialStep = '001';
    removeDoubleBtn();
    
    initNod(0.3, 0.3, function() {

        //tiaPrepareToSpeak("That's_great!", speakCb=function(){
        tiaPrepareToSpeak("tutorial_001", speakCb=function(){

            showDoubleBtn( tutorialOption010, tutorialOption011 ) 

        })

        buttonsListenNextSentence();

    });

}

function tutorialOption010() {

    conversationVariables.tutorialStep = '010';
    removeDoubleBtn();
    createSingleExpression( expressionObject.rel.sad, 0.5 );
    expressionController( expressionObject.calculated, 0.5 );
    tiaPrepareToSpeak("It's_been_nice_meeting_you,_and_feel_free_to_come_back_again_any_time.", speakCb=function(){
    //tiaPrepareToSpeak("tutorial_010", speakCb=function(){

    })

    initNod(0.5, 0.5, function() {

        buttonsListenNextSentence();

    });

}

function tutorialOption011() {

    conversationVariables.tutorialStep = '011';
    removeDoubleBtn();
    
    initNod(0.3, 0.3, function() {

        tiaPrepareToSpeak("okay,_let's_get_started", speakCb=function(){
        //tiaPrepareToSpeak("tutorial_011", speakCb=function(){

            showDoubleBtn( tutorialOption020, tutorialOption021 ) 

        })

        buttonsListenNextSentence();

    });

}

function tutorialOption020() {

    conversationVariables.tutorialStep = '020';
    removeDoubleBtn();
    createSingleExpression( expressionObject.rel.sad, 0.5 );
    expressionController( expressionObject.calculated, 0.5 );
    tiaPrepareToSpeak("Try_checking_your_volume", speakCb=function(){
    //tiaPrepareToSpeak("tutorial_020", speakCb=function(){

    })

    initNod(0.5, 0.5, function() {

        buttonsListenNextSentence();

    });

}

function tutorialOption021() {

    conversationVariables.tutorialStep = '021';
    removeDoubleBtn();
    
    tiaPrepareToSpeak("I'm_glad_that_you_can_hear_my_voice", speakCb=function(){
    //tiaPrepareToSpeak("tutorial_021", speakCb=function(){

        //showDoubleBtn( tutorialOption030, tutorialOption031 ) 
        buttonsMicrophoneOnly();

    })

    initNod(0.3, 0.3, function() {

        buttonsListenNextSentence();

    });

}

function tutorialOption030() {

    conversationVariables.tutorialStep = '030';
    removeDoubleBtn();
    createSingleExpression( expressionObject.rel.sad, 0.5 );
    expressionController( expressionObject.calculated, 0.5 );
    tiaPrepareToSpeak("Try_checking_your_volume", speakCb=function(){
    //tiaPrepareToSpeak("tutorial_030", speakCb=function(){

    })

    initNod(0.5, 0.5, function() {

        buttonsListenNextSentence();

    });

}

function tutorialOption031() {

    conversationVariables.tutorialStep = '031';
    buttonsHideAllContainers();
    
    if ( conversationVariables.sentence_being_recorded_audio.alternatives[ 0 ].transcript = "nice to meet you" ) {

        tiaPrepareToSpeak("Well_done,_I_can_hear_you_perfectly", speakCb=function(){
        //tiaPrepareToSpeak("tutorial_031", speakCb=function(){
            
            $( '#sentenceShowHolder' ).fadeOut()
            showDoubleBtn( tutorialOption040, tutorialOption041 ) 

        })

        initNod(0.3, 0.3, function() {

            buttonsListenNextSentence();

        });

    } else {

        //tiaPrepareToSpeak("That_is_almost_correct", speakCb=function(){
        tiaPrepareToSpeak("tutorial_032", speakCb=function(){

            showDoubleBtn( tutorialOption040, tutorialOption041 ) 

        })

        initNod(0.3, 0.3, function() {

            buttonsListenNextSentence();

        });


    }

}

function tutorialOption040() {

    conversationVariables.tutorialStep = '040';
    removeDoubleBtn();
    createSingleExpression( expressionObject.rel.sad, 0.5 );
    expressionController( expressionObject.calculated, 0.5 );
    tiaPrepareToSpeak("Try_checking_your_volume", speakCb=function(){
    //tiaPrepareToSpeak("tutorial_040", speakCb=function(){

    })

    initNod(0.5, 0.5, function() {

        buttonsListenNextSentence();

    });

}

function tutorialOption041() {

    conversationVariables.tutorialStep = '041';
    removeDoubleBtn();
    
    tiaPrepareToSpeak("If_the_words_are_wrong,_you_can_tap_the_microphone_button_and_try_saying_the_sentence_again_clearly", speakCb=function(){
    //tiaPrepareToSpeak("tutorial_041", speakCb=function(){

        //showDoubleBtn( tutorialOption30, tutorialOption031 ) 
        //buttonsMicrophoneOnly();

    })

    initNod(0.3, 0.3, function() {

        buttonsListenNextSentence();

    });

}

function tutorialOption050() {

    conversationVariables.tutorialStep = '050';
    removeDoubleBtn();
    createSingleExpression( expressionObject.rel.sad, 0.5 );
    expressionController( expressionObject.calculated, 0.5 );
    tiaPrepareToSpeak("Try_checking_your_volume", speakCb=function(){
    //tiaPrepareToSpeak("tutorial_040", speakCb=function(){

    })

    initNod(0.5, 0.5, function() {

        buttonsListenNextSentence();

    });

}

function tutorialOption051() {

    conversationVariables.tutorialStep = '051';
    removeDoubleBtn();
    
    tiaPrepareToSpeak("Now,_tap_the_microphone_button_and_say,_'cold',_then_tap_the_stop_button", speakCb=function(){
    //tiaPrepareToSpeak("tutorial_051", speakCb=function(){

        $( '#keyboardOverlay' ).hide();
        $( '#overlayBtnBox' ).show();
        $( '#reRecordBtn' ).fadeIn();
        $( '#inputButtonsContainer' ).css('z-index', '1')
        //showDoubleBtn( tutorialOption30, tutorialOption031 ) 
        //buttonsMicrophoneOnly();

    })

    initNod(0.3, 0.3, function() {

        buttonsListenNextSentence();

    });

}

function tutorialOption060() {

    conversationVariables.tutorialStep = '060';
    removeDoubleBtn();
    createSingleExpression( expressionObject.rel.sad, 0.5 );
    expressionController( expressionObject.calculated, 0.5 );
    //tiaPrepareToSpeak("Try_checking_your_volume", speakCb=function(){
    tiaPrepareToSpeak("tutorial_060", speakCb=function(){

    })

    initNod(0.5, 0.5, function() {

        buttonsListenNextSentence();

    });

}

function tutorialOption061() {

    conversationVariables.tutorialStep = '061';
    $( '#overlayBtnBox' ).hide();
    $( '#inputButtonsContainer' ).css('z-index', '10');

    tiaPrepareToSpeak("That_is_perfect,_well_done", speakCb=function(){
    //tiaPrepareToSpeak("tutorial_061", speakCb=function(){

        $( '#inputButtonsContainer' ).css('z-index', '1');
        $( '#reRecordBtn' ).hide();
        $( '#overlayBtnBox' ).show();
        $( '#keyboardOverlay' ).fadeIn();

    })

    initNod(0.3, 0.3, function() {

        buttonsListenNextSentence();

    });

}

function tutorialSpectrogramButtonClickEvent() {

    if ( $('#bottomCent').text() === "cold" ) {

        $( '#inputButtonsContainer' ).css('z-index', '10');
        $( '#overlayBtnBox' ).hide();

        submitKeyboard();
        $('#keyboardOverlay').hide();
        decrease_type_size_stage2()
        removeSpeechBubble();
        tutorialOption071();

    }

}

function tutorialOption070() {

    conversationVariables.tutorialStep = '060';
    removeDoubleBtn();
    createSingleExpression( expressionObject.rel.sad, 0.5 );
    expressionController( expressionObject.calculated, 0.5 );
    //tiaPrepareToSpeak("Try_checking_your_volume", speakCb=function(){
    tiaPrepareToSpeak("tutorial_060", speakCb=function(){

    })

    initNod(0.5, 0.5, function() {

        buttonsListenNextSentence();

    });

}

function tutorialOption071() {

    conversationVariables.tutorialStep = '071';

    $( '#talkBtn' ).hide();
    $( '#overlayBtnBox' ).hide();
    $( '#inputButtonsContainer' ).css('z-index', '10');

    tiaPrepareToSpeak("Excellent,_good_job", speakCb=function(){

        $( '#talkBtn' ).show();

    })

    initNod(0.3, 0.3, function() {

        buttonsListenNextSentence();

    });

}

function tutorialOption080() {

    conversationVariables.tutorialStep = '080';
    removeDoubleBtn();
    createSingleExpression( expressionObject.rel.sad, 0.5 );
    expressionController( expressionObject.calculated, 0.5 );
    //tiaPrepareToSpeak("Try_checking_your_volume", speakCb=function(){
    tiaPrepareToSpeak("tutorial_080", speakCb=function(){

    })

    initNod(0.5, 0.5, function() {

        buttonsListenNextSentence();

    });

}

function tutorialOption081() {

    conversationVariables.tutorialStep = '081';

    $( '#talkBtn' ).hide();
    $('#correctionOverlay').hide();
    $('#textInputContainer').hide();
    tiaPrepareToSpeak("When_your_sentence_is_correct,_my_expression_will_change,_and_I_will_talk_to_you", speakCb=function(){

        console.log('tutorialOption 081 after speak');
        //expressionController( expressionObject.calculated, 0.8, function(){
            
            tutorialOption082();
            buttonsListenNextSentence();
         
        //})

    })


}

function tutorialOption082() {

    conversationVariables.tutorialStep = '082';

    tiaPrepareToSpeak("If_you_say_something_positive,_I_will_be_happy", speakCb=function(){

        //expressionController( expressionObject.calculated, 0.8, function(){ 
            
            tutorialOption083();
            buttonsListenNextSentence();

        //});

    });

}

function tutorialOption083() {

    conversationVariables.tutorialStep = '083';

    tiaPrepareToSpeak("You_can_also_make_me_feel_surprised...", speakCb=function(){

        //expressionController( expressionObject.calculated, 0.8, function(){
            
            tutorialOption084();
            buttonsListenNextSentence();

        //});

    });

}

function tutorialOption084() {

    conversationVariables.tutorialStep = '084';

    tiaPrepareToSpeak("content...", speakCb=function(){

        //expressionController( expressionObject.calculated, 0.8, function(){
            
            tutorialOption085();
            buttonsListenNextSentence();

        //});

    });

}

function tutorialOption085() {

    conversationVariables.tutorialStep = '085';

    tiaPrepareToSpeak("scared...", speakCb=function(){

        //expressionController( expressionObject.calculated, 0.8, function(){
            
            tutorialOption086();
            buttonsListenNextSentence();

        //});

    });

}

function tutorialOption086() {

    conversationVariables.tutorialStep = '086';

    tiaPrepareToSpeak("and_disgusted...", speakCb=function(){

        //expressionController( expressionObject.calculated, 0.8, function(){
            
            createSingleExpression( expressionObject.rel.happy, 0.8 )
            
            setTimeout( function(){

                expressionController( expressionObject.half, 1.2, function() {
            
                    tutorialOption091();
                    buttonsListenNextSentence();

                });

            }, 1000);

        //});

    });

}

function tutorialOption091() {

    conversationVariables.tutorialStep = '091';

    tiaPrepareToSpeak("But,_you_will_only_see_these_expressions_if_your_sentence_is_correct", speakCb=function(){


    })

}






















































function greeting03() {

    conversationVariables.tutorialStep = 3;
    removeSingleBtn();
    removeDoubleBtn();
    
    setTimeout( function() {

        tiaSpeak( "Fantastic! Let's check that your sound is on. Can you hear my voice?", needSendTTS=true, function() { 
            
            showDoubleBtn( "yes I can", "no I can't",  function(){
                
                sendSoundMicToServer( "sound", true );

                // if mic is not enabled
                if ( conversationVariables.audio ) {
                
                    greeting04();                
                
                } else {

                    greeting0411();

                }
                
            }, greeting0401 ) 
        
        } );

    }, tiaTimings.speechBubbleFadeOutDuration * 2 );

}

function greeting0401() {

    conversationVariables.tutorialStep = 401;
    removeDoubleBtn();
    
    setTimeout( function() {

        tiaSpeak( "Try turning up the volume, or use a headset instead.", needSendTTS=true, function() { 
            
            showSingleBtn( "ok, try again", greeting0402 )
        
        } );

    }, tiaTimings.speechBubbleFadeOutDuration * 2 );

}

function greeting0402() {

    conversationVariables.tutorialStep = 402;
    removeSingleBtn();
    
    setTimeout( function() {

        tiaSpeak( "How about now? Can you hear my voice?", needSendTTS=true, function() { 
            
            showDoubleBtn( "yes", "no", function(){greeting04();sendSoundMicToServer( "sound", true );}, greeting0403 ) 
        
        } );

    }, tiaTimings.speechBubbleFadeOutDuration * 2 );

}

function greeting0403() {

    conversationVariables.tutorialStep = 403;
    removeDoubleBtn();

    sendSoundMicToServer( "sound", false );
    
    setTimeout( function() {

        tiaSpeak( "That's ok. You don't need to hear me. You can read my words too. Let's test your microphone now.", needSendTTS=true, function() { 
            
            showSingleBtn( "next", greeting04 )
        
        } );

    }, tiaTimings.speechBubbleFadeOutDuration * 2 );

}

function greeting0411() {

    conversationVariables.tutorialStep = 411;
    removeDoubleBtn();
    removeSingleBtn();

    setTimeout( function() {

        tiaSpeak( "You have not allowed Google Chrome to use the microphone. So, you can only type. Is that ok?", needSendTTS=true, function() {

            showDoubleBtn( "Yes, typing is ok", "No, I want to speak", greeting0513, greeting0412 )

        } );

    }, tiaTimings.speechBubbleFadeOutDuration * 2 );

}

function greeting0412() {

    conversationVariables.tutorialStep = 412;
    removeDoubleBtn();

    setTimeout( function() {

        tiaSpeak( "Click the lock, or small 'i' next to the web address and then change the settings to allow the microphone. Then refresh this page and the tutorial will start again.", needSendTTS=true, function() {

        } );

    }, tiaTimings.speechBubbleFadeOutDuration * 2 );

}

function greeting04() {

    conversationVariables.tutorialStep = 4;
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

    conversationVariables.tutorialStep = 501;
    removeDoubleBtn();

    setTimeout( function(){

        tiaSpeak( "Earphones and headphones usually have microphones too. Can you try them?", needSendTTS=true, function() {
            
            showDoubleBtn( "Yes, I can", "No, I can't use them", greeting05, greeting0502 )
    
        });

    
    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting0502() {

    conversationVariables.tutorialStep = 502;
    removeDoubleBtn();

    setTimeout( function(){

        tiaSpeak( "That's ok, you can talk to me by just typing. Is typing ok?", needSendTTS=true, function() {
            
            showDoubleBtn( "Yes, typing is ok", "No, I wan't to speak", greeting0513, greeting0503 )
    
        });

    
    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting0503() {

    conversationVariables.tutorialStep = 502;
    removeDoubleBtn();
    //conversationVariables.tutorialStep = 99;

    setTimeout( function(){

        tiaSpeak( "Ok, good choice. You will need to come back later with a headset, or headphones, or a microphone. You can do this tutorial again anytime. Click 'finish class' at the top right to return to the waiting area.", needSendTTS=true, function() {
            
        });

    
    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting0513() {

    sendSoundMicToServer( "microphone", false );
    conversationVariables.tutorialStep = 513;
    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    removeSingleBtn();
    removeDoubleBtn();
    $('#recordVoiceBtn').prop( 'disabled', true );
    
    setTimeout( function() {

        returnToLaptop('');

        setTimeout( function() {

            $('#recordVoiceBtn').prop( 'disabled', true );
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

    conversationVariables.tutorialStep = 514;
    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );

    setTimeout( function() {

        let textOnLaptop = $.trim($('#textInput').val().toLowerCase());

        if ( textOnLaptop === "nice to meet you" || textOnLaptop === "nice to meet you." ) {

            
            tiaSpeak( "Great work. You can type sentences like this and listen to their pronunciation.", needSendTTS=true, function() {

                hideTextStuff();
                showSingleBtn( "next", greeting17 )

            } );

        } else {

            conversationVariables.tutorialStep = 513;

            tiaSpeak( "That is not quite correct. Try again to type 'nice to meet you'.", needSendTTS=true, function() {
                
                $('#textInput').focus();

            } );

        }

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting05() {

    conversationVariables.tutorialStep = 5;
    removeSingleBtn();
    removeDoubleBtn();

    setTimeout( function() {

        returnToLaptop('');

        setTimeout( function(){

            $('#textInput').prop('disabled', true);

            tiaSpeak( "Click the blue microphone button and say 'nice to meet you'. Then click the red stop button.", needSendTTS=true, function() {
                
                $('#recordVoiceBtn').prop( 'disabled', false );
        
            });
    
            conversationVariables.tutorialNoMicCount = 0; // will increase if no audio detected
        
        // times 3 to allow time to return to laptop before speaking again
        }, tiaTimings.speechBubbleFadeOutDuration * 3 )

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting06() {

    conversationVariables.tutorialStep = 6;
    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    
    $('#recordVoiceBtn').show();
    $('#recordVoiceBtn').prop( 'disabled', true );
    setTimeout( function() {

        let textOnLaptop = $.trim($('#textInput').val().toLowerCase());
      //console.log('text on laptop');

        if ( textOnLaptop === "nice to meet you" || textOnLaptop === "nice to meet you." ) {

            $('#listenSynthesisBtn').prop( 'disabled', true )
            $('#playRobot').prop( 'disabled', true )
            tiaSpeak( "Great work! Now click the button with the talking person on the right to hear your own voice.", needSendTTS=true, function() {

                $('#listenVoiceBtn').prop( 'disabled', false )

            } );

        } else if ( textOnLaptop === "" ) {

            if ( conversationVariables.tutorialNoMicCount === 0 ) {
                
                conversationVariables.tutorialStep = 5;
                conversationVariables.tutorialNoMicCount += 1;

                tiaSpeak( "There seems to be a problem with the microphone. Check the settings and try again to say 'nice to meet you'.", needSendTTS=true, function() { 

                    $('.play-btn').prop( 'disabled', true );
                    $('#recordVoiceBtn').prop( 'disabled', false );
                    $('#recordVoiceBtn').show();

                } );

            } else if ( conversationVariables.tutorialNoMicCount === 1 ) {

                conversationVariables.tutorialStep = 5;
                conversationVariables.tutorialNoMicCount += 1;

                tiaSpeak( "There is still a problem with the microphone. Did you allow Google Chrome to access your microphone. If you click on the small 'i' next to 'erle.ucd.ie', you can turn it on. Then try again to say 'nice to meet you'.", needSendTTS=true, function() { 

                    $('.play-btn').prop( 'disabled', true );
                    $('#recordVoiceBtn').prop( 'disabled', false );
                    $('#recordVoiceBtn').show();

                } );

            } else {

                tiaSpeak( "Ok, it seems that your microphone is not working. Let's try typing.", needSendTTS=true, function() { 

                    $('#recordVoiceBtn').prop( 'disabled', true );

                    showSingleBtn( "next", greeting0513 )

                } );

            }

        } else {

            tiaSpeak( "That is not quite correct. Try again to say 'nice to meet you'.", needSendTTS=true, function() {
                
                conversationVariables.tutorialStep = 5;
                $('.play-btn').prop( 'disabled', true );
                $('#recordVoiceBtn').prop( 'disabled', false );
                $('#recordVoiceBtn').show();

            } );

        }

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting07() {

    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    conversationVariables.tutorialStep = 7;
    hideTextStuff();
    sendSoundMicToServer( "microphone", true );

    setTimeout( function() {

        tiaSpeak( "Let's try a harder sentence. Click the microphone button and say 'I have half a sandwich, and the will to eat it whole'.", needSendTTS=true, function() {

            $('.play-btn').prop( 'disabled', true );
            $('#recordVoiceBtn').show();
            $('#recordVoiceBtn').prop( 'disabled', false );

        } )

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting08() {

    conversationVariables.tutorialStep = 8;
    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    
    $('#recordVoiceBtn').show();
    $('#recordVoiceBtn').prop( 'disabled', true );

    setTimeout( function() {

        if ( synthesisObject.alternatives > 1 ) {

            tiaSpeak( "Now, there are " + synthesisObject.alternatives.toString() + " possible sentences on the laptop screen. You can click the numbers to see them.", needSendTTS=true, function() {

                $('.sent-scores').on( 'click', greeting09 );

            } )

        } else {

            conversationVariables.tutorialStep = 7;
            tiaSpeak( "Let's try that one more time. Say 'I have half a sandwich, and the will to eat it whole'.", needSendTTS=true, function() {

                $('.play-btn').prop( 'disabled', true );
                $('#recordVoiceBtn').prop( 'disabled', false );

            } )

        }

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting09() {

    conversationVariables.tutorialStep = 9;
    $('.sent-scores').off( 'click', greeting09 );
    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    
    setTimeout( function() {

        tiaSpeak( "'have' and 'half', or 'eat it whole' and 'eat at home' sound similar. Sometimes, the computer may not be sure which one you said. If this happens, and the computer is wrong, you can correct it by trying again, or typing.", needSendTTS=true, function() {

            hideTextStuff();
            $('#textInput').blur();
            showSingleBtn( "next", greeting11 )

        } )

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

//function greeting10() {

    //conversationVariables.tutorialStep = 10;
    //removeSingleBtn();
    //removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    
    //setTimeout( function() {

        //tiaSpeak( ".", needSendTTS=true, function() {

            //showSingleBtn( "Hmmm, English pronunciation can be difficult!", greeting11 )

        //} )

    //}, tiaTimings.speechBubbleFadeOutDuration * 2 )

//}

function greeting11() {

    conversationVariables.tutorialStep = 11;
    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    removeSingleBtn();
    
    setTimeout( function() {

        tiaSpeak( "Also, the sound from your microphone is important. If you are in a noisy room, or speak too loudly, it can confuse the computer. So, try to speak clearly and watch the microphone volume on the laptop screen.", needSendTTS=true, function() {

            showSingleBtn( "next", greeting13 )

        } )

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

//function greeting12() {

    //conversationVariables.tutorialStep = 12;
    //removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    //removeSingleBtn();
    
    //setTimeout( function() {

        //tiaSpeak( "Try to speak clearly, and watch the microphone volume on the laptop screen. If it turns red, then it is too loud.", needSendTTS=true, function() {

            //showSingleBtn( "What about my pronunciation?", greeting13 )

        //} )

    //}, tiaTimings.speechBubbleFadeOutDuration * 2 )

//}

function greeting13() {

    conversationVariables.tutorialStep = 13;
    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    removeSingleBtn();
    
    setTimeout( function() {

        tiaSpeak( "Your pronunciation is also very important. The computer can help you with difficult words and phrases. Type 'she sells seashells by the seashore' and then click the robot button.", needSendTTS=true, function() {

            $('#altCont').css( 'visibility', 'hidden' );
            $('#textInput').prop('disabled', false);
            $('#textInput').val('').focus();
            $('#playRobot').fadeIn( 1000 );
            $('#playRobot').prop( 'disabled', false )

        } )

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting14() {

    conversationVariables.tutorialStep = 14;
    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );

    setTimeout( function() {

        let textOnLaptop = $.trim($('#textInput').val().toLowerCase());

        if ( textOnLaptop === "she sells seashells by the seashore" || textOnLaptop === "she sells seashells by the seashore." ) {

            $('#textInput').prop('disabled', true);
            tiaSpeak( "Well done! Now click the microphone button and try to say the same sentence, 'she sells seashells by the seashore'", needSendTTS=true, function() {

                $('.play-btn').prop( 'disabled', true );
                $('#recordVoiceBtn').prop( 'disabled', false );

            } );

        } else {

            conversationVariables.tutorialStep = 13;
            tiaSpeak( "That is not quite correct. Try again to type 'she sells seashells by the seashore'.", needSendTTS=true, function() {
                
                $('#textInput').focus();

            } );

        }

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting15() {

    conversationVariables.tutorialStep = 15;
    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );

    $('#recordVoiceBtn').show();
    $('#recordVoiceBtn').prop( 'disabled', true );

    setTimeout( function() {

        let textOnLaptop = $.trim($('#textInput').val().toLowerCase());
      //console.log('text on laptop');

        if ( textOnLaptop === "she sells seashells by the seashore" || textOnLaptop === "she sells seashells by the seashore." ) {
            
            hideTextStuff();
            tiaSpeak( "That was brilliant! If you have trouble with a word or phrase, use the robot button to hear the computer's voice, and then try it yourself. Ok, now look at the green 'play' button on the bottom right.", needSendTTS=true, function() {

                $('#talkBtn').prop( 'disabled', false );
                $('#talkBtn').off( 'click' );
                hideTextStuff();

                setTimeout( function() {

                    showSingleBtn( "next", greeting17 )

                }, 1500 );

            } );

        } else {

            setTimeout( function() {

                tiaSpeak( "It is a difficult sentence isn't it! Ok, now look at the green 'play' button on the bottom right.", needSendTTS=true, function() {
                    
                    $('#talkBtn').prop( 'disabled', false );
                    $('#talkBtn').off( 'click' );
                    hideTextStuff();

                    setTimeout( function() {

                        showSingleBtn( "next", greeting17 )

                    }, 1500 )

                } );

            }, 4000 );

        }

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

//function greeting1601() {

    //conversationVariables.tutorialStep = 1601;
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

//function greeting16() {

    //$('#recordVoiceBtn').prop( 'disabled', true );
    //conversationVariables.tutorialStep = 16;
    //removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    //removeSingleBtn();
    //hideTextStuff();
    
    //setTimeout( function() {

        //tiaSpeak( "Look at the green 'play' button at the bottom right.", needSendTTS=true, function() {

            //showSingleBtn( "I see it", greeting17 )
            //$('#talkBtn').prop( 'disabled', false );
            //$('#talkBtn').off( 'click' );

        //} )

    //}, tiaTimings.speechBubbleFadeOutDuration * 2 )

//}

function greeting17() {

    conversationVariables.tutorialStep = 17;
    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    removeSingleBtn();

    $('#talkBtn').prop( 'disabled', false );
    $('#talkBtn').off( 'click' );
    
    setTimeout( function() {

        tiaSpeak( "In your next class, when you click the green 'play' button, a native English speaker will check your sentence. You will see if you made any mistakes in vocabulary or grammar.", needSendTTS=true, function() {

            $('#talkBtn').prop( 'disabled', true );
            showSingleBtn( "next", greeting18 );

        } )

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function quadBtnFunc() {

    //conversationVariables.quadBtnFuncCount += 1;

    showQuadBtn( 

        "Will I talk to a robot or a human?",
        "Does it take a long time to correct my sentences?",
        "When can I take a class?",
        "What are the books in the waiting area?",
        greeting19,
        greeting20,
        greeting21,
        greeting22

    );

}

function greeting18() {

    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    removeSingleBtn();
    conversationVariables.tutorialStep = 99;
    
    setTimeout( function() {

        tiaSpeak( "This tutorial is nearly over, but you can ask some questions now. When you are finished, click the 'finish class' button on the top right.", needSendTTS=true, quadBtnFunc )

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting19() {

    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    removeQuadBtn();
    conversationVariables.tutorialStep = 99;
    
    setTimeout( function() {

        tiaSpeak( "You will talk to a real person - a native English speaker from Ireland. But, you will see and hear me, in this classroom.", needSendTTS=true, function() {

            $('#tutorialBtnQuad0').prop( 'disabled', true );
            quadBtnFunc();

        })

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting20() {

    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    removeQuadBtn();
    conversationVariables.tutorialStep = 99;
    
    setTimeout( function() {

        tiaSpeak( "It usually takes 5 to 10 seconds. But, sometimes, it can take a little bit longer. The teachers try to be as quick as possible for you!", needSendTTS=true, function() {

            $('#tutorialBtnQuad1').prop( 'disabled', true );
            quadBtnFunc();

        })

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting21() {

    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    removeQuadBtn();
    conversationVariables.tutorialStep = 99;
    
    setTimeout( function() {

        tiaSpeak( "Look at the schedule in the waiting room. It will show you the available times. Remember that the times shown are Irish time, which might be quite different from your own!", needSendTTS=true, function() {
         
            $('#tutorialBtnQuad2').prop( 'disabled', true );
            quadBtnFunc();

            
        })

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

function greeting22() {

    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    removeQuadBtn();
    conversationVariables.tutorialStep = 99;
    
    setTimeout( function() {

        tiaSpeak( "In the sentences book, you will be able to see every recording and sentence you made in a full class. In the tests book, there will be tests made just for you. They will focus on the areas which can help you improve the most!", needSendTTS=true, function() {
         
            $('#tutorialBtnQuad3').prop( 'disabled', true );
            quadBtnFunc();

            
        })

    }, tiaTimings.speechBubbleFadeOutDuration * 2 )

}

//function greeting23() {

    //removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
    //removeQuadBtn();
    //conversationVariables.tutorialStep = 99;

    //tiaSpeak( "Thank you for finishing the tutorial. I hope to see you again soon!", needSendTTS=true, function() {
     
        //let finalExpression = createSingleExpression( expressionObject.rel.happy, 0.75 );
        //calculatedExpression = getAbsoluteCoordsOfExpressionTo( finalExpression[ 0 ] )
        //expressionController( calculatedExpression, tiaTimings.changeExpressionDurationDurationDurationDurationDurationDurationDurationDurationDurationDurationDurationDurationDurationDurationDurationDurationDurationDurationDurationDurationDurationDurationDurationDurationDurationDurationDurationDurationDurationDurationDurationDurationDurationDurationDurationDurationDurationDurationDuration );
        //setTimeout( endTutorial, 3000 )
        
    //})

//}

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

            //conversationVariables.tutorialStep = 2;
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
            //conversationVariables.tutorialStep = 1;
            //$('#textInput').focus();

        //} )

    //}, tiaTimings.speechBubbleFadeOutDuration * 2 );

//}

