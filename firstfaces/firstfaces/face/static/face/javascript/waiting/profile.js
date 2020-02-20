

function fix_picture_height(){
    val = $('#profile-picture-cont').height()*0.9
    $('#profile-picture').css({'height':val, "width":val});
}

var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];



function get_user_stats(){
     //let fd = new FormData();
     //$.ajax({
       // url: "/get_stats",
       // type: "POST",
       // data: fd,
        //processData: false,
        //contentType: false,
        //success: function(json){
            prof_stats = waitingVariables.profile_stats
            $('#profile_description_username').text(prof_stats.username);

            time_s = new Date(prof_stats.date);

            $('#profile_description_joined').text("Joined in "+months_arr[time_s.getMonth()]+" "+time_s.getFullYear());

            $('#conversations_num').text(prof_stats.num_conv);
            $('#clock_num').text(prof_stats.time_tot);
            $('#time_label').text(prof_stats.time_label);
            $('#flag_img').attr('src', prefixURL+prof_stats.flag_name);
            $("#sent_num").text(prof_stats.num_sent);

            //rating
            $('#star_num').text(prof_stats.rating)
            //if zero
            if(prof_stats.rating == 0.5){
                $('#start_half_1').show().css("color","black");

            } else if(prof_stats.rating == 1){
                $('#start_full_1').show().css("color","black");
            } else if(prof_stats.rating == 1.5){
                $('#start_full_1').show().css("color","black");
                $('#start_half_2').show().css("color","black");
            } else if(prof_stats.rating == 2){
                $('#start_full_1').show().css("color","black");
                $('#start_full_2').show().css("color","black");
            } else if(prof_stats.rating == 2.5){
                $('#start_full_1').show().css("color","black");
                $('#start_full_2').show().css("color","black");
                $('#start_half_3').show().css("color","black");
            } else if(prof_stats.rating == 3.0){
                $('#start_full_1').show().css("color","black");
                $('#start_full_2').show().css("color","black");
                $('#start_full_3').show().css("color","black");
            } else if(prof_stats.rating == 3.5){
                $('#start_full_1').show().css("color","black");
                $('#start_full_2').show().css("color","black");
                $('#start_full_3').show().css("color","black");
                $('#start_half_4').show().css("color","black");
            } else if(prof_stats.rating == 4){
                $('#start_full_1').show().css("color","black");
                $('#start_full_2').show().css("color","black");
                $('#start_full_3').show().css("color","black");
                $('#start_full_4').show().css("color","black");
            } else if(prof_stats.rating == 4.5){
                $('#start_full_1').show().css("color","black");
                $('#start_full_2').show().css("color","black");
                $('#start_full_3').show().css("color","black");
                $('#start_full_4').show().css("color","black");
                $('#start_half_5').show().css("color","black");
            } else if(prof_stats.rating == 5){
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

            $('#point_num').text(prof_stats.points);
            $('#product_num').text(prof_stats.products)
        //},
        //error: function() {
        //    console.log("error getting stats")
       // },
   // });


}