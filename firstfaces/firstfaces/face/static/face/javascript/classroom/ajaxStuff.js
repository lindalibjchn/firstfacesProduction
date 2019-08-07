// text is string and tiaSpeaker is true if it is tia speaking, false if student
function sendTTS( text, tiaSpeaker ) {

    synthesisObject.ttsServerFault = false;
    //console.log('text:', text);

    // checks if speech has arrived from server
    synthesisObject.gotNewSpeech = false;

    synthesisObject.text = text;

    $.ajax({
        url: "/tts",
        type: "GET",
        data: {
            'gender': classVariables.gender,
            'sentence': text,
            'tiaSpeaker': tiaSpeaker,
            'pitch': synthesisObject.pitch,
            'speaking_rate': synthesisObject.speaking_rate,
            'sessionID': classVariables.session_id,
            //'caller': caller,
            'blob_no_text': classVariables.blob_no_text,
            'blob_no_text_sent_id': classVariables.blob_no_text_sent_id,
        },
        success: function(json) {

            if ( json.synthURL === 'fault' ) {

                synthesisObject.gotNewSpeech = true;
                synthesisObject.ttsServerFault = true;

            } else {

                var synthAudioURL = prefixURL + json.synthURL;
                synthesisObject.synthAudio = document.getElementById( 'synthClip' );
                synthesisObject.synthAudio.src = synthAudioURL;

                // now this is true, other functions waiting on it can continue
                synthesisObject.gotNewSpeech = true;
                
                //if ( tiaSpeaker ) {

                //} else {

                    //// listen is when the user click the listen button so want the audio to play asap
                    ////if ( caller === "listen" ) {

                        ////setTimeout( function() {

                            ////synthesisObject.synthAudio.play();

                        ////}, 500 );

                    ////} else {
                    
                        //console.log('talk speech synth made');

                    ////}

                //}

            }

        },
        error: function() {
            console.log("that's wrong");
        },

    });

}

function sendBlobToServer( blob_to_send ) {

    let fd = new FormData();
    fd.append('data', blob_to_send);
    fd.append('sessionID', classVariables.session_id);
    fd.append('interference', synthesisObject.interference);
    fd.append('blob_no_text', classVariables.blob_no_text);
    fd.append('blob_no_text_sent_id', classVariables.blob_no_text_sent_id);

    
    $.ajax({
        url: "/store_blob",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(json) {
            classVariables.totalAudioLength = json.audio_length;
            classVariables.Aud_Fname = json.audio_file;
            classVariables.blob_no_text = true;
            classVariables.blob_no_text_sent_id = json.sent_id;
            console.log('got response from sending blob to server');
            classVariables.alternatives = json.alternatives;
            classVariables.currentAudID = json.audio_pk;
            classVariables.preSent = classVariables.alternatives[ 0 ][ 'transcript' ]

            // if first interference, then want the flinch not to be interfered with by the return motions
            if ( classVariables.interference_count === 1 && synthesisObject.interference ) {

                console.log('no return');

            } else {

                console.log('return');
                returnFromListenToSpeechSynthesis();

            }

            // dont want to send sentence while doing tutorial
            if ( classVariables.tutorial ) {

                if (classVariables.tutorialStep === 5 ) {

                    $('#recordVoiceBtn').prop( 'disabled', true );
                    $('#talkBtn').prop( 'disabled', true );

                    setTimeout( greeting06, 2000 );

                } else if (classVariables.tutorialStep === 7 ) {

                    $('#recordVoiceBtn').prop( 'disabled', true );
                    $('#talkBtn').prop( 'disabled', true );

                    setTimeout( greeting08, 2000 );

                } else if (classVariables.tutorialStep === 14 ) {

                    classVariables.tutorialStep = 3;
                    $('#recordVoiceBtn').prop( 'disabled', true );
                    $('#talkBtn').prop( 'disabled', true );

                    setTimeout( greeting15, 2000 );

                } else if (classVariables.tutorialStep === 15 ) {

                    classVariables.tutorialStep = 4;
                    $('#recordVoiceBtn').prop( 'disabled', true );
                    $('#talkBtn').prop( 'disabled', true );

                    setTimeout( greeting1601, 2000 );

                }

            }

        },
        error: function() {
            console.log("that's wrong");
        },

    });

}

function correctids(ids){
 var i;
 var out =[];
 for(i=0;i<ids.length;i++){
    out.push(correctID(ids[i]));
 }
 return out
}
function correctID(id){
    var count = 0;
    var i;
    for(i=0;i < id;i++){
        count += $('#upper_'+i).text().trim().split(" ").length;
    }
    return count;
}



function getRemainingAudio(){
    let fd = new FormData();  
    fd.append("ids",classVariables.correct_audio);
    fd.append("poss", correctids(classVariables.correct_audio));
    fd.append("fn", classVariables.Aud_Fname);
    fd.append('sessionID',classVariables.session_id);
    $.ajax({                     
        url: "/get_remaining_audio", 
        type: "POST",             
        data: fd,
        processData: false,
        contentType: false,
        success: function(json) {
            var i;
            var base = "http://127.0.0.1:8000/";
            for(i=0;i<classVariables.correct_audio.length;i++){
                document.getElementById("audio_"+classVariables.correct_audio[i]).src = base+json['paths'][i];
                $("#audio_"+classVariables.correct_audio[i]).attr('duration',json['lens'][i]);
            }
            getAudioLength();
        },
       error: function() {
       },

    } );

}



function sendSentToServer() {
    if(classVariables.playStage2){
        getRemainingAudio();
        
       //i getAudioLength();
    }
    // reset to false
    //classVariables.promptNIndexesReceived = false;
    // reset the number of recordings for the sentence to 0.
    classVariables.blobs = 0;

    // all below for developing
    let sent = classVariables.preSent;

    if ( sent.length >= 300 ) {

        alert( 'This sentence is too long. Please simplify and try again.')

    } else {

        // set this to false until judgement comes in where it will be changed to true
        classVariables.awaitingJudgement = true;

        // if wh-question and if allowed. If not allowed, raise alert 
        //isItQ = checkIfSentIsQuestion( sent );
        //let allowed = true;
        //if ( isItQ ) {

            //if ( calculateQuestionStreak() !== 3 ) {
               
                //allowed = false;
            
            //}

        //}

        //if ( allowed ) { 

        if ( sent.length > 2 ) {
            
            // fade out text box
            $('#textInputContainer').fadeOut( 500 );

            talkToTia(); 
            recTimes = {};
            recTimes.clickTalkBtn = Date.now() / 1000;

            $.ajax({
                url: "/store_sent",
                type: "POST",
                data: { 
                    'sent': sent,
                    //'isItQ': isItQ,
                    'blob_no_text': classVariables.blob_no_text,
                    'blob_no_text_sent_id': classVariables.blob_no_text_sent_id,
                    'sessionID': classVariables.session_id
                },
                success: function(json) {
                    
                    console.log('sentence successfully sent to server');
                    //console.log('json.sent_id:', json.sent_id);
                    checkJudgement( json.sent_id );

                    // for interference stuff, need to reset
                    classVariables.interference_count_this_sent = 0;

                },
                error: function() {
                    alert("sentence failed to send to server");
                },

            });

        } else {

            alert('this is not a sentence');

        }

        //} else {

            //alert("you can only ask a 'Wh-' or 'How' question after 3 correct non-question sentences. The small red circle with the number in it will turn green when you can ask these questions.");

        //}

    }

}

function checkJudgement( sentId ) {

    $.ajax({
        url: "/check_judgement",
        type: "GET",
        data: { 
            'sessId': classVariables.session_id,
            'sentId': sentId,
        },
        success: function(json) {
            
            if ( json.sent_meta.receivedJudgement ) {

                console.log('got judgement');

                if (json.sent_meta.synthURL !== 'fault' ) {

                    synthesisObject.synthAudio = document.getElementById( 'synthClip' );
                    synthesisObject.synthAudio.src = prefixURL + json.sent_meta.synthURL;

                }

                judgementReceived( json.sent_meta )
            
            } else {

                console.log('checking for judgement again');
                checkJudgement( sentId );

            }

        },
        error: function() {
            alert("error awaiting judgement");
        },

    });

}

//classVariables.promptNINdexesCount = 0;
//function checkForPromptNIndexes( sentId ) {

    //console.log('in checkForPromptNIndexes');
    
    //$.ajax({
        //url: "/check_prompt_indexes",
        //type: "GET",
        //data: { 
            //'sentId': sentId,
        //},
        //success: function(json) {
            
            //if ( json.sent_meta.receivedPromptNIndexes ) {

                //if ( classVariables.promptNIndexesReceived === false ) {

                    //console.log('got prompt n indexes');
                    //console.log('indexes:', json.sent_meta.indexes);
                    //classVariables.promptNINdexesCount = 0;
                    //promptNIndexesReceived( json.sent_meta )

                    ////if ( classVariables.lastSentToBeSent ) {

                        ////classVariables.classOver = true;

                    ////}

                //}
            
            //} else {

                //console.log('checking for prompt n indexes again');
                //classVariables.promptNINdexesCount += 1;

                //if ( classVariables.promptNINdexesCount < 20 ) {

                    //setTimeout( function() {

                        //checkForPromptNIndexes( sentId );

                    //}, 2000 );

                //} else {

                    //classVariables.promptNINdexesCount = 0;
                    //setTimeout( function() {

                        //synthesisObject.text = "Sorry, my message has take too long to come across the internet. Please continue."

                        //tiaSpeak( synthesisObject.text, needSendTTS=true, function() {
                         
                            //setTimeout( function() {
                                
                                //returnToLaptop( ' ' );

                            //}, tiaTimings.delayBeforeReturnToLaptop );

                        //})


                    //}, 2000 )

                //}

            //}

        //},
        //error: function() {

            //classVariables.promptNINdexesCount = 0;
            //setTimeout( function(){
            
                //console.log("error awaiting prompt n indexes");
        
                //synthesisObject.text = "Sorry, my message hasn't come across the internet quickly enough. Please continue."

                //tiaSpeak( synthesisObject.text, needSendTTS=true, function() {
                 
                    //setTimeout( function() {
                        
                        //returnToLaptop( ' ' );

                    //}, tiaTimings.delayBeforeReturnToLaptop );

                //})

            //}, 10000 )

        //},

    //});

//}

//function sendTranscriptViewToAjax( choice ) {

    ////console.log('choice:', choice);
    //$.ajax({
        //url: "/add_transcription_choice_view",
        //type: "GET",
        //data: { 
            //'choice': choice,
            //'blob_no_text_sent_id': classVariables.blob_no_text_sent_id,
        //},
        //success: function(json) {
            
           //// console.log('added transcription choice view');

        //},
        //error: function() {
            //alert("error adding transcription choice view");
        //},

    //});

//}

//function sendListenSynth( repeat ) {

    //listenTranscript = false;
    //diffSent = "";
    //transcriptCur = "3";
    //// if not a repeat then something different - is it one of the transcripts?
    //if ( repeat === false ) {

        //if ( synthesisObject['transcript' + synthesisObject.transcriptCur ] === $('#textInput').val() ) {
        
            //listenTranscript = true;
            //transcriptCur = synthesisObject.transcriptCur;

        //} else {

            //// something typed by the learner
            //diffSent = $('#textInput').val();

        //}

    //}

    //$.ajax({
        //url: "/add_listen_synth_data",
        //type: "GET",
        //data: { 
            //'sessId': classVariables.session_id,
            //'diffSent': diffSent,
            //'transcriptCur': transcriptCur,
            //'listenTranscript': listenTranscript,
            //'repeat': repeat,
            //'blob_no_text': classVariables.blob_no_text,
            //'blob_no_text_sent_id': classVariables.blob_no_text_sent_id,
        //},
        //success: function(json) {
            
            //classVariables.blob_no_text = true;
            //classVariables.blob_no_text_sent_id = json.sent_id;

            //console.log('added pronunciation data');

        //},
        //error: function() {
            //alert("error adding pronunciation data");
        //},

    //});

//}

//function sendListenVoice() {

    //$.ajax({
        //url: "/add_voice_data",
        //type: "GET",
        //data: { 
            //'blob_no_text_sent_id': classVariables.blob_no_text_sent_id,
            //'transcript': classVariables.preSent,
        //},
        //success: function(json) {
            
            //console.log('added voice data');

        //},
        //error: function() {
            //alert("error adding pronunciation data");
        //},

    //});

//}

function sendSoundMicToServer( device, TF ) {

    console.log('in sendSoundMicToServer:', device + " " + TF.toString());
    $.ajax({
        url: "/store_sound_mic",
        type: "GET",
        data: { 
            'device': device,
            'TF': JSON.stringify( TF ),
        },
        success: function(json) {
            
            console.log('added device status');

        },
        error: function() {
            alert("error adding device status");
        },

    });

}

function sendTimesToServer() {

    let sentID = classVariables.last_sent.sent_id

    $.ajax({
        url: "/timings",
        type: "GET",
        data: { 
            'sent_id': sentID,
            'timing_dict': JSON.stringify( recTimes ),
        },
        success: function(json) {
            
            console.log('added timings');

        },
        error: function() {
            alert("error adding timings");
        },

    });

}
