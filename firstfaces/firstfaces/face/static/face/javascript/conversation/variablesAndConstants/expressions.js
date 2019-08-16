var expressionObject = {
    'bool': false,
    'startCount': 0,
    'mult': 0,
    'sin': [],
    'sinLength': 0,
    'now': {},
    'base': {},//abs coordinates on enter with no movement
    'calculated': {},//from mix of two expressions possibly
    'talk': {}, //to begin talking,
    'movement': {}, // how much movement to be done
    'abs': {},//all abs (to be filled on page load) 
    'rel': {    
        'blank': {
            'name': 'blank',
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
                //'eyelids': {
                    //'eyelid_upper_inner': [[0, -0.014, 0], [0, 0, 0]],
                    //'eyelid_upper_middle': [[0, -0.018, 0], [0, 0, 0]],
                    //'eyelid_upper_outer': [[0, -0.014, 0], [0, 0, 0]],
                    //'eyelid_lower_inner': [[0, 0.008, 0], [0, 0, 0]],
                    //'eyelid_lower_middle': [[0, 0.008, 0], [0, 0, 0]],
                    //'eyelid_lower_outer': [[0, 0.008, 0], [0, 0, 0]],
                //},
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
                //'eyelids': {
                    //'eyelid_upper_inner': [[0, 0.07, 0], [0, 0, 0]],
                    //'eyelid_upper_middle': [[0, 0.09, 0], [0, 0, 0]],
                    //'eyelid_upper_outer': [[0, 0.07, 0], [0, 0, 0]],
                    //'eyelid_lower_inner': [[0, -0.04, 0], [0, 0, 0]],
                    //'eyelid_lower_middle': [[0, -0.04, 0], [0, 0, 0]],
                    //'eyelid_lower_outer': [[0, -0.04, 0], [0, 0, 0]],
                //},
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
                    'cheek': [[0.1, 0.3, 0.2], [0, 0, 0]],
                    'jaw_upper': [[0.15, 0.15, 0.05], [0, 0, 0]],
                    'pal_ja_jooreum': [[0.085, 0.2, -0.25], [0, 0, 0]],
                    'lip_upper_inner': [[0, 0.4, -0.45], [0.45, 0, -0.1]],
                    'lip_upper_outer': [[0.15, 0.3, -0.45], [0.3, 0, -0.1]],
                    'lip_edge_upper': [[0.30, 0.34, -0.5], [0, 0, -0.3]],
                    'lip_edge_lower': [[0.225, 0.365, -0.5], [0, 0, 0.4]],
                    'lip_lower_outer': [[0.225, 0.15, -0.4], [-0.1, 0.2, 0.1]],
                    'lip_lower_inner': [[0.1, 0.005, -0.3], [-0.1, 0, 0]],
                },
                //'eyelids': {
                    //'eyelid_upper_inner': [[0, -0.035, 0], [0, 0, 0]],
                    //'eyelid_upper_middle': [[0, -0.045, 0], [0, 0, 0]],
                    //'eyelid_upper_outer': [[0, -0.035, 0], [0, 0, 0]],
                    //'eyelid_lower_inner': [[0, 0.02, 0], [0, 0, 0]],
                    //'eyelid_lower_middle': [[0, 0.02, 0], [0, 0, 0]],
                    //'eyelid_lower_outer': [[0, 0.02, 0], [0, 0, 0]],
                //},
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
                    'cheek': [[0.1, 0.2, 0.1], [0, 0, 0]],
                    'jaw_upper': [[0.09, 0.06, 0.025], [0, 0, 0]],
                    'pal_ja_jooreum': [[0.075, 0.1, -0.125], [0, 0, 0]],
                    'lip_upper_inner': [[0.1, 0.125, -0.2], [0.2, 0, 0]],
                    'lip_upper_outer': [[0.18, 0.135, -0.1], [0.2, 0, 0]],
                    'lip_edge_upper': [[0.225, 0.17, -0.2], [0, 0, -0.25]],
                    'lip_edge_lower': [[0.225, 0.17, -0.2], [0, 0, -0.3]],
                    'lip_lower_outer': [[0.18, 0.12, -0.2], [0, 0, 0]],
                    'lip_lower_inner': [[0.1, 0.12, -0.1], [0, 0, 0]],
                },
                //'eyelids': {
                    //'eyelid_upper_inner': [[0, -0.035, 0], [0, 0, 0]],
                    //'eyelid_upper_middle': [[0, -0.045, 0], [0, 0, 0]],
                    //'eyelid_upper_outer': [[0, -0.035, 0], [0, 0, 0]],
                    //'eyelid_lower_inner': [[0, 0.02, 0], [0, 0, 0]],
                    //'eyelid_lower_middle': [[0, 0.02, 0], [0, 0, 0]],
                    //'eyelid_lower_outer': [[0, 0.02, 0], [0, 0, 0]],
                //},
            },
            'eyelids': -0.05,
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
                    'jaw_upper': [[0, -0.1, 0], [0, 0, 0]],
                    'cheek': [[0, -0.2, 0], [0, 0, 0]],
                    'pal_ja_jooreum': [[-0.2, -0.2, 0], [0, 0, 0]],
                    'lip_upper_inner': [[0, 0, 0], [0.3, 0, 0]],
                    'lip_upper_outer': [[-0.05, -0.05, 0], [0.3, 0, 0]],
                    'lip_edge_upper': [[-0.1, -0.2, 0], [0, 0, 0]],
                    'lip_edge_lower': [[-0.1, -0.2, 0], [0, 0, 0]],
                    'lip_lower_outer': [[-0.05, -0.05, 0], [0.1, 0, 0]],
                    'lip_lower_inner': [[0, 0, 0], [0.2, 0, 0]],
                },
                //'eyelids': {
                    //'eyelid_upper_inner': [[0, -0.035, 0], [0, 0, 0]],
                    //'eyelid_upper_middle': [[0, -0.045, 0], [0, 0, 0]],
                    //'eyelid_upper_outer': [[0, -0.035, 0], [0, 0, 0]],
                    //'eyelid_lower_inner': [[0, 0.02, 0], [0, 0, 0]],
                    //'eyelid_lower_middle': [[0, 0.02, 0], [0, 0, 0]],
                    //'eyelid_lower_outer': [[0, 0.02, 0], [0, 0, 0]],
                //},
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
                    'cheek': [[0, -0.1, -0.05], [0, 0, 0]],
                    'jaw_upper': [[-0.1, -0.2, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'pal_ja_jooreum': [[0, -0.3, -0.1], [0, 0, 0]],
                    'lip_upper_inner': [[0, 0, 0], [0, 0, 0]],
                    'lip_upper_outer': [[0, 0, -0.1], [0, 0, 0]],
                    'lip_edge_upper': [[0.05, -0.1, -0.2], [0, 0, 0]],
                    'lip_edge_lower': [[0.05, -0.2, -0.2], [0, 0, 0]],
                    'lip_lower_outer': [[0, -0.3, -0.1], [0, 0, 0]],
                    'lip_lower_inner': [[0, -0.2, 0], [0, 0, 0]],
                },
                //'eyelids': {
                    //'eyelid_upper_inner': [[0, 0.07, 0], [0, 0, 0]],
                    //'eyelid_upper_middle': [[0, 0.09, 0], [0, 0, 0]],
                    //'eyelid_upper_outer': [[0, 0.07, 0], [0, 0, 0]],
                    //'eyelid_lower_inner': [[0, -0.04, 0], [0, 0, 0]],
                    //'eyelid_lower_middle': [[0, -0.04, 0], [0, 0, 0]],
                    //'eyelid_lower_outer': [[0, -0.04, 0], [0, 0, 0]],
                //},
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
            },
            'eyelids': -0.25,
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
                    'lip_upper_inner': [[0, -0.025, 0], [0, 0, 0]],
                    'lip_upper_outer': [[-0.05, -0.025, 0], [0, 0, 0]],
                    'lip_edge_upper': [[-0.1, 0, 0], [0, 0, 0]],
                    'lip_edge_lower': [[-0.1, 0, 0], [0, 0, 0]],
                    'lip_lower_outer': [[-0.05, 0.025, 0], [0, 0, 0]],
                    'lip_lower_inner': [[0, 0.025, 0], [0, 0, 0]],
                },
            },
            'eyelids': -0.1,

        },

        confused: {

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
                    'eyebrow_inner': [[-0.1, -0.15, 0], [0, 0, 0]],
                    'eyebrow_middle': [[-0.075, -0.15, 0], [0, 0, 0]],
                    'eyebrow_outer': [[-0.05, -0.15, 0], [0, 0, 0]],
                    'nose_side': [[0, 0.15, 0.1], [0, 0, 0]],
                    'cheek': [[0.1, 0.25, 0], [0, 0, 0]],
                    'jaw_upper': [[0, 0, 0], [0, 0, 0]],
                    'pal_ja_jooreum': [[0, 0, 0], [0, 0, 0]],
                    'lip_upper_inner': [[0, -0.05, 0], [0, 0, 0]],
                    'lip_upper_outer': [[-0.05, -0.05, 0], [0, 0, 0]],
                    'lip_edge_upper': [[-0.1, 0, 0], [0, 0, 0]],
                    'lip_edge_lower': [[-0.1, 0, 0], [0, 0, 0]],
                    'lip_lower_outer': [[-0.05, 0.05, 0], [-0.2, 0, 0]],
                    'lip_lower_inner': [[0, 0.05, 0], [-0.2, 0, 0]],
                },
            },
            'eyelids': -0.2,

        },

        flinch: {

            'name': 'flinch',
            'changeVoice': false,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0.1, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [-0.05, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [0, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[-0.1, 0.1, 0], [0, 0, 0]],
                    'eyebrow_middle': [[-0.05, -0.1, 0], [0, 0, 0]],
                    'eyebrow_outer': [[-0.1, -0.2, 0], [0, 0, 0]],
                    'cheek': [[0, 0.5, 0], [0, 0, 0]],
                    'jaw_upper': [[0.1, 0, 0], [0, 0, 0]],
                    'nose_side': [[0.2, 0.3, 0.2], [0, 0, 0]],
                    'pal_ja_jooreum': [[0, 0.7, 0], [0, 0, 0]],
                    'lip_upper_inner': [[0, 0.2, 0], [0.3, 0, 0]],
                    'lip_upper_outer': [[0, 0.1, 0], [0, 0, 0]],
                    'lip_edge_upper': [[0.1, 0.2, -0.1], [0, 0, -0.2]],
                    'lip_edge_lower': [[0, 0, -0.1], [0, 0, -0.2]],
                    'lip_lower_outer': [[0, 0.0, 0], [0, 0, 0]],
                    'lip_lower_inner': [[0, 0.05, 0], [0, 0, 0]],
                },
            },
            'eyelids': -0.4,
        },

        mouthOpen: {
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
                //'eyelids': {
                    //'eyelid_upper_inner': [[0, 0, 0], [0, 0, 0]],
                    //'eyelid_upper_middle': [[0, 0, 0], [0, 0, 0]],
                    //'eyelid_upper_outer': [[0, 0, 0], [0, 0, 0]],
                    //'eyelid_lower_inner': [[0, 0, 0], [0, 0, 0]],
                    //'eyelid_lower_middle': [[0, 0, 0], [0, 0, 0]],
                    //'eyelid_lower_outer': [[0, 0, 0], [0, 0, 0]],
                //},
            },
            'eyelids': 0,
        },

        purseLips: {
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
            },
            'eyelids': 0,
        },

        speechRecognition: {

            'name': 'speechRecognition',
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
                    'eyebrow_inner': [[0, 0.05, 0], [0, 0, 0]],
                    'eyebrow_middle': [[0, 0.05, 0], [0, 0, 0]],
                    'eyebrow_outer': [[0, 0.05, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[0, 0, 0], [0, 0, 0]],
                    'jaw_upper': [[0, 0, 0], [0, 0, 0]],
                    'pal_ja_jooreum': [[0, 0, 0], [0, 0, 0]],
                    'lip_upper_inner': [[0.025, 0.03, -0.05], [0.05, 0, 0]],
                    'lip_upper_outer': [[0.04, 0.03, -0.025], [0.05, 0, 0]],
                    'lip_edge_upper': [[0.05, 0.04, -0.05], [0, 0, -0.07]],
                    'lip_edge_lower': [[0.05, 0.04, -0.05], [0, 0, -0.075]],
                    'lip_lower_outer': [[0.04, 0.03, -0.05], [0, 0, 0]],
                    'lip_lower_inner': [[0.025, 0.03, -0.025], [0, 0, 0]],
                },
            },
            'eyelids': 0.05,

        },

    }

}

