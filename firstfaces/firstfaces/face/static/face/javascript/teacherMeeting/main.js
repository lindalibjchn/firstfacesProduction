var teacherVars = {};
var emotionWheelCentre;
var emotionWheelRadius;
var nodTriangleBottomLeft;
var shakeTriangleBottomLeft;
var triangleLength;
var wrongIndexes = [];
var correctionIndexes = [];
var aud;
var thud;
var noSessions;

$(window).on( 'load', function() {

    noSessions = Object.keys( sessions ).length;

    aud = document.getElementById('bells')
    aud.src = "http://127.0.0.1:8000/media/to-the-point.mp3";
    //aud.src = "media/to-the-point.mp3";

    aud1 = document.getElementById('thud')
    aud1.src = "http://127.0.0.1:8000/media/chimes-glassy.mp3";
    //aud1.src = "media/chimes-glassy.mp3";

    updateAll();

    getLocationOfEmotionWheel();
    $('#emotionWheel').on( 'click', getEmotionCoords );

    getLocationOfTriangles();
    $('.triangle-bottomleft').on( 'click', getNodShakeCoords );

    // when surprise slider changes, get value
    $('#surpriseRange').change( getSurpriseVal );

    // press ` to add wrong areas
    $(document).keydown(function(e) {
        if(e.keyCode == 65 && e.ctrlKey) {
            console.log('Ctrl-A pressed');
            e.preventDefault();
            appendWrongSection();
        } else if (e.keyCode == 83 && e.ctrlKey) {
            console.log('Ctrl-S pressed');
            e.preventDefault();
            appendCorrectionSection();
        }
    });

    $('.judgement-btns').on( 'click', sendJudgementToServer )
    $('#sendCorrectionsBtn').on( 'click', sendCorrectionToServer )

    checkForChange.count = 0;
    checkForChange();

});

$( window ).on( 'resize',  function() {
    
    getLocationOfEmotionWheel();
    getLocationOfTriangles();

});

function updateAll() {

    updateSentenceObjects();
    updatePrevSentences();
    updateWrongSentences();
    updateSentenceForCorrection();
    loadNextSentenceNeedingJudgement();

}


var noOfSessions = Object.keys(sessions).length;
var sentencesNeedJudgement = [];
var sentencesNeedUrgentCorrection = [];
var sentencesMaybeNeedUrgentCorrection = [];
var sentencesNeedNonUrgentCorrection = [];


/* takes objects with all sessions and sentences from server and updates 
lists containing those which need judgement and correction */
function updateSentenceObjects() {

    var timeNow = new Date();
    sentencesNeedJudgement = [];
    sentencesNeedUrgentCorrection = [];
    sentencesNeedNonUrgentCorrection = [];
    sentencesMaybeNeedUrgentCorrection = [];

    for ( var key in sessions ) {

        //check that key is not 'totalSentences'
        if ( key !== 'totalSentences' ) {

            //check that there is a sentence in a session - if not it is anew session
            if ( sessions[ key ].sentences[ 0 ] !== undefined ) {

                // push all unjudged sentences to their own array
                if ( sessions[ key ].sentences[ 0 ].judgement === null && sessions[ key ].sentences[ 0 ].sentence !== null) {

                    sentencesNeedJudgement.push( sessions[ key ].sentences[0] );

                }

                // push all sentences which need correction to their own array. On array for urgent and two for non-urgent.
                for ( var sent in sessions[ key ].sentences) {

                    // sentence has judgement of incorrect, but not correction
                    if ( sessions[ key ].sentences[ sent ].judgement === "I" && sessions[ key ].sentences[ sent ].correction === "" ) {

                        // if learner has asked for correction its urgent
                        if ( sessions[ key ].sentences[ sent ].whats_wrong ) {

                            sentencesNeedUrgentCorrection.push( sessions[ key ].sentences[ sent ] );

                        // if learner hasn't asked what's wrong but it's only been less than 1 min or 60000 ms
                        } else {
                            
                            // time since learner got judgement
                            let jud_t = sessions[ key ].sentences[ sent ].judgement_timestamp * 1000;
                            let timeSinceJudgement = timeNow - jud_t;

                            // change this to 60000 for production, for testing to keep all sents in maybe state its bigger
                            if ( timeSinceJudgement < 60000000000 ) {

                                // don't need it if try again or next sentence has been pressed
                                if ( sessions[ key ].sentences[ sent ].try_again === true || sessions[ key ].sentences[ sent ].next_sentence === true) {

                                    sentencesNeedNonUrgentCorrection.push( sessions[ key ].sentences[ sent ] );

                                } else {

                                    sentencesMaybeNeedUrgentCorrection.push( sessions[ key ].sentences[ sent ] );

                                }

                            // else it's just for labelling data
                            } else {

                                sentencesNeedNonUrgentCorrection.push( sessions[ key ].sentences[ sent ] );

                            }

                        }

                    }

                }

            }
        
        }

    }

    // sor these sentences so oldest sent is at position 0
    sentencesNeedJudgement.sort(function (a, b) {
          return a.sentence_timestamp - b.sentence_timestamp;
    });

    sentencesNeedUrgentCorrection.sort(function (a, b) {
          return a.whats_wrong_timestamp - b.whats_wrong_timestamp;
    });

    sentencesNeedNonUrgentCorrection.sort(function (a, b) {
          return a.judgement_timestamp - b.judgement_timestamp;
    });

}

function updatePrevSentences() {

    let sessToBeHighlighted = []
    // highlight the boxes needing correction
    for (var s in sentencesNeedJudgement) {

        sessToBeHighlighted.push( sentencesNeedJudgement[ s ][ 'sess_id' ] );

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
        if ( key !== 'totalSentences' ) {

            // make id number for boxes
            let id = '#studentBox0' + count.toString();

            // set all opacities to 0.5 for those not waiting judgement
            $( id ).css( 'opacity' , '0.5' );  

            $( id ).css( 'border', '1px solid black' );  
            
            // set opacities to 1 if waiting judgement and red/orange border if most/second most urgent
            for ( var sent in sentencesNeedJudgement ) {

                if ( sentencesNeedJudgement[ sent ][ 'sess_id' ] === parseInt( key ) ) {

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
                                    
                                    sessions[ key ].sentences[ sent ].sentence +
                                
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

var sentForCorrection;
function getSentenceForCorrection() {

    if ( sentencesNeedUrgentCorrection.length !== 0 ) {
        
        sentForCorrection = sentencesNeedUrgentCorrection[ 0 ]

    } else if ( sentencesMaybeNeedUrgentCorrection.length !== 0 ) {

        sentForCorrection = sentencesMaybeNeedUrgentCorrection[ 0 ]

    } else if ( sentencesNeedNonUrgentCorrection.length !== 0 ) {

        sentForCorrection = sentencesNeedNonUrgentCorrection[ 0 ]

    }

    console.log('sentForCorrection:', sentForCorrection);
    loadNextSentenceNeedingCorrection();

}

// DEAL WITH WRONG SENTENCES NEEDING CORRECTION

function updateSentenceForCorrection() {

    sentForCorrection = undefined;
    correctionIndexes = [];
    $('#wrongText').val('');
    $('#wrongSelections').empty();
    $('#wrongSentForCorrectionNow').empty();
    $('#wrongSentNOW').val('');

    getSentenceForCorrection()

}

function loadNextSentenceNeedingCorrection() {

    if ( sentForCorrection !== undefined ) {

        $('#wrongSentForCorrectionNow').append(

            "<div class='wrong-sents-individual-sent' id='wrongSentNOW'>" +
                
                sentForCorrection.sentence + 
        
            "</div>"

        )

    }

}

function updateWrongSentences() {

    $('#urgentWrongSents').empty();
    $('#maybeUrgentWrongSents').empty();
    $('#nonUrgentWrongSents').empty();

    for ( var urgentS in sentencesNeedUrgentCorrection ) {

        $('#urgentWrongSents').append(

            "<div class='wrong-sents-individual-container w3-orange w3-row'>" + 
            
                "<div class='wrong-sents-individual-sent'>" +
                    
                    sentencesNeedUrgentCorrection[ urgentS ].sentence + 
            
                "</div>" +

            "</div>"

        )

    }

    for ( var maybeUrgentS in sentencesMaybeNeedUrgentCorrection ) {

        $('#maybeUrgentWrongSents').append(

            "<div class='wrong-sents-individual-container w3-yellow w3-row'>" + 

                "<div class='wrong-sents-individual'>" + 
            
                    sentencesMaybeNeedUrgentCorrection[ maybeUrgentS ].sentence + 
                
                "</div>" +

            "</div>"
            
        )

    }

    for ( var nonUrgentS in sentencesNeedNonUrgentCorrection ) {
        
        $('#nonUrgentWrongSents').append(

            "<div class='wrong-sents-individual-container w3-white w3-row'>" + 

                "<div class='wrong-sents-individual w3-threequarter'>" +

                    sentencesNeedNonUrgentCorrection[ nonUrgentS ].sentence + 
            
                "</div>" +

            "</div>"
            
        )

    }

}


// EMOTION WHEEL POSITION AND LOCATION OF CLICKS

function getLocationOfEmotionWheel() {

    let posLeft = $('#emotionWheel').offset().left;
    let width = $('#emotionWheel').width();
    let posTop = $('#emotionWheel').offset().top;
    let height = $('#emotionWheel').height();
    
    let centreX = posLeft + width / 2;
    let centreY = posTop + height / 2;
    
    teacherVars.emotionWheelCentre = [ centreX, centreY ];
    teacherVars.emotionWheelRadius = width / 2;

}
 
function getEmotionCoords(e) {

    let mouseX = e.clientX;
    let mouseY = e.clientY;
    let X = Math.round( 10 * ( mouseX - teacherVars.emotionWheelCentre[ 0 ] ) / teacherVars.emotionWheelRadius ) / 10;
    let Y = Math.round( 10 * ( teacherVars.emotionWheelCentre[ 1 ] - mouseY ) / teacherVars.emotionWheelRadius ) / 10;
    teacherVars.emotionState = [X, Y]

    $('#emotionState').text( X + "," + Y );

}


//  POSITION OF NOD AND SHAKE TRIANGLES

function getLocationOfTriangles() {

    let nod = $( '#nodTriangle' );
    let shake = $( '#shakeTriangle' );
    teacherVars.triangleLength = nod[ 0 ].offsetWidth;
    
    teacherVars.nodTriangleBottomLeft = [ nod.offset().left, nod.offset().top + teacherVars.triangleLength ]
    teacherVars.shakeTriangleBottomLeft = [ shake.offset().left, shake.offset().top + teacherVars.triangleLength ]

}
 
function getNodShakeCoords( e ) {

    let mouseX = e.clientX;
    let mouseY = e.clientY;
    let triangleState;
    let triangleX;
    let triangleY;

    if ( e.target.id === "nodTriangle" ) {

        teacherVars.nodShakeBool = true;
        triangleX = Math.round( 10 * ( mouseX - teacherVars.nodTriangleBottomLeft[ 0 ] ) / teacherVars.triangleLength) / 10;
        triangleY = Math.round( 10 * ( teacherVars.nodTriangleBottomLeft[ 1 ] - mouseY ) / teacherVars.triangleLength) / 10;

    } else if ( e.target.id === "shakeTriangle" ) {

        teacherVars.nodShakeBool = false;
        triangleX = Math.round( 10 * ( mouseX - teacherVars.shakeTriangleBottomLeft[ 0 ] ) / teacherVars.triangleLength) / 10;
        triangleY = Math.round( 10 * ( teacherVars.shakeTriangleBottomLeft[ 1 ] - mouseY ) / teacherVars.triangleLength) / 10;

    }

    teacherVars.triangleState = [ triangleX, triangleY ];

    $('#nodShakeState').text( teacherVars.nodShakeBool.toString()[0] + " " + teacherVars.triangleState[0] + "," + teacherVars.triangleState[1] );

}

function getSurpriseVal() {

    teacherVars.surpriseAmount = Math.round( parseInt($('#surpriseRange').val())) / 10;
    $('#surpriseState').text( teacherVars.surpriseAmount );

}

function resetJudgementStates() {

    teacherVars.emotionState = [0, 0];
    teacherVars.nodShakeBool = null;
    teacherVars.triangleState = [0, 0];
    teacherVars.surpriseAmount = 0;

    wrongIndexes = [];

}

function resetStatesOnScreen() {

    $('#nodShakeState').text( 'n 0,0' );
    $('#emotionState').text( '0,0' );
    $('#surpriseState').text( '0' );
    
    $('#promptText').val('');
    $('#selectedSections').empty();
    $('#sentenceForJudgement').empty();
    wrongIndexes = []

}

function putNextSentenceNeedingJudgementUpForViewing() {

    $('#sentenceForJudgement').val( '' );
    
    if (sentencesNeedJudgement.length > 0 ) {

        // get next sentence needing judgement
        let sentNeedingJudgement = sentencesNeedJudgement[ 0 ].sentence;

        // put it in the 
        $('#sentenceForJudgement').text( sentNeedingJudgement );

    }

}

function loadNextSentenceNeedingJudgement() {

    // clear variables holding states and reset amounts on screen
    resetJudgementStates();
    resetStatesOnScreen();

    // put next sentence needing judgement up for viewing
    putNextSentenceNeedingJudgementUpForViewing();    

}

var appendWrongSection = function() {
    
    var index1 = window.getSelection()['anchorOffset']
    var index2 = window.getSelection()['focusOffset']

    if ( index1 > index2 ) {
        var temp = index1;
        index1 = index2;
        index2 = temp;
    } 
    
    wrongIndexes.push( [index1,index2] );

    let sent = sentencesNeedJudgement[ 0 ].sentence;
    let wrongText = sent.slice( index1, index2 );

    $('#selectedSections').append( '<div class="selectedSection">' + wrongText + '</div>' );

} 

// this is for the wrong sentences on the right needing correction
var sentNeedingCorrectionID;
var appendCorrectionSection = function() {
    
    var index1 = window.getSelection()['anchorOffset']
    var index2 = window.getSelection()['focusOffset']

    if ( index1 > index2 ) {
        var temp = index1;
        index1 = index2;
        index2 = temp;
    } 
    
    correctionIndexes.push( [index1,index2] );

    var sent = sentForCorrection.sentence;

    let correctionText = sent.slice( index1, index2 );

    $('#wrongSelections').append( '<div class="selectedSection">' + correctionText + '</div>' );

} 

function checkForChange() {

    console.log('checkForChange.count:', checkForChange.count);

    $.ajax({
        url: "/check_for_change",
        type: "GET",
        data: { 
            totalSents: sessions.totalSentences,
            sentsAwaitingMaybeUrgentUpdate: JSON.stringify( sentencesMaybeNeedUrgentCorrection ),
        }, 
        success: function(json) {

            //console.log('changed:', json.changed);
            
            if ( json.changed ) {
                
                aud.play();
                updateSessionsDictFromServer(); 
                checkForChange.count = 0;

            } else {

                checkForChange.count += 1;

            }

            if ( checkForChange.count === 10 ) {

                updateSessionsDictFromServer();
                checkForChange.count = 0;

            }

            // hit db every 2 seconds to check for changes
        },
        error: function() {
            console.log("that's wrong");
        },

    });

    setTimeout( checkForChange, 2000 );

}

function updateSessionsDictFromServer( correction=false) {

    //if comes from send correction to server then correction=true and update sentence for correction too.
    
    $.ajax({
        url: "/update_session_object",
        type: "POST",
        data: {}, 
        success: function(json) {

            prevSentencesNeedJudgementLength = sentencesNeedJudgement.length;

            sessions = JSON.parse(json.sessions);

            if ( Object.keys( sessions ).length !== noSessions ) {

                aud1.play();
                noSessions = Object.keys( sessions ).length;

            }

            updateSentenceObjects();
            updateWrongSentences();
            updatePrevSentences();

            if ( correction ) {

                updateSentenceForCorrection();

            }

            if ( prevSentencesNeedJudgementLength === 0 && sentencesNeedJudgement.length > 0 ) {

                loadNextSentenceNeedingJudgement();

            }

        },
        error: function() {
            console.log("that's wrong");
        },

    });

}



