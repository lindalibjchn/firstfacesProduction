///MAIN ENTER FUNCTION WHICH CALLS ALL OTHERS

function initMainEnter() {

    //put this in for now.
    //$('#topicChoices').show(); 
    //$('#chooseTopicTextContainer').show();
    //$('#topicChoiceInput').focus();
    //$('#submitOwnTopicBtn').on( 'click', getOwnTopicFromTextbox );
    
    // not practise buttons for listening
    synthesisObject.realSpeak = true;

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

        $.when(createRelativeMovement( standingStudentMovement )).then( initMovement( relativeMovement, '0.5', '1'));
        //initArmsPrepareTyping( 0, '0.5' );
        //typeObject.bool = false;

    } else if ( mainCount === 380 ) {

        $.when($.when(createSingleExpression( happyExpression, 0.75 )).then(createRelativeExpression( calculatedExpression ))).then( initExpression( relativeExpression, '0.5'));

    } else if ( mainCount === 430 ) {

        initArmIndicate('left', 1, 'low', '1');
        $.when(createRelativeMovement( lookChairMovement )).then( initMovement( relativeMovement, '0.5', '1'));

    } else if ( mainCount === 510 ) {

        $.when(createRelativeMovement( standingStudentMovement )).then( initMovement( relativeMovement, '0.5', '1'));

    } else if ( mainCount === 590 ) {

        initEnterCameraMove('chair', '3');
        $.when(createRelativeMovement( studentMovement )).then( initMovement( relativeMovement, '3', '3'));

    }  else if ( mainCount === 790 ) {

        $.when(createRelativeExpression( talkCalculatedExpression )).then( initExpression( relativeExpression, '1'));

    } else if ( mainCount === 870 ) {

        let studentName = classVariableDict.username;
        let greeting = " Hello " + studentName + ", nice to see you! How are you feeling today?";
        
        initArmIndicate('left', 0, 'low', '1');
        //in entrance so need to not return to laptop after talking when not learning
        talkObject.learning = false;

        synthesisObject.toSpeak = greeting;
        synthesisObject.speaker = "tia";
        getVoices( setVoice );
        
        speechBubbleObject.sentence = greeting;
        displaySpeechBubble();

    } else if ( mainCount === 1060 ) {
        
        showInitEmotionQuestions();
        //hardcode these stopping of talking also

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

function showInitEmotionQuestions() {

    normalBlinkObject.nextBlinkCount = 10 + mainCount;
    normalBlinkObject.bool = true;

    $('#emotionQuestionsContainer').fadeIn( 1500 );

    // allow emotions to be clickable
    $('.init-emot').on( 'click', storeEmotion );

}

function goToAskTopic( emotion ) {

    if ( emotion === "happy" || emotion === "surprised" || emotion === "excited" ) {

        $.when($.when(createCombinedExpression([happyExpression, contentExpression], 0.95, 0.6, 0.2))).then(createRelativeExpression( calculatedExpression )).then( initExpression( relativeExpression, '0.5'));

        speechBubbleObject.sentence = " That's great! What would you like to talk about today?";
    
        setTimeout( function() {

            initNod( 0.4, '0.5' )

            setTimeout( askTopic, 3500 );

        }, 800)

    } else {

        $.when($.when(createCombinedExpression([sadExpression, fearExpression], 0.98, 0.5, 0))).then(createRelativeExpression( calculatedExpression )).then( initExpression( relativeExpression, '0.5'));
    
        speechBubbleObject.sentence = " I'm sorry to hear that. What would you like to talk about today?";

        setTimeout( function() {

            initNod( 0.4, '0.5' )

            setTimeout( askTopic, 3500 );

        }, 800)

    }
    
    $('.init-emot').unbind();
    $('#emotionQuestionsContainer').fadeOut( 500 );

    // remove speech bubble to ask which topic
    removeSpeechBubble();

}

function storeEmotion() {

    let emotion = $(this).attr('id');

    $.ajax({
        url: "/face/store_emotion",
        type: "POST",
        data: {
            'emotionID': emotion,
            'sessionID': classVariableDict[ 'session_id' ],
        },
        success: function(json) {

            //add emotion to first topic button
            document.getElementById("myEmotion").innerHTML = "Why I feel " + emotion;

            normalBlinkObject.bool = false;
            if ( blinkNowObject.bool ) {

                setTimeout( function() {
                    
                    goToAskTopic( emotion )
                        
                }, 50 );

            } else {

                goToAskTopic( emotion );
                
            }

        },
        error: function() {
            alert("unsuccessful POST to store_emotion");
        },
    });

}


function askTopic() {

    // remove emotion questions container, making sure to unbind the click event to avoid multiple clicks
    $.when( createRelativeExpression( talkCalculatedExpression )).then( initExpression( relativeExpression, '1'));
    setTimeout( function() {

        displaySpeechBubble();
        
        synthesisObject.toSpeak = speechBubbleObject.sentence;
        synthesisObject.speaker = "tia";
        getVoices( setVoice );

        setTimeout( function() {
            
            showTopicChoices();
        
        }, 3000 );

    }, 1500 );

}

function showTopicChoices() {

    // allow topics to be clickable and follow logic depending on their needs
    $('#myChoice').on( 'click', showChoiceTextInput );
    $('#myEmotion').on( 'click', function() { storeTopic( 'emotion' ) } );

    $('#topicChoices').fadeIn( 1000 );

}

function showChoiceTextInput() {

    $('#topicChoices').fadeOut( 1000 );

    setTimeout( function(){ 
        
        $('#chooseTopicTextContainer').fadeIn( 1000 );
        $('#topicChoiceInput').focus();

        $('#submitOwnTopicBtn').on( 'click', getOwnTopicFromTextbox );
    
    }, 1000 );

}

function getOwnTopicFromTextbox() {

    removeSpeechBubble();

    let ownTopic = document.getElementById( "topicChoiceInput" ).value
    
    $('#chooseTopicTextContainer').fadeOut( 1000 );

    setTimeout( function() { storeTopic( ownTopic ) }, 1000 );

}

function storeTopic( topicChoice ) {

    removeSpeechBubble();
    $('#topicChoices').fadeOut( 1000 );

    $.ajax({
        url: "/face/store_topic",
        type: "POST",
        data: {
            'topic': topicChoice,
            'sessionID': classVariableDict[ 'session_id' ],
        },
        success: function(json) {

            normalBlinkObject.bool = false;
            blinkNowObject.bool = false;    
            setTimeout( beginTalking, 1000 );

        },
        error: function() {
            alert("unsuccessful POST to store_topic");
        },
    });

}

function beginTalking() {

    initArmIndicate('right', 1.2, 'low', '0.75');
    let startTalkSent = " Ok, please begin when you are ready.";

    speechBubbleObject.sentence = startTalkSent;
    displaySpeechBubble();
    
    synthesisObject.toSpeak = startTalkSent;
    synthesisObject.speaker = "tia";
    getVoices( setVoice );

    setTimeout( function() {

        createRelativeExpression( neutralExpression )

        initArmIndicate('right', 0, 'low', '0.75');
        removeSpeechBubble();
        initCameraMove( 'laptop', '2' );      
        setTimeout( function() {
            
            initExpression( relativeExpression, '3' );
            initInputReady('');
        
        }, 2000);

    }, 3000 )

}

