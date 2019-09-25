var teacherVars = {};

$(window).on( 'load', function() {

    init(); // load tia
    insertPhones();
    setTeacherVars();
    setAudio();
    setEmotionSurpriseNodShakeEvents();
    setKeydownEvents()
    setButtonEvents();
        
    //checkForChange();
    updateAll();
    
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
    teacherVars.sessions = sessions;
    teacherVars.noSessions = Object.keys( teacherVars.sessions ).length;
    teacherVars.inDevelopment = inDevelopment;
    teacherVars.sentencesNeedJudgement = [];
    teacherVars.emotionWheel = {};
    teacherVars.nodShakeSemiCircle = {};
    resetTempJudgement();
    setPrefixURL()

}

function resetTempJudgement() {

    teacherVars.tempJudgement = {
        judgement: null,
        emotion: null,
        surprise: null,
        nodShake: null,
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
        } else if (e.keyCode == 87 && e.ctrlKey) {
            console.log('Ctrl-W pressed');
            e.preventDefault();
        } else if (e.keyCode == 69 && e.ctrlKey) {
            console.log('Ctrl-E pressed');
            e.preventDefault();
        } else if(e.keyCode == 13 && e.ctrlKey) {
            console.log('Ctrl-Enter pressed');
            e.preventDefault();
            storePromptNConfirmTempJudgementsThenSend();
        }
    });

}

function setButtonEvents() {

    $('.judgement-btns').on( 'click', prepareJudgement );

}

function updateAll() {

    updateSentencesNeedJudgement();
    //updatePrevSentences();
    //updateWrongSentences();
    //updateSentenceForCorrection();
    loadNextSentenceNeedingJudgement();

}

