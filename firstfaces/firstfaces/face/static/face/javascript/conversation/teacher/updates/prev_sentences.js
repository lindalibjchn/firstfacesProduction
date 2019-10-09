function addPreviousSentences( conversation_, phoneId ) {

    $( '#prevSentsInnerContainer' + phoneId ).remove()
    let prevSentsInnerContainer = document.createElement("div");
    prevSentsInnerContainer.className = "prev-sents-inner-container";
    prevSentsInnerContainer.id = "prevSentsInnerContainer" + phoneId;
    //console.log( 'conversation_:', conversation_ );
    conversation_.completed_sentences.forEach( function( exchange ) {

        let exchangeHTML = createExchangeHTML( exchange );
        //console.log('exchangeHTML:', exchangeHTML);
        prevSentsInnerContainer.prepend( exchangeHTML );
        $( '#prevSentsContainer' + phoneId ).append( prevSentsInnerContainer );
        makeWrongSentsHighlighted( exchange );

    });

    updateScroll( prevSentsInnerContainer )

}

function createExchangeHTML( exchange_ ) {

    //console.log('exchange_:', exchange_);
    let exchangeContainer = document.createElement("div");
    exchangeContainer.className = "sentence-container";
    exchangeContainer.id = "exchangeContainer_" + exchange_.sent_id.toString();

    let sentenceBox = createSentenceBox( exchange_ );
    exchangeContainer.appendChild( sentenceBox );

    //console.log( 'before createPromptBox' )
    let promptBox = createPromptBox( exchange_ );
    exchangeContainer.appendChild( promptBox );

    return exchangeContainer

}

function createSentenceBox( exchange_ ) {

    let sentenceBox = document.createElement("div");
    sentenceBox.className = "box sentence-box";
    sentenceBox.id = "sentenceBox_" + exchange_.sent_id.toString();

    let newInnerHTML = "";
    exchange_.sentence.forEach( function(w, i) {

        if ( i === 0 ) {

            newInnerHTML += '<div class="prev-sents-words" id="word_' + exchange_.sent_id.toString() + '_' + '0">&nbsp</div>'

        }

        let wordIndex = ( i * 2 ) + 1
        let spaceIndex = ( i * 2 ) + 2
        newInnerHTML += '<div class="prev-sents-words" id="word_' + exchange_.sent_id.toString() + '_' + wordIndex.toString() + '">' + w[ 0 ] + '</div>'
        newInnerHTML += '<div class="prev-sents-words" id="word_' + exchange_.sent_id.toString() + '_' + spaceIndex.toString() + '">&nbsp</div>'

    });

    sentenceBox.innerHTML = newInnerHTML;
    giveSentenceBoxColorBasedOnJudgement( sentenceBox, exchange_ );

    return sentenceBox;

}

function giveSentenceBoxColorBasedOnJudgement( sentenceBox_, exchange_ ) {

    //console.log( 'exchange_:', exchange_ );
    if ( exchange_.judgement === "P" ) {

        sentenceBox_.className += " correct-sent";
    
    } else if ( exchange_.judgement === "I" ) {

        sentenceBox_.className += " incorrect-sent";
        
    } else if ( exchange_.judgement === "M" ) {

        sentenceBox_.className += " mean-by-sent";

        //let meanByText = createMeanByTextForPromptBox( exchange_ ); 
        //newExchange.appendChild( createPromptBox( meanByText ) );

    } else if ( exchange_.judgement === "B" ) {

        sentenceBox_.className += " better-sent";
    
        //let betterText = createBetterTextForPromptBox( exchange_ ); 
        //newExchange.appendChild( createPromptBox( betterText ) );

    } else if ( exchange_.judgement === "D" ) {

        sentenceBox_.className += " dunno-sent";
        //newExchange.appendChild( createPromptBox( "I'm sorry but I don't understand what you said." ) );

    } else if ( exchange_.judgement === "3" ) {

        sentenceBox_.className += " three-sent";
        //newExchange.appendChild( createPromptBox( "There are more than 3 mistakes in your sentence. Could you simplify and try again?" ) );

    } else if ( exchange_.judgement === null ) {

        sentenceBox_.className += " no-correction-yet-sent";
    
    }

}

function createPromptBox( exchange_ ) {

    let promptBoxReady = document.createElement("div");
    promptBoxReady.className = "box prompt-box";
    promptBoxReady.id = "promptBox_" + exchange_.sent_id.toString();

    let newInnerHTML = createPromptTextForEachJudgement( exchange_ )

    promptBoxReady.innerHTML = newInnerHTML;

    return promptBoxReady;

}

function createPromptTextForEachJudgement( exchange_ ) {

    let text;
    if ( exchange_.judgement === "P" ) {

        text = exchange_.prompt.join( '<br>' );

    } else if ( exchange_.judgement === "B" ) {

        text = createBetterTextForPromptBox( exchange_ );

    } else if ( exchange_.judgement === "M" ) {

        text = createMeanByTextForPromptBox( exchange_ );

    } else if ( exchange_.judgement === "I" ) {

        text = exchange_.prompt.join('<br>');

    } else if ( exchange_.judgement === "3" ) {

        text = "More than 3 errors";

    } else if ( exchange_.judgement === "D" ) {

        text = "I don't understand";

    }

    return text

}

function createMeanByTextForPromptBox( exchange_ ) {

    let confusingIndexes = exchange_.indexes;
    let confusingSlices = []
    
    // may be more than one confusing bit
    confusingIndexes.forEach( function( cI ) {
	
        confusingSlice = ''
        cI.forEach( function( i ) {

            //console.log('exchange_.sentence[ i ]:', exchange_.sentence[ i ]);
            if ( i % 2 !== 0 ) {

                confusingSlice += exchange_.sentence[ parseInt(( i - 1 ) / 2) ][ 0 ] + ' ';

            }

        } );

        // gotta remove trailing space
	confusingSlices.push( confusingSlice.substring( 0, confusingSlice.length - 1 ) );

    } );

    let meanByText = "I'm not sure what you mean by, "
    
    for ( var cS in confusingSlices ) {
     
        if ( cS > 0 ) {

            meanByText += " or "

        }
        
        meanByText += "'" + confusingSlices[ cS ] + "'";

    }

    meanByText += "."
    
    if ( exchange_.prompt !== null ) {

        meanByText += '<br>' + exchange_.prompt.join( '</br>' )

    }

    return meanByText;

}

function createBetterTextForPromptBox( exchange_ ) {

    let imperfectIndexes = exchange_.indexes;
    let imperfectSlices = [];
    
    imperfectIndexes.forEach( function( cI ) {
	
        imperfectSlice = ''
        cI.forEach( function( i ) {

            if ( i % 2 !== 0 ) {
                //console.log('exchange_.sentence[ i ]:', exchange_.sentence[ i ]);
                imperfectSlice += exchange_.sentence[ parseInt(( i - 1 ) / 2) ][ 0 ] + ' ';

            }

        } );

        // gotta remove trailing space
	imperfectSlices.push( imperfectSlice.substring( 0, imperfectSlice.length - 1 ) );

    } );

    let betterText = "It would be better to say,<br>"
    
    for ( var iS in imperfectSlices ) {
     
        if ( iS > 0 ) {

            betterText += ", and "

        }

        betterText += "'" + exchange_.prompt[ iS ] + "', instead of, '" +  imperfectSlices[ iS ] + "'";

    }

    betterText += "."
    
    if ( exchange_.prompt.length > exchange_.indexes.length ) {

        betterText += '<br>' + exchange_.prompt.slice( exchange_.indexes.length, exchange_.prompt.length ).join( '.</br>' );

    }

    betterText += "."

    return betterText;

}

function makeWrongSentsHighlighted( exchange_ ) {

    //console.log( 'in makeHighlightedSent' );
    //console.log( 'exchange_:', exchange_ );
    if ( exchange_.indexes !== null) {

        let spanClass;
        // just one now, but can add other types of highlights later if needed
        if ( exchange_.judgement === "I" ) {

            //console.log( 'in makeHighlightedSent' );
            spanClass = " corrected-section";

        } else if ( exchange_.judgement === "B" ) {

            spanClass = " better-section";

        } else if ( exchange_.judgement === "M" ) {

            spanClass = " mean-by-section";

        }

        exchange_.indexes.forEach( function( i ) {

            //console.log('i:', i);
            i.forEach( function( j ) {
            
                //console.log('j:', j);
                //console.log('spanClass:', spanClass);
                let idToAddClassTo = '#word_' + exchange_.sent_id.toString() + "_"  + j.toString()
                //console.log('idToAddClassTo:', idToAddClassTo);
                //let elToAddClass = document.getElementById( idToAddClassTo )    
                //elToAddClass.class += spanClass;
                $(idToAddClassTo).addClass( spanClass );
                //console.log('$(idToAddClassTo).class:', $(idToAddClassTo).class);

            } );

        } );

    }

}

function updateScroll( el ) {

    el.scrollTop = el.scrollHeight;

}


