const CLASS_TIME_MINUTES = 30;

//// CAMERA \\\\

const CAMERA_ENTER_POS = { x: -48, y: 5, z: 120 }
const CAMERA_ENTER_ROT = { x: -0.1, y: 0.3, z: 0 }

const CAMERA_DESK_POS = { x: -10, y: 5, z: 49 }
const CAMERA_DESK_ROT = { x: -0.15, y: -0.2, z: 0 }

const CAMERA_SIT_POS = { x: 0, y: -2, z: 39 };

const CAMERA_SIT_TO_LAPTOP_ROT = { x: -0.25, y: 0, z: 0 };
const CAMERA_SIT_TO_TIA_ROT = { x: 0, y: 0, z: 0 };
const CAMERA_SIT_TO_BOARD_ROT = { x: 0.1, y: 0.6, z: 0 };


//// LIGHT \\\\

const POINTLIGHT_POS = { x: 50, y: 30, z: 60 };


//// TIA BODY PARTS POSITIONS AND ROTATIONS \\\\

const BODY_POS = { x: 0, y: -18.5, z: 7.2 };
const FACE_POS = { x: 0, y: 18.9, z: 2.7 };
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

//// SENTENCE BACKGROUND \\\\

//// 56 chars per line with one extra space at the beginning sent and correction take 3 each, gap of 1 between sent and correct, and gap of 2 between corr and next sent
const sentBackLen = { x: 57, y: 26, z: 0 };
const sentBackPOS = { x: -32, y: 3, z: 0 };
const sentBackROT = { x: 0, y: 1.2, z: 0 };

const correctionBackPOSY = 0.5;


//// SPEECH BUBBLE \\\\

const speechBubblePOS = { x: -13, y: 2, z: 14 };
const speechBubbleSCALE = { x: 5, y: 6, z: 1 };
const speechBubbleROT = { x: 0, y: 0.2, z: 0 };


//// SPEECH BUBBLE BACKGROUND \\\\

const speechBubbleBackLen = { x: 10.5, y: 6.5, z: 0 };
const speechBubbleBackPOS = { x: 0, y: 0, z: 0.01 }; // slightly appear in front of the actual bubble
const speechBubbleBackSCALE = { x: 0.28, y: 0.32, z: 1 };


//// CHARACTER POSITIONS \\\\

const charsInOneLine = 44;
const charX = 1.3; // length (x) of one char on beard
const charY = 2.8; // length (y) of one char on board
const lineX = -28;
const lineY = [ 10, 4, -2, -8, -14 ];
const speechLineY = [ 10, 6, 2, -2, -6, -10, -14 ];


//// MOVEMENTS \\\\

var movementObject = {
    'bool': false,
    'startCount': 0,
    'mult': 0,
    'sin': [],
    'sinLength': 0,
}


var movements = {

    'blank': {
        'AUs': {
            'AU1': {
                'head': [[0, 0, 0], [0, 0, 0]],
                'neck': [[0, 0, 0], [0, 0, 0]],
            },
            'AU1b': {
                'spineLower': [[0, 0, 0], [0, 0, 0]],
                'spineUpper': [[0, 0, 0], [0, 0, 0]],
                'spineUpperInner': [[0, 0, 0], [0, 0, 0]],
            },
            'AU2': {
                'shoulder': [[0, 0, 0], [0, 0, 0]],
            },
            'AU2b': {
                'hand': [[0, 0, 0], [0, 0, 0]],
                'upperArm': [[0, 0, 0], [0, 0, 0]],
                'lowerArm': [[0, 0, 0], [0, 0, 0]],
            },
        },
        'sacc': [[0,0,0],[0,0,0]],
    },

    'board': {
        'name': 'board',
        'AUs': {
            'AU1': {
                'head': [[0, 0, 0], [-0.1, -0.4, 0]],
                'neck': [[0, 0, 0], [0, 0, 0]],
            },
            'AU1b': {
                'spineUpperInner': [[0, 0, 0], [0, -0.4, 0]],
                'spineLower': [[0, 0, 0], [0, 0, 0]],
                'spineUpper': [[0, 0, 0], [0, 0, 0]],
            },
            'AU2': {
                'shoulder': [[0, 0, 0], [0, 0, 0]],
            },
            'AU2b': {
                'hand': [[0, 0, 0], [0, 0, 0]],
                'upperArm': [[0, 0, 0], [0, 0, 0]],
                'lowerArm': [[0, 0, 0], [0, 0, 0]],
            },
        },
        'sacc': [[0,0,0],[0,-0.3,0]]
    },

    'student': {
        'name': 'student',
        'AUs': {
            'AU1': {
                'head': [[0, 0, 0], [0, 0.0175, 0]],
                'neck': [[0, 0, 0], [0, 0, 0]],
            },
            'AU1b': {
                'spineLower': [[0, 0, 0], [0, 0, 0]],
                'spineUpper': [[0, 0, 0], [0, 0, 0]],
                'spineUpperInner': [[0, 0, 0], [0.075, 0, 0]],
            },
            'AU2': {
                'shoulder': [[0, 0, 0], [0, 0, 0]],
            },
            'AU2b': {
                'hand': [[0, 0, 0], [0, 0, 0]],
                'upperArm': [[0, 0, 0], [0, 0, 0]],
                'lowerArm': [[0, 0, 0], [0, 0, 0]],
            },
        },

        'sacc': [[0,0,0],[0,0,0]],
    },

    'laptop': {
        'name': 'laptop',
        'AUs': {
            'AU1': {
                'head': [[0, 0, 0], [0.15, 0, 0]],
                'neck': [[0, 0, 0], [0, 0, 0]],
            },
            'AU1b': {
                'spineUpperInner': [[0, 0, 0], [0.05, 0, 0]],
                'spineLower': [[0, 0, 0], [0, 0, 0]],
                'spineUpper': [[0, 0, 0], [0, 0, 0]],
            },
            'AU2': {
                'shoulder': [[0, 0, 0], [0, 0, 0]],
            },
            'AU2b': {
                'upperArm': [[0, 0.15, 0], [-0.2, -0.05, 0.2]],
                'hand': [[0, 0, 0], [0, 0, 0]],
                'lowerArm': [[0, 0, 0], [0, 0, 0]],
            },
        },
        'sacc': [[0,0,0],[0.2,0,0]],
    },

    'think': {
        'name': 'think',
        'AUs': {
            'AU1': {
                'head': [[0, 0, 0], [-0.025, 0.25, 0]],
                'neck': [[0, 0, 0], [0, 0, 0]],
            },
            'AU1b': {
                'spineUpperInner': [[0, 0, 0], [0, 0.2, 0]],
                'spineLower': [[0, 0, 0], [0, 0, 0]],
                'spineUpper': [[0, 0, 0], [0, 0, 0]],
            },
            'AU2': {
                'shoulder': [[0, 0, 0], [0, 0, 0]],
            },
            'AU2b': {
                'hand': [[0, 0, 0], [0, 0, 0]],
                'upperArm': [[0, 0, 0], [0, 0, 0]],
                'lowerArm': [[0, 0, 0], [0, 0, 0]],
            },
        },
        'sacc': [[0,0,0],[-0.025,0.15,0]]
    },

    'standingStudent': {
        'name': 'standingStudent',
        'AUs': {
            'AU1': {
                'head': [[0, 0, 0], [-0.07, -0.13, 0]],
                'neck': [[0, 0, 0], [0, 0, 0]],
            },
            'AU1b': {
                'spineUpperInner': [[0, 0, 0], [-0.02, -0.08, 0]],
                'spineLower': [[0, 0, 0], [0, 0, 0]],
                'spineUpper': [[0, 0, 0], [0, 0, 0]],
            },
            'AU2': {
                'shoulder': [[0, 0, 0], [0, 0, 0]],
            },
            'AU2b': {
                'hand': [[0, 0, 0], [0, 0, 0]],
                'upperArm': [[0, 0, 0], [0, 0, 0]],
                'lowerArm': [[0, 0, 0], [0, 0, 0]],
            },
        },
        'sacc': [[0,0,0],[0,0,0]]
    },

    'confused': {
        'name': 'confused',
        'AUs': {
            'AU1': {
                'head': [[0, 0, 0], [0.15, 0.25, 0]],
                'neck': [[0, 0, 0], [0, 0, 0]],
            },
            'AU1b': {
                'spineUpperInner': [[0, 0, 0], [0, 0.2, 0]],
                'spineLower': [[0, 0, 0], [0, 0, 0]],
                'spineUpper': [[0, 0, 0], [0, 0, 0]],
            },
            'AU2': {
                'shoulder': [[0, 0, 0], [0, 0, 0]],
            },
            'AU2b': {
                'hand': [[0, 0, 0], [0, 0, 0]],
                'upperArm': [[0, 0, 0], [0, 0, 0]],
                'lowerArm': [[0, 0, 0], [0, 0, 0]],
            },
        },
        'sacc': [[0,0,0],[0.15,0.25,0]]
    },

    'lookChair': {
        'name': 'lookChair',
        'AUs': {
            'AU1': {
                'head': [[0, 0, 0], [0.015, 0.015, 0]],
                'neck': [[0, 0, 0], [0, 0, 0]],
            },
            'AU1b': {
                'spineLower': [[0, 0, 0], [0, 0, 0]],
                'spineUpper': [[0, 0, 0], [0, 0, 0]],
                'spineUpperInner': [[0, 0, 0], [0, 0, 0]],
            },
            'AU2': {
                'shoulder': [[0, 0, 0], [0, 0, 0]],
            },
            'AU2b': {
                'hand': [[0, 0, 0], [0, 0, 0]],
                'upperArm': [[0, 0, 0], [0, 0, 0]],
                'lowerArm': [[0, 0, 0], [0, 0, 0]],
            },
        },
        'sacc': [[0,0,0],[0.2,0.1,0]]
    },
 
}

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

////////// EXPRESSIONS

var expressionObject = {
    'bool': false,
    'startCount': 0,
    'mult': 0,
    'sin': [],
    'sinLength': 0,
}

const expressionsRel = {
    
    'blank': {
        'AUs': {
            'AU1': {
                'nose': [[0, 0, 0], [0, 0, 0]],
                'jaw': [[0, 0, 0], [0, 0, 0]],
            },
            'AU1m': {
                'jaw_inner': [[0, 0, 0], [0, 0, 0]],
            },
            'AU2': {
                'eyebrow_inner': [[0, 0, 0], [0, 0, 0]],
                'eyebrow_middle': [[0, 0, 0], [0, 0, 0]],
                'eyebrow_outer': [[0, 0, 0], [0, 0, 0]],
                'nose_side': [[0, 0, 0], [0, 0, 0]],
                'cheek': [[0, 0, 0], [0, 0, 0]],
                'jaw_upper': [[0, 0, 0], [0, 0, 0]],
                'pal_ja_jooreum': [[0, 0, 0], [0, 0, 0]],
                'lip_upper_inner': [[0, 0, 0], [0, 0, 0]],
                'lip_upper_outer': [[0, 0, 0], [0, 0, 0]],
                'lip_edge_upper': [[0, 0, 0], [0, 0, 0]],
                'lip_edge_lower': [[0, 0, 0], [0, 0, 0]],
                'lip_lower_outer': [[0, 0, 0], [0, 0, 0]],
                'lip_lower_inner': [[0, 0, 0], [0, 0, 0]],
            },
            'eyelids': {
                'eyelid_upper_inner': [[0, 0, 0], [0, 0, 0]],
                'eyelid_upper_middle': [[0, 0, 0], [0, 0, 0]],
                'eyelid_upper_outer': [[0, 0, 0], [0, 0, 0]],
                'eyelid_lower_inner': [[0, 0, 0], [0, 0, 0]],
                'eyelid_lower_middle': [[0, 0, 0], [0, 0, 0]],
                'eyelid_lower_outer': [[0, 0, 0], [0, 0, 0]],
            },
        },
        'eyelids': 0,
    },

    neutral: {
        'name': 'neutral',
        'changeVoice': true,
        'pitch': 0,
        'speaking_rate': 0,
        'AUs': {
            'AU1': {
                'nose': [[0, 0, 0], [0, 0, 0]],
                'jaw': [[0, 0, 0], [0, 0, 0]],
            },
            'AU1m': {
                'jaw_inner': [[0, 0, 0], [0, 0, 0]],
            },
            'AU2': {
                'eyebrow_inner': [[0, 0, 0], [0, 0, 0]],
                'eyebrow_middle': [[0, 0, 0], [0, 0, 0]],
                'eyebrow_outer': [[0, 0, 0], [0, 0, 0]],
                'nose_side': [[0, 0, 0], [0, 0, 0]],
                'cheek': [[0, 0, 0], [0, 0, 0]],
                'jaw_upper': [[0, 0, 0], [0, 0, 0]],
                'pal_ja_jooreum': [[0, 0, 0], [0, 0, 0]],
                'lip_upper_inner': [[0.04, 0.05, -0.08], [0.08, 0, 0]],
                'lip_upper_outer': [[0.06, 0.05, -0.04], [0.08, 0, 0]],
                'lip_edge_upper': [[0.08, 0.06, -0.08], [0, 0, -0.1]],
                'lip_edge_lower': [[0.08, 0.06, -0.08], [0, 0, -0.13]],
                'lip_lower_outer': [[0.06, 0.04, -0.08], [0, 0, 0]],
                'lip_lower_inner': [[0.04, 0.05, -0.04], [0, 0, 0]],
            },
            'eyelids': {
                'eyelid_upper_inner': [[0, -0.014, 0], [0, 0, 0]],
                'eyelid_upper_middle': [[0, -0.018, 0], [0, 0, 0]],
                'eyelid_upper_outer': [[0, -0.014, 0], [0, 0, 0]],
                'eyelid_lower_inner': [[0, 0.008, 0], [0, 0, 0]],
                'eyelid_lower_middle': [[0, 0.008, 0], [0, 0, 0]],
                'eyelid_lower_outer': [[0, 0.008, 0], [0, 0, 0]],
            },
        },
        'eyelids': -0.04,
    },

    surprise: {
        'name': 'surprise',
        'changeVoice': false,
        'AUs': {
            'AU1': {
                'nose': [[0, 0, 0], [0, 0, 0]],
                'jaw': [[0, 0, 0], [0.23, 0, 0]],
            },
            'AU1m': {
                'jaw_inner': [[0, 0, 0], [0.23, 0, 0]],
            },
            'AU2': {
                'eyebrow_inner': [[0, 0.3, 0], [0, 0, 0]],
                'eyebrow_middle': [[0, 0.4, 0], [0, 0, 0]],
                'eyebrow_outer': [[0, 0.3, 0], [0, 0, 0]],
                'nose_side': [[0, 0, 0], [0, 0, 0]],
                'cheek': [[-0.06, 0, 0], [0, 0, 0]],
                'jaw_upper': [[0, 0, -0.15], [0, 0, 0]],
                'pal_ja_jooreum': [[0, -0.3, 0], [0, 0, 0]],
                'lip_upper_inner': [[0, 0.05, 0], [0, 0, -0.1]],
                'lip_upper_outer': [[-0.08, -0.06, 0.05], [0, 0, 0]],
                'lip_edge_upper': [[-0.23, -0.4, 0.1], [0, 0, -0.08]],
                'lip_edge_lower': [[-0.3, -0.65, 0.1], [0, 0, -0.2]],
                'lip_lower_outer': [[-0.1, -1.0, 0.05], [-0.1, 0, -0.14]],
                'lip_lower_inner': [[-0.017, -1, 0], [-0.1, 0, 0]],
            },
            'eyelids': {
                'eyelid_upper_inner': [[0, 0.07, 0], [0, 0, 0]],
                'eyelid_upper_middle': [[0, 0.09, 0], [0, 0, 0]],
                'eyelid_upper_outer': [[0, 0.07, 0], [0, 0, 0]],
                'eyelid_lower_inner': [[0, -0.04, 0], [0, 0, 0]],
                'eyelid_lower_middle': [[0, -0.04, 0], [0, 0, 0]],
                'eyelid_lower_outer': [[0, -0.04, 0], [0, 0, 0]],
            },
        },
        'eyelids': 0.2,
    },

    happy: {
        'name': 'happy',
        'changeVoice': true,
        'pitch': 1.5,
        'speaking_rate': 0.1,
        'AUs': {
            'AU1': {
                'nose': [[0, 0, 0], [0, 0, 0]],
                'jaw': [[0, 0, 0], [0, 0, 0]],
            },
            'AU1m': {
                'jaw_inner': [[0, 0, 0], [0, 0, 0]],
            },
            'AU2': {
                'eyebrow_inner': [[0, 0, 0], [0, 0, 0]],
                'eyebrow_middle': [[0, 0, 0], [0, 0, 0]],
                'eyebrow_outer': [[0, 0, 0], [0, 0, 0]],
                'nose_side': [[0, 0, 0], [0, 0, 0]],
                'cheek': [[0.075, 0.2, 0.15], [0, 0, 0]],
                'jaw_upper': [[0.12, 0.12, 0.05], [0, 0, 0]],
                'pal_ja_jooreum': [[0.075, 0.15, -0.25], [0, 0, 0]],
                'lip_upper_inner': [[0, 0.4, -0.45], [0.45, 0, -0.1]],
                'lip_upper_outer': [[0.1, 0.3, -0.45], [0.3, 0, -0.1]],
                'lip_edge_upper': [[0.15, 0.34, -0.5], [0, 0, -0.3]],
                'lip_edge_lower': [[0.15, 0.34, -0.5], [0, 0, 0.4]],
                'lip_lower_outer': [[0.15, 0.05, -0.4], [-0.1, 0.2, 0.1]],
                'lip_lower_inner': [[0, -0.1, -0.3], [-0.1, 0, 0]],
            },
            'eyelids': {
                'eyelid_upper_inner': [[0, -0.035, 0], [0, 0, 0]],
                'eyelid_upper_middle': [[0, -0.045, 0], [0, 0, 0]],
                'eyelid_upper_outer': [[0, -0.035, 0], [0, 0, 0]],
                'eyelid_lower_inner': [[0, 0.02, 0], [0, 0, 0]],
                'eyelid_lower_middle': [[0, 0.02, 0], [0, 0, 0]],
                'eyelid_lower_outer': [[0, 0.02, 0], [0, 0, 0]],
            },
        },
        'eyelids': -0.1,
    },

    content: {
        'name': 'content',
        'changeVoice': true,
        'pitch': 1,
        'speaking_rate': 0.05,
        'AUs': {
            'AU1': {
                'nose': [[0, 0, 0], [0, 0, 0]],
                'jaw': [[0, 0, 0], [0, 0, 0]],
            },
            'AU1m': {
                'jaw_inner': [[0, 0, 0], [0, 0, 0]],
            },
            'AU2': {
                'eyebrow_inner': [[0, 0, 0], [0, 0, 0]],
                'eyebrow_middle': [[0, 0, 0], [0, 0, 0]],
                'eyebrow_outer': [[0, 0, 0], [0, 0, 0]],
                'nose_side': [[0, 0, 0], [0, 0, 0]],
                'cheek': [[0, 0, 0], [0, 0, 0]],
                'jaw_upper': [[0, 0, 0], [0, 0, 0]],
                'pal_ja_jooreum': [[0, 0, 0], [0, 0, 0]],
                'lip_upper_inner': [[0.1, 0.125, -0.2], [0.2, 0, 0]],
                'lip_upper_outer': [[0.15, 0.125, -0.1], [0.2, 0, 0]],
                'lip_edge_upper': [[0.2, 0.15, -0.2], [0, 0, -0.25]],
                'lip_edge_lower': [[0.2, 0.15, -0.2], [0, 0, -0.3]],
                'lip_lower_outer': [[0.15, 0.11, -0.2], [0, 0, 0]],
                'lip_lower_inner': [[0.1, 0.12, -0.1], [0, 0, 0]],
            },
            'eyelids': {
                'eyelid_upper_inner': [[0, -0.035, 0], [0, 0, 0]],
                'eyelid_upper_middle': [[0, -0.045, 0], [0, 0, 0]],
                'eyelid_upper_outer': [[0, -0.035, 0], [0, 0, 0]],
                'eyelid_lower_inner': [[0, 0.02, 0], [0, 0, 0]],
                'eyelid_lower_middle': [[0, 0.02, 0], [0, 0, 0]],
                'eyelid_lower_outer': [[0, 0.02, 0], [0, 0, 0]],
            },
        },
        'eyelids': -0.1,
    },

    sad: {

        'name': 'sad',
        'changeVoice': true,
        'pitch': -4,
        'speaking_rate': -0.1,
        'AUs': {
            'AU1': {
                'nose': [[0, 0, 0], [0, 0, 0]],
                'jaw': [[0, 0, 0], [0, 0, 0]],
            },
            'AU1m': {
                'jaw_inner': [[0, 0, 0], [0, 0, 0]],
            },
            'AU2': {
                'eyebrow_inner': [[-0.1, 0.2, 0], [0, 0, 0]],
                'eyebrow_middle': [[-0.1, -0.15, 0], [0, 0, 0]],
                'eyebrow_outer': [[-0.1, -0.15, 0], [0, 0, 0]],
                'nose_side': [[0, 0, 0], [0, 0, 0]],
                'jaw_upper': [[0, 0, 0], [0, 0, 0]],
                'cheek': [[0, -0.2, 0], [0, 0, 0]],
                'pal_ja_jooreum': [[0, -0.2, 0], [0, 0, 0]],
                'lip_upper_inner': [[0, 0, 0], [0.3, 0, 0]],
                'lip_upper_outer': [[-0.05, -0.05, 0], [0.3, 0, 0]],
                'lip_edge_upper': [[-0.1, -0.2, 0], [0, 0, 0]],
                'lip_edge_lower': [[-0.1, -0.2, 0], [0, 0, 0]],
                'lip_lower_outer': [[-0.05, -0.05, 0], [0.1, 0, 0]],
                'lip_lower_inner': [[0, 0, 0], [0.2, 0, 0]],
            },
            'eyelids': {
                'eyelid_upper_inner': [[0, -0.035, 0], [0, 0, 0]],
                'eyelid_upper_middle': [[0, -0.045, 0], [0, 0, 0]],
                'eyelid_upper_outer': [[0, -0.035, 0], [0, 0, 0]],
                'eyelid_lower_inner': [[0, 0.02, 0], [0, 0, 0]],
                'eyelid_lower_middle': [[0, 0.02, 0], [0, 0, 0]],
                'eyelid_lower_outer': [[0, 0.02, 0], [0, 0, 0]],
            },
        },
        'eyelids': -0.1,

    },

    fear: {

        'name': 'fear',
        'changeVoice': true,
        'pitch': 1,
        'speaking_rate': -0.05,
        'AUs': {
            'AU1': {
                'nose': [[0, 0, 0], [0, 0, 0]],
                'jaw': [[0, 0, 0], [0, 0, 0]],
            },
            'AU1m': {
                'jaw_inner': [[0, 0, 0], [0, 0, 0]],
            },
            'AU2': {
                'eyebrow_inner': [[-0.2, 0.4, 0], [0, 0, 0]],
                'eyebrow_middle': [[-0.2, 0.2, 0], [0, 0, 0]],
                'eyebrow_outer': [[-0.2, 0.1, 0], [0, 0, 0]],
                'cheek': [[0, 0, 0], [0, 0, 0]],
                'jaw_upper': [[0, 0, 0], [0, 0, 0]],
                'nose_side': [[0, 0, 0], [0, 0, 0]],
                'pal_ja_jooreum': [[0, 0, 0], [0, 0, 0]],
                'lip_upper_inner': [[0, 0, 0], [0, 0, 0]],
                'lip_upper_outer': [[0, 0, -0.1], [0, 0, 0]],
                'lip_edge_upper': [[0.05, -0.1, -0.2], [0, 0, 0]],
                'lip_edge_lower': [[0.05, -0.2, -0.2], [0, 0, 0]],
                'lip_lower_outer': [[0, -0.3, -0.1], [0, 0, 0]],
                'lip_lower_inner': [[0, -0.2, 0], [0, 0, 0]],
            },
            'eyelids': {
                'eyelid_upper_inner': [[0, 0.07, 0], [0, 0, 0]],
                'eyelid_upper_middle': [[0, 0.09, 0], [0, 0, 0]],
                'eyelid_upper_outer': [[0, 0.07, 0], [0, 0, 0]],
                'eyelid_lower_inner': [[0, -0.04, 0], [0, 0, 0]],
                'eyelid_lower_middle': [[0, -0.04, 0], [0, 0, 0]],
                'eyelid_lower_outer': [[0, -0.04, 0], [0, 0, 0]],
            },
        },
        'eyelids': 0.2,

    },

    disgust: {

        'name': 'disgust',
        'changeVoice': true,
        'pitch': -1,
        'speaking_rate': -0.05,
        'AUs': {
            'AU1': {
                'nose': [[0, 0.1, 0], [0, 0, 0]],
                'jaw': [[0, 0, 0], [0, 0, 0]],
            },
            'AU1m': {
                'jaw_inner': [[0, 0, 0], [0, 0, 0]],
            },
            'AU2': {
                'eyebrow_inner': [[-0.15, 0.1, 0], [0, 0, 0]],
                'eyebrow_middle': [[-0.1, -0.2, 0], [0, 0, 0]],
                'eyebrow_outer': [[-0.1, -0.2, 0], [0, 0, 0]],
                'cheek': [[0, 0.5, 0], [0, 0, 0]],
                'jaw_upper': [[0, 0, 0], [0, 0, 0]],
                'nose_side': [[0.2, 0.3, 0.2], [0, 0, 0]],
                'pal_ja_jooreum': [[0, 0.7, 0], [0, 0, 0]],
                'lip_upper_inner': [[0, 0.3, 0], [0.3, 0, 0]],
                'lip_upper_outer': [[0, 0.3, 0], [0, 0, 0]],
                'lip_edge_upper': [[-0.1, -0.1, 0], [0, 0, -0.2]],
                'lip_edge_lower': [[-0.1, -0.15, 0], [0, 0, -0.2]],
                'lip_lower_outer': [[0, -0.1, 0], [0, 0, 0]],
                'lip_lower_inner': [[0, -0.05, 0], [0, 0, 0]],
            },
            'eyelids': {
                'eyelid_upper_inner': [[0, -0.105, 0], [0, 0, 0]],
                'eyelid_upper_middle': [[0, -0.135, 0], [0, 0, 0]],
                'eyelid_upper_outer': [[0, -0.105, 0], [0, 0, 0]],
                'eyelid_lower_inner': [[0, 0.06, 0], [0, 0, 0]],
                'eyelid_lower_middle': [[0, 0.06, 0], [0, 0, 0]],
                'eyelid_lower_outer': [[0, 0.06, 0], [0, 0, 0]],
            },
        },
        'eyelids': -0.3,
    },

    listening: {

        'name': 'listening',
        'changeVoice': false,
        'AUs': {
            'AU1': {
                'nose': [[0, 0, 0], [0, 0, 0]],
                'jaw': [[0, 0, 0], [0, 0, 0]],
            },
            'AU1m': {
                'jaw_inner': [[0, 0, 0], [0, 0, 0]],
            },
            'AU2': {
                'eyebrow_inner': [[0, 0.1, 0], [0, 0, 0]],
                'eyebrow_middle': [[0, 0.1, 0], [0, 0, 0]],
                'eyebrow_outer': [[0, 0.1, 0], [0, 0, 0]],
                'nose_side': [[0, 0, 0], [0, 0, 0]],
                'cheek': [[0, 0, 0], [0, 0, 0]],
                'jaw_upper': [[0, 0, 0], [0, 0, 0]],
                'pal_ja_jooreum': [[0, 0, 0], [0, 0, 0]],
                'lip_upper_inner': [[0.05, 0.06, -0.1], [0.1, 0, 0]],
                'lip_upper_outer': [[0.075, 0.06, -0.05], [0.1, 0, 0]],
                'lip_edge_upper': [[0.1, 0.075, -0.1], [0, 0, -0.125]],
                'lip_edge_lower': [[0.1, 0.075, -0.1], [0, 0, -0.15]],
                'lip_lower_outer': [[0.075, 0.055, -0.1], [0, 0, 0]],
                'lip_lower_inner': [[0.05, 0.06, -0.05], [0, 0, 0]],
            },
            'eyelids': {
                'eyelid_upper_inner': [[0, 0.0175, 0], [0, 0, 0]],
                'eyelid_upper_middle': [[0, 0.0225, 0], [0, 0, 0]],
                'eyelid_upper_outer': [[0, 0.0175, 0], [0, 0, 0]],
                'eyelid_lower_inner': [[0, -0.01, 0], [0, 0, 0]],
                'eyelid_lower_middle': [[0, -0.01, 0], [0, 0, 0]],
                'eyelid_lower_outer': [[0, -0.01, 0], [0, 0, 0]],
            },
        },
        'eyelids': 0.05,

    },

    thinking: {

        'name': 'thinking',
        'changeVoice': false,
        'AUs': {
            'AU1': {
                'nose': [[0, 0, 0], [0, 0, 0]],
                'jaw': [[0, 0, 0], [0, 0, 0]],
            },
            'AU1m': {
                'jaw_inner': [[0, 0, 0], [0, 0, 0]],
            },
            'AU2': {
                'eyebrow_inner': [[-0.05, -0.025, 0.05], [0, 0, 0]],
                'eyebrow_middle': [[-0.05, -0.05, 0.025], [0, 0, 0]],
                'eyebrow_outer': [[-0.025, -0.05, 0], [0, 0, 0]],
                'nose_side': [[0, 0, 0], [0, 0, 0]],
                'cheek': [[0, 0, 0], [0, 0, 0]],
                'jaw_upper': [[0, 0, 0], [0, 0, 0]],
                'pal_ja_jooreum': [[0, 0, 0], [0, 0, 0]],
                'lip_upper_inner': [[0, 0, 0], [0, 0, 0]],
                'lip_upper_outer': [[-0.05, 0, 0], [0, 0, 0]],
                'lip_edge_upper': [[-0.1, 0, 0], [0, 0, 0]],
                'lip_edge_lower': [[-0.1, 0, 0], [0, 0, 0]],
                'lip_lower_outer': [[-0.05, 0, 0], [0, 0, 0]],
                'lip_lower_inner': [[0, 0, 0], [0, 0, 0]],
            },
            'eyelids': {
                'eyelid_upper_inner': [[0, -0.035, 0], [0, 0, 0]],
                'eyelid_upper_middle': [[0, -0.045, 0], [0, 0, 0]],
                'eyelid_upper_outer': [[0, -0.035, 0], [0, 0, 0]],
                'eyelid_lower_inner': [[0, 0.02, 0], [0, 0, 0]],
                'eyelid_lower_middle': [[0, 0.02, 0], [0, 0, 0]],
                'eyelid_lower_outer': [[0, 0.02, 0], [0, 0, 0]],
            },
        },
        'eyelids': -0.1,

    },

    'confused': {

        'name': 'confused',
        'changeVoice': true,
        'pitch': 0,
        'speaking_rate': 0,
        'AUs': {
            'AU1': {
                'nose': [[0, 0, 0], [0, 0, 0]],
                'jaw': [[0, 0, 0], [0, 0, 0]],
            },
            'AU1m': {
                'jaw_inner': [[0, 0, 0], [0, 0, 0]],
            },
            'AU2': {
                'eyebrow_inner': [[-0.1, -0.1, 0], [0, 0, 0]],
                'eyebrow_middle': [[-0.075, -0.1, 0], [0, 0, 0]],
                'eyebrow_outer': [[-0.05, -0.1, 0], [0, 0, 0]],
                'nose_side': [[0, 0, 0], [0, 0, 0]],
                'cheek': [[0, 0, 0], [0, 0, 0]],
                'jaw_upper': [[0, 0, 0], [0, 0, 0]],
                'pal_ja_jooreum': [[0, 0, 0], [0, 0, 0]],
                'lip_upper_inner': [[0, 0, 0], [0, 0, 0]],
                'lip_upper_outer': [[-0.05, 0, 0], [0, 0, 0]],
                'lip_edge_upper': [[-0.1, 0, 0], [0, 0, 0]],
                'lip_edge_lower': [[-0.1, 0, 0], [0, 0, 0]],
                'lip_lower_outer': [[-0.05, 0, 0], [0, 0, 0]],
                'lip_lower_inner': [[0, 0, 0], [0, 0, 0]],
            },
            'eyelids': {
                //'eyelid_upper_inner': [[0, -0.07, 0], [0, 0, 0]],
                //'eyelid_upper_middle': [[0, -0.09, 0], [0, 0, 0]],
                //'eyelid_upper_outer': [[0, -0.07, 0], [0, 0, 0]],
                //'eyelid_lower_inner': [[0, 0.04, 0], [0, 0, 0]],
                //'eyelid_lower_middle': [[0, 0.04, 0], [0, 0, 0]],
                //'eyelid_lower_outer': [[0, 0.04, 0], [0, 0, 0]],
                'eyelid_upper_inner': [[0, 0, 0], [0, 0, 0]],
                'eyelid_upper_middle': [[0, 0, 0], [0, 0, 0]],
                'eyelid_upper_outer': [[0, 0, 0], [0, 0, 0]],
                'eyelid_lower_inner': [[0, 0, 0], [0, 0, 0]],
                'eyelid_lower_middle': [[0, 0, 0], [0, 0, 0]],
                'eyelid_lower_outer': [[0, 0, 0], [0, 0, 0]],
            },
        },
        //'eyelids': -0.2,
        'eyelids': 0,

    },

    'mouthOpen': {
        'name': 'mouthOpen',
        'changeVoice': false,
        'AUs': {
            'AU1': {
                'nose': [[0, 0, 0], [0, 0, 0]],
                'jaw': [[0, 0, 0], [0.23, 0, 0]],
            },
            'AU1m': {
                'jaw_inner': [[0, 0, 0], [0.23, 0, 0]],
            },
            'AU2': {
                'eyebrow_inner': [[0, 0, 0], [0, 0, 0]],
                'eyebrow_middle': [[0, 0, 0], [0, 0, 0]],
                'eyebrow_outer': [[0, 0, 0], [0, 0, 0]],
                'nose_side': [[0, 0, 0], [0, 0, 0]],
                'cheek': [[-0.06, 0, 0], [0, 0, 0]],
                'jaw_upper': [[0, 0, -0.15], [0, 0, 0]],
                'pal_ja_jooreum': [[0, -0.3, 0], [0, 0, 0]],
                'lip_upper_inner': [[0, 0.05, 0], [0, 0, -0.1]],
                'lip_upper_outer': [[-0.08, -0.06, 0.05], [0, 0, 0]],
                'lip_edge_upper': [[-0.23, -0.4, 0.1], [0, 0, -0.08]],
                'lip_edge_lower': [[-0.3, -0.65, 0.1], [0, 0, -0.2]],
                'lip_lower_outer': [[-0.1, -1.0, 0.05], [-0.1, 0, -0.14]],
                'lip_lower_inner': [[-0.017, -1, 0], [-0.1, 0, 0]],
            },
            'eyelids': {
                'eyelid_upper_inner': [[0, 0, 0], [0, 0, 0]],
                'eyelid_upper_middle': [[0, 0, 0], [0, 0, 0]],
                'eyelid_upper_outer': [[0, 0, 0], [0, 0, 0]],
                'eyelid_lower_inner': [[0, 0, 0], [0, 0, 0]],
                'eyelid_lower_middle': [[0, 0, 0], [0, 0, 0]],
                'eyelid_lower_outer': [[0, 0, 0], [0, 0, 0]],
            },
        },
        'eyelids': 0,
    },

    'purseLips': {
        'name': 'purseLips',
        'changeVoice': false,
        'AUs': {
            'AU1': {
                'nose': [[0, 0, 0], [0, 0, 0]],
                'jaw': [[0, 0, 0], [0, 0, 0]],
            },
            'AU1m': {
                'jaw_inner': [[0, 0, 0], [0, 0, 0]],
            },
            'AU2': {
                'eyebrow_inner': [[0, 0, 0], [0, 0, 0]],
                'eyebrow_middle': [[0, 0, 0], [0, 0, 0]],
                'eyebrow_outer': [[0, 0, 0], [0, 0, 0]],
                'nose_side': [[0, 0, 0], [0, 0, 0]],
                'cheek': [[0, 0, 0], [0, 0, 0]],
                'jaw_upper': [[0, 0, 0], [0, 0, 0]],
                'pal_ja_jooreum': [[0, 0, 0], [0, 0, 0]],
                'lip_upper_inner': [[-0.1, 0, 0.05], [0, 0, 0]],
                'lip_upper_outer': [[-0.2, 0, 0.15], [0, 0, 0]],
                'lip_edge_upper': [[-0.3, 0, 0.3], [0, 0.3, 0]],
                'lip_edge_lower': [[-0.3, 0, 0.3], [0, 0.3, 0]],
                'lip_lower_outer': [[-0.15, 0, 0.15], [0, 0, 0]],
                'lip_lower_inner': [[-0.05, 0, 0.05], [0, 0, 0]],
            },
            'eyelids': {
                'eyelid_upper_inner': [[0, 0, 0], [0, 0, 0]],
                'eyelid_upper_middle': [[0, 0, 0], [0, 0, 0]],
                'eyelid_upper_outer': [[0, 0, 0], [0, 0, 0]],
                'eyelid_lower_inner': [[0, 0, 0], [0, 0, 0]],
                'eyelid_lower_middle': [[0, 0, 0], [0, 0, 0]],
                'eyelid_lower_outer': [[0, 0, 0], [0, 0, 0]],
            },
        },
        'eyelids': 0,
    }

}

// dict of above but Abs rather than Rel will calculate this on enter
var expressionsAbs = {};

// abs coords of expression on enter - completely blank
var expressionBase;

// abs coords of expression at current moment
var expressionNow;

var calculatedExpression;
var calculatedTalkExpression;

//var masterExpressionState = $.extend(true, {}, blankExpression);
//var calculatedExpression = $.extend(true, {}, blankExpression);
//var negativeCalculatedExpression = $.extend(true, {}, blankExpression);
//var talkCalculatedExpression = $.extend(true, {}, blankExpression);
//var relativeExpression = $.extend(true, {}, blankExpression);
//var absNeutralExpression;
//var absCurExpression;


// Breathe

const secsOneBreath = 180;


///////////// SINE ARRAYS

//const SINETYPEARRAYSECONDS = [ 30, 45, 60 ];
const SINEARRAYFORBREATHESECONDS = [ 180, 210, 240, 270, 300 ]









