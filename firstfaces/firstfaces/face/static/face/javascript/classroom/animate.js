
function animate () {

    //if ( cameraObject[ 'bool' ] ) {

        //rotateCamera( mainCount );

    //}

    //if ( enterCameraObject[ 'bool' ] ) {

        //enterCameraMove( mainCount );

    //}

    //if ( expressionObject.bool ) {

        //expression( mainCount );

    //}

    if ( movementObject.bool ) {

        movement( mainCount );

    }

    //if ( eyelidObject.bool ) {

        //moveEyelids( mainCount );

    //}

    //if ( eyeObject[ 'bool' ] ) {

        //moveEyes( mainCount );

    //}

    //if ( mouthOpenObject.bool ) {

        //openMouth( mainCount )

    //}

    //if ( purseLipsObject.bool ) {

        //purseLips( mainCount )

    //}

    //if ( nodObject.bool ) {

        //nod( mainCount )

    //}

    //if ( shakeObject.bool ) {

        //shake( mainCount )

    //}

    //if ( leanObject.bool ) {

        //lean( mainCount )

    //}

    //if ( armIndicateObject.bool ) {

        //armIndicate( mainCount );

    //}

    //// Full movements

    //if ( mainEnterObject.bool ) {

        //mainEnter();

    //}

    //// CONTINUOUS AND RANDOM MOVEMENTS
    

    //// normal breathing
    //let breatheRemaining = mainCount % secsOneBreath;

    //// change breathing direction
    //if ( breatheRemaining === 0 ) {

        //breatheObject.direction *= -1;

    //}

    //breathe( breatheRemaining )

    
    ////normal blinking
    
    //if ( normalBlinkObject.bool ) {

        //let untilNextBlink = normalBlinkObject.nextBlinkCount - mainCount;

        //if ( untilNextBlink <= 0 ) {

            //blinkNowObject.bool = true;
            //normalBlinkObject.bool = false;
            //normalBlinkObject.nextBlinkCount = mainCount + Math.floor( 200 + Math.random() * 240 );

            ////call the show time remaining to reload it and keep it up to pace
            //showTimeRemaining();
        //}

    //}

    //if ( blinkNowObject.bool ) {

        //if ( blinkNowObject.countdown === 7 ) {
            
            //eyelidObject.coords.beforeBlinkUpper = eyelidObject.coords.currentUpper;
            //eyelidObject.coords.beforeBlinkLower = eyelidObject.coords.currentLower;
            //initMoveEyelids( -1, 1, '0.1', false); 
            //blinkNowObject.countdown -= 1;

        //} else if ( blinkNowObject.countdown === 0 ) {

            //initMoveEyelids( eyelidObject.coords.beforeBlinkUpper, eyelidObject.coords.beforeBlinkLower, '0.1', false); 
            //blinkNowObject.countdown -= 1;

        //} else if ( blinkNowObject.countdown <= -7 ) {

            //blinkNowObject.bool = false;
            //blinkNowObject.countdown = 8;
            //normalBlinkObject.bool = true;

        //} else {

            //blinkNowObject.countdown -= 1;

        //}

    //}

    //// Random tilt spine and neck
    //let randomTiltSpineRemaining = mainCount - spineRandomTiltObject.startCount;

    //if ( randomTiltSpineRemaining === spineRandomTiltObject.sinLength ) {
        
        //newTilt( spineRandomTiltObject );

    //} else {
        
        //randomTiltSpine( randomTiltSpineRemaining )

    //}
    
    //let randomTiltNeckRemaining = mainCount - neckRandomTiltObject.startCount;

    //if ( randomTiltNeckRemaining === neckRandomTiltObject.sinLength ) {
        
        //newTilt( neckRandomTiltObject );

    //} else {
        
        //randomTiltNeck( randomTiltNeckRemaining )

    //}



    mainCount += 1;

    requestAnimationFrame( animate );
    
    renderer.render(scene, camera);

};

