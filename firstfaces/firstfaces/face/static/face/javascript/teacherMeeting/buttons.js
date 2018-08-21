function sendJudgementToServer( e ) {

    let btnId = e.target.id;

    let promptText = $('#promptText').val();
    
    // only include prompt if there is something in the box
    if ( promptText !== "" ) {
    
        sentencesNeedJudgement[ 0 ].prompt = promptText;

    }

    let wrongIndexesForServer;
    // for correct datatype to be saved in db
    if ( wrongIndexes.length === 0 ) {

        // need null to be None in python
        wrongIndexesForServer = null;

    } else {

        wrongIndexesForServer = wrongIndexes;

    }

    if ( btnId === "correctBtn" ) {

        sentencesNeedJudgement[ 0 ].judgement = "C";
        sentencesNeedJudgement[ 0 ].emotion = teacherVars.emotionState;
        sentencesNeedJudgement[ 0 ].nod = teacherVars.nodShakeBool;
        sentencesNeedJudgement[ 0 ].nodAmount = teacherVars.triangleState[ 0 ];
        sentencesNeedJudgement[ 0 ].nodSpeed = teacherVars.triangleState[ 1 ];
        sentencesNeedJudgement[ 0 ].surprise = teacherVars.surpriseAmount;
        
    } else if ( btnId === "wrongBtn" ) {

        sentencesNeedJudgement[ 0 ].judgement = "I";
        sentencesMaybeNeedUrgentCorrection.push( sentencesNeedJudgement[ 0 ] );

    } else if ( btnId === "moreThanThree" ) {

        sentencesNeedJudgement[ 0 ].judgement = "3";

    } else if ( btnId === "dunnoBtn" ) {

        sentencesNeedJudgement[ 0 ].judgement = "D";

    } else if ( btnId === "betterBtn" ) {

        sentencesNeedJudgement[ 0 ].judgement = "B";
        sentencesNeedJudgement[ 0 ].indexes = wrongIndexesForServer;
        //sentencesNeedJudgement[ 0 ].prompt = null;
        //sentencesNeedJudgement[ 0 ].correction = promptText;
        sentencesNeedJudgement[ 0 ].emotion = teacherVars.emotionState;
        sentencesNeedJudgement[ 0 ].nod = teacherVars.nodShakeBool;
        sentencesNeedJudgement[ 0 ].nodAmount = teacherVars.triangleState[ 0 ];
        sentencesNeedJudgement[ 0 ].nodSpeed = teacherVars.triangleState[ 1 ];
        sentencesNeedJudgement[ 0 ].surprise = teacherVars.surpriseAmount;

        // need to break and show alert if nothing selected or typed
        if ( wrongIndexesForServer === null || promptText === "" ) {

            alert( "need to input indexes and prompt for better" );
            return false;

        }

    } else if ( btnId === "meanByBtn" ) {

        sentencesNeedJudgement[ 0 ].judgement = "M";
        sentencesNeedJudgement[ 0 ].indexes = wrongIndexesForServer;

        // need to break and show alert if nothing selected
        if ( wrongIndexesForServer === null ) {

            alert( "need to input indexes for meanby" );
            return false;

        }

    }

    
    $.ajax({
        url: "/face/store_judgement",
        type: "POST",
        data: { sentMeta: JSON.stringify( sentencesNeedJudgement[ 0 ] ) }, 
        success: function(json) {
           
            s = JSON.parse( json.sent_meta )

            // add judgement to sents in prev sents
            sessions[ s.sess_id ].sentences[ 0 ] = s;

            // remove sentence from array
            //sentencesNeedJudgement.shift();

            updateSentenceObjects();
            updatePrevSentences();
            updateWrongSentences();
            loadNextSentenceNeedingJudgement();

            if ( sentForCorrection === undefined ) { 
            
                updateSentenceForCorrection();
        
            }

        },
        error: function() {
            console.log("that's wrong");
        },

    });

}



function sendCorrectionToServer() {

    sentForCorrection.indexes = correctionIndexes;
    sentForCorrection.correction = $('#wrongText').val();
    
    if ( sentForCorrection.correction === "" ) {

        alert( 'correction is empty' );
        return

    }

    $.ajax({
        url: "/face/store_correction",
        type: "POST",
        data: { sentMeta: JSON.stringify( sentForCorrection ) }, 
        success: function(json) {
           
            s = JSON.parse( json.sent_meta )

            // add correction to sents in prev sents
            //if ( s.sent_id === sessions[ s.sess_id ].sentences[ 0 ].sent_id ) {

                //sessions[ s.sess_id ].sentences[ 0 ] = s;
                //console.log('in store correction if');

            //} else {


            //}

            updateSessionsDictFromServer( correction=true );
                    
                //updateSentenceForCorrection, 500); 

        },
        error: function() {
            console.log("that's wrong");
        },

    });

}
