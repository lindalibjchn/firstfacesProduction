function loadStudents() {

    let phoneCount = 0
    //let conversations = Object.keys(teacherVars.conversations)
    
    Object.keys(teacherVars.conversations).forEach( function( c ) {

        let thisUser = teacherVars.conversations[ c ];
        thisUser.phoneId = phoneCount;
        teacherVars.phoneToStudentId[ phoneCount ] = parseInt( c );
        teacherVars.studentIdToPhone[ parseInt( c ) ] = phoneCount;

        // increase opacity of phone and add hover event
        $( '#phone' + thisUser.phoneId ).removeClass( 'phone-outer-no-student' ).addClass( 'phone-outer-yes-student' );
        $( '#phone' + thisUser.phoneId ).addClass( 'gender-' + thisUser.gender );

        $( '#studentName' + thisUser.phoneId ).text( thisUser.username );
        $( '#flag' + thisUser.phoneId ).attr( 'src', 'static/face/images/country-flags/svg/' + thisUser.nationality + '.svg' );
        $( '#flagFadeOutRight' + thisUser.phoneId ).addClass( 'flag-fade-out-right-' + thisUser.gender );
        $( '#flagFadeOutBottom' + thisUser.phoneId ).addClass( 'flag-fade-out-bottom-' + thisUser.gender );

        $( '#studentDetailsContainer' + thisUser.phoneId ).addClass( 'gender-' + thisUser.gender );
        $( '#studentAge' + thisUser.phoneId ).text( thisUser.age );
        $( '#studentInfoText' + thisUser.phoneId ).text( teacherVars.conversations[ c ].info.join(', ') );

        setMarqueeScrollingSpeed( phoneCount );
        addConversationMeta( thisUser );

        let divForPuttingInPrevSentences = document.getElementById( 'prevSentsContainer' + phoneCount );
        addPreviousSentences( thisUser.conversations[ 0 ], phoneCount );

        phoneCount += 1;

    });

}

function addConversationMeta( thisUser_ ) {

    thisUser_.conversations.forEach( function( c ) {

        let emoji = getEmojiUrl( c.emotion );

        let time;
        //console.log('c.end_time:', c.end_time);
        if ( c.end_time === null ) {

            time = '<p class="cur-conv-time">' + Math.floor( ( ( new Date() ) - c.start_time ) / 60000 ).toString() + '</p>'

        } else {

            //console.log('c.end_time:', c.end_time);
            let d = new Date( c.start_time );
            let month = d.getMonth();
            let day = d.getDate()
            time = '<p class="prev-conv-time">' + day + '/' + month + '</p>'

        }

        //console.log('timeElapsed:', timeElapsed);

        $( '#conversationMeta' + thisUser_.phoneId ).prepend(

            '<div class="conversation-meta-each">' +

                '<div class="w3-col m2 conversation-emotion current-conversation-emotion" id="currentConversationEmotion' + c.id + '">' +
                
                    '<img class="student-emotion-emojis" src="static/face/images/' + emoji + '" >' +

                '</div>' +

                '<div class="w3-col m8 conversation-topic current-conversation-topic" id="currentConversationTopic' + c.id + '">' + c.topic + '</div>' +

                '<div class="w3-col m2 conversation-time current-conversation-time" id="currentConversationTime' + c.id + '">' + time + '</div>' +

            '</div>'

        );

    }) 

    let prevConversations = document.getElementById( 'conversationMeta' + thisUser_.phoneId )
    updateScroll( prevConversations );

}

function getEmojiUrl( emotionInt ) {

    let intToEmojiUrl = {

        0: 'fear_emoji.png',
        1: 'sad_emoji.png',
        2: 'neutral_emoji.png',
        3: 'content_emoji.png',
        4: 'happy_emoji.png',

    };

    return intToEmojiUrl[ emotionInt ];

}


