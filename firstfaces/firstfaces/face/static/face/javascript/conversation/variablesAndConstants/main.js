const CLASS_TIME_MINUTES = 3000;

var scene, renderer, camera, pointLight, ambientLight, loader
var mainCount = 0;
var prefixURL;

var recorder15sTimeout;
var mediaRecorder;
var chunks;
var record;
var stop;
var aud;

//recorder times in browser
var recTimes = {};

//// CAMERA \\\\

const CAMERA_ENTER_POS = { x: -48, y: 15, z: 150 }
const CAMERA_ENTER_ROT = { x: -0.1, y: 0.05, z: 0 }

const CAMERA_DESK_POS = { x: -10, y: 5, z: 49 }
const CAMERA_DESK_ROT = { x: -0.15, y: -0.2, z: 0 }

const CAMERA_SIT_POS = { x: 0, y: -2, z: 39 };

const CAMERA_SIT_TO_LAPTOP_ROT = { x: -0.29, y: 0, z: 0 };
const CAMERA_SIT_TO_TIA_ROT = { x: 0, y: 0, z: 0 };
const CAMERA_SIT_TO_BOARD_ROT = { x: 0.1, y: 0.6, z: 0 };


//// LIGHT \\\\

const POINTLIGHT_POS = { x: 50, y: 30, z: 60 };


//// TIA BODY PARTS POSITIONS AND ROTATIONS \\\\

const BODY_POS = { x: 0, y: -18.5, z: 7.2 };
const FACE_POS = { x: 0, y: 18.7, z: 2.7 };
const FACE_ROT = { x: 0.0925, y: 0, z: 0 };
const MOUTH_ROT = { x: 0, y: 5.53, z: 1.93 };
const EYEL_POS = { x: 0.03, y: 5.57, z: 1.92 };
const EYER_POS = { x: -3.09, y: 5.57, z: 1.92 };
const EYEL_ROT = { x: -0.02, y: -0.055, z: 0 };
const EYER_ROT = { x: -0.02, y: 0.055, z: 0 };


//// if this is called then it adds lines for each eyeball to show the line of sight
function eyeLineOfSightHelper() {

    var geometry = new THREE.BoxGeometry( 0.1, 0.1, 80 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    var cube2 = new THREE.Mesh( geometry, material );
    tiaObject.eyeBones.eyeL.add( cube );
    tiaObject.eyeBones.eyeR.add( cube2 );

}


//// MOVEMENTS \\\\

// abs coords of expression on enter - completely blank
var movementBase;

// abs coords of expression at current moment
var movementNow;

////////// EYELIDS

// fill with open and closed y-coord for upper middle and lower middle eyelids = {

var eyelidsAbs = {

    'upperMiddle': {},
    'lowerMiddle': {},

}

// Breathe

const secsOneBreath = 180;


///////////// SINE ARRAYS

//const SINETYPEARRAYSECONDS = [ 30, 45, 60 ];
const SINEARRAYFORBREATHESECONDS = [ 180, 210, 240, 270, 300 ]









