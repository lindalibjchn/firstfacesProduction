function animate () {

    if ( volumeObject.bool ) {

        drawLoop( mainCount );

    }

    if ( expressionObject.bool ) {

        expression( mainCount );

    }

    if ( movementObject.bool ) {

        movement( mainCount );

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
    if ( breatheObject.bool ) {

        normalBreathing();

    // breathing for speech
    } else {

        singleBreathing()

    }

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

    mainCount += 1;

    requestAnimationFrame( animate );
    
    renderer.render(scene, camera);

};

