
function tiaSpeak( tiaSays ) {

    speechBubbleObject.sentence = " " + tiaSays;
    synthesisObject.text = speechBubbleObject.sentence;
    sendTTS( synthesisObject.text, true, "talk" );
    let delay = 1500 + tiaSays.length * 65;

    setTimeout( function() {
        displaySpeechBubble();
        speakSent()
    }, 2500 );

    function speakSent() {

        if ( synthesisObject.gotNewSpeech ) {
            
            synthesisObject.synthAudio.play();
            synthesisObject.gotNewSpeech = false
            initTalk();

        } else {

            console.log('waiting for speech synthesis to return audio')
            setTimeout( speakSent, 1000 );

        }

    }

    return delay;

}

function showSingleBtn( response, callback ) {

    $('#tutorialBtnSingle').prop( 'disabled', false )
    $('#tutorialBtnSingleCont').fadeIn( 1000 );
    $('#tutorialBtnSingle').text( response );
    $('#tutorialBtnSingle').on( 'click', callback )

}

function showDoubleBtn( response01, response02, callback01, callback02 ) {

    $('.tut-double-btn').prop( 'disabled', false )
    $('#tutorialBtnDoubleCont').fadeIn( 1000 );
    $('#tutorialBtnDouble0').text( response01 );
    $('#tutorialBtnDouble1').text( response02 );
    $('#tutorialBtnDouble0').on( 'click', callback01 );
    $('#tutorialBtnDouble1').on( 'click', callback02 );

}

function removeSingleBtn() {

    $('#tutorialBtnSingle').off( 'click' )
    $('#tutorialBtnSingle').prop( 'disabled', true )
    $('#tutorialBtnSingleCont').fadeOut( 1000 );
    setTimeout( removeSpeechBubble, 1000 );

}

function removeDoubleBtn() {

    $('#tutorialBtnDouble0').off( 'click' )
    $('#tutorialBtnDouble1').off( 'click' )
    $('.tut-double-btn').prop( 'disabled', true )
    $('#tutorialBtnDoubleCont').fadeOut( 1000 );
    setTimeout( removeSpeechBubble, 1000 );

}

function speechBubbleMove( direction ) {

    if ( direction === "down" ) {

        speechBubbleObject.background.position.y -= 5;
        speechBubbleObject.background.position.x += 1;
        speechBubbleObject.background.position.z += 2;
        speechBubbleObject.background.rotation.x -= 0.2;

    } else if ( direction === "up" ) {

        speechBubbleObject.background.position.y += 5;
        speechBubbleObject.background.position.x -= 1;
        speechBubbleObject.background.position.z -= 2;
        speechBubbleObject.background.rotation.x += 0.2;

    }

}

function runTutorial() {

    normalBlinkObject.bool = true;
    showSingleBtn('Nice to meet you Tia.', greeting02);

}

function greeting02() {

    removeSingleBtn();
    let delay = tiaSpeak( "In this class, I will help you with your spoken English. Today, we will do a simple tutorial.");

    setTimeout( function(){

        showSingleBtn( "ok", greeting03 )

    }, delay )

}

function greeting03() {

    removeSingleBtn();
    let delay = tiaSpeak( "You can talk to me by using a microphone. Do you have a microphone on your computer?" );

    setTimeout( function(){

        showDoubleBtn( "yes", "no",  greeting04, greeting14 )

    }, delay )

}

function greeting04() {

    removeDoubleBtn();
    let delay = tiaSpeak( "Great, please make sure your microphone is on and working. We will begin testing it when you click the 'ok' button." );

    $('#recordVoiceBtn').prop( 'disabled', true );

    setTimeout( function(){

        showSingleBtn( "ok", greeting05 )

    }, delay )

}

function greeting05() {

    removeSingleBtn();
    returnToLaptop('');
    $('#recordVoiceBtn').prop( 'disabled', true );

    setTimeout( function(){

        speechBubbleMove('down');
        let delay = tiaSpeak( "Please click the blue microphone button and say 'nice to meet you'. Then click the red stop button." );

        setTimeout( function() {
            
            $('#recordVoiceBtn').prop( 'disabled', false );
    
        }, delay );

    }, 3000 )

}

function greeting06() {

    removeSpeechBubble();
    let textOnLaptop = $.trim($('#textInput').val().toLowerCase());
    console.log('text on laptop');

    if ( textOnLaptop === "nice to meet you" || textOnLaptop === "nice to meet you." ) {

        $('#listenSynthesisBtn').prop( 'disabled', true )
        $('#listenVoiceBtn').prop( 'disabled', true )
        let delay = tiaSpeak( "Great work, now click the play button to hear your own voice." );

        setTimeout( function() {

            $('#listenVoiceBtn').prop( 'disabled', false )

        }, delay );

    } else if ( textOnLaptop === "" ) {

        let delay = tiaSpeak( "There seems to be a problem with the microphone. Please check the settings and try to say 'nice to meet you'." );
        $('.play-btn').prop( 'disabled', true );
        $('#recordVoiceBtn').prop( 'disabled', false );

    } else {

        let delay = tiaSpeak( "That is not quite correct. Click the play button to hear your recording." );

    }

}

function greeting07() {

    removeSpeechBubble();
    let delay = tiaSpeak( "Now click the speaker button to hear the sentence spoken like a native speaker." );

    setTimeout( function() {

        $('#listenSynthesisBtn').prop( 'disabled', false );

    }, delay )

}

function greeting08() {

    $('#textInput').val('')
    removeSpeechBubble();
    let delay = tiaSpeak( "You can also type sentences and then listen to native-like pronunciation. Please type 'this is my first class'. Then click the speaker button." );

    setTimeout( function() {

        $('#listenSynthesisBtn').prop( 'disabled', false );
        classVariableDict.tutorialStep = 1;
        $('#textInput').focus();

    }, delay )

}

function greeting28() {

    removeSpeechBubble();
    let delay = tiaSpeak( "That is not quite correct. Please try again and type 'this is my first class'. Then click the speaker button." );

    setTimeout( function() {

        $('#textInput').focus();

    }, delay )

}


function greeting10() {

    removeSpeechBubble();
    $('#textInputContainer').hide();
    speechBubbleMove( 'up' );
    initCameraMove('tia', '2')

    setTimeout( function() {

        let delay = tiaSpeak( "Well done, you can use the microphone and type very well!" );

        setTimeout( function(){

            classVariableDict.tutorialStep = 2;
            showSingleBtn( 'I am a quick learner!', greeting11 );

        }, delay )

    }, 3000)

}

function greeting11() {

    let delay = tiaSpeak( "If you use the microphone, sometimes the words on the laptop are NOT the same as what you said..." );

    setTimeout( function(){

        showSingleBtn( "why is that?", greeting12 )

    }, delay )

}

function greeting12() {

    let delay = tiaSpeak( "First, it may be a microphone problem..." );

    setTimeout( function(){

        showSingleBtn( "and second...?", greeting13 )

    }, delay )

}

function greeting13() {

    let delay = tiaSpeak( "Second, it may be that your pronunciation is not quite correct." );

    setTimeout( function(){

        showSingleBtn( "I understand", greeting14 )

    }, delay )

}

function greeting14() {

    let delay = tiaSpeak( "So, if the words are worng, listen to your own recording, and the native-like voice. Then you can try again." );

    setTimeout( function(){

        showSingleBtn( "Ok, I'm ready to begin!", greeting14 )

    }, delay )

}


function greeting14() {

    removeDoubleBtn();
    let delay = tiaSpeak( "That's ok, you can talk to me by typing also." );

    setTimeout( function(){

        showDoubleBtn( "yes", "no",  greeting04, greeting14 )

    }, delay )

}

