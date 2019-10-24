function addAvailablesToTimetable( availableTuples ) {

    var summertime = 1; // 0 in winter

    let today = new Date();
    let timeNow = today.getTime() - 3600000 * summertime;
    let nineAms = getNineAms( today, summertime );
    let nineToFiveJavascriptTime = 28800000;//8 hours in javascript time
    
    colourDaysInUCDCOlours( today.getDay() );

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
            'opacity': 1,

        })

        if ( openNow ) {

            turnThisBarIntoButtonToEnterConversation( 'available' + ind );

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

            colour = '#1fb030';

    } else if ( timeNow_ > tup_[ 1 ] ) {

            colour = '#188ac7';

    } else {

        if ( !waitingVariables.class_finished_today ) {
        
            colour = '#102858';
            open = true;

        } else {

            colour = '#1fb030';

        }

    }

    return [ colour, open ]

}

function colourDaysInUCDCOlours( d ) {

    for ( let i=1; i<6; i++ ) {

        let colour = '#188ac7';

        if ( i === d ) {

            colour = '#102858';

        } else if ( i > d ) {

            colour = '#1fb030';

        }

        $('#dayText' + i).css('background-color', colour);

    }

}
function turnThisBarIntoButtonToEnterConversation( barId ) {

    $('#' + barId ).addClass( 'button-for-entering-conversation' );
    $('#' + barId ).append( '<div class="enterText">open</div>' );
    $('#' + barId ).on( 'click', bookConversation );

}

