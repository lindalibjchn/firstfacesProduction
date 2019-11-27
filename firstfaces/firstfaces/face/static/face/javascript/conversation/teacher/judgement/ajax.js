function storeJudgement() {
    
    $.ajax({
        url: "/store_judgement",
        type: "POST",
        data: { sentMeta: JSON.stringify( teacherVars.sentencesNeedJudgement[ 0 ] ) }, 
        success: function(json) {
           
            console.log('judgement successfully sent to server')

        },
        error: function() {
            console.log("that's wrong");
        },

    });

    if ( [ 'D', '3' ].includes(teacherVars.sentencesNeedJudgement[ 0 ].judgement) ) {

        $(document).off( 'keydown' );
        resetJudgement();

    }

}

function storeSinglePrompt( promptNumber, promptText ) {

    $.ajax({
        url: "/store_single_prompt",
        type: "POST",
        data: {
            'promptNumber': promptNumber,
            'promptText': promptText,
            'sentMeta': JSON.stringify( teacherVars.sentencesNeedJudgement[ 0 ] ), 
        }, 
        success: function(json) {
           
            console.log('single prompt successfully sent to server')

        },
        error: function() {
            console.log("that's wrong");
        },

    });

    console.log('promptNumber:', promptNumber)
    if ( promptNumber === 2 ) {

        $(document).off( 'keydown' );
        resetJudgement();
    
    }

}


function storeFinal() {
    
    if ( teacherVars.sentencesNeedJudgement[ 0 ].judgement === "P" ) {

        storeSinglePromptBox( false );

    } else {
    
        corrections = getCorrections();

        $.ajax({
            url: "/store_indexes_corrections",
            type: "POST",
            data: { 
                'sentenceID': teacherVars.sentencesNeedJudgement[ 0 ].sent_id,
                'conversationID': teacherVars.sentencesNeedJudgement[ 0 ].conv_id,
                'indexes': JSON.stringify(teacherVars.sentencesNeedJudgement[ 0 ].indexes),
                'corrections': JSON.stringify(corrections),
            }, 
            success: function(json) {
               
                console.log('judgement successfully sent to server')

            },
            error: function() {
                console.log("that's wrong");
            },

        });

        $(document).off( 'keydown' );
        resetJudgement();

    }

}

function getCorrections() {

    let corrections = [];

    if ( $('#promptText0').val() != '' ) {

        corrections.push( $('#promptText0').val() );
    
    }
    if ( $('#promptText1').val() != '' ) {

        corrections.push( $('#promptText1').val() );

    }
    if ( $('#promptText2').val() != '' ) {

        corrections.push( $('#promptText2').val() );

    }

    teacherVars.sentencesNeedJudgement[ 0 ].correction = corrections;
    return corrections

}







