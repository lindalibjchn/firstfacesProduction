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
    //tiaPrepareToSpeak("Well_done,_I_can_hear_you_perfectly", speakCb=function(){
    tiaPrepareToSpeak("tutorial_041", speakCb=function(){
        
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
    
    //tiaPrepareToSpeak("Now,_tap_the_microphone_button_and_say,_'cold',_then_tap_the_stop_button", speakCb=function(){
    tiaPrepareToSpeak("tutorial_051", speakCb=function(){

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

        //tiaPrepareToSpeak("That_is_perfect,_well_done", speakCb=function(){
        tiaPrepareToSpeak("tutorial_061", speakCb=function(){

            $('#stopAllButtonEffectsExceptInputButtons').hide();
            $( '#bottomCent' ).text('');
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

    } else {

        $("#bottomCent").focus();

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


