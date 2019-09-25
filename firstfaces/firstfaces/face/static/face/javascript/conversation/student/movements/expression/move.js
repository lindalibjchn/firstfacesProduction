// CONTAINS THE EXPRESSIONS FOR THE EMOTION WHEEL AND THE LOGIC FOR TURNING THE WHEEL INTO THE EXPRESSIONS //

// if eyelids is false, then the absolute coordinates in AUs is used
function expressionController( expressionTo, duration, expressCb=function(){} ) {

    console.log('in expression controller');
    //// check if blinking, dont want to move mid blink or eyelids wont function
    if ( blinkObject.bool ) {

        //// try aagain in 200ms after blink finished
        setTimeout( function() {

            expressionController( expressionTo, duration, expressCb=expressCb );
            console.log( 'tried to express while blinking so retry in 200ms' );

        }, 200 );

    } else {

        expressionObject.bool = false;//if other expression delayed, just stop it before calculating absolute position
        //console.log( "expression initiated\n" );

        expressionObject.now = getAbsoluteCoordsOfExpressionNow();
        expressionObject.movement = createRelativeExpression( expressionTo );

        expressionObject.callback = expressCb;

        initExpression( expressionObject.movement, duration );

    }

}

// create the relative expression and store the masterExpressionState
function createRelativeExpression( expTo ){

    let relativeExpression = $.extend( true, {}, expTo );
     
    Object.keys( relativeExpression.AUs ).forEach( function( AU ) {

        Object.keys( relativeExpression.AUs[AU] ).forEach( function( bone ) {

            for ( var j=0; j < 2; j++ ) {

                for ( var k=0; k < 3; k++ ) {
                    
                    relativeExpression.AUs[AU][bone][ j ][ k ] -= expressionObject.now.AUs[AU][bone][ j ][ k ];
                    
                }

            }

        })

    })

    relativeExpression.eyelids -= expressionObject.now.eyelids;

    return relativeExpression;

}

//// general all-purpose method for all expressions
function initExpression( exp, secs ) {

    //// want the sin and sinLength to be in the expressionObject
    assignSinArrayForSpeed( secs, expressionObject, sineArrays );
    expressionObject.startCount = mainCount;
    expressionObject.bool = true;

    initMoveEyelids( exp.eyelids, -exp.eyelids, secs );

}

function expression( main ) {

    let main_start = main - expressionObject[ 'startCount' ];
    let sinAmount = expressionObject.sin[ main_start ]
    
    if ( main_start < expressionObject.sinLength ) {

        if ( !synthesisObject.talking ) {

            Object.keys( expressionObject.movement.AUs.AU2 ).forEach( function( key ) {

                // pos x

                tiaObject.faceBones[ key + '.L'].position.x += sinAmount * expressionObject.movement.AUs.AU2[ key ][ 0 ][ 0 ];
                tiaObject.faceBones[ key + '.R'].position.x -= sinAmount * expressionObject.movement.AUs.AU2[ key ][ 0 ][ 0 ];

                // pos y
                
                tiaObject.faceBones[ key + '.L'].position.y += sinAmount * expressionObject.movement.AUs.AU2[ key ][ 0 ][ 1 ];
                tiaObject.faceBones[ key + '.R'].position.y += sinAmount * expressionObject.movement.AUs.AU2[ key ][ 0 ][ 1 ];

                // pos z
                
                tiaObject.faceBones[ key + '.L'].position.z += sinAmount * expressionObject.movement.AUs.AU2[ key ][ 0 ][ 2 ];
                tiaObject.faceBones[ key + '.R'].position.z += sinAmount * expressionObject.movement.AUs.AU2[ key ][ 0 ][ 2 ];


                // rot x 
                
                tiaObject.faceBones[ key + '.L'].rotation.x += sinAmount * expressionObject.movement.AUs.AU2[ key ][ 1 ][ 0 ];
                tiaObject.faceBones[ key + '.R'].rotation.x += sinAmount * expressionObject.movement.AUs.AU2[ key ][ 1 ][ 0 ];

                // rot y 
                
                tiaObject.faceBones[ key + '.L'].rotation.y += sinAmount * expressionObject.movement.AUs.AU2[ key ][ 1 ][ 1 ];
                tiaObject.faceBones[ key + '.R'].rotation.y -= sinAmount * expressionObject.movement.AUs.AU2[ key ][ 1 ][ 1 ];

                // rot z

                tiaObject.faceBones[ key + '.L'].rotation.z += sinAmount * expressionObject.movement.AUs.AU2[ key ][ 1 ][ 2 ];
                tiaObject.faceBones[ key + '.R'].rotation.z -= sinAmount * expressionObject.movement.AUs.AU2[ key ][ 1 ][ 2 ];
                
            })

        }

        Object.keys( expressionObject.movement.AUs.AU2t ).forEach( function( key ) {

            // pos x

            tiaObject.faceBones[ key + '.L'].position.x += sinAmount * expressionObject.movement.AUs.AU2t[ key ][ 0 ][ 0 ];
            tiaObject.faceBones[ key + '.R'].position.x -= sinAmount * expressionObject.movement.AUs.AU2t[ key ][ 0 ][ 0 ];

            // pos y
            
            tiaObject.faceBones[ key + '.L'].position.y += sinAmount * expressionObject.movement.AUs.AU2t[ key ][ 0 ][ 1 ];
            tiaObject.faceBones[ key + '.R'].position.y += sinAmount * expressionObject.movement.AUs.AU2t[ key ][ 0 ][ 1 ];

            // pos z
            
            tiaObject.faceBones[ key + '.L'].position.z += sinAmount * expressionObject.movement.AUs.AU2t[ key ][ 0 ][ 2 ];
            tiaObject.faceBones[ key + '.R'].position.z += sinAmount * expressionObject.movement.AUs.AU2t[ key ][ 0 ][ 2 ];


            // rot x 
            
            tiaObject.faceBones[ key + '.L'].rotation.x += sinAmount * expressionObject.movement.AUs.AU2t[ key ][ 1 ][ 0 ];
            tiaObject.faceBones[ key + '.R'].rotation.x += sinAmount * expressionObject.movement.AUs.AU2t[ key ][ 1 ][ 0 ];

            // rot y 
            
            tiaObject.faceBones[ key + '.L'].rotation.y += sinAmount * expressionObject.movement.AUs.AU2t[ key ][ 1 ][ 1 ];
            tiaObject.faceBones[ key + '.R'].rotation.y -= sinAmount * expressionObject.movement.AUs.AU2t[ key ][ 1 ][ 1 ];

            // rot z

            tiaObject.faceBones[ key + '.L'].rotation.z += sinAmount * expressionObject.movement.AUs.AU2t[ key ][ 1 ][ 2 ];
            tiaObject.faceBones[ key + '.R'].rotation.z -= sinAmount * expressionObject.movement.AUs.AU2t[ key ][ 1 ][ 2 ];
            
        })

        if ( expressionObject.movement.eyelidsTrue === false ) {

            Object.keys( expressionObject.movement.AUs.eyelids ).forEach( function( key ) {

                // pos y
                
                tiaObject.faceBones[ key + '.L'].position.y += sinAmount * expressionObject.movement.AUs.eyelids[ key ][ 0 ][ 1 ];
                tiaObject.faceBones[ key + '.R'].position.y += sinAmount * expressionObject.movement.AUs.eyelids[ key ][ 0 ][ 1 ];

            })
            
        }

        Object.keys( expressionObject.movement.AUs.AU1 ).forEach( function( key ) {

            tiaObject.faceBones[ key ].position.x += sinAmount * expressionObject.movement.AUs.AU1[ key ][ 0 ][ 0 ];
            tiaObject.faceBones[ key ].position.y += sinAmount * expressionObject.movement.AUs.AU1[ key ][ 0 ][ 1 ];
            tiaObject.faceBones[ key ].position.z += sinAmount * expressionObject.movement.AUs.AU1[ key ][ 0 ][ 2 ];

            tiaObject.faceBones[ key ].rotation.x += sinAmount * expressionObject.movement.AUs.AU1[ key ][ 1 ][ 0 ];
            tiaObject.faceBones[ key ].rotation.y += sinAmount * expressionObject.movement.AUs.AU1[ key ][ 1 ][ 1 ];
            tiaObject.faceBones[ key ].rotation.z += sinAmount * expressionObject.movement.AUs.AU1[ key ][ 1 ][ 2 ];
            
        })

        //Mouth Jaw Inner is part of a different object and so needs to be done separately
        Object.keys( expressionObject.movement.AUs.AU1m ).forEach( function( key ) {

            tiaObject.mouthBones[ key ].position.x += sinAmount * expressionObject.movement.AUs.AU1m[ key ][ 0 ][ 0 ];
            tiaObject.mouthBones[ key ].position.y += sinAmount * expressionObject.movement.AUs.AU1m[ key ][ 0 ][ 1 ];
            tiaObject.mouthBones[ key ].position.z += sinAmount * expressionObject.movement.AUs.AU1m[ key ][ 0 ][ 2 ];

            tiaObject.mouthBones[ key ].rotation.x += sinAmount * expressionObject.movement.AUs.AU1m[ key ][ 1 ][ 0 ];
            tiaObject.mouthBones[ key ].rotation.y += sinAmount * expressionObject.movement.AUs.AU1m[ key ][ 1 ][ 1 ];
            tiaObject.mouthBones[ key ].rotation.z += sinAmount * expressionObject.movement.AUs.AU1m[ key ][ 1 ][ 2 ];
            
        })

    } else {

        expressionObject.bool = false;
        //expressionObject.now = getAbsoluteCoordsOfExpressionNow();
        expressionObject.callback();
        //console.log( "\nexpression movement complete\n" );

    }

}

