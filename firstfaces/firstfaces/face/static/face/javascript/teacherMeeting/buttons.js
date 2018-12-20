function sendJudgementToServer( e ) {

    let btnId = e.target.id;

    if ( btnId === "correctBtn" ) {

        if ( emotionClicked() ) {

            sentencesNeedJudgement[ 0 ].judgement = "C";
            sentencesNeedJudgement[ 0 ].emotion = teacherVars.emotionState;
            sentencesNeedJudgement[ 0 ].nod = teacherVars.nodShakeBool;
            sentencesNeedJudgement[ 0 ].nodAmount = teacherVars.triangleState[ 0 ];
            sentencesNeedJudgement[ 0 ].nodSpeed = teacherVars.triangleState[ 1 ];
            sentencesNeedJudgement[ 0 ].surprise = teacherVars.surpriseAmount;
        
        } else {

            alert('click somethin ye eejit!');
            return;

        }

    } else if ( btnId === "wrongBtn" ) {

        sentencesNeedJudgement[ 0 ].judgement = "I";
        sentencesMaybeNeedUrgentCorrection.push( sentencesNeedJudgement[ 0 ] );

    } else if ( btnId === "moreThanThree" ) {

        sentencesNeedJudgement[ 0 ].judgement = "3";

    } else if ( btnId === "dunnoBtn" ) {

        sentencesNeedJudgement[ 0 ].judgement = "D";

    } else if ( btnId === "betterBtn" ) {

        if ( emotionClicked() ) {

            sentencesNeedJudgement[ 0 ].judgement = "B";
            sentencesNeedJudgement[ 0 ].emotion = teacherVars.emotionState;
            sentencesNeedJudgement[ 0 ].nod = teacherVars.nodShakeBool;
            sentencesNeedJudgement[ 0 ].nodAmount = teacherVars.triangleState[ 0 ];
            sentencesNeedJudgement[ 0 ].nodSpeed = teacherVars.triangleState[ 1 ];
            sentencesNeedJudgement[ 0 ].surprise = teacherVars.surpriseAmount;

        } else {

            alert('click somethin ye eejit!');
            return

        }

    } else if ( btnId === "meanByBtn" ) {

        sentencesNeedJudgement[ 0 ].judgement = "M";

    } else if ( btnId === "promptBtn" ) {

        if ( emotionClicked() ) {

            sentencesNeedJudgement[ 0 ].judgement = "P";
            sentencesNeedJudgement[ 0 ].emotion = teacherVars.emotionState;
            sentencesNeedJudgement[ 0 ].nod = teacherVars.nodShakeBool;
            sentencesNeedJudgement[ 0 ].nodAmount = teacherVars.triangleState[ 0 ];
            sentencesNeedJudgement[ 0 ].nodSpeed = teacherVars.triangleState[ 1 ];
            sentencesNeedJudgement[ 0 ].surprise = teacherVars.surpriseAmount;

        } else {

            alert('click somethin ye eejit!');
            return

        }

    }

    $('.judgement-btns').prop('disabled', true);
    
    $.ajax({
        url: "/store_judgement",
        type: "POST",
        data: { sentMeta: JSON.stringify( sentencesNeedJudgement[ 0 ] ) }, 
        success: function(json) {
           
            s = JSON.parse( json.sent_meta )

            // add judgement to sents in prev sents
            sessions[ s.sess_id ].sentences[ 0 ] = s;

            // remove sentence from array
            //sentencesNeedJudgement.shift();

            console.log('s.judgement:', s.judgement);

            if ( s.judgement === "I" || s.judgement === "D" || s.judgement === "3" || s.judgement === "C" ) {

                updateSentenceObjects();
                updatePrevSentences();
                updateWrongSentences();
                loadNextSentenceNeedingJudgement();
                $('.judgement-btns').prop('disabled', false);
                console.log('s.judgement inside:', s.judgement);

                if ( sentForCorrection === undefined ) { 
                
                    updateSentenceForCorrection();
            
                }

            } else {

                console.log('sentence needs prompt');

            }

        },
        error: function() {
            console.log("that's wrong");
        },

    });

}

function emotionClicked() {

    if ( teacherVars.emotionState[0] === 0 && teacherVars.emotionState[1] === 0 && teacherVars.nodShakeBool === null && teacherVars.surpriseAmount === 0 ) {

        return false;

    } else {

        return true;

    }

}

function sendPromptToServer() {

    let sentId = sentencesNeedJudgement[ 0 ].sent_id;
    let promptText = $('#promptText').val();
    let wrongIndexesForServer;
    // for correct datatype to be saved in db
    if ( wrongIndexes.length === 0 ) {

        // need null to be None in python
        wrongIndexesForServer = null;

    } else {

        wrongIndexesForServer = wrongIndexes;

    }

    console.log('wrongIndexesForServer:', wrongIndexesForServer)

    // need to break and show alert if nothing selected or typed
    if ( sentencesNeedJudgement[ 0 ].judgement === "M" ) {

        if ( wrongIndexesForServer === null ) {

            alert( "need to input indexes for Mean By" );
            return false;

        }

    } else if ( sentencesNeedJudgement[ 0 ].judgement === "B" ) {

        console.log( 'wrongIndexesForServer.length:', wrongIndexesForServer.length );

        if ( wrongIndexesForServer === null || promptText === "" || wrongIndexesForServer.length > 1 ) {

            alert( "need to input one set of indexes and a prompt for Better" );
            return false;

        }

    } else if ( sentencesNeedJudgement[ 0 ].judgement === "P" ) {

        if ( promptText === "" ) {

            alert( "need to input prompt for Prompt" );
            return false;

        }

    }

    $.ajax({
        url: "/store_prompt",
        type: "POST",
        data: { 
            sentId: sentId,
            promptText: promptText,
            wrongIndexesForServer: JSON.stringify(wrongIndexesForServer),
        }, 
        success: function(json) {
           
            //s = JSON.parse( json.sent_meta )

            // add judgement to sents in prev sents
            sessions[ sentencesNeedJudgement[0].sess_id ].sentences[ 0 ].prompt = promptText;
            sessions[ sentencesNeedJudgement[0].sess_id ].sentences[ 0 ].indexes = wrongIndexesForServer;

            // remove sentence from array
            //sentencesNeedJudgement.shift();

            updateSentenceObjects();
            updatePrevSentences();
            updateWrongSentences();
            loadNextSentenceNeedingJudgement();

            $('#PBM').css( 'border', 'none' );
            $('.judgement-btns').prop('disabled', false);

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
    
    console.log(' sentForCorrection.indexes:', sentForCorrection.indexes );

    if ( sentForCorrection.correction === "" || sentForCorrection.indexes.length === 0 ) {

        alert( 'correction is empty' );
        return

    }

    $.ajax({
        url: "/store_correction",
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

function highlightPrompt( e ) {

    let eId = e.target.id;
    if ( eId === "promptBtn" ) {

        $('#PBM').css( 'border', '7px solid teal' );
        sentencesNeedJudgement[ 0 ].judgement = "P";

    } else if ( eId === "betterBtn" ) {

        $('#PBM').css( 'border', '7px solid blue' );
        sentencesNeedJudgement[ 0 ].judgement = "B";

    } else if ( eId === "meanByBtn" ) {

        $('#PBM').css( 'border', '7px solid orange' );
        sentencesNeedJudgement[ 0 ].judgement = "M";

    }

}

