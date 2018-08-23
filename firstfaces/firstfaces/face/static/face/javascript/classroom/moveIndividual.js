//////////////// MOVE ANYTHING 

function initMove( obj, coords, speed, direction ) {

    if ( obj.bool ) {

        console.log(' initMove cant move: ' + obj.name + '. Still moving previous one!!\n\nCalled by' + initMove.caller.name )
    } else {

        //console.log(' initMove object moving is: ', obj.name);
        assignSinArrayForSpeed( speed, obj, sineArrays ) 
        obj.startCount = mainCount;

        for (var i=0; i<2; i++) {

            for (var j=0; j<3; j++) {

                obj.movementCoords[ i ][ j ] = coords[ i ][ j ] - obj.currentCoords[ i ][ j ];

            }

        }

        if ( direction !== undefined ) {

            obj.dir = direction

        }

        obj.currentCoords = coords;
        obj.bool = true;

    }

}

function moveEyes( main ) {

    let main_start = main - eyeObject[ 'startCount' ];
    let sinAmount = eyeObject.sin[ main_start ];
    
    if ( main_start < eyeObject.sinLength ) {

        let XMult = eyeObject.movementCoords[1][0] * sinAmount;
        let YMult = eyeObject.movementCoords[1][1] * sinAmount;

        tiaObject.eyeBones.eyeL.rotation.x += XMult;
        tiaObject.eyeBones.eyeR.rotation.x += XMult;
        tiaObject.eyeBones.eyeL.rotation.y += YMult;
        tiaObject.eyeBones.eyeR.rotation.y += YMult;

    } else {

        eyeObject.bool = false;

    }

}


//function moveEyebrow( main ) {

    //let main_start = main - eyebrowObject[ 'startCount' ];
    //let sinAmount = eyebrowObject.sin[ main_start ]
    
    //if ( main_start < eyebrowObject.sinLength ) {

        //let innerMultX = sinAmount * 0.05 * eyebrowObject.movementCoords[ 0 ][ 0 ];
        //let middleMultX = sinAmount * 0 * eyebrowObject.movementCoords[ 0 ][ 0 ]; 
        //let outerMultX = sinAmount * 0.05 * eyebrowObject.movementCoords[ 0 ][ 0 ]; 

        //let innerMultY = sinAmount * 0.2 * eyebrowObject.movementCoords[ 0 ][ 1 ];
        //let middleMultY = sinAmount * 0.3 * eyebrowObject.movementCoords[ 0 ][ 1 ]; 
        //let outerMultY = sinAmount * 0.15 * eyebrowObject.movementCoords[ 0 ][ 1 ]; 

        //// POS x
        //tiaObject.faceBones['eyebrow_inner.L'].position.x += innerMultX;
        //tiaObject.faceBones['eyebrow_inner.R'].position.x += innerMultX;
        //tiaObject.faceBones['eyebrow_outer.L'].position.x += outerMultX;
        //tiaObject.faceBones['eyebrow_outer.R'].position.x += outerMultX;

        //// POS y
        //tiaObject.faceBones['eyebrow_inner.L'].position.y += innerMultY;
        //tiaObject.faceBones['eyebrow_inner.R'].position.y += innerMultY;
        //tiaObject.faceBones['eyebrow_middle.L'].position.y += middleMultY;
        //tiaObject.faceBones['eyebrow_middle.R'].position.y += middleMultY;
        //tiaObject.faceBones['eyebrow_outer.L'].position.y += outerMultY;
        //tiaObject.faceBones['eyebrow_outer.R'].position.y += outerMultY;

    //} else {

        //eyebrowObject.bool = false;

    //}

//}


function lean( main ) {

    let main_start = main - leanObject.startCount;
    let sinAmount = leanObject.sin[ main_start ]
    
    if ( main_start < leanObject.sinLength ) {

        let mult = leanObject.movementCoords[1][0] * sinAmount;
        tiaObject.bodyBones.spineUpperInner.rotation.x += mult;
        tiaObject.faceBones.head.rotation.x -= mult;

    } else {

        leanObject.bool = false;

    }

}


//////////////// MOVE ARM TO INDICATE 


function initArmIndicate( arm, to, height, speed ) {

    if ( armIndicateObject.bool ) {

        console.log('can move while still moving man!!')

    } else {

        let from = armIndicateObject.currentState;

        if ( from !== to ) {

            assignSinArrayForSpeed( speed, armIndicateObject, sineArrays ) 

            armIndicateObject.startCount = mainCount;
            var armDir;
            
            if ( arm === "left" ) {
            
                armIndicateObject.upperArm = tiaObject.bodyBones['upperArm.L'];
                armIndicateObject.lowerArm = tiaObject.bodyBones['lowerArm.L'];
                armIndicateObject.hand = tiaObject.bodyBones['hand.L'];
                armDir = 1;

            } else {

                armIndicateObject.upperArm = tiaObject.bodyBones['upperArm.R'];
                armIndicateObject.lowerArm = tiaObject.bodyBones['lowerArm.R'];
                armIndicateObject.hand = tiaObject.bodyBones['hand.R'];
                armDir = -1;

            }

            let mult = to - from;

            armIndicateObject.currentState = to;

            if ( height === "high" ) {
            
                armIndicateObject.upperArmRotY = mult * 0.5 * armDir;
                armIndicateObject.upperArmRotZ = mult * 0.5 * armDir;
                armIndicateObject.upperArmRotX = mult * -0.6;
                
            } else {

                armIndicateObject.upperArmRotY = mult * 0.2 * armDir;
                armIndicateObject.upperArmRotZ = mult * 0.2 * armDir;
                armIndicateObject.upperArmRotX = mult * -0.3;
                
            }

            armIndicateObject.lowerArmRotY = mult * 0.3 * armDir;
            armIndicateObject.lowerArmRotZ = mult * -0.6 * armDir;
            armIndicateObject.handRotZ = mult * 0.9 * armDir;

            armIndicateObject[ 'bool' ] = true;
            
        } else {

            console.log('same amount for armIndicate');
        
        }

    }

}

function armIndicate( main ) {

    let main_start = main - armIndicateObject.startCount;

    let sinArray = armIndicateObject.sin;

    let sinAmount = sinArray[ main_start ]
    
    if ( main_start < armIndicateObject.sinLength ) {

        // rotation outward
        armIndicateObject.upperArm.rotation.x += armIndicateObject.upperArmRotX * sinAmount;
        armIndicateObject.upperArm.rotation.y += armIndicateObject.upperArmRotY * sinAmount;
        armIndicateObject.upperArm.rotation.z += armIndicateObject.upperArmRotZ * sinAmount;
        armIndicateObject.lowerArm.rotation.y += armIndicateObject.lowerArmRotY * sinAmount;
        armIndicateObject.lowerArm.rotation.z += armIndicateObject.lowerArmRotZ * sinAmount;
        armIndicateObject.hand.rotation.z -= armIndicateObject.handRotZ * sinAmount;

    } else {

        armIndicateObject.bool = false;

    }

}

// special one off blink where it is possible to set speed and pause when closed
function initSelectBlink( len, pauseClosed ) {

    if ( normalBlinkObject.bool !== true ) {

        eyelidObject.coords.beforeBlinkUpper = eyelidObject.coords.currentUpper;
        eyelidObject.coords.beforeBlinkLower = eyelidObject.coords.currentLower;
        initMoveEyelids( -1, 1, '0.1', false); 

        let pause = 1000 * ( parseFloat( len ) + pauseClosed );

        setTimeout( function(){ 
            
            initMoveEyelids( eyelidObject.coords.beforeBlinkUpper, eyelidObject.coords.beforeBlinkLower, '0.1', false); 
        }, pause );             

    } else {

        console.log("can't blink while normal blinking is running!")

    }

}
    

