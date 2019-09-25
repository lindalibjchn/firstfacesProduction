function updatePrevSentences() {

    let sessToBeHighlighted = []
    // highlight the boxes needing correction
    for (var s in teacherVars.sentencesNeedJudgement) {

        sessToBeHighlighted.push( teacherVars.sentencesNeedJudgement[ s ][ 'sess_id' ] );

    }

    // count is used for the ids of the student boxes
    var count = 0;
    var timeNow = new Date();
    
    //empty content before putting back
    for (let i=0; i<8; i++) {
        
        $( '#studentBox0' + i.toString() ).empty();  

    }

    for (key in sessions) {
        
        //check that key is not 'totalSentences'
        if ( key !== 'totalSentences' & key !== 'numberOf' ) {

            // make id number for boxes
            let id = '#studentBox0' + count.toString();

            // set all opacities to 0.5 for those not waiting judgement
            $( id ).css( 'opacity' , '0.5' );  

            $( id ).css( 'border', '1px solid black' );  
            
            // set opacities to 1 if waiting judgement and red/orange border if most/second most urgent
            for ( var sent in teacherVars.sentencesNeedJudgement ) {

                if ( teacherVars.sentencesNeedJudgement[ sent ][ 'sess_id' ] === parseInt( key ) ) {

                    $( id ).css( 'opacity' , '1' );  

                    if ( sent == 0 ) {

                        $( id ).css( 'border', '8px solid red' );  

                    } else if ( sent == 1 ) {

                        $( id ).css( 'border', '8px solid orange' );  

                    }

                }

            }

            $( id ).empty();
            
            // append to prev sents
            $(id).append( 
                    
                "<div class='student-box-title'>"+
                    
                    "<div class='w3-row'>" +

                        "<div class='prev-username w3-col w3-threequarter'>" +
                        
                            sessions[key].username +

                        "</div>" + 

                        "<div class='prev-minutes w3-col w3-quarter'>" +
                        
                            // mins since beginning - added the 60 mins(3600000) cuz was an hour off
                            Math.floor( ( timeNow - sessions[key].start_time ) / 60000 ).toString() +

                        "</div>" + 

                    "</div>" +

                "</div>"
            );

            for ( var sent in sessions[ key ].sentences ) {


                // dont want 'undefined' appearing in try again box - it's too wide
                var wW;
                var tA;

                if ( sessions[ key ].sentences[ sent ].whats_wrong === true ) {

                    wW = "W"

                } else {

                    wW = "&nbsp"

                }

                if ( sessions[ key ].sentences[ sent ].try_again === true ) {

                    tA = "T"

                } else {

                    tA = "&nbsp"

                }

                $( id ).append(
                
                    "<div class='student-box-content'>"+

                        "<div class='w3-row'>"+
                            
                            "<div class='sentences w3-col m11'>" +
                                
                                "<div class='prev-sents'>" +
                                    
                                    // sent is in array for so join with empty sting to display properly
                                    sessions[ key ].sentences[ sent ].sentence.join("") +
                                
                                "</div>" +

                            "</div>" +

                            "<div class='judgements w3-col m1'>" +

                                "<div class='prev-judgements'>" +
                                    
                                    sessions[ key ].sentences[ sent ].judgement +
                                
                                "</div>" +

                            "</div>" +

                        "</div>" +

                        "<div class='w3-row'>"+
                            
                            "<div class='sentences w3-col m10'>" +
                                
                                "<div class='prev-corrections'>" +
                                    
                                    "C:" + sessions[ key ].sentences[ sent ].correction + "<br>" +

                                    "P:" + sessions[ key ].sentences[ sent ].prompt +
                                
                                "</div>" +

                            "</div>" +

                            "<div class='judgements w3-col m2'>" +

                                "<div class='prev-try-again'>" +
                                    
                                    wW + "&nbsp" + tA +
                                
                                "</div>" +

                            "</div>" +

                        "</div>" +

                    "</div>"
                );

            };


            count += 1;
        
        }

    }

}


