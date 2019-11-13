function tiaLookAtLaptopAndType() {

    movementController( movementObject.abs.laptop, 0.4, 1, function() {
    
        conversationVariables.tiaTyping = true;
        backNReadALine();
        initType( 'R' );
        initType( 'L' );
    
    })

}

function prepareToStopTyping() {

    if ( conversationVariables.tiaTyping ) {
        
        stopTyping();

    } else {

        setTimeout( prepareToStopTyping, 500 );

    }

}


function stopTyping() {
    
    conversationVariables.tiaTyping = false;

    if ( conversationVariables.sentence_being_recorded_audio === null ) {

        tapKeyFull();

    } else { 
        
        if ( conversationVariables.sentence_being_recorded_audio.alternatives[ 0 ].transcript === "" ) {

            setTimeout( function() {

                movementController(movementObject.abs.blank, 1, 1, function() {
                    
                    dealWithBlankTranscription();
                    
                } );

            }, 500 );

        } else {

            tapKeyFull();

        }

    }

}

function initType( side ) {

    if ( typeObject[side].dir === 1 ) {

        let randomDuration = 0.1 + Math.random();
        let randomAmount = 0.05 * Math.random();
        assignSinArrayForSpeed( randomDuration, typeObject[side], sineArrays ) 
        typeObject[side].duration = randomDuration;
        typeObject[side].movementAmount = randomAmount;
    
    }

    typeObject[side].startCount = mainCount;
    typeObject[side].dir *= -1;
    typeObject[side].bool = true;

}

function typeArm( main, side ) {

    let main_start = main - typeObject[side].startCount;
    let sinAmount = typeObject[side].sin[ main_start ];
    
    if ( main_start < typeObject[side].sinLength ) {

        let mult = typeObject[side].movementAmount * sinAmount * typeObject[side].dir;

        tiaObject.bodyBones["upperArm." + side].rotation.y += mult;
        tiaObject.bodyBones["upperArm." + side].rotation.z += mult;

    } else {

        typeObject[side].bool = false;

        if ( conversationVariables.tiaTyping ) {

            initType( side );

        }

    }

}

function backNReadALine() {

    var randomReadingMovement = $.extend( true, {}, movementObject.abs.laptop );

    let plusOrMinusX = Math.random() - 0.5; 
    let plusOrMinusY = Math.random() - 0.5; 
    let randomHeadRotX = movementObject.abs.laptop.AUs.AU1.head[1][0] + plusOrMinusX * 0.03;
    let randomHeadRotY = plusOrMinusY * 0.15;
    randomReadingMovement.AUs.AU1.head = [movementObject.abs.laptop.AUs.AU1.head[0],[randomHeadRotX, randomHeadRotY, 0]]

    let randomEyeRotX = movementObject.abs.laptop.sacc[1][0] + plusOrMinusX * 0.075;
    let randomEyeRotY = plusOrMinusY * 0.3;
    randomReadingMovement.sacc = [[0,0,0],[randomEyeRotX, randomEyeRotY, 0]]
    
    let randSaccDur = [ 0.25, 0.5 ][Math.floor(Math.random() * 2)]
    let randHeadDur = [ 0.75, 1.25, 1.75 ][Math.floor(Math.random() * 3)]
    
    movementController( randomReadingMovement, randSaccDur, randHeadDur, function() { 

        if ( conversationVariables.tiaTyping ) {

            backNReadALine();

        }

    });

}

