// CONTAINS THE EXPRESSIONS FOR THE EMOTION WHEEL AND THE LOGIC FOR TURNING THE WHEEL INTO THE EXPRESSIONS //

// if eyelids is false, then the absolute coordinates in AUs is used
function expressionController( expressionTo, duration, callback ) {

    //// check if blinking, dont want to move mid blink or eyelids wont function
    if ( blinkObject.bool ) {

        //// try aagain in 200ms after blink finished
        setTimeout( function() {

            expressionController( expressionTo, duration );
            console.log( 'tried to express while blinking so retry in 200ms' );

        }, 200 );

    } else {

        expressionObject.bool = false;//if other expression delayed, just stop it before calculating absolute position
        console.log( "expression initiated\n" );

        expressionObject.now = getAbsoluteCoordsOfExpressionNow();
        expressionObject.movement = createRelativeExpression( expressionTo );
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

    let eyelidChange = expTo.eyelids - expressionObject.now.eyelids;
    relativeExpression.eyelids = eyelidChange;

    return relativeExpression;

}

//// general all-purpose method for all expressions
function initExpression( expressionMovement, secs ) {

    //// want the sin and sinLength to be in the expressionObject
    assignSinArrayForSpeed( secs, expressionObject, sineArrays );
    expressionObject.startCount = mainCount;
    expressionObject.bool = true;

    initMoveEyelids( expressionMovement.eyelids, -expressionMovement.eyelids, secs );

}

function expression( main ) {

    let main_start = main - expressionObject[ 'startCount' ];
    let sinAmount = expressionObject.sin[ main_start ]
    
    if ( main_start < expressionObject.sinLength ) {

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
        expressionObject.now = getAbsoluteCoordsOfExpressionNow();
        console.log( "\nexpression movement complete\n" );

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

        synthesisObject.pitch = exp.pitch * mult;
        synthesisObject.speaking_rate = 0.85 + exp.speaking_rate * mult;

    }

    let calcExp = $.extend(true, {}, exp);
    let talkCalcExp = $.extend(true, {}, exp);

    Object.keys( exp.AUs ).forEach( function( AU ) {

        Object.keys( exp.AUs[ AU ] ).forEach( function( bone ) {

            let expThisBone = exp.AUs[ AU ][ bone ]

            for ( var j=0; j < 2; j++ ) {

                for ( var k=0; k < 3; k++ ) {

                    let movementAmount = expThisBone[ j ][ k ] * mult;
                    let talkAmount = 0.5 * expThisBone[ j ][ k ] * mult

                    calcExp.AUs[ AU ][ bone ][ j ][ k ] = movementAmount;
                    talkCalcExp.AUs[ AU ][ bone ][ j ][ k ] = talkAmount;

                }

            }

        })

    })

    let eyelidMovementAmount = exp.eyelids * mult;
    calcExp.eyelids = eyelidMovementAmount;
    talkCalcExp.eyelids = 0.5 * eyelidMovementAmount;

    return [ calcExp, talkCalcExp ];

}

var sectors = [ 
    [ expressionsRel.content, expressionsRel.happy ], 
    [ expressionsRel.happy, expressionsRel.disgust ],
    [ expressionsRel.disgust, expressionsRel.fear ],
    [ expressionsRel.fear, expressionsRel.sad ],
    [ expressionsRel.sad, expressionsRel.content ]
]

function createCalculatedExpression( twoExpressions, ratio, mult, surp ){

    calcExp = $.extend(true, {}, expressionsRel.blank );
    calcTalkExp = $.extend(true, {}, expressionsRel.blank );

    let zeroMovement = [[0,0,0],[0,0,0]];

    let expression01Amount = Math.cos( Math.PI * ( 1 - ratio ) / 2 ) * mult;
    let expression02Amount = Math.cos( Math.PI * ratio / 2 ) * mult;

    let expression01 = twoExpressions[ 0 ];
    let expression02 = twoExpressions[ 1 ];

    // loops through every pos and rot a,y,z of each bone and assigns mix of two expressions in proportion to calcExp. negativeCalculatedExpression is for returning to neutral
    Object.keys( calcExp.AUs ).forEach( function( AU ) {

        Object.keys( calcExp.AUs[AU] ).forEach( function( bone ) {

            var expression01ThisBone;
            expression01ThisBone = expression01.AUs[ AU ][ bone ];

            var expression02ThisBone;
            expression02ThisBone = expression02.AUs[ AU ][ bone ];

            //maybe no surprise at all
            var surpriseExpressionThisBone = expressionsRel.surprise.AUs[ AU ][ bone ];

            if ( expression01ThisBone === zeroMovement && expression02ThisBone === zeroMovement && surpriseExpressionThisBone === zeroMovement ) { 

            } else {

                calcExp.AUs[ AU ][ bone ] = [[],[]];
                calcTalkExp.AUs[ AU ][ bone ] = [[],[]];

                for ( var j=0; j < 2; j++ ) {

                    for ( var k=0; k < 3; k++ ) {

                        let movementAmount = expression01ThisBone[ j ][ k ] * expression01Amount + expression02ThisBone[ j ][ k ] * expression02Amount + surpriseExpressionThisBone[ j ][ k ] * surp;
                        let talkAmount = 0.5 * expression01ThisBone[ j ][ k ] * expression01Amount + 0.5 * expression02ThisBone[ j ][ k ] * expression02Amount + surpriseExpressionThisBone[ j ][ k ] * 0.05; // small surprise to open mouth a wee bit

                        calcExp.AUs[ AU ][ bone ][ j ][ k ] = movementAmount;
                        calcTalkExp.AUs[ AU ][ bone ][ j ][ k ] = talkAmount;
                        //only for talk
                        //negativeCalculatedExpression.AUs[ AU ][ bone ][ j ][ k ] = -movementAmount;

                    }

                }

            }

        })

    })

    let eyelidMovementAmount = expression01.eyelids * expression01Amount + expression02.eyelids * expression02Amount + expressionObject.abs.surprise.eyelids * surp
    calcExp.eyelids = eyelidMovementAmount;
    calcTalkExp.eyelids = 0.5 * expression01.eyelids * expression01Amount + 0.5 * expression02.eyelids * expression02Amount;

    return [ calcExp, calcTalkExp ];

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
        let calculatedExpressions = createCalculatedExpression( sectors[ sectorNRatio[ 0 ] ], ratio,  dia, surprise );
        console.log('calculatedExpressions:', calculatedExpressions);
        //need to get absolute vals
        calculatedExpression = getAbsoluteCoordsOfExpressionTo( calculatedExpressions[ 0 ] )
        calculatedTalkExpression = getAbsoluteCoordsOfExpressionTo( calculatedExpressions[ 1 ] )

    } else {

        let singleCalculatedExpressions = createSingleExpression( expressionsRel.blank, 1 )
        calculatedExpression = getAbsoluteCoordsOfExpressionTo( singleCalculatedExpressions[ 0 ] )
        calculatedTalkExpression = getAbsoluteCoordsOfExpressionTo( singleCalculatedExpressions[ 1 ] )

    }

}


function getAbsoluteCoordsOfExpressionNow() {

    let absExpression = $.extend(true, {}, expressionsRel.blank);

    Object.keys( absExpression.AUs.AU2 ).forEach( function( key ) {

        absExpression.AUs.AU2[ key ][ 0 ][ 0 ] = tiaObject.faceBones[ key + '.L'].position.x;
        absExpression.AUs.AU2[ key ][ 0 ][ 1 ] = tiaObject.faceBones[ key + '.L'].position.y;
        absExpression.AUs.AU2[ key ][ 0 ][ 2 ] = tiaObject.faceBones[ key + '.L'].position.z;

        absExpression.AUs.AU2[ key ][ 1 ][ 0 ] = tiaObject.faceBones[ key + '.L'].rotation.x;
        absExpression.AUs.AU2[ key ][ 1 ][ 1 ] = tiaObject.faceBones[ key + '.L'].rotation.y;
        absExpression.AUs.AU2[ key ][ 1 ][ 2 ] = tiaObject.faceBones[ key + '.L'].rotation.z;

    })
        
    //Object.keys( absExpression.AUs.eyelids ).forEach( function( key ) {

        //absExpression.AUs.eyelids[ key ][ 0 ][ 1 ] = tiaObject.faceBones[ key + '.L'].position.y;

    //})

    Object.keys( absExpression.AUs.AU1 ).forEach( function( key ) {

        absExpression.AUs.AU1[ key ][ 0 ][ 0 ] = tiaObject.faceBones[ key ].position.x;
        absExpression.AUs.AU1[ key ][ 0 ][ 1 ] = tiaObject.faceBones[ key ].position.y;
        absExpression.AUs.AU1[ key ][ 0 ][ 2 ] = tiaObject.faceBones[ key ].position.z;


        absExpression.AUs.AU1[ key ][ 1 ][ 0 ] = tiaObject.faceBones[ key ].rotation.x;
        absExpression.AUs.AU1[ key ][ 1 ][ 1 ] = tiaObject.faceBones[ key ].rotation.y;
        absExpression.AUs.AU1[ key ][ 1 ][ 2 ] = tiaObject.faceBones[ key ].rotation.z;

    })

    //Mouth Jaw Inner is part of a different object and so needs to be done separately
    Object.keys( absExpression.AUs.AU1m ).forEach( function( key ) {

        absExpression.AUs.AU1m[ key ][ 0 ][ 0 ] = tiaObject.mouthBones[ key ].position.x;
        absExpression.AUs.AU1m[ key ][ 0 ][ 1 ] = tiaObject.mouthBones[ key ].position.y;
        absExpression.AUs.AU1m[ key ][ 0 ][ 2 ] = tiaObject.mouthBones[ key ].position.z;


        absExpression.AUs.AU1m[ key ][ 1 ][ 0 ] = tiaObject.mouthBones[ key ].rotation.x;
        absExpression.AUs.AU1m[ key ][ 1 ][ 1 ] = tiaObject.mouthBones[ key ].rotation.y;
        absExpression.AUs.AU1m[ key ][ 1 ][ 2 ] = tiaObject.mouthBones[ key ].rotation.z;
        
    })

    return absExpression;

}

function getAbsoluteCoordsOfExpressionTo( exp ) {

    let expression = $.extend( true, {}, exp );

    Object.keys( expression.AUs.AU2 ).forEach( function( key ) {

        expression.AUs.AU2[ key ][ 0 ][ 0 ] += expressionObject.base.AUs.AU2[ key ][ 0 ][ 0 ];
        expression.AUs.AU2[ key ][ 0 ][ 1 ] += expressionObject.base.AUs.AU2[ key ][ 0 ][ 1 ];
        expression.AUs.AU2[ key ][ 0 ][ 2 ] += expressionObject.base.AUs.AU2[ key ][ 0 ][ 2 ];

        expression.AUs.AU2[ key ][ 1 ][ 0 ] += expressionObject.base.AUs.AU2[ key ][ 1 ][ 0 ];
        expression.AUs.AU2[ key ][ 1 ][ 1 ] += expressionObject.base.AUs.AU2[ key ][ 1 ][ 1 ];
        expression.AUs.AU2[ key ][ 1 ][ 2 ] += expressionObject.base.AUs.AU2[ key ][ 1 ][ 2 ];

    })
        
    //Object.keys( expression.AUs.eyelids ).forEach( function( key ) {

        //expression.AUs.eyelids[ key ][ 0 ][ 1 ] += expressionObject.base.AUs.eyelids[ key ][ 0 ][ 1 ];

    //})

    Object.keys( expression.AUs.AU1 ).forEach( function( key ) {

        expression.AUs.AU1[ key ][ 0 ][ 0 ] += expressionObject.base.AUs.AU1[ key ][ 0 ][ 0 ];
        expression.AUs.AU1[ key ][ 0 ][ 1 ] += expressionObject.base.AUs.AU1[ key ][ 0 ][ 1 ];
        expression.AUs.AU1[ key ][ 0 ][ 2 ] += expressionObject.base.AUs.AU1[ key ][ 0 ][ 2 ];

        expression.AUs.AU1[ key ][ 1 ][ 0 ] += expressionObject.base.AUs.AU1[ key ][ 1 ][ 0 ];
        expression.AUs.AU1[ key ][ 1 ][ 1 ] += expressionObject.base.AUs.AU1[ key ][ 1 ][ 1 ];
        expression.AUs.AU1[ key ][ 1 ][ 2 ] += expressionObject.base.AUs.AU1[ key ][ 1 ][ 2 ];

    })

    //Mouth Jaw Inner is part of a different object and so needs to be done separately
    Object.keys( expression.AUs.AU1m ).forEach( function( key ) {

        expression.AUs.AU1m[ key ][ 0 ][ 0 ] += expressionObject.base.AUs.AU1m[ key ][ 0 ][ 0 ];
        expression.AUs.AU1m[ key ][ 0 ][ 1 ] += expressionObject.base.AUs.AU1m[ key ][ 0 ][ 1 ];
        expression.AUs.AU1m[ key ][ 0 ][ 2 ] += expressionObject.base.AUs.AU1m[ key ][ 0 ][ 2 ];

        expression.AUs.AU1m[ key ][ 1 ][ 0 ] += expressionObject.base.AUs.AU1m[ key ][ 1 ][ 0 ];
        expression.AUs.AU1m[ key ][ 1 ][ 1 ] += expressionObject.base.AUs.AU1m[ key ][ 1 ][ 1 ];
        expression.AUs.AU1m[ key ][ 1 ][ 2 ] += expressionObject.base.AUs.AU1m[ key ][ 1 ][ 2 ];
        
    });

    return expression;

}

function getAbsoluteCoordsOfMainExpressions() {

    Object.keys( expressionsRel ).forEach( function( exp ) {

        indExpRel = expressionsRel[ exp ];
        let expression = $.extend( true, {}, indExpRel );

        Object.keys( indExpRel.AUs.AU2 ).forEach( function( key ) {

            expression.AUs.AU2[ key ][ 0 ][ 0 ] += expressionObject.base.AUs.AU2[ key ][ 0 ][ 0 ];
            expression.AUs.AU2[ key ][ 0 ][ 1 ] += expressionObject.base.AUs.AU2[ key ][ 0 ][ 1 ];
            expression.AUs.AU2[ key ][ 0 ][ 2 ] += expressionObject.base.AUs.AU2[ key ][ 0 ][ 2 ];

            expression.AUs.AU2[ key ][ 1 ][ 0 ] += expressionObject.base.AUs.AU2[ key ][ 1 ][ 0 ];
            expression.AUs.AU2[ key ][ 1 ][ 1 ] += expressionObject.base.AUs.AU2[ key ][ 1 ][ 1 ];
            expression.AUs.AU2[ key ][ 1 ][ 2 ] += expressionObject.base.AUs.AU2[ key ][ 1 ][ 2 ];

        })
            
        //Object.keys( expression.AUs.eyelids ).forEach( function( key ) {

            //expression.AUs.eyelids[ key ][ 0 ][ 1 ] += expressionObject.base.AUs.eyelids[ key ][ 0 ][ 1 ];

        //})

        Object.keys( expressionObject.base.AUs.AU1 ).forEach( function( key ) {

            expression.AUs.AU1[ key ][ 0 ][ 0 ] += expressionObject.base.AUs.AU1[ key ][ 0 ][ 0 ];
            expression.AUs.AU1[ key ][ 0 ][ 1 ] += expressionObject.base.AUs.AU1[ key ][ 0 ][ 1 ];
            expression.AUs.AU1[ key ][ 0 ][ 2 ] += expressionObject.base.AUs.AU1[ key ][ 0 ][ 2 ];


            expression.AUs.AU1[ key ][ 1 ][ 0 ] += expressionObject.base.AUs.AU1[ key ][ 1 ][ 0 ];
            expression.AUs.AU1[ key ][ 1 ][ 1 ] += expressionObject.base.AUs.AU1[ key ][ 1 ][ 1 ];
            expression.AUs.AU1[ key ][ 1 ][ 2 ] += expressionObject.base.AUs.AU1[ key ][ 1 ][ 2 ];

        })

        //Mouth Jaw Inner is part of a different object and so needs to be done separately
        Object.keys( expressionObject.base.AUs.AU1m ).forEach( function( key ) {

            expression.AUs.AU1m[ key ][ 0 ][ 0 ] += expressionObject.base.AUs.AU1m[ key ][ 0 ][ 0 ];
            expression.AUs.AU1m[ key ][ 0 ][ 1 ] += expressionObject.base.AUs.AU1m[ key ][ 0 ][ 1 ];
            expression.AUs.AU1m[ key ][ 0 ][ 2 ] += expressionObject.base.AUs.AU1m[ key ][ 0 ][ 2 ];


            expression.AUs.AU1m[ key ][ 1 ][ 0 ] += expressionObject.base.AUs.AU1m[ key ][ 1 ][ 0 ];
            expression.AUs.AU1m[ key ][ 1 ][ 1 ] += expressionObject.base.AUs.AU1m[ key ][ 1 ][ 1 ];
            expression.AUs.AU1m[ key ][ 1 ][ 2 ] += expressionObject.base.AUs.AU1m[ key ][ 1 ][ 2 ];
            
        });

        expressionObject.abs[ indExpRel.name ] = expression;

    });

}


