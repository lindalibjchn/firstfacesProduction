function showConversationSentences( indexOfConversation ) {

    //console.log('index of conversation:', indexOfConversation);
    let idOfThisConversation = waitingVariables.conversation[ indexOfConversation ];
    //console.log('idOfThisConversation:', idOfThisConversation );
    let conversation = waitingVariables.conversations_dict[ idOfThisConversation ];
    //console.log('conversation:', conversation);
    $( '#prevSentsContainer0' ).show();
    addPreviousSentences(conversation, 0, bottom=false );

}

function showPronunciationDataContainer() {

    $(' #pronunciationDataContainer' ).fadeIn()

    $('.sentence-box').css( 'border', '2px solid black' );
    $('#' + this.id ).css( 'border', '4px solid black' );

    let sentId = this.id.substring( 12 );
    console.log( 'sentId:', sentId );

    showIndividualSentencePronunciationData( sentId );

}

function showIndividualSentencePronunciationData( sentId ) {


}

function hidePronunciationDataContainer() {

    $(' #pronunciationDataContainer' ).fadeOut();
    $('.sentence-box').css( 'border', '2px solid black' );

}
