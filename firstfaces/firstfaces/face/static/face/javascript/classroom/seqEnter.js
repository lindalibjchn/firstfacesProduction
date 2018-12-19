///MAIN ENTER FUNCTION WHICH CALLS ALL OTHERS

function initMainEnter() {

    mainEnterObject.bool = true;

}

function mainEnter() {

    if ( mainCount === 90 ) {
        
        initEnterCameraMove( 'desk', '5' )
 
    } else if ( mainCount === 280 ) {

        movementController( movements.standingStudent, 0.5, 1.25 );

    } else if ( mainCount === 380 ) {

        let calculatedExpressions = createSingleExpression( expressionsRel.happy, 0.75 );
        calculatedExpression = getAbsoluteCoordsOfExpressionTo( calculatedExpressions[0] );
        calculatedTalkExpression = getAbsoluteCoordsOfExpressionTo( calculatedExpressions[1] );
        expressionController( calculatedExpression, tiaTimings.changeExpression );

    } else if ( mainCount === 430 ) {

        movementController( movements.lookChair, '0.5', '1');
        initArmIndicate('left', 1, 'low', '1');

    } else if ( mainCount === 510 ) {

        initMovement( movements.standingStudent, '0.5', '1');

        let studentName = classVariableDict.username;
        
        let greeting = ""
            
        if ( classVariableDict.tutorial ) {

            // if in tutorial, need this to be true so that responses from the recording and speech synthesis react in the correct way
            classVariableDict.tutorialStep = 0;

            // if user has completed tutorial before, don't need to introduce name
            if ( classVariableDict.tutorial_complete ) {

                greeting = " Hello " + studentName + ". Welcome to the ERLE tutorial. It will take 5 to 10 minutes to complete. I will speak, and then buttons will appear for you to click.";
        
            } else {

                greeting = " Hello " + studentName + ", my name is Tia. Welcome to the ERLE tutorial. It will take 5 to 10 minutes to complete. I will speak, and then buttons will appear for you to click.";
        
            }

        } else if ( classVariableDict.first_full_class ) {

            greeting = " Hello " + studentName + ", welcome to your first full class at ERLE! How are you feeling today?";
        
        } else if ( classVariableDict['prev_topic'] !== null ) {

            greeting = " Hello " + studentName + ", nice to see you again! Last time we met you were feeling " + classVariableDict.prev_emotion + ". How are you feeling today?";
        
        } else {
            
            greeting = " Hello " + studentName + ", nice to see you again! It's been a while since we last met. How are you feeling today?";

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
        movementController( movements.blank, '3', '3');

    }  else if ( mainCount === 730 ) {

        expressionController( calculatedTalkExpression, '1', false );

    } else if ( mainCount === 800 ) {

        tiaSpeak( synthesisObject.text, needSendTTS=false, speakOpening );
        classVariableDict.promptSpeaking = true;
        
    }

}

function speakOpening() {

    if ( classVariableDict.tutorial ) {

        runTutorial();

    } else {

        showInitEmotionQuestions();

    }

}

function initEnterCameraMove( to, secs ) {

    let from = enterCameraObject.currentState;

    if ( from !== to ) {

            assignSinArrayForSpeed( secs, enterCameraObject, sineArrays );

            enterCameraObject[ 'startCount' ] = mainCount;
            enterCameraObject[ 'bool' ] = true;

        if ( from === "door" ) {

            enterCameraObject[ 'movementX' ] = CAMERA_DESK_POS.x - CAMERA_ENTER_POS.x;
            enterCameraObject[ 'movementY' ] = CAMERA_DESK_POS.y - CAMERA_ENTER_POS.y;
            enterCameraObject[ 'movementZ' ] = CAMERA_DESK_POS.z - CAMERA_ENTER_POS.z;

            enterCameraObject[ 'rotationX' ] = CAMERA_DESK_ROT.x - CAMERA_ENTER_ROT.x;
            enterCameraObject[ 'rotationY' ] = CAMERA_DESK_ROT.y - CAMERA_ENTER_ROT.y;
                
            enterCameraObject.currentState = "desk";

        } else if ( from === "desk" ) {

            enterCameraObject[ 'movementX' ] = CAMERA_SIT_POS.x - CAMERA_DESK_POS.x;
            enterCameraObject[ 'movementY' ] = CAMERA_SIT_POS.y - CAMERA_DESK_POS.y;
            enterCameraObject[ 'movementZ' ] = CAMERA_SIT_POS.z - CAMERA_DESK_POS.z;

            enterCameraObject[ 'rotationX' ] = CAMERA_SIT_TO_TIA_ROT.x - CAMERA_DESK_ROT.x;
            enterCameraObject[ 'rotationY' ] = CAMERA_SIT_TO_TIA_ROT.y - CAMERA_DESK_ROT.y;
                
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

function showInitEmotionQuestions() {

    $('#emotionQuestionsContainer').fadeIn( tiaTimings.speechBubbleFadeInDuration );

    // allow emotions to be clickable
    $('.init-emot').on( 'click', storeEmotion );

}

function goToAskTopic( emotion ) {

    // remove speech bubble to ask which topic
    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );

    if ( emotion === "happy" || emotion === "surprised" || emotion === "excited" ) {

        let calculatedExpressions = createCalculatedExpression([expressionsRel.happy, expressionsRel.content], 0.95, 0.6, 0.2)
        calculatedExpression = getAbsoluteCoordsOfExpressionTo( calculatedExpressions[ 0 ] );
        calculatedTalkExpression = getAbsoluteCoordsOfExpressionTo( calculatedExpressions[ 1 ] );
        
        expressionController( calculatedExpression, tiaTimings.changeExpression );

        synthesisObject.pitch = 1;
        synthesisObject.speaking_rate = 0.95;

        if ( classVariableDict['prev_topic'] !== null && classVariableDict.first_full_class !== true ) {

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
        expressionController( calculatedExpression, tiaTimings.changeExpression );
    
        synthesisObject.pitch = -3;
        synthesisObject.speaking_rate = 0.8;

        if ( classVariableDict['prev_topic'] !== null && classVariableDict.first_full_class !== true ) {

            speechBubbleObject.sentence = " I'm sorry to hear that! Last time you talked about '" + classVariableDict['prev_topic'] + "' and your score was " + classVariableDict.prev_score.toString() + ". Would you like to continue with the same topic, or choose something different?";

        } else {

            speechBubbleObject.sentence = " I'm sorry to hear that! What would you like to talk about today?";
    
        }


        setTimeout( function() {

            initNod( 0.4, '0.5' )

            setTimeout( askTopic, 3500 );

        }, 1050)

    }
    
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

        tiaSpeak( speechBubbleObject.sentence, needSendTTS=false, speakTopic );
        
    }, 1500 );

}

function speakTopic() {

    if ( classVariableDict['prev_topic'] !== null && classVariableDict.first_full_class !== true ) {

        showContinueOrNew();

    } else {

        showTopicChoices();

    }

}

function showContinueOrNew() {

    // allow topics to be clickable and follow logic depending on their needs
    $('#continueBtn').on( 'click', function() { 
        
        $('#continueNewChoices').fadeOut( tiaTimings.speechBubbleFadeOutDuration );
        storeTopic( 'same' ) 
    
    } );

    $('#newBtn').on( 'click', function() { 
    
        $('#continueNewChoices').fadeOut( tiaTimings.speechBubbleFadeOutDuration );
        setTimeout( showTopicChoices, tiaTimings.speechBubbleFadeInDuration );

    } );

    $('#continueNewChoices').fadeIn( tiaTimings.speechBubbleFadeInDuration );

}

function showTopicChoices() {

    // allow topics to be clickable and follow logic depending on their needs
    $('#myChoice').on( 'click', showChoiceTextInput );
    $('#myEmotion').on( 'click', function() { storeTopic( 'emotion' ) } );
    $('#todaysNewsArticle').on( 'click', function() { storeTopic( 'news: ' + classVariableDict['headline'] ) } );

    $('#topicChoices').fadeIn( tiaTimings.speechBubbleFadeInDuration );

}

function showChoiceTextInput() {

    $('#topicChoices').fadeOut( tiaTimings.speechBubbleFadeOutDuration );

    setTimeout( function(){ 
        
        $('#chooseTopicTextContainer').fadeIn( tiaTimings.speechBubbleFadeInDuration );
        $('#topicChoiceInput').focus();

        $('#submitOwnTopicBtn').on( 'click', getOwnTopicFromTextbox );
    
    }, 2000 );

}

function getOwnTopicFromTextbox() {

    removeSpeechBubble();

    let ownTopic = document.getElementById( "topicChoiceInput" ).value
    
    $('#chooseTopicTextContainer').fadeOut( tiaTimings.speechBubbleFadeOutDuration );

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

            $('#topicChoices').fadeOut( 500 );

            setTimeout( function(){ 
                
                removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
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
    
    tiaSpeak( speechBubbleObject.sentence, needSendTTS=false, finalSpeak );

}

function finalSpeak() {

    initArmIndicate('right', 0, 'low', '0.75');
    removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );

    setTimeout( function() {

        initCameraMove( 'laptop', tiaTimings.cameraMoveUpDuration );      
        setTimeout( function() {
            
            initInputReady('');
        
            setTimeout( function() {
                
                expressionController( expressionObject.abs.neutral, 0.75 );
                talkObject.learning = true;

            }, 3500);

        }, 2500);

    }, tiaTimings.speechBubbleFadeOutDuration );

}






