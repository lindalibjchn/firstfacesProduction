function tiaSpeak( tiaSays, cb ) {

    showSpeechBubble( tiaSays, tiaTimings.speechBubbleFadeInDuration )

    synthesisObject.now.noOfPhones = synthesisObject.now.phones[ 0 ].length - 1 // the first phone will be made slowly before real lip sync starts;
    synthesisObject.now.noOfFrames = Math.floor( synthesisObject.audio.duration * 60 )
    synthesisObject.now.noOfFramesPerPhone = Math.floor( synthesisObject.now.noOfFrames / synthesisObject.now.noOfPhones ) - 1; 
    // minusing 1 from this number gave a better fit to the time.

    synthesisObject.now.noOfLeftoverFrames = synthesisObject.now.noOfFrames
 - synthesisObject.now.noOfFramesPerPhone * synthesisObject.now.noOfPhones

    synthesisObject.now.phoneCount = 2;
    //expressionObject.callback = animatePhonesInOrder;
    
    animateFirstAndLastPhonesSlowly( 0, function() {
 
        setTimeout( function() {
            synthesisObject.audio.play();
        }, 100 );

        animateFirstAndLastPhonesSlowly( 1, function() {

            animatePhonesInOrder();

        })


    });
    //setTimeout( function() {
        
        //callback();
        
        //setTimeout( resetTalk, 800 );

    //}, synthesisObject.audio.duration * 1000 ); 

}

function animateFirstAndLastPhonesSlowly( phoneInd, cb ) {

        expressionController( expressionObject.abs[ synthesisObject.now.phones[ 0 ][ phoneInd ] ], 0.3, cb )

}

function animatePhonesInOrder() {

    console.log( 'in animatePhonesInOrder' );
    if ( synthesisObject.now.phoneCount < synthesisObject.now.noOfPhones ) {

        pronunciationController( expressionObject.abs[ synthesisObject.now.phones[ 0 ][ synthesisObject.now.phoneCount ] ], animatePhonesInOrder )
        synthesisObject.now.phoneCount += 1;

    // check for last phone to also be run slowly
    } else if ( synthesisObject.now.phoneCount === synthesisObject.now.noOfPhones ) { 
        
        animateFirstAndLastPhonesSlowly( synthesisObject.now.phoneCount, function() {
           
            expressionController( expressionObject.abs.talkBase, 0.5 )
        
        } );

    }

}

function pronunciationController( expressionTo, cb ) {

    expressionObject.bool = false;//if other expression delayed, just stop it before calculating absolute position
    expressionObject.now = getAbsoluteCoordsOfExpressionNow();
    expressionObject.movement = createRelativeExpression( expressionTo );
    expressionObject.callback = cb;
    initPronunciation();

}

//// general all-purpose method for all expressions
function initPronunciation() {

    if ( synthesisObject.now.phones[ 0 ][ synthesisObject.now.phoneCount ][ 0 ] === 'v' ) {

        expressionObject.sin = sineArrays[ synthesisObject.now.noOfFramesPerPhone - 1 ];
        expressionObject.sinLength = synthesisObject.now.noOfFramesPerPhone - 1;
    
    } else {

        expressionObject.sinLength = synthesisObject.now.noOfFramesPerPhone;
        expressionObject.sin = sineArrays[ synthesisObject.now.noOfFramesPerPhone ];

    }

    expressionObject.startCount = mainCount;
    expressionObject.bool = true;

}

function showSpeechBubble( sentence, duration ) {

    $('#speakingWordsInside').text( sentence );
    $('#speechBubbleInnerContainer').fadeIn( duration );

}

function removeSpeechBubble( duration ) {

    $( '#speechBubbleInnerContainer' ).fadeOut( 
            
        duration, 
        function() { $( '#speakingWordsInside' ).text( '' ) }
    
    );

}






