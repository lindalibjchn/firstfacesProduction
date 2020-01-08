function tapKeyFull() {

    let state = 0;
    initMove( armTapObject, [[0,0,0],[0,0.2,-0.2]], 0.3 );

  //console.log('in tapKeyFull');
    function checkIfArmDone() {

        if ( armTapObject.bool ) {

            setTimeout( checkIfArmDone, 100 );

        } else {

            if ( state === 0 ) {
                
                initMove( armTapObject, [[0,0,0],[0,0.2,-0.05]], 0.1 )
                state = 1;   
                setTimeout( checkIfArmDone, 150 );

                // show this a bit early so tap coincides with errors
            } else if ( state === 1 ) {

                initMove( armTapObject, [[0,0,0],[0,0.2,-0.2]], 0.1 )
                state = 2;
                setTimeout( checkIfArmDone, 150 );
        
            } else {

                armTapObject.currentCoords = [[0,0,0],[0,0,0]];
                movementController( movementObject.abs.blank, 0.5, 1.0, startAudioStream );
                dealWithAfterTap();

            }

        }

    }

    setTimeout( checkIfArmDone, 350 );

}

function dealWithAfterTap() {

    $('#closeOverlayArea').prop( "disabled", false);
    $('#submitOverlay').prop( "disabled", false);
    //show play buttons below

    // show john's error box
    if ( conversationVariables.tapKeyForErrors ) {

        conversationVariables.tapKeyForErrors = false;
        expressionController( expressionObject.calculated, tiaTimings.changeExpressionDuration );

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
            $("#backOverlay").fadeIn(750);
        },250);

    // this one is for after listening to the learners speech - Daniel's stuff
    } else {

        if(!conversationVariables.stage2 && !conversationVariables.stage3){
            conversationVariables.trying_again = false;

            if ( conversationVariables.tutorial_complete ) {
            
                buttonsAfterTiaListensToLearnersSentenceAndTaps();

            } else {

                if ( conversationVariables.tutorialStep === '021' ) {

                    tutorialOption031();

                }

            }


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
               var last_trans = "";
               for(i=0;i<$('#upperSentenceHolder').children().length;i++){
                    last_trans += $('#upper_'+i).text().trim()+" ";
               }
               last_trans = last_trans.trim().toLowerCase();
               if(last_trans == conversationVariables.sentence_being_recorded_audio.alternatives[0].transcript.toLowerCase().trim()){
                    setTimeout(function(){
                        nodHeadAndSaySameAfterIdenticalTranscription();
                    },1000);
               }
               $('#upperSentenceHolder').empty();
               $('#lowerSentenceHolder').empty();
            }

            //reset what tia is saying and add back in the two buttons
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
   if (word != "I" && count >= 1){
        word = word.toLowerCase();
   }
   $('#upperSentenceHolder').append("<span id="+idx+"' class='normal-word' >"+word+"</span>");
   $('#upperSentenceHolder').append(" "); 
   idx = "'lower_"+count+"'";
   $('#lowerSentenceHolder').append("<span id="+idx+"' class='hidden-word' >"+word+"</span>");
   $('#lowerSentenceHolder').append(" ");
}
