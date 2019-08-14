//// general all-purpose method for main body movements

function movementController( movementTo, saccDur, bodyDur ) {

    //// check if blinking, dont want to move mid blink or eyelids wont function
    if ( blinkObject.bool ) {

        setTimeout( function() {

            movementController( movementTo, saccDur, bodyDur );
            console.log( 'tried to move while blinking so retry in 200ms' );

        }, 200 );

    } else {

        console.log( "\nmovement initiated\n" );
        movementObject.bool = false;
        movementNow = getAbsoluteCoordsOfMovementNow();
        let relativeMovement = createRelativeMovement( movementTo );
        initMovement( relativeMovement, saccDur, bodyDur );

    }

}

// create the relative movement and store the masterMovementState
function createRelativeMovement( moveTo ){
    
    relativeMovement = $.extend(true, {}, movements.blank);
     
    Object.keys( moveTo.AUs ).forEach( function( AU ) {

        Object.keys( moveTo.AUs[AU] ).forEach( function( bone ) {

            relativeMovement.AUs[AU][bone] = [[0,0,0],[0,0,0]];

            for ( var j=0; j < 2; j++ ) {

                for ( var k=0; k < 3; k++ ) {
            
                    let change = moveTo.AUs[AU][bone][ j ][ k ] - movementNow.AUs[AU][bone][ j ][ k ]
                    relativeMovement.AUs[AU][bone][ j ][ k ] = change;

                }

            }

        })

    })


    // relative moveToements is done within the initMove function
    relativeMovement.sacc[1][0] = moveTo.sacc[1][0] - movementNow.sacc[1][0];
    relativeMovement.sacc[1][1] = moveTo.sacc[1][1] - movementNow.sacc[1][1];

    return relativeMovement;

}

// call this with relativeMovement as the object
function initMovement( obj, saccDur, bodyDur ) {

    //console.log('\ninitMovement called by\n\n' + initMovement.caller )
    movementObject = obj

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

        Object.keys( movementObject.AUs.AU2 ).forEach( function( key ) {

            tiaObject.faceBones[ key + '.L'].rotation.x += sinAmount * movementObject.AUs.AU2[ key ][ 1 ][ 0 ];
            tiaObject.faceBones[ key + '.R'].rotation.x += sinAmount * movementObject.AUs.AU2[ key ][ 1 ][ 0 ];
            
            tiaObject.faceBones[ key + '.L'].rotation.y += sinAmount * movementObject.AUs.AU2[ key ][ 1 ][ 1 ];
            tiaObject.faceBones[ key + '.R'].rotation.y -= sinAmount * movementObject.AUs.AU2[ key ][ 1 ][ 1 ];

            tiaObject.faceBones[ key + '.L'].rotation.z += sinAmount * movementObject.AUs.AU2[ key ][ 1 ][ 2 ];
            tiaObject.faceBones[ key + '.R'].rotation.z -= sinAmount * movementObject.AUs.AU2[ key ][ 1 ][ 2 ];
            
        })
            
        Object.keys( movementObject.AUs.AU2b ).forEach( function( key ) {
            
            tiaObject.bodyBones[ key + '.L'].rotation.x += sinAmount * movementObject.AUs.AU2b[ key ][ 1 ][ 0 ];
            tiaObject.bodyBones[ key + '.R'].rotation.x += sinAmount * movementObject.AUs.AU2b[ key ][ 1 ][ 0 ];

            tiaObject.bodyBones[ key + '.L'].rotation.y += sinAmount * movementObject.AUs.AU2b[ key ][ 1 ][ 1 ];
            tiaObject.bodyBones[ key + '.R'].rotation.y -= sinAmount * movementObject.AUs.AU2b[ key ][ 1 ][ 1 ];

            tiaObject.bodyBones[ key + '.L'].rotation.z += sinAmount * movementObject.AUs.AU2b[ key ][ 1 ][ 2 ];
            tiaObject.bodyBones[ key + '.R'].rotation.z -= sinAmount * movementObject.AUs.AU2b[ key ][ 1 ][ 2 ];
            
        })
            
        Object.keys( movementObject.AUs.AU1 ).forEach( function( key ) {

            tiaObject.faceBones[ key ].rotation.x += sinAmount * movementObject.AUs.AU1[ key ][ 1 ][ 0 ];
            tiaObject.faceBones[ key ].rotation.y += sinAmount * movementObject.AUs.AU1[ key ][ 1 ][ 1 ];
            tiaObject.faceBones[ key ].rotation.z += sinAmount * movementObject.AUs.AU1[ key ][ 1 ][ 2 ];
            
        })

        //Mouth Jaw Inner is part of a different object and so needs to be done separately
        Object.keys( movementObject.AUs.AU1b ).forEach( function( key ) {

            tiaObject.bodyBones[ key ].rotation.x += sinAmount * movementObject.AUs.AU1b[ key ][ 1 ][ 0 ];
            tiaObject.bodyBones[ key ].rotation.y += sinAmount * movementObject.AUs.AU1b[ key ][ 1 ][ 1 ];
            tiaObject.bodyBones[ key ].rotation.z += sinAmount * movementObject.AUs.AU1b[ key ][ 1 ][ 2 ];
            
        })

    } else {

        movementObject.bool = false;
        movementNow = getAbsoluteCoordsOfMovementNow();

    }

}


//function createCombinedCalculatedMovement( movementsArray, mult, surp ){

    //calculatedMovement = $.extend(true, {}, movementProt);

    //for ( var singleMove in movementsArray ) {
     
        //// loops through every pos and rot a,y,z of each bone and assigns mix of two movements in proportion to currentMovement. negativeMasterMovement is for returning to neutral
        //Object.keys( movementsArray[singleMove].AUs ).forEach( function( AU ) {

            //Object.keys( movementsArray[singleMove].AUs[AU] ).forEach( function( bone ) {

                //if ( calculatedMovement.AUs[AU][bone] === undefined ) {

                    //calculatedMovement.AUs[AU][bone] = movementsArray[singleMove].AUs[AU][bone];

                //} else {

                    //// dont need pos now
                    ////for ( var j=0; j < 2; j++ ) {

                        //for ( var k=0; k < 3; k++ ) {
                            
                            //calculatedMovement.AUs[AU][bone][ 1 ][ k ] += movementsArray[singleMove].AUs[AU][bone][ 1 ][ k ];
                            
                        //}

                    ////}

                //}

            //})

        //})

    //}

    //createRelativeMovement( calculatedMovement );
//}


function getAbsoluteCoordsOfMovementNow() {

    let absMovement = $.extend(true, {}, movements.blank);

    Object.keys( absMovement.AUs.AU2 ).forEach( function( key ) {

        absMovement.AUs.AU2[ key ][ 1 ][ 0 ] = tiaObject.faceBones[ key + '.L'  ].rotation.x;
        absMovement.AUs.AU2[ key ][ 1 ][ 1 ] = tiaObject.faceBones[ key + '.L'  ].rotation.y;
        absMovement.AUs.AU2[ key ][ 1 ][ 2 ] = tiaObject.faceBones[ key + '.L'  ].rotation.z;

    })
        
    Object.keys( absMovement.AUs.AU2b ).forEach( function( key ) {

        absMovement.AUs.AU2b[ key ][ 1 ][ 0 ] = tiaObject.bodyBones[ key + '.L'  ].rotation.x;
        absMovement.AUs.AU2b[ key ][ 1 ][ 1 ] = tiaObject.bodyBones[ key + '.L' ].rotation.y;
        absMovement.AUs.AU2b[ key ][ 1 ][ 2 ] = tiaObject.bodyBones[ key + '.L'  ].rotation.z;

    })
        
    Object.keys( absMovement.AUs.AU1 ).forEach( function( key ) {
       
        absMovement.AUs.AU1[ key ][ 1 ][ 0 ] = tiaObject.faceBones[ key ].rotation.x;
        absMovement.AUs.AU1[ key ][ 1 ][ 1 ] = tiaObject.faceBones[ key ].rotation.y;
        absMovement.AUs.AU1[ key ][ 1 ][ 2 ] = tiaObject.faceBones[ key ].rotation.z;

    })

    //Mouth Jaw Inner is part of a different object and so needs to be done separately
    Object.keys( absMovement.AUs.AU1b ).forEach( function( key ) {

        absMovement.AUs.AU1b[ key ][ 1 ][ 0 ] = tiaObject.bodyBones[ key ].rotation.x;
        absMovement.AUs.AU1b[ key ][ 1 ][ 1 ] = tiaObject.bodyBones[ key ].rotation.y;
        absMovement.AUs.AU1b[ key ][ 1 ][ 2 ] = tiaObject.bodyBones[ key ].rotation.z;
        
    })

    return absMovement;

}

function newTilt( boneObject ) {

    boneObject.startCount = mainCount;

    if ( boneObject.to ) {

        boneObject.direction *= -1;
        boneObject.to = false;
    

    } else {
        
        let newSinAmount = SINEARRAYFORBREATHESECONDS[ Math.floor( Math.random() *  SINEARRAYFORBREATHESECONDS.length ) ];
        boneObject.sin = sineArrays[ newSinAmount.toString() ];
        boneObject.sinLength = boneObject.sin.length;
        boneObject.direction *= Math.random() < 0.5 ? -1 : 1;
        if ( boneObject === neckRandomTiltObject ) {
         
            boneObject.mult =  2 * Math.random();

        } else {

            boneObject.mult = Math.random();
        
        }

        boneObject.to = true;

    }

}

    













