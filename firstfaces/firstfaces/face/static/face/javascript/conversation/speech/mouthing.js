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

        expressionController( expressionObject.abs[ mouthingObject.phones[ 0 ] + 'Emp' ], mouthingObject.durationOfFirstAndLastPhones, animateMouthPhonesInOrder )

    } else {

        expressionController( expressionObject.abs[ mouthingObject.phones[ 0 ] ], mouthingObject.durationOfFirstAndLastPhones, animateMouthPhonesInOrder )

    }

}

function animateMouthPhonesInOrder() {

    if ( mouthingObject.phoneCount < mouthingObject.noOfPhones ) {

        if ( mouthingObject.emphasis ) {

            pronunciationController( expressionObject.abs[ mouthingObject.phones[ mouthingObject.phoneCount ] + 'Emp' ], animateMouthPhonesInOrder )
        
        } else {
                
            pronunciationController( expressionObject.abs[ mouthingObject.phones[ mouthingObject.phoneCount ] ], animateMouthPhonesInOrder )
            
        }
        
        mouthingObject.phoneCount += 1;

    } else {

        //expressionController( expressionObject.abs.talkBase, mouthingObject.durationOfFirstAndLastPhones )
        
        endOfSingleWordCycle(); //back to <sequences/thought_bubble.js>

    }

}

function pronunciationController( expressionTo, cb ) {

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






