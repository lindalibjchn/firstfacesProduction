function showConversationSentences( indexOfConversation ) {

    waitingVariables.indexOfCurrentVisibleConversation = indexOfConversation;
    $( '#prevSentsContainer0' ).show();
    addPreviousSentences( waitingVariables.conversations[ indexOfConversation ], 0, bottom=false );
    $('.sentence-box').click( showPronunciationDataContainer );
    setUpPreviousSentsBtns( waitingVariables.conversations[ indexOfConversation ].completed_sentences )
    addData( 'sentences', 'article',  waitingVariables.conversations[ indexOfConversation ].completed_sentences )

}

function showPronunciationDataContainer() {

    $(' #pronunciationDataContainer' ).fadeIn()

    $('.sentence-box').css( 'border', '2px solid black' );
    $('#' + this.id ).css( 'border', '4px solid black' );

    let sentId = this.id.substring( 12 );

    getIndividualSentencePronunciationData( sentId );

}

function hidePronunciationDataContainer() {

    $(' #pronunciationDataContainer' ).fadeOut();
    $('.sentence-box').css( 'border', '2px solid black' );

}

function getIndividualSentencePronunciationData( sentId ) {
    
    let thisConversationSentences = waitingVariables.conversations[ waitingVariables.indexOfCurrentVisibleConversation ].completed_sentences;

    let sentence = thisConversationSentences.find( ({ sent_id }) => sent_id === parseInt( sentId ) );

    showIndividualSentencePronunciationData( sentence );

}

function showIndividualSentencePronunciationData( sentence ) {

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



