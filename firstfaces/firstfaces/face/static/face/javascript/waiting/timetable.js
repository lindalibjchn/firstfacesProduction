//var summertime = 1; // 0 in winter
var timeNow;
var today;
var nineAms;
let nineToFiveJavascriptTime = 28800000;//8 hours in javascript time
var todaysDay;
var timezoneOffsetInUnix;
var today_timezone;
    
function getTimeNow( first ) {

    today_timezone = new Date();
    timezoneOffsetInUnix = today_timezone.getTimezoneOffset() * 60000
    timeNow = today_timezone.getTime() + timezoneOffsetInUnix
    today = new Date( timeNow )

    if ( first ) {

        nineAms = getNineAms( today/*, summertime*/ );
        todaysDay = today_timezone.getUTCDay();
    
    }

    //timeNow = today.getTime() [>- 28800000<];
}



function addAvailablesToTimetable( availableTuples, first=false ) {

    getTimeNow( first );
    if ( first ) {
    
        colourDaysInUCDCOlours( today.getDay() );

    }

    // add time now blinker

    let classIsOpen = false;
    let closestAfterClass = null;
    availableTuples.forEach( function( tup, ind ) {

        if ( first ) {
        
            tup[ 0 ] += timezoneOffsetInUnix;
            tup[ 1 ] += timezoneOffsetInUnix;
        
        }

        let date = new Date( tup[ 0 ] );
        let day = date.getUTCDay();
        $('#timetableRow' + day).empty();
        $('#timetableRow' + day).append(
                
            '<div id="available' + ind + '" class="availables"></div>'

        )
        
        let barColourAndOpenNow = getBarColourAndOpenNow( tup );
        let beforeDuringAfter = barColourAndOpenNow[ 0 ];
        let openNow = barColourAndOpenNow[ 1 ];

        //console.log('openNow:', openNow)
        if ( beforeDuringAfter === 'after' && closestAfterClass === null ) {

            closestAfterClass = tup[0];

        }

        let left = 100 * ( tup[ 0 ] - nineAms[ day - 1 ] ) / nineToFiveJavascriptTime;
        let right = 100 * ( tup[ 1 ] - nineAms[ day - 1 ] ) / nineToFiveJavascriptTime;
        let width = right - left;
        $('#available' + ind).css({

            'position': 'absolute',
            'height': '100%',
            'left': left.toString() + '%',
            'width': width.toString() + '%',
            'background-color': '#1fb030',
            'opacity': 0.7,

        })

        if ( openNow ) {

            classIsOpen = true;
            $('#available' + ind).css({

                'opacity': 1,

            });
        
        }

    })

    if ( classIsOpen === false ) {

        //console.log( 'closestAfterClass:', closestAfterClass );
        if ( closestAfterClass !== null ) { 

            showButtonToEnterOrTextForUpcoming( 'upcoming', closestAfterClass );

        } else {

            showButtonToEnterOrTextForUpcoming( 'none', null );
        
        }

    } else {

        showButtonToEnterOrTextForUpcoming( 'enter', null );

    }

    insertBlinker();
}

function getNineAms( d_/*, summertime_*/ ) {

    //Mon = 1
    let dayInteger = d_.getDay();

    let nineAms = [];
    for ( let i=1; i<6; i++ ) {

        let newD = new Date(d_.getFullYear(), d_.getMonth(), d_.getDate(), 9 /*- summertime_ */, 0, 0 )
        nineAms.push(newD.setDate(newD.getDate() + i - dayInteger ));

    }

    return nineAms;

}

function getBarColourAndOpenNow( tup_ ) {

    //let colour;
    let beforeDuringAfter;
    let open = false;
    //console.log('timeNow:', timeNow)

    if ( timeNow < tup_[ 0 ] ) {

            //colour = '#1fb030';
            //colour = '#1fb030';
            beforeDuringAfter = 'after'

    } else if ( timeNow > tup_[ 1 ] ) {

            //colour = '#1fb030';
            beforeDuringAfter = 'before'

    } else {

        if ( !waitingVariables.class_finished_today ) {
        
            //colour = '#102858';
            //colour = '#188ac7';
            colour = '#1fb030';
            beforeDuringAfter = 'during'
            open = true;

        } else {

            //colour = '#1fb030';

        }

    }

    return [ beforeDuringAfter, open ]

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

//function turnThisBarIntoButtonToEnterConversation( barId ) {

    //$('#' + barId ).addClass( 'button-for-entering-conversation' );
    //$('#' + barId ).append( '<div class="enterText">open</div>' );
    //$('#' + barId ).on( 'click', bookConversation );

//}

function insertBlinker() {
    
    $( '#timeNowBlinkerContainer' ).remove();
    
    $( '#timetableRow' + todaysDay ).append(
            
        '<div id="timeNowBlinkerContainer"><div id="timeNowBlinker" class="time-now-bright"></div></div>'

    )
    
    getTimeNow();
    let todaysLeft = 100 * ( timeNow - nineAms[ todaysDay - 1 ] ) / nineToFiveJavascriptTime

    $('#timeNowBlinkerContainer').css({
        
        'left': todaysLeft.toString() + '%',

    })

}

var numbersToDays = {

    0: 'Sun',
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat'

}
function showButtonToEnterOrTextForUpcoming( option, upcomingClass ) {
   
    $('#enterButton').off( 'click' );
    $('#enterButtonInnerContainer').hide();
    $('#nextClassInnerContainer').hide();
    $( '#nextClassInfo' ).hide()
    $( '#noNextClassInfo' ).hide()

    if ( option === 'enter' ) {

        $('#enterButtonInnerContainer').show();
        $('#enterButton').click( bookConversation );

    } else {
        
        $('#nextClassInnerContainer').show();
        if ( option === 'upcoming' ) {

            date = new Date( upcomingClass )
            day = numbersToDays[ date.getDay() ];
            //console.log('day:', day)
            hours = (date.getHours()<10?'0':'') + date.getHours();
            //console.log('hours:', hours)
            minutes = (date.getMinutes()<10?'0':'') + date.getMinutes();
            //console.log('minutes:', minutes)
            $( '#nextClassInfo' ).show()
            $('#nextClassSpan').text( day + " " + hours + ":" + minutes );

        } else {

            $( '#noNextClassInfo' ).show()

        }

    }

}

