function tiaPrepareToSpeakWord( tiaSays, speakCb=function(){},  playbackRate=0.9) {
    synthesisObject.now = synthesisObject.data[ tiaSays ]
    synthesisObject.callback = speakCb;
    var new_duration = synthesisObject.now.duration / ((parseInt(document.getElementById("myRange").value)+20)/100);
    synthesisObject.audioS3.src = synthesisObject.now.URLs[ 0 ];
    synthesisObject.audioS3.playbackRate = conversationVariables.playspeed;
    synthesisObject.now.newDuration = new_duration;
    synthesisObject.now.noOfPhones = synthesisObject.now.visemes[ synthesisObject.sentenceNo ].length;
    synthesisObject.now.noOfFrames = Math.floor( (new_duration/1000) * 60 )
    synthesisObject.now.noOfFramesPerPhone = Math.floor( synthesisObject.now.noOfFrames / ( synthesisObject.now.noOfPhones - 1 ) );
    synthesisObject.now.noOfLeftoverFrames = synthesisObject.now.noOfFrames - synthesisObject.now.noOfFramesPerPhone * synthesisObject.now.noOfPhones;
    synthesisObject.gotNewDuration = true;
    breatheObject.singleBreath.outCount = new_duration
    synthesisObject.now.phoneCount = 1;
    buttonsListenNextSentence();

    buttonsHideAllContainers();
    if ( synthesisObject.sentenceNo === 0 ) {

        prepareHeadBobAndTalkingBoolOnFirstSentence()

    }
    tiaSpeakIndividualSentences();
    synthesisObject.audioS3.play();

}

///if(conversationVariables.stage3){
   //    var new_duration = synthesisObject.now.duration / ((parseInt(document.getElementById("myRange").value)+20)/100);
      //console.log(new_duration);
     //   synthesisObject.audioS3.src = prefixURL + 'media/' + synthesisObject.now.URLs[ synthesisObject.sentenceNo ];
    //    synthesisObject.audioS3.playbackRate = conversationVariables.playspeed;
     //   synthesisObject.now.newDuration = new_duration;
      //  synthesisObject.now.noOfPhones = synthesisObject.now.visemes[ synthesisObject.sentenceNo ].length;
       // synthesisObject.now.noOfFrames = Math.floor( (new_duration/1000) * 60 )
       // synthesisObject.now.noOfFramesPerPhone = Math.floor( synthesisObject.now.noOfFrames / ( synthesisObject.now.noOfPhones - 1 ) );
       // synthesisObject.now.noOfLeftoverFrames = synthesisObject.now.noOfFrames - synthesisObject.now.noOfFramesPerPhone * synthesisObject.now.noOfPhones;
       // synthesisObject.gotNewDuration = true;
        //breatheObject.singleBreath.outCount = new_duration
       // animateFirstPhoneSlowly();
       // synthesisObject.audioS3.play();
   // }