$(window).on( 'load', function() {
   
    // LOADS OBJECTS <three_js_objects.js>
    // AFTER LOADING 'enterOrReEnter()' WILL BE CALLED BELOW
    init();

    readyBtns();

    readyAudio();

    //fill prevSents
    //addPreviousSentences(, 0 );   
    conversationVariables.playspeed=1.0;
    
    //// FOR VOLUME BAR
    canvasContext = document.getElementById( "meter" ).getContext("2d");
    canvasContext.transform(1, 0, 0, -1, 0, HEIGHT_VOL)
    canvasContext.fillStyle = "#33ff00";

});

function enterOrReEnter() {

    //load this early and change .src later
    synthesisObject.audio = document.getElementById( 'synthClip' );
    synthesisObject.audioS3 = document.getElementById( 'danSynthAudio' );
    synthesisObject.audio.ondurationchange = function() {

        synthesisObject.now.noOfPhones = synthesisObject.now.phones[ synthesisObject.sentenceNo ].length;

        synthesisObject.now.noOfFrames = Math.floor( synthesisObject.audio.duration * 60 )
        synthesisObject.now.noOfFramesPerPhone = Math.floor( synthesisObject.now.noOfFrames / ( synthesisObject.now.noOfPhones - 1 ) );

        synthesisObject.now.noOfLeftoverFrames = synthesisObject.now.noOfFrames - synthesisObject.now.noOfFramesPerPhone * synthesisObject.now.noOfPhones;

        synthesisObject.gotNewDuration = true;

        breatheObject.singleBreath.outCount = synthesisObject.audio.duration

    }



    //// DEVELOPMENT
    //// close up of Tia's lips
    if ( conversationVariables.inDevelopment ) {

        //CAMERA_SIT_POS = { x: 0, y: -3.0, z: 19 };
        //CAMERA_SIT_ROT = { x: -0.05, y: 0, z: 0 };

    }
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
    animate();
    blinkControllerObject.bool = true;
    createSingleExpression(expressionObject.rel.neutral, 1)
    expressionController( expressionObject.calculated, 0.01 );
    movementController( movementObject.abs.blank, 0.01, 0.01)
    enterOrReEnter();

    runUCDGif();
    setTimeout( function() {
        
        $("#foregroundContainer").fadeOut( 1500 );
    
        //// DEVELOPMENT
        if ( conversationVariables.inDevelopment ) {

            // hide mic button
            //$('#recordBtnsCont').hide();
            //$('#meterContainer').hide();

            //$('#laptopContainer').hide();
            //expressionController( expressionObject.abs.iEmp, 0.3, function(){console.log('no expression calback')});

            //synthesisObject.now = synthesisObject.data.beginWhenYou;
            //synthesisObject.audio.src = synthesisObject.now.URLs[ 0 ]

            //synthesisObject.synthAudio.src = prefixURL + tiaMediaLoc + synthesisObject.synthAudio.text.replace(/ /g, "_") +".wav"

            conversationVariables.interference_count = 0;

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

function runUCDGif() {

    $("#foregroundImage").hide();
    $("#foregroundImageNoHarp").show();
    $("#foregroundImageGif").show();

}

