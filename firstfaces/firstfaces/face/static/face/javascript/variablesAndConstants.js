///////////// SINE ARRAYS

const SINEARRAYSECONDS = [ 3, 6, 15, 30, 45, 60, 90, 120, 180, 210, 240, 270, 300, 360, 480, 600 ];

var sineArrays = {};
var quickTurnaroundSineArrays = {};
var cumSineArrays = {}

function sinCalc(amount, total_frames, this_frame) {
    return (amount / total_frames) * Math.sin((2 * Math.PI * this_frame / total_frames) - Math.PI / 2) + (amount / total_frames);
}

function sinCalcQuickTurnaround(amount, total_frames, this_frame) {
    return (amount / total_frames) * Math.sin(Math.PI * this_frame / total_frames);
}

for ( let secs of SINEARRAYSECONDS ) {

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

function assignSinArrayForSpeed( speed, object, sArrays ) {

    if ( speed === "0.05" ) {

        object[ 'sin' ] = sArrays[ '3' ];

    } else if ( speed === "0.1" ) {

        object[ 'sin' ] = sArrays[ '6' ];

    } else if ( speed === "0.25" ) {

        object[ 'sin' ] = sArrays[ '15' ];

    } else if ( speed === "0.5" ) {

        object[ 'sin' ] = sArrays[ '30' ];

    } else if ( speed === "0.75" ) {

        object[ 'sin' ] = sArrays[ '45' ];
        
    } else if ( speed === "1" ) {

        object[ 'sin' ] = sArrays[ '60' ];

    } else if ( speed === "1.5" ) {

        object[ 'sin' ] = sArrays[ '90' ];

    } else if ( speed === "2" ) {

        object[ 'sin' ] = sArrays[ '120' ];

    } else if ( speed === "3" ) {

        object[ 'sin' ] = sArrays[ '180' ];

    } else if ( speed === "4" ) {

        object[ 'sin' ] = sArrays[ '240' ];

    } else if ( speed === "5" ) {

        object[ 'sin' ] = sArrays[ '300' ];

    } else if ( speed === "6" ) {

        object[ 'sin' ] = sArrays[ '360' ];

    } else if ( speed === "8" ) {

        object[ 'sin' ] = sArrays[ '480' ];

    } else if ( speed === "10" ) {

        object[ 'sin' ] = sArrays[ '600' ];

    } else {

        alert( "That is not a proper speed!");

    }

    object.sinLength = object.sin.length;
    
}


//////////////// VARIABLES

var scene, camera, renderer, light;
var mainCount = 0;

