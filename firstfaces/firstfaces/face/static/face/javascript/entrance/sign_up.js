$('#yes_info').click(function(){
    click_save('#yes_info');
    $('.su_s1').fadeOut(400);
    animate_color_colour('top-half-su','1A3A6B', 400);
    animate_color_colour('top-half-su-before','1A3A6B', 400);
    animate_color_colour('pdot_1','2E89CF', 400);

    setTimeout(function(){
        show_stage_2(400);
        $('#su_back').hide().css({"display":"flex", "z-index":"3"}).fadeIn(400);
        $('#su_back').off('click').click(function(){
            back_to_s1();
        });
    },400);
});

var sign_up_details = {};

function reset_sign_up(){
    //Hide and empty all stages
    reset_s4();
    reset_s3();
    reset_s2();
    reset_s1();



}

function back_to_s1(){
    click_save('#su_back');
    $('.su_s2').fadeOut(400);
    animate_color_colour('top-half-su','0089Cf', 400);
    animate_color_colour('top-half-su-before','0089Cf', 400);
    animate_color_colour('pdot_1','FFFFFF', 400);
    $('#su_back').fadeOut(400);
    setTimeout(function(){
        $('.su_s1').fadeIn(400);
        reset_s2();

    },400);
}

function back_to_s2(){
    $('.su_s3').fadeOut(400);
    reset_s2();
    animate_color_colour('top-half-su','1A3A6B', 400);
    animate_color_colour('top-half-su-before','1A3A6B', 400);
    animate_color_colour('pdot_2','FFFFFF', 400);
    setTimeout(function(){
        show_stage_2(400);
        $('#su_back').hide().css({"display":"flex", "z-index":"3"}).fadeIn(400);
        $('#su_back').off('click').click(function(){
            back_to_s1();
            click_save('#su_back');
        });
        reset_s3()
    },400);
}
function back_to_s3(){
    click_save('#su_back');
    $('.su_s4').fadeOut(400);
    reset_s3();
    animate_color_colour('top-half-su','2F9D4A', 400);
    animate_color_colour('top-half-su-before','2F9D4A', 400);
    animate_color_colour('pdot_3','FFFFFF', 400);
    setTimeout(function(){
        show_stage_3(400);
        $('#su_back').hide().css({"display":"flex", "z-index":"3"}).fadeIn(400);
        $('#su_back').off('click').click(function(){
            back_to_s2();
            click_save('#su_back');
        });
        reset_s4()
    },400);
}

function show_stage_1(time=0){
    $('.su_s1').fadeIn(time);
}

function show_stage_2(time=0){
    $('.su_s2').fadeIn(time);
}

function show_stage_3(time=0){
    $('.su_s3').fadeIn(time);
}
function show_stage_4(time=0){
    $('.su_s4').fadeIn(time);
}

function reset_s1(){
    $('.su_s1').show();
    animate_color_colour('top-half-su','2E89CF', 0);
    animate_color_colour('top-half-su-before','2E89CF', 0);
    animate_color_colour('pdot_1','FFFFFF', 0);

}
function reset_s3(){
    $('#username_field_entry').text('Username').css('opacity','0.8');
    $('#email_field_entry').text('Email').css('opacity','0.8');
    $('#password_field_entry').text('Password').css('opacity','0.8');
    sign_up_details = {};
}
function reset_s4(){
    $('#id_nationality').prop('selectedIndex',0);
    $('#id_language').prop('selectedIndex',0);
    $('#id_living_now').prop('selectedIndex',0);
    $('#id_born').prop('selectedIndex',0);
    $('#id_gender').prop('selectedIndex',0);
    $('#id_education').prop('selectedIndex',0);
    $('#id_english_level').prop('selectedIndex',0);
    $('#id_lived_in_english_speaking_country').prop('selectedIndex',0);
}

function reset_s2(){
    //reset errors
    $('#age_q_error').hide();
    $('#eng_q_error').hide();
    $('#emo_q_error').hide();
    $('#ano_q_error').hide();

    $('#dat_q_error').hide();
    $('#rec_q_error').hide();
    $('#lan_q_error').hide();
    $('#del_q_error').hide();

    $('#par_q_error').hide();
    $('#par_q_error').hide();

    //reset text color
    $('#age_q').css("color","black");
    $('#eng_q').css("color","black");
    $('#emo_q').css("color","black");
    $('#ano_q').css("color","black");

    $('#dat_q').css("color","black");
    $('#rec_q').css("color","black");
    $('#lan_q').css("color","black");
    $('#del_q').css("color","black");

    $('#par_q').css("color","black");
    $('#con_q').css("color","black");

    //reset booleans
    age_selected = false;
    eng_selected = false;
    emo_selected = false;
    ano_selected = false;

    dat_selected = false;
    rec_selected = false;
    lan_selected = false;
    del_selected = false;

    par_selected = false;
    con_selected = false;

    //reset buttons
    $("#age_def").prop("checked", true);
    $("#eng_def").prop("checked", true);
    $("#emo_def").prop("checked", true);
    $("#ano_def").prop("checked", true);

    $("#dat_def").prop("checked", true);
    $("#rec_def").prop("checked", true);
    $("#lan_def").prop("checked", true);
    $("#del_def").prop("checked", true);

     $("#par_def").prop("checked", true);
     $("#con_def").prop("checked", true);

     //Hide 2b and 2c
     $('.su_s2b').hide();
     $('.su_s2c').hide();

     //show 2a
     $('.su_s2a').show();
}



// Stage 2
var age_selected = false;
var eng_selected = false;
var emo_selected = false;
var ano_selected = false;

var dat_selected = false;
var rec_selected = false;
var lan_selected = false;
var del_selected = false;

var par_selected = false;
var con_selected = false;

function done_stage_2a_check(){
    if(age_selected && eng_selected && emo_selected && ano_selected){
        hide_stage_2a();
    }
    return
}
function done_stage_2b_check(){
    if(dat_selected && rec_selected && lan_selected && del_selected){
        hide_stage_2b();
    }
    return
}

function done_stage_2c_check(){
     click_save('Sign-up --> Stage3');
    if(par_selected && con_selected){
        $('.su_s2').fadeOut(400);
        animate_color_colour('top-half-su','2F9D4A', 400);
        animate_color_colour('top-half-su-before','2F9D4A', 400);
        animate_color_colour('pdot_2','1A3A6B', 400);
        setTimeout(function(){
            show_stage_3(400);
            $('#su_back').off('click').click(function(){
                back_to_s2();
            });
        },400);
    }
    return
}
function done_stage_3(){
        click_save('Sign-up --> Stage4');
        $('.su_s3').fadeOut(400);
        animate_color_colour('top-half-su','EAD132', 400);
        animate_color_colour('top-half-su-before','EAD132', 400);
        animate_color_colour('pdot_3','2F9D4A', 400);
        setTimeout(function(){
            show_stage_4(400);
            $('#su_back').off('click').click(function(){
                back_to_s3();
            });
        },400);
}


function hide_stage_2a(){
    $('.su_s2a').fadeOut(400);
    setTimeout(function(){
       $('.su_s2b').fadeIn(400);
    },400);
}
function hide_stage_2b(){
    $('.su_s2b').fadeOut(400);
    setTimeout(function(){
       $('.su_s2c').fadeIn(400);
    },400);
}


$("#age_no").click(function(){
    $('#age_q').css("color","black");
    $('#age_q_error').show();
    age_selected = false;

});
$("#age_yes").click(function(){
    $('#age_q').css("color","#2F9D4A");
    $('#age_q_error').hide();
    age_selected = true;
    done_stage_2a_check();

});
$("#eng_no").click(function(){
    $('#eng_q').css("color","black");
    $('#eng_q_error').show();
    eng_selected = false;
});
$("#eng_yes").click(function(){
    $('#eng_q').css("color","#2F9D4A");
    $('#eng_q_error').hide();
    eng_selected = true;
    done_stage_2a_check();
});
$("#emo_no").click(function(){
    $('#emo_q').css("color","black");
    $('#emo_q_error').show();
    emo_selected = false;
});
$("#emo_yes").click(function(){
    $('#emo_q').css("color","#2F9D4A");
    $('#emo_q_error').hide();
    emo_selected = true;
    done_stage_2a_check();
});
$("#ano_no").click(function(){
    $('#ano_q').css("color","black");
    $('#ano_q_error').show();
    ano_selected = false;
});
$("#ano_yes").click(function(){
    $('#ano_q').css("color","#2F9D4A");
    $('#ano_q_error').hide();
    ano_selected = true;
    done_stage_2a_check();
});

$("#dat_no").click(function(){
    $('#dat_q').css("color","black");
    $('#dat_q_error').show();
    dat_selected = false;
});
$("#dat_yes").click(function(){
    $('#dat_q').css("color","#2F9D4A");
    $('#dat_q_error').hide();
    dat_selected = true;
    done_stage_2b_check();
});
$("#rec_no").click(function(){
    $('#rec_q').css("color","black");
    $('#rec_q_error').show();
    rec_selected = false;
});
$("#rec_yes").click(function(){
    $('#rec_q').css("color","#2F9D4A");
    $('#rec_q_error').hide();
    rec_selected = true;
    done_stage_2b_check();
});
$("#lan_no").click(function(){
    $('#lan_q').css("color","black");
    $('#lan_q_error').show();
    lan_selected = false;
});
$("#lan_yes").click(function(){
    $('#lan_q').css("color","#2F9D4A");
    $('#lan_q_error').hide();
    lan_selected = true;
    done_stage_2b_check();
});
$("#del_no").click(function(){
    $('#del_q').css("color","black");
    $('#del_q_error').show();
    del_selected = false;
});
$("#del_yes").click(function(){
    $('#del_q').css("color","#2F9D4A");
    $('#del_q_error').hide();
    del_selected = true;
    done_stage_2b_check();
});

$("#par_no").click(function(){
    $('#par_q').css("color","black");
    $('#par_q_error').show();
    par_selected = false;
});
$("#par_yes").click(function(){
    $('#par_q').css("color","#2F9D4A");
    $('#par_q_error').hide();
    par_selected = true;
    done_stage_2c_check();
});
$("#con_no").click(function(){
    $('#con_q').css("color","black");
    $('#con_q_error').show();
    con_selected = false;
});
$("#con_yes").click(function(){
    $('#con_q').css("color","#2F9D4A");
    $('#con_q_error').hide();
    con_selected = true;
    done_stage_2c_check();
});


//Stage 3
$('#username_field').click(function(){
    if($('#username_field_entry').text() == "Username"){
        $('#username_field_entry').text("").attr('contenteditable','true').css('opacity','1').focus();
    }
});
$('#email_field').click(function(){
    if($('#email_field_entry').text() == "Email"){
        $('#email_field_entry').text("").attr('contenteditable','true').css('opacity','1').focus();
    }
});
$('#password_field').click(function(){
    if($('#password_field_entry').text() == "Password"){
        $('#password_field_entry').text("").attr('contenteditable','true').css('opacity','1').focus();
     }
});

$('#su_username_submit').click(function(){
    click_save('#su_username_submit');
    username = $('#username_field_entry').text();
    password = $('#password_field_entry').text();
    email = $('#email_field_entry').text();
    let fd = new FormData();
    fd.append("username",username);
    fd.append("email",email);
    fd.append("password",password);

    $.ajax({
        url: "/validate_username",
        type: "POST",
        data: fd,
         processData: false,
        contentType: false,
         success: function(json){
            if(!json.u_valid){
                $('#username_error').show();
            }else{
                $('#username_error').hide();
            }

            if(!json.e_valid){
                $("#emailError").show();
            }else{
                $("#emailError").hide();
            }

            if(!json.p_valid){
                mess = json.p_message.replace("%(min_length)d","8")
                $('#password_error').text(mess).show()
            }else{
                $('#password_error').hide()
            }

            if(json.u_valid && json.p_valid && json.e_valid){
                sign_up_details = {
                    "username":username,
                    "password":password,
                    "email":email,
                }
                done_stage_3();
            }
        },
        error: function() {
          console.log("Error Getting Balance");
        },
    });
});





$('#signUpForm').on('submit', function(e) {
    e.preventDefault()
    click_save('#signUpForm');
    country = $('#id_nationality').val();
    native = $('#id_language').val();
    living = $('#id_living_now').val();
    born = $('#id_born').val();
    gender = $('#id_gender').val();
    education = $('#id_education').val();
    english_level = $('#id_english_level').val();
    lived_english = $('#id_lived_in_english_speaking_country').val();
    username = sign_up_details['username'];
    password = sign_up_details['password'];
    email = sign_up_details['email'];

     let fd = new FormData();
    fd.append("username",username);
    fd.append("email",email);
    fd.append("password",password);

    fd.append("country",country);
    fd.append("native",native);
    fd.append("living",living);
    fd.append("born",born);
    fd.append("gender",gender);
    fd.append("education",education);
    fd.append("english_level",english_level);
    fd.append("lived_english",lived_english);

    $.ajax({
        url: "/create_user",
        type: "POST",
        data: fd,
         processData: false,
        contentType: false,
        success: function(json) {
            if ( json.loggedIn ) {
                window.location.href = "/waiting"
                $('#shop-cont').hide();
                $('#history-cont').hide();
                $('#profile-cont').hide()
                $('#about-cont').hide()
                var dist = $('#footer').offset()['top'] -64;
                var shop_opened = false;

            } else {
                alert("Error signing up");
            }

        },
        error: function() {
          console.log("Error creating user");
        },
    });

});


