function loadStudents() {

    let phoneCount = 0
    let sessions = Object.keys(teacherVars.sessions)
    console.log( 'sessions:', sessions );
    
    sessions.forEach( function() {

        let thisSess = teacherVars.sessions[ sessions[ phoneCount ] ]
    // assign phone to student
        thisSess.phoneId = phoneCount;

        // increase opacity of phone and add hover event
        $( '#phone' + phoneCount.toString() ).removeClass( 'phone-outer-no-student' ).addClass( 'phone-outer-yes-student' );

        $( '#studentName' + phoneCount.toString() ).text( thisSess.username );
        $( '#flag' + phoneCount.toString() ).attr( 'src', 'static/face/images/country-flags/svg/' + thisSess.nationality + '.svg' );
        $( '#studentDetailsContainer' + phoneCount.toString() ).addClass( 'gender-' + thisSess.gender );
        $( '#studentAge' + phoneCount.toString() ).text( thisSess.age );
        $( '#studentInfoText' + phoneCount.toString() ).text( thisSess.info.join(' + ') );


        setMarqueeScrollingSpeed( phoneCount );

        phoneCount += 1;

    });

}
