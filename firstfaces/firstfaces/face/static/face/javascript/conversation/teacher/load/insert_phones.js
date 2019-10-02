function insertPhones() {

    displayPhonesAndSetIds();
    loadStudents();

}

function displayPhonesAndSetIds () {

    for (let i=0 ; i<3; i++) {

        $('#studentContainerCol').append(

            '<div class="w3-row student-row" id="studentRow' + i.toString() + '">'

        );

        for (let j=0; j<6; j++) {

            let studentNo = i * 6 + j;
            //console.log('studentNo:', studentNo)

            //// for production
            //if ( studentNo === 0 ) {

            $('#studentRow' + i.toString()).append(

                '<div class="w3-col student-col">' +
            
                    createStudentHTML( studentNo.toString() ) +

                '</div>'
            
            );
            //}

        }

    }

    $('.student-info-text-text').hide();
    $('.phone-outer').mouseover( function(){ startScrollingOnHover( this ) } );
    $('.phone-outer').mouseout( function(){ stopScrollingOnHover( this ) } );

}

function createStudentHTML( no ) {

    let studentHTML = 

        '<div class="phone-outer phone-outer-no-student" id="phone' + no + '">' +

           '<div class="phone-inner-container">' +

                '<div class="student-details-container" id="studentDetailsContainer' + no + '">' +

                    '<div class="student-nationality-container">' +

                        '<img class="flag" id="flag' + no + '">' +

                        '<div class="flag-fade-out" id="flagFadeOutRight' + no + '"></div>' +

                        '<div class="flag-fade-out" id="flagFadeOutBottom' + no + '"></div>' +
                    
                    '</div>' +

                    '<div class="student-name-container w3-row">' +

                        '<div class="w3-col m2">&nbsp</div>' +

                        '<div class="student-name w3-col m8" id="studentName' + no + '"></div>' +

                        '<div class="student-age-container w3-col m2" id="studentAgeGender">' +
                        
                            '<div class="student-age-inner-container">' +

                                '<div class="student-age" id="studentAge' + no + '"></div>' +
                             
                            '</div>' +
                            
                        '</div>' +

                    '</div>' +

                    '<div class="student-info-container">' +
                        
                        '<div class="marquee">' +
                        
                            '<p class="student-info-text student-info-text-text" id="studentInfoText' + no + '"></p>' +

                        '</div>' +

                    '</div>' +

                '</div>' +

                '<div class="w3-row conversation-meta" id="conversationMeta' + no + '"></div>' +

                '<div class="current-attempt" id="currentAttempt' + no + '">' +

                '</div>' +

                '<div class="previous-sents-container" id="prevSentsContainer' + no + '">' +

                '</div>' +

                '<div class="message-to-student" id="messageToStudent' + no + '">' +
                    '<textarea class="message-to-student-textarea" id="messageToStudentTextarea' + no + '"></textarea>' +

                '</div>' +

            '</div>' +

        '</div>'

    return studentHTML

}

function insertPrevConversations( no ) {


}

function setMarqueeScrollingSpeed( studentNo_ ) {

    var outerWidth = $('#studentInfoText' + studentNo_ ).outerWidth();
    var calc = outerWidth / 50;
    $('#studentInfoText' + studentNo_ ).css('animation', 'scroll-left linear infinite ' + calc + 's');

}

function startScrollingOnHover( this_ ) {
    
    let phoneNo = this_.id.substring( 5 );
    $('#studentInfoText' + phoneNo ).show()

}

function stopScrollingOnHover( this_ ) {
    
    let phoneNo = this_.id.substring( 5 );
    $('#studentInfoText' + phoneNo ).hide()

}
