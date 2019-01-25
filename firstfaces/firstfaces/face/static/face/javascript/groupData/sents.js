function appendExchange( sentenceMeta, node ) {

    // this creates the boxes and sets the sentence variable
    createExchange( sentenceMeta );

    // change background colour iand other stuf if correct/wrongetc.
    if ( sentenceMeta.judgement === "C" || sentenceMeta.judgement === "P"  ) {

        sentenceBox.className += " correctSent";

        let a_btn = document.createElement("button");
        a_btn.id = sentenceMeta.sentence;
        a_btn.innerHTML = "<i class='fa fa-play inputfa'></i>";
        a_btn.className = "listen-synth-btn w3-button w3-green w3-circle";
        a_btn.sessID = sentenceMeta.sess_id;
        sentenceBox.appendChild( a_btn );

    
    } else if ( sentenceMeta.judgement === "I" ) {

        sentenceBox.className += " incorrectSent";
        sentenceBox.innerHTML = makeHighlightedSent( sentenceMeta );
        
    } else if ( sentenceMeta.judgement === "M" ) {

        sentenceBox.className += " meanBySent";
        sentenceBox.innerHTML = makeHighlightedSent( sentenceMeta );

        let meanByText = createMeanByTextForPromptBox( sentenceMeta ); 
        exchange.appendChild( createPromptBox( meanByText ) );

    } else if ( sentenceMeta.judgement === "3" ) {

        sentenceBox.className += " meanBySent";
        sentenceBox.innerHTML = makeHighlightedSent( sentenceMeta );

        let meanByText = "There are more than 3 mistakes in your sentence. Please simplify and try again"; 
        exchange.appendChild( createPromptBox( meanByText ) );

    } else if ( sentenceMeta.judgement === "B" ) {

        sentenceBox.className += " correctSent";
        sentenceBox.innerHTML = makeHighlightedSent( sentenceMeta );
    
        let a_btn = document.createElement("button");
        a_btn.id = sentenceMeta.sentence;
        a_btn.innerHTML = "<i class='fa fa-play inputfa'></i>";
        a_btn.className = "w3-small w3-button w3-green listen-synth-btn";
        a_btn.sessID = sentenceMeta.sess_id;
        sentenceBox.appendChild( a_btn );

        let betterText = createBetterTextForPromptBox( sentenceMeta ); 
        exchange.appendChild( createPromptBox( betterText ) );

    } else if ( sentenceMeta.judgement === "D" ) {

        sentenceBox.className += " meanBySent";
        exchange.appendChild( createPromptBox( "I'm sorry but I don't understand what you said." ) );

    } else if ( sentenceMeta.judgement === null ) {

        sentenceBox.className += " noCorrectionYetSent";
    
    }

    if ( sentenceMeta.prompt !== null ) {

        if ( sentenceMeta.judgement !== "B" ) {

            exchange.appendChild( createPromptBox( sentenceMeta.prompt ) );

        }

    }

    if ( sentenceMeta.correction !== "" ) {

        if ( sentenceMeta.judgement === "I" ) {

            exchange.appendChild( createCorrectionsBox( sentenceMeta.correction ) );
            
        }

    }

    node.appendChild( exchange );

}

function createExchange( sM ) {

    exchange = document.createElement("div");

    sentenceBox = document.createElement("div");
    sentenceBox.className = "sentenceWaitingBox";

    if ( sM.sentence[ 0 ] == " " ) {

        sentenceBox.innerHTML =  "&nbsp" + sM.sentence.substring( 1 );

    } else {

        sentenceBox.innerHTML =  "&nbsp" + sM.sentence;

    }

    exchange.appendChild( sentenceBox );

}

//function scrollBottom() {

    //scrollNode =  document.getElementById("prevSents");
    //scrollNode.scrollTop = scrollNode.scrollHeight;

//}

function makeHighlightedSent( sentenceMeta ) {

    let sentWithColor = ''
    // if not indexes for incorrect sentence, then just return sentence

    if ( sentenceMeta.indexes !== null) {

        let indexes = JSON.parse( sentenceMeta.indexes );

        // if there is more than one wrong bit I need this to find point of last index to begin next interation from
        let lastInd = 0
        for ( var ind in indexes ) {

            let ind_0 = indexes[ ind ][ 0 ];
            let ind_1 = indexes[ ind ][ 1 ];

            //cut string between these points

            let cut_0 = sentenceMeta.sentence.slice( lastInd, ind_0 );
            let cut_1 = sentenceMeta.sentence.slice( ind_0, ind_1 );
            let cut_2 = sentenceMeta.sentence.slice( ind_1 );
            lastInd = ind_1;

            let spanClass;
            // just one now, but can add other types of highlights later if needed
            if ( sentenceMeta.judgement === "I" ) {

                spanClass = "correctedSection";

            } else if ( sentenceMeta.judgement === "B" ) {

                spanClass = "betterSection";

            } else if ( sentenceMeta.judgement === "M" ) {

                spanClass = "meanBySection";

            }

            sentWithColor += cut_0 + "<span class='" + spanClass + "'>" + cut_1 + "</span>"
            
            // add last bit at end. Only double equals as w_1 is a string
            if ( ind == indexes.length - 1 ) {

                sentWithColor += cut_2;

            }

        }
 
    } else {

        sentWithColor = sentenceMeta.sentence

    }

    if ( sentWithColor[ 0 ] == " " ) {

        return "&nbsp" + sentWithColor.substring(1);

    } else {

        return "&nbsp" + sentWithColor;

    }


}

function createPromptBox( promptText ) {

    let promptBox = document.createElement("div");
    
    promptBox.innerHTML = promptText;

    promptBox.className = "sentenceWaitingBox promptBox";

    return promptBox;

}

function createCorrectionsBox( correctionsText ) {

    let correctionsBox = document.createElement("div");
    
    correctionsBox.innerHTML = correctionsText;

    correctionsBox.className = "sentenceWaitingBox correctionsBox";

    return correctionsBox;

}

function createMeanByTextForPromptBox( sentenceMetaData ) {

    let confusingIndexes = JSON.parse( sentenceMetaData.indexes );
    let confusingSlices = []
    
    // may be more than one confusing bit
    for (var i in confusingIndexes ) {
	
        let confusingSlice = sentenceMetaData.sentence.slice( confusingIndexes[ i ][ 0 ], confusingIndexes[ i ][ 1 ] ).trim();

	confusingSlices.push( confusingSlice );

    }

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
    let betterIndexes = JSON.parse( sentenceMetaData.indexes )[ 0 ];
    let betterSlice = sentenceMetaData.sentence.slice( betterIndexes[ 0 ], betterIndexes[ 1 ] ).trim();
    
    let text = "It would be better to say, '" + sentenceMetaData.prompt + "', instead of, '" + betterSlice + "'."
    
    return text;

}


function appendRecordings( sentData, n ) {

    let recordingsBox = document.createElement("div");
    recordingsBox.className = "recordingsBox";

    for ( var a in sentData.audio_files ) {

        let singleRecordingBox = document.createElement( "div" );

        let text = document.createElement( "div" );
        text.className = "speech-to-text";
        text.innerHTML = sentData.audio_files[a][1]; 
        singleRecordingBox.appendChild( text );

        let a_btn = document.createElement("button");
        a_btn.id = sentData.audio_files[a][2];
        a_btn.innerHTML = "<i class='fa fa-play inputfa'></i>";
        a_btn.className = "listen-btn w3-xsmall w3-blue w3-btn w3-circle";
        text.appendChild( a_btn );

        recordingsBox.appendChild( singleRecordingBox );

    }

    n.appendChild( recordingsBox );

}




