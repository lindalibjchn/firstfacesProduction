
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
    $('#tia-speech-box').text("Select the incorrect words");

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

    classVariableDict.errors = [];
    
    
 

    //cahneg tias textbox
    $('#tia-speech-box').text("Select an error to correct it");
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
    $('#tia-speech-box').text("Please enter what this is meant to be");
};

$('#closeOverlay').click(function(){
    $('#correctionOverlay').hide();
    $('#overlayTextBox').empty();
    $('#overlayTextBox').append('<span id="typeHereOverlay">Type Here!</span>');

    $('#tia-speech-box').text("Select an error to correct it");

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
    $('#tia-speech-box').text("Is this what you meant to say?"); 

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
$('#submitOverlay').click(function(){
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
    
    $('#tia-speech-box').text("Select an error to correct!");

    //Check if all errors are corrected
    if($('.uncorrected-error').length == 0){
        $("#submitCorrectedErrors").show();
    }

});


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
    $('#tia-speech-box').text("Select the incorrect words");
    // reset buttons
    $('#submitCorrectedErrors').hide();
    $('#backCorrection').hide();
    $('#backErrorSelection').show();
    selected = [];
});



$('#closeOverlayArea').click(function(){
   $('#correctionOverlay').hide();
   $('#overlayTextBox').empty();
   $('#overlayTextBox').append('<span id="typeHereOverlay">Type Here!</span>');       
   $('#tia-speech-box').text("Select an error to correct!"); 
    classVariableDict.stage2 = false;
});

$('#keyboardOverlay').click(function(){
    $('#centeredError').hide();
    $('#overlayErrorBox').show();
    $('#overlayTextBox').show();
    $('#keyboardOverlay').hide();
    $('#backOverlay').show();
});

$('#backOverlay').click(function(){
    $('#centeredError').show();
    $('#overlayErrorBox').hide();
    $('#overlayTextBox').empty();
    $('#overlayTextBox').append('<span id="typeHereOverlay">Type Here!</span>');
    $('#overlayTextBox').hide();
    $('#keyboardOverlay').show();
    $('#backOverlay').hide();
    $('#submitOverlay').hide();
});

function openOverlay(){
    $('#correctionOverlay').show();
    $('#centeredError').show();
    $('#closeOverlay').hide();    
    $('#submitOverlay').hide();
    $('#overlayErrorBox').hide();  
    $('#overlayTextBox').hide();
    $('#backOverlay').hide();
    $('#stopRecordBtn').hide();
    //Says that modal is openl
    classVariableDict.stage2 = true;
}



function sendErrorBlobToServer( new_blob ){
    let fd = new FormData();
    fd.append('data',new_blob);
    fd.append('sessionID',classVariableDict.sessionID);
    fd.append('blob_no_text',classVariableDict.blob_no_txt);
    fd.append('blob_no_text_sent_id',classVariableDict.blob_no_text_sent_id);
    fd.append('error_list',classVariableDict.errors);
    fd.append('start_idx',classVariableDict.startIDX);

    $.ajax({
        url: "/store_error_blob",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(){
            alert("Success")
        },
        error: function() {
            console.log("that's wrong");
        },
    });
}
