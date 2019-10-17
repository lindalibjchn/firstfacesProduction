    function resetEmotionSurpriseNodShakeEvents( first ) {

    resetSurpriseRange()
    setPositionOfClickedEmotionWheelMarker( 0, 0, false );
    setPositionOfClickedNodShakeSemiCircleMarker( 0, teacherVars.nodShakeSemiCircle.radius - 8, false ) ;
    disableCorrectButtons();

    if ( !first ) {

        expressionController( expressionObject.abs.blank, 0.5, function(){} );

    }

}

function getLocationOfEmotionWheel() {

    let posLeft = $('#emotionWheel').offset().left;
    let width = $('#emotionWheel').width() * 1.;
    let posTop = $('#emotionWheel').offset().top;
    let height = width * 1.025;
    
    let centreX = posLeft + width / 2;
    let centreY = posTop + height / 2;
    
    teacherVars.emotionWheel.relativeCenter = [ width / 2, height / 2 ];
    teacherVars.emotionWheel.centre = [ centreX, centreY ];
    teacherVars.emotionWheel.radius = width / 2;

}
 
function getEmotionCoords(e) {

    let mouseX = e.clientX;
    let mouseY = e.clientY;
    //console.log('mouseX:', mouseX)
    //console.log('mouseY:', mouseY)
    let Xraw = mouseX - teacherVars.emotionWheel.centre[ 0 ];
    let Yraw = teacherVars.emotionWheel.centre[ 1 ] - mouseY;
    let X = Math.round( 10 * Xraw / teacherVars.emotionWheel.radius ) / 10;
    let Y = Math.round( 10 * Yraw / teacherVars.emotionWheel.radius ) / 10;

    teacherVars.tempEmotionStates.emotion = [X, Y]

    if ( teacherVars.sentencesNeedJudgement[0] !== undefined ) {

        teacherVars.sentencesNeedJudgement[0].emotion = [X, Y]
    
    }

    //teacherVars.emotionRawCoords = [Xraw, Yraw]
    //console.log('emotionCoords:', teacherVars.emotionCoords)

    if ( teacherVars.sentencesNeedJudgement[ 0 ] !== undefined ) {

        teacherVars.sentencesNeedJudgement[ 0 ].surprise = 0;

    }

    changeExpression( teacherVars.tempEmotionStates.emotion, teacherVars.tempEmotionStates.surprise );
    expressionController(expressionObject.calculated, 0.5, function(){})
    setPositionOfClickedEmotionWheelMarker( Xraw, Yraw, true );

}

function setPositionOfClickedEmotionWheelMarker( x, y, highlight ) {

    $('#emotionClickedLocation').css({ 
        
        'left': teacherVars.emotionWheel.radius + x - 4, 
        'top': teacherVars.emotionWheel.radius - y - 4,

    });

    if ( highlight ) {

        $( '#emotionWheel' ).css( 'opacity', '1' );
        $("#emotionWheel").hover( function(e) {

            $(this).css("opacity",e.type==="mouseenter"?"1":"1");
          
        });

        makeCorrectButtonsAvailable();

    } else {

        $( '#emotionWheel' ).css( 'opacity', '0.7' );
        $("#emotionWheel").hover(function(e) {

            $(this).css("opacity",e.type==="mouseenter"?"1":"0.7");
          
        });

    }

}

function resetSurpriseRange() {

    $( '#surpriseCont' ).css( 'opacity', '0.7' );
    $( "#surpriseCont" ).hover( function(e) {

        $(this).css("opacity",e.type==="mouseenter"?"1":"0.7");
      
    });

    $( '.slider' ).val ( 0 );

}

//POSITION OF NOD AND SHAKE SEMICIRCLE

function getLocationOfNodShakeSemiCircle() {

    let posLeft = $('#nodShakeSemiCircle').offset().left;
    let width = $('#nodShakeSemiCircle').width();
    let posTop = $('#nodShakeSemiCircle').offset().top;
    let height = width;;
    
    let centreX = posLeft + width / 2;
    let centreY = posTop + height / 2;
    
    teacherVars.nodShakeSemiCircle.relativeCenter = [ width / 2, height / 2 ];
    teacherVars.nodShakeSemiCircle.centre = [ centreX, centreY ];
    teacherVars.nodShakeSemiCircle.radius = width / 2;

}
 
function getNodShakeCoords( e ) {

    let mouseX = e.clientX;
    let mouseY = e.clientY;
    //console.log('mouseX:', mouseX)
    //console.log('mouseY:', mouseY)
    let Xraw = mouseX - teacherVars.nodShakeSemiCircle.centre[ 0 ];
    let Yraw = teacherVars.nodShakeSemiCircle.centre[ 1 ] - mouseY;
    let X = Math.round( 10 * Xraw / teacherVars.nodShakeSemiCircle.radius ) / 10;
    let Y = Math.round ( (( Math.round( 10 * ( Yraw / teacherVars.nodShakeSemiCircle.radius ) ) / 10 ) - 1) * 10 ) / 10;
    
    teacherVars.tempEmotionStates.nodShake = [X, Y];
    if ( teacherVars.sentencesNeedJudgement[0] !== undefined ) {

        teacherVars.sentencesNeedJudgement[0].nodShake = [X, Y];
    
    }
        
    //teacherVars.nodShakeRawCoords = [Xraw, Yraw]
    
    if ( X > 0 ) {

        initNod( -Y, 1 - X );

    } else {

        initShake( -Y, 1 + X );

    }

    setPositionOfClickedNodShakeSemiCircleMarker( Xraw, Yraw, true );

}

function setPositionOfClickedNodShakeSemiCircleMarker( x, y, highlight ) {

    $('#nodShakeClickedLocation').css({ 
        
        'left': 2 * teacherVars.nodShakeSemiCircle.radius + x + 2, 
        'top': teacherVars.nodShakeSemiCircle.radius - y + 2,

    });

    if ( highlight ) {

        $( '#nodShakeSemiCircle' ).css( 'opacity', '1' );
        $( "#nodShakeSemiCircle" ).hover(function(e) {

            $(this).css("opacity",e.type==="mouseenter"?"1":"1");
          
        });

        makeCorrectButtonsAvailable();

    } else {

        $( '#nodShakeSemiCircle' ).css( 'opacity', '0.7' );
        $( "#nodShakeSemiCircle" ).hover(function(e) {

            $(this).css("opacity",e.type==="mouseenter"?"1":"0.7");
          
        });

    }

}


function getSurpriseVal() {

    teacherVars.tempEmotionStates.surprise = Math.round( parseInt($('#surpriseRange').val())) / 100;
    makeCorrectButtonsAvailable();
    //console.log('surpriseAmount:', teacherVars.sentencesNeedJudgement[0].surprise);

    if ( teacherVars.sentencesNeedJudgement[0] !== undefined ) {
        
        teacherVars.sentencesNeedJudgement[0].surprise = teacherVars.tempEmotionStates.surprise;
        
    } 

    //console.log('teacherVars.emotionCoords:', teacherVars.sentencesNeedJudgement[0].emotion);

    changeExpression( teacherVars.tempEmotionStates.emotion, teacherVars.tempEmotionStates.surprise );
    expressionController(expressionObject.calculated, 0.5, function(){})

    $( "#surpriseCont" ).hover( function(e) {

        $(this).css("opacity",e.type==="mouseenter"?"1":"1");
      
    });

}

function makeCorrectButtonsAvailable() {

    $( '.correct-btn' ).attr( 'disabled', false );
    $('.correct-btn').css("opacity",  "0.7");
    $( '.correct-btn' ).hover( function(e) {

        $(this).css( "opacity", e.type==="mouseenter"?"1":"0.7");
      
    });
    $( '#tia' ).css( 'opacity', '1' )

}

function disableCorrectButtons() {

    $( '.correct-btn' ).attr( 'disabled', true );

}
