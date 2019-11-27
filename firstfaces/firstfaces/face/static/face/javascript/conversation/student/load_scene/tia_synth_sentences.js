function readyTiaSynthSentences() {

    Object.keys( conversationVariables.stock_phrases ).forEach( function( d ) {

        let newURLs = [];
        conversationVariables.stock_phrases[ d ].URLs.forEach( function( URL ) {

            newURLs.push( URL );

        } )

        conversationVariables.stock_phrases[ d ].URLs = newURLs;
        synthesisObject.data[ d ] = conversationVariables.stock_phrases[ d ];

    } );

    Object.keys( conversationVariables.prompts ).forEach( function( d ) {

        let newURL = conversationVariables.prompts[ d ].URL;

        conversationVariables.prompts[ d ].URL = newURL;
        synthesisObject.data[ d ] = conversationVariables.prompts[ d ];

    } );

}
