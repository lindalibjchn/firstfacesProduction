// CONTAINS THE EXPRESSIONS FOR THE EMOTION WHEEL AND THE LOGIC FOR TURNING THE WHEEL INTO THE EXPRESSIONS //

// create the relative expression and store the masterExpressionState
function createRelativeExpression( expFrom, expTo ){

    if ( expressionObject.bool ) {

        console.log('cant create expression while another one is running')
        console.log('\ncreateExpression called by\n\n' + createRelativeExpression.caller )

    } else {

        //console.log('\ncreateExpression successfully called by\n\n' + createRelativeExpression.caller )
        relativeExpression = $.extend( true, {}, expTo );
         
        Object.keys( relativeExpression.AUs ).forEach( function( AU ) {

            Object.keys( relativeExpression.AUs[AU] ).forEach( function( bone ) {

                for ( var j=0; j < 2; j++ ) {

                    for ( var k=0; k < 3; k++ ) {
                        
                        relativeExpression.AUs[AU][bone][ j ][ k ] -= expFrom.AUs[AU][bone][ j ][ k ];
                        
                    }

                }

            })

        })

        let eyelidChange = expTo.eyelids; - expFrom.eyelids;
        relativeExpression.eyelids = eyelidChange;
        eyelidObject.currentCoords[ 1 ][ 0 ] += eyelidChange;

    }

}

//// general all-purpose method for all expressions
function initExpression( obj, speed ) {

    expressionObject = obj

    assignSinArrayForSpeed( speed, expressionObject, sineArrays ) 
    expressionObject.startCount = mainCount;
    expressionObject.bool = true;

    initMoveEyelids( expressionObject.eyelids, -expressionObject.eyelids, speed, false );

}

function expression( main ) {

    let main_start = main - expressionObject[ 'startCount' ];
    let sinAmount = expressionObject.sin[ main_start ]
    
    if ( main_start < expressionObject.sinLength ) {

        Object.keys( expressionObject.AUs.AU2 ).forEach( function( key ) {

            // pos x
           
            tiaObject.faceBones[ key + '.L'].position.x += sinAmount * expressionObject.AUs.AU2[ key ][ 0 ][ 0 ];
            tiaObject.faceBones[ key + '.R'].position.x -= sinAmount * expressionObject.AUs.AU2[ key ][ 0 ][ 0 ];

            // pos y
            
            tiaObject.faceBones[ key + '.L'].position.y += sinAmount * expressionObject.AUs.AU2[ key ][ 0 ][ 1 ];
            tiaObject.faceBones[ key + '.R'].position.y += sinAmount * expressionObject.AUs.AU2[ key ][ 0 ][ 1 ];

            // pos z
            
            tiaObject.faceBones[ key + '.L'].position.z += sinAmount * expressionObject.AUs.AU2[ key ][ 0 ][ 2 ];
            tiaObject.faceBones[ key + '.R'].position.z += sinAmount * expressionObject.AUs.AU2[ key ][ 0 ][ 2 ];


            // rot x 
            
            tiaObject.faceBones[ key + '.L'].rotation.x += sinAmount * expressionObject.AUs.AU2[ key ][ 1 ][ 0 ];
            tiaObject.faceBones[ key + '.R'].rotation.x += sinAmount * expressionObject.AUs.AU2[ key ][ 1 ][ 0 ];

            // rot y 
            
            tiaObject.faceBones[ key + '.L'].rotation.y += sinAmount * expressionObject.AUs.AU2[ key ][ 1 ][ 1 ];
            tiaObject.faceBones[ key + '.R'].rotation.y -= sinAmount * expressionObject.AUs.AU2[ key ][ 1 ][ 1 ];

            // rot z

            tiaObject.faceBones[ key + '.L'].rotation.z += sinAmount * expressionObject.AUs.AU2[ key ][ 1 ][ 2 ];
            tiaObject.faceBones[ key + '.R'].rotation.z -= sinAmount * expressionObject.AUs.AU2[ key ][ 1 ][ 2 ];
            
        })
            
        Object.keys( expressionObject.AUs.AU1 ).forEach( function( key ) {

            // pos x
            
            tiaObject.faceBones[ key ].position.x += sinAmount * expressionObject.AUs.AU1[ key ][ 0 ][ 0 ];
            
            // pos y
            
            tiaObject.faceBones[ key ].position.y += sinAmount * expressionObject.AUs.AU1[ key ][ 0 ][ 1 ];

            // pos z
            
            tiaObject.faceBones[ key ].position.z += sinAmount * expressionObject.AUs.AU1[ key ][ 0 ][ 2 ];


            // rot x 
            
            tiaObject.faceBones[ key ].rotation.x += sinAmount * expressionObject.AUs.AU1[ key ][ 1 ][ 0 ];

            // rot y 
            
            tiaObject.faceBones[ key ].rotation.y += sinAmount * expressionObject.AUs.AU1[ key ][ 1 ][ 1 ];

            // rot z

            tiaObject.faceBones[ key ].rotation.z += sinAmount * expressionObject.AUs.AU1[ key ][ 1 ][ 2 ];
            
        })

        //Mouth Jaw Inner is part of a different object and so needs to be done separately
        Object.keys( expressionObject.AUs.AU1m ).forEach( function( key ) {

            // pos x
            
            mouthObject.mouthBones[ key ].position.x += sinAmount * expressionObject.AUs.AU1m[ key ][ 0 ][ 0 ];

            // pos y
            
            mouthObject.mouthBones[ key ].position.y += sinAmount * expressionObject.AUs.AU1m[ key ][ 0 ][ 1 ];

            // pos z
            
            mouthObject.mouthBones[ key ].position.z += sinAmount * expressionObject.AUs.AU1m[ key ][ 0 ][ 2 ];


            // rot x 
            
            mouthObject.mouthBones[ key ].rotation.x += sinAmount * expressionObject.AUs.AU1m[ key ][ 1 ][ 0 ];

            // rot y 
            
            mouthObject.mouthBones[ key ].rotation.y += sinAmount * expressionObject.AUs.AU1m[ key ][ 1 ][ 1 ];

            // rot z

            mouthObject.mouthBones[ key ].rotation.z += sinAmount * expressionObject.AUs.AU1m[ key ][ 1 ][ 2 ];
            
        })

    } else {

        expressionObject.bool = false;

    }

}


//// LOGIC FOR TURNING WHEEL COORDINATES INTO EXPRESSIONS

function getTwoExpressions( eCo ) {

    var angle; 

    if ( eCo[0] >= 0 && eCo[1] >= 0 ) {

        angle = ( 180 / Math.PI ) * ( Math.atan( eCo[ 1 ] / eCo[ 0 ] ));

    } else if ( eCo[0] <= 0 && eCo[1] > 0 ) {

        angle = 180 + ( 180 / Math.PI ) * ( Math.atan( eCo[ 1 ] / eCo[ 0 ] ));

    } else if ( eCo[0] <= 0 && eCo[1] <= 0 ) {
    
        angle = 180 + ( 180 / Math.PI ) * ( Math.atan( eCo[ 1 ] / eCo[ 0 ] ));

    } else if ( eCo[0] >= 0 && eCo[1] < 0 ) {

        angle = 360 + ( 180 / Math.PI ) * ( Math.atan( eCo[ 1 ] / eCo[ 0 ] ));

    }


    // calculate amount away from far edge going anti-clockwise through wheel to calc ratio of each expression amount
    var amountAwayFromFarEdge;
    var sector;
    if ( angle <= 36 || angle > 324 ) {

        sector = 0;

        if ( angle <= 36 ) {

            amountAwayFromFarEdge = ( 36 - angle ) / 72;

        } else {

            amountAwayFromFarEdge = ( 36 + 360 - angle ) / 72;

        }
        

    } else if ( angle <= 108 && angle > 36 ) {

        sector = 1;
        amountAwayFromFarEdge = ( 108 - angle ) / 72;

    } else if ( angle <= 180 && angle > 108 ) {

        sector = 2;
        amountAwayFromFarEdge = ( 180 - angle ) / 72;

    } else if ( angle <= 252 && angle > 180 ) {

        sector = 3;
        amountAwayFromFarEdge = ( 252 - angle ) / 72;

    } else if ( angle <= 324 && angle > 252 ) {

        sector = 4;
        amountAwayFromFarEdge = ( 324 - angle ) / 72;

    }

    return [ sector, amountAwayFromFarEdge ];

}

function createSingleExpression( exp, mult ) {

    if ( exp.changeVoice ) {

        synthesisObject.pitch = exp.name.pitch * mult;
        synthesisObject.speaking_rate = 0.85 + exp.name.speaking_rate * mult;

    }

    calculatedExpression = $.extend(true, {}, exp);
    talkCalculatedExpression = $.extend(true, {}, exp);

    Object.keys( exp.AUs ).forEach( function( AU ) {

        Object.keys( exp.AUs[ AU ] ).forEach( function( bone ) {

            let expThisBone = exp.AUs[ AU ][ bone ]

            for ( var j=0; j < 2; j++ ) {

                for ( var k=0; k < 3; k++ ) {

                    let movementAmount = expThisBone[ j ][ k ] * mult;
                    let talkAmount = 0.5 * expThisBone[ j ][ k ] * mult

                    calculatedExpression.AUs[ AU ][ bone ][ j ][ k ] = movementAmount;
                    talkCalculatedExpression.AUs[ AU ][ bone ][ j ][ k ] = talkAmount;

                }

            }

        })

    })

    let eyelidMovementAmount = exp.eyelids * mult;
    calculatedExpression.eyelids = eyelidMovementAmount;
    talkCalculatedExpression.eyelids = 0.5 * eyelidMovementAmount;

}

//var sectors = [ 
    //[ contentExpression, happyExpression ], 
    //[ happyExpression, disgustExpression ],
    //[ disgustExpression, fearExpression ],
    //[ fearExpression, sadExpression ],
    //[ sadExpression, contentExpression ]
//]

function createCombinedExpression( twoExpressions, ratio, mult, surp ){

    calculatedExpression = $.extend(true, {}, blankExpression);
    talkCalculatedExpression = $.extend(true, {}, blankExpression);

    let zeroMovement = [[0,0,0],[0,0,0]];

    let expression01Amount = Math.cos( Math.PI * ( 1 - ratio ) / 2 ) * mult;
    let expression02Amount = Math.cos( Math.PI * ratio / 2 ) * mult;

    let expression01 = twoExpressions[ 0 ];
    let expression02 = twoExpressions[ 1 ];

    // loops through every pos and rot a,y,z of each bone and assigns mix of two expressions in proportion to calculatedExpression. negativeCalculatedExpression is for returning to neutral
    Object.keys( blankExpression.AUs ).forEach( function( AU ) {

        Object.keys( blankExpression.AUs[AU] ).forEach( function( bone ) {

            var expression01ThisBone;
            if ( expression01.AUs[AU][bone] === undefined ) {

                expression01ThisBone = zeroMovement;

            } else {

                expression01ThisBone = expression01.AUs[ AU ][ bone ];

            }

            var expression02ThisBone;
            if ( expression02.AUs[ AU ][ bone ] === undefined ) {

                expression02ThisBone = zeroMovement;

            } else {

                expression02ThisBone = expression02.AUs[ AU ][ bone ];

            }

            //maybe no surprise at all
            var surpriseExpressionThisBone;
            if ( surp === 0 ) { 

                surpriseExpressionThisBone = zeroMovement;

            } else {

                if ( surpriseExpression.AUs[ AU ][ bone ] === undefined ) {

                    surpriseExpressionThisBone = zeroMovement;

                } else {

                    surpriseExpressionThisBone = surpriseExpression.AUs[ AU ][ bone ];

                }

            }

            if ( expression01ThisBone === zeroMovement && expression02ThisBone === zeroMovement && surpriseExpressionThisBone === zeroMovement ) { 

            } else {

                calculatedExpression.AUs[ AU ][ bone ] = [[],[]];
                talkCalculatedExpression.AUs[ AU ][ bone ] = [[],[]];

                for ( var j=0; j < 2; j++ ) {

                    for ( var k=0; k < 3; k++ ) {

                        let movementAmount = expression01ThisBone[ j ][ k ] * expression01Amount + expression02ThisBone[ j ][ k ] * expression02Amount + surpriseExpressionThisBone[ j ][ k ] * surp;
                        let talkAmount = 0.5 * expression01ThisBone[ j ][ k ] * expression01Amount + 0.5 * expression02ThisBone[ j ][ k ] * expression02Amount;

                        calculatedExpression.AUs[ AU ][ bone ][ j ][ k ] = movementAmount;
                        talkCalculatedExpression.AUs[ AU ][ bone ][ j ][ k ] = talkAmount;
                        //only for talk
                        negativeCalculatedExpression.AUs[ AU ][ bone ][ j ][ k ] = -movementAmount;

                    }

                }

            }

        })

    })

    let eyelidMovementAmount = expression01.eyelids * expression01Amount + expression02.eyelids * expression02Amount + surpriseExpression.eyelids * surp
    calculatedExpression.eyelids = eyelidMovementAmount;
    talkCalculatedExpression.eyelids = 0.5 * expression01.eyelids * expression01Amount + 0.5 * expression02.eyelids * expression02Amount;

}

function changeExpression() {

    synthesisObject.pitch = 0;
    synthesisObject.speaking_rate = 0.85;

    let emotionCoords = classVariableDict.last_sent['emotion']
    let surprise = classVariableDict.last_sent['surprise']

    // check if emotion is in centre of circle - if so there is no change
    let dia = Math.sqrt( emotionCoords[0]**2 + emotionCoords[1]**2 )

    if ( dia >= 0.2 ) {

        let sectorNRatio = getTwoExpressions( emotionCoords );
        let exp01 = sectors[ sectorNRatio[ 0 ] ][ 0 ];
        let exp02 = sectors[ sectorNRatio[ 0 ] ][ 1 ];
        let pitch01 = exp01.pitch;
        let pitch02 = exp02.pitch;
        let speech_rate01 = exp01.speaking_rate;
        let speech_rate02 = exp02.speaking_rate;

        console.log('dia');

        let ratio = sectorNRatio[ 1 ];

        synthesisObject.pitch += dia * ( ( 1 - ratio ) * pitch02 + ratio * pitch01 ) + surprise;
        synthesisObject.speaking_rate += dia * ( ( 1 - ratio ) * speech_rate02 + ratio * speech_rate01 ) + surprise / 10;

        //arguments are [happyExpression, contentExpression], ratio of 1st to 2nd, diameter/amount, surprise amount
        createCombinedExpression( sectors[ sectorNRatio[ 0 ] ], ratio,  dia, surprise );

    } else {

        createSingleExpression( blankExpression, 1 )

    }

}


function getAbsoluteCoordsOfExpressionNow() {

    let absExpression = $.extend(true, {}, expressionsRel[ 'blank' ]);

    Object.keys( absExpression.AUs.AU2 ).forEach( function( key ) {

        // pos x
       
        absExpression.AUs.AU2[ key ][ 0 ][ 0 ] = tiaObject.faceBones[ key + '.L'].position.x;

        // pos y
        
        absExpression.AUs.AU2[ key ][ 0 ][ 1 ] = tiaObject.faceBones[ key + '.L'].position.y;

        // pos z
        
        absExpression.AUs.AU2[ key ][ 0 ][ 2 ] = tiaObject.faceBones[ key + '.L'].position.z;


        // rot x
       
        absExpression.AUs.AU2[ key ][ 1 ][ 0 ] = tiaObject.faceBones[ key + '.L'].rotation.x;

        // rot y
        
        absExpression.AUs.AU2[ key ][ 1 ][ 1 ] = tiaObject.faceBones[ key + '.L'].rotation.y;

        // rot z
        
        absExpression.AUs.AU2[ key ][ 1 ][ 2 ] = tiaObject.faceBones[ key + '.L'].rotation.z;

    })
        
    Object.keys( absExpression.AUs.AU1 ).forEach( function( key ) {

        // pos x
       
        absExpression.AUs.AU1[ key ][ 0 ][ 0 ] = tiaObject.faceBones[ key ].position.x;

        // pos y
        
        absExpression.AUs.AU1[ key ][ 0 ][ 1 ] = tiaObject.faceBones[ key ].position.y;

        // pos z
        
        absExpression.AUs.AU1[ key ][ 0 ][ 2 ] = tiaObject.faceBones[ key ].position.z;


        // rot x
       
        absExpression.AUs.AU1[ key ][ 1 ][ 0 ] = tiaObject.faceBones[ key ].rotation.x;

        // rot y
        
        absExpression.AUs.AU1[ key ][ 1 ][ 1 ] = tiaObject.faceBones[ key ].rotation.y;

        // rot z
        
        absExpression.AUs.AU1[ key ][ 1 ][ 2 ] = tiaObject.faceBones[ key ].rotation.z;

    })

    //Mouth Jaw Inner is part of a different object and so needs to be done separately
    Object.keys( absExpression.AUs.AU1m ).forEach( function( key ) {

        // pos x
       
        absExpression.AUs.AU1m[ key ][ 0 ][ 0 ] = mouthObject.mouthBones[ key ].position.x;

        // pos y
        
        absExpression.AUs.AU1m[ key ][ 0 ][ 1 ] = mouthObject.mouthBones[ key ].position.y;

        // pos z
        
        absExpression.AUs.AU1m[ key ][ 0 ][ 2 ] = mouthObject.mouthBones[ key ].position.z;


        // rot x
       
        absExpression.AUs.AU1m[ key ][ 1 ][ 0 ] = mouthObject.mouthBones[ key ].rotation.x;

        // rot y
        
        absExpression.AUs.AU1m[ key ][ 1 ][ 1 ] = mouthObject.mouthBones[ key ].rotation.y;

        // rot z
        
        absExpression.AUs.AU1m[ key ][ 1 ][ 2 ] = mouthObject.mouthBones[ key ].rotation.z;
        
    })


    return absExpression;

}

function getAbsoluteCoordsOfMainExpressions() {

    Object.keys( expressionsRel ).forEach( function( exp ) {

        indExpRel = expressionsRel[ exp ];
        let expression = $.extend( true, {}, indExpRel );

        Object.keys( indExpRel.AUs.AU2 ).forEach( function( key ) {

            // pos x
           
            expression.AUs.AU2[ key ][ 0 ][ 0 ] += expressionBase.AUs.AU2[ key ][ 0 ][ 0 ];

            // pos y
            
            expression.AUs.AU2[ key ][ 0 ][ 1 ] += expressionBase.AUs.AU2[ key ][ 0 ][ 1 ];

            // pos z
            
            expression.AUs.AU2[ key ][ 0 ][ 2 ] += expressionBase.AUs.AU2[ key ][ 0 ][ 2 ];


            // rot x
           
            expression.AUs.AU2[ key ][ 1 ][ 0 ] += expressionBase.AUs.AU2[ key ][ 1 ][ 0 ];

            // rot y
            
            expression.AUs.AU2[ key ][ 1 ][ 1 ] += expressionBase.AUs.AU2[ key ][ 1 ][ 1 ];

            // rot z
            
            expression.AUs.AU2[ key ][ 1 ][ 2 ] += expressionBase.AUs.AU2[ key ][ 1 ][ 2 ];

        })
            
        Object.keys( expressionBase.AUs.AU1 ).forEach( function( key ) {

            // pos x
           
            expression.AUs.AU1[ key ][ 0 ][ 0 ] += expressionBase.AUs.AU1[ key ][ 0 ][ 0 ];

            // pos y
            
            expression.AUs.AU1[ key ][ 0 ][ 1 ] += expressionBase.AUs.AU1[ key ][ 0 ][ 1 ];

            // pos z
            
            expression.AUs.AU1[ key ][ 0 ][ 2 ] += expressionBase.AUs.AU1[ key ][ 0 ][ 2 ];


            // rot x
           
            expression.AUs.AU1[ key ][ 1 ][ 0 ] += expressionBase.AUs.AU1[ key ][ 1 ][ 0 ];

            // rot y
            
            expression.AUs.AU1[ key ][ 1 ][ 1 ] += expressionBase.AUs.AU1[ key ][ 1 ][ 1 ];

            // rot z
            
            expression.AUs.AU1[ key ][ 1 ][ 2 ] += expressionBase.AUs.AU1[ key ][ 1 ][ 2 ];

        })

        //Mouth Jaw Inner is part of a different object and so needs to be done separately
        Object.keys( expressionBase.AUs.AU1m ).forEach( function( key ) {

            // pos x
           
            expression.AUs.AU1m[ key ][ 0 ][ 0 ] += expressionBase.AUs.AU1m[ key ][ 0 ][ 0 ];

            // pos y
            
            expression.AUs.AU1m[ key ][ 0 ][ 1 ] += expressionBase.AUs.AU1m[ key ][ 0 ][ 1 ];

            // pos z
            
            expression.AUs.AU1m[ key ][ 0 ][ 2 ] += expressionBase.AUs.AU1m[ key ][ 0 ][ 2 ];


            // rot x
           
            expression.AUs.AU1m[ key ][ 1 ][ 0 ] += expressionBase.AUs.AU1m[ key ][ 1 ][ 0 ];

            // rot y
            
            expression.AUs.AU1m[ key ][ 1 ][ 1 ] += expressionBase.AUs.AU1m[ key ][ 1 ][ 1 ];

            // rot z
            
            expression.AUs.AU1m[ key ][ 1 ][ 2 ] += expressionBase.AUs.AU1m[ key ][ 1 ][ 2 ];
            
        });

        expressionsAbs[ indExpRel.name ] = expression;

    });

}

function resetExpression() {

    absCurExpression = getAbsoluteCoordsOfExpressionNow();
    masterExpressionState = $.extend( true, {}, absCurExpression );
    createRelativeExpression( absNeutralExpression );
    initExpression( relativeExpression, '1' );
    masterExpressionState = $.extend( true, {}, neutralExpression );

}


