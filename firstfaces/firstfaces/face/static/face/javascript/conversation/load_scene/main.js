$(window).on( 'load', function() {
   
    // begins the loading of objects
    init();

    //get audio ready
    readyBtns();

    readyAudio();

    //fill prevSents
    loadPrevSents( scrollBottom );   
    conversationVariables.playspeed=1.0;
    
    //// FOR VOLUME BAR
    canvasContext = document.getElementById( "meter" ).getContext("2d");
    canvasContext.transform(1, 0, 0, -1, 0, HEIGHT_VOL)

});




function judgementReceived( sentMeta ) {

    console.log('sentMeta:', sentMeta);

    // update conversationVariables to include new sentence. newInd gets index of next sent
    let newInd = Object.keys(conversationVariables.sentences).length;
    sentMeta.emotion = JSON.parse(sentMeta.emotion);
    conversationVariables.sentences[ newInd ] = sentMeta;
    conversationVariables.sentences[ newInd ].sentence = JSON.parse( sentMeta.sentence );
    conversationVariables.sentences[ newInd ].indexes = JSON.parse( sentMeta.indexes );
    conversationVariables.sentences[ newInd ].prompt = sentMeta.prompt;

    conversationVariables.id_of_last_sent = newInd;
    conversationVariables.tiaToSay = sentMeta.tiaToSay;
    
    conversationVariables.last_sent = sentMeta;
    conversationVariables.last_sent.sentence = sentMeta.sentence;
    conversationVariables.last_sent.indexes = sentMeta.indexes;
    conversationVariables.last_sent.prompt = sentMeta.prompt;

    // keeps state of sentence
    conversationVariables.blob_no_text = false;
    conversationVariables.awaitingJudgement = false;

    // do this here to change voices too
    if ( conversationVariables.last_sent.judgement === "B" || conversationVariables.last_sent.judgement === "C" || conversationVariables.last_sent.judgement === "P" || conversationVariables.last_sent.judgement === "M" ) {

        //if ( conversationVariables.last_sent.judgement !== "C" ) {

            //checkForPromptNIndexes( sentMeta.sent_id );

        //}

        // calculate changes in expression for these
        if ( conversationVariables.last_sent.judgement === "M" ) {

            let singleCalculatedExpressions = createSingleExpression( expressionsRel.confused, 0.5 )
            calculatedExpression = getAbsoluteCoordsOfExpressionTo( singleCalculatedExpressions[ 0 ] )
            calculatedTalkExpression = getAbsoluteCoordsOfExpressionTo( singleCalculatedExpressions[ 1 ] )

        } else {

            changeExpression();

        }

    } else if ( conversationVariables.last_sent.judgement === "D" ) {

        let singleCalculatedExpressions = createSingleExpression( expressionsRel.confused, 1 )
        calculatedExpression = getAbsoluteCoordsOfExpressionTo( singleCalculatedExpressions[ 0 ] )
        calculatedTalkExpression = getAbsoluteCoordsOfExpressionTo( singleCalculatedExpressions[ 1 ] )

    } else if ( conversationVariables.last_sent.judgement === "3" ) {

        let singleCalculatedExpressions = createSingleExpression( expressionsRel.confused, 0.75 )
        calculatedExpression = getAbsoluteCoordsOfExpressionTo( singleCalculatedExpressions[ 0 ] )
        calculatedTalkExpression = getAbsoluteCoordsOfExpressionTo( singleCalculatedExpressions[ 1 ] )

    } else if ( conversationVariables.last_sent.judgement === "I" ) {

        let singleCalculatedExpressions = createSingleExpression( expressionsRel.confused, 1 )
        calculatedExpression = getAbsoluteCoordsOfExpressionTo( singleCalculatedExpressions[ 0 ] )
        calculatedTalkExpression = getAbsoluteCoordsOfExpressionTo( singleCalculatedExpressions[ 1 ] )

    }
                
}

//function promptNIndexesReceived( sentMeta ) {

    //console.log('new sent meta:', sentMeta);

    //conversationVariables.promptNIndexesReceived = true;

    //conversationVariables.sentences[ conversationVariables.id_of_last_sent ].prompt = sentMeta.prompt;
    //conversationVariables.last_sent.prompt = sentMeta.prompt;

    //conversationVariables.sentences[ conversationVariables.id_of_last_sent ].indexes = sentMeta.indexes;
    //conversationVariables.last_sent.indexes = sentMeta.indexes;

//}


