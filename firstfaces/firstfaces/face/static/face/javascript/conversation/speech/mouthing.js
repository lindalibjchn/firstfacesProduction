function tiaMouthPhoneSequence( phoneSeq, framesPerPhone ) {

    console.log( 'in tiaMouthPhoneSequence' );
    mouthingObject.mouthing = true; 
    mouthingObject.phones = phoneSeq;
    mouthingObject.phoneCount = 1;
    mouthingObject.framesPerPhone = framesPerPhone;
    mouthingObject.noOfPhones = phoneSeq.length;
    animateFirstMouthPhoneSlowly();

}

function animateFirstMouthPhoneSlowly() {

    if ( mouthingObject.emphasis ) {

        expressionController( expressionObject.abs[ mouthingObject.phones[ 0 ] + 'Emp' ], tiaTimings.durationOfEmphasisedFirstMouthingPhones, function() {
           
            movementController( movementObject.abs.thinkSentenceArmNeutral, thoughtBubbleObject.handMov2Dur, thoughtBubbleObject.handMov2Dur, animateMouthPhonesInOrder);
            moveThoughtBubblesToToFollowNoddingHead( false, thoughtBubbleObject.handMov2Dur );

        });

    } else {

        expressionController( expressionObject.abs[ mouthingObject.phones[ 0 ] ], tiaTimings.durationOfFirstMouthingPhones, animateMouthPhonesInOrder )

    }

}

function animateMouthPhonesInOrder() {

    let express_ = expressionObject.abs[ mouthingObject.phones[ mouthingObject.phoneCount ] ];
    let durLast_ = tiaTimings.durationOfFirstMouthingPhones;
    if ( mouthingObject.emphasis ) {
        
        express_ = expressionObject.abs[ mouthingObject.phones[ mouthingObject.phoneCount ] + 'Emp' ]
        durLast_ = tiaTimings.durationOfEmphasisedFirstMouthingPhones;

    }

    if ( mouthingObject.phoneCount < mouthingObject.noOfPhones ) {

        mouthingController( express_, animateMouthPhonesInOrder )
            
        mouthingObject.phoneCount += 1;

    } else {

        expressionController( expressionObject.abs.talkBase, durLast_, endOfSingleWordCycle )

    }

}

function mouthingController( expressionTo, cb ) {
    
    expressionObject.bool = false;//if other expression delayed, just stop it before calculating absolute position
    expressionObject.now = getAbsoluteCoordsOfExpressionNow();
    expressionObject.movement = createRelativeExpression( expressionTo );
    expressionObject.callback = cb;
    initMouthing();

}

//// general all-purpose method for all expressions
function initMouthing() {

        // -1 cause the frames run over
    expressionObject.sinLength = mouthingObject.framesPerPhone;
    expressionObject.sin = sineArrays[ expressionObject.sinLength ];
    
    expressionObject.startCount = mainCount;
    expressionObject.bool = true;

}






