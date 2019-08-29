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
    showNextWord();

}
    
function showNextWord() {

    // 2 divs, one fades out and one fades in then vice versa
    determineToBeShownNHidden();

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
    $( thoughtBubbleObject.toBeShownDiv ).fadeIn( tiaTimings.wordFadeIn, endOfSingleWordCycle );

}

function showFurtherWords() {

    removeColourThoughtBubbles( tiaTimings.removeColourThoughtBubbleDuration );
    $( thoughtBubbleObject.toBeShownDiv ).text( conversationVariables.last_sent.sentence[ thoughtBubbleObject.wordThinkingCount ][ 0 ] );

    $( thoughtBubbleObject.toBeHiddenDiv ).fadeOut( tiaTimings.wordFadeOut, function() {
        
        removeClasses('#thinkingWords0');
        removeClasses('#thinkingWords1');

        $( thoughtBubbleObject.toBeShownDiv ).fadeIn( tiaTimings.wordFadeIn, endOfSingleWordCycle );

    });

}

function endOfSingleWordCycle() {

    if ( thoughtBubbleObject.wordThinkingCount < conversationVariables.last_sent.sentence.length ) {

            //console.log('wordThinkingCount:', thoughtBubbleObject.wordThinkingCount );
            //console.log('pos:', conversationVariables.last_sent.sentence[ thoughtBubbleObject.wordThinkingCount ]);
        
        if ( Object.keys( grammarObject ).includes( conversationVariables.last_sent.sentence[ thoughtBubbleObject.wordThinkingCount ][ 1 ][0] ) ) {
        
            if ( grammarObject[ conversationVariables.last_sent.sentence[ thoughtBubbleObject.wordThinkingCount ][ 1 ][ 0 ] ].show ) {

                setTimeout( function() {

                    colorNounVerbPrep( $( thoughtBubbleObject.toBeShownDiv ), conversationVariables.last_sent.sentence[ thoughtBubbleObject.wordThinkingCount ][ 1 ]);
                    thoughtBubbleObject.wordThinkingCount += 1;
                    setTimeout( cycleThroughWords, 3 * tiaTimings.littleColorBubblesAppearDuration + tiaTimings.mainColorBubbleAppearsDuration + tiaTimings.delayAfterColorInFinalBubble );

                }, thoughtBubbleObject.wordShowDuration + tiaTimings.delayForNodding )

            } else {

                thoughtBubbleObject.wordThinkingCount += 1;
                setTimeout( cycleThroughWords, thoughtBubbleObject.wordShowDuration );

            }
        
        } else {

            thoughtBubbleObject.wordThinkingCount += 1;
            setTimeout( cycleThroughWords, thoughtBubbleObject.wordShowDuration );

        }

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
