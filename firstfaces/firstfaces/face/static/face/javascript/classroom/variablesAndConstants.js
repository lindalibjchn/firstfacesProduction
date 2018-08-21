var classTimeMinutes = 30;

//////////////////// MOVEMENTS //////////////////////////


////////// CAMERA

const CAMERA_ENTER_POSITION_X = -48;
const CAMERA_ENTER_POSITION_Y = 5;
const CAMERA_ENTER_POSITION_Z = 120;

const CAMERA_ENTER_ROTATION_X = -0.1;
const CAMERA_ENTER_ROTATION_Y = -0.3;

const CAMERA_DESK_POSITION_X = -10;
const CAMERA_DESK_POSITION_Y = 5;
const CAMERA_DESK_POSITION_Z = 49;

const CAMERA_DESK_ROTATION_X = -0.15;
const CAMERA_DESK_ROTATION_Y = -0.2;

const CAMERA_POSITION_X = 0;
const CAMERA_POSITION_Y = -2;
const CAMERA_POSITION_Z = 39;

const CAMERA_ROTATION_LAPTOP_X = -0.25;
const CAMERA_ROTATION_LAPTOP_Y = 0;

const CAMERA_ROTATION_TIA_X = 0;
const CAMERA_ROTATION_TIA_Y = 0;

const CAMERA_ROTATION_BOARD_X = 0.1;
const CAMERA_ROTATION_BOARD_Y = 0.6;


// Tia rotate eyes, head and body between board laptop and student

const TIA_EYES_NON_PARALLEL_OFFSET = 0.025;



//////// BODY

var movementObject = {
    'bool': false,
    'startCount': 0,
    'mult': 0,
    'sin': [],
    'sinLength': 0,
}

const blankMovement = {

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
}

//var movementProt = {
    //'AUs': {
        //'AU1': {},
        //'AU1b': {},
        //'AU2': {},
        //'AU2b': {},
    //},
    //'sacc': [[0,0,0],[0,0,0]],
//};

var masterMovementState = $.extend(true, {}, blankMovement);
//var calculatedMovement = $.extend(true, {}, blankMovement);
var relativeMovement = $.extend(true, {}, blankMovement);
var absNeutralMovement;
var absCurMovement;

const boardMovement = {

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

}

const studentMovement = {

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

}
const laptopMovement = {

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
    'sacc': [[0,0,0],[0.3,0,0]],

}

const thinkMovement = {

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

}

const standingStudentMovement = {

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

}

const confused01Movement = {

    'name': 'confused01',
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
    'sacc': [[0,0,0],[0.1,0.15,0]]

}

const lookChairMovement = {

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

}


////////// EXPRESSIONS

var expressionObject = {
    'bool': false,
    'startCount': 0,
    'mult': 0,
    'sin': [],
    'sinLength': 0,
}

//var expressionProt = {
    //'AUs': {
        //'AU1': {},
        //'AU1m': {},
        //'AU2': {},
    //},
    //'eyelids': 0,
//};

const blankExpression = {

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
    },
    'eyelids': 0,

}

var masterExpressionState = $.extend(true, {}, blankExpression);
var calculatedExpression = $.extend(true, {}, blankExpression);
var negativeCalculatedExpression = $.extend(true, {}, blankExpression);
var talkCalculatedExpression = $.extend(true, {}, blankExpression);
var relativeExpression = $.extend(true, {}, blankExpression);
var absNeutralExpression;
var absCurExpression;

const mouthOpenExpression = {

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
    },
    'eyelids': 0,

}

const purseLipsExpression = {

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
    },
    'eyelids': 0,

}

const surpriseExpression = {

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
    },
    'eyelids': 0.2,

}

const happyExpression = {

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
    },
    'eyelids': -0.1,
}

const contentExpression = {

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
    },
    'eyelids': -0.1,

}

const neutralExpression = {

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
    },
    'eyelids': -0.04,

}

const sadExpression = {

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
    },
    'eyelids': -0.1,

}

const fearExpression = {

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
    },
    'eyelids': 0.2,

}

const disgustExpression = {

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
    },
    'eyelids': -0.3,
}

const listeningExpression = {

    'AUs': {
        'AU1': {
            'nose': [[0, 0, 0], [0, 0, 0]],
            'jaw': [[0, 0, 0], [0, 0, 0]],
        },
        'AU1m': {
            'jaw_inner': [[0, 0, 0], [0, 0, 0]],
        },
        'AU2': {
            'eyebrow_inner': [[0, 0.2, 0], [0, 0, 0]],
            'eyebrow_middle': [[0, 0.2, 0], [0, 0, 0]],
            'eyebrow_outer': [[0, 0.2, 0], [0, 0, 0]],
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
    },
    'eyelids': 0.1,

}

const thinkingExpression = {

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
    },
    'eyelids': -0.05,

}

const confusedExpression = {

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
    },
    'eyelids': -0.15,

}

// Breathe

const secsOneBreath = 180;


///////////// SENTENCE ON BOARD

//56 chars per line with one extra space at the beginning
const sentBackLenX = 57;

// sent and correction take 3 each, gap of 1 between sent and correct, and gap of 2 between corr and next sent
const sentBackLenY = 26;

const speechBubbleBackLenX = 58;
const speechBubbleBackLenY = 26;

const sentBackVisiblePOSX = -32;
const sentBackNotVisiblePOSX = -33;
const sentBackPOSY = 3;
const correctionBackPOSY = 0.5;
const sentBackPOSZ = 0;
const sentBackRotY = 1.2;
const speechBubbleBackPOSX = -13;
const speechBubbleBackPOSY = 1.5;
const speechBubbleBackPOSZ = 13;
const speechBubbleBackRotY = 0.2;

const charsInOneLine = 44;
const charX = 1.3;
const charY = 2.8;
const lineX = -28;
const lineY = [ 10, 4, -2, -8, -14 ];
const speechLineY = [ 10, 6, 2, -2, -6, -10, -14 ];

///////////// SINE ARRAYS

//const SINETYPEARRAYSECONDS = [ 30, 45, 60 ];
const SINEARRAYFORBREATHESECONDS = [ 180, 210, 240, 270, 300 ]



/////////////////// OBJECTS


// sentence stuff

var sentenceObject = {
    alphabetDict: {},
    background: {},
    sentence: "",
    splitIndexes: [],
    cloneLetters: [],
    wrongIndexes: [],
}

var correctionObject = {
    correctionBackground: {},
    highlightBackground: {},
    cloneLetters: [],
    splitIndexes: [],
    correctionsIndexes: [],
    corrections: [],
    correctionString: ""
}

var speechBubbleObject = {
    bubble: {},
    background: {},
    cloneLetters: [],
    splitIndexes: [],
    sentence: " Yo hey this is gonna be my speech which will be coming out at a rate of fifty million words per second and that may be a a a difficult to understand." 
}
// movement stuff

// controls all movements on first entry to class
var mainEnterObject = {
    bool: false
}

var cameraObject = {
    'currentState': 'tia',
    'bool': false,
    'startCount': 0,
    'sin': cumSineArrays[ '120' ],
    'sinLength': 0,
};

//second cameraObject for entry
var enterCameraObject = {
    'currentState': 'door',
    'bool': false,
    'startCount': 0,
    'sin': cumSineArrays[ '120' ],
    'sinLength': 0,
};


var tiaObject = {
    'currentState': 'student',
    'bool': false,
    'startCount': 0,
    'sin': cumSineArrays[ '60' ],
    'sinLength': 0,
    'faceBones': {},
    'hairBones': {},
    'bodyBones': {},
    'eyeBones': {}
};

//var headObject = {
    //'rotationY': 0,
    //'rotationYAmount': 0,
    //'rotationYMult': 0,
    //'bool': false,
    //'startCount': 0,
    //'sin': [],
    //'sinLength': 0,
//}

var mouthObject = {
    'bool': false,
    'startCount': 0,
    'sin': sineArrays[ '60' ],
    'sinLength': 0,
    'mouthBones': {},
    'jawRotation': 0,
    'jawRotationAmount': 0,
    'rotationMult': 0,
    'opening': true,
};

///// CONSTRUCTOR FUNCTION

function MoveObj() {

    this.neutralCoords = [[0,0,0],[0,0,0]];
    this.currentCoords = [[0,0,0],[0,0,0]];
    this.movementCoords = [[0,0,0],[0,0,0]];
    this.bool = false;
    this.dir = 1;
    this.startCount = 0;
    this.sin = [];
    this.sinLengh = 0;

}

var eyeObject = new MoveObj();
eyeObject.name = 'eye'

var eyelidObject = new MoveObj();
eyelidObject.coords = {
    close: 1,
    beforeBlinkUpper: 0,
    beforeBlinkLower: 0,
    currentUpper: 0,
    currentLower: 0,
    movementUpper: 0,
    movementLower: 0
}
eyelidObject.name = 'eyelid';

var eyebrowObject = new MoveObj();
eyebrowObject.coords = {
    raised: [[1, 1, 0], [0, 0, 0]]
}
eyebrowObject.name = 'eyebrow';

var leanObject = new MoveObj();
leanObject.coords = {
    middle: [[0, 0, 0], [0, 0, 0]],
    close: [[0, 0, 0], [0.1, 0, 0]],
    far: [[0, 0, 0], [-0.1, 0, 0]]
}
leanObject.name = 'lean';



//////// EXPRESSION OBJECTS

function ExpressionObj() {

    this.bool = false;
    this.dir = 1;
    this.startCount = 0;
    this.sin = [];
    this.sinLengh = 0

}

var happyObject = new ExpressionObj();

var contentObject = new ExpressionObj();

var sadObject = new ExpressionObj();

var fearObject = new ExpressionObj();

var disgustObject = new ExpressionObj();

var confusedObject = new ExpressionObj();



var normalBlinkObject = {
    'bool': false,
    'nextBlinkCount': 60, 
}

var blinkNowObject = {
    'bool': false,
    'countdown': 8,
}

var breatheObject = {
    'sin': sineArrays[ secsOneBreath.toString() ],
    'scaleMult': 0.4 / secsOneBreath,
    // from experimenting the y position of shoulder is 13 times greater than scale of upperspine
    'yPosMult': 40 / secsOneBreath,
    'direction': -1,
};

var spineRandomTiltObject = {
    'startCount': 0,
    'sin': sineArrays[ '120' ],
    'sinLength': 120,
    'mult': 0.3, 
    'direction': Math.random() < 0.5 ? -1 : 1,
    // call the sway to and fro
    'to': true,
}

var neckRandomTiltObject = {
    'startCount': 0,
    'sin': sineArrays[ '180' ],
    'sinLength': 180,
    'mult': 0.2, 
    'direction': Math.random() < 0.5 ? -1 : 1,
    // call the sway to and fro
    'to': true,
}

var nodObject = {
    'bool': false,
    'startCount': 0,
    'sin': [ ],
    'sinLength': 0,
    'amount': 0,
    'decay': [ 0.3, -0.35, 0.3, -0.275, 0.2, -0.175 ],
    'iter': 0,
};

var shakeObject = {
    'bool': false,
    'startCount': 0,
    'sin': [ ],
    'sinLength': 0,
    'amount': 0,
    'decay': [ 0.2, -0.4, 0.35, -0.3, 0.225, -0.075 ],
    'iter': 0,
};

var armIndicateObject = {
    'currentState': 0,
    'startCount': 0,
    'sin': [],
    'sinLength': 0,
    'bool': false,
}

var talkObject = {
    'bool': false,
}

// FULL MOVEMENT OBJECTS

//var backNReadALineObject = {
    //// states 0,1,2,3,4 for middle, start and 3 saccades to end of line
    //'state': 0,
    //'bool': false
//}


// SPEECH STUFF

var synthesisObject = {
    textFromSpeech: "",
    text: "",
    realSpeak: true,
}

var tiaThinkingObject = {

    thinking: false,

}








