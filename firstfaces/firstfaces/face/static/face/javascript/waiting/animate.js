waitingVariables.cumulativeMilliseconds = performance.now();
waitingVariables.cumulativeStart = performance.now();
waitingVariables.meanLastThreeFPS = 60;
waitingVariables.slowFPS = false;
waitingVariables.slowFPSIterator = 0;
function animate() {

    mainCount += 1;

    if ( waitingVariables.slowFPS ) {

        if ( mainCount % 2 === 0 ) {

            if ( expressionObject.bool ) {

                expression( mainCount );

            }

            if ( movementObject.bool ) {

                movement( mainCount );

            }

        }

    } else {

        if ( expressionObject.bool ) {

            expression( mainCount );
       
        }

        if ( movementObject.bool ) {

            movement( mainCount );

        }

    }

    if ( waitingVariables.slowFPSIterator < 5 ) {

        if ( mainCount % 60 === 0 ) {

            checkFPS( mainCount );

        }

    }

    if ( eyelidObject.bool ) {

        moveEyelids( mainCount );

    }

    //setTimeout( animate, 50 );
    requestAnimationFrame( animate );

    renderer.render(scene, camera);

};

function runAnimations() {

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

    waitingVariables.cumulativeMilliseconds = performance.now() - waitingVariables.cumulativeStart;
    
    let FPS = 60 / ( waitingVariables.cumulativeMilliseconds / 1000 );

    waitingVariables.meanLastThreeFPS = ( ( waitingVariables.meanLastThreeFPS * 2 ) + FPS ) / 3
    
    //console.log( 'conversationVariables.meanLastThreeFPS:', conversationVariables.meanLastThreeFPS );

    if ( waitingVariables.meanLastThreeFPS < 40 ) {

        waitingVariables.slowFPS = true;
        waitingVariables.slowFPSIterator += 1;
        
        if ( waitingVariables.slowFPSIterator === 5 ) {

            alert( 'Your phone is running slow.\n\nSome animations will be removed to improve performance.\n\nClose other applications and refresh to reset animations' );
            sendSlowFPSReportToServer();

        }

    } else {

        waitingVariables.slowFPS = false;

    }

    waitingVariables.cumulativeStart = performance.now();

}
