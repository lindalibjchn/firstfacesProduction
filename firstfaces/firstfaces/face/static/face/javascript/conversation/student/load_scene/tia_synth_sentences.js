function readyTiaSynthSentences() {

    Object.keys( conversationVariables.stock_phrases ).forEach( function( d ) {

        let newURLs = [];
        conversationVariables.stock_phrases[ d ].URLs.forEach( function( URL ) {

            newURLs.push( prefixURL + tiaMediaLoc + URL );

        } )

        conversationVariables.stock_phrases[ d ].URLs = newURLs;


    } );

    synthesisObject.data = conversationVariables.stock_phrases;

}
