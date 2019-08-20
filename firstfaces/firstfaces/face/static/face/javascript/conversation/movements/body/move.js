//// general all-purpose method for main body movementObject.abs

function movementController( movementTo, saccDur, bodyDur ) {

    //// check if blinking, dont want to move mid blink or eyelids wont function
    if ( blinkObject.bool ) {

        setTimeout( function() {

            movementController( movementTo, saccDur, bodyDur );
            //console.log( 'tried to move while blinking so retry in 200ms' );

        }, 200 );

    } else {

        movementObject.bool = false;
        //console.log( "\nmovement initiated\n" );

        movementObject.now = getAbsoluteCoordsOfMovementNow();
        movementObject.movement = createRelativeMovement( movementTo );
        initMovement( movementObject.movement, saccDur, bodyDur );

    }

}

// create the relative movement and store the masterMovementState
function createRelativeMovement( moveTo ){
    
    let relativeMovement = $.extend(true, {}, moveTo );
     
    Object.keys( moveTo.AUs ).forEach( function( AU ) {

        Object.keys( moveTo.AUs[AU] ).forEach( function( bone ) {

            //relativeMovement.AUs[AU][bone] = [[0,0,0],[0,0,0]];

            for ( var j=0; j < 2; j++ ) {

                for ( var k=0; k < 3; k++ ) {
            
                    relativeMovement.AUs[AU][bone][ j ][ k ] -= movementObject.now.AUs[AU][bone][ j ][ k ];

                }

            }

        })

    })

    // relative moveToements is done within the initMove function
    relativeMovement.sacc[1][0] -= movementObject.now.sacc[1][0];
    relativeMovement.sacc[1][1] -= movementObject.now.sacc[1][1];

    return relativeMovement;

}

// call this with relativeMovement as the object
function initMovement( obj, saccDur, bodyDur ) {

    //console.log('\ninitMovement called by\n\n' + initMovement.caller )
    //movementObject = obj

    //console.log('object moving is: ', obj.name);
    
    assignSinArrayForSpeed( bodyDur, movementObject, sineArrays ) 
    movementObject.startCount = mainCount;
    movementObject.bool = true;

    if ( obj.sacc !== undefined ) {
        
        initSacc( obj.sacc, saccDur );

    }

}

function movement( main ) {

    let main_start = main - movementObject[ 'startCount' ];
    let sinAmount = movementObject.sin[ main_start ]
    
    if ( main_start < movementObject.sinLength ) {

        Object.keys( movementObject.movement.AUs.AU2 ).forEach( function( key ) {

            tiaObject.faceBones[ key + '.L'].position.x += sinAmount * movementObject.movement.AUs.AU2[ key ][ 0 ][ 0 ];
            tiaObject.faceBones[ key + '.R'].position.x -= sinAmount * movementObject.movement.AUs.AU2[ key ][ 0 ][ 0 ];
            
            tiaObject.faceBones[ key + '.L'].position.y += sinAmount * movementObject.movement.AUs.AU2[ key ][ 0 ][ 1 ];
            tiaObject.faceBones[ key + '.R'].position.y += sinAmount * movementObject.movement.AUs.AU2[ key ][ 0 ][ 1 ];

            tiaObject.faceBones[ key + '.L'].position.z += sinAmount * movementObject.movement.AUs.AU2[ key ][ 0 ][ 2 ];
            tiaObject.faceBones[ key + '.R'].position.z += sinAmount * movementObject.movement.AUs.AU2[ key ][ 0 ][ 2 ];
            
            tiaObject.faceBones[ key + '.L'].rotation.x += sinAmount * movementObject.movement.AUs.AU2[ key ][ 1 ][ 0 ];
            tiaObject.faceBones[ key + '.R'].rotation.x += sinAmount * movementObject.movement.AUs.AU2[ key ][ 1 ][ 0 ];
            
            tiaObject.faceBones[ key + '.L'].rotation.y += sinAmount * movementObject.movement.AUs.AU2[ key ][ 1 ][ 1 ];
            tiaObject.faceBones[ key + '.R'].rotation.y -= sinAmount * movementObject.movement.AUs.AU2[ key ][ 1 ][ 1 ];

            tiaObject.faceBones[ key + '.L'].rotation.z += sinAmount * movementObject.movement.AUs.AU2[ key ][ 1 ][ 2 ];
            tiaObject.faceBones[ key + '.R'].rotation.z -= sinAmount * movementObject.movement.AUs.AU2[ key ][ 1 ][ 2 ];
            
        })
            
        Object.keys( movementObject.movement.AUs.AU2b ).forEach( function( key ) {
            
            tiaObject.bodyBones[ key ].position.x += sinAmount * movementObject.movement.AUs.AU2b[ key ][ 0 ][ 0 ];

            tiaObject.bodyBones[ key ].position.y += sinAmount * movementObject.movement.AUs.AU2b[ key ][ 0 ][ 1 ];

            tiaObject.bodyBones[ key ].position.z += sinAmount * movementObject.movement.AUs.AU2b[ key ][ 0 ][ 2 ];
            
            tiaObject.bodyBones[ key ].rotation.x += sinAmount * movementObject.movement.AUs.AU2b[ key ][ 1 ][ 0 ];

            tiaObject.bodyBones[ key ].rotation.y += sinAmount * movementObject.movement.AUs.AU2b[ key ][ 1 ][ 1 ];

            tiaObject.bodyBones[ key ].rotation.z += sinAmount * movementObject.movement.AUs.AU2b[ key ][ 1 ][ 2 ];
            
        })
            
        Object.keys( movementObject.movement.AUs.AU1 ).forEach( function( key ) {

            tiaObject.faceBones[ key ].position.x += sinAmount * movementObject.movement.AUs.AU1[ key ][ 0 ][ 0 ];
            tiaObject.faceBones[ key ].position.y += sinAmount * movementObject.movement.AUs.AU1[ key ][ 0 ][ 1 ];
            tiaObject.faceBones[ key ].position.z += sinAmount * movementObject.movement.AUs.AU1[ key ][ 0 ][ 2 ];
            
            tiaObject.faceBones[ key ].rotation.x += sinAmount * movementObject.movement.AUs.AU1[ key ][ 1 ][ 0 ];
            tiaObject.faceBones[ key ].rotation.y += sinAmount * movementObject.movement.AUs.AU1[ key ][ 1 ][ 1 ];
            tiaObject.faceBones[ key ].rotation.z += sinAmount * movementObject.movement.AUs.AU1[ key ][ 1 ][ 2 ];
            
        })

        //Mouth Jaw Inner is part of a different object and so needs to be done separately
        Object.keys( movementObject.movement.AUs.AU1b ).forEach( function( key ) {

            tiaObject.bodyBones[ key ].position.x += sinAmount * movementObject.movement.AUs.AU1b[ key ][ 0 ][ 0 ];
            tiaObject.bodyBones[ key ].position.y += sinAmount * movementObject.movement.AUs.AU1b[ key ][ 0 ][ 1 ];
            tiaObject.bodyBones[ key ].position.z += sinAmount * movementObject.movement.AUs.AU1b[ key ][ 0 ][ 2 ];
            
            tiaObject.bodyBones[ key ].rotation.x += sinAmount * movementObject.movement.AUs.AU1b[ key ][ 1 ][ 0 ];
            tiaObject.bodyBones[ key ].rotation.y += sinAmount * movementObject.movement.AUs.AU1b[ key ][ 1 ][ 1 ];
            tiaObject.bodyBones[ key ].rotation.z += sinAmount * movementObject.movement.AUs.AU1b[ key ][ 1 ][ 2 ];
            
        })

    } else {

        movementObject.bool = false;
        movementNow = getAbsoluteCoordsOfMovementNow();

    }

}


//function createCombinedCalculatedMovement( movementObject.relArray, mult, surp ){

    //calculatedMovement = $.extend(true, {}, movementProt);

    //for ( var singleMove in movementObject.relArray ) {
     
        //// loops through every pos and rot a,y,z of each bone and assigns mix of two movementObject.abs in proportion to currentMovement. negativeMasterMovement is for returning to neutral
        //Object.keys( movementObject.relArray[singleMove].AUs ).forEach( function( AU ) {

            //Object.keys( movementObject.relArray[singleMove].AUs[AU] ).forEach( function( bone ) {

                //if ( calculatedMovement.AUs[AU][bone] === undefined ) {

                    //calculatedMovement.AUs[AU][bone] = movementObject.relArray[singleMove].AUs[AU][bone];

                //} else {

                    //// dont need pos now
                    ////for ( var j=0; j < 2; j++ ) {

                        //for ( var k=0; k < 3; k++ ) {
                            
                            //calculatedMovement.AUs[AU][bone][ 1 ][ k ] += movementObject.relArray[singleMove].AUs[AU][bone][ 1 ][ k ];
                            
                        //}

                    ////}

                //}

            //})

        //})

    //}

    //createRelativeMovement( calculatedMovement );
//}













