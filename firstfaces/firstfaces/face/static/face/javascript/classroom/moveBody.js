//// general all-purpose method for main body movements

function movementController( movementTo, saccDur, bodyDur ) {

    console.log(
            "\nmovement initiated\n"
    );
    movementNow = getAbsoluteCoordsOfMovementNow();
    let relativeMovement = createRelativeMovement( movementTo );
    initMovement( relativeMovement, saccDur, bodyDur );

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

                    //masterMovementState.AUs[AU][bone][ j ][ k ] += change;
                    
                }

            }

            //if ( masterMovementState.AUs[AU][bone] === [[0,0,0],[0,0,0]] ) {

                //delete masterMovementState.AUs[AU][bone];

            //}

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
        
        initSaccNew( obj.sacc, saccDur );

    }

}

function movement( main ) {

    let main_start = main - movementObject[ 'startCount' ];
    let sinAmount = movementObject.sin[ main_start ]
    
    if ( main_start < movementObject.sinLength ) {

        Object.keys( movementObject.AUs.AU2 ).forEach( function( key ) {

            // don't need pos now for bones just rotating
            //// pos x
           
            //tiaObject.faceBones[ key + '.L'].position.x += sinAmount * movementObject.AUs.AU2[ key ][ 0 ][ 0 ];
            //tiaObject.faceBones[ key + '.R'].position.x -= sinAmount * movementObject.AUs.AU2[ key ][ 0 ][ 0 ];

            //// pos y
            
            //tiaObject.faceBones[ key + '.L'].position.y += sinAmount * movementObject.AUs.AU2[ key ][ 0 ][ 1 ];
            //tiaObject.faceBones[ key + '.R'].position.y += sinAmount * movementObject.AUs.AU2[ key ][ 0 ][ 1 ];

            //// pos z
            
            //tiaObject.faceBones[ key + '.L'].position.z += sinAmount * movementObject.AUs.AU2[ key ][ 0 ][ 2 ];
            //tiaObject.faceBones[ key + '.R'].position.z += sinAmount * movementObject.AUs.AU2[ key ][ 0 ][ 2 ];


            // rot x 
            
            tiaObject.faceBones[ key + '.L'].rotation.x += sinAmount * movementObject.AUs.AU2[ key ][ 1 ][ 0 ];
            tiaObject.faceBones[ key + '.R'].rotation.x += sinAmount * movementObject.AUs.AU2[ key ][ 1 ][ 0 ];

            // rot y 
            
            tiaObject.faceBones[ key + '.L'].rotation.y += sinAmount * movementObject.AUs.AU2[ key ][ 1 ][ 1 ];
            tiaObject.faceBones[ key + '.R'].rotation.y -= sinAmount * movementObject.AUs.AU2[ key ][ 1 ][ 1 ];

            // rot z

            tiaObject.faceBones[ key + '.L'].rotation.z += sinAmount * movementObject.AUs.AU2[ key ][ 1 ][ 2 ];
            tiaObject.faceBones[ key + '.R'].rotation.z -= sinAmount * movementObject.AUs.AU2[ key ][ 1 ][ 2 ];
            
        })
            
        Object.keys( movementObject.AUs.AU2b ).forEach( function( key ) {


            //// pos x
           
            //tiaObject.bodyBones[ key + '.L'].position.x += sinAmount * movementObject.AUs.AU2b[ key ][ 0 ][ 0 ];
            //tiaObject.bodyBones[ key + '.R'].position.x -= sinAmount * movementObject.AUs.AU2b[ key ][ 0 ][ 0 ];

            //// pos y
            
            //tiaObject.bodyBones[ key + '.L'].position.y += sinAmount * movementObject.AUs.AU2b[ key ][ 0 ][ 1 ];
            //tiaObject.bodyBones[ key + '.R'].position.y += sinAmount * movementObject.AUs.AU2b[ key ][ 0 ][ 1 ];

            //// pos z
            
            //tiaObject.bodyBones[ key + '.L'].position.z += sinAmount * movementObject.AUs.AU2b[ key ][ 0 ][ 2 ];
            //tiaObject.bodyBones[ key + '.R'].position.z += sinAmount * movementObject.AUs.AU2b[ key ][ 0 ][ 2 ];


            // rot x 
            
            tiaObject.bodyBones[ key + '.L'].rotation.x += sinAmount * movementObject.AUs.AU2b[ key ][ 1 ][ 0 ];
            tiaObject.bodyBones[ key + '.R'].rotation.x += sinAmount * movementObject.AUs.AU2b[ key ][ 1 ][ 0 ];

            // rot y 
            
            tiaObject.bodyBones[ key + '.L'].rotation.y += sinAmount * movementObject.AUs.AU2b[ key ][ 1 ][ 1 ];
            tiaObject.bodyBones[ key + '.R'].rotation.y -= sinAmount * movementObject.AUs.AU2b[ key ][ 1 ][ 1 ];

            // rot z

            tiaObject.bodyBones[ key + '.L'].rotation.z += sinAmount * movementObject.AUs.AU2b[ key ][ 1 ][ 2 ];
            tiaObject.bodyBones[ key + '.R'].rotation.z -= sinAmount * movementObject.AUs.AU2b[ key ][ 1 ][ 2 ];
            
        })
            
        Object.keys( movementObject.AUs.AU1 ).forEach( function( key ) {

            //// pos x
            
            //tiaObject.faceBones[ key ].position.x += sinAmount * movementObject.AUs.AU1[ key ][ 0 ][ 0 ];
            
            //// pos y
            
            //tiaObject.faceBones[ key ].position.y += sinAmount * movementObject.AUs.AU1[ key ][ 0 ][ 1 ];

            //// pos z
            
            //tiaObject.faceBones[ key ].position.z += sinAmount * movementObject.AUs.AU1[ key ][ 0 ][ 2 ];


            // rot x 
            
            tiaObject.faceBones[ key ].rotation.x += sinAmount * movementObject.AUs.AU1[ key ][ 1 ][ 0 ];

            // rot y 
            
            tiaObject.faceBones[ key ].rotation.y += sinAmount * movementObject.AUs.AU1[ key ][ 1 ][ 1 ];

            // rot z

            tiaObject.faceBones[ key ].rotation.z += sinAmount * movementObject.AUs.AU1[ key ][ 1 ][ 2 ];
            
        })

        //Mouth Jaw Inner is part of a different object and so needs to be done separately
        Object.keys( movementObject.AUs.AU1b ).forEach( function( key ) {

            //// pos x
            
            //tiaObject.bodyBones[ key ].position.x += sinAmount * movementObject.AUs.AU1b[ key ][ 0 ][ 0 ];

            //// pos y
            
            //tiaObject.bodyBones[ key ].position.y += sinAmount * movementObject.AUs.AU1b[ key ][ 0 ][ 1 ];

            //// pos z
            
            //tiaObject.bodyBones[ key ].position.z += sinAmount * movementObject.AUs.AU1b[ key ][ 0 ][ 2 ];


            // rot x 
            
            tiaObject.bodyBones[ key ].rotation.x += sinAmount * movementObject.AUs.AU1b[ key ][ 1 ][ 0 ];

            // rot y 
            
            tiaObject.bodyBones[ key ].rotation.y += sinAmount * movementObject.AUs.AU1b[ key ][ 1 ][ 1 ];

            // rot z

            tiaObject.bodyBones[ key ].rotation.z += sinAmount * movementObject.AUs.AU1b[ key ][ 1 ][ 2 ];
            
        })

    } else {

        movementObject.bool = false;
        movementNow = getAbsoluteCoordsOfMovementNow();

    }

}


function createCombinedCalculatedMovement( movementsArray, mult, surp ){

    calculatedMovement = $.extend(true, {}, movementProt);

    for ( var singleMove in movementsArray ) {
     
        // loops through every pos and rot a,y,z of each bone and assigns mix of two movements in proportion to currentMovement. negativeMasterMovement is for returning to neutral
        Object.keys( movementsArray[singleMove].AUs ).forEach( function( AU ) {

            Object.keys( movementsArray[singleMove].AUs[AU] ).forEach( function( bone ) {

                if ( calculatedMovement.AUs[AU][bone] === undefined ) {

                    calculatedMovement.AUs[AU][bone] = movementsArray[singleMove].AUs[AU][bone];

                } else {

                    // dont need pos now
                    //for ( var j=0; j < 2; j++ ) {

                        for ( var k=0; k < 3; k++ ) {
                            
                            calculatedMovement.AUs[AU][bone][ 1 ][ k ] += movementsArray[singleMove].AUs[AU][bone][ 1 ][ k ];
                            
                        }

                    //}

                }

            })

        })

    }

    createRelativeMovement( calculatedMovement );
}


function getAbsoluteCoordsOfMovementNow() {

    let absMovement = $.extend(true, {}, movements.blank);

    Object.keys( absMovement.AUs.AU2 ).forEach( function( key ) {

        // rot x
       
        absMovement.AUs.AU2[ key ][ 1 ][ 0 ] = tiaObject.faceBones[ key + '.L'  ].rotation.x;

        // rot y
        
        absMovement.AUs.AU2[ key ][ 1 ][ 1 ] = tiaObject.faceBones[ key + '.L'  ].rotation.y;

        // rot z
        
        absMovement.AUs.AU2[ key ][ 1 ][ 2 ] = tiaObject.faceBones[ key + '.L'  ].rotation.z;

    })
        
    Object.keys( absMovement.AUs.AU2b ).forEach( function( key ) {

        // rot x
       
        absMovement.AUs.AU2b[ key ][ 1 ][ 0 ] = tiaObject.bodyBones[ key + '.L'  ].rotation.x;

        // rot y
        
        absMovement.AUs.AU2b[ key ][ 1 ][ 1 ] = tiaObject.bodyBones[ key + '.L' ].rotation.y;

        // rot z
        
        absMovement.AUs.AU2b[ key ][ 1 ][ 2 ] = tiaObject.bodyBones[ key + '.L'  ].rotation.z;

    })
        
    Object.keys( absMovement.AUs.AU1 ).forEach( function( key ) {

        // rot x
       
        absMovement.AUs.AU1[ key ][ 1 ][ 0 ] = tiaObject.faceBones[ key ].rotation.x;

        // rot y
        
        absMovement.AUs.AU1[ key ][ 1 ][ 1 ] = tiaObject.faceBones[ key ].rotation.y;

        // rot z
        
        absMovement.AUs.AU1[ key ][ 1 ][ 2 ] = tiaObject.faceBones[ key ].rotation.z;

    })

    //Mouth Jaw Inner is part of a different object and so needs to be done separately
    Object.keys( absMovement.AUs.AU1b ).forEach( function( key ) {

        // rot x
       
        absMovement.AUs.AU1b[ key ][ 1 ][ 0 ] = tiaObject.bodyBones[ key ].rotation.x;

        // rot y
        
        absMovement.AUs.AU1b[ key ][ 1 ][ 1 ] = tiaObject.bodyBones[ key ].rotation.y;

        // rot z
        
        absMovement.AUs.AU1b[ key ][ 1 ][ 2 ] = tiaObject.bodyBones[ key ].rotation.z;
        
    })

    //absMovement.sacc = [[0,0,0],[tiaObject.eyeBones['eyeL'].rotation.x, tiaObject.eyeBones['eyeL'].rotation.y, 0 ]]

    return absMovement;

}

//function resetMovement() {

    //absCurMovement = getAbsoluteCoordsOfMovementNow();
    //masterMovementState = $.extend( true, {}, absCurMovement );
    //createRelativeMovement( studentMovement );
    //initMovement( relativeMovement, '0.5', '1.5' );
    //masterMovementState = $.extend( true, {}, studentMovement );

//}


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

    













