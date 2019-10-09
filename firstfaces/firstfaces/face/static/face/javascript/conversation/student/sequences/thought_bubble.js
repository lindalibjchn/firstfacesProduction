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

    if ( thoughtBubbleObject.loop % 2 === 0 ) {
        
        mouthWordController();

    } else {

        thinkingJustWordsController();

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

    //removeColourThoughtBubbles( tiaTimings.removeColourThoughtBubbleDuration );
    $( thoughtBubbleObject.toBeShownDiv ).hide();
    $( thoughtBubbleObject.toBeHiddenDiv ).hide();
    $( thoughtBubbleObject.toBeShownDiv ).text( conversationVariables.last_sent.sentence[ thoughtBubbleObject.wordThinkingCount ][ 0 ] );
    $( thoughtBubbleObject.toBeShownDiv ).fadeIn( tiaTimings.wordFadeIn );

}

function showFurtherWords() {

    //console.log('word:', conversationVariables.last_sent.sentence[ thoughtBubbleObject.wordThinkingCount ][ 0 ]);
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
    // movement 2
    let phoneSeqLen = Math.max( phoneSequence.length, 3 );
    thoughtBubbleObject.handMov2Dur = phoneSeqLen * tiaTimings.handMov2Mult; 

    tiaMouthPhoneSequence( phoneSequence, tiaTimings.emphasisedMouthingFramesPerPhone ) // to <speech/mouthong.js>
    // movement 1
    
    movementController( movementObject.abs[ grammarObjectWord[ 'movement' ] ], tiaTimings.durationOfEmphasisedFirstAndLastMouthingPhones, tiaTimings.durationOfEmphasisedFirstAndLastMouthingPhones );
    moveThoughtBubblesToToFollowNoddingHead( true, tiaTimings.durationOfEmphasisedFirstAndLastMouthingPhones );
}

function endOfSingleWordCycle() {

    let delayToShowNextWord = 0;
    if ( mouthingObject.emphasis ) {

        // too much information, gonna do this with just the hand motion for now
        //colorNounVerbPrep( $( thoughtBubbleObject.toBeShownDiv ), conversationVariables.last_sent.sentence[ thoughtBubbleObject.wordThinkingCount ][ 1 ]);
        //delayToShowNextWord += 3 * tiaTimings.littleColorBubblesAppearDuration + tiaTimings.mainColorBubbleAppearsDuration + tiaTimings.delayAfterColorInFinalBubble
        delayToShowNextWord += tiaTimings.delayAfterEmphasisedWord;
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

    if ( thoughtBubbleObject.loop  === 4 ) {

        tiaTellsStudentNoFeedback();

    } else if ( thoughtBubbleObject.loop % 2 === 0 ) {
    
        returnFromThinkingHard();

    } else {

        setTimeout( goToThinkingHard, tiaTimings.delayUntilGoingToThinkingHard );

    }

}

function goToThinkingHard() {

    $('.thinking-words').fadeOut( tiaTimings.removeThoughtBubbleDuration )
    expressionController( expressionObject.abs.thinkingHard, tiaTimings.toThinkingHardDuration )
    movementController( movementObject.abs.thinkSentenceHardArmNeutral, tiaTimings.toThinkingHardDuration, tiaTimings.toThinkingHardDuration, thinkHard )

    moveThoughtBubblesToToFollowThinkingHead( true );
}

function thinkHard() {

    setTimeout( showNextWord, tiaTimings.delayUntilThinkingJustWords );

}

function thinkingJustWordsController() {

    let mult = Math.max( conversationVariables.last_sent.sentence[ thoughtBubbleObject.wordThinkingCount ][ 0 ].length, 2 );
    let wordDur = mult * tiaTimings.singleCharacterDuration;
    setTimeout( endOfSingleWordCycle, wordDur );

}

function returnFromThinkingHard() {

    $('.thinking-words').fadeOut( tiaTimings.removeThoughtBubbleDuration )
    expressionController( expressionObject.abs.talkBase, tiaTimings.toThinkingHardDuration )
    movementController( movementObject.abs.thinkSentenceArmNeutral, tiaTimings.fromThinkingHardDuration, tiaTimings.fromThinkingHardDuration, function() {
        setTimeout( showNextWord, tiaTimings.delayUntilStartLoopAgain )

    })

    moveThoughtBubblesToToFollowThinkingHead( false );

}

function tiaTellsStudentNoFeedback() {

    thinkingEyesObject.bool = false
    moveThoughtBubblesToToFollowThinkingHead( false );
    removeThoughtBubbles( tiaTimings.removeThoughtBubbleDuration, removeTBCb=function(){

        movementController( movementObject.abs.blank, tiaTimings.fromThinkingHardDuration / 2, tiaTimings.fromThinkingHardDuration, function() {

            tiaSpeak( 'notSureAbout', cont=true, speakCb=function(){} );

        });

    });

}

function moveThoughtBubblesToToFollowThinkingHead( toThink ) {
 
    let dir = toThink ? '+' : '-';
    let thinkingHard = toThink ? tiaTimings.toThinkingHardDuration : tiaTimings.fromThinkingHardDuration;
    thinkingHardMillisecs = thinkingHard * 800;
    setTimeout( function() {
            
        $('#thoughtBubbleWhite0').animate({left: dir + '=22px', top: dir + '=22px'}, thinkingHardMillisecs );
        $('#thoughtBubbleWhite1').animate({left: dir + '=12px', top: dir + '=12px'}, thinkingHardMillisecs );
        $('#thoughtBubbleWhite2').animate({left: dir + '=5px', top: dir + '=5px'}, thinkingHardMillisecs );

    }, 200 )

}

function moveThoughtBubblesToToFollowNoddingHead( up, dur ) {
 
    let dir = up ? '-' : '+';
    let noddingMillisecs = dur * 800;
    setTimeout( function() {
            
        $('#thoughtBubbleWhite0').animate({ top: dir + '=9px'}, noddingMillisecs );
        $('#thoughtBubbleWhite1').animate({ top: dir + '=5px'}, noddingMillisecs );
        $('#thoughtBubbleWhite2').animate({ top: dir + '=2px'}, noddingMillisecs );

    }, 100 )

}

function removeThoughtBubbles( dur, removeTBCb=function(){} ) {

    $( '.thought-bubbles' ).fadeOut( dur );
    $( '#thinkingWordsCont' ).fadeOut( dur );
     

    setTimeout( function() {

        removeTBCb();

    }, dur )

}

//function colorNounVerbPrep( domEl, POSTag ) {

    //if ( grammarObject[ POSTag[ 0 ]].show ) { //check this is one we are interested in
        //if ( thoughtBubbleObject.loop === 0 ) {

            //addThoughtBubbles( 0, "#thoughtBubble" + grammarObject[ POSTag[ 0 ]].color, tiaTimings.littleColorBubblesAppearDuration, tiaTimings.mainColorBubbleAppearsDuration, function() {
             
                //domEl.addClass( grammarObject[ POSTag[ 0 ]].class )

            //} )

        //} else {

            //if ( POSTag === "DT" ) {

                //domEl.addClass( 'pos-det' );

            //} else if ( POSTag[ 0 ] === "V" ) {

                //domEl.addClass( 'pos-verb' );

            //} else if ( POSTag === "IN" || POSTag === "TO" ) {

                //domEl.addClass( 'pos-prep' );
                
            //}

        //}

    //}

//}

//function removeColourThoughtBubbles( dur ) {

    //let colors = ['blue', 'orange', 'pink'];

    //colors.forEach( function( c ) {

        //$( '.thought-bubble-' + c ).fadeOut( dur )
           
    //} );

//}

