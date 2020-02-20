$(window).on( 'load', function() {
   
    //$("#foregroundContainer").hide()
    // LOADS OBJECTS <three_js_objects.js>
    // AFTER LOADING 'enterOrReEnter()' WILL BE CALLED BELOW
    
    let getUserMediaOK = checkIfDeviceCanRunSite();

    if ( getUserMediaOK ) {

        readyTiaSynthSentences();

        get_tia_attributes();

        readyBtns();

        //readyAudio();

        conversationVariables.playspeed=1.0;
        
        //// FOR VOLUME BAR
        canvasContext = document.getElementById( "meter" ).getContext("2d");
        canvasContext.transform(1, 0, 0, -1, 0, HEIGHT_VOL)
        canvasContext.fillStyle = "#33ff00";

    }

});

function checkIfDeviceCanRunSite() {

    if ( appleDevice ) {

		function iOSversion() {
            
            if (/iP(hone|od|ad)/.test(navigator.platform)) {

                // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
                var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
                return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
            
            } else {

                return false

            }

        }

        let thisUsersiOSVersion = iOSversion();

        if ( thisUsersiOSVersion !== false ) {

            if ( thisUsersiOSVersion[ 0 ] < 12 ) {

                alert('Your phone needs to run iOS 12 or higer to use ERLE.\nPlease update.')
                return false

            } else {

                let usingSafari = /^((?!chrome|android).)*safari/i.test( navigator.userAgent );
                console.log( 'usingSafari:', usingSafari );

                if ( usingSafari ) {

                    if ( typeof MediaRecorder === 'undefined' ) {

                        alert( "Please enable MediaRecorder via the following steps. Go to:\n1. settings\n2. Safari\n3. advanced\n4. experimental features\n5. turn 'MediaRecorder' on\n6. Refresh this page" )
                        return false

                    }

                } else {

                    alert( 'on Apple devices, ERLE only works on the Safari Browser' );
                    return false

                }

            }

        } else {

            alert('your apple device is not compatible with ERLE')
            return false

        }

    } else {

        return true;

    }

}

function engineRunning() {

    console.log('in engine running');
    setBaseExpressionsAndMovements(); // do this after all of Tia is loaded
    setSynthesisAudioOnChangeEvent();
    animate();
    if ( conversationVariables.first_enter ) {
    
        tiaLookAtLaptopAndType();
    
    } else {

        movementController( movementObject.abs.blank, 0.1, 0.1 );
        readyAudio();

    }

    blinkControllerObject.bool = true;
    createSingleExpression( expressionObject.rel.neutral, 1 );
    expressionController( expressionObject.calculated, 1 );

    conversationVariables.totalPoints = 0
    showPts();
    runUCDGif();
    setTimeout( function() {
        
        if ( conversationVariables.first_enter ) {
            
            $("#foregroundContainer").fadeOut( 1500, initTiaEnterGreeting );
        
        } else {

            talkObject.learning = true;
            $("#foregroundContainer").fadeOut( 1500, initInputReady );

        }
        conversationVariables.first_enter = false;

    
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

// start random movementObject.abs and calculate stuff after bodyparts loaded
function setBaseExpressionsAndMovements() {

    expressionObject.base = getAbsoluteCoordsOfExpressionNow(); // get absolute position of base expression
    expressionObject.now = $.extend( true, {}, expressionObject.base ); // create a copy of this for expression now
    getAbsoluteCoordsOfMainExpressions(); // gets coordinates for all main expressions
    

    movementObject.base = getAbsoluteCoordsOfMovementNow(); // same as above for movementObject.abs
    movementObject.now = $.extend( true, {}, movementObject.base );
    getAbsoluteCoordsOfMainMovements(); // gets coordinates for all main expressions

}

function setSynthesisAudioOnChangeEvent() {

    //load this early and change .src later
    synthesisObject.audio = document.getElementById( 'synthClip' );
    synthesisObject.audioS3 = document.getElementById( 'danSynthAudio' );

    synthesisObject.audio.ondurationchange = function() {

        let dur = synthesisObject.audio.duration
        synthesisObject.now.noOfFrames = Math.floor( dur * 60 )
        synthesisObject.gotNewDuration = true;
        breatheObject.singleBreath.outCount = dur;

        //console.log('DELAY_BEFORE_MIA_SPEAKS:', DELAY_BEFORE_MIA_SPEAKS)
        //console.log('synthesisObject.audio.duration:', synthesisObject.audio.duration)
        //let dur = synthesisObject.audio.duration - DELAY_BEFORE_MIA_SPEAKS
        //let dur = synthesisObject.audio.duration
        //console.log('dur:', dur)
        //console.log('synthesisObject.audio.duration:', synthesisObject.audio.duration)
        synthesisObject.now.noOfPhones = synthesisObject.now.visemes[ synthesisObject.sentenceNo ].length;

        //synthesisObject.now.noOfFrames = Math.floor( dur * 60 )
        //synthesisObject.now.noOfFramesPerPhone = Math.floor( synthesisObject.now.noOfFrames / ( synthesisObject.now.noOfPhones - 1 ) );

        //synthesisObject.now.noOfLeftoverFrames = synthesisObject.now.noOfFrames - synthesisObject.now.noOfFramesPerPhone * synthesisObject.now.noOfPhones;

        //synthesisObject.gotNewDuration = true;

        //breatheObject.singleBreath.outCount = dur;

    }

}

function runUCDGif() {

    $("#foregroundImage").hide();
    $("#foregroundImageNoHarp").show();
    $("#foregroundImageGif").show();

}

