
function insertPhones() {

    displayPhonesAndSetIds();

    $('.student-info-text-text').hide();

    $('.phone-outer').mouseover( function(){ startScrollingOnHover( this ) } );
    $('.phone-outer').mouseout( function(){ stopScrollingOnHover( this ) } );

}

function displayPhonesAndSetIds () {

    for (let i=0 ; i<3; i++) {

        $('#studentContainerCol').append(

            '<div class="w3-row student-row" id="studentRow' + i.toString() + '">'

        );

        for (let j=0; j<6; j++) {

            let studentNo = i * 6 + j;
            //console.log('studentNo:', studentNo)

            // for production
            if ( studentNo === 0 ) {

            $('#studentRow' + i.toString()).append(

                '<div class="w3-col student-col" id="studentBox' + studentNo.toString() + '">' +
            
                    createStudentHTML( studentNo.toString() ) +

                '</div>'
            
            );

            setMarqueeScrollingSpeed( studentNo );

            }

        }

    }

}

function createStudentHTML( no ) {

    let studentHTML = 

        '<div class="phone-outer" id="phone' + no + '">' +

           '<div class="phone-inner-container">' +

                '<div class="student-details-container">' +

                    '<div class="student-nationality-container">' +

                        '<img class="flag" src="static/face/images/country-flags/svg/cn.svg">' +
                    
                    '</div>' +

                    '<div class="student-name-container w3-row">' +

                        '<div class="w3-col m2">&nbsp</div>' +
                        //'<div class="student-gender w3-col m1" id="studentGender' + no + '"><i class="fa fa-mars"></i></div>' +

                        '<div class="student-name w3-col m8" id="studentName' + no + '">Bartholemew</div>' +


                        '<div class="student-age-gender-container w3-col m2" id="studentAgeGender">' +
                        
                            '<div class="student-age-gender-inner-container">' +

                                '<div class="student-gender" id="studentGender"' + no + '></div>' +
                                    
                                '<div class="student-age" id="studentAge"' + no + '>23</div>' +
                             
                            '</div>' +
                            
                        '</div>' +

                    '</div>' +

                    '<div class="student-info-container">' +
                        
                        '<div class="marquee">' +
                        
                            '<p class="student-info-text student-info-text-text" id="studentInfoText' + no + '">likes computer games, plays basketball on Tuesday evenings, has 3 sisters</p>' +

                        '</div>' +

                    '</div>' +

                '</div>' +

            '</div>' +

        '</div>'

    return studentHTML

}

function setMarqueeScrollingSpeed( studentNo_ ) {

    var outerWidth = $('#studentInfoText' + studentNo_ ).outerWidth();
    var calc = outerWidth / 80;
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
