function backNReadALine() {

    var randomReadingMovement = $.extend( true, {}, movements.laptop );

    let plusOrMinusX = Math.random() - 0.5; 
    let plusOrMinusY = Math.random() - 0.5; 
    let randomHeadRotX = 0.15 + plusOrMinusX * 0.03;
    let randomHeadRotY = plusOrMinusY * 0.15;
    randomReadingMovement.AUs.AU1.head = [[0,0,0],[randomHeadRotX, randomHeadRotY, 0]]

    let randomEyeRotX = 0.2 + plusOrMinusX * 0.075;
    let randomEyeRotY = plusOrMinusY * 0.3;
    randomReadingMovement.sacc = [[0,0,0],[randomEyeRotX, randomEyeRotY, 0]]
    
    let randSaccDur = [ '0.25', '0.5' ][Math.floor(Math.random() * 2)]
    let randHeadDur = [ '0.75', '1', '1.5' ][Math.floor(Math.random() * 3)]
    
    movementController( randomReadingMovement, randSaccDur, randHeadDur )

    let delayForReadingSacc = 1000 + Math.random() * 2500;
    setTimeout( waitForWrongSlices, delayForReadingSacc )

}

var talkRootExp;
function initTalk() {
   
    if ( talkObject.bool === false ) {

        let endCount =  Math.max( synthesisObject.synthAudio.duration * 60 - 60, 60 ); 
        talkObject.endCount = mainCount + synthesisObject.endCount;

        // start mouth pursed when talking
        talkObject.bool = true;
        talkObject.startCount = mainCount;

        talkRootExp = getAbsoluteCoordsOfExpressionNow();
        initPurseLips( 0.4, '0.5' );

        setTimeout( function() {

            mouthOpenLoop();
            purseLipsLoop();

        }, 600 );

    } else {

        console.log( "can't talk while still talking!" );

    }

}

// to stop the lips from keeping moving after speech has stopped on slow computers
function resetTalk() {

    talkObject.bool = false;
    mouthOpenObject.bool = false;
    purseLipsObject.bool = false;
    expressionController( talkRootExp, 0.5 )

}

function whenPurseLipsEnds( funcToCall ) {

    if ( purseLipsObject.bool ) {

        setTimeout( function() {
             
            whenPurseLipsEnds( funcToCall )

        }, 500 );

    } else {

        funcToCall()

    }

}

function whenOpenMouthEnds( funcToCall ) {

    if ( mouthOpenObject.bool ) {

        setTimeout( function() {
             
            whenOpenMouthEnds( funcToCall )

        }, 500 );

    } else {

        funcToCall()

    }

}


function mouthOpenLoop() {

    mouthOpenObject.dur = [ 0.3, 0.4, 0.5 ][Math.floor(Math.random() * 3)];
    mouthOpenObject.amount = Math.random() * 0.25;

    initOpenMouth( mouthOpenObject.amount, mouthOpenObject.dur );

    setTimeout( function() {

        initOpenMouth( -mouthOpenObject.amount, mouthOpenObject.dur );

        setTimeout( function() {

            if ( mainCount <= talkObject.endCount ) {

                whenOpenMouthEnds( mouthOpenLoop );

            }

        }, mouthOpenObject.dur * 1000 + 100 )

    }, mouthOpenObject.dur * 1000 + 100 );

}

function purseLipsLoop() {

    purseLipsObject.dur = [ 0.3, 0.4, 0.5 ][Math.floor(Math.random() * 3)];
    purseLipsObject.amount = Math.random() * 1.25;

    initPurseLips( purseLipsObject.amount, purseLipsObject.dur );

    setTimeout( function() {

        initPurseLips( -purseLipsObject.amount, purseLipsObject.dur );

        setTimeout( function() {

            if ( mainCount <= talkObject.endCount ) {

                whenPurseLipsEnds( purseLipsLoop );

            } else {

                initPurseLips( -0.4, '0.5' );

                setTimeout( function() {

                    whenPurseLipsEnds( function() {

                        talkObject.bool = false;

                    })

                }, 550 );

            }

        }, purseLipsObject.dur * 1000 + 100 );

    }, purseLipsObject.dur * 1000 + 100 );

}


//PURSE LIPS
function initPurseLips( to, secs ) {

    assignSinArrayForSpeed( secs / 2, purseLipsObject, sineArrays ) 

    purseLipsObject.startCount = mainCount;
    purseLipsObject.amount = to;

    purseLipsObject.bool = true;


}

function purseLips( main ) {

    let main_start = main - purseLipsObject.startCount;

    let sinAmount = purseLipsObject.sin[ main_start ]
    
    if ( main_start < purseLipsObject.sinLength ) {

        // Pos x-axis
        
        tiaObject.faceBones['lip_upper_inner.L'].position.x += sinAmount * expressionsRel.purseLips.AUs.AU2['lip_upper_inner'][0][0] * purseLipsObject.amount;
        tiaObject.faceBones['lip_upper_inner.R'].position.x -= sinAmount * expressionsRel.purseLips.AUs.AU2['lip_upper_inner'][0][0] * purseLipsObject.amount;

        tiaObject.faceBones['lip_upper_outer.L'].position.x += sinAmount * expressionsRel.purseLips.AUs.AU2['lip_upper_outer'][0][0] * purseLipsObject.amount;
        tiaObject.faceBones['lip_upper_outer.R'].position.x -= sinAmount * expressionsRel.purseLips.AUs.AU2['lip_upper_outer'][0][0] * purseLipsObject.amount;

        tiaObject.faceBones['lip_edge_upper.L'].position.x += sinAmount * expressionsRel.purseLips.AUs.AU2['lip_edge_upper'][0][0] * purseLipsObject.amount;
        tiaObject.faceBones['lip_edge_upper.R'].position.x -= sinAmount * expressionsRel.purseLips.AUs.AU2['lip_edge_upper'][0][0] * purseLipsObject.amount;

        tiaObject.faceBones['lip_edge_lower.L'].position.x += sinAmount * expressionsRel.purseLips.AUs.AU2['lip_edge_lower'][0][0] * purseLipsObject.amount;
        tiaObject.faceBones['lip_edge_lower.R'].position.x -= sinAmount * expressionsRel.purseLips.AUs.AU2['lip_edge_lower'][0][0] * purseLipsObject.amount;

        tiaObject.faceBones['lip_lower_outer.L'].position.x += sinAmount * expressionsRel.purseLips.AUs.AU2['lip_lower_outer'][0][0] * purseLipsObject.amount;
        tiaObject.faceBones['lip_lower_outer.R'].position.x -= sinAmount * expressionsRel.purseLips.AUs.AU2['lip_lower_outer'][0][0] * purseLipsObject.amount;

        tiaObject.faceBones['lip_lower_inner.L'].position.x += sinAmount * expressionsRel.purseLips.AUs.AU2['lip_lower_inner'][0][0] * purseLipsObject.amount;
        tiaObject.faceBones['lip_lower_inner.R'].position.x -= sinAmount * expressionsRel.purseLips.AUs.AU2['lip_lower_inner'][0][0] * purseLipsObject.amount;

        //// Pos z-axis

        tiaObject.faceBones['lip_upper_outer.L'].position.z += sinAmount * expressionsRel.purseLips.AUs.AU2['lip_upper_outer'][0][2] * purseLipsObject.amount;
        tiaObject.faceBones['lip_upper_outer.R'].position.z += sinAmount * expressionsRel.purseLips.AUs.AU2['lip_upper_outer'][0][2] * purseLipsObject.amount;

        tiaObject.faceBones['lip_upper_inner.L'].position.z += sinAmount * expressionsRel.purseLips.AUs.AU2['lip_upper_inner'][0][2] * purseLipsObject.amount;
        tiaObject.faceBones['lip_upper_inner.R'].position.z += sinAmount * expressionsRel.purseLips.AUs.AU2['lip_upper_inner'][0][2] * purseLipsObject.amount;

        tiaObject.faceBones['lip_edge_upper.L'].position.z += sinAmount * expressionsRel.purseLips.AUs.AU2['lip_edge_upper'][0][2] * purseLipsObject.amount; 
        tiaObject.faceBones['lip_edge_upper.R'].position.z += sinAmount * expressionsRel.purseLips.AUs.AU2['lip_edge_upper'][0][2] * purseLipsObject.amount;

        tiaObject.faceBones['lip_edge_lower.L'].position.z += sinAmount * expressionsRel.purseLips.AUs.AU2['lip_edge_lower'][0][2] * purseLipsObject.amount;
        tiaObject.faceBones['lip_edge_lower.R'].position.z += sinAmount * expressionsRel.purseLips.AUs.AU2['lip_edge_lower'][0][2] * purseLipsObject.amount;

        tiaObject.faceBones['lip_lower_outer.L'].position.z += sinAmount * expressionsRel.purseLips.AUs.AU2['lip_lower_outer'][0][2] * purseLipsObject.amount;
        tiaObject.faceBones['lip_lower_outer.R'].position.z += sinAmount * expressionsRel.purseLips.AUs.AU2['lip_lower_outer'][0][2] * purseLipsObject.amount;

        tiaObject.faceBones['lip_lower_inner.L'].position.z += sinAmount * expressionsRel.purseLips.AUs.AU2['lip_lower_inner'][0][2] * purseLipsObject.amount;
        tiaObject.faceBones['lip_lower_inner.R'].position.z += sinAmount * expressionsRel.purseLips.AUs.AU2['lip_lower_inner'][0][2] * purseLipsObject.amount;

    } else {

        purseLipsObject.bool = false;

    }

}


// OPEN MOUTH

function initOpenMouth( to, secs ) {

    assignSinArrayForSpeed( secs / 2, mouthOpenObject, sineArrays ) 

    mouthOpenObject.startCount = mainCount;
    mouthOpenObject.rotationMult = to;

    mouthOpenObject.bool = true;

}


function openMouth( main ) {

    console.log('in openMouth');
    let main_start = main - mouthOpenObject[ 'startCount' ];

    let sinAmount = mouthOpenObject[ 'sin' ][ main_start ]
    
    if ( main_start < mouthOpenObject.sinLength ) {

        let rotationMult = mouthOpenObject.rotationMult;

        // jaw rotate x-axis

        tiaObject.faceBones['jaw'].rotation.x += sinAmount * rotationMult * 0.2;
        tiaObject.mouthBones['jaw_inner'].rotation.x += sinAmount * rotationMult * 0.2;


        // Pos y-axis 

        tiaObject.faceBones['lip_upper_inner.L'].position.y += sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_upper_inner'][0][1] * rotationMult;
        tiaObject.faceBones['lip_upper_inner.R'].position.y += sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_upper_inner'][0][1] * rotationMult;

        tiaObject.faceBones['lip_upper_outer.L'].position.y += sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_upper_outer'][0][1] * rotationMult;
        tiaObject.faceBones['lip_upper_outer.R'].position.y += sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_upper_outer'][0][1] * rotationMult;

        tiaObject.faceBones['lip_edge_upper.L'].position.y += sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_edge_upper'][0][1] * rotationMult;
        tiaObject.faceBones['lip_edge_upper.R'].position.y += sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_edge_upper'][0][1] * rotationMult;

        tiaObject.faceBones['lip_edge_lower.L'].position.y += sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_edge_lower'][0][1] * rotationMult;
        tiaObject.faceBones['lip_edge_lower.R'].position.y += sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_edge_lower'][0][1] * rotationMult;

        tiaObject.faceBones['lip_lower_outer.L'].position.y += sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_lower_outer'][0][1] * rotationMult;
        tiaObject.faceBones['lip_lower_outer.R'].position.y += sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_lower_outer'][0][1] * rotationMult;

        tiaObject.faceBones['lip_lower_inner.L'].position.y += sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_lower_inner'][0][1] * rotationMult;
        tiaObject.faceBones['lip_lower_inner.R'].position.y += sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_lower_inner'][0][1] * rotationMult;


        // Pos x+axis
        
        tiaObject.faceBones['lip_upper_outer.L'].position.x += sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_upper_outer'][0][0] * rotationMult;
        tiaObject.faceBones['lip_upper_outer.R'].position.x -= sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_upper_outer'][0][0] * rotationMult;

        tiaObject.faceBones['lip_edge_upper.L'].position.x += sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_edge_upper'][0][0] * rotationMult;
        tiaObject.faceBones['lip_edge_upper.R'].position.x -= sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_edge_upper'][0][0] * rotationMult;

        tiaObject.faceBones['lip_edge_lower.L'].position.x += sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_edge_lower'][0][0] * rotationMult;
        tiaObject.faceBones['lip_edge_lower.R'].position.x -= sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_edge_lower'][0][0] * rotationMult;

        tiaObject.faceBones['lip_lower_outer.L'].position.x += sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_lower_outer'][0][0] * rotationMult;
        tiaObject.faceBones['lip_lower_outer.R'].position.x -= sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_lower_outer'][0][0] * rotationMult;


        // Pos z+axis

        //if smiling need to stop bottom teeth coming through with multiplier based on state of smile

        tiaObject.faceBones['lip_edge_upper.L'].position.z += sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_edge_upper'][0][2] * rotationMult;
        tiaObject.faceBones['lip_edge_upper.R'].position.z += sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_edge_upper'][0][2] * rotationMult;

        tiaObject.faceBones['lip_edge_lower.L'].position.z += sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_edge_lower'][0][2] * rotationMult;
        tiaObject.faceBones['lip_edge_lower.R'].position.z += sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_edge_lower'][0][2] * rotationMult;

        tiaObject.faceBones['lip_lower_outer.L'].position.z += sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_lower_outer'][0][2] * rotationMult;
        tiaObject.faceBones['lip_lower_outer.R'].position.z += sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_lower_outer'][0][2] * rotationMult;

        tiaObject.faceBones['lip_lower_inner.L'].position.z += sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_lower_inner'][0][2] * rotationMult;
        tiaObject.faceBones['lip_lower_inner.R'].position.z += sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_lower_inner'][0][2] * rotationMult;


        // z-rot

        tiaObject.faceBones['lip_upper_inner.L'].rotation.z += sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_upper_inner'][1][2] * rotationMult;
        tiaObject.faceBones['lip_upper_inner.R'].rotation.z -= sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_upper_inner'][1][2] * rotationMult;

        tiaObject.faceBones['lip_edge_upper.L'].rotation.z += sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_edge_upper'][1][2] * rotationMult;
        tiaObject.faceBones['lip_edge_upper.R'].rotation.z -= sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_edge_upper'][1][2] * rotationMult;

        tiaObject.faceBones['lip_edge_lower.L'].rotation.z += sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_edge_lower'][1][2] * rotationMult;
        tiaObject.faceBones['lip_edge_lower.R'].rotation.z -= sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_edge_lower'][1][2] * rotationMult;

        tiaObject.faceBones['lip_lower_outer.L'].rotation.z += sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_lower_outer'][1][2] * rotationMult;
        tiaObject.faceBones['lip_lower_outer.R'].rotation.z -= sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_lower_outer'][1][2] * rotationMult;

        // x-rot

        tiaObject.faceBones['lip_lower_outer.L'].rotation.x -= sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_lower_outer'][1][0] * rotationMult;
        tiaObject.faceBones['lip_lower_outer.R'].rotation.x -= sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_lower_outer'][1][0] * rotationMult;

        tiaObject.faceBones['lip_lower_inner.L'].rotation.x -= sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_lower_inner'][1][0] * rotationMult;
        tiaObject.faceBones['lip_lower_inner.R'].rotation.x -= sinAmount * expressionsRel.mouthOpen.AUs.AU2['lip_lower_inner'][1][0] * rotationMult;

        // y-rot

        //tiaObject.faceBones['lip_lower_outer.L'].rotation.y += bottomTeethMult * yRotSmileOpenRatios[4];
        //tiaObject.faceBones['lip_lower_outer.R'].rotation.y += bottomTeethMult * yRotSmileOpenRatios[4];

        // cheek
        tiaObject.faceBones['cheek.L'].position.x -= sinAmount * expressionsRel.mouthOpen.AUs.AU2['cheek'][0][0] * rotationMult;
        tiaObject.faceBones['cheek.R'].position.x -= sinAmount * expressionsRel.mouthOpen.AUs.AU2['cheek'][0][0] * rotationMult;

        // paljajooreum
        tiaObject.faceBones['pal_ja_jooreum.L'].position.y -= sinAmount * expressionsRel.mouthOpen.AUs.AU2['pal_ja_jooreum'][0][1] * rotationMult;
        tiaObject.faceBones['pal_ja_jooreum.R'].position.y -= sinAmount * expressionsRel.mouthOpen.AUs.AU2['pal_ja_jooreum'][0][1] * rotationMult;

        // jaw upper
        tiaObject.faceBones['jaw_upper.L'].position.z -= sinAmount * expressionsRel.mouthOpen.AUs.AU2['jaw_upper'][0][2] * rotationMult;
        tiaObject.faceBones['jaw_upper.R'].position.z += sinAmount * expressionsRel.mouthOpen.AUs.AU2['jaw_upper'][0][2] * rotationMult;


    } else {

        mouthOpenObject.bool = false;

    }

}


/////////// EYELIDS

function initMoveEyelids( upperPos, lowerPos, secs ) {

    if ( eyelidObject.bool ) {

        console.log( 'initMoveEyelids called when the bool is true. What gives?')

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

//function updateEyelids( upperPos, lowerPos ) {

    //eyelidObject.coords.currentUpper += upperPos;
    //eyelidObject.coords.currentLower += lowerPos;

//}

//////////////// NOD AND SHAKE VHEAD

function initNod( depth, secs ) {

    // EX: initNod(0.1, '0.5')

    if ( nodObject.bool ) {

        console.log('can move while still moving man!!')

    } else {
    
        nodObject.bool = true;
        
        if ( nodObject.iter === 0 ) {
         
            assignSinArrayForSpeed( secs, nodObject, quickTurnaroundSineArrays ) 
            nodObject.secs = secs;
            nodObject.depth = depth;
            nodObject.amount = nodObject.decay[ 0 ] * depth;
        
        } else {

            nodObject.amount = nodObject.depth * nodObject.decay[ nodObject.iter];

        }

        nodObject.startCount = mainCount;

        initSacc( [[0,0,0],[ -nodObject.amount / 3, 0, 0]], secs, true );
        
    }

}


function nod( main ) {

    let main_start = main - nodObject.startCount;
    let sinAmount = nodObject.sin[ main_start ]
    
    if ( main_start < nodObject.sinLength ) {

        let rotXMult = nodObject.amount * sinAmount;
        tiaObject.faceBones.head.rotation.x += rotXMult;
        tiaObject.bodyBones.spineUpperInner.rotation.x += -rotXMult / 6;

    } else {

        nodObject.bool = false;
        
        if ( nodObject.iter < 3 ) {

            nodObject.iter += 1;
            initNod( nodObject.depth, nodObject.secs );

        } else {

            nodObject.iter = 0;
            movementController( movements.blank, nodObject.secs, nodObject.secs );

        }

    }

}


function initShake( depth, secs ) {

    if ( shakeObject.bool ) {

        console.log('can move while still moving man!!')

    } else {
    
        shakeObject.bool = true;
        
        if ( shakeObject.iter === 0 ) {
         
            assignSinArrayForSpeed( secs, shakeObject, sineArrays ) 
            shakeObject.secs = secs;
            shakeObject.depth = depth;
            shakeObject.amount = shakeObject.decay[ 0 ] * depth;
        
        } else {

            shakeObject.amount = shakeObject.depth * shakeObject.decay[ shakeObject.iter];

        }

        shakeObject.startCount = mainCount;

        initMove( eyeObject, [[0,0,0],[0, -shakeObject.amount / 2, 0]], secs );
        
    }

}

function shake( main ) {

    let main_start = main - shakeObject.startCount;
    let sinAmount = shakeObject.sin[ main_start ]
    
    if ( main_start < shakeObject.sinLength ) {

        let rotYMult = shakeObject.amount * sinAmount;
        tiaObject.faceBones.head.rotation.y += rotYMult;

    } else {

        shakeObject.bool = false;
        
        if ( shakeObject.iter < 3 ) {

            shakeObject.iter += 1;
            initShake( shakeObject.depth, shakeObject.secs );

        } else {

            shakeObject.iter = 0;
            movementController( movements.blank, shakeObject.secs, shakeObject.secs );

        }

    }

}

/////////// SACC

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

/////////// TAP KEY MOVEMENT OUT DOWN AND UP

function tapKeyFull() {

    let state = 0;
    initMove( armTapObject, [[0,0,0],[0,0.2,-0.2]], 0.5 );

    function checkIfArmDone() {

        if ( armTapObject.bool ) {

            setTimeout( checkIfArmDone, 100 );

        } else {

            if ( state === 0 ) {
                
                initMove( armTapObject, [[0,0,0],[0,0.2,-0.15]], 0.1 )
                state = 1;   
                setTimeout( checkIfArmDone, 150 );

            } else if ( state === 1 ) {

                initMove( armTapObject, [[0,0,0],[0,0.2,-0.2]], 0.1 )
                state = 2;
                setTimeout( checkIfArmDone, 150 );
        
            } else {

                $('#closeOverlayArea').prop( "disabled", false);
                $('#submitOverlay').prop( "disabled", false);
                //calculateAlternatives();
                //show play buttons below
                if ( conversationVariables.tutorial === false ) {

                    // show john's error box
                    if ( conversationVariables.tapKeyForErrors ) {

                        conversationVariables.tapKeyForErrors = false;

                        movementController( movements.blank, '0.5', '1.5' );
                        // display errors
                        showWrongSentence();

                    } else if ( conversationVariables.tapKeyForCorrection ) {

                        conversationVariables.tapKeyForCorrection = false;
                        showCorrectionUnderWrongSent();

                    } else if ( conversationVariables.showingSpectrograms ) {

                        conversationVariables.showingSpectrograms = false;
                        $("#praatCont").fadeIn(800);

                    // this one is for after listening to the learners speech - Daniel's stuff
                    } else {
                        
                        if(!conversationVariables.stage2 && !conversationVariables.stage3){

                        $('.play-btn').prop( "disabled", false);
                        $('#talkBtn').prop( "disabled", false);
                        $('#recordVoiceBtn').show();

                        if (($(".selectable-word").length > 0)||($(".selected-word").length >0)){
                            //reset text
                            //$('#tia-speech-box').text("Is this what you meant to say?");
                            //hide backward and forward buttons
                            $('#backErrorSelection').hide();
                            $('#forwardErrorSelection').hide();
                        }
                        if(($(".uncorrected-error").length > 0)|| ($(".corrected-error").length > 0) ){
                            //reset speech
                            //$("#tia-speech-box").text("Is this what you meant to say?");
                            //hide buttons
                            $("#submitCorrectedErrors").hide();
                            $("#backCorrection").hide();
                        }
                        
                        if ( $('#upperSentenceHolder').children().length > 0 ) {
                           $('#upperSentenceHolder').empty();
                           $('#lowerSentenceHolder').empty();
                        }
                       
                        

                        //reset what tia is saying and add back in the two buttons
                        $('.play-btn').prop( "disabled", false);
                        $('#talkBtn').prop( "disabled", false);
                        $('#recordVoiceBtn').show();
                        
                        //Daniel

                        $('#talkBtn').show();
                        //change correct transcipt to #talkBtn
                        //$('#correctTranscript').show();
                        //Adding speech bubble for tia 

                        //Displaying hypothesised transcript
                        $('#textInputContainer').show();
                        $('#sentenceShowHolder').show();
                        //$('#speechBubbleCont').show();
                          
                        populateDivs();
                            
                              
                            
                            setTimeout( set_selectable(conversationVariables.alternatives[0].transcript) , 1200);   

                        
                        }}

                }

                initMove( armTapObject, [[0,0,0],[0,0,0]], 0.8 )

            }

        }

    }

    setTimeout( checkIfArmDone, 550 );

}

//fucntion to populate the output box with transcript
function populateDivs() {
    var words = conversationVariables.alternatives[0].transcript.split(" ");
    words.forEach(addWords);
    $('#listenVoiceBtn').show();
}
function populateDivsNewTrans(trans){
    var words = trans.split(" ");
    words.forEach(addWords);                                            
    $('#listenVoiceBtn').show();                                        
}

function addWords(word,count) {
   var idx = "'upper_"+count+"'";
   $('#upperSentenceHolder').append("<span id="+idx+"' class='normal-word' >"+word+"</span>");
   $('#upperSentenceHolder').append(" "); 
   idx = "'lower_"+count+"'";
   $('#lowerSentenceHolder').append("<span id="+idx+"' class='hidden-word' >"+word+"</span>");
   $('#lowerSentenceHolder').append(" ");
}

//function calculateAlternatives() {

    //$('#textInput').val( synthesisObject.transcript0 );
    ////$('.sent-scores').css( 'border', 'none' );
    ////$('#alt00').css( 'border', '3px solid yellow' );
    
    //synthesisObject.transcriptCur = '0';

    //if ( synthesisObject.alternatives === 1 ) {

        //$('#alt01').hide();
        //$('#alt02').hide();

    //} else if ( synthesisObject.alternatives === 2 ) {
    
        //$('#alt01').show();
        //$('#alt02').hide();

    //} else if ( synthesisObject.alternatives === 3 ) {
    
        //$('#alt01').show();
        //$('#alt02').show();

    //}

    //showTextStuff();
    //$('#textInput').focus();

//}

/////////// LISTEN TO SPEECH SYNTHESIS

function listenToSpeechSynthesis( intensity ) {

    if ( intensity === 0 ) {

        movementController( movements.speechRecognitionInput01, 1, 1 )

    } else if ( intensity === 1 ) {

        movementController( movements.speechRecognitionInput02, 1.25, 1.25 )

    } else {

        movementController( movements.speechRecognitionInput03, 1.5, 1.5 )

    }

    expressionController( expressionObject.abs.speechRecognition, 0.3 )

}

function dealWithBlankTranscription() {

    $('#recordBtnsCont').hide();


    synthesisObject.synthAudio.src = prefixURL + tiaMediaLoc + "im_sorry_but_i_didnt_hear_anything.wav";
    tiaSpeak( "I'm sorry, but I didn't hear anything. Could you try again?", function() {
     
        $('#recordVoiceBtn').show();
        conversationVariables.mainRecord = false;

        $('#recordBtnsCont').fadeIn();
        //removeSpeechBubble();

    } );

}

function returnFromListenToSpeechSynthesis() {

    movementController( movements.blank, 1, 1 );
    setTimeout( function() {
        
        // if no sound comes through, don't tap or show empty transcripts
        if ( conversationVariables.alternatives[ 0 ].transcript === "" ) {
        
            if ( conversationVariables.tutorial === false ) {

                setTimeout( function() {

                    initShake(0.2, 0.5)
                    setTimeout( dealWithBlankTranscription, 1500 );

                }, 1000);
        
            }

        } else {
           // reset this as main recording is complete with a transcription
           conversationVariables.mainRecord = false;
            
            $('#closeOverlayArea').prop( "disabled", true);
            $('#submitOverlay').prop( "disabled", true);
            tapKeyFull();
    
            setTimeout( function() {

                expressionController( expressionObject.abs.neutral, 0.5 )
            
                //setTimeout( function() {

                    //$('#recordVoiceBtn').show();
                
                //}, 1000 );

            }, 300);

        }

    }, 200 );

}

function returnFromListenToErrorAttemptWithSpectrograph() {

    movementController( movements.laptop, 0.5, 1 );

}

/////////// RANDOM MOVEMENTS ALL THE TIME

function breathe( remaining ) {

    let mult = breatheObject.direction * breatheObject.scaleMult * breatheObject.sin[ remaining ];

    tiaObject.bodyBones.spineUpper.scale.x += mult * 12;
    tiaObject.bodyBones.spineUpper.scale.y += mult;
    tiaObject.bodyBones.spineUpper.scale.z += mult; 
    tiaObject.faceBones['shoulder.L'].position.y += breatheObject.direction * breatheObject.yPosMult * breatheObject.sin[ remaining ];
    tiaObject.faceBones['shoulder.R'].position.y += breatheObject.direction * breatheObject.yPosMult * breatheObject.sin[ remaining ];

}

function randomTiltSpine( remaining ) {

    tiaObject.bodyBones.spineLower.rotation.z = spineRandomTiltObject.direction * spineRandomTiltObject.mult * spineRandomTiltObject.sin[ remaining ];

}

function randomTiltNeck( remaining ) {

    tiaObject.faceBones.neck.rotation.z = neckRandomTiltObject.direction * neckRandomTiltObject.mult * neckRandomTiltObject.sin[ remaining ];

}






