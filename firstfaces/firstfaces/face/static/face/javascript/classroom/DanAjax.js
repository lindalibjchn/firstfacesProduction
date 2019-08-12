
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
    fd.append('trans',classVariables.alternatives[0].transcript);                 
    fd.append('fn',classVariables.Aud_Fname);   
    fd.append('sessionID',classVariables.session_id);


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
    classVariables.originalLength = classVariables.totalAudioLength;
    classVariables.totalAudioLength = 0;
    doAllignment();
    classVariables.usePlayAud = true;
    //loop through selected words, amalgamate sewuential errors into one
    classVariables.playStage2 = true;
    var words = classVariables.alternatives[0].transcript.split(" ");
    var i = 0;
    classVariables.uncorrectedErrors = [];
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
            var curStr = '';                     
            while(!selected.includes(i) && i < words.length){         
                curStr = curStr + words[i] + " ";
                i = i+1;                         
            }                                    
            newTran.push(curStr);             
            classes.push("normal-word");
            console.log(i);

            //newTran.push(words[i]);
            //classes.push("normal-word");
            //i = i+1;
        }
        
    }
    if(tooLong){
        $('#forwardErrorSelection').hide();
        $('#upperSentenceHolder').empty();
        $('#lowerSentenceHolder').empty();
        
        tiaSpeak("That is too many words, please choose again",true,function(){
            reset_text(classVariables.alternatives['0'].transcript);
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
    classVariables.correct_audio= [];
    //add spans and add onclick function to these
    var j = 0;
    classVariables.tlen = newTran.length;
    for(j=0;j<newTran.length;j++){
        addWord(newTran[j],j,classes[j]);
        if(classes[j] == 'uncorrected-error'){
            classVariables.uncorrectedErrors.push("upper_"+j);
        }
        else{
            classVariables.correct_audio.push(j);
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

    classVariables.errors = {};
 
    //cahneg tias textbox
    //$('#tia-speech-box').text("Select an error to correct it");
    //$('#backCorrection').show();

        animate_open_overlay(classVariables.uncorrectedErrors[0]);
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
    if(classVariables.noTransError){                              
        removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
        classVariables.noTransError = false;                      
    }                                                                
});

$('#bottomCent').keyup(function(event){

    if(classVariables.noTransError){   
        removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );            
        classVariables.noTransError = false;                                  
    }                                                                            


    if($('#bottomCent').text() != ""){
        $('#spectrogramBtn').show(); 
    }
    else{
        $('#spectrogramBtn').hide(); 
    }

    if($('#bottomCent').text().trim().length > 40 || $('#centeredErrorText').text().trim().length > 40 ){
        $('#centeredErrorText').removeClass().addClass('smallText'); 
        $('#topCentText').removeClass().addClass('smallText');       
        $('#bottomCent').removeClass().addClass('smallText');        
    }
    else if($('#bottomCent').text().trim().length > 25 || $('centeredErrorText').text().trim().length > 25 ){      
        $('#centeredErrorText').removeClass().addClass('mediumText');
        $('#topCentText').removeClass().addClass('mediumText');      
        $('#bottomCent').removeClass().addClass('mediumText');       

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
    classVariables.startIDX = idx.split('_')[1]
    classVariables.endIDX = classVariables.startIDX 
    if(errText.trim().length > 40){
        $('#centeredErrorText').removeClass().addClass('smallText');
        $('#topCentText').removeClass().addClass('smallText');  
        $('#bottomCent').removeClass().addClass('smallText');   
    }
    else if(errText.trim().length > 21 ){
        $('#centeredErrorText').removeClass().addClass('mediumText');
        $('#topCentText').removeClass().addClass('mediumText');
        $('#bottomCent').removeClass().addClass('mediumText');
    }
    else{
        $('#centeredErrorText').removeClass().addClass('bigText');
        $('#topCentText').removeClass().addClass('bigText');      
        $('#bottomCent').removeClass().addClass('bigText');       
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
    
    if(classVariables.thirdAttemptError || classVariables.noTransError){             
        removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
        classVariables.thirdAttemptError = false;
        classVariables.noTransError = false;
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
    classVariables.stage2 = false;
    //close overlay
    $('#correctionOverlay').hide();
    $('#sentenceHolderParent').show();
    $('#bottomCent').empty();
    //$('#overlayTextBox').append('<span id="typeHereOverlay">Type Here!</span>');
    
        classVariables.uncorrectedErrors = classVariables.uncorrectedErrors.filter(e => e !== "upper_"+idx);                                                                             

    //$('#speakingWordsInside').text("Select an error to correct!");
    //closeStage3();
    //Check if all errors are corrected
    if($('.uncorrected-error').length == 0){
        $("#talkBtn").show();
        $('#recordVoiceBtn').show();
        $('#backCorrection').show();
    }
    else{
        animate_open_overlay(classVariables.uncorrectedErrors[0]);   
    }
    classVariables.preSent = getSentence().trim();
    unmoveText(); 

    classVariables.correcting = false;
    
    
}



$('#backCorrection').click(function(){
    classVariables.playStage2 = false;
    classVariables.totalAudioLength = classVariables.originalLength;
    var words = classVariables.alternatives[0].transcript.split(" ");
    classVariables.uncorrectedErrors = []; 
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
   if(classVariables.stage2 || classVariables.stage3){
   if(classVariables.correctionDone){
        undoCorrect();
   }
   if(classVariables.thirdAttemptError || classVariables.noTransError){               
        removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
        classVariables.thirdAttemptError = false;  
        classVariables.noTransError = false;
   }  
   $('#backCorrection').show();
   $('#recordVoiceBtn').show();
   $('#correctionOverlay').hide();
   $('#sentenceHolderParent').show();
   $('#overlayTextBox').empty();
   //$('#overlayTextBox').append('<span id="typeHereOverlay">Type Here!</span>');       
   //$('#speakingWordsInside').text("Select an error to correct!"); 
   
   if(classVariables.stage3){
        closeStage3();
   }

   classVariables.stage2 = false;
   classVariables.stage3 = false;

   // also close prevSentsContainer - J
   $('#prevSentsContainer').fadeOut();
   $('#prevSentsIconCont').fadeIn();
   $('#confirmFinish').hide();
   $('#dataNFinish').show();
   $('#timeOverlayCont').fadeOut();
   $('#finishClassIconCont').fadeIn();
   $('#backCorrection').prop( "disabled", false );
   unmoveText();   
   }
});

$('#keyboardOverlay').click(function(){
    moveText();

    if(classVariables.noTransError){   
        removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );            
        classVariables.noTransError = false;                                  
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
    if(classVariables.correctionDone){
        undoCorrect();
    }
    if(classVariables.thirdAttemptError || classVariables.noTransError){       
        removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
        classVariables.thirdAttemptError = false;  
        classVariables.noTransError = false;
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
    classVariables.stage3 = false;
    classVariables.stage2 = true;
    classVariables.specClicks = [];
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
    classVariables.stage2 = true;


    $('#topCent').css('visibility', 'hidden');
    $('#bottomCent').hide();

}

function sendAttemptBlob( new_blob ){
    returnFromListenToErrorAttemptWithSpectrograph();
    let fd = new FormData();
    fd.append('data',new_blob);
    fd.append('error_pk',classVariables.errors[classVariables.startIDX]);
    fd.append('sessionID',classVariables.session_id);
    fd.append('audio_id',classVariables.currentAudID);
    fd.append('correctio_id', classVariables.correctionAttemptID);
    fd.append('clicks', classVariables.specClicks); 
    fd.append('blob_no_text_sent_id',classVariables.blob_no_text_sent_id);

    $.ajax({                                                                                 
        url: "/store_attempt_blob",                                           
        type: "POST",                                                                        
        data: fd,                                                                            
        processData: false,                                                                  
        contentType: false,
        success: function(json){
            //john
            classVariables.showingSpectrograms = true;
            tapKeyFull();
            movementController( movements.blank, '0.5', '1' );
          
            setTimeout( function(){

                $('#reRecordBtn').show();
                $('#backOverlay').show();
                $("#reRecordBtn").prop( "disabled", false );
                if(json.trans.trim() != ""){
                document.getElementById("hypImg").src = "http://127.0.0.1:8000/"+json.image_url;
                $("#hyp_text").text(json.trans);
               
                err_trans = $('#ref_text').text().trim();
                trans = json.trans;
                if(err_trans.trim().length <= 18 && trans.trim().length <= 18){ 
                    $("#hyp_text").removeClass().addClass('bigText');           
                    $("#ref_text").removeClass().addClass('bigText');           
                }                                                               
                else{                                                           
                    if(err_trans.trim().length > 25 || trans.lenght > 25){      
                        $("#hyp_text").removeClass().addClass('smallText');     
                        $("#ref_text").removeClass().addClass('smallText');     
                    }                                                           
                    else{                                                       
                        $("#hyp_text").removeClass().addClass('mediumText');    
                        $("#ref_text").removeClass().addClass('mediumText');    
                    }                                                           
                }                                                               



                document.getElementById('hypAudio').src = "http://127.0.0.1:8000/"+json.audio_url;
                
                if(json.correct){
                    $('exitOverlay').hide();
                    correct_attempt();
                    setTimeout(function(){
                        $("#hyp_btn").css("background-color","green");      
                        $("#hyp_invisible").css("background-color","green");
                    },500);
                    
                }
                else{
                    var sim = parseFloat(json.sim);                
                    incorrect_attempt();
                    setTimeout(function(){
                        if(sim <= 0.15){                                          
                            $('#hyp_btn').css("background-color","#ffaa00");      
                            $('#hyp_invisible').css("background-color","#ffaa00");
                        }else{                                                    
                            $("#hyp_btn").css("background-color","red");          
                            $("#hyp_invisible").css("background-color","#ffcccb");
                        }                                                         
                    },750);
                }
                classVariables.hypLenOriginal = json.hypLen;
                classVariables.hypLen = json.hypLen/classVariables.playspeed;
                //change speed of play
                document.getElementById('hypAudio').playbackRate = classVariables.playspeed;
                classVariables.attemptCount +=1;
                if(classVariables.attemptCount == 3 && !json.correct){
                    //Tia says you can give up
                    disableBtns();
                    classVariables.thirdAttemptError = true;
                    tiaSpeak("If you are struggling you can try again another time", needSendTTS=true,enableBtns);
                    $('#exitOverlay').show();
                }
            }
            else{
                dealWithBlankTranscription();   
                classVariables.noTransError = true;
                $('#backOverlay').prop('disabled',false);
            }
            classVariables.correctionAttemptID = json.att_id; 
            }, 1000);

        },
        error: function() {                                                                  
            console.log("that's wrong");                                                     
        },                                                                                   
   });
}

function closeStage3(){
    let fd = new FormData();
    fd.append('sessionID',classVariables.session_id);
    fd.append('blob_no_text_sent_id',classVariables.blob_no_text_sent_id);
    fd.append('start_idx',classVariables.startIDX);
    fd.append('error_pk',classVariables.errors[classVariables.startIDX]);
    fd.append('audio_id',classVariables.currentAudID);
    fd.append('correctio_id', classVariables.correctionAttemptID);
    fd.append('clicks', classVariables.specClicks);
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
    fd.append('sessionID',classVariables.session_id);
    fd.append('blob_no_text',classVariables.blob_no_txt);
    fd.append('blob_no_text_sent_id',classVariables.blob_no_text_sent_id);
    fd.append('error_list',JSON.stringify(classVariables.errors));
    fd.append('start_idx',classVariables.startIDX);
    fd.append('audio_id',classVariables.currentAudID);
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
            classVariables.errors[json['error_start']] = json['error_pk'];
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
                $("#overlayTextBox").attr("contenteditable",false);
                //save last transcription into class
           }else {
               dealWithBlankTranscription();
               classVariables.noTransError = true;
               $('#backOverlay').prop('disabled',false);
               $("#reRecordBtn").show().prop( "disabled", false );
               $("#keyboardOverlay").show();
           }
           classVariables.lastAttemptID = json['attempt_pk'];  
        },
        error: function() {
            console.log("that's wrong");
        },
    });
}



//Keyboard and record have different submit funtionalities

$('#ref_btn').click(function(){
    disableBtns();
    if(classVariables.thirdAttemptError || classVariables.noTransError){
        removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
        classVariables.thirdAttemptError = false;
        classVariables.noTransError = false;
    }
    //Store click
    classVariables.specClicks.push(JSON.stringify({"synth":Date.now() / 1000}));
    //disable other buttons during playing
    //hide text
    $('#ref_text').hide();
    //animation
   document.getElementById("refAudio").play();
   $("#ref_invisible").css("margin-left","-10px");
   $('#ref_invisible').css({"border-left":"10px solid black"});
   $('#ref_invisible').animate({width:"0"},classVariables.refLen);
   setTimeout(function(){
        $("#ref_invisible").css("border-left","none");
        $('#ref_text').fadeIn(800);
        $('#ref_invisible').css("width","100%");
        enableBtns();
   },(classVariables.refLen+100));
});

$('#hyp_btn').click(function(){
    if(classVariables.thirdAttemptError || classVariables.noTransError){
        removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
        classVariables.thirdAttemptError = false;
        classVariables.noTransError = false;
    }

    disableBtns();
    //store click
    classVariables.specClicks.push(JSON.stringify({"user":Date.now() / 1000}));
    //hide text
    $('#hyp_text').hide();
    document.getElementById("hypAudio").play();
    $("#hyp_invisible").css("margin-left","-10px");
    $('#hyp_invisible').css({"border-left":"10px solid black"});
    $('#hyp_invisible').animate({width:"0"},classVariables.hypLen);             
    setTimeout(function(){   
        $("#hyp_invisible").css("border-left","none");                                       
        $('#hyp_text').fadeIn(800);                                                     
        $('#hyp_invisible').css({"width":"100%"});
        enableBtns();
   },(classVariables.hypLen+100));  
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
    classVariables.attemptCount = 0; 
    let fd = new FormData();
    fd.append("attempt_pk",classVariables.lastAttemptID);
    fd.append("trans",trans);
    fd.append("etrans",err_trans);
    fd.append('error_list',JSON.stringify(classVariables.errors));                        
    fd.append('start_idx',classVariables.startIDX);                                       
    fd.append('audio_id',classVariables.currentAudID);
    
    fd.append('gender', classVariables.gender);
    fd.append('pitch', synthesisObject.pitch);
    fd.append('speaking_rate', synthesisObject.speaking_rate);
    fd.append('sessionID',classVariables.session_id);
    var val = 0;
    var i;
    for(i=0;i<parseInt(classVariables.startIDX);i++){
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
            classVariables.showingSpectrograms = true;
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
            
            $("#hyp_text").text(err_trans);
            $("#ref_text").text(trans);
            
            if(err_trans.trim().length <= 18 && trans.trim().length <= 18){
                $("#hyp_text").removeClass().addClass('bigText');
                $("#ref_text").removeClass().addClass('bigText'); 
            }
            else{
                if(err_trans.trim().length > 25 || trans.lenght > 25){
                    $("#hyp_text").removeClass().addClass('smallText');
                    $("#ref_text").removeClass().addClass('smallText');
                }
                else{
                    $("#hyp_text").removeClass().addClass('mediumText');
                    $("#ref_text").removeClass().addClass('mediumText');
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
                $('#hyp_btn').css("background-color","#ffaa00");
                $('#hyp_invisible').css("background-color","#ffaa00");
            }
            else{
                $('#hyp_btn').css("background-color","red");                 
                $('#hyp_invisible').css("background-color","#ffcccb");           
            }

        
            classVariables.specClicks = [];
            classVariables.stage3 = true;
            classVariables.stage2 = false;
            classVariables.correctionAttemptID = json.aeca_id;

            //add error id to errors
            classVariables.errors[classVariables.startIDX] = json.ae_id;

            //save lenghts of both audio files
            classVariables.refLen = json.ref_length/classVariables.playspeed;
            classVariables.hypLen = json.hyp_length/classVariables.playspeed;
            //change speed of play
            document.getElementById('hypAudio').playbackRate = classVariables.playspeed;
            document.getElementById('refAudio').playbackRate = classVariables.playspeed;

            classVariables.hypLenOriginal = json.hyp_length;
            classVariables.refLenOriginal = json.ref_length;

            
            var finAudio = document.getElementById("audio_"+classVariables.startIDX);             
            finAudio.src = hyp_audio_url;                                     
            $('#audio_'+classVariables.startIDX).attr('duration',json.hyp_length);

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
    fd.append("attempt_pk",classVariables.lastAttemptID);
    fd.append("error_pk",classVariables.errors[classVariables.startIDX]);
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
    var middle = $('#ref_btn').offset().top;
    var bottom = $('#hyp_btn').offset().top;
    $('#sliderHolder').css('visibility','hidden');
    var diff = (bottom-middle)/2;
    classVariables.animationDistance = diff;
    $('#ref_text_layer').hide();
    $('#hyp_text_layer').hide();

    $('#ref_btn').animate({top:'+='+diff+"px"});
    $('#hyp_btn').animate({top:'-='+diff+"px"});
    
    setTimeout(function(){
       $("#ref_btn").effect("highlight",{color: '#7CF00'},2500);
       $("#hyp_btn").effect("highlight",{color: '#7CF00'},2500);
    }, 1000);

    setTimeout(function(){
       $('#ref_btn').css('visibility', 'hidden');
       $('#hyp_text_layer').fadeIn(800);
    },2500);
    classVariables.correctionDone = true;
   
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
    var middle = $('#ref_btn').offset().top;                                                 
    var bottom = $('#hyp_btn').offset().top;
    $('#sliderHolder').css('visibility','hidden');
    var diff = (bottom-middle)/2;
    disableBtns();
    $('#ref_text_layer').hide();
    $('#hyp_text_layer').hide();

    $('#ref_btn').animate({top:'+='+diff+"px"});
    $('#hyp_btn').animate({top:'-='+diff+"px"});
    setTimeout(function(){
        $('#ref_btn').effect("shake",{direction:"ip",times: 4, distance: 2}, 500);
        $('#hyp_btn').effect("shake",{direction:"ip",times: 4, distance: 2}, 500);
    },500);
    setTimeout(function(){
        $('#ref_btn').animate({top:'-='+diff+"px"});
        $('#hyp_btn').animate({top:'+='+diff+"px"}); 
    },1700);

    setTimeout(function(){
        $("#ref_text_layer").fadeIn(800);
        $("#hyp_text_layer").fadeIn(800);
        enableBtns();
        $('#sliderHolder').css('visibility','visible');
    },2000)
}



function submitCorrect(){
    document.getElementById('audio_'+classVariables.startIDX).src = document.getElementById('hypAudio').src;
    $('#audio_'+classVariables.startIDX).attr('duration',classVariables.hypLenOriginal);
    doneError();

    $('#backCorrection').prop("disabled",false);
    $('#talkBtn').prop("disabled",false); 
    undoCorrect();
}

function undoCorrect(){
    $('#ref_btn').show();
    $('#ref_btn').animate({top:'-='+classVariables.animationDistance+"px"});         
    $('#hyp_btn').animate({top:'+='+classVariables.animationDistance+"px"});
    $('#ref_text_layer').show();                                                             
    $('#hyp_text_layer').show();
    classVariables.correctionDone = false;
    $("#hyp_btn").css("background-color","red");          
    $("#hyp_invisible").css("background-color","#ffcccb");
    $('#submitOverlay').hide();
    $('#ref_btn').css('visibility', 'visible');
    $('#reRecordBtn').prop( "disabled", false);
}


function disableBtns(){
    $('#submitOverlay').prop( "disabled", true);
    $('#sliderHolder').css('visibility','hidden');
    $('#reRecordBtn').hide();
    $('#backOverlay').hide();
    $('#ref_btn').prop( "disabled", true);
    $('#hyp_btn').prop( "disabled", true);
    $('#closeOverlayArea').prop( "disabled", true);    
}
function enableBtns(){
    $('#submitOverlay').prop( "disabled", false);                       
    $('#reRecordBtn').show();                                             
    $('#backOverlay').show();
    $('#sliderHolder').css('visibility','visible');
    $('#ref_btn').prop( "disabled", false);   
    $('#hyp_btn').prop( "disabled", false);                      
    $('#closeOverlayArea').prop( "disabled", false);
    $('#backOverlay').prop( "disabled", false);

}

function getSentence(){
    var words = classVariables.alternatives[0].transcript.split(" ");
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
    classVariables.playspeed = val;
    //change animation amoutns
    classVariables.hypLen = classVariables.hypLenOriginal/val;
    classVariables.refLen = classVariables.refLenOriginal/val;

    document.getElementById('refAudio').playbackRate = val;
    document.getElementById('hypAudio').playbackRate = val;
    classVariables.specClicks.push(JSON.stringify({"speed":Date.now() / 1000,"val":val}));

}

 
function moveText(){
    classVariables.movedText = true;
    var to = $('#topCentText').offset().top;
    var from  = $('#moveText').offset().top;
    var dif_v = from - to;
    classVariables.textDiff = dif_v;
    $('#moveText').animate({top:'-='+dif_v+"px"},800);
    setTimeout(function(){
        $('#bottomCent').show(); 
        //$('#bottomCent').focus();
    },900);
}

function unmoveText(){
    if(classVariables.movedText){
        $('#moveText').animate({top:'+='+classVariables.textDiff+"px"},1);
        classVariables.movedText = false;
    }
}




function causeFlash(){
    var words = classVariables.alternatives[0].transcript.split(" ").length;
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
        classVariables.correcting = true;
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
    document.getElementById('audio_'+classVariables.startIDX).src = document.getElementById('refAudio').src;
    document.getElementById('audio_'+classVariables.startIDX).volume = 0.7;
    $('#audio_'+classVariables.startIDX).attr('duration',classVariables.refLenOriginal);
    doneError();
    $('#backCorrection').prop('disabled',false);
    $('#recordVoiceBtn').prop('disabled',false);
    $('#talkBtn').prop('disabled', false);

    if(classVariables.thirdAttemptError || classVariables.noTransError){              
        removeSpeechBubble( tiaTimings.speechBubbleFadeOutDuration );
        classVariables.thirdAttemptError = false;                 
        classVariables.noTransError = false;
    }                                                                 


});


function getAudioLength(){
    var i;
    var count = 0;
    for(i=0;i<$('.temp1').length;i++){
        count = count +  parseFloat($('#audio_'+i).attr('duration'));
    }
    classVariables.totalAudioLength = count;
    //classVariables.totalAudioLength += (100*$('.temp1').length);
  

}



