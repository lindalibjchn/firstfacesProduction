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
    [ expressionObject.rel.content, expressionObject.rel.happy ], 
    [ expressionObject.rel.happy, expressionObject.rel.disgust ],
    [ expressionObject.rel.disgust, expressionObject.rel.fear ],
    [ expressionObject.rel.fear, expressionObject.rel.sad ],
    [ expressionObject.rel.sad, expressionObject.rel.content ]
]

function createCalculatedExpression( twoExpressions, ratio, mult, surp ){

    calcExp = $.extend(true, {}, expressionObject.rel.blank );
    calcTalkExp = $.extend(true, {}, expressionObject.rel.blank );

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
            var surpriseExpressionThisBone = expressionObject.rel.surprise.AUs[ AU ][ bone ];

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

    let emotionCoords = conversationVariables.last_sent['emotion']
    let surprise = conversationVariables.last_sent['surprise']

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

        let singleCalculatedExpressions = createSingleExpression( expressionObject.rel.blank, 1 )
        calculatedExpression = getAbsoluteCoordsOfExpressionTo( singleCalculatedExpressions[ 0 ] )
        calculatedTalkExpression = getAbsoluteCoordsOfExpressionTo( singleCalculatedExpressions[ 1 ] )

    }

}

