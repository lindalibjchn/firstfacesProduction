conversationVariables.cumulativeMilliseconds = performance.now();
conversationVariables.cumulativeStart = performance.now();
conversationVariables.meanLastThreeFPS = 60;
conversationVariables.slowFPS = false;
conversationVariables.slowFPSIterator = 0;
conversationVariables.slowFPSWarningGiven = false;
conversationVariables.secondsSinceLastSlowFPS = 0;
conversationVariables.slowFPSInitialWarningGiven = false;
function animate() {

    runAnimations();

    mainCount += 1;

    if ( conversationVariables.slowFPSIterator < 5 ) {

        if ( mainCount % 60 === 0 ) {

            checkFPS( mainCount );

        }

    }

    //setTimeout( animate, 50 );
    requestAnimationFrame( animate );
    
    renderer.render(scene, camera);

};

function runAnimations() {

    if ( expressionObject.bool ) {

        expression( mainCount );

    }

    if ( movementObject.bool ) {

        movement( mainCount );

    }

    if ( volumeObject.bool ) {

        drawLoop( mainCount );

    }

    if ( eyelidObject.bool ) {

        moveEyelids( mainCount );

    }

    if ( eyeObject.bool ) {

        moveEyes( mainCount );

    }

    if ( armTapObject.bool ) {

        armTap( mainCount );

    }

    if ( typeObject.L.bool ) {

        typeArm( mainCount, 'L' );

    }

    if ( typeObject.R.bool ) {

        typeArm( mainCount, 'R' );

    }

    if ( nodObject.bool ) {

        nod( mainCount )

    }

    if ( shakeObject.bool ) {

        shake( mainCount )

    }

    // CONTINUOUS AND RANDOM MOVEMENTS
    

    // normal breathing
    //if ( breatheObject.bool ) {

        //normalBreathing();

    //// breathing for speech
    //} else {

        //singleBreathing()

    //}

    ////normal blinking
    
    if ( blinkControllerObject.bool ) {

        blinkController();

    }

    if ( blinkObject.bool ) {

        blink();

    }

    // Random tilt spine and neck
    let randomTiltSpineRemaining = mainCount - spineRandomTiltObject.startCount;

    if ( randomTiltSpineRemaining === spineRandomTiltObject.sinLength ) {
        
        newTilt( spineRandomTiltObject );

    } else {
        
        randomTiltSpine( randomTiltSpineRemaining )

    }
    
    let randomTiltNeckRemaining = mainCount - neckRandomTiltObject.startCount;

    if ( randomTiltNeckRemaining === neckRandomTiltObject.sinLength ) {
        
        newTilt( neckRandomTiltObject );

    } else {
        
        randomTiltNeck( randomTiltNeckRemaining )

    }

    if ( synthesisObject.talking ) {

        let randomTiltHeadXRemaining = mainCount - headXRandomTiltObject.startCount;

        if ( randomTiltHeadXRemaining === headXRandomTiltObject.sinLength ) {
            
            newTilt( headXRandomTiltObject );

        } else {
            
            randomTiltHeadX( randomTiltHeadXRemaining )

        }
        
        let randomTiltHeadYRemaining = mainCount - headYRandomTiltObject.startCount;

        if ( randomTiltHeadYRemaining === headYRandomTiltObject.sinLength ) {
            
            newTilt( headYRandomTiltObject );

        } else {
            
            randomTiltHeadY( randomTiltHeadYRemaining )

        }
    
    }

}

function checkFPS( main ) {

    conversationVariables.cumulativeMilliseconds = performance.now() - conversationVariables.cumulativeStart;
    
    let FPS = 60 / ( conversationVariables.cumulativeMilliseconds / 1000 );

    conversationVariables.meanLastThreeFPS = ( ( conversationVariables.meanLastThreeFPS * 2 ) + FPS ) / 3

    //console.log( 'conversationVariables.meanLastThreeFPS:', conversationVariables.meanLastThreeFPS );

    if ( conversationVariables.meanLastThreeFPS < 45 ) {

        if ( mainCount > 300 ) {

            if ( !conversationVariables.slowFPSInitialWarningGiven ) {

                conversationVariables.slowFPSInitialWarningGiven = true;
                alert( "Your phone is running a little slow.\nSaoirse's audio and lip-sync animations may not work well.\nPlease close all other applications and browser tabs to ensure peak performance." );

            }

        }

        conversationVariables.secondsSinceLastSlowFPS = 0;
        conversationVariables.slowFPSIterator += 1;
        
        if ( conversationVariables.slowFPSIterator === 5 ) {

            conversationVariables.slowFPSWarningGiven = true;
            alert( 'Lip-sync will be turned off for best performance.' );
            sendSlowFPSReportToServer();

        }

    } else {

        conversationVariables.secondsSinceLastSlowFPS += 1;

    }

    conversationVariables.cumulativeStart = performance.now();

    if ( conversationVariables.secondsSinceLastSlowFPS > 60 ) {

        conversationVariables.slowFPSIterator = 0;

    }

}
