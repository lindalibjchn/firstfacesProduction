function loadPrevSents( callback ) {

    let node = document.getElementById("prevSents");
    node.innerHTML = '';

    if ( Object.keys( classVariables.sentences ).length > 0 ) {

        for ( var i in classVariables.sentences ) {

            appendExchange( classVariables.sentences[ i ], node, i );

        }

    }

}

function appendExchange( sentenceMeta, node, sentIndex ) {

    // this creates the boxes and sets the sentence variable
    createExchangeOutput = createExchange( sentenceMeta, sentIndex );
    newExchange = createExchangeOutput[ 0 ]
    sentenceBox = createExchangeOutput[ 1 ];
    node.appendChild( newExchange );

    // change background colour iand other stuf if correct/wrongetc.
    if ( sentenceMeta.judgement === "C" || sentenceMeta.judgement === "P" ) {

        sentenceBox.className += " correctSent";
    
    } else if ( sentenceMeta.judgement === "I" ) {

        sentenceBox.className += " incorrectSent";
        makeHighlightedSent( sentenceMeta, sentIndex );
        
    } else if ( sentenceMeta.judgement === "M" ) {

        sentenceBox.className += " meanBySent";
        makeHighlightedSent( sentenceMeta, sentIndex );

        let meanByText = createMeanByTextForPromptBox( sentenceMeta ); 
        newExchange.appendChild( createPromptBox( meanByText ) );

    } else if ( sentenceMeta.judgement === "B" ) {

        sentenceBox.className += " correctSent";
        makeHighlightedSent( sentenceMeta, sentIndex );
    
        let betterText = createBetterTextForPromptBox( sentenceMeta ); 
        newExchange.appendChild( createPromptBox( betterText ) );

    } else if ( sentenceMeta.judgement === "D" ) {

        sentenceBox.className += " meanBySent";
        newExchange.appendChild( createPromptBox( "I'm sorry but I don't understand what you said." ) );

    } else if ( sentenceMeta.judgement === "3" ) {

        sentenceBox.className += " meanBySent";
        newExchange.appendChild( createPromptBox( "There are more than 3 mistakes in your sentence. Could you simplify and try again?" ) );

    } else if ( sentenceMeta.judgement === null ) {

        sentenceBox.className += " noCorrectionYetSent";
    
    }

    if ( sentenceMeta.prompt !== null ) {

        if ( sentenceMeta.judgement !== "B" && sentenceMeta.judgement !== "M" ) {

            newExchange.appendChild( createPromptBox( sentenceMeta.prompt ) );

        }

    }

    if ( sentenceMeta.correction !== "" ) {

        if ( sentenceMeta.judgement === "I" ) {

            if ( sentenceMeta.show_correction ) {

                newExchange.appendChild( createCorrectionsBox( sentenceMeta.correction ) );
            
            }

        }

    }

}

function createExchange( sM, sentI ) {

    let exchange = document.createElement("div");
    exchange.className = "exchangeCont"

    let sentenceBox = document.createElement("div");
    sentenceBox.className = "sentenceBox";

    let newInnerHTML = "";
    sM.sentence.forEach( function(w, i) {

        if ( w === " " ) {

            newInnerHTML += "<div class='prev-sents-words' id='word_" + sentI.toString() + "_" + i.toString() + "'>" + "&nbsp</div>"

        } else {

            newInnerHTML += "<div class='prev-sents-words' id='word_" + sentI.toString() + "_" + i.toString() + "'>" + w + "</div>"

        }

    });

    sentenceBox.innerHTML = newInnerHTML;

    exchange.appendChild( sentenceBox );

    return [exchange, sentenceBox]
}

function scrollBottom() {

    scrollNode =  document.getElementById("prevSents");
    scrollNode.scrollTop = scrollNode.scrollHeight;

}

function makeHighlightedSent( sentenceMeta, sI ) {

    console.log('in makeHighlightedSent');
    if ( sentenceMeta.indexes !== null) {

        let spanClass;
        // just one now, but can add other types of highlights later if needed
        if ( sentenceMeta.judgement === "I" ) {

            spanClass = "correctedSection";

        } else if ( sentenceMeta.judgement === "B" ) {

            spanClass = "betterSection";

        } else if ( sentenceMeta.judgement === "M" ) {

            spanClass = "meanBySection";

        }

        sentenceMeta.indexes.forEach( function( i ) {

            i.forEach( function( j ) {
            
                $('#word_' + sI.toString() + "_"  + j.toString()).addClass( spanClass );

            } );

        } );

    }

}

function createPromptBox( promptText ) {

    let promptBox = document.createElement("div");
    
    promptBox.innerHTML = promptText;

    promptBox.className = "sentenceBox promptBox";

    return promptBox;

}

function createCorrectionsBox( correctionsText ) {

    let correctionsBox = document.createElement("div");
    
    correctionsBox.innerHTML = correctionsText;

    correctionsBox.className = "sentenceBox correctionsBox";

    return correctionsBox;

}

function createMeanByTextForPromptBox( sentenceMetaData ) {

    let confusingIndexes = sentenceMetaData.indexes;
    let confusingSlices = []
    
    // may be more than one confusing bit
    confusingIndexes.forEach( function( cI ) {
	
        confusingSlice = ''
        cI.forEach( function( i ) {

            confusingSlice += sentenceMetaData.sentence[ i ];

        } );

	    confusingSlices.push( confusingSlice );

    } );

    let meanByText = "I'm not sure what you mean by, "
    
    for ( var cS in confusingSlices ) {
     
        if ( cS > 0 ) {

            meanByText += " or "

        }
        
        meanByText += "'" + confusingSlices[ cS ] + "'";

    }

    meanByText += "."
    
    return meanByText;

}

function createBetterTextForPromptBox( sentenceMetaData ) {

    // only one section for better
    console.log( 'sentenceMetaData:', sentenceMetaData );
    let betterIndexes = sentenceMetaData.indexes[ 0 ];
    let betterSlice = ''
        
    console.log( 'betterIndexes:', betterIndexes );
    betterIndexes.forEach( function( i ) {

        betterSlice += sentenceMetaData.sentence[ i ];

    } );
    
    let text = "It would be better to say, '" + sentenceMetaData.prompt + "', instead of, '" + betterSlice + "'."
    
    return text;

}




