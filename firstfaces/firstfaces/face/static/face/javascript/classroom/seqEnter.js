///MAIN ENTER FUNCTION WHICH CALLS ALL OTHERS

function initMainEnter() {

    //put this in for now.
    //$('#topicChoices').show(); 
    //$('#chooseTopicTextContainer').show();
    //$('#topicChoiceInput').focus();
    //$('#submitOwnTopicBtn').on( 'click', getOwnTopicFromTextbox );
    

    mainEnterObject.bool = true;

    // for first entry, quickly move Tia to look at laptop
    //initTiaMove('laptop', '0.1', '0.1');
    
    // type
    //initArmsPrepareTyping(0.1, '0.1');
    //initType();

}

function mainEnter() {

    if ( mainCount === 90 ) {
        
        initEnterCameraMove( 'desk', '5' )
 
    } else if ( mainCount === 300 ) {

        movementController( movements.standingStudent, '0.5', '1');
        //initArmsPrepareTyping( 0, '0.5' );
        //typeObject.bool = false;

    } else if ( mainCount === 380 ) {

        let calculatedExpressions = createSingleExpression( expressionsRel.happy, 0.75 );
        calculatedExpression = getAbsoluteCoordsOfExpressionTo( calculatedExpressions[0] );
        calculatedTalkExpression = getAbsoluteCoordsOfExpressionTo( calculatedExpressions[1] );
        expressionController( calculatedExpression, '0.5');

    } else if ( mainCount === 430 ) {

        movementController( movements.lookChair, '0.5', '1');
        initArmIndicate('left', 1, 'low', '1');

    } else if ( mainCount === 510 ) {

        initMovement( movements.standingStudent, '0.5', '1');

        let studentName = classVariableDict.username;
        
        let greeting = ""
            
        if ( classVariableDict.first_ever_class ) {

            greeting = " Hello " + studentName + ", welcome to your first class at ERLE. My name is Tia and I am from Dublin, Ireland. It's really nice to meet you.";
        
        } else if ( classVariableDict['prev_topic'] !== null ) {

            greeting = " Hello " + studentName + ", nice to see you again! Last time we met you were feeling " + classVariableDict.prev_emotion + ". How are you feeling today?";
        
        } else {
            
            greeting = " Hello " + studentName + ", nice to see you again! It's been a while. How are you feeling today?";

        }
        
        initArmIndicate('left', 0, 'low', '1');
        //in entrance so need to not return to laptop after talking when not learning
        talkObject.learning = false;

        synthesisObject.pitch = 0;
        synthesisObject.speaking_rate = 0.85;
        synthesisObject.text = greeting;
        synthesisObject.speaker = "tia";
        speechBubbleObject.sentence = greeting;
        sendTTS( greeting, true, "talk" );

    } else if ( mainCount === 590 ) {

        initEnterCameraMove('chair', '3');
        movementController( movements.student, '3', '3');

    }  else if ( mainCount === 830 ) {

        expressionController( calculatedTalkExpression, '1', false );

        //display speechBubble with prompt
        speechBubbleObject.bubble.material[0].opacity = 0.95; 
        speechBubbleObject.bubble.material[1].opacity = 0.95; 

    } else if ( mainCount === 920 ) {

        displaySpeechBubble();
        classVariableDict.promptSpeaking = true;
        speakOpening();
        
    }

}

function speakOpening() {

    if ( synthesisObject.gotNewSpeech ) {
        
        synthesisObject.synthAudio.play();
        synthesisObject.gotNewSpeech = false
        initTalk();

        if ( classVariableDict.first_ever_class ) {

            setTimeout( preNewGreeting01, 9000 );

        } else {

            setTimeout( showInitEmotionQuestions, 4500 );

        }

    } else {

        console.log('waiting for speech synthesis to return audio')
        setTimeout( speakOpening, 1000 );

    }

}

function initEnterCameraMove( to, speed ) {

    let from = enterCameraObject.currentState;

    if ( from !== to ) {

            assignSinArrayForSpeed( speed, enterCameraObject, sineArrays );

            enterCameraObject[ 'startCount' ] = mainCount;
            enterCameraObject[ 'bool' ] = true;

        if ( from === "door" ) {

            enterCameraObject[ 'movementX' ] = CAMERA_DESK_POSITION_X - CAMERA_ENTER_POSITION_X;
            enterCameraObject[ 'movementY' ] = CAMERA_DESK_POSITION_Y - CAMERA_ENTER_POSITION_Y;
            enterCameraObject[ 'movementZ' ] = CAMERA_DESK_POSITION_Z - CAMERA_ENTER_POSITION_Z;

            enterCameraObject[ 'rotationX' ] = CAMERA_DESK_ROTATION_X - CAMERA_ENTER_ROTATION_X;
            enterCameraObject[ 'rotationY' ] = CAMERA_DESK_ROTATION_Y - CAMERA_ENTER_ROTATION_Y;
                
            enterCameraObject.currentState = "desk";

        } else if ( from === "desk" ) {

            enterCameraObject[ 'movementX' ] = CAMERA_POSITION_X - CAMERA_DESK_POSITION_X;
            enterCameraObject[ 'movementY' ] = CAMERA_POSITION_Y - CAMERA_DESK_POSITION_Y;
            enterCameraObject[ 'movementZ' ] = CAMERA_POSITION_Z - CAMERA_DESK_POSITION_Z;

            enterCameraObject[ 'rotationX' ] = CAMERA_ROTATION_TIA_X - CAMERA_DESK_ROTATION_X;
            enterCameraObject[ 'rotationY' ] = CAMERA_ROTATION_TIA_Y - CAMERA_DESK_ROTATION_Y;
                
            enterCameraObject.currentState = "chair";

        }

    } else {

        console.log( "same place" );

    }

}    

function enterCameraMove( main ) {

    let main_start = main - enterCameraObject.startCount;

    let sinArray = enterCameraObject.sin;

    let sinAmount = sinArray[ main_start ]
    
    if ( main_start < enterCameraObject.sinLength ) {

        camera.position.x += sinAmount * enterCameraObject.movementX;
        camera.position.y += sinAmount * enterCameraObject.movementY;
        camera.position.z += sinAmount * enterCameraObject.movementZ;
        camera.rotation.x += sinAmount * enterCameraObject.rotationX;
        camera.rotation.y += sinAmount * enterCameraObject.rotationY;

    } else {

        enterCameraObject[ 'bool' ] = false;

    }

}

function preNewGreeting01() {

    $('#niceToMeetYou').fadeIn( 1000 );

    $('#niceBtn').on( 'click', newGreeting01 );


}

function newGreeting01() {

    $('#niceToMeetYou').fadeOut( 1000 );
    removeSpeechBubble();
    speechBubbleObject.sentence = " In this class, you can talk to me about anything. I am here to listen and help you."
    synthesisObject.text = speechBubbleObject.sentence;
    sendTTS( synthesisObject.text, true, "talk" );

    setTimeout( function() {
        displaySpeechBubble();
        speakNewGreeting01()
    }, 1500 );

}

function speakNewGreeting01() {

    if ( synthesisObject.gotNewSpeech ) {
        
        synthesisObject.synthAudio.play();
        synthesisObject.gotNewSpeech = false
        initTalk();

        setTimeout( function() {
            
            preNewGreeting02();

        }, 6000 );

    } else {

        console.log('waiting for speech synthesis to return audio')
        setTimeout( speakNewGreeting01, 1000 );

    }


}


function preNewGreeting02() {

    $('#ok').fadeIn( 1000 );

    $('#okBtn').on( 'click', newGreeting02 );


}

function newGreeting02() {

    $('#ok').fadeOut( 1000 );
    removeSpeechBubble();
    speechBubbleObject.sentence = " You can click the 'instructions' button at the top to watch a video about how this class works."
    synthesisObject.text = speechBubbleObject.sentence;
    sendTTS( synthesisObject.text, true, "talk" );

    setTimeout( function() {
        displaySpeechBubble();
        speakNewGreeting02()
    }, 1500 );

}

function speakNewGreeting02() {

    if ( synthesisObject.gotNewSpeech ) {
        
        synthesisObject.synthAudio.play();
        synthesisObject.gotNewSpeech = false
        initTalk();

        setTimeout( function() {
            
            preNewGreeting03();

        }, 5000 );

    } else {

        console.log('waiting for speech synthesis to return audio')
        setTimeout( speakNewGreeting02, 1000 );

    }

}

function preNewGreeting03() {

    $('#ok2').fadeIn( 1000 );

    $('#ok2Btn').on( 'click', newGreeting03 );


}

function newGreeting03() {

    $('#ok2').fadeOut( 1000 );
    removeSpeechBubble();
    speechBubbleObject.sentence = " Great, let's begin. How are you feeling today?."
    synthesisObject.text = speechBubbleObject.sentence;
    sendTTS( synthesisObject.text, true, "talk" );

    setTimeout( function() {
        displaySpeechBubble();
        speakNewGreeting03()
    }, 2000 );

}

function speakNewGreeting03() {

    if ( synthesisObject.gotNewSpeech ) {
        
        synthesisObject.synthAudio.play();
        synthesisObject.gotNewSpeech = false
        initTalk();

        setTimeout( function() {
            
            showInitEmotionQuestions();

        }, 5000 );

    } else {

        console.log('waiting for speech synthesis to return audio')
        setTimeout( speakNewGreeting03, 1000 );

    }


}

function showInitEmotionQuestions() {

    normalBlinkObject.nextBlinkCount = 10 + mainCount;
    normalBlinkObject.bool = true;

    $('#emotionQuestionsContainer').fadeIn( 1500 );

    // allow emotions to be clickable
    $('.init-emot').on( 'click', storeEmotion );

}

function goToAskTopic( emotion ) {

    if ( emotion === "happy" || emotion === "surprised" || emotion === "excited" ) {

        let calculatedExpressions = createCalculatedExpression([expressionsRel.happy, expressionsRel.content], 0.95, 0.6, 0.2)
        calculatedExpression = getAbsoluteCoordsOfExpressionTo( calculatedExpressions[ 0 ] );
        calculatedTalkExpression = getAbsoluteCoordsOfExpressionTo( calculatedExpressions[ 1 ] );
        
        expressionController( calculatedExpression, '0.5');

        synthesisObject.pitch = 1;
        synthesisObject.speaking_rate = 0.95;

        if ( classVariableDict['prev_topic'] !== null ) {

            speechBubbleObject.sentence = " That's great! Last time you talked about '" + classVariableDict['prev_topic'] + "' and your score was " + classVariableDict.prev_score.toString() + ". Would you like to continue with the same topic, or choose something different?";

        } else {

            speechBubbleObject.sentence = " That's great! What would you like to talk about today?";
    
        }

        setTimeout( function() {

            initNod( 0.4, '0.5' )

            setTimeout( askTopic, 3500 );

        }, 800)

    } else {

        calculatedExpressions = createCalculatedExpression([expressionsRel.sad, expressionsRel.fear], 0.98, 0.5, 0);
        calculatedExpression = getAbsoluteCoordsOfExpressionTo( calculatedExpressions[0] );
        calculatedTalkExpression = getAbsoluteCoordsOfExpressionTo( calculatedExpressions[1] );
        expressionController( calculatedExpression, '0.75');
    
        synthesisObject.pitch = -3;
        synthesisObject.speaking_rate = 0.8;

        if ( classVariableDict['prev_topic'] !== null ) {

            speechBubbleObject.sentence = " I'm sorry to hear that! Last time you talked about '" + classVariableDict['prev_topic'] + "' and your score was " + classVariableDict.prev_score.toString() + ". Would you like to continue with the same topic, or choose something different?";

        } else {

            speechBubbleObject.sentence = " I'm sorry to hear that! What would you like to talk about today?";
    
        }


        setTimeout( function() {

            initNod( 0.4, '0.5' )

            setTimeout( askTopic, 3500 );

        }, 1050)

    }
    
    // remove speech bubble to ask which topic
    removeSpeechBubble();

    synthesisObject.text = speechBubbleObject.sentence
    sendTTS( synthesisObject.text, true, "talk" );

}

function storeEmotion() {

    let emotion = $(this).attr('id');

    $.ajax({
        url: "/store_emotion",
        type: "POST",
        data: {
            'emotionID': emotion,
            'sessionID': classVariableDict[ 'session_id' ],
        },
        success: function(json) {

            //add emotion to first topic button
            document.getElementById("myEmotion").innerHTML = "Why I feel " + emotion;

            normalBlinkObject.bool = false;

            $('.init-emot').unbind();
            $('#emotionQuestionsContainer').fadeOut( 500 );

            setTimeout( function() {
                    
                goToAskTopic( emotion )
                    
            }, 600 );

        },
        error: function() {
            alert("unsuccessful POST to store_emotion");
        },
    });

}


function askTopic() {

    // remove emotion questions container, making sure to unbind the click event to avoid multiple clicks
    expressionController( calculatedTalkExpression, '1');
    setTimeout( function() {

        displaySpeechBubble();
        speakTopic();
        
    }, 1500 );

}

function speakTopic() {

    if ( synthesisObject.gotNewSpeech ) {
        
        synthesisObject.synthAudio.play();
        synthesisObject.gotNewSpeech = false
        initTalk();

        setTimeout( function() {
            
            if ( classVariableDict['prev_topic'] !== null ) {

                showContinueOrNew();

            } else {

                showTopicChoices();
        
            }

        }, 3000 );

    } else {

        console.log('waiting for speech synthesis to return audio')
        setTimeout( speakTopic, 1000 );

    }


}

function showContinueOrNew() {

    // allow topics to be clickable and follow logic depending on their needs
    $('#continueBtn').on( 'click', function() { 
        
        $('#continueNewChoices').fadeOut( 1000 );
        storeTopic( 'same' ) 
    
    } );

    $('#newBtn').on( 'click', function() { 
    
        $('#continueNewChoices').fadeOut( 1000 );
        setTimeout( showTopicChoices, 1000 );

    } );

    $('#continueNewChoices').fadeIn( 1000 );

}

function showTopicChoices() {

    // allow topics to be clickable and follow logic depending on their needs
    $('#myChoice').on( 'click', showChoiceTextInput );
    $('#myEmotion').on( 'click', function() { storeTopic( 'emotion' ) } );
    $('#todaysNewsArticle').on( 'click', function() { storeTopic( 'news: ' + classVariableDict['headline'] ) } );

    $('#topicChoices').fadeIn( 1000 );

}

function showChoiceTextInput() {

    $('#topicChoices').fadeOut( 1000 );

    setTimeout( function(){ 
        
        $('#chooseTopicTextContainer').fadeIn( 1000 );
        $('#topicChoiceInput').focus();

        $('#submitOwnTopicBtn').on( 'click', getOwnTopicFromTextbox );
    
    }, 2000 );

}

function getOwnTopicFromTextbox() {

    removeSpeechBubble();

    let ownTopic = document.getElementById( "topicChoiceInput" ).value
    
    $('#chooseTopicTextContainer').fadeOut( 1000 );

    setTimeout( function() { storeTopic( ownTopic ) }, 1000 );

}

function storeTopic( topicChoice ) {

    $.ajax({
        url: "/store_topic",
        type: "POST",
        data: {
            'topic': topicChoice,
            'sessionID': classVariableDict[ 'session_id' ],
        },
        success: function(json) {

            normalBlinkObject.bool = false;
            blinkNowObject.bool = false;    

            $('#topicChoices').fadeOut( 500 );

            setTimeout( function(){ 
                
                removeSpeechBubble();
                initNod( 0.4, '0.5' )
                
                let startTalkSent = " Ok, please begin when you are ready.";
                speechBubbleObject.sentence = startTalkSent;
                synthesisObject.text = speechBubbleObject.sentence
                sendTTS( startTalkSent, true, "talk" );

                setTimeout( beginTalking, 4000 );
            
            }, 1000 );

        },
        error: function() {
            alert("unsuccessful POST to store_topic");
        },
    });

}

function beginTalking() {

    initArmIndicate('right', 1.2, 'low', '0.75');
    displaySpeechBubble();
    finalSpeak();

}

function finalSpeak() {

    if ( synthesisObject.gotNewSpeech ) {
        
        synthesisObject.synthAudio.play();
        synthesisObject.gotNewSpeech = false
        initTalk();
    
        setTimeout( function() {

            initArmIndicate('right', 0, 'low', '0.75');
            removeSpeechBubble();
            initCameraMove( 'laptop', '2' );      
            setTimeout( function() {
                
                initInputReady('');
            
                setTimeout( function() {
                    
                    expressionController( expressionsAbs.neutral, '0.75' );
                    talkObject.learning = true;

                    setTimeout( function() {

                        normalBlinkObject.bool = true;
                
                    }, 2000 );

                }, 3500);

            }, 2500);

        }, 3000 )

    } else {

        console.log('waiting for speech synthesis to return audio')
        setTimeout( finalSpeak, 1000 );

    }

}
