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
                'upperArm': [[0, 0, 0], [0.2, -0.25, 0]],
                'lowerArm': [[0, 0, 0], [0, 0, 0]],
                'hand': [[0, 0, 0], [0, 0, 0]],
            },
        },
        'sacc': [[0,0,0],[0,0,0]],
    },

    'laptop': {
        'name': 'laptop',
        'AUs': {
            'AU1': {
                'head': [[0, 0, 0], [0.075, 0, 0]],
                'neck': [[0, 0, 0], [0, 0.025, 0]],
            },
            'AU1b': {
                'spineUpperInner': [[0, 0, 0], [0.10, 0, 0]],
                'spineLower': [[0, 0, 0], [0, 0, 0]],
                'spineUpper': [[0, 0, 0], [0, 0, 0]],
            },
            'AU2': {
                'shoulder': [[0, 0, 0], [0, 0, 0]],
            },
            'AU2b': {
                'upperArm': [[0, 0.15, 0], [0.2, -0.15, 0.2]],
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
                'head': [[0, 0, 0], [-0.075, 0.2, 0]],
                'neck': [[0, 0, 0], [0, 0, 0]],
            },
            'AU1b': {
                'spineUpperInner': [[0, 0, 0], [0, 0.1, 0]],
                'spineLower': [[0, 0, 0], [0, 0, 0]],
                'spineUpper': [[0, 0, 0], [0, 0, 0]],
            },
            'AU2': {
                'shoulder': [[0, 0, 0], [0, 0, 0]],
            },
            'AU2b': {
                'hand': [[0, 0, 0], [0, 0, 0]],
                'upperArm': [[0, 0, 0], [0, -0.1, 0]],
                'lowerArm': [[0, 0, 0], [0, 0, 0]],
            },
        },
        'sacc': [[0,0,0],[-0.035,0.2,0]]
    },

    'confused': {
        'name': 'confused',
        'AUs': {
            'AU1': {
                'head': [[0, 0, 0], [0.15, 0.25, 0]],
                'neck': [[0, 0, 0], [0, 0, 0]],
            },
            'AU1b': {
                'spineUpperInner': [[0, 0, 0], [-0.05, 0.15, 0]],
                'spineLower': [[0, 0, 0], [0, 0, 0]],
                'spineUpper': [[0, 0, 0], [0, 0, 0]],
            },
            'AU2': {
                'shoulder': [[0, 0, 0], [0, 0, 0]],
            },
            'AU2b': {
                'hand': [[0, 0, 0], [0, 0, 0]],
                'upperArm': [[0, 0, 0], [0, -0.15, 0]],
                'lowerArm': [[0, 0, 0], [0, 0, 0]],
            },
        },
        'sacc': [[0,0,0],[0.15,0.25,0]]
    },

    'speechRecognitionInput01': {
        'name': 'speechRecognitionInput01',
        'AUs': {
            'AU1': {
                'head': [[0, 0, 0], [-0.05, -0.1, 0]],
                'neck': [[0, 0, 0], [0, 0, 0]],
            },
            'AU1b': {
                'spineLower': [[0, 0, 0], [0, 0, 0]],
                'spineUpper': [[0, 0, 0], [0, 0, 0]],
                'spineUpperInner': [[0, 0, 0], [0.05, -0.02, 0.005]],
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
        'sacc': [[0,0,0],[0,0.08,0]]
    },
 
    'speechRecognitionInput02': {
        'name': 'speechRecognitionInput02',
        'AUs': {
            'AU1': {
                'head': [[0, 0, 0], [-0.1, -0.2, 0]],
                'neck': [[0, 0, 0], [0, 0, 0]],
            },
            'AU1b': {
                'spineLower': [[0, 0, 0], [0, 0, 0]],
                'spineUpper': [[0, 0, 0], [0, 0, 0]],
                'spineUpperInner': [[0, 0, 0], [0.1, -0.04, 0.01]],
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
        'sacc': [[0,0,0],[0,0.16,0]]
    },
 
    'speechRecognitionInput03': {
        'name': 'speechRecognitionInput03',
        'AUs': {
            'AU1': {
                'head': [[0, 0, 0], [-0.15, -0.3, 0]],
                'neck': [[0, 0, 0], [0, 0, 0]],
            },
            'AU1b': {
                'spineLower': [[0, 0, 0], [0, 0, 0]],
                'spineUpper': [[0, 0, 0], [0, 0, 0]],
                'spineUpperInner': [[0, 0, 0], [0.15, -0.06, 0.015]],
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
        'sacc': [[0,0,0],[0,0.24,0]]
    },
 
    'flinch': {
        'name': 'flinch',
        'AUs': {
            'AU1': {
                'head': [[0, 0, 0], [0.05, -0.2, 0]],
                'neck': [[0, 0, 0], [0, 0, 0]],
            },
            'AU1b': {
                'spineLower': [[0, 0, 0], [0, 0, 0]],
                'spineUpper': [[0, 0, 0], [0, 0, 0]],
                'spineUpperInner': [[0, 0, 0], [-0.1, -0.04, 0.01]],
            },
            'AU2': {
                'shoulder': [[0, 0, 0], [0, 0, 0]],
            },
            'AU2b': {
                'hand': [[0, 0, 0], [-0.6, 0, 0]],
                'upperArm': [[0, 0, 0], [-0.8, 0, 0]],
                'lowerArm': [[0, 0, 0], [0, 0, 0]],
            },
        },
        'sacc': [[0,0,0],[0.05,0.2,0]]
    },
}

