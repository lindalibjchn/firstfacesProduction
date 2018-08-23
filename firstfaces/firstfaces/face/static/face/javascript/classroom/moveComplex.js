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


function initTalk() {

    // create this as creating talk will override the original expression one
    //talkStartPoint = $.extend( true, {}, talkCalculatedExpression );

    synthesisObject.length = synthesisObject.text.length;
    talkObject.endCount = mainCount + synthesisObject.length * 3;
    talkObject.bool = true;
    talkObject.dir = 1;
    talk();

}

function talk() {
   
    // make talkObject.bool false to stop talking
    // if direction is -1 then it needs to return to closed omuth even if false

    if ( talkObject.bool && mainCount < talkObject.endCount ) {

        // first need to initialise the masterExpression with openmouth and pursedlips
        randMult = 0.2 + ( Math.random() / 2 );
        randRatio = (Math.random() / 5);

        // create random duration
        randDuration = [ '0.1', '0.25', '0.5' ][Math.floor(Math.random() * 3)];
        
        let prevCalcExp = $.extend( true, {}, calculatedExpression )

        let calcExp = createCalculatedExpression([expressionsRel.mouthOpen, expressionsRel.purseLips], randRatio, randMult, 0 )[ 0 ];
        expressionController( calcExp );


        // CALCULATE RELATIVE MOVEMENT

        setTimeout( function() {

            expressionController( prevCalcExp, randDuration );

            setTimeout( function() {

                talk();

            }, parseFloat( randDuration ) * 1000 + 200 );

        }, parseFloat( randDuration ) * 1000 + 200 );

    } else {

        talkObject.bool = false;

        //return if not entrance
        if ( talkObject.learning ) {
        
            setTimeout( returnToLaptop, 1000 );

        }

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






