function blink() {

    if ( blinkObject.countdown === 15 ) {
        
        eyelidObject.coords.beforeBlinkUpper = eyelidObject.coords.currentUpper;
        eyelidObject.coords.beforeBlinkLower = eyelidObject.coords.currentLower;
        initMoveEyelids( -1, 1, 0.1); 
        blinkObject.countdown -= 1;

    } else if ( blinkObject.countdown === 6 ) {

        initMoveEyelids( eyelidObject.coords.beforeBlinkUpper, eyelidObject.coords.beforeBlinkLower, 0.1 ); 
        blinkObject.countdown -= 1;

    } else if ( blinkObject.countdown <= 0 ) {

        blinkObject.bool = false;
        blinkObject.countdown = 16;
        blinkControllerObject.bool = true;

    } else {

        blinkObject.countdown -= 1; // incase the count gets larger than 12 for some reason

    }

}

function blinkController() {

    // this is set randomly below to sometime between 3-6 seconds
    let untilNextBlink = blinkControllerObject.nextBlinkCount - mainCount;

    if ( untilNextBlink <= 0 ) {

        //first check if eyelids are already moving, if so, don't blink!!
        if ( eyelidObject.bool ) {

            // first time print out to let know that blink was cancelled
            if ( untilNextBlink === 0 ) {

                console.log('eyelids moving when blinking called, so no blink initiated');

            }

        } else {

            // if first was cancelled, then when this is called, print out to let know that blink has happened
            if ( untilNextBlink < 0 ) {

                console.log('late blink initiated');

            }

            blinkObject.bool = true; // makes the actual blinking run
            blinkControllerObject.bool = false; // don't run the countdown agian until the blink has completed
            blinkControllerObject.nextBlinkCount = mainCount + Math.floor( 200 + Math.random() * 240 ); // new countdown until next blink

            // call the show time remaining to reload it and keep it up to pace
            
            //if ( conversationVariables.tutorial === false ) {

                //showTimeRemaining();
    
            //}

        }

    }

}

