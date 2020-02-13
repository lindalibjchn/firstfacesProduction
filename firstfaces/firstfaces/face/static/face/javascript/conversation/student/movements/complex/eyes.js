function initSacc( coords, secs ) {

    //console.log('\ninitSacc called by\n\n' + initSacc.caller.name )
    
    // rotate eye
    initMove( eyeObject, coords, secs );
   
    //eyelid relative move amount from y axis rotation
    let eyelidRelAmount = 2*coords[1][0];

    if ( eyelidRelAmount <= 0 ) {

        eyelidRelAmount /= 2;

    }

    initMoveEyelids( -eyelidRelAmount, -eyelidRelAmount, secs );

}

function initMoveEyelids( upperPos, lowerPos, secs ) {

    if ( eyelidObject.bool ) {

        //console.log( 'initMoveEyelids called when the bool is true. What gives?')

    } else {

        eyelidObject.bool = true;
        assignSinArrayForSpeed( secs, eyelidObject, sineArrays ) 
        eyelidObject.secs = secs;
        eyelidObject.startCount = mainCount;

        eyelidObject.coords.movementUpper = upperPos - eyelidObject.coords.currentUpper;
        eyelidObject.coords.movementLower = lowerPos - eyelidObject.coords.currentLower;

        eyelidObject.coords.currentUpper = upperPos;
        eyelidObject.coords.currentLower = lowerPos;

    }

}

function moveEyelids( main ) {

    let main_start = main - eyelidObject.startCount;
    let sinAmount = eyelidObject.sin[ main_start ]

    //console.log('in moveEyelids')
    if ( main_start < eyelidObject.sinLength ) {

        // upper eyelid
        let upperMultInner = sinAmount * 0.25 * eyelidObject.coords.movementUpper;
        let upperMultMiddle = sinAmount * 0.4 * eyelidObject.coords.movementUpper;
        let upperMultOuter = sinAmount * 0.25 * eyelidObject.coords.movementUpper;
        tiaObject.faceBones['eyelid_upper_inner.L'].position.y += upperMultInner;
        tiaObject.faceBones['eyelid_upper_inner.R'].position.y += upperMultInner;
        tiaObject.faceBones['eyelid_upper_middle.L'].position.y += upperMultMiddle;
        tiaObject.faceBones['eyelid_upper_middle.R'].position.y += upperMultMiddle;
        tiaObject.faceBones['eyelid_upper_outer.L'].position.y += upperMultOuter;
        tiaObject.faceBones['eyelid_upper_outer.R'].position.y += upperMultOuter;

        let lowerMult = sinAmount * 0.15 * eyelidObject.coords.movementLower;
        tiaObject.faceBones['eyelid_lower_inner.L'].position.y += lowerMult;
        tiaObject.faceBones['eyelid_lower_inner.R'].position.y += lowerMult;
        tiaObject.faceBones['eyelid_lower_middle.L'].position.y += lowerMult;
        tiaObject.faceBones['eyelid_lower_middle.R'].position.y += lowerMult;
        tiaObject.faceBones['eyelid_lower_outer.L'].position.y += lowerMult;
        tiaObject.faceBones['eyelid_lower_outer.R'].position.y += lowerMult;

    } else {

        eyelidObject.bool = false;

    }

}

function initThinkingEyes() {

    thinkingEyesObject.bool = true;
    thinkingEyes();

}

function thinkingEyes() { 

    if ( thinkingEyesObject.bool ) {
        
        // get random sacc time between 1-4seconds
        let saccInterval = Math.floor(Math.random() * 3000) + 1000;

        if ( blinkObject.bool === false ) {

            var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            let randomSaccX = thinkingEyesObject.startX + plusOrMinus * Math.random() * thinkingEyesObject.maxX;
            let randomSaccY = thinkingEyesObject.startY + plusOrMinus * Math.random() * thinkingEyesObject.maxY;

            let saccCoords = [[0,0,0],[randomSaccX, randomSaccY, 0]];

            movementNow.sacc = saccCoords;
            initSacc( saccCoords, tiaTimings.thinkingEyesSaccadeDuration, false );

        }

        setTimeout( function() {

            //normalBlinkObject.bool = true;
            setTimeout( function() {
                
                thinkingEyes()

            }, saccInterval );

        }, 1500 );

    }

}

