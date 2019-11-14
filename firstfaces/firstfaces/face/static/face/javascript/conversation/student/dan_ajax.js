
//Function sets each of the words as selectable 
function set_selectable(trans){
   // Resets the list of selected words
   selected = [];
   var words = trans.split(" ");
   var i;
   //Make words selectable 
   for(i=0;i<words.length;i++){
        var idx = "#upper_"+i;
        $(idx).attr("class","selectable-word");
   }
   causeFlash();
   //Add on click to words
   var duration = words.length * 125;
   setTimeout(function(){
        $('.selectable-word').attr("onclick","selectErrWord(this.id)");
   },duration);
}

// Calls the forced allignment of audio
function doAllignment(){
    
    let fd = new FormData();                                                    
    fd.append('trans',conversationVariables.sentence_being_recorded_audio.alternatives[0].transcript);                 
    fd.append('fn',conversationVariables.sentence_being_recorded_audio.Aud_Fname);
    fd.append('sessionID',conversationVariables.sentence_being_recorded.conv_id);

    //Makes ajax call creating allignment file and map.json files
    $.ajax({                                                                    
        url: "/do_allignment",                                             
        type: "POST",                                                           
        data: fd,                                                               
        processData: false,                                                     
        contentType: false,                                                     
        success: function(json){  
            console.log("Allignment Worked")
        },
        error: function() {             
            console.log("that's wrong");
        },
    });    


}


// Button clicked after users have selected errored words
$('#forwardErrorSelection').click(function(){
    //Hides non essential buttons
    tag_sentence();
    $('#recordVoiceBtn').fadeOut();
    $('#listenVoiceBtn').fadeOut();
    $('#backCorrection').fadeOut();
    //Sets the length of the original audio in case user goes back
    conversationVariables.totalAudioLength = conversationVariables.sentence_being_recorded_audio.totalAudioLength ;
    //Allignment is done
    doAllignment();
    conversationVariables.usePlayAud = true;
    //Words are looped through and sequential blocks of errored and correct words are place into their own span tags
    conversationVariables.playStage2 = true;
    var words = conversationVariables.sentence_being_recorded_audio.alternatives[0].transcript.split(" ");
    var i = 0;
    conversationVariables.uncorrectedErrors = [];
    var classes = [];
    var newTran = [];
    var tooLong = false;
    while(i < words.length){
        if(selected.includes(i)){
            var curStr = '';
            while(selected.includes(i)){
                curStr = curStr + words[i] + " ";
                i = i+1;
            }
            if(curStr.trim().length > 60){
                tooLong = true;
                break;
            }
            newTran.push(curStr.trim());
            classes.push("uncorrected-error");
        }else{
            var curStr = '';                     
            while(!selected.includes(i) && i < words.length){         
                curStr = curStr + words[i] + " ";
                i = i+1;                         
            }                                    
            newTran.push(curStr);             
            classes.push("normal-word");
        }
        
    }

    // If an error is over 60 characters in length user is returned to the original page
    if(tooLong){
        $('#forwardErrorSelection').hide();
        $('#upperSentenceHolder').empty();
        $('#lowerSentenceHolder').empty();
        
        tiaSpeak("That is too many words, please choose again",true,function(){
            reset_text(conversationVariables.sentence_being_recorded_audio.alternatives['0'].transcript);
            $('#talkBtn').show();
            $('#recordVoiceBtn').show();
            $('#listenVoiceBtn').show();
        });
    }else{
        //empty upper and lower divs
        $('#upperSentenceHolder').empty(); 
        $('#lowerSentenceHolder').empty();
        $('#audioclips').empty();
        conversationVariables.correct_audio= [];
        //add spans and add onclick function to these
        var j = 0;
        conversationVariables.tlen = newTran.length;
        //iterates through each of te new span tags to be added 
        for(j=0;j<newTran.length;j++){
            //Adds the span tag
            addWord(newTran[j],j,classes[j]);
            //If the span is an error it is added to the list of uncorrected errors
            if(classes[j] == 'uncorrected-error'){
                conversationVariables.uncorrectedErrors.push("upper_"+j);
            }else{
                //If its not an error it is appended to the list of correct words
                conversationVariables.correct_audio.push(j);
            }
            //Hidden span tags are added to contain padding
            $('#upperSentenceHolder').append("<span id='hidden_"+j+"' class='hidden-span'></span>");
            //Audio clips are added for each of the span tags, all but the last span call the play next function on ending
            if(j<(newTran.length-1)){
                $('#audioclips').append("<audio id='audio_"+j+"' duration =0 class='temp1' onended='play_nxt("+(j+1)+")'></audio>");
            }
            else{
                $('#audioclips').append("<audio id='audio_"+j+"' class='temp1' duration=0> </audio>");
            }
        }

        //Correcting errror functionality added to errors
        $(".uncorrected-error").attr("onclick","correctError(this.id)");
        //add back button and submit button
        $('#backCorrection').hide();
        $('#forwardErrorSelection').hide();

        //Dictionary is used to store errors userscorrect
        conversationVariables.errors = {};
        //The first error is opened for correction
        animate_open_overlay(conversationVariables.uncorrectedErrors[0]);
    }
});


//Function adds a given string with a gievn class and given id to the upper and lower span tags
function addWord(word, count, cls) {
    var idx = "'upper_"+count+"'";
    $('#upperSentenceHolder').append("<span id="+idx+" class='"+cls+"'>"+word+"</span>");
    $('#upperSentenceHolder').append(" ");
    idx = "'lower_"+count+"'"; 
    $('#lowerSentenceHolder').append("<span id="+idx+" class='hidden-word' >"+word+"</span> ");
}

// If the typing box in the modal is clicked and a speech bubble exists it is removed
$('#bottomCent').click(function(){
    if(conversationVariables.noTransError){                              
        removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
        conversationVariables.noTransError = false;                      
    }                                                                
});

// Function is called if any keys are pressed while the typeable div is in focus
$('#bottomCent').keyup(function(event){
    
    //If a speecg bubble is present it is removed
    if(conversationVariables.noTransError){   
        removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );            
        conversationVariables.noTransError = false;                                  
    }                                                                            


    //If any text is in the box then the submission button is shown
    if($('#bottomCent').text() != ""){
        $('#spectrogramBtn').show(); 
    }else{
        //If not it is hidden
        $('#spectrogramBtn').hide(); 
    }

    //Changes the text size up and down depening on the length of both the error and correction
    if($('#bottomCent').text().trim().length > 40 || $('#centeredErrorText').text().trim().length > 40 ){
        $('#centeredErrorText').removeClass().addClass('small-text'); 
        $('#topCentText').removeClass().addClass('small-text');       
        $('#bottomCent').removeClass().addClass('small-text');        
    }
    else if($('#bottomCent').text().trim().length > 25 || $('centeredErrorText').text().trim().length > 25 ){      
        $('#centeredErrorText').removeClass().addClass('medium-text');
        $('#topCentText').removeClass().addClass('medium-text');      
        $('#bottomCent').removeClass().addClass('medium-text');       

    }
    else if($('#bottomCent').text().trim().length <= 25 && $('centeredErrorText').text().trim().length <= 25){
        $('#centeredErrorText').removeClass().addClass('big-text'); 
        $('#topCentText').removeClass().addClass('big-text');       
        $('#bottomCent').removeClass().addClass('big-text');        
    }

});


// Fucntion is used to open modal overaly for a given error
function correctError(idx){
    //Unnecessary buttons are hidden
    $('#backCorrection').hide();
    $('#recordVoiceBtn').hide();
    //hide text area
    $("#sentenceHolderParent").hide();
    
    currentId = idx;
    //function will make overlay appear
    openOverlay();
   
     //Populate top of overaly with error text
    var errText = $('#'+idx).text().trim();
    //Set necessary variables
    conversationVariables.startIDX = idx.split('_')[1]
    conversationVariables.endIDX = conversationVariables.startIDX 
    //Text size is set by the lenght of the error text
    if(errText.trim().length > 40){
        $('#centeredErrorText').removeClass().addClass('small-text');
        $('#topCentText').removeClass().addClass('small-text');  
        $('#bottomCent').removeClass().addClass('small-text');   
    }
    else if(errText.trim().length > 21 ){
        $('#centeredErrorText').removeClass().addClass('medium-text');
        $('#topCentText').removeClass().addClass('medium-text');
        $('#bottomCent').removeClass().addClass('medium-text');
    }
    else{
        $('#centeredErrorText').removeClass().addClass('big-text');
        $('#topCentText').removeClass().addClass('big-text');      
        $('#bottomCent').removeClass().addClass('big-text');       
    }
    //Text boxes are shown with the errored text 
    $('#overlayErrorText').text(errText);
    $('#centeredErrorText').text(errText);
};



var selected = [];
//Allows for a given word to e selected as beognan error
function selectErrWord(idx){
    //If clicked append number to selected
    var curr = document.getElementById(idx).className;
    if(curr == 'selectable-word' ){
        document.getElementById(idx).className = 'selected-word';
        var num = parseInt(idx.split("_")[1]);
        selected.push(num);
        selected.sort();
        if(selected.length == 1){
            $('#talkBtn').hide();
            $('#forwardErrorSelection').show();
        }
    }
    //if unselected remove from selected
    else{
        var temp = [];
        $('.selected-word').each(function(){
            if(this.id != idx){
                var num = parseInt(this.id.split("_")[1]); 
                temp.push(num);
            }
        });
        selected = temp;
        if(selected.length == 0){
            $('#talkBtn').show();
            $('#forwardErrorSelection').hide();
        }
        selected.sort();
        document.getElementById(idx).className = 'selectable-word';
    }
}


var currentId;
//Done error closes modal and places correction ower modal
function doneError(){  
    if(conversationVariables.thirdAttemptError || conversationVariables.noTransError){             
        removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
        conversationVariables.thirdAttemptError = false;
        conversationVariables.noTransError = false;
    }                                                                 


    var cor = $('#bottomCent').text().trim();
    var err = $('#centeredErrorText').text().trim();
    $('#recordVoiceBtn').hide();
    $('#backCorrection').hide();
    var dif;
    var i;
    var pad = "";
    if(err.length < cor.length){
        dif = cor.length - err.length;
        for(i=0;i<dif;i++){
            pad = pad+"a";
        }
    }
    if(err.length > cor.length){
        dif = err.length - cor.length;
        for(i=0;i<dif;i++){
            pad= pad+"a";
        }
    }

    var idx = parseInt(currentId.split('_')[1]);
    $("#upper_"+idx).text(err);
    $("#upper_"+idx).attr("class","lower-error");
    $("#upper_"+idx).attr("onclick","");
    $("#lower_"+idx).text(cor);
    $("#lower_"+idx).attr("class","corrected-error");
    if(err.length > cor.length){
        //add new span at start
        var next = idx+1;
        var curr = $("#lower_"+next).text();
        $("#lower_"+next).text(curr+pad);
    }
    if(err.length < cor.length){
        $('#hidden_'+idx).text(pad);

        //change span class
    }
    conversationVariables.stage2 = false;
    //close overlay
    $('#correctionOverlay').hide();
    $('#sentenceHolderParent').show();
    $('#bottomCent').empty();
    conversationVariables.uncorrectedErrors = conversationVariables.uncorrectedErrors.filter(e => e !== "upper_"+idx);                                                                             
    //Check if all errors are corrected
    if($('.uncorrected-error').length == 0){
        $('#recordBtnsCont').show();
        $("#talkBtn").show();
        $('#recordVoiceBtn').show();
        $('#backCorrection').show();
    }
    else{
        animate_open_overlay(conversationVariables.uncorrectedErrors[0]);   
    }
    conversationVariables.preSent = getSentence().trim();
    unmoveText(); 

    conversationVariables.correcting = false;
}

//Resets the text back to allowing users pick errored words in transcription
$('#backCorrection').click(function(){
    conversationVariables.playStage2 = false;
    conversationVariables.totalAudioLength = conversationVariables.sentence_being_recorded_audio.totalAudioLength
    var words = conversationVariables.sentence_being_recorded_audio.alternatives[0].transcript.split(" ");
    conversationVariables.uncorrectedErrors = []; 
    // reset divs
    //empty upper and lower divs
    $('#upperSentenceHolder').empty(); 
    $('#lowerSentenceHolder').empty();
    var j = 0;
    for(j=0;j<words.length;j++){
        addWord(words[j],j,'selectable-word');
        var idx = "#upper_"+j;                                               
    }

     causeFlash();                                                      
     var duration = words.length * 125;                                 
     setTimeout(function(){                                             
        $('.selectable-word').attr("onclick","selectErrWord(this.id)");
     },duration);                                                       

    // reset buttons
    $('#talkBtn').show();
    $('#backCorrection').hide();
    $('#listenVoiceBtn').css('display','block');
    selected = [];
    $('#forwardErrorSelection').prop("disabled",false);
    $('#backCorrection').prop("disabled",false);
    $('#incorrectTranscriptBtns').show();
});


//Clsoes the moadal
$('#closeOverlayArea').click(function(){

    closePrevSents();
    closeTimeOverlayCont();
    
    if(conversationVariables.stage2 || conversationVariables.stage3) {
    
        if(conversationVariables.correctionDone){
            undoCorrect();
        }
        
        if(conversationVariables.thirdAttemptError || conversationVariables.noTransError){               
            removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
            conversationVariables.thirdAttemptError = false;  
            conversationVariables.noTransError = false;
        }  
        
        $('#backCorrection').show();
        $('#recordVoiceBtn').show();
        $('#correctionOverlay').hide();
        $('#sentenceHolderParent').show();
        $('#overlayTextBox').empty();
       
        if(conversationVariables.stage3){
            closeStage3();
        }

        conversationVariables.stage2 = false;
        conversationVariables.stage3 = false;

        $('#backCorrection').prop( "disabled", false );
        unmoveText();   
   
    }
});

function closePrevSents() {

    $('#prevSentsContainer').fadeOut();
    $('#prevSentsIconContainer').fadeIn();

}

function closeTimeOverlayCont(){
     $('#prevSentsIconContainer').fadeIn();
     $('#finishClassIcon').fadeIn();
     $('#timeElapsedCont').fadeOut();
     $('#timeOverlayContainer').fadeOut( function(){
      
         $('#dataNFinish').hide();
         $('#confirmFinish').hide();

     });
}


//Allows users to type what they meant to say
$('#keyboardOverlay').click(function(){
    moveText();

    if(conversationVariables.noTransError){   
        removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );            
        conversationVariables.noTransError = false;                                  
    }                                                                            


    $('#submitOverlay').hide();
    $('#keyboardOverlay').hide();
    //clear text area
    $("#bottomCent").empty();
    $("#bottomCent").attr("contenteditable","true")
    //make text area editable
    $('#spectrogramBtn').hide();
    $("#spectrogramBtn").off("click"); 
    $("#spectrogramBtn").click(submitKeyboard);
    setTimeout(function(){
        $("#bottomCent").focus();
    },900);
});

//Allows users to go back after submitting typed correction
$('#backOverlay').click(function(){
    if(conversationVariables.correctionDone){
        undoCorrect();
    }
    if(conversationVariables.thirdAttemptError || conversationVariables.noTransError){       
        removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
        conversationVariables.thirdAttemptError = false;  
        conversationVariables.noTransError = false;
    }                                                                 

    
    $('#centeredError').show();
    $('#centeredError').show();
    $('#overlayErrorBox').hide();
    $('#overlayTextBox').empty();
    $('#overlayTextBox').hide();
    $('#keyboardOverlay').show();
    $('#backOverlay').hide();
    $('#submitOverlay').hide();
    $('#spectrogramBtn').show();
    conversationVariables.stage3 = false;
    conversationVariables.stage2 = true;
    conversationVariables.specClicks = [];
    $('#praatCont').hide();
    //Make Ajax call
    closeStage3();
});

//Open overlay fucntion open necessary elements for overlay tp function
function openOverlay(){
    $('#exitOverlay').hide();
    $('#praatCont').hide();
    $('#closeOverlay').hide();
    $('#submitOverlay').hide();
    $('#overlayErrorBox').hide();
    $('#overlayTextBox').hide();
    $('#backOverlay').hide();
    $('#stopRecordBtn').hide();
    $('#spectrogramBtn').hide();
    $('#correctionOverlay').fadeIn(700);
    unmoveText();
    $('backCorrection').prop( "disabled", true); 
    $('#centeredError').show();
    $('#centeredErrorHolder').show();
    $('#centeredErrorText').show();
    $("#keyboardOverlay").show();
    $("#reRecordBtn").show();
    
    //Says that modal is openl
    conversationVariables.stage2 = true;


    $('#topCent').css('visibility', 'hidden');
    $('#bottomCent').hide();

}

//Function called if user had submitted  typed correction and then attempted to record
function sendAttemptBlob( new_blob ){
    let fd = new FormData();
    fd.append('data',new_blob);
    fd.append('error_pk',conversationVariables.errors[conversationVariables.startIDX]);
    fd.append('sessionID',conversationVariables.conversation_dict.id);
    fd.append('audio_id',conversationVariables.sentence_being_recorded_audio.currentAudID);
    fd.append('correctio_id', conversationVariables.correctionAttemptID);
    fd.append('clicks', conversationVariables.specClicks); 
    fd.append('blob_no_text_sent_id',conversationVariables.sentence_being_recorded.sent_id);

    $.ajax({                                                                                 
        url: "/store_attempt_blob",                                           
        type: "POST",                                                                        
        data: fd,                                                                            
        processData: false,                                                                  
        contentType: false,
        success: function(json){
            //john
            conversationVariables.showingSpectrograms = true;
            prepareToStopTyping();
          
            setTimeout( function(){
                $('#reRecordBtn').show();
                $('#backOverlay').show();
                $("#reRecordBtn").prop( "disabled", false );
                $('#backOverlay').prop("disabled",false);
                var cent_found = false;
                if(json.trans.trim() != ""){
                    $('#hypBtn').show();
                    trans = json.trans;
                    err_trans = $('#refText').text().trim();
                    if(!conversationVariables.Trigram) {
                        document.getElementById("hypImg").src = prefixURL+json.image_url;
                        $("#hypText").text(json.trans);

                        if(json.correct){
                            $('exitOverlay').hide();
                            correct_attempt();
                            setTimeout(function(){
                                $("#hypBtn").css("background-colocent_foundr","green");
                                $("#hypInvisible").css("background-color","green");
                            },500);
                        }
                        else{
                            var sim = parseFloat(json.sim);
                            incorrect_attempt();
                            setTimeout(function(){
                                if(sim <= 0.15){
                                    $('#hypBtn').css("bckgroundColor","#ffaa00");
                                    $('#hypInvisible').css("background-color","#ffaa00");
                                }else{
                                    $('#hypBtn').css({ "background-color" : "red" });
                                    $('#hypBtn').css('backgroundColor', "red");
                                    $("#hypInvisible").css("background-color","#ffcccb");
                                }
                            },900);
                        }

                        //change speed of play






                    }
                    else{

                        $('#hypBtn').hide();
                        t_words = trans.trim().split(" ");
                        $('#transHolder').empty();
                        for(i=0;i<t_words.length;i++){
                            if(t_words[i].toLowerCase().trim() == err_trans.toLowerCase().trim() &&  !cent_found){
                                $('#transHolder').append('<span class="trans_correct" id="trans_'+i+'">'+t_words[i]+"</span>");
                                cent_found = true;
                            }
                            else{
                                $('#transHolder').append('<span class="trans_normal" id="trans_'+i+'">'+t_words[i]+"</span>");
                            }
                        }
                        if(cent_found){
                            $("#refBtn").effect("highlight",{color: '#7CF00'},2500);
                            $('#reRecordBtn').hide();
                            $('#sliderHolder').css('visibility','visible');
                            $('#submitOverlay').show();
                            $("#submitOverlay").off("click");
                            if(t_words.length == 1){
                                $("#submitOverlay").click(submitCorrect);
                            }
                            else{
                                $("#submitOverlay").click(function(){

                                    $('#exitOverlay').click();
                                });
                            }
                            $('#backCorrection').prop("disabled",false);
                            $('#backOverlay').prop("disabled",false);
                        }
                    }

                    document.getElementById('hypAudio').src = prefixURL+json.audio_url;
                    conversationVariables.hypLenOriginal = json.hypLen;
                    conversationVariables.hypLen = json.hypLen/conversationVariables.playspeed;
                    document.getElementById('hypAudio').playbackRate = conversationVariables.playspeed;
                    conversationVariables.attemptCount +=1;
                    if(conversationVariables.attemptCount == 3 && (!json.correct && !cent_found)){
                        //Tia says you can give up
                        disableBtns();
                        conversationVariables.thirdAttemptError = true;
                        //tiaSpeak("If you are struggling you can try again another time", cont=true,function(){console.log("Worked")});
                        ('#exitOverlay').show();
                    }
            }
            else{
                dealWithBlankTranscription();   
                conversationVariables.noTransError = true;
                $('#backOverlay').prop('disabled',false);
            }
            conversationVariables.correctionAttemptID = json.att_id; 
            }, 1000);

        },
        error: function() {                                                                  
            console.log("that's wrong");                                                     
        },                                                                                   
   });
}

//Function is called if user preses back or closes overlay after typing and not submittitng correction
function closeStage3(){
    let fd = new FormData();
    fd.append('sessionID',conversationVariables.conversation_dict.id);
    fd.append('blob_no_text_sent_id',conversationVariables.sentence_being_recorded.sent_id);
    fd.append('start_idx',conversationVariables.startIDX);
    fd.append('error_pk',conversationVariables.errors[conversationVariables.startIDX]);
    fd.append('audio_id',conversationVariables.sentence_being_recorded_audio.currentAudID);
    fd.append('correctio_id', conversationVariables.correctionAttemptID);
    fd.append('clicks', conversationVariables.specClicks);
    $.ajax({                                                                                 
        url: "/close_attempt",                                                            
        type: "POST",                                                                        
        data: fd,                                                                            
        processData: false,                                                                  
        contentType: false,
        success: function(){ 
            console.log("success");
        },
        error: function() {                                                                  
            console.log("that's wrong");                                                     
        },                                                                                   
    });
}

//Function for returning pronunciation feedback
function getPronunciationErrors(){
    let fd = new FormData()
    fd.append('session_id',conversationVariables.conversation_dict.id);

    $.ajax({
        url: "/get_pronunciation_errors",
        type:"POST",
        data:fd,
        processData:false,
        contentType:false,
          success: function(json){
            var wordcloud = prefixURL+json['wordcloud']
            document.getElementById('pronunImg').src = wordcloud
        },
        error: function() {
            console.log("That's wrong");
        },

    });
}

//Function is called if user tries to rerecord audio
function sendErrorBlobToServer( new_blob ){

    let fd = new FormData();
    fd.append('data',new_blob);
    fd.append('sessionID',conversationVariables.conversation_dict.id);
    fd.append('blob_no_text',conversationVariables.blob_no_txt);
    fd.append('blob_no_text_sent_id',conversationVariables.sentence_being_recorded.sent_id);
    fd.append('error_list',JSON.stringify(conversationVariables.errors));
    fd.append('start_idx',conversationVariables.startIDX);
    fd.append('audio_id',conversationVariables.sentence_being_recorded_audio.currentAudID);
    fd.append('trans', $('#centeredErrorText').text().trim());

    $.ajax({
        url: "/store_error_blob",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(json){
            /*returnFromListenToSentence();   John Not sure where this has gone*/
            //add index an foregin key to the errors
            conversationVariables.errors[json['error_start']] = json['error_pk'];
            prepareToStopTyping();
            //display transcript
            if(json['error_trans'] != ""){
                moveText();
                setTimeout(function(){
                    $('#bottomCent').text(json['error_trans']);
                    $("#bottomCent").attr("contenteditable",false);


                    setTimeout(function(){
                        $("#submitOverlay").fadeIn();
                        $("#reRecordBtn").fadeIn();
                        $("#reRecordBtn").prop( "disabled", false );
                        $("#keyboardOverlay").fadeIn();

                        document.getElementById('audio_'+json['error_start']).src = prefixURL+json.audio_url;
                        $('#audio_'+json['error_start']).attr('duration',json.audio_len);
                    },800);
                },500);
                $('#overlayTextBox').text(json['error_trans']);
                //show mic
                $("#submitOverlay").off("click");
                $("#submitOverlay").click(submitRecording);
                //make textbox not editable
                $("#overlayTextBox").attr("contenteditable",false);
                //save last transcription into class
           }else {
               dealWithBlankTranscription();
               conversationVariables.noTransError = true;
               $('#backOverlay').prop('disabled',false);
               $("#reRecordBtn").show().prop( "disabled", false );
               $("#keyboardOverlay").show();
           }
           conversationVariables.lastAttemptID = json['attempt_pk'];  
        },
        error: function() {
            console.log("that's wrong");
        },
    });
}



//Keyboard and record have different submit funtionalities
//Function plays audio and contols animation used while audio is played fr both spectograms
$('#refBtn').click(function(){
    disableBtns();
    if(conversationVariables.thirdAttemptError || conversationVariables.noTransError){
        removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
        conversationVariables.thirdAttemptError = false;
        conversationVariables.noTransError = false;
    }
    //Store click
    conversationVariables.specClicks.push(JSON.stringify({"synth":Date.now() / 1000}));
    //disable other buttons during playing
    //hide text
    //$('#refText').hide();
    //animation
   //document.getElementById("refAudio").play();
   tiaSpeak('Ref_Word', cont=true);
   //$("#refInvisible").css("margin-left","-10px");
   //$('#refInvisible').css({"border-left":"10px solid black"});
   //$('#refInvisible').animate({width:"0"},conversationVariables.refLen);
   //setTimeout(function(){
     //   $("#refInvisible").css("border-left","none");
       // $('#refText').fadeIn(800);
       // $('#refInvisible').css("width","100%");
        //enableBtns();
   //},(conversationVariables.refLen+100));
});

$('#hypBtn').click(function(){
    if(conversationVariables.thirdAttemptError || conversationVariables.noTransError){
        removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
        conversationVariables.thirdAttemptError = false;
        conversationVariables.noTransError = false;
    }

    disableBtns();
    //store click
    conversationVariables.specClicks.push(JSON.stringify({"user":Date.now() / 1000}));
    //hide text
    $('#hypText').hide();
    document.getElementById("hypAudio").play();
    $("#hypInvisible").css("margin-left","-10px");
    $('#hypInvisible').css({"border-left":"10px solid black"});
    $('#hypInvisible').animate({width:"0"},conversationVariables.hypLen);             
    setTimeout(function(){   
        $("#hypInvisible").css("border-left","none");                                       
        $('#hypText').fadeIn(800);                                                     
        $('#hypInvisible').css({"width":"100%"});
        enableBtns();
   },(conversationVariables.hypLen+100));  
});

$('#transHolder').click(function(){
    document.getElementById("hypAudio").play();
});


//Keyboard sumbit
function submitKeyboard(){

    tiaLookAtLaptopAndType();

    //hide other buttons
    $('#reRecordBtn').fadeOut();
    $('#keyboardOverlay').fadeOut();
    $('#submitOverlay').fadeOut();
    $('#spectrogramBtn').fadeOut();
    $('#backOverlay').prop("disabled",false);

    var trans = $('#bottomCent').text().trim();
    var err_trans = $('#centeredErrorText').text().trim();
    conversationVariables.attemptCount = 0; 
    let fd = new FormData();
    fd.append("attempt_pk",conversationVariables.lastAttemptID);
    fd.append("trans",trans);
    fd.append("etrans",err_trans);
    fd.append('error_list',JSON.stringify(conversationVariables.errors));                        
    fd.append('start_idx',conversationVariables.startIDX);                                       
    fd.append('audio_id',conversationVariables.sentence_being_recorded_audio.currentAudID);
    if(!conversationVariables.goToStage3){
                fd.append('gender', conversationVariables.gender);
    }else{
        fd.append('gender', 'F');
    }
    fd.append('pitch', synthesisObject.pitch);
    fd.append('speaking_rate', synthesisObject.speaking_rate);
    fd.append('sessionID',conversationVariables.conversation_dict.id);
    var val = 0;
    var i;
    for(i=0;i<parseInt(conversationVariables.startIDX);i++){
        val = val +  $('#upper_'+i).text().trim().split(" ").length;
    }
    fd.append("first_word_id",val);
    $.ajax({
        url: "/error_typing_used",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(json){


            // john
            //  tia taps and looks at student
            conversationVariables.showingSpectrograms = true;
            prepareToStopTyping();

            //$('#reRecordBtn').show();

            var refAudioURL = prefixURL + json.ref_audio_url;
            var refAudio = document.getElementById("refAudio");
            refAudio.src = refAudioURL;
            //refAudio.play();

            var hyp_audio_url = prefixURL + json.hyp_audio_url;
            var hypAudio = document.getElementById("hypAudio");
            hypAudio.src = hyp_audio_url;
            
            var ref_image_url =prefixURL+json.ref_image_url; 
            var refImage = document.getElementById("refImg");
            refImg.src = ref_image_url;

            var hyp_image_url = prefixURL + json.hyp_image_url;
            var hypImage = document.getElementById("hypImg");
            hypImg.src = hyp_image_url;
            
            $("#hypText").text(err_trans);
            $("#refText").text(trans);
            
            /**if(err_trans.trim().length <= 18 && trans.trim().length <= 18){
                $("#hypText").removeClass().addClass('big-text');
                $("#refText").removeClass().addClass('big-text'); 
            }
            else{
                if(err_trans.trim().length > 25 || trans.lenght > 25){
                    $("#hypText").removeClass().addClass('small-text');
                    $("#refText").removeClass().addClass('small-text');
                }
                else{
                    $("#hypText").removeClass().addClass('medium-text');
                    $("#refText").removeClass().addClass('medium-text');
                }
            }**/
             $("#hypText").removeClass().addClass('small-text');
             $("#refText").removeClass().addClass('small-text');

            $("#overlayErrorBox").hide();                                                    
            $("#overlayTextBox").hide();
            $('#centeredError').hide();
            // john - moving this to tapKeyFull()
            //$("#praatCont").fadeIn(800);
            $("#submitOverlay").hide();

            var sim = parseFloat(json.sim);
            if(sim <= 0.15){
                $('#hypBtn').css("background-color","#ffaa00");
                $('#hypInvisible').css("background-color","#ffaa00");
            }
            else{
                $('#hypBtn').css("background-color","red");                 
                $('#hypInvisible').css("background-color","#ffcccb");           
            }

        
            conversationVariables.specClicks = [];
            conversationVariables.stage3 = true;
            conversationVariables.stage2 = false;
            conversationVariables.correctionAttemptID = json.aeca_id;

            //add error id to errors
            conversationVariables.errors[conversationVariables.startIDX] = json.ae_id;

            //save lenghts of both audio files
            conversationVariables.refLen = json.ref_length/conversationVariables.playspeed;
            conversationVariables.hypLen = json.hyp_length/conversationVariables.playspeed;
            //change speed of play
            document.getElementById('hypAudio').playbackRate = conversationVariables.playspeed;
            document.getElementById('refAudio').playbackRate = conversationVariables.playspeed;

            conversationVariables.hypLenOriginal = json.hyp_length;
            conversationVariables.refLenOriginal = json.ref_length;

            
            var finAudio = document.getElementById("audio_"+conversationVariables.startIDX);             
            finAudio.src = hyp_audio_url;                                     
            $('#audio_'+conversationVariables.startIDX).attr('duration',json.hyp_length);
            get_word_context();
            if(!conversationVariables.goToStage3){
                closeStage3();
                $('#exitOverlay').click();
            }
        },
        error: function() {
            console.log("that's wrong"); 
        },
    });
}

// Function is called if user only uses rerecording functionality
function submitRecording(){

    var trans = $('#overlayTextBox').text().trim();
    let fd = new FormData();
    fd.append("attempt_pk",conversationVariables.lastAttemptID);
    fd.append("error_pk",conversationVariables.errors[conversationVariables.startIDX]);
    fd.append("trans",trans);

    $.ajax({
        url: "/error_recording_used",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(json){
            prepareToStopTyping();
            doneError();                                  
            unmoveText();                                                 
            $('#backCorrection').prop("disabled",false);  
            $('#talkBtn').prop("disabled",false);         

        },
        error: function() {
            console.log("that's wrong");
        },
    });
}

//Function controls the animation of the spectograms if a correct attempt is made
function correct_attempt(){
    var middle = $('#refBtn').offset().top;
    $('#reRecordBtn').hide(); 
    var bottom = $('#hypBtn').offset().top;
    $('#sliderHolder').css('visibility','hidden');
    var diff = (bottom-middle)/2;
    conversationVariables.animationDistance = diff;
    $('#refTextLayer').hide();   
    $('#hypTextLayer').hide();

    $('#refBtn').animate({top:'+='+diff+"px"});
    $('#hypBtn').animate({top:'-='+diff+"px"});
    
    setTimeout(function(){
       $("#refBtn").effect("highlight",{color: '#7CF00'},2500);
       $("#hypBtn").effect("highlight",{color: '#7CF00'},2500);
    }, 1000);

    setTimeout(function(){
       $('#refBtn').css('visibility', 'hidden');
       $('#hypTextLayer').fadeIn(800);
    },2500);
    conversationVariables.correctionDone = true;
   
    //disable mic
    $('#reRecordBtn').hide();
    setTimeout(function(){
    //show submit
    $('#reRecordBtn').hide();
    $('#sliderHolder').css('visibility','visible');
    $('#submitOverlay').show();
    $("#submitOverlay").off("click");                                                
    $("#submitOverlay").click(submitCorrect);
    $('#backCorrection').prop("disabled",false);
    $('#backOverlay').prop("disabled",false);
    },3500);
}

//Function contols the animation of spectograms if attempt has been incorrect
function incorrect_attempt(){
    var middle = $('#refBtn').offset().top;                                                 
    var bottom = $('#hypBtn').offset().top;
    $('#sliderHolder').css('visibility','hidden');
    var diff = (bottom-middle)/2;
    disableBtns();
    $('#refTextLayer').hide();
    $('#hypTextLayer').hide();

    $('#refBtn').animate({top:'+='+diff+"px"});
    $('#hypBtn').animate({top:'-='+diff+"px"});
    setTimeout(function(){
        $('#refBtn').effect("shake",{direction:"ip",times: 4, distance: 2}, 500);
        $('#hypBtn').effect("shake",{direction:"ip",times: 4, distance: 2}, 500);
    },500);
    setTimeout(function(){
        $('#refBtn').animate({top:'-='+diff+"px"});
        $('#hypBtn').animate({top:'+='+diff+"px"}); 
    },1700);

    setTimeout(function(){
        $("#refTextLayer").fadeIn(800);
        $("#hypTextLayer").fadeIn(800);
        enableBtns();
        $('#sliderHolder').css('visibility','visible');
    },2000)
}


//Function allows users to submit correction 
function submitCorrect(){
    //Sets corrected audio for error
    document.getElementById('audio_'+conversationVariables.startIDX).src = document.getElementById('hypAudio').src;
    $('#audio_'+conversationVariables.startIDX).attr('duration',conversationVariables.hypLenOriginal);
    doneError();
    //Resets text movement and spectograms
    $('#backCorrection').prop("disabled",false);
    $('#talkBtn').prop("disabled",false); 
    undoCorrect();
    unmoveText();
}

// Fucntion resets the modal to its original state
function undoCorrect(){
    $('#refBtn').show();
    $('#refTextLayer').show();
    $('#refBtn').animate({top:'-='+conversationVariables.animationDistance+"px"});         
    $('#hypBtn').animate({top:'+='+conversationVariables.animationDistance+"px"});
    $('#refImg').show();                                                             
    $('#hypTextLayer').show();
    conversationVariables.correctionDone = false;
    //$("#hypBtn").css("background-color","red");          
    //$("#hypInvisible").css("background-color","#ffcccb");
    $('#submitOverlay').hide();
    $('#refBtn').css('visibility', 'visible');
    $('#reRecordBtn').prop( "disabled", false);
}

//Function is used to remove the fuctionality of buttons while audio plays
function disableBtns(){
    $('#submitOverlay').prop( "disabled", true);
    $('#sliderHolder').css('visibility','hidden');
    $('#reRecordBtn').hide();
    $('#backOverlay').hide();
    $('#refBtn').prop( "disabled", true);
    $('#hypBtn').prop( "disabled", true);
    $('#closeOverlayArea').prop( "disabled", true);    
}

//Function is used to reinstate the fucntionality to the buttons while audio plays
function enableBtns(){
    $('#submitOverlay').prop( "disabled", false);                       
    $('#reRecordBtn').show();                                             
    $('#backOverlay').show();
    $('#sliderHolder').css('visibility','visible');
    $('#refBtn').prop( "disabled", false);   
    $('#hypBtn').prop( "disabled", false);                      
    $('#closeOverlayArea').prop( "disabled", false);
    $('#backOverlay').prop( "disabled", false);
}

//Gets the current setnece including corrections made to any errors
function getSentence(){
    var words = conversationVariables.sentence_being_recorded_audio.alternatives[0].transcript.split(" ");
    var curr = 0;
    var i = 0;
    var out= "";
    while(i<words.length){
        if($('#upper_'+curr).attr("class") == 'lower-error'){
             i += $('#upper_'+curr).text().split(" ").length;
             out += $('#lower_'+curr).text()+" "; 
        }
        else{
            i+=1;
            out += $('#upper_'+curr).text()+" ";
        }
        curr++;
    }
    return out;
}

//Slider for changing the playback speed of the spectogram buttons
var slider = document.getElementById("myRange");
slider.oninput = function() { 
    var val = (20 + parseInt(this.value));
    $('#sliderVal').text(val+"%");
    val = val / 100;
    conversationVariables.playspeed = val;
    //change animation amoutns
    conversationVariables.hypLen = conversationVariables.hypLenOriginal/val;
    conversationVariables.refLen = conversationVariables.refLenOriginal/val;

    document.getElementById('refAudio').playbackRate = val;
    document.getElementById('hypAudio').playbackRate = val;
    conversationVariables.specClicks.push(JSON.stringify({"speed":Date.now() / 1000,"val":val}));

}

//Moved the centered error text to the top of the modal to facilitate typing 
function moveText(){
    conversationVariables.movedText = true;
    var to = $('#topCentText').offset().top;
    var from  = $('#moveText').offset().top;
    var dif_v = from - to;
    conversationVariables.textDiff = dif_v;
    $('#moveText').animate({top:'-='+dif_v+"px"},800);
    setTimeout(function(){
        $('#bottomCent').show(); 
        //$('#bottomCent').focus();
    },900);
}

//If the text has been moved up it is now moved back to its original position
function unmoveText(){
    if(conversationVariables.movedText){
        $('#moveText').animate({top:'+='+conversationVariables.textDiff+"px"},1);
        conversationVariables.movedText = false;
    }
}


//Function flashes the border of each word in the transcription
function causeFlash(){
    
    // if learner clicks 'try again' then there is no sentence in the transcripts, so need to do the following to get the text
    var words;
    if ( $.isEmptyObject(conversationVariables.sentence_being_recorded_audio) ) {
    
        words = makeStringSentFromArray(conversationVariables.conversation_dict.completed_sentences[0].sentence);

    } else {

        words = conversationVariables.sentence_being_recorded_audio.alternatives[0].transcript.split(" ").length;
    
    }

    flash(0,words);

}

//Function flashes the border of all words whos idx is between i and max
function flash(i,max) {
    if (i == max) return;
    setTimeout(function () {
        var idx = "#upper_"+i;
        flashBorder(idx);
        flash(++i,max);
    }, 60);
}

//Function causes border of span tag to flash a lighter colour 
function flashBorder(id){
    $(id).css('border-color','#eeee90');
    setTimeout(function(){
        $(id).css('border-color','green'); 
    },125);
}


// Function aniimates the opening of the overlay
function animate_open_overlay(err_id){
    setTimeout( function() {
        //Buttuns hidden till modal is opened
        $('#backCorrection').hide();
        $('#recordVoiceBtn').hide();
        
        conversationVariables.correcting = true;
        var original_color = 'yellow';
        var new_color = 'black';
        //Span tags flash
        $('#'+err_id).css({"background-color":new_color,"color":original_color});
        setTimeout(function(){
            $('#'+err_id).removeAttr( 'style' );
        },400);
        //open overlay
        setTimeout(function(){
            correctError(err_id)
            
        },1000);
        //Once the verlay is opened the buttons underneath appear again
        setTimeout(function(){
            $('#backCorrection').show();
            $('#recordVoiceBtn').show();
        },2000);

    }, 750 );
}


//Function resets the transcription 
function reset_text(trans){
    $('#sentenceHolderParent').show();
    $('#upperSentenceHolder').empty();
    $('#lowerSentenceHolder').empty();
    populateDivsNewTrans(trans);
    $('#listenVoiceBtn').hide();
    $('#backCorrection').hide();
    setTimeout( set_selectable(trans) , 1200);
}

//Function plays the first audio file which in turn plays the  rest
function play_audio(){
    document.getElementById("audio_0").play();
}

//Function plays the next audio clip
function play_nxt(val){
    document.getElementById("audio_"+val).play();
}

//Exit overlay button is called when user is unable to correct the word
$('#exitOverlay').click(function(){
    //Sets the audio for the error as the synthesised audio
    document.getElementById('audio_'+conversationVariables.startIDX).src = document.getElementById('refAudio').src;
    document.getElementById('audio_'+conversationVariables.startIDX).volume = 0.7;
    $('#audio_'+conversationVariables.startIDX).attr('duration',conversationVariables.refLenOriginal);
    //Closes modal overlay
    doneError();
    $('#backCorrection').prop('disabled',false);
    $('#recordVoiceBtn').prop('disabled',false);
    $('#talkBtn').prop('disabled', false);

    //If speech bubble is present ir is now closed
    if(conversationVariables.thirdAttemptError || conversationVariables.noTransError){              
        removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
        conversationVariables.thirdAttemptError = false;                 
        conversationVariables.noTransError = false;
    }                                                                 


});


// Gets the audio summed audio length for the words for the muxed audio
function getAudioLength(){
    var i;
    var count = 0;
    for(i=0;i<$('.temp1').length;i++){
        count = count +  parseFloat($('#audio_'+i).attr('duration'));
    }
    if(count == null){
        count = conversationVariables.sentence_being_recorded_audio.totalAudioLength
    }
    conversationVariables.totalAudioLength = count;
}



