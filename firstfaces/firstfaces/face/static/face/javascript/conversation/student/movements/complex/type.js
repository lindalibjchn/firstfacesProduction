function tapKeyFull() {

    let state = 0;
    initMove( armTapObject, [[0,0,0],[0,0.2,-0.2]], 0.5 );

    function checkIfArmDone() {

        if ( armTapObject.bool ) {

            setTimeout( checkIfArmDone, 100 );

        } else {

            if ( state === 0 ) {
                
                initMove( armTapObject, [[0,0,0],[0,0.2,-0.15]], 0.1 )
                state = 1;   
                setTimeout( checkIfArmDone, 150 );

            } else if ( state === 1 ) {

                initMove( armTapObject, [[0,0,0],[0,0.2,-0.2]], 0.1 )
                state = 2;
                setTimeout( checkIfArmDone, 150 );
        
            } else {

                dealWithAfterTap();


                //initMove( armTapObject, [[0,0,0],[0,0,0]], 0.8 )

            }

        }

    }

    setTimeout( checkIfArmDone, 550 );

}

function dealWithAfterTap() {

    movementController( movementObject.abs.blank, '0.5', '1.5' );

    $('#closeOverlayArea').prop( "disabled", false);
    $('#submitOverlay').prop( "disabled", false);
    //show play buttons below

    // show john's error box
    if ( conversationVariables.tapKeyForErrors ) {

        conversationVariables.tapKeyForErrors = false;

        // display errors
        showWrongSentence();

    } else if ( conversationVariables.tapKeyForCorrection ) {

        conversationVariables.tapKeyForCorrection = false;
        showCorrectionUnderWrongSent();

    } else if ( conversationVariables.showingSpectrograms ) {

        conversationVariables.showingSpectrograms = false;
        $("#praatCont").fadeIn(800);
        setTimeout(function(){
            $("#reRecordBtn").fadeIn(800);
        },200);
        setTimeout(function(){
            $("#backOverlay").fadeIn(800);
        },400);                           

    // this one is for after listening to the learners speech - Daniel's stuff
    } else {

        if(!conversationVariables.stage2 && !conversationVariables.stage3){

            $('.play-btn').prop( "disabled", false);
            $('#talkBtn').prop( "disabled", false);
            $('#recordVoiceBtn').show();

            if (($(".selectable-word").length > 0)||($(".selected-word").length >0)){
                //reset text
                //$('#tia-speech-box').text("Is this what you meant to say?");
                //hide backward and forward buttons
                $('#backErrorSelection').hide();
                $('#forwardErrorSelection').hide();
            }
            if(($(".uncorrected-error").length > 0)|| ($(".corrected-error").length > 0) ){
                //reset speech
                //$("#tia-speech-box").text("Is this what you meant to say?");
                //hide buttons
                $("#submitCorrectedErrors").hide();
                $("#backCorrection").hide();
            }
            
            if ( $('#upperSentenceHolder').children().length > 0 ) {
               $('#upperSentenceHolder').empty();
               $('#lowerSentenceHolder').empty();
            }

            //reset what tia is saying and add back in the two buttons
            $('.play-btn').prop( "disabled", false);
            $('#talkBtn').prop( "disabled", false);
            $('#recordVoiceBtn').show();
            
            //Daniel

            $('#talkBtn').show();
            //change correct transcipt to #talkBtn
            //$('#correctTranscript').show();
            //Adding speech bubble for tia 

            //Displaying hypothesised transcript
            $('#textInputContainer').show();
            $('#sentenceShowHolder').show();
            //$('#speechBubbleCont').show();
              
            populateDivs();
                
            setTimeout( set_selectable(conversationVariables.sentence_being_recorded_audio.alternatives[0].transcript) , 1200);   
        
        }

    }

}

//fucntion to populate the output box with transcript
function populateDivs() {
    var words = conversationVariables.sentence_being_recorded_audio.alternatives[0].transcript.split(" ");
    words.forEach(addWords);
    $('#listenVoiceBtn').show();
}
function populateDivsNewTrans(trans){
    var words = trans.split(" ");
    words.forEach(addWords);                                            
    $('#listenVoiceBtn').show();                                        
}

function addWords(word,count) {
   var idx = "'upper_"+count+"'";
   $('#upperSentenceHolder').append("<span id="+idx+"' class='normal-word' >"+word+"</span>");
   $('#upperSentenceHolder').append(" "); 
   idx = "'lower_"+count+"'";
   $('#lowerSentenceHolder').append("<span id="+idx+"' class='hidden-word' >"+word+"</span>");
   $('#lowerSentenceHolder').append(" ");
}
