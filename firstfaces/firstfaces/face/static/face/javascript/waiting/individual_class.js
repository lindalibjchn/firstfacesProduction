function showConversationSentences( indexOfConversation ) {

    waitingVariables.indexOfCurrentVisibleConversation = indexOfConversation;
    $( '#prevSentsContainer0' ).show();
    addPreviousSentences( waitingVariables.finishedConversationsNotTutorial[ indexOfConversation ], 0, bottom=false );
    $('.sentence-box').click( showPronunciationDataContainer );
    //setUpPreviousSentsBtns( waitingVariables.finishedConversationsNotTutorial[ indexOfConversation ].completed_sentences )
    addData( 'sentences', 'article',  waitingVariables.finishedConversationsNotTutorial[ indexOfConversation ].completed_sentences )

}

function showPronunciationDataContainer() {

    $(' #pronunciationDataContainer' ).fadeIn()

    $('.sentence-box').css( 'border', '2px solid black' );
    $('#' + this.id ).css( 'border', '4px solid black' );

    let sentId = this.id.substring( 12 );

    //console.log( 'sentId:', sentId );
    getIndividualSentencePronunciationData( sentId );

}

function hidePronunciationDataContainer() {

    $(' #pronunciationDataContainer' ).fadeOut();
    $('.sentence-box').css( 'border', '2px solid black' );

}

function getIndividualSentencePronunciationData( sentId ) {
    
    let thisConversationSentences = waitingVariables.finishedConversationsNotTutorial[ waitingVariables.indexOfCurrentVisibleConversation ].completed_sentences;
    console.log( 'thisConversationSentences:', thisConversationSentences );

    let sentence = thisConversationSentences.find( ({ sent_id }) => sent_id === parseInt( sentId ) );

    showIndividualSentencePronunciationData( sentence );

}

function showIndividualSentencePronunciationData( sentence ) {

    console.log('sentence:', sentence)
    $('#pronunciationIndividualSentenceInnerContainer').empty();
    sentence.audiofile_data.forEach( function( a, index ) {

        let transcript = a[ 1 ][ 0 ].transcript;

        if ( transcript !== "" ) {

            addTranscriptBox( transcript, index, a[ 2 ] ); 

        }

    } );

    setEventHandlerForPlayAudioButtons();

}

function addTranscriptBox( trans, index, audioUrl ) {

    $('#pronunciationIndividualSentenceInnerContainer').append( 

        '<div id="transcriptionBox' + index + '" class="transcription-box">' +

            trans +

            '<div class="transcription-audio-tag" id="transcriptionPlayBtnDiv' + index + '">' + 

                '<i class="fa fa-play play-symbol"></i>' +
                
                '<audio id="audioTag' + index + '" src="' + prefixURL + mediaLocation + audioUrl + '">' +
                
                '</audio>' + 

            '</div>' +

        '</div>'



    )

}

function setEventHandlerForPlayAudioButtons() {

    $('.transcription-audio-tag').click( playTranscription );

}

function playTranscription() {

    let ind = this.id.substring(23);
    let transAud = document.getElementById( 'audioTag' + ind );

    transAud.play();

}



