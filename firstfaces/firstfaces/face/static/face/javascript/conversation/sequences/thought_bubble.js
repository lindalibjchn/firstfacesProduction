function initAddThoughtBubbles() {

    thoughtBubbleObject.loop = 0;
    addThoughtBubbles( 0, '#thoughtBubbleWhite', tiaTimings.thoughtBubbleAddDelay, tiaTimings.lastThoughtBubbleAddDelay, function() {

        initCycleThroughWords();
        initThinkingEyes();

    });
        
}

function addThoughtBubbles( no, imgId, delay, lastDelay, cb ) {

    recTimes.thoughtBubblesAdded = Date.now() / 1000;

    if ( no < 3 ) {

        $( imgId + no.toString() ).fadeIn( delay, function(){ addThoughtBubbles( no + 1, imgId, delay, lastDelay, cb ) } );

    } else {

        $( imgId + '3').fadeIn( lastDelay, cb );

    }

}

function initCycleThroughWords() {

    thoughtBubbleObject.wordThinkingCount = 0;
    setTimeout( showNextWord, tiaTimings.delayBeforeFirstWordShownInBubble );

}

function showNextWord() {

    // 2 divs, one fades out and one fades in then vice versa
    determineToBeShownNHidden();

    if ( thoughtBubbleObject.wordThinkingCount === 0 ) {

        showFirstWord();

    } else {

        showFurtherWords();
    }

    mouthWordController();

}

function determineToBeShownNHidden() {

    if ( thoughtBubbleObject.wordThinkingCount % 2 !== 0 ) {

        thoughtBubbleObject.toBeShownDiv = '#thinkingWords1';
        thoughtBubbleObject.toBeHiddenDiv = '#thinkingWords0';

    } else {

        thoughtBubbleObject.toBeShownDiv = '#thinkingWords0';
        thoughtBubbleObject.toBeHiddenDiv = '#thinkingWords1';
   
    }

}

function showFirstWord() {

    removeColourThoughtBubbles( tiaTimings.removeColourThoughtBubbleDuration );
    $( thoughtBubbleObject.toBeShownDiv ).hide();
    $( thoughtBubbleObject.toBeHiddenDiv ).hide();
    $( thoughtBubbleObject.toBeShownDiv ).text( conversationVariables.last_sent.sentence[ thoughtBubbleObject.wordThinkingCount ][ 0 ] );
    $( thoughtBubbleObject.toBeShownDiv ).fadeIn( tiaTimings.wordFadeIn );

}

function showFurtherWords() {

    removeColourThoughtBubbles( tiaTimings.removeColourThoughtBubbleDuration );
    $( thoughtBubbleObject.toBeShownDiv ).text( conversationVariables.last_sent.sentence[ thoughtBubbleObject.wordThinkingCount ][ 0 ] );

    $( thoughtBubbleObject.toBeHiddenDiv ).fadeOut( tiaTimings.wordFadeOut, function() {
        
        $( thoughtBubbleObject.toBeShownDiv ).fadeIn( tiaTimings.wordFadeIn );

    });

}


function mouthWordController() {

    mouthingObject.emphasis = false;

    let POS1 = conversationVariables.last_sent.sentence[ thoughtBubbleObject.wordThinkingCount ][ 1 ][0]

        // check if it is a grammar word (DET or VERB usually)
    if ( Object.keys( grammarObject ).includes( POS1 ) ) {
    
        if ( grammarObject[ POS1 ].show ) {

            let word = conversationVariables.last_sent.sentence[ thoughtBubbleObject.wordThinkingCount ][ 0 ]
            let phoneSeq = conversationVariables.last_sent.sentence[ thoughtBubbleObject.wordThinkingCount ][ 2 ]
            performHandMovementWithMouthing( POS1, word, phoneSeq );

            
        } else {

            tiaMouthPhoneSequence( conversationVariables.last_sent.sentence[ thoughtBubbleObject.wordThinkingCount ][ 2 ], tiaTimings.mouthingFramesPerPhone ) // to <speech/mouthing.js>

        }

    } else {

        tiaMouthPhoneSequence( conversationVariables.last_sent.sentence[ thoughtBubbleObject.wordThinkingCount ][ 2 ], tiaTimings.mouthingFramesPerPhone ); 

    }

}

function performHandMovementWithMouthing( POS1, word, phoneSequence ) {

    // this changes the eyebrows and mouthing emphasis in mouthing.js
    mouthingObject.emphasis = true;
    let grammarObjectWord = grammarObject[ POS1 ][ 'types' ][ word ]

    // movement 1
    movementController( movementObject.abs[ grammarObjectWord[ 'movement' ] ], grammarObjectWord[ 'handMov1Dur' ], grammarObjectWord[ 'handMov1Dur' ], function() {
        
        // movement 2
        let phoneSeqLen = Math.max( phoneSequence.length, 3 );
        let handMov2Dur = phoneSeqLen * tiaTimings.handMov2Mult; 

        movementController( movementObject.abs.thinkSentenceArmNeutral, handMov2Dur, handMov2Dur );
        tiaMouthPhoneSequence( phoneSequence, tiaTimings.emphasisedMouthingFramesPerPhone ) // to <speech/mouthong.js>
       
    } );

}

function endOfSingleWordCycle() {

    let delayToShowNextWord = 0;
    if ( mouthingObject.emphasis ) {

        colorNounVerbPrep( $( thoughtBubbleObject.toBeShownDiv ), conversationVariables.last_sent.sentence[ thoughtBubbleObject.wordThinkingCount ][ 1 ]);
        delayToShowNextWord += 3 * tiaTimings.littleColorBubblesAppearDuration + tiaTimings.mainColorBubbleAppearsDuration + tiaTimings.delayAfterColorInFinalBubble
    }

    if ( thoughtBubbleObject.wordThinkingCount < conversationVariables.last_sent.sentence.length - 1 ) {

        thoughtBubbleObject.wordThinkingCount += 1;
        setTimeout( showNextWord, delayToShowNextWord );

    } else {

        checkJudgement();

    };

}

function startNextSentenceThoughtLoop( errorInGettingResponse=false ) {

    thoughtBubbleObject.wordThinkingCount = 0;
    thoughtBubbleObject.loop += 1;

    setTimeout( goToThinkingHard, tiaTimings.delayUntilGoingToThinkingHard );

}

function goToThinkingHard() {

    expressionController( expressionObject.abs.thinkingHard, tiaTimings.toThinkingHardDuration )
    movementController( movementObject.abs.thinkSentenceHardArmNeutral, tiaTimings.toThinkingHardDuration, tiaTimings.toThinkingHardDuration, function() {
        
        $('.thinking-words').fadeOut( tiaTimings.timeInThinkingHardPosition / 2 );
        setTimeout( returnFromThinkingHard, tiaTimings.timeInThinkingHardPosition );

    } )

    setTimeout( function() {
            
        let toThinkingHardMillisecs = tiaTimings.toThinkingHardDuration * 1000;
        $('#thoughtBubbleWhite0').animate({left: '+=40px', top: '+=30px'}, toThinkingHardMillisecs );
        $('#thoughtBubbleWhite1').animate({left: '+=30px', top: '+=18px'}, toThinkingHardMillisecs );
        $('#thoughtBubbleWhite2').animate({left: '+=20px', top: '+=9px'}, toThinkingHardMillisecs );

    }, 200 )

}

function returnFromThinkingHard() {

    movementController( movementObject.abs.thinkSentenceArmNeutral, tiaTimings.fromThinkingHardDuration, tiaTimings.fromThinkingHardDuration, function() {
        setTimeout( showNextWord, tiaTimings.delayUntilStartLoopAgain )

    })

    setTimeout( function() {

        let fromThinkingHardMillisecs = tiaTimings.fromThinkingHardDuration * 1000;
        $('#thoughtBubbleWhite0').animate({left: '-=40px', top: '-=30px'}, fromThinkingHardMillisecs );
        $('#thoughtBubbleWhite1').animate({left: '-=30px', top: '-=18px'}, fromThinkingHardMillisecs );
        $('#thoughtBubbleWhite2').animate({left: '-=20px', top: '-=9px'}, fromThinkingHardMillisecs );

    }, 100 );

}

function colorNounVerbPrep( domEl, POSTag ) {

    if ( grammarObject[ POSTag[ 0 ]].show ) { //check this is one we are interested in
        if ( thoughtBubbleObject.loop === 0 ) {

            addThoughtBubbles( 0, "#thoughtBubble" + grammarObject[ POSTag[ 0 ]].color, tiaTimings.littleColorBubblesAppearDuration, tiaTimings.mainColorBubbleAppearsDuration, function() {
             
                domEl.addClass( grammarObject[ POSTag[ 0 ]].class )

            } )

        } else {

            if ( POSTag === "DT" ) {

                domEl.addClass( 'pos-det' );

            } else if ( POSTag[ 0 ] === "V" ) {

                domEl.addClass( 'pos-verb' );

            } else if ( POSTag === "IN" || POSTag === "TO" ) {

                domEl.addClass( 'pos-prep' );
                
            }

        }

    }

}

function removeThoughtBubbles( dur, cb ) {

    $( '.thought-bubbles' ).fadeOut( dur );
    $( '#thinkingWordsCont' ).fadeOut( dur );
     
    setTimeout( function() {

        cb();

    }, dur )

}

function removeColourThoughtBubbles( dur ) {

    let colors = ['blue', 'orange', 'pink'];

    colors.forEach( function( c ) {

        $( '.thought-bubble-' + c ).fadeOut( dur )
           
    } );

}

