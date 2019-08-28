function animate () {

    //if ( cameraObject[ 'bool' ] ) {

        //rotateCamera( mainCount );

    //}

    //if ( enterCameraObject[ 'bool' ] ) {

        //enterCameraMove( mainCount );

    //}

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

    if ( eyeObject[ 'bool' ] ) {

        moveEyes( mainCount );

    }

    if ( armTapObject[ 'bool' ] ) {

        armTap( mainCount );

    }

    ////if ( mainCount % 2 === 0 ) {

        //if ( mouthOpenObject.bool ) {

            //openMouth( mainCount )

        //}

    ////} else {

        //if ( purseLipsObject.bool ) {

            //purseLips( mainCount )

        //}

    ////}

    if ( nodObject.bool ) {

        nod( mainCount )

    }

    if ( shakeObject.bool ) {

        shake( mainCount )

    }

    //if ( leanObject.bool ) {

        //lean( mainCount )

    //}

    //if ( armIndicateObject.bool ) {

        //armIndicate( mainCount );

    //}

    ////// Full movementObject.abs

    //if ( mainEnterObject.bool ) {

        //mainEnter();

    //}

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



    mainCount += 1;

    requestAnimationFrame( animate );
    
    renderer.render(scene, camera);

};

