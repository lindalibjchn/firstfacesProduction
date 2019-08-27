function addThoughtBubbles() {

    addThoughtBubble( 0 );

}

function addThoughtBubble( no ) {

    recTimes.thoughtBubblesAdded = Date.now() / 1000;

    if ( no === 0 ) {

        $('#thoughtBubble0').fadeIn( tiaTimings.thoughtBubbleAddDelay );

    } else if ( no === 1 ) {

        $('#thoughtBubble1').fadeIn( tiaTimings.thoughtBubbleAddDelay );
        $('#thoughtBubble0').fadeOut( tiaTimings.thoughtBubbleAddDelay );
        
    } else if ( no === 2 ) {

        $('#thoughtBubble1').fadeOut( tiaTimings.thoughtBubbleAddDelay );
        $('#thoughtBubble2').fadeIn( tiaTimings.thoughtBubbleAddDelay );
        
    } else if ( no === 3 ) {

        $('#thoughtBubble2').fadeOut( 1000 );
        $('#thoughtBubble3').fadeIn( 1000 );
        $('#thinkingWords0').text( '' )
        $('#thinkingWords1').text( '' )
        $('#thinkingWordsCont').css('display', 'flex'); 

        setTimeout( function() {
            
            showTiaThinkingOverWords();

        }, 1500 );

    }

    setTimeout( function() {

        if ( no < 4 ) {

            addThoughtBubble( no + 1 );

        } else {

            thinkingEyes();

        }

    }, tiaTimings.thoughtBubbleAddDelay )

}

var wordThinkingCount = 0;
function showTiaThinkingOverWords() {

    if ( wordThinkingCount % 2 === 0 ) {

        if (wordThinkingCount === 0 ) {

            $('#thinkingWords0').hide();
            $('#thinkingWords1').hide();
            $('#thinkingWords0').text( conversationVariables.sentenceData[ wordThinkingCount ][ 0 ] );
            $('#thinkingWords0').fadeIn( tiaTimings.wordFadeDelay );

        } else {

            $('#thinkingWords0').text( conversationVariables.sentenceData[ wordThinkingCount ][ 0 ] );

            $('#thinkingWords1').fadeOut( tiaTimings.wordFadeDelay, removeClasses );
            
            setTimeout( function() {

                $('#thinkingWords0').fadeIn( tiaTimings.wordFadeDelay );

            }, 50 );

        }
        
        colorNounVerbPrep( $('#thinkingWords0'), conversationVariables.sentenceData[ wordThinkingCount ][ 1 ] );

    } else {

        $('#thinkingWords1').text( conversationVariables.sentenceData[ wordThinkingCount ][ 0 ] );

        $('#thinkingWords0').fadeOut( tiaTimings.wordFadeDelay, removeClasses );
        setTimeout( function() {

            $('#thinkingWords1').fadeIn( tiaTimings.wordFadeDelay );

        }, 50 );

        colorNounVerbPrep( $('#thinkingWords1'), conversationVariables.sentenceData[ wordThinkingCount ][ 1 ] );

    }

    let wordLength = conversationVariables.sentenceData[ wordThinkingCount ][ 0 ].length
    let wordDelay = tiaTimings.wordFadeDelay + wordLength * tiaTimings.wordFadeDelay / 2;
    wordThinkingCount += 1;

    if ( wordThinkingCount < conversationVariables.sentenceData.length ) {
        
        setTimeout( showTiaThinkingOverWords, wordDelay );

    } else {

        wordThinkingCount = 0;
        setTimeout( function() {

            $('#thinkingWords0').fadeOut( tiaTimings.wordFadeDelay, removeClasses );
            $('#thinkingWords1').fadeOut( tiaTimings.wordFadeDelay, removeClasses );

            if ( conversationVariables.awaitingJudgement ) {

                setTimeout( function() {
                    
                    if ( conversationVariables.awaitingJudgement ) {
                    
                        showTiaThinkingOverWords();
                        
                    } else {

                        judgementReceivedInThinkingPos();

                    }

                }, 1500 );

            } else {

                judgementReceivedInThinkingPos();

            }

        }, wordDelay * 2 )

    }

}

function colorNounVerbPrep( domEl, POSTag ) {

    console.log( 'domEl:', domEl )
    console.log( 'POSTag:', POSTag )

    if ( POSTag === "DT" ) {

        domEl.addClass( 'pos-det' );

    } else if ( POSTag[ 0 ] === "V" ) {

        domEl.addClass( 'pos-verb' );

    //} else if ( POSTag === "IN" ) {

        //domEl.addClass( 'pos-prep' );
        
    }

}

function removeClasses() {

    console.log('removeClasses:', this.id );
    $('#' + this.id).removeClass( 'pos-det' );
    $('#' + this.id).removeClass( 'pos-verb' );
    //$('#' + this.id).removeClass( 'pos-prep' );

}
