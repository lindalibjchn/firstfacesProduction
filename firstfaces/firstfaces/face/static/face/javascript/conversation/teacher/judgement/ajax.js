function storeJudgement() {

    $(document).off( 'keydown' );
    
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

    resetJudgement();

}

