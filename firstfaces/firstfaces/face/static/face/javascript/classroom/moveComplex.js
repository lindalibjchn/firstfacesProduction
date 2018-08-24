function backNReadALine() {

    var randomReadingMovement = $.extend( true, {}, movements.laptop );

    let plusOrMinusX = Math.random() - 0.5; 
    let plusOrMinusY = Math.random() - 0.5; 
    let randomHeadRotX = 0.15 + plusOrMinusX * 0.02;
    let randomHeadRotY = plusOrMinusY * 0.1;
    randomReadingMovement.AUs.AU1.head = [[0,0,0],[randomHeadRotX, randomHeadRotY, 0]]

    let randomEyeRotX = 0.2 + plusOrMinusX * 0.05;
    let randomEyeRotY = plusOrMinusY * 0.2;
    randomReadingMovement.sacc = [[0,0,0],[randomEyeRotX, randomEyeRotY, 0]]
    
    let randSaccDur = [ '0.25', '0.5' ][Math.floor(Math.random() * 2)]
    let randHeadDur = [ '0.75', '1', '1.5' ][Math.floor(Math.random() * 3)]
    
    movementController( randomReadingMovement, randSaccDur, randHeadDur )

    let delayForReadingSacc = 2000 + Math.random() * 2500;
    setTimeout( waitForWrongSlices, delayForReadingSacc )

}


//function initTalk() {

    //// create this as creating talk will override the original expression one
    ////talkStartPoint = $.extend( true, {}, talkCalculatedExpression );

    //synthesisObject.length = synthesisObject.text.length;
    //talkObject.endCount = mainCount + synthesisObject.length * 3;
    //talkObject.bool = true;
    //talkObject.dir = 1;
    //talk();

//}

//function talk() {
   
    //// make talkObject.bool false to stop talking
    //// if direction is -1 then it needs to return to closed omuth even if false

    //if ( talkObject.bool && mainCount < talkObject.endCount ) {

        //// first need to initialise the masterExpression with openmouth and pursedlips
        //randMult = 0.2 + ( Math.random() / 2 );
        //randRatio = (Math.random() / 5);

        //// create random duration
        //randDuration = [ '0.1', '0.25', '0.5' ][Math.floor(Math.random() * 3)];
        
        //let prevCalcExp = $.extend( true, {}, calculatedExpression )

        //let calcExp = createCalculatedExpression([expressionsRel.mouthOpen, expressionsRel.purseLips], randRatio, randMult, 0 )[ 0 ];
        //expressionController( calcExp );


        //// CALCULATE RELATIVE MOVEMENT

        //setTimeout( function() {

            //expressionController( prevCalcExp, randDuration );

            //setTimeout( function() {

                //talk();

            //}, parseFloat( randDuration ) * 1000 + 200 );

        //}, parseFloat( randDuration ) * 1000 + 200 );

    //} else {

        //talkObject.bool = false;

        ////return if not entrance
        //if ( talkObject.learning ) {
        
            //setTimeout( returnToLaptop, 1000 );

        //}

    //}

//}


function initTalk( times ) {
   
    synthesisObject.length = synthesisObject.text.length;
    talkObject.endCount = mainCount + synthesisObject.length * 3;

    // start mouth pursed when talking
    talkObject.bool = true;
    talkObject.startCount = mainCount;
    initPurseLips( 0.4, '0.5' );

    setTimeout( function() {

        mouthOpenLoop();
        purseLipsLoop();

    }, 600 );

}

function whenPurseLipsEnds( funcToCall ) {

    if ( purseLipsObject.bool ) {

        setTimeout( function() {
             
            whenPurseLipsEnds( funcToCall )

        }, 200 );

    } else {

        funcToCall()

    }

}

function whenOpenMouthEnds( funcToCall ) {

    if ( mouthOpenObject.bool ) {

        setTimeout( function() {
             
            whenOpenMouthEnds( funcToCall )

        }, 200 );

    } else {

        funcToCall()

    }

}


function mouthOpenLoop() {

    mouthOpenObject.dur = [ '0.1', '0.25' ][Math.floor(Math.random() * 2)];
    mouthOpenObject.amount = Math.random() * 0.15;

    initOpenMouth( mouthOpenObject.amount, mouthOpenObject.dur );

    setTimeout( function() {

        initOpenMouth( -mouthOpenObject.amount, mouthOpenObject.dur );

        setTimeout( function() {

            if ( mainCount <= talkObject.endCount ) {

                whenOpenMouthEnds( mouthOpenLoop );

            }

        }, mouthOpenObject.dur * 1200 )

    }, mouthOpenObject.dur * 1200 );

}

function purseLipsLoop() {

    purseLipsObject.dur = [ '0.1', '0.25' ][Math.floor(Math.random() * 2)];
    purseLipsObject.amount = Math.random();

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

        }, purseLipsObject.dur * 1200 )

    }, purseLipsObject.dur * 1200 );

}


//PURSE LIPS
function initPurseLips( to, speed ) {

    assignSinArrayForSpeed( speed, purseLipsObject, sineArrays ) 

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

function initOpenMouth( to, speed ) {

    assignSinArrayForSpeed( speed, mouthOpenObject, sineArrays ) 

    mouthOpenObject.startCount = mainCount;
    mouthOpenObject.rotationMult = to;

    mouthOpenObject.bool = true;

}


function openMouth( main ) {

    let main_start = main - mouthOpenObject[ 'startCount' ];

    let sinAmount = mouthOpenObject[ 'sin' ][ main_start ]
    
    if ( main_start < mouthOpenObject.sinLength ) {

        let rotationMult = mouthOpenObject.rotationMult;

        // jaw rotate x-axis

        tiaObject.faceBones['jaw'].rotation.x += sinAmount * rotationMult * 0.2;
        mouthObject.mouthBones['jaw_inner'].rotation.x += sinAmount * rotationMult * 0.2;


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

        mouthObject.bool = false;

    }

}


/////////// EYELIDS

function initMoveEyelids( upperPos, lowerPos, speed, rel ) {

    // rel is if the movement is relative to the current position. false means it is absolute

    if ( eyelidObject.bool ) {


    } else {
    
        eyelidObject.bool = true;
        assignSinArrayForSpeed( speed, eyelidObject, sineArrays ) 
        eyelidObject.speed = speed;
        eyelidObject.startCount = mainCount;

        if ( rel ) {

            eyelidObject.coords.movementUpper = upperPos;
            eyelidObject.coords.movementLower = lowerPos;
            
            eyelidObject.coords.currentUpper += upperPos;
            eyelidObject.coords.currentLower += lowerPos;

        } else {

            eyelidObject.coords.movementUpper = upperPos - eyelidObject.coords.currentUpper;
            eyelidObject.coords.movementLower = lowerPos - eyelidObject.coords.currentLower;
            
            eyelidObject.coords.currentUpper = upperPos;
            eyelidObject.coords.currentLower = lowerPos;

        }

    }

}

function moveEyelids( main ) {

    let main_start = main - eyelidObject.startCount;
    let sinAmount = eyelidObject.sin[ main_start ]


    if ( main_start < eyelidObject.sinLength ) {

        // upper eyelid
        let upperMultMiddle = sinAmount * 0.45 * eyelidObject.coords.movementUpper;
        let upperMultInnerOuter = sinAmount * 0.35 * eyelidObject.coords.movementUpper;
        tiaObject.faceBones['eyelid_upper_inner.L'].position.y += upperMultInnerOuter;
        tiaObject.faceBones['eyelid_upper_inner.R'].position.y += upperMultInnerOuter;
        tiaObject.faceBones['eyelid_upper_middle.L'].position.y += upperMultMiddle;
        tiaObject.faceBones['eyelid_upper_middle.R'].position.y += upperMultMiddle;
        tiaObject.faceBones['eyelid_upper_outer.L'].position.y += upperMultInnerOuter;
        tiaObject.faceBones['eyelid_upper_outer.R'].position.y += upperMultInnerOuter;

        let lowerMult = sinAmount * 0.2 * eyelidObject.coords.movementLower;
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


//////////////// NOD AND SHAKE VHEAD

function initNod( depth, speed ) {

    // EX: initNod(0.1, '0.5')

    if ( nodObject.bool ) {

        console.log('can move while still moving man!!')

    } else {
    
        nodObject.bool = true;
        
        if ( nodObject.iter === 0 ) {
         
            assignSinArrayForSpeed( speed, nodObject, quickTurnaroundSineArrays ) 
            nodObject.speed = speed;
            nodObject.depth = depth;
            nodObject.amount = nodObject.decay[ 0 ] * depth;
        
        } else {

            nodObject.amount = nodObject.depth * nodObject.decay[ nodObject.iter];

        }

        nodObject.startCount = mainCount;

        initSaccNew( [[0,0,0],[ -nodObject.amount / 3, 0, 0]], speed, true );
        
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
        
        if ( nodObject.iter < 5 ) {

            nodObject.iter += 1;
            initNod( nodObject.depth, nodObject.speed );

        } else {

            nodObject.iter = 0;

        }

    }

}


function initShake( depth, speed ) {

    if ( shakeObject.bool ) {

        console.log('can move while still moving man!!')

    } else {
    
        shakeObject.bool = true;
        
        if ( shakeObject.iter === 0 ) {
         
            assignSinArrayForSpeed( speed, shakeObject, sineArrays ) 
            shakeObject.speed = speed;
            shakeObject.depth = depth;
            shakeObject.amount = shakeObject.decay[ 0 ] * depth;
        
        } else {

            shakeObject.amount = shakeObject.depth * shakeObject.decay[ shakeObject.iter];

        }

        shakeObject.startCount = mainCount;

        initMove( eyeObject, [[0,0,0],[0, -shakeObject.amount / 2, 0]], speed );
        
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
        
        if ( shakeObject.iter < 5 ) {

            shakeObject.iter += 1;
            initShake( shakeObject.depth, shakeObject.speed );

        } else {

            shakeObject.iter = 0;

        }

    }

}

/////////// SACC

function initSaccNew( coords, speed, rel ) {

    //console.log('\ninitSaccNew called by\n\n' + initSaccNew.caller.name )
    
    initMove( eyeObject, coords, speed );
   
    //eyelid relative move amount
    eyelidRelAmount = 2*coords[1][0]
    initMoveEyelids( -eyelidRelAmount, -eyelidRelAmount, speed, rel );

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






