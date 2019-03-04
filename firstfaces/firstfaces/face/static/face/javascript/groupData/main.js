
$(window).on( 'load', function() {

    // gets session id's in lit to order the calling of sessions from the sessionsDict
    //getSessionsIdList();
    displayUsernames();

    $('.student-names').on('click', showStudentData);

    $('#whatIsScoresBtn').hover( showScoresExpl, hideScoresExpl );

});

function displayUsernames() {

    let listOfUsernames = Object.keys(groupSessions);

    listOfUsernames.forEach( function(name) {

        $('#studentNamesCont').append(

            "<div id='" + name + "' class='student-names'>" +

                name +

            "</div>"

        )

    })

}

var sessionsDict;
function showStudentData() {

    console.log('username: ', this.id);

    $( '.student-names' ).css( {
        'color': 'white',
        'font-weight': 'normal',
    });
    $( '#' + this.id ).css( {
        'color': 'yellow',
        'font-weight': 'bold',
    });

    sessionsDict = $.extend( true, {}, groupSessions[ this.id ] );
    getSessionsIdList();

    resetCanvas();
    showSentencesBook();
    
}

function showScoresExpl() {

    $('#scoresExplanation').show();
    console.log('show scores');

}

function hideScoresExpl() {

    $('#scoresExplanation').hide()

}


















