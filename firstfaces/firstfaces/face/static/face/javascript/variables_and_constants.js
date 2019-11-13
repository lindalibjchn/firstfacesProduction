///////////// SINE ARRAYS

var SINEARRAYFRAMES = [];
for(i=0;i<601;i++){
    SINEARRAYFRAMES.push(i);
}


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


