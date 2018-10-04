
// Update the opinions and opinion types when the user changes the slider.
function update_comments() {

    var slider_value = document.getElementById("explore_slider").value;
    var options = [];
    var fillers = [];
    var comments = [];
    var x_filler = document.getElementById("X_filler");
    var y_filler = document.getElementById("Y_filler");
    var z_filler = document.getElementById("Z_filler");

    var x_comment = document.getElementById("X_comment");
    var y_comment = document.getElementById("Y_comment");
    var z_comment = document.getElementById("Z_comment");

    if (slider_value == 0) {
        options = ["neg", "neg", "neg"];
        fillers = neg_neg_neg_fillers;
        comments = neg_neg_neg;
    }
    else if (slider_value == 10) {
        options = ["neg", "pos", "neg"];
        fillers = neg_pos_neg_fillers;
        comments = neg_pos_neg;
    }
    else if (slider_value == 20) {
        options = ["neu", "neg", "pos"];
        fillers = neu_neg_pos_fillers;
        comments = neu_neg_pos;
    }
    else if (slider_value == 30) {
        options = ["neu", "neu", "neu"];
        fillers = neu_neu_neu_fillers;
        comments = neu_neu_neu;
    }
    else if (slider_value == 40) {
        options = ["neu", "pos", "neg"];
        fillers = neu_pos_neg_fillers;
        comments = neu_pos_neg;
    }
    else if (slider_value == 50) {
        options = ["pos", "neg", "pos"];
        fillers = pos_neg_pos_fillers;
        comments = pos_neg_pos;
    }
    else { // must be max value (i.e. all positive)
        options = ["pos", "pos", "pos"];
        fillers = pos_pos_pos_fillers;
        comments = pos_pos_pos;
    }

    // Update the filler texts.
    x_filler.innerHTML = fillers[0];
    y_filler.innerHTML = fillers[1];
    z_filler.innerHTML = fillers[2];

    // Update the actual comments.
    x_comment.innerHTML = "\"" + comments[0] + "\"";
    y_comment.innerHTML = "\"" + comments[1] + "\"";
    z_comment.innerHTML = "\"" + comments[2] + "\"";

    // Update div colours to reflect opinion changes.
    document.getElementById("X").className = options[0];
    document.getElementById("Y").className = options[1];
    document.getElementById("Z").className = options[2];
    console.log(options)
}

