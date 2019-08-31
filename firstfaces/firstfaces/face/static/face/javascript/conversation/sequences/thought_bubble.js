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

function removeColourThoughtBubbles( dur ) {

    let colors = ['blue', 'orange', 'pink'];

    colors.forEach( function( c ) {

        $( '.thought-bubble-' + c ).fadeOut( dur )
           
    } );

}

function initCycleThroughWords() {

    thoughtBubbleObject.wordThinkingCount = 0;
    cycleThroughWords();

}

function cycleThroughWords() {

    wordShowDuration();
    
}

function wordShowDuration() {

    let wordData = conversationVariables.last_sent.sentence[ thoughtBubbleObject.wordThinkingCount ]
    let wordLength = wordData[ 0 ].length
    let wordDur = tiaTimings.charDur + wordLength * tiaTimings.charDur / 2;

    thoughtBubbleObject.wordShowDuration = wordDur;
    setTimeout( showNextWord, tiaTimings.delayBeforeFirstWordShownInBubble );

}
    
function showNextWord() {

    // 2 divs, one fades out and one fades in then vice versa
    determineToBeShownNHidden();
    mouthingObject.emphasis = false;

    let POS1 = conversationVariables.last_sent.sentence[ thoughtBubbleObject.wordThinkingCount ][ 1 ][0]
    console.log( 'POS1:', POS1 );
    // check if it is a grammar word (DET or VERB usually)
    if ( Object.keys( grammarObject ).includes( POS1 ) ) {
    
        if ( grammarObject[ POS1 ].show ) {

            movementController( movementObject.abs[ grammarObject[ POS1 ].movement ], grammarObject[ POS1 ].handMov1Dur, grammarObject[ POS1 ].handMov1Dur, function() {
            let phoneSequence = conversationVariables.last_sent.sentence[ thoughtBubbleObject.wordThinkingCount ][ 2 ]
            let handMov2Dur = phoneSequence.length * 0.2; 

                if ( phoneSequence.length === 1 ) {

                    handMov2Dur *= 2; //so not overly abrupt on 'a'

                }

                movementController( movementObject.abs.thinkSentenceArmNeutral, handMov2Dur, handMov2Dur );
                mouthingObject.emphasis = true;
                tiaMouthPhoneSequence( phoneSequence, tiaTimings.mouthingFramesPerPhone * 1.5 ) // to <speech/mouthong.js>
               
            } );
            
        } else {

            tiaMouthPhoneSequence( conversationVariables.last_sent.sentence[ thoughtBubbleObject.wordThinkingCount ][ 2 ], tiaTimings.mouthingFramesPerPhone ) // to <speech/mouthong.js>

        }

    } else {

        tiaMouthPhoneSequence( conversationVariables.last_sent.sentence[ thoughtBubbleObject.wordThinkingCount ][ 2 ], tiaTimings.mouthingFramesPerPhone ) // to <speech/mouthong.js>

    }

    if ( thoughtBubbleObject.wordThinkingCount === 0 ) {

        showFirstWord();

    } else {

        showFurtherWords();
    }
    
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
        
        removeClasses('#thinkingWords0');
        removeClasses('#thinkingWords1');

        $( thoughtBubbleObject.toBeShownDiv ).fadeIn( tiaTimings.wordFadeIn );

    });

}

function endOfSingleWordCycle() {

    let delayToShowNextWord = 0;
    if ( mouthingObject.emphasis ) {

        colorNounVerbPrep( $( thoughtBubbleObject.toBeShownDiv ), conversationVariables.last_sent.sentence[ thoughtBubbleObject.wordThinkingCount ][ 1 ]);
        delayToShowNextWord += 3 * tiaTimings.littleColorBubblesAppearDuration + tiaTimings.mainColorBubbleAppearsDuration + tiaTimings.delayAfterColorInFinalBubble
    }

    if ( thoughtBubbleObject.wordThinkingCount < conversationVariables.last_sent.sentence.length ) {

            //console.log('wordThinkingCount:', thoughtBubbleObject.wordThinkingCount );
            //console.log('pos:', conversationVariables.last_sent.sentence[ thoughtBubbleObject.wordThinkingCount ]);
        

                //setTimeout( function() {

        thoughtBubbleObject.wordThinkingCount += 1;
        setTimeout( cycleThroughWords, delayToShowNextWord );

                //}, thoughtBubbleObject.wordShowDuration + tiaTimings.delayForNodding )

    } else {

        console.log('in endOfSingleWordCycle');
        //endOfSingleSentenceThoughtLoop();

    };

}

function calcWordShowDuration() {

    let wordData = conversationVariables.last_sent.sentence[ thoughtBubbleObject.wordThinkingCount ]
    let wordLength = wordData[ 0 ].length
    let wordDur = tiaTimings.charDur + wordLength * tiaTimings.charDur / 2;

    if ( grammarObject[ wordData[ 1 ][ 0 ] ] ) { //adds delay for ones we are interested in

        wordDur += tiaTimings.littleColorBubblesAppearDuration * 3 + tiaTimings.mainColorBubbleAppearsDuration;

    }
    
    thoughtBubbleObject.wordShowDuration = wordDur;

}
    
function endOfSingleSentenceThoughtLoop() {

    checkJudgement(); // this ajax call will run after judgement if judegement received, and startNextSentenceThoughtLoop if not

}

function startNextSentenceThoughtLoop() {

    thoughtBubbleObject.wordThinkingCount = 0;
    thoughtBubbleObject.loop += 1;
    cycleThroughWords();

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

function removeClasses( div ) {

    $( div ).removeClass( 'pos-det' );
    $( div ).removeClass( 'pos-verb' );
    $( div ).removeClass( 'pos-prep' );

}
