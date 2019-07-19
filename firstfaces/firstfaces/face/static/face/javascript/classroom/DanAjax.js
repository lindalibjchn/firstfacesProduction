
$('#incorrectTranscriptBtn').click(function(){
    selected = [];
    var words = classVariableDict.alternatives[0].transcript.split(" ");
    var i;
    //Make words selectable 
    for(i=0;i<words.length;i++){
        var idx = "#upper_"+i;
        $(idx).attr("class","selectable-word");
        $(idx).attr("onclick","selectErrWord(this.id)")
    }
    //hide incorrect and other btns
    $('#correctTranscript').hide();
    $('#incorrectTranscriptBtn').hide();
    
    //show button on overlay
    //

    //change text in box
    //$('#tia-speech-box').text("Select the incorrect words");

    //add onclick function to btns
    $('#backErrorSelection').show();
    //$('#forwardErrorSelection').show();
    //add new btns (back and done)?
});

$('#correctTranscript').click(function(){
    alert("Transcript is right");
});

$('#forwardErrorSelection').click(function(){
    //loop through selected words, amalgamate sewuential errors into one
    var words = classVariableDict.alternatives[0].transcript.split(" ");
    var i = 0;

    var classes = [];
    var newTran = []; 
    while(i < words.length){
        if(selected.includes(i)){
            var curStr = '';
            while(selected.includes(i)){
                curStr = curStr + words[i] + " ";
                i = i+1;
            }
            newTran.push(curStr);
            classes.push("uncorrected-error");
        }else{
            newTran.push(words[i]);
            classes.push("normal-word");
            i = i+1;
        }
        
    }
 
    //empty upper and lower divs
    $('#upperSentenceHolder').empty(); 
    $('#lowerSentenceHolder').empty();
    //add spans and add onclick function to these
    var j = 0;
    for(j=0;j<newTran.length;j++){
        addWord(newTran[j],j,classes[j]);
        $('#upperSentenceHolder').append("<span id='hidden_"+j+"' class='hidden-span'></span>");
    }
    $(".uncorrected-error").attr("onclick","correctError(this.id)");
    //add back button and submit button
    $('#backErrorSelection').hide();
    $('#forwardErrorSelection').hide();

    classVariableDict.errors = {};
 

    //cahneg tias textbox
    //$('#tia-speech-box').text("Select an error to correct it");
    $('#backCorrection').show();
});


function addWord(word, count, cls) {
    var idx = "'upper_"+count+"'";
    $('#upperSentenceHolder').append("<span id="+idx+" class='"+cls+"'>"+word+"</span>");
    $('#upperSentenceHolder').append(" ");
    idx = "'lower_"+count+"'"; 
    $('#lowerSentenceHolder').append("<span id="+idx+" class='hidden-word' >"+word+"</span> ");
}

$('#overlayTextBox').click(function(){
    $('#typeHereOverlay').empty(); 
});

$('#overlayTextBox').keypress(function(event){
    $('#submitOverlay').show();
});


function correctError(idx){
    currentId = idx;
    //function will make overlay appear
    openOverlay();
   
     //Populate top of overaly with error text
    var errText = $('#'+idx).text();
    //Set necessary variables
    classVariableDict.startIDX = idx.split('_')[1]
    classVariableDict.endIDX = classVariableDict.startIDX 
    

    $('#overlayErrorText').text(errText);
    $('#centeredErrorText').text(errText);
    //Have Tia change speech box
    //$('#tia-speech-box').text("Please enter what this is meant to be");
};

$('#closeOverlay').click(function(){
    $('#correctionOverlay').hide();
    $('#overlayTextBox').empty();
    $('#overlayTextBox').append('<span id="typeHereOverlay">Type Here!</span>');

    //$('#tia-speech-box').text("Select an error to correct it");

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
    //$('#tia-speech-box').text("Is this what you meant to say?"); 

    //reset buttons
    $('#correctTranscript').show();
    $('#incorrectTranscriptBtn').show();
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
            $('#forwardErrorSelection').hide();
        }
        selected.sort();
        document.getElementById(idx).className = 'selectable-word';
    }
}


var currentId;
function doneError(){
    var cor = $('#overlayTextBox').text().trim();
    var err = $('#overlayErrorText').text().trim();

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
    $("#upper_"+idx).text(cor);
    $("#upper_"+idx).attr("class","corrected-error");
    $("#upper_"+idx).attr("onclick","");
    $("#lower_"+idx).text(err);
    $("#lower_"+idx).attr("class","lower-error");
    if(err.length < cor.length){
        //add new span at start
        var next = idx+1;
        var curr = $("#lower_"+next).text();
        $("#lower_"+next).text(curr+pad);
    }
    if(err.length > cor.length){
        $('#hidden_'+idx).text(pad);

        //change span class
    }
    classVariableDict.stage2 = false;
    //close overlay
    $('#correctionOverlay').hide();
    $('#overlayTextBox').empty();
    $('#overlayTextBox').append('<span id="typeHereOverlay">Type Here!</span>');
    
    //$('#tia-speech-box').text("Select an error to correct!");

    //Check if all errors are corrected
    if($('.uncorrected-error').length == 0){
        $("#submitCorrectedErrors").show();
    }

}


$('#submitCorrectedErrors').click(function(){
    alert("This is where the next stage is");
});

$('#backCorrection').click(function(){
    // get 
    var words = classVariableDict.alternatives[0].transcript.split(" ");
     

    // reset divs
    //empty upper and lower divs
    $('#upperSentenceHolder').empty(); 
    $('#lowerSentenceHolder').empty();
    var j = 0;
    for(j=0;j<words.length;j++){
        addWord(words[j],j,'selectable-word');
        var idx = "#upper_"+j;                                                               
        $(idx).attr("onclick","selectErrWord(this.id)") 
    }
    // reset tia speech
    //$('#tia-speech-box').text("Select the incorrect words");
    // reset buttons
    $('#submitCorrectedErrors').hide();
    $('#backCorrection').hide();
    $('#backErrorSelection').show();
    selected = [];
});



$('#closeOverlayArea').click(function(){
   $('#correctionOverlay').hide();
   $('#overlayTextBox').empty();
   //$('#overlayTextBox').append('<span id="typeHereOverlay">Type Here!</span>');       
   //$('#tia-speech-box').text("Select an error to correct!"); 
   classVariableDict.stage2 = false;
   classVariableDict.stage3 = false;
});

$('#keyboardOverlay').click(function(){
    $('#centeredError').hide();
    $('#submitOverlay').hide();
    $('#overlayErrorBox').show();
    $('#overlayTextBox').show();
    $('#keyboardOverlay').hide();
    //clear text area
    $("#overlayTextBox").empty();
    $("#overlayTextBox").attr("contenteditable","true")
    //make text area editable
    $("#submitOverlay").off("click"); 
    $("#submitOverlay").click(submitKeyboard);
});

$('#backOverlay').click(function(){
    $('#centeredError').show();
    $('#overlayErrorBox').hide();
    $('#overlayTextBox').empty();
    $('#overlayTextBox').hide();
    $('#keyboardOverlay').show();
    $('#backOverlay').hide();
    $('#submitOverlay').hide();
    classVariableDict.stage3 = false;
    classVariableDict.stage2 = true;
    classVariableDict.specClicks = [];
    //Make Ajax call
    //send AE id set intention back to null and set typed to false
    fd = new FormData();
});

function openOverlay(){
    $('#praatCont').hide();
    $('#correctionOverlay').show();
    $('#centeredError').show();
    $('#centeredErrorHolder').show();
    $('#centeredErrorText').show();
    $('#closeOverlay').hide();    
    $('#submitOverlay').hide();
    $('#overlayErrorBox').hide();  
    $('#overlayTextBox').hide();
    $('#backOverlay').hide();
    $('#stopRecordBtn').hide();
    $("#keyboardOverlay").show();
    $("#reRecordBtn").show();
    //Says that modal is openl
    classVariableDict.stage2 = true;
}

function sendAttemptBlob( new_blob ){
    let fd = new FormData();
    fd.append('data',new_blob);
    fd.append('error_pk',classVariableDict.errors[classVariableDict.startIDX]);
    fd.append('sessionID',classVariableDict.session_id);
    fd.append('audio_id',classVariableDict.currentAudID);
    fd.append('correctio_id', classVariableDict.correctionAttemptID);
    fd.append('clicks', classVariableDict.clicks);
    fd.append('blob_no_text_sent_id',classVariableDict.blob_no_text_sent_id);

    $.ajax({                                                                                 
        url: "/store_attempt_blob",                                           
        type: "POST",                                                                        
        data: fd,                                                                            
        processData: false,                                                                  
        contentType: false,
        success: function(json){
           $('#reRecordBtn').show();
           $("#reRecordBtn").prop( "disabled", false );
           document.getElementById("hypImg").src = "http://127.0.0.1:8000/"+json.image_url;
           $("#hyp_text").text(json.trans);
           document.getElementById('hypAudio').src = "http://127.0.0.1:8000/"+json.audio_url;
            
           if(json.correct){
                alert("right");
           }
           
        },                                                                                   
        error: function() {                                                                  
            console.log("that's wrong");                                                     
        },                                                                                   
   });
}

function sendErrorBlobToServer( new_blob ){
    let fd = new FormData();
    fd.append('data',new_blob);
    fd.append('sessionID',classVariableDict.session_id);
    fd.append('blob_no_text',classVariableDict.blob_no_txt);
    fd.append('blob_no_text_sent_id',classVariableDict.blob_no_text_sent_id);
    fd.append('error_list',JSON.stringify(classVariableDict.errors));
    fd.append('start_idx',classVariableDict.startIDX);
    fd.append('audio_id',classVariableDict.currentAudID);

    $.ajax({
        url: "/store_error_blob",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(json){
            //add index an foregin key to the errors
            classVariableDict.errors[json['error_start']] = json['error_pk'];
            alert(classVariableDict.errors);
            //display transcript
            $("#centeredErrorHolder").hide();
            $("#overlayErrorBox").show();
            $("#overlayTextBox").show();
            $("#overlayTextBox").empty();
            $('#overlayTextBox').text(json['error_trans']);
            //show mic
            $("#reRecordBtn").show();
            $("#reRecordBtn").prop( "disabled", false );
            $("#keyboardOverlay").show();
            $("#submitOverlay").show();
            $("#submitOverlay").off("click");
            $("#submitOverlay").click(submitRecording);
            //make textbox not editable
            $("#overlayTextBox").attr("contenteditable","false");
            //save last transcription into class
            classVariableDict.lastAttemptID = json['attempt_pk'];
        },
        error: function() {
            console.log("that's wrong");
        },
    });
}



//Keyboard and record have different submit funtionalities

$('#ref_btn').click(function(){
    //Store click
    classVariableDict.specClicks.push(JSON.stringify({"synth":Date.now() / 1000}));

   document.getElementById("refAudio").play();
});

$('#hyp_btn').click(function(){

    //store click
    classVariableDict.specClicks.push(JSON.stringify({"user":Date.now() / 1000}));

    document.getElementById("hypAudio").play();
});


//Keyboard sumbit
function submitKeyboard(){
    var trans = $('#overlayTextBox').text().trim();
    var err_trans = $('#overlayErrorText').text().trim();
   
    let fd = new FormData();
    fd.append("attempt_pk",classVariableDict.lastAttemptID);
    fd.append("trans",trans);
    fd.append("etrans",err_trans);
    fd.append('error_list',JSON.stringify(classVariableDict.errors));                        
    fd.append('start_idx',classVariableDict.startIDX);                                       
    fd.append('audio_id',classVariableDict.currentAudID);
    
    fd.append('gender', classVariableDict.gender);
    fd.append('pitch', synthesisObject.pitch);
    fd.append('speaking_rate', synthesisObject.speaking_rate);
    fd.append('sessionID',classVariableDict.session_id);
    var val = 0;
    var i;
    for(i=0;i<parseInt(classVariableDict.startIDX);i++){
        val = val +  $('#upper_'+i).text().split(" ").length;
    }
    fd.append("first_word_id",val);
    $.ajax({
        url: "/error_typing_used",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(json){
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

            $("#overlayErrorBox").hide();                                                    
            $("#overlayTextBox").hide();
            $("#praatCont").show();
            $("#submitOverlay").hide();
            $("#reRecordBtn").css("background-color","blue");
            
            $("#backOverlay").show();
        
            classVariableDict.specClicks = [];
            classVariableDict.stage3 = true;
            classVariableDict.stage2 = false;
            classVariableDict.correctionAttemptID = json.aeca_id;

            //add error id to errors
            classVariableDict.errors[classVariableDict.startIDX] = json.ae_id;
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
    fd.append("attempt_pk",classVariableDict.lastAttemptID);
    fd.append("error_pk",classVariableDict.errors[classVariableDict.startIDX]);
    fd.append("trans",trans);

    $.ajax({
        url: "/error_recording_used",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(json){
            doneError();
            //add returned audio url to audio tag
        },
        error: function() {
            console.log("that's wrong");
        },
    });
}
