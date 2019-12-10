function focusAddInfo() {

    let phoneId = this.id.substring(20);
    $( '#messageToStudentTextarea' + phoneId ).focus()

}

function sendNewInfoToServer() {

    let phoneId = document.activeElement.id.substring( 24 );
    let userId = teacherVars.phoneToStudentId[ phoneId ];
    let newInfo = document.activeElement.value;
    document.activeElement.value = '';

    $.ajax({
        url: "/update_info",
        type: "POST",
        data: {
         
            'user_id': userId,
            'new_info': newInfo,

        }, 
        success: function(json) {
           
            let updatedInfo = json.updated_info
            teacherVars.conversations[ userId ].info = updatedInfo
            $( '#studentInfoText' + phoneId ).text( updatedInfo.join(', ') );
          //console.log('newInfo successfully sent to server')

        },
        error: function() {
          //console.log("that's wrong");
        },

    });

    

}
