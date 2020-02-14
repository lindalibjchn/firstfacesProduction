
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
            $("#sent_num").text(json.num_sent);

            //rating
            $('#star_num').text(json.rating)
            //if zero
            if(json.rating == 0.5){
                $('#start_half_1').show().css("color","black");

            } else if(json.rating == 1){
                $('#start_full_1').show().css("color","black");
            } else if(json.rating == 1.5){
                $('#start_full_1').show().css("color","black");
                $('#start_half_2').show().css("color","black");
            } else if(json.rating == 2){
                $('#start_full_1').show().css("color","black");
                $('#start_full_2').show().css("color","black");
            } else if(json.rating == 2.5){
                $('#start_full_1').show().css("color","black");
                $('#start_full_2').show().css("color","black");
                $('#start_half_3').show().css("color","black");
            } else if(json.rating == 3.0){
                $('#start_full_1').show().css("color","black");
                $('#start_full_2').show().css("color","black");
                $('#start_full_3').show().css("color","black");
            } else if(json.rating == 3.5){
                $('#start_full_1').show().css("color","black");
                $('#start_full_2').show().css("color","black");
                $('#start_full_3').show().css("color","black");
                $('#start_half_4').show().css("color","black");
            } else if(json.rating == 4){
                $('#start_full_1').show().css("color","black");
                $('#start_full_2').show().css("color","black");
                $('#start_full_3').show().css("color","black");
                $('#start_full_4').show().css("color","black");
            } else if(json.rating == 4.5){
                $('#start_full_1').show().css("color","black");
                $('#start_full_2').show().css("color","black");
                $('#start_full_3').show().css("color","black");
                $('#start_full_4').show().css("color","black");
                $('#start_half_5').show().css("color","black");
            } else if(json.rating == 5){
                $('#start_full_1').show().css("color","black");
                $('#start_full_2').show().css("color","black");
                $('#start_full_3').show().css("color","black");
                $('#start_full_4').show().css("color","black");
                $('#start_full_5').show().css("color","black");
            } else{
                $('#start_full_1').show();
                $('#start_full_2').show();
                $('#start_full_3').show();
                $('#start_full_4').show();
                $('#start_full_5').show();
            }

            $('#point_num').text(json.points);
            $('#product_num').text(json.products)
        },
        error: function() {
            console.log("error getting stats")
        },
    });


}