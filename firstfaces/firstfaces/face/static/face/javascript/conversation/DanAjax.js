
function set_selectable(trans){
   selected = [];
   var words = trans.split(" ");
   var i;
   //Make words selectable 
   for(i=0;i<words.length;i++){
   var idx = "#upper_"+i;
   $(idx).attr("class","selectable-word");
   }
   causeFlash();
   var duration = words.length * 125;
   setTimeout(function(){
    $('.selectable-word').attr("onclick","selectErrWord(this.id)");
   },duration);
}

function doAllignment(){
    let fd = new FormData();                                                    
    fd.append('trans',conversationVariables.alternatives[0].transcript);                 
    fd.append('fn',conversationVariables.Aud_Fname);   
    fd.append('sessionID',conversationVariables.session_id);


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


$('#forwardErrorSelection').click(function(){
    $('#recordVoiceBtn').hide();
    $('#backCorrection').hide();
    conversationVariables.originalLength = conversationVariables.totalAudioLength;
    conversationVariables.totalAudioLength = 0;
    doAllignment();
    conversationVariables.usePlayAud = true;
    //loop through selected words, amalgamate sewuential errors into one
    conversationVariables.playStage2 = true;
    var words = conversationVariables.alternatives[0].transcript.split(" ");
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
            newTran.push(curStr);
            classes.push("uncorrected-error");
        }else{
            newTran.push(words[i]);
            classes.push("normal-word");
            i = i+1;
        }
        
    }
    if(tooLong){
        $('#forwardErrorSelection').hide();
        $('#upperSentenceHolder').empty();
        $('#lowerSentenceHolder').empty();
        
        tiaSpeak("That is too many words, please choose again",true,function(){
            reset_text(conversationVariables.alternatives['0'].transcript);
            $('#talkBtn').show();
            $('#recordVoiceBtn').show();
            $('#listenVoiceBtn').show();
        });
    }
    else{
    //add audio tags
     
        

    //empty upper and lower divs
    $('#upperSentenceHolder').empty(); 
    $('#lowerSentenceHolder').empty();
    $('#audioclips').empty();
    conversationVariables.correct_audio= [];
    //add spans and add onclick function to these
    var j = 0;
    conversationVariables.tlen = newTran.length;
    for(j=0;j<newTran.length;j++){
        addWord(newTran[j],j,classes[j]);
        if(classes[j] == 'uncorrected-error'){
            conversationVariables.uncorrectedErrors.push("upper_"+j);
        }
        else{
            conversationVariables.correct_audio.push(j);
        }
        $('#upperSentenceHolder').append("<span id='hidden_"+j+"' class='hidden-span'></span>");
        if(j<(newTran.length-1)){
            $('#audioclips').append("<audio id='audio_"+j+"' duration =0 class='temp1' onended='play_nxt("+(j+1)+")'></audio>");
        }
        else{
            $('#audioclips').append("<audio id='audio_"+j+"' class='temp1' duration=0> </audio>");
        }
    }

    $(".uncorrected-error").attr("onclick","correctError(this.id)");
    //add back button and submit button
    $('#backErrorSelection').hide();
    $('#forwardErrorSelection').hide();

    conversationVariables.errors = {};
 
    //cahneg tias textbox
    //$('#tia-speech-box').text("Select an error to correct it");
    //$('#backCorrection').show();

        animate_open_overlay(conversationVariables.uncorrectedErrors[0]);
    }
});


function addWord(word, count, cls) {
    var idx = "'upper_"+count+"'";
    $('#upperSentenceHolder').append("<span id="+idx+" class='"+cls+"'>"+word+"</span>");
    $('#upperSentenceHolder').append(" ");
    idx = "'lower_"+count+"'"; 
    $('#lowerSentenceHolder').append("<span id="+idx+" class='hidden-word' >"+word+"</span> ");
}

$('#bottomCent').click(function(){
    if(conversationVariables.noTransError){                              
        removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
        conversationVariables.noTransError = false;                      
    }                                                                
});

$('#bottomCent').keyup(function(event){

    if(conversationVariables.noTransError){   
        removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );            
        conversationVariables.noTransError = false;                                  
    }                                                                            


    if($('#bottomCent').text() != ""){
        $('#spectrogramBtn').show(); 
    }
    else{
        $('#spectrogramBtn').hide(); 
    }

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
        $('#centeredErrorText').removeClass().addClass('bigText'); 
        $('#topCentText').removeClass().addClass('bigText');       
        $('#bottomCent').removeClass().addClass('bigText');        
    }

});


function correctError(idx){
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

    $('#overlayErrorText').text(errText);
    $('#centeredErrorText').text(errText);
    //Have Tia change speech box
    //$('#speakingWordsInside').text("Please enter what this is meant to be");
};

$('#closeOverlay').click(function(){
    $('#correctionOverlay').hide();
    $('#overlayTextBox').empty();
    $('#overlayTextBox').append('<span id="typeHereOverlay">Type Here!</span>');

    //$('#speakingWordsInside').text("Select an error to correct it");

});

$('#backErrorSelection').click(function(){
    //change all words classes back to normal-word
    $('.selectable-word').addClass("normal-word");
    $('.selectable-word').attr("onclick","");
    $('.selectable-word').removeClass("selectable-word");
    
    $('.selected-word').addClass("normal-word");
    $('.selected-word').attr("onclick","");
    $('.selected-word').removeClass("selected-word");

    //reset text
    //$('#speakingWordsInside').text("Is this what you meant to say?"); 
    
    //reset buttons
    $('#talkBtn').show();
    $('#talkBtn').prop( "disabled", false);
    $('#backErrorSelection').hide();
    $('#forwardErrorSelection').hide();
});

var selected = [];
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
    //$('#overlayTextBox').append('<span id="typeHereOverlay">Type Here!</span>');
    
        conversationVariables.uncorrectedErrors = conversationVariables.uncorrectedErrors.filter(e => e !== "upper_"+idx);                                                                             

    //$('#speakingWordsInside').text("Select an error to correct!");
    //closeStage3();
    //Check if all errors are corrected
    if($('.uncorrected-error').length == 0){
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



$('#backCorrection').click(function(){
    conversationVariables.playStage2 = false;
    conversationVariables.totalAudioLength = conversationVariables.originalLength;
    var words = conversationVariables.alternatives[0].transcript.split(" ");
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


    // reset tia speech
    //$('#speakingWordsInside').text("Select the incorrect words");
    // reset buttons
    $('#talkBtn').show();
    $('#backCorrection').hide();
    $('#listenVoiceBtn').css('display','block');
    selected = [];
    $('#forwardErrorSelection').prop("disabled",false);
    $('#backErrorSelection').prop("disabled",false);
    $('#incorrectTranscriptBtns').show();
    });



$('#closeOverlayArea').click(function(){
   if(conversationVariables.stage2 || classVariables.stage3){
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
   //$('#overlayTextBox').append('<span id="typeHereOverlay">Type Here!</span>');       
   //$('#speakingWordsInside').text("Select an error to correct!"); 
   
   if(conversationVariables.stage3){
        closeStage3();
   }

   conversationVariables.stage2 = false;
   conversationVariables.stage3 = false;

   // also close prevSentsContainer - J
   $('#prevSentsContainer').fadeOut();
   $('#prevSentsIconContainer').fadeIn();
   $('#confirmFinish').hide();
   $('#dataNFinish').show();
   $('#timeOverlayContainer').fadeOut();
   $('#finishClassIconContainer').fadeIn();
   $('#backCorrection').prop( "disabled", false );
   unmoveText();   
   }
});

$('#keyboardOverlay').click(function(){
    moveText();

    if(conversationVariables.noTransError){   
        removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );            
        conversationVariables.noTransError = false;                                  
    }                                                                            


    $('#submitOverlay').hide();
    //$('#centeredError').hide();
    //$('#submitOverlay').hide();
    //$('#overlayErrorBox').show();
    //$('#overlayTextBox').show();
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

function sendAttemptBlob( new_blob ){
    returnFromListenToErrorAttemptWithSpectrograph();
    let fd = new FormData();
    fd.append('data',new_blob);
    fd.append('error_pk',conversationVariables.errors[conversationVariables.startIDX]);
    fd.append('sessionID',conversationVariables.session_id);
    fd.append('audio_id',conversationVariables.currentAudID);
    fd.append('correctio_id', conversationVariables.correctionAttemptID);
    fd.append('clicks', conversationVariables.specClicks); 
    fd.append('blob_no_text_sent_id',conversationVariables.blob_no_text_sent_id);

    $.ajax({                                                                                 
        url: "/store_attempt_blob",                                           
        type: "POST",                                                                        
        data: fd,                                                                            
        processData: false,                                                                  
        contentType: false,
        success: function(json){
            //john
            conversationVariables.showingSpectrograms = true;
            tapKeyFull();
            movementController( movements.blank, '0.5', '1' );
          
            setTimeout( function(){

                $('#reRecordBtn').show();
                $('#backOverlay').show();
                $("#reRecordBtn").prop( "disabled", false );
                if(json.trans.trim() != ""){
                document.getElementById("hypImg").src = "http://127.0.0.1:8000/"+json.image_url;
                $("#hypText").text(json.trans);
               
                err_trans = $('#refText').text().trim();
                trans = json.trans;
                if(err_trans.trim().length <= 18 && trans.trim().length <= 18){ 
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
                }                                                               



                document.getElementById('hypAudio').src = "http://127.0.0.1:8000/"+json.audio_url;
                
                if(json.correct){
                    $('exitOverlay').hide();
                    correct_attempt();
                    setTimeout(function(){
                        $("#hypBtn").css("background-color","green");      
                        $("#hypInvisible").css("background-color","green");
                    },500);
                    
                }
                else{
                    var sim = parseFloat(json.sim);                
                    incorrect_attempt();
                    setTimeout(function(){
                        if(sim <= 0.15){                                          
                            $('#hypBtn').css("background-color","#ffaa00");      
                            $('#hypInvisible').css("background-color","#ffaa00");
                        }else{                                                    
                            $("#hypBtn").css("background-color","red");          
                            $("#hypInvisible").css("background-color","#ffcccb");
                        }                                                         
                    },750);
                }
                conversationVariables.hypLenOriginal = json.hypLen;
                conversationVariables.hypLen = json.hypLen/conversationVariables.playspeed;
                //change speed of play
                document.getElementById('hypAudio').playbackRate = conversationVariables.playspeed;
                conversationVariables.attemptCount +=1;
                if(conversationVariables.attemptCount == 3 && !json.correct){
                    //Tia says you can give up
                    disableBtns();
                    conversationVariables.thirdAttemptError = true;
                    tiaSpeak("If you are struggling you can try again another time", needSendTTS=true,enableBtns);
                    $('#exitOverlay').show();
                }
            }
            else{
                dealWithBlankTranscription();   
                conversationVariables.noTransError = true;
                $('#backOverlay').prop('disabled',"false");
                classVariables.noTransError = true;
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

function closeStage3(){
    let fd = new FormData();
    fd.append('sessionID',conversationVariables.session_id);
    fd.append('blob_no_text_sent_id',conversationVariables.blob_no_text_sent_id);
    fd.append('start_idx',conversationVariables.startIDX);
    fd.append('error_pk',conversationVariables.errors[conversationVariables.startIDX]);
    fd.append('audio_id',conversationVariables.currentAudID);
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

function sendErrorBlobToServer( new_blob ){

    let fd = new FormData();
    fd.append('data',new_blob);
    fd.append('sessionID',conversationVariables.session_id);
    fd.append('blob_no_text',conversationVariables.blob_no_txt);
    fd.append('blob_no_text_sent_id',conversationVariables.blob_no_text_sent_id);
    fd.append('error_list',JSON.stringify(conversationVariables.errors));
    fd.append('start_idx',conversationVariables.startIDX);
    fd.append('audio_id',conversationVariables.currentAudID);
    fd.append('trans', $('#centeredErrorText').text().trim());

    $.ajax({
        url: "/store_error_blob",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(json){
            returnFromListenToSpeechSynthesis();
            //add index an foregin key to the errors
            conversationVariables.errors[json['error_start']] = json['error_pk'];
            //display transcript
            if(json['error_trans'] != ""){
                //$("#centeredErrorHolder").hide();
                //$("#overlayErrorBox").show();
                //$("#overlayTextBox").show();
                //$("#overlayTextBox").empty();
                moveText();
                setTimeout(function(){
                    $('#bottomCent').text(json['error_trans']);
                    $("#bottomCent").attr("contenteditable","false");

                    $("#submitOverlay").show();
                    $("#reRecordBtn").show();                                                        
                    $("#reRecordBtn").prop( "disabled", false );                                     
                    $("#keyboardOverlay").show();
                
                    document.getElementById('audio_'+json['error_start']).src = "http://127.0.0.1:8000/"+json.audio_url;
                    $('#audio_'+json['error_start']).attr('duration',json.audio_len);   

                },900);
                $('#overlayTextBox').text(json['error_trans']);
                //show mic
                $("#submitOverlay").off("click");
                $("#submitOverlay").click(submitRecording);
                //make textbox not editable
                $("#overlayTextBox").attr("contenteditable","false");
                //save last transcription into class
           }else {
               dealWithBlankTranscription();
               conversationVariables.noTransError = true;
               $('#backOverlay').prop('disabled',"false");
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
    $('#refText').hide();
    //animation
   document.getElementById("refAudio").play();
   $("#refInvisible").css("margin-left","-10px");
   $('#refInvisible').css({"border-left":"10px solid black"});
   $('#refInvisible').animate({width:"0"},conversationVariables.refLen);
   setTimeout(function(){
        $("#refInvisible").css("border-left","none");
        $('#refText').fadeIn(800);
        $('#refInvisible').css("width","100%");
        enableBtns();
   },(conversationVariables.refLen+100));
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



//Keyboard sumbit
function submitKeyboard(){

    // john
    // tia looks at laptop while waiting for images to return
    movementController( movements.laptop, '0.5', '1' );


    //hide other buttons
    $('#reRecordBtn').hide();
    $('#keyboardOverlay').hide();
    $('#submitOverlay').hide();
    $('#spectrogramBtn').hide();
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
    fd.append('audio_id',conversationVariables.currentAudID);
    
    fd.append('gender', conversationVariables.gender);
    fd.append('pitch', synthesisObject.pitch);
    fd.append('speaking_rate', synthesisObject.speaking_rate);
    fd.append('sessionID',conversationVariables.session_id);
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
            tapKeyFull();
            movementController( movements.blank, '0.5', '1' );

            //$('#reRecordBtn').show();

            var refAudioURL = "http://127.0.0.1:8000/" + json.ref_audio_url;
            var refAudio = document.getElementById("refAudio");
            refAudio.src = refAudioURL;
            //refAudio.play();

            var hyp_audio_url = "http://127.0.0.1:8000/" + json.hyp_audio_url;
            var hypAudio = document.getElementById("hypAudio");
            hypAudio.src = hyp_audio_url;
            
            var ref_image_url ="http://127.0.0.1:8000/"+json.ref_image_url; 
            var refImage = document.getElementById("refImg");
            refImg.src = ref_image_url;

            var hyp_image_url = "http://127.0.0.1:8000/" + json.hyp_image_url;
            var hypImage = document.getElementById("hypImg");
            hypImg.src = hyp_image_url;
            
            $("#hypText").text(err_trans);
            $("#refText").text(trans);
            
            if(err_trans.trim().length <= 18 && trans.trim().length <= 18){
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
            }

            $("#overlayErrorBox").hide();                                                    
            $("#overlayTextBox").hide();
            $('#centeredError').hide();
            // john - moving this to tapKeyFull()
            //$("#praatCont").fadeIn(800);
            $("#submitOverlay").hide();
            $("#reRecordBtn").css("background-color","blue");
           
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

        },
        error: function() {
            console.log("that's wrong"); 
        },
    });
}

// Recording Submit
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
            doneError();                                  
                                                          
            $('#backCorrection').prop("disabled",false);  
            $('#talkBtn').prop("disabled",false);         

        },
        error: function() {
            console.log("that's wrong");
        },
    });
}

function correct_attempt(){
    var middle = $('#refBtn').offset().top;
    var bottom = $('#hypBtn').offset().top;
    $('#sliderHolder').css('visibility','hidden');
    var diff = (bottom-middle)/2;
    conversationVariables.animationDistance = diff;
    $('#refImg').hide();
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
    $('#reRecordBtn').fadeOut(800);
    setTimeout(function(){
    //show submit
    $('#sliderHolder').css('visibility','visible');
    $('#submitOverlay').show();
    $("#submitOverlay").off("click");                                                
    $("#submitOverlay").click(submitCorrect);
    $('#backCorrection').prop("disabled",false);
    },3500);
}

function incorrect_attempt(){
    var middle = $('#refBtn').offset().top;                                                 
    var bottom = $('#hypBtn').offset().top;
    $('#sliderHolder').css('visibility','hidden');
    var diff = (bottom-middle)/2;
    disableBtns();
    $('#refImg').hide();
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
        $("#refImg").fadeIn(800);
        $("#hypTextLayer").fadeIn(800);
        enableBtns();
        $('#sliderHolder').css('visibility','visible');
    },2000)
}



function submitCorrect(){
    doneError();

    $('#backCorrection').prop("disabled",false);
    $('#talkBtn').prop("disabled",false); 
    undoCorrect();
}

function undoCorrect(){
    $('#refBtn').show();
    $('#refBtn').animate({top:'-='+conversationVariables.animationDistance+"px"});         
    $('#hypBtn').animate({top:'+='+conversationVariables.animationDistance+"px"});
    $('#refImg').show();                                                             
    $('#hypTextLayer').show();
    conversationVariables.correctionDone = false;
    $("#hypBtn").css("background-color","red");          
    $("#hypInvisible").css("background-color","#ffcccb");
    $('#submitOverlay').hide();
    $('#refBtn').css('visibility', 'visible');
    $('#reRecordBtn').prop( "disabled", false);
}


function disableBtns(){
    $('#submitOverlay').prop( "disabled", true);
    $('#sliderHolder').css('visibility','hidden');
    $('#reRecordBtn').hide();
    $('#backOverlay').hide();
    $('#refBtn').prop( "disabled", true);
    $('#hypBtn').prop( "disabled", true);
    $('#closeOverlayArea').prop( "disabled", true);    
}
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

function getSentence(){
    var words = conversationVariables.alternatives[0].transcript.split(" ");
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

function unmoveText(){
    if(conversationVariables.movedText){
        $('#moveText').animate({top:'+='+conversationVariables.textDiff+"px"},1);
        conversationVariables.movedText = false;
    }
}




function causeFlash(){
    var words = conversationVariables.alternatives[0].transcript.split(" ").length;
    flash(0,words);
}

function flash(i,max) {
    if (i == max) return;
    setTimeout(function () {
        var idx = "#upper_"+i;
        flashBorder(idx);
        flash(++i,max);
    }, 60);
}

function flashBorder(id){
    $(id).css('border-color','#eeee90');
    setTimeout(function(){
        $(id).css('border-color','green'); 
    },125);
}



function animate_open_overlay(err_id){
    //have button flash

    setTimeout( function() {

        $('#backCorrection').hide();
        $('#recordVoiceBtn').hide();
        conversationVariables.correcting = true;
        var original_color = 'yellow';
        var new_color = 'black';
        $('#'+err_id).css({"background-color":new_color,"color":original_color});
        setTimeout(function(){
            $('#'+err_id).removeAttr( 'style' );
        },400);
        //open overlay
        setTimeout(function(){
            correctError(err_id)
            
        },1000);

        setTimeout(function(){
            $('#backCorrection').show();
            $('#recordVoiceBtn').show();
        },2000);

    }, 750 );


}


function reset_text(trans){
    $('#sentenceHolderParent').show();
    $('#upperSentenceHolder').empty();
    $('#lowerSentenceHolder').empty();
    populateDivsNewTrans(trans);
    $('#listenVoiceBtn').hide();
    $('#backCorrection').hide();
    setTimeout( set_selectable(trans) , 1200);
}


function play_audio(){
    document.getElementById("audio_0").play();
}
function play_nxt(val){
    document.getElementById("audio_"+val).play();
}
 
$('#exitOverlay').click(function(){
    document.getElementById('audio_'+conversationVariables.startIDX).src = document.getElementById('refAudio').src;
    document.getElementById('audio_'+conversationVariables.startIDX).volume = 0.7;
    $('#audio_'+conversationVariables.startIDX).attr('duration',conversationVariables.refLenOriginal);
    doneError();
    $('#backCorrection').prop('disabled',false);
    $('#recordVoiceBtn').prop('disabled',false);
    $('#talkBtn').prop('disabled', false);

    if(conversationVariables.thirdAttemptError || conversationVariables.noTransError){              
        removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
        conversationVariables.thirdAttemptError = false;                 
        conversationVariables.noTransError = false;
    }                                                                 


});


function getAudioLength(){
    var i;
    var count = 0;
    for(i=0;i<$('.temp1').length;i++){
        count = count +  parseFloat($('#audio_'+i).attr('duration'));
    }
    conversationVariables.totalAudioLength = count;
    //conversationVariables.totalAudioLength += (100*$('.temp1').length);
  

}



