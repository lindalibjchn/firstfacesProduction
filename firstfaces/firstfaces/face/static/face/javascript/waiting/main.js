$(window).on( 'load', function() {

    addAvailablesToTimetable( waitingVariables.availables )
    addAllScores( waitingVariables.conversations )
    showConversationSentences( waitingVariables.conversations.length - 1 );
    $('.sentence-box').click( showPronunciationDataContainer );
    $('#pronunciationDataContainer').click( hidePronunciationDataContainer );

});

function enterConversation() {

    window.location.href = "/conversation_student/" + waitingVariables.conversation_id.toString();

}







