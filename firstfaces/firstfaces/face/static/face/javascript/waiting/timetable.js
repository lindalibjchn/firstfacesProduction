function addAvailablesToTimetable( availableTuples ) {

    var summertime = 1; // 0 in winter

    let today = new Date();
    let timeNow = today.getTime() - 3600000 * summertime;
    let nineAms = getNineAms( today, summertime );
    let nineToFiveJavascriptTime = 28800000;//8 hours in javascript time
    
    colourDaysInUCDCOlours( today.getDay() );

    // add time now blinker
    let todaysDay = today.getDay();
    $('#timetableRow' + todaysDay).append(
            
        '<div id="timeNowBlinkerContainer"><div id="timeNowBlinker" class="time-now-bright"></div></div>'

    )
    let todaysLeft = 100 * ( timeNow - nineAms[ todaysDay - 1 ] ) / nineToFiveJavascriptTime
    $('#timeNowBlinkerContainer').css({
        
        'left': todaysLeft.toString() + '%',

    })

    availableTuples.forEach( function( tup, ind ) {

        let date = new Date( tup[ 0 ] );
        let day = date.getDay();
        $('#timetableRow' + day).append(
                
            '<div id="available' + ind + '" class="availables"></div>'

        )
        
        let barColourAndOpenNow = getBarColourAndOpenNow( timeNow, tup );
        let barColour = barColourAndOpenNow[ 0 ];
        let openNow = barColourAndOpenNow[ 1 ];

        let left = 100 * ( tup[ 0 ] - nineAms[ day - 1 ] ) / nineToFiveJavascriptTime;
        let right = 100 * ( tup[ 1 ] - nineAms[ day - 1 ] ) / nineToFiveJavascriptTime;
        let width = right - left;
        $('#available' + ind).css({

            'position': 'absolute',
            'height': '100%',
            'left': left.toString() + '%',
            'width': width.toString() + '%',
            'background-color': barColour,
            'opacity': 0.5,

        })

        if ( openNow ) {

            $('#available' + ind).css({

                'opacity': 1,

            });

            $('#enterButtonInnerContainer').show();

            $('#enterButton').click( bookConversation );

            //turnThisBarIntoButtonToEnterConversation( 'available' + ind );
            //need to activate enter button here

        }

    })

}

function getNineAms( d_, summertime_ ) {

    //Mon = 1
    let dayInteger = d_.getDay();

    let nineAms = [];
    for ( let i=1; i<6; i++ ) {

        let newD = new Date(d_.getFullYear(), d_.getMonth(), d_.getDate(), 9 - summertime_, 0, 0 )
        nineAms.push(newD.setDate(newD.getDate() + i - dayInteger ));

    }

    return nineAms;

}

function getBarColourAndOpenNow( timeNow_, tup_ ) {

    let colour;
    let open = false;

    if ( timeNow_ < tup_[ 0 ] ) {

            //colour = '#1fb030';
            colour = '#1fb030';

    } else if ( timeNow_ > tup_[ 1 ] ) {

            colour = '#1fb030';

    } else {

        if ( !waitingVariables.class_finished_today ) {
        
            //colour = '#102858';
            //colour = '#188ac7';
            colour = '#1fb030';
            open = true;

        } else {

            colour = '#1fb030';

        }

    }

    return [ colour, open ]

}

function colourDaysInUCDCOlours( d ) {

    for ( let i=1; i<6; i++ ) {

        let colour = '#102858';
        //let textColour = '#ffffff';
        let textColour = '#ffffff';
        //let border = 'none';
        let border = "1px solid #188ac7";
        let borderRight = "1px solid #188ac7";
        let borderLeft = "1px solid #102858";

        if ( i === d ) {

            colour = '#102858';
            //colour = '#188ac7';
            //colour = '#1fb030';
            //colour = '#ffffff';
            //textColour = '#E7CA00';
            textColour = '#E7CA00';
            border = "1px solid #188ac7";

        } else if ( i > d ) {

            colour = '#102858';
            //colour = '#1fb030';

        }

        $('#dayText' + i).css('background-color', colour);
        $('#dayText' + i).css('color', textColour);
        $('#dayText' + i).css('border-right', borderRight);
        $('#dayText' + i).css('border-left', borderLeft);

    }

}

function turnThisBarIntoButtonToEnterConversation( barId ) {

    $('#' + barId ).addClass( 'button-for-entering-conversation' );
    $('#' + barId ).append( '<div class="enterText">open</div>' );
    $('#' + barId ).on( 'click', bookConversation );

}

