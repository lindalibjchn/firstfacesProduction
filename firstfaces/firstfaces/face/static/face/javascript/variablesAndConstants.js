///////////// SINE ARRAYS

const SINEARRAYFRAMES = [ 1, 2 ,3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 75, 90, 120, 150, 180, 210, 240, 270, 300, 360, 420, 480, 540, 600 ];

//// converts seconds to the number of frames
function secsToFrames( secs ) {

    let frames =  Math.floor( secs * 60 );

    var difference;
    let finalFrames = 3;
    let index = 0;
    SINEARRAYFRAMES.forEach( function( f ) {

        if ( index === 0 ) {

            difference = Math.abs( f - frames );
            index = 1;

        } else {

            tempDiff = Math.abs( f - frames );
            
            if ( tempDiff < difference ) {

                difference = tempDiff;
                finalFrames = f;

            }

        }

    })

    return finalFrames;

}

var sineArrays = {};
var quickTurnaroundSineArrays = {};// for nodding
var cumSineArrays = {}// for camera

function sinCalc(amount, total_frames, this_frame) {
    return (amount / total_frames) * Math.sin((2 * Math.PI * this_frame / total_frames) - Math.PI / 2) + (amount / total_frames);
}

function sinCalcQuickTurnaround(amount, total_frames, this_frame) {
    return (amount / total_frames) * Math.sin(Math.PI * this_frame / total_frames);
}

for ( let secs of SINEARRAYFRAMES ) {

    let singleSineArray = [];
    let singleCumSineArray = [];
    let singleQuickTurnaroundSineArray = [];
    let sumOfArraySoFar = 0;

    for ( let i=0; i<secs; i++ ) {

        sinCalcResult = sinCalc( 1, secs, i )
        quickTurnaroundSinCalcResult = sinCalcQuickTurnaround( 1, secs, i )

        sumOfArraySoFar += sinCalcResult;

        singleCumSineArray.push( sumOfArraySoFar );  
        singleSineArray.push( sinCalcResult );  
        singleQuickTurnaroundSineArray.push( quickTurnaroundSinCalcResult );  

    }

    sineArrays[ secs.toString() ] = singleSineArray;
    quickTurnaroundSineArrays[ secs.toString() ] = singleQuickTurnaroundSineArray;
    cumSineArrays[ secs.toString() ] = singleCumSineArray;

};

function assignSinArrayForSpeed( secs, object, sArrays ) {

    //// get no of frames from the seconds input
    let frames = secsToFrames( secs );

    object.sin = sArrays[ frames ];

    object.sinLength = object.sin.length;
    
}


