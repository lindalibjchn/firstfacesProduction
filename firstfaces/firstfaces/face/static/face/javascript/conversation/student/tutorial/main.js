function runTutorial() {

    $('#stopAllButtonEffectsExceptInputButtons').show();
    conversationVariables.tutorialStep = 0;
    //["Hello, and welcome to ERLE", "This is your personal, private English classroom, where you can practise your English speaking", "My name is Saoirse, and I will be your teacher", "I will help you improve your English, by showing you your vocabulary and grammar mistakes", "I am a very honest teacher...", "so every time you make a mistake, even a small one, I will tell you", "Is that okay?"]
    tiaPrepareToSpeak("Hello,_and_welcome_to_ERLE", speakCb=function(){
    //tiaPrepareToSpeak("tutorial_start", speakCb=function(){

        showDoubleBtn( tutorialOption000, tutorialOption001 ) 

    })
    buttonsListenNextSentence();

}

function tutorialOption000() {

    conversationVariables.tutorialStep = '000';
    removeDoubleBtn();
    createSingleExpression( expressionObject.rel.sad, 0.2 );
    expressionController( expressionObject.calculated, 0.6, function() { 

        tiaPrepareToSpeak("That's_okay,_if_you_change_your_mind,_you_can_always_come_back_another_time", speakCb=function(){
            
            window.location.href = prefixURL + 'waiting'
        
        })

        buttonsListenNextSentence();
    
    });

}

function tutorialOption001() {

    conversationVariables.tutorialStep = '001';
    removeDoubleBtn();
    
    initNod(0.3, 0.3, function() {

        // ["That's great!", "Before we begin chatting, you need to complete a short tutorial", "Do you have 10 minutes to do the tutorial now?"]
        tiaPrepareToSpeak("That's_great!", speakCb=function(){
        //tiaPrepareToSpeak("tutorial_001", speakCb=function(){

            showDoubleBtn( tutorialOption010, tutorialOption011 ) 

        })

        buttonsListenNextSentence();

    });

}

function tutorialOption010() {

    conversationVariables.tutorialStep = '010';
    removeDoubleBtn();
    createSingleExpression( expressionObject.rel.sad, 0.2 );
    expressionController( expressionObject.calculated, 0.6, function() {

        //tiaPrepareToSpeak("No_problem,_you_can_always_come_back_another_time", speakCb=function(){
        tiaPrepareToSpeak("tutorial_010", speakCb=function(){
            
            window.location.href = prefixURL + 'waiting'

        })

        buttonsListenNextSentence();
    
    })

}

function tutorialOption011() {

    conversationVariables.tutorialStep = '011';
    removeDoubleBtn();
    
    initNod(0.3, 0.3, function() {

        // ["okay, let's get started", "first, please tell me, can you hear my voice?"]
        tiaPrepareToSpeak("okay,_let's_get_started", speakCb=function(){
        //tiaPrepareToSpeak("tutorial_011", speakCb=function(){

            showDoubleBtn( tutorialOption020, tutorialOption021 ) 

        })

        buttonsListenNextSentence();

    });

}

function tutorialOption012() {

    conversationVariables.tutorialStep = '012';
    removeSingleBtn();
    
    initNod(0.3, 0.3, function() {

        tiaPrepareToSpeak("Let's_try_this_again,_can_you_hear_my_voice_now", speakCb=function(){
        //tiaPrepareToSpeak("tutorial_011", speakCb=function(){

            showDoubleBtn( tutorialOption020, tutorialOption021 ) 

        })

        buttonsListenNextSentence();

    });

}

function tutorialOption020() {

    conversationVariables.tutorialStep = '020';
    removeDoubleBtn();
    createSingleExpression( expressionObject.rel.sad, 0.2 );
    expressionController( expressionObject.calculated, 0.5 );
    tiaPrepareToSpeak("Turn_up_your_volume,_check_your_settings,_or,_if_that_fails,_put_in_headphones", speakCb=function(){
    //tiaPrepareToSpeak("tutorial_020", speakCb=function(){

        showSingleBtn( tutorialOption012 );

    })

    buttonsListenNextSentence();

}

function tutorialOption021() {

    conversationVariables.tutorialStep = '021';
    removeDoubleBtn();
    createSingleExpression( expressionObject.rel.happy, 0.5 );
    expressionController( expressionObject.calculated, 0.5 );
    
    // ["Okay, great, now let's check that I can hear your voice too", "After I finish speaking, a blue microphone button will appear below", "please tap it and say, 'nice to meet you', then tap the red stop button"]
    tiaPrepareToSpeak("Okay,_great,_now_let's_check_that_I_can_hear_your_voice_too", speakCb=function(){
    //tiaPrepareToSpeak("tutorial_021", speakCb=function(){

        buttonsMicrophoneOnly();

    })

    initNod(0.3, 0.3, function() {

        buttonsListenNextSentence();

    });

}

function tutorialOption022() {

    removeSingleBtn();
    
    tiaPrepareToSpeak("Okay,_great,_now_let's_check_that_I_can_hear_your_voice_too", speakCb=function(){
    //tiaPrepareToSpeak("Let's_try_that_again", speakCb=function(){

        buttonsMicrophoneOnly();

    })

    buttonsListenNextSentence();

}

//function tutorialOption030() {

    //conversationVariables.tutorialStep = '030';
    //removeDoubleBtn();
    //createSingleExpression( expressionObject.rel.sad, 0.5 );
    //expressionController( expressionObject.calculated, 0.5 );
    //tiaPrepareToSpeak("", speakCb=function(){
    ////tiaPrepareToSpeak("tutorial_030", speakCb=function(){

    //})

    //initNod(0.5, 0.5, function() {

        //buttonsListenNextSentence();

    //});

//}

function tutorialOption031() {

    conversationVariables.tutorialStep = '031';
    buttonsHideAllContainers();
    
    if ( conversationVariables.sentence_being_recorded_audio.alternatives[ 0 ].transcript === "nice to meet you" ) {

        tutorialOption041();

    } else if ( conversationVariables.sentence_being_recorded_audio.alternatives[ 0 ].transcript !== "" ) {

        //tiaPrepareToSpeak("That_is_almost_correct", speakCb=function(){
        // ["That is not quite correct", "please tap the microphone button again and say, 'nice to meet you', then tap the red stop button"]
        tiaPrepareToSpeak("That_is_not_quite_correct", speakCb=function(){

            $('#textInputContainer').hide();
            conversationVariables.tutorialStep = '021';
            buttonsMicrophoneOnly();

        })

        buttonsListenNextSentence();

    } else {

        //tiaPrepareToSpeak("That_is_almost_correct", speakCb=function(){
        // ["I couldn't hear anything at all", "Please check your settings and give permission for this site to use your microphone"]
        tiaPrepareToSpeak("I_couldn't_hear_anything_at_all", speakCb=function(){

            conversationVariables.tutorialStep = '021';
            showSingleBtn( tutorialOption022 );

        })

        initShake(0.4, 0.4, function() {

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

function prepare041() {

    conversationVariables.sentence_being_recorded_audio.alternatives = [{transcript: "I feel bad because I catch a coat"}]
    conversationVariables.sentence_being_recorded_audio.currentAudID = 908;
    tutorialOption041();
    dealWithAfterTap();

}

function tutorialOption041() {

    conversationVariables.tutorialStep = '041';
    removeDoubleBtn();
    
    // ["Well done, I can hear you perfectly", "Sometimes, the words on the screen will not match what you said", "This may be because of microphone problems, background noise, or incorrect pronunciation", "If the words are wrong, you can tap the microphone button and try saying the sentence again clearly", "However, you can also correct words individually, for example...", "I say, 'I feel bad because I catch a cold'", "But the words below show 'coat' instead of 'cold'", "Tap the word 'coat' and then tap the green button"]
    tiaPrepareToSpeak("Well_done,_I_can_hear_you_perfectly", speakCb=function(){
    //tiaPrepareToSpeak("tutorial_041", speakCb=function(){
        
        $('#stopAllButtonEffectsExceptInputButtons').hide();
        //$( '#sentenceShowHolder' ).fadeOut()
        //showDoubleBtn( tutorialOption040, tutorialOption041 ) 

    })

    setTimeout( function() {

        initNod(0.3, 0.3, function() {

            buttonsListenNextSentence();

        });

    }, 1000 );

}

function tutorialOption051() {

    conversationVariables.tutorialStep = '051';
    removeDoubleBtn();
    $('#stopAllButtonEffectsExceptInputButtons').show();
    
    tiaPrepareToSpeak("Now,_tap_the_microphone_button_and_say,_'cold',_then_tap_the_stop_button", speakCb=function(){
    //tiaPrepareToSpeak("tutorial_051", speakCb=function(){

        $( '#keyboardOverlay' ).hide();
        $( '#overlayBtnBox' ).show();
        $( '#reRecordBtn' ).fadeIn();
        $( '#inputButtonsContainer' ).css('z-index', '1')
        //showDoubleBtn( tutorialOption30, tutorialOption031 ) 
        //buttonsMicrophoneOnly();

    })

    setTimeout( buttonsListenNextSentence, 1500 );

}

function tutorialOption061() {

    conversationVariables.tutorialStep = '061';
    $( '#overlayBtnBox' ).hide();
    $( '#inputButtonsContainer' ).css('z-index', '10');

    let spokenWordTranscription = $('#bottomCent').text();
  
    if ( spokenWordTranscription === "cold" ) {

        tiaPrepareToSpeak("That_is_perfect,_well_done", speakCb=function(){
        //tiaPrepareToSpeak("tutorial_061", speakCb=function(){

            $( '#inputButtonsContainer' ).css('z-index', '1');
            $( '#reRecordBtn' ).hide();
            $( '#overlayBtnBox' ).show();
            $( '#keyboardOverlay' ).fadeIn();

        })

        setTimeout( function() {

            initNod(0.3, 0.3, function() {

                buttonsListenNextSentence();

            });

        }, 1500 );

    //} else if ( spokenWordTranscription !== "" ) {

        //tiaPrepareToSpeak("That_is_not_quite_right,_try_again_to_say,_'cold'", speakCb=function(){

        //setTimeout( buttonsListenNextSentence, 1500 );

    } else if ( spokenWordTranscription === "" ) {

        tiaPrepareToSpeak("I_couldn't_hear_anything,_try_again_to_say,_'cold'", speakCb=function(){
        //tiaPrepareToSpeak("tutorial_061", speakCb=function(){
        
            conversationVariables.tutorialStep = '051';

            $( '#keyboardOverlay' ).hide();
            $( '#overlayBtnBox' ).show();
            $( '#reRecordBtn' ).fadeIn();
            $( '#inputButtonsContainer' ).css('z-index', '1')

        })

        setTimeout( function() {

            buttonsListenNextSentence();

        }, 1500 );


    } else {

        tiaPrepareToSpeak("That_is_not_quite_right,_try_again_to_say,_'cold'", speakCb=function(){
        //tiaPrepareToSpeak("tutorial_061", speakCb=function(){
        
            conversationVariables.tutorialStep = '051';

            $( '#keyboardOverlay' ).hide();
            $( '#overlayBtnBox' ).show();
            $( '#reRecordBtn' ).fadeIn();
            $( '#inputButtonsContainer' ).css('z-index', '1')

        })

        setTimeout( function() {

            initShake(0.3, 0.3, function() {

                buttonsListenNextSentence();

            });

        }, 1500 );

    }

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

function tutorialOption071() {

    conversationVariables.tutorialStep = '071';
    tiaPrepareToSpeak("Excellent,_good_job", speakCb=function(){

        $( '#recordBtnsCont' ).show();
        $( '#talkBtn' ).show();

    })

    setTimeout( buttonsListenNextSentence, 1500 );

}


function tutorialOption081() {

    conversationVariables.tutorialStep = '081';

    $( '#talkBtn' ).hide();
    $('#correctionOverlay').hide();
    $('#textInputContainer').hide();
    tiaPrepareToSpeak("Did_you_notice_that_the_sentence_you_just_sent_has_a_mistake_in_it", speakCb=function(){

        showDoubleBtn( tutorialOption090, tutorialOption091 ) 

    })

    setTimeout( buttonsListenNextSentence, 500 );

}

function tutorialOption090() {

    conversationVariables.tutorialStep = '090';
    removeDoubleBtn();

    tiaPrepareToSpeak("That's_ok,_I_will_show_you_the_mistake_soon", speakCb=function(){

        showSingleBtn( tutorialOption101 ) 

    })

    setTimeout( buttonsListenNextSentence, 500 );

}

function tutorialOption091() {

    conversationVariables.tutorialStep = '091';
    removeDoubleBtn();

    tiaPrepareToSpeak("Good_job,_'catch_a_cold',_should_have_been_'caught_a_cold',_well_done", speakCb=function(){

        showSingleBtn( tutorialOption101 ) 

    })

    setTimeout( buttonsListenNextSentence, 500 );

}

function tutorialOption101() {

    conversationVariables.tutorialStep = '101';
    removeSingleBtn();

    tiaPrepareToSpeak("When_you_send_a_sentence_with_mistakes,_it_makes_me_confused,_like_this...", speakCb=function(){

        goToConfusedTutorial();

    })

    setTimeout( buttonsListenNextSentence, 500 );

}

function goToConfusedTutorial() {

    movementController( movementObject.abs.confused, tiaTimings.movementToConfusedDuration / 2, tiaTimings.movementToConfusedDuration )
    expressionController( expressionObject.abs.confused, tiaTimings.changeExpressionToConfusedDuration, function(){
        
        conversationVariables.conversation_dict.completed_sentences = [{
            'sentence': [["I", "DT"], ["feel", "NN"], ["bad", "VBD"], ["because", "IN"], ["I", "DT"], ["catch", "NN"], ["a", "NN"], ["cold", "NN"]],
            'judgement': 'I',
            'indexes': [[11, 11]],
            'correction': ['caught'],
        }]
        showWrong();
        showWrongSentence();
        setTimeout( function() {

            movementController( movementObject.abs.blank, tiaTimings.movementToConfusedDuration / 2, tiaTimings.movementToConfusedDuration )
            expressionController( expressionObject.abs.neutral, tiaTimings.changeExpressionToConfusedDuration, tutorialOption111 );

        }, 2000);
        
    });

}

function tutorialOption111() {

    conversationVariables.tutorialStep = '111';

    tiaPrepareToSpeak("You_can_choose_to_try_again,_ask_what's_wrong,_or_go_to_your_next_sentence", speakCb=function(){

        $('#tryAgainBtn').off( 'click' );
        $('#nextSentenceBtn').off( 'click' );
        showOptionBtns();

    })

    setTimeout( buttonsListenNextSentence, 500 );

}

function tutorialOption121() {

    conversationVariables.tutorialStep = '121';

    tiaPrepareToSpeak("Now_tap_'show_correction'_to_see_the_correct_sentence", speakCb=function(){


        showOptionBtns();
        $('#whatsWrongBtn').hide();
        $('#showCorrectionBtn').off( 'click' );
        $('#showCorrectionBtn').click( showCorrectionTutorial );
        $('#showCorrectionBtn').css( 'display', 'flex' );

    })

    setTimeout( buttonsListenNextSentence, 1000 );

}

function showCorrectionTutorial() {

    $( '#optionBtns' ).attr( 'disabled', true );
    $( '#optionBtns' ).fadeOut();
    showCorrectionUnderWrongSent();
    tutorialOption131();

}

function tutorialOption131() {

    conversationVariables.tutorialStep = '131';

    tiaPrepareToSpeak("You_can_see_that_the_mistake_in_this_sentence_was_only_a_small_one,_just_the_verb_tense_was_wrong", speakCb=function(){

        showDoubleBtn( tutorialOption000, tutorialOption141 );

    })

    setTimeout( buttonsListenNextSentence, 1500 );

}

function tutorialOption141() {

    conversationVariables.tutorialStep = '141';

    removeDoubleBtn();
    $('#correctionOverlay').hide();
    $('#textInputContainer').hide();

    tiaPrepareToSpeak("That's_brilliant,_by_learning_about_your_mistakes,_you_can_become_a_much_better_and_more_confident_speaker", speakCb=function(){
            
        tutorialOption142();
        buttonsListenNextSentence();

    })

    initNod(0.3, 0.3, function() {

        buttonsListenNextSentence();

    });

}

function tutorialOption142() {

    conversationVariables.tutorialStep = '142';

    tiaPrepareToSpeak("If_you_say_something_positive,_I_will_be_happy", speakCb=function(){

        //expressionController( expressionObject.calculated, 0.8, function(){ 
            
            tutorialOption143();
            buttonsListenNextSentence();

        //});

    });

}

function tutorialOption143() {

    conversationVariables.tutorialStep = '143';

    tiaPrepareToSpeak("You_can_also_make_me_feel_surprised...", speakCb=function(){

        //expressionController( expressionObject.calculated, 0.8, function(){
            
            tutorialOption144();
            buttonsListenNextSentence();

        //});

    });

}

function tutorialOption144() {

    conversationVariables.tutorialStep = '144';

    tiaPrepareToSpeak("content...", speakCb=function(){

        //expressionController( expressionObject.calculated, 0.8, function(){
            
            tutorialOption145();
            buttonsListenNextSentence();

        //});

    });

}

function tutorialOption145() {

    conversationVariables.tutorialStep = '145';

    tiaPrepareToSpeak("scared...", speakCb=function(){

        //expressionController( expressionObject.calculated, 0.8, function(){
            
            tutorialOption146();
            buttonsListenNextSentence();

        //});

    });

}

function tutorialOption146() {

    conversationVariables.tutorialStep = '146';

    tiaPrepareToSpeak("and_disgusted...", speakCb=function(){

        //expressionController( expressionObject.calculated, 0.8, function(){
            
            createSingleExpression( expressionObject.rel.happy, 0.8 )
            
            setTimeout( function(){

                expressionController( expressionObject.half, 1.2, function() {
            
                    tutorialOption151();

                });

            }, 1000);

        //});

    });

}

function tutorialOption151() {

    conversationVariables.tutorialStep = '091';

    tiaPrepareToSpeak("Remember,_you_will_only_see_these_expressions_and_hear_me_speaking_to_you_if_your_sentence_is_correct", speakCb=function(){

        conversationVariables.conversation_dict.completed_sentences = [
        {
            'sentence': [["I", "DT"], ["feel", "NN"], ["bad", "VBD"], ["because", "IN"], ["I", "DT"], ["catch", "NN"], ["a", "NN"], ["cold", "NN"]],
            'judgement': 'I',
            'indexes': [[11, 11]],
            'correction': ['caught'],
            'sent_id': 1,
            'prompts': [{'text': ""}],
        },
        {
            'sentence': [["nice", "DT"], ["to", "NN"], ["meet", "VBD"], ["you", "IN"]],
            'judgement': 'P',
            'sent_id': 0,
            'prompts': [{'text': "it's great to meet you too"}],
            'indexes': [],
        },

        ]
        addPreviousSentences( conversationVariables.conversation_dict, 0 )
        $('#stopAllButtonEffectsExceptInputButtons').hide();
        $('#prevSentsIconContainer').show();

    })
                  
    buttonsListenNextSentence();

}

function tutorialOption161() {

    conversationVariables.tutorialStep = '161';
    $('#closeOverlayArea').click()

    tiaPrepareToSpeak("We_have_come_to_the_end_of_the_tutorial,_and_there_is_just_one_more_thing_to_say_about_classes_here...", speakCb=function(){

        $('#prevSentsIconContainer').off( 'click' );
        $('#stopAllButtonEffectsExceptInputButtons').hide();
        $('#finishClassIconContainer').show();

    })

    setTimeout( buttonsListenNextSentence, 500 );

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

