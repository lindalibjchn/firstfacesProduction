function blur_record(){
    $('#tempRecord').show();
    $('#recordVoiceBtn').hide();
}

function remove_blur_record(){
    $('#tempRecord').hide();
    $('#recordVoiceBtn').show();
}

var blinkInterval
function blink_button(){
    $('.flash').fadeTo(750, 0.25).fadeTo(750, 1);
}
//setInterval(blink_button, 2000);

$('#tempRecord').click(function(){
    alert("Cannot record while errors are selected.");
});

function reCorrectError(num){
    //Unnecessary buttons are hidden
    $('#backCorrection').hide();
    $('#recordVoiceBtn').hide();
    //hide text area
    $("#sentenceHolderParent").hide();


    //function will make overlay appear

    openOverlay();
    $('#submitOverlay').show();
    moveText();
     //Populate top of overaly with error text
    var errText = $('#upper_'+num).text().trim();
    var corrText = $('#lower_'+num).text().trim();
    //Set necessary variables
    conversationVariables.startIDX = num
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
    $('#bottomCent').text(corrText);
    $('#centeredErrorText').text(errText);
};

function get_word_model(word){
    let fd = new FormData();
    fd.append('word', word);
     $.ajax({
        url: "/load_stock_word_model",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(json){
            console.log(json.visemes);
        },
        error: function() {
          console.log("failed");
        },
    });


}
