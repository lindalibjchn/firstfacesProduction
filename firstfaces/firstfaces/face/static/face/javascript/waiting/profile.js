
document

function fix_picture_height(){
    val = $('#profile-picture-cont').height()*0.9
    $('#profile-picture').css({'height':val, "width":val});
}

var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function get_user_stats(){
     let fd = new FormData();
     $.ajax({
        url: "/get_stats",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(json){
            $('#profile_description_username').text(json.username);

            time_s = new Date(json.date);

            $('#profile_description_joined').text("Joined in "+months_arr[time_s.getMonth()]+" "+time_s.getFullYear());

            $('#conversations_num').text(json.num_conv);
            $('#clock_num').text(json.time_tot);
            $('#time_label').text(json.time_label);
            $('#flag_img').attr('src', prefixURL+json.flag_name);

        },
        error: function() {
            console.log("error getting stats")
        },
    });


}