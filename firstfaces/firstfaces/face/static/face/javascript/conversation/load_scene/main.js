$(window).on( 'load', function() {
   
    // LOADS OBJECTS <three_js_objects.js>
    // AFTER LOADING 'enterOrReEnter()' WILL BE CALLED BELOW
    init();

    readyBtns();

    readyAudio();

    //fill prevSents
    loadPrevSents( scrollBottom );   
    conversationVariables.playspeed=1.0;
    
    //// FOR VOLUME BAR
    canvasContext = document.getElementById( "meter" ).getContext("2d");
    canvasContext.transform(1, 0, 0, -1, 0, HEIGHT_VOL)

});

function enterOrReEnter() {

    //load this early and change .src later
    synthesisObject.audio = document.getElementById( 'synthClip' );

    //// DEVELOPMENT
    //if ( conversationVariables.inDevelopment ) {

        //CAMERA_SIT_POS = { x: 0, y: -3.0, z: 19 };
        //CAMERA_SIT_ROT = { x: -0.05, y: 0, z: 0 };

    //}
    ////////////////
    
    camera.position.set( CAMERA_SIT_POS.x, CAMERA_SIT_POS.y, CAMERA_SIT_POS.z  );
    camera.rotation.set( CAMERA_SIT_ROT.x, CAMERA_SIT_ROT.y, CAMERA_SIT_ROT.z,);

    function firstEnter() {

        initMainEnter();

    }

    function reEnter() {
 
        //cameraObject.currentState = "laptop";

        talkObject.learning = true;
        //initCameraMove('laptop', 0.1);
        initInputReady();

    };

    //if first enter then run entrance animation else sitting at chair
    if ( conversationVariables.first_enter ) {
        
        firstEnter();

    } else {

        reEnter();

    }

}

// start random movementObject.abs and calculate stuff after bodyparts loaded
function engineRunning() {

    setBaseExpressionsAndMovements(); // do this after all of Tia is loaded
    loadSynthURLs(); //loads the phrases Tia may say and creates the format for later prompts to follow
    animate();
    blinkControllerObject.bool = true;
    expressionController( expressionObject.abs.neutral, 0.01 );
    movementController( movementObject.abs.blank, 0.01, 0.01)
    enterOrReEnter();

    runUCDGif();
    setTimeout( function() {
        
        $("#foregroundContainer").fadeOut( 1500 );
    
        //// DEVELOPMENT
        if ( conversationVariables.inDevelopment ) {

            // hide mic button
            $('#recordBtnsCont').hide();
            $('#meterContainer').hide();

            expressionController( expressionObject.abs.talkBase, 0.3, function(){console.log('no expression calback')});

            synthesisObject.now = synthesisObject.data.beginWhenYou;
            synthesisObject.audio.src = synthesisObject.now.URLs[ 0 ]

            //synthesisObject.synthAudio.src = prefixURL + tiaMediaLoc + synthesisObject.synthAudio.text.replace(/ /g, "_") +".wav"

        }
        ////////////////

    }, 2200 );

}

function setBaseExpressionsAndMovements() {

    expressionObject.base = getAbsoluteCoordsOfExpressionNow(); // get absolute position of base expression
    expressionObject.now = $.extend( true, {}, expressionObject.base ); // create a copy of this for expression now
    getAbsoluteCoordsOfMainExpressions(); // gets coordinates for all main expressions
    
    movementObject.base = getAbsoluteCoordsOfMovementNow(); // same as above for movementObject.abs
    movementObject.now = $.extend( true, {}, movementObject.base );

    getAbsoluteCoordsOfMainMovements(); // gets coordinates for all main expressions

}

function loadSynthURLs() {

    

}

function runUCDGif() {

    $("#foregroundImage").hide();
    $("#foregroundImageNoHarp").show();
    $("#foregroundImageGif").show();

}



function judgementReceived( sentMeta ) {

    console.log('sentMeta:', sentMeta);

    // update conversationVariables to include new sentence. newInd gets index of next sent
    let newInd = Object.keys(conversationVariables.sentences).length;
    sentMeta.emotion = JSON.parse(sentMeta.emotion);
    conversationVariables.sentences[ newInd ] = sentMeta;
    conversationVariables.sentences[ newInd ].sentence = JSON.parse( sentMeta.sentence );
    conversationVariables.sentences[ newInd ].indexes = JSON.parse( sentMeta.indexes );
    conversationVariables.sentences[ newInd ].prompt = sentMeta.prompt;

    conversationVariables.id_of_last_sent = newInd;
    conversationVariables.tiaToSay = sentMeta.tiaToSay;
    
    conversationVariables.last_sent = sentMeta;
    conversationVariables.last_sent.sentence = sentMeta.sentence;
    conversationVariables.last_sent.indexes = sentMeta.indexes;
    conversationVariables.last_sent.prompt = sentMeta.prompt;

    // keeps state of sentence
    conversationVariables.blob_no_text = false;
    conversationVariables.awaitingJudgement = false;

    // do this here to change voices too
    if ( conversationVariables.last_sent.judgement === "B" || conversationVariables.last_sent.judgement === "C" || conversationVariables.last_sent.judgement === "P" || conversationVariables.last_sent.judgement === "M" ) {

        //if ( conversationVariables.last_sent.judgement !== "C" ) {

            //checkForPromptNIndexes( sentMeta.sent_id );

        //}

        // calculate changes in expression for these
        if ( conversationVariables.last_sent.judgement === "M" ) {

            let singleCalculatedExpressions = createSingleExpression( expressionObject.rel.confused, 0.5 )
            calculatedExpression = getAbsoluteCoordsOfExpressionTo( singleCalculatedExpressions[ 0 ] )
            calculatedTalkExpression = getAbsoluteCoordsOfExpressionTo( singleCalculatedExpressions[ 1 ] )

        } else {

            changeExpression();

        }

    } else if ( conversationVariables.last_sent.judgement === "D" ) {

        let singleCalculatedExpressions = createSingleExpression( expressionObject.rel.confused, 1 )
        calculatedExpression = getAbsoluteCoordsOfExpressionTo( singleCalculatedExpressions[ 0 ] )
        calculatedTalkExpression = getAbsoluteCoordsOfExpressionTo( singleCalculatedExpressions[ 1 ] )

    } else if ( conversationVariables.last_sent.judgement === "3" ) {

        let singleCalculatedExpressions = createSingleExpression( expressionObject.rel.confused, 0.75 )
        calculatedExpression = getAbsoluteCoordsOfExpressionTo( singleCalculatedExpressions[ 0 ] )
        calculatedTalkExpression = getAbsoluteCoordsOfExpressionTo( singleCalculatedExpressions[ 1 ] )

    } else if ( conversationVariables.last_sent.judgement === "I" ) {

        let singleCalculatedExpressions = createSingleExpression( expressionObject.rel.confused, 1 )
        calculatedExpression = getAbsoluteCoordsOfExpressionTo( singleCalculatedExpressions[ 0 ] )
        calculatedTalkExpression = getAbsoluteCoordsOfExpressionTo( singleCalculatedExpressions[ 1 ] )

    }
                
}

//function promptNIndexesReceived( sentMeta ) {

    //console.log('new sent meta:', sentMeta);

    //conversationVariables.promptNIndexesReceived = true;

    //conversationVariables.sentences[ conversationVariables.id_of_last_sent ].prompt = sentMeta.prompt;
    //conversationVariables.last_sent.prompt = sentMeta.prompt;

    //conversationVariables.sentences[ conversationVariables.id_of_last_sent ].indexes = sentMeta.indexes;
    //conversationVariables.last_sent.indexes = sentMeta.indexes;

//}


