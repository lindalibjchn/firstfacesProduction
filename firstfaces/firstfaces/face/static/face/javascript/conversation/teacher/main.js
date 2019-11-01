var teacherVars = {};

$(window).on( 'load', function() {

    init(); // load tia
    setTeacherVars();
    setAudio();
    insertPhones();
    setEmotionSurpriseNodShakeEvents();
    setKeydownEvents()
    setButtonEvents();
        
    checkForChange();

    //updateSentencesNeedJudgement();
    //updatePrevSentences();
    
    putNextSentenceNeedingJudgementUpForViewing();    
    resetPhoneColoursNeedJudgement();
    disablePromptBox();

});

$( window ).on( 'resize',  function() {
    
    getLocationOfEmotionWheel();
    getLocationOfNodShakeSemiCircle()
    setPositionOfClickedEmotionWheelMarker(0, 0);
    setPositionOfClickedNodShakeSemiCircleMarker( 0, teacherVars.nodShakeSemiCircleRadius - 4 ) ;

});

function setAudio() {

    teacherVars.aud = document.getElementById('bells')
    teacherVars.aud.src = teacherVars.prefixURL + "media/to-the-point.mp3";

    teacherVars.aud1 = document.getElementById('thud')
    teacherVars.aud1.src = teacherVars.prefixURL + "media/chimes-glassy.mp3";
    
}

function setTeacherVars() {

    teacherVars.checkForChangeCount = 0;
    teacherVars.sentencesNeedJudgement = conversations.sentences_awaiting_judgement;
    teacherVars.sentencesBeingRecorded = conversations.sentences_being_recorded;
    teacherVars.conversations = conversations.all_conversations;
    teacherVars.noSessions = Object.keys( teacherVars.conversations ).length;
    teacherVars.inDevelopment = inDevelopment;
    teacherVars.emotionWheel = {};
    teacherVars.nodShakeSemiCircle = {};
    teacherVars.phoneToStudentId = {};
    teacherVars.studentIdToPhone = {};
    resetTempEmotionStates();
    //teacherVars.mostRecentSentId = calcMostRecentSentId();
    //resetTempJudgement();
    setPrefixURL()

}

function resetTempEmotionStates() {

    teacherVars.tempEmotionStates = {
    
        surprise: 0,
        emotion: [0.1, 0.1],
        nod_shake: [0, 0]

    };

}

//function calcMostRecentSentId() {

    //let mostRecentSentId = 0;

    //Object.keys( teacherVars.conversations ).forEach( function( c ) {

        //if ( teacherVars.conversations[ c ].conversations[ 0 ].sentences.length > 0 ) {

            //if ( teacherVars.conversations[ c ].conversations[ 0 ].sentences[ 0 ].sent_id > mostRecentSentId ) {

                //mostRecentSentId = teacherVars.conversations[ c ].conversations[ 0 ].sentences[ 0 ].sent_id;

            //}

        //}

    //});

    //return mostRecentSentId;

//}

function resetTempJudgement() {

    teacherVars.tempJudgement = {
        judgement: null,
        emotion: null,
        surprise: null,
        nod_shake: null,
        indexes: [],
    }

}

function setPrefixURL() {

    if ( teacherVars.inDevelopment ) {

        teacherVars.prefixURL = "http://127.0.0.1:8000/";

    } else {

        teacherVars.prefixURL = "https://erle.ucd.ie/";

    }

}

function setEmotionSurpriseNodShakeEvents() {

    getLocationOfEmotionWheel();
    $('#emotionWheel').on( 'click', getEmotionCoords );

    getLocationOfNodShakeSemiCircle();
    $('#nodShakeSemiCircle').on( 'click', getNodShakeCoords );

    $( '#surpriseRange' ).change( getSurpriseVal );

    resetEmotionSurpriseNodShakeEvents( true );

}

function setKeydownEvents() {

    // press ` to add wrong areas
    $(document).keydown(function(e) {
        if(e.keyCode == 65 && e.ctrlKey) {
            console.log('Ctrl-A pressed');
            e.preventDefault();
            appendCorrectionSection(true);
        } else if (e.keyCode == 83 && e.ctrlKey) {
            console.log('Ctrl-S pressed');
            e.preventDefault();
            appendCorrectionSection(false);
        } else if (e.keyCode == 81 && e.ctrlKey) {
            console.log('Ctrl-Q pressed');
            e.preventDefault();
            clearCorrection();
        } else if (e.keyCode == 87 && e.ctrlKey) {
            console.log('Ctrl-W pressed');
            e.preventDefault();
            wipeAllCorrections();
        } else if (e.keyCode == 69 && e.ctrlKey) {
            console.log('Ctrl-E pressed');
            clearJudgement();
        } else if (e.keyCode == 77 && e.ctrlKey) {
            console.log('Ctrl-M pressed');
            sendNewInfoToServer();
        } else if(e.keyCode == 13 && e.ctrlKey) {
            console.log('Ctrl-Enter pressed');
            e.preventDefault();
            storePromptThenSend();
        }
    });

}

function setButtonEvents() {

    $('.judgement-btns').on( 'click', prepareJudgement );
    $('.student-info-container').click( focusAddInfo );

}

function disablePromptBox() {

    $( '#promptText' ).attr( 'disabled', true );

}

function enablePromptBox() {

    $( '#promptText' ).attr( 'disabled', false );

}


