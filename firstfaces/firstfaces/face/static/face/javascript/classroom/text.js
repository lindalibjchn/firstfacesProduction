//////////////////////    TEXT

// if refresh is true then show text in sky, if false, then start from outside window and move 
function parseText( obj, refresh, color ) {
    getIndexesOfSplit( obj );
    obj.cloneLetters = putCloneLettersInList( obj.sentence, color );
    //$.when(putCloneLettersInList).done(function(){addCloneLettersToTextBackground(sent_correction, sent, refresh)});
    
    // below is just for testing the corrections bit;
    //displayCorrection();
   
}

//////////////////////    PARSE SENTENCE

function splitSentIntoLines(fullSentence) {
    
    for (i=charsInOneLine; i>1; i--) {
        
        if (fullSentence[i] === " ") {
            
            return i;
        
        };
    
    };

};

function getIndexesOfSplit( obj ) {

    let sent = obj.sentence;
    obj.splitIndexes = [0];

    let preSplitIndex = 0
    while ( sent.length > charsInOneLine ) {

        let splitIndex = splitSentIntoLines( sent )
        obj.splitIndexes.push( splitIndex + preSplitIndex );
        preSplitIndex = splitIndex + preSplitIndex;

        sent = sent.slice( splitIndex );

    };

    obj.splitIndexes.push( sent.length + preSplitIndex );

};


function putCloneLettersInList( sent, colorChoice ) {
    
    tempCloneLettersList = []
    
    for ( let i=0; i<sent.length; i++ ) {

        let uniqueMaterials = [
             new THREE.MeshPhongMaterial( { color: colorChoice, emissiveIntensity: 0, shininess: 50 } ),
        ]

        let thisLetter = sentenceObject.alphabetDict[ sent[ i ] ].clone();
        thisLetter.material = uniqueMaterials;
        tempCloneLettersList.push( thisLetter );

    }

    return tempCloneLettersList;

}

function addCloneLettersToTextBackground( obj, line ) {

    function addLine( index1, index2, y ) {

        for (let k=index1; k<index2; k++) {
            
            obj.cloneLetters[k].position.set( lineX + ( ( k - index1 ) * 1.3), y, 0 );
            
            obj.background.add( obj.cloneLetters[k] );
        
        }

    }

    for ( let i=0; i<=obj.splitIndexes.length - 1; i++ ) {

        addLine( obj.splitIndexes[ i ], obj.splitIndexes[ i + 1 ], line[ i ] );

    }

};

function highlightWrong() {

    if ( sentenceObject.wrongIndexes.length !== 0 ) {

        for ( let i=0; i<sentenceObject.wrongIndexes.length; i++ ) {

            let index0 = sentenceObject.wrongIndexes[ i ][ 0 ];
            let index1 = sentenceObject.wrongIndexes[ i ][ 1 ];

            for ( let j=index0; j<index1; j++ ) {

                sentenceObject.cloneLetters[ j ].material[0].color.setHex( 0xff0000 );
                let x = sentenceObject.cloneLetters[ j ].position.x;
                let y = sentenceObject.cloneLetters[ j ].position.y;
                let z = sentenceObject.cloneLetters[ j ].position.z;
                let highlightClone = correctionObject.highlight.clone();
                sentenceObject.background.add( highlightClone );
                highlightClone.position.set( x + 0.8, y + 0.8, z - 0.05 );

            }

        }

    } else {

        alert( 'no wrong indexes' );

    }

}

function assignCorrectionIndexes() {

    correctionObject.correctionsIndexes = [];

    for (let i=0; i<sentenceObject.wrongIndexes.length; i++) {

        //correctionObject.cloneLetters.push( [ putCloneLettersInList( correctionObject.corrections[ i ] ) ] );

        let midpoint = sentenceObject.wrongIndexes[ i ][ 0 ] + Math.floor( ( sentenceObject.wrongIndexes[ i ][ 1 ] - sentenceObject.wrongIndexes[ i ][ 0 ] ) / 2 );

        let lenCorrection = correctionObject.corrections[ i ].length;
        let lenHalfCorrection = Math.ceil( lenCorrection / 2 );
        let correctionFirstIndex = midpoint - lenHalfCorrection;
        let correctionSecondIndex = correctionFirstIndex + lenCorrection ;

        // need to make sure first correction doesn't go before 0 or overlap on previous
        if ( i === 0 ) {
            
            if ( correctionFirstIndex < 0 ) {

                correctionFirstIndex -= correctionFirstIndex;
                correctionSecondIndex -= correctionFirstIndex;

            }
        // then check if the first index of the next overlaps on the last of the previous
        } else if ( correctionFirstIndex <= sentenceObject.wrongIndexes[ i - 1 ][ 1 ] + 2 ) {

            correctionFirstIndex += sentenceObject.wrongIndexes[ i - 1 ][ 1 ] + 2 - correctionFirstIndex;

        }

        correctionObject.correctionsIndexes.push( [ correctionFirstIndex, correctionSecondIndex ] );    

    }

}

function createFullCorrectionSentence () {

    let correctionString = "";
    let noSpaces = 0;
    
    for ( let i=0; i<correctionObject.correctionsIndexes.length + 1; i++ ) {
    
        console.log('in createFullCorrectionSentence:', i);

        //spaces
        if ( i === 0 ) {

            noSpaces = correctionObject.correctionsIndexes[ 0 ][ 0 ];
            correctionString = correctionString.concat( " ".repeat( noSpaces ) );

        } else if ( i === correctionObject.correctionsIndexes.length ) {

            noSpaces = sentenceObject.splitIndexes[ i - 1 ] - correctionObject.correctionsIndexes[ i - 1 ][ 1 ];
            console.log('no spaces at end:', noSpaces);
            if ( noSpaces <= 0 ) {
                noSpaces = 1;
            }
            correctionString = correctionString.concat( " ".repeat( noSpaces ) );

        } else {

            noSpaces = correctionObject.correctionsIndexes[ i ][ 0 ] - correctionObject.correctionsIndexes[ i - 1 ][ 1 ];
            
            if ( noSpaces > 1 ) { 
                
                correctionString = correctionString.concat( " ".repeat( noSpaces ) );

            } else {

                correctionString = correctionString.concat( " / " );

            };

        };

        // correction strings - need to make sure it ddoesn't add undefined for the last one

        if ( i < correctionObject.correctionsIndexes.length ) {
            
            correctionString = correctionString.concat( correctionObject.corrections[ i ] );

        }

    }

    correctionObject.correctionString = correctionString;
    console.log( "correctionString:", correctionObject.correctionString );

    correctionObject.cloneLetters = putCloneLettersInList( correctionObject.correctionString, 0x00ff00 );

}

// really need to make one function to combine this and previous
function addCloneLettersToCorrectionBackground() {

    function addLine( index1, index2, y ) {

        for (let k=index1; k<index2; k++) {
            
            correctionObject.cloneLetters[k].position.set( lineX + ( ( k - index1 ) * 1.3), y, 0 );
            
            correctionObject.correctionBackground.add( correctionObject.cloneLetters[k] );
        
        }

    }

    for ( let i=0; i<=correctionObject.splitIndexes.length - 1; i++ ) {

        addLine( correctionObject.splitIndexes[ i ], correctionObject.splitIndexes[ i + 1 ], lineY[ i ] );

    }

};

function findCorrectionSplitIndexes() {

    let splitIndexes = [ 0 ]


    function findIndexOfNearestSpace( index ) {

        let offset = 1;
        let indexOfSplit = 0;

        while ( indexOfSplit === 0 ) {

            if ( correctionObject.correctionString[ index + offset ] === " " ) {

                indexOfSplit = index + offset;
                return indexOfSplit;

            } else if ( correctionObject.correctionString[ index - offset ] === " " ) {

                indexOfSplit = index - offset;
                return indexOfSplit;

            } else {

                offset += 1;

            }

        }

    }

    for (let i=1; i<sentenceObject.splitIndexes.length; i++ ) {
    
        let split = sentenceObject.splitIndexes[ i ];

        //if ( correctionObject.correctionString[ split ] !== undefined  ) {
        
            if ( correctionObject.correctionString[ split ] === " " ) {

                console.log('index here:', split);
                splitIndexes.push( split );
                
            } else {
            
                console.log('index there:', split);
                splitIndexes.push( findIndexOfNearestSpace( split ) );

            }

        //}

    }

    correctionObject.splitIndexes = splitIndexes;
}

function displayCorrection() {

    assignCorrectionIndexes();
    createFullCorrectionSentence();
    findCorrectionSplitIndexes();
    addCloneLettersToCorrectionBackground();

    scene.add( correctionObject.correctionBackground );
    //put this here just to call it
    //displaySpeechBubble();
}

function removeSentence() {

    // c=1 cuz don't delete the background itself which is the first child

    let sLen = sentenceObject.background.children.length
    for (let c=0; c<sLen; c++ ) {

        // as objects are deleted the list shortens, so always delete object at position 1
        sentenceObject.background.remove( sentenceObject.background.children[ 0 ] );

    }

    scene.remove( sentenceObject.background );

}

function removeCorrection() {

    // c=1 cuz don't delete the background itself which is the first child

    let cLen = correctionObject.correctionBackground.children.length
    for (let c=0; c<cLen; c++ ) {

        // as objects are deleted the list shortens, so always delete object at position 1
        correctionObject.correctionBackground.remove( correctionObject.correctionBackground.children[ 0 ] );

    }

    scene.remove( correctionObject.correctionBackground );

}

//// SPEECH BUBBLE STUFF

function displaySpeechBubble( highLow, dur, op ) {
    
    $('#speechBubbleCont').fadeTo( dur, op );

    if ( highLow === "high" ) {

        $('#speechBubbleTia').show();
        $('#speakingWordsTia').show();
        
    } else if ( highLow === "low" ) {

        $('#speechBubbleLaptop').show();
        $('#speakingWordsLaptop').show();
        
    }

}


//// REMOVALS

function removeSpeechBubble( dur ) {

    $('#speechBubbleCont').fadeOut( dur );

    setTimeout( function() {

        $('.speech-bubbles').hide();
        $('.speaking-words').hide();
    
    }, dur )

}








