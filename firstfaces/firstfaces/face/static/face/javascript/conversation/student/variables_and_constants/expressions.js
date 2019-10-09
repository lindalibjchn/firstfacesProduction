var expressionObject = {
    'bool': false,
    'startCount': 0,
    'mult': 0,
    'sin': [],
    'sinLength': 0,
    'callback': function(){console.log('no expression callback')},
    'now': {},
    'base': {},//abs coordinates on enter with no movement
    'calculated': {},//from mix of two expressions possibly
    'half': {},
    'quarter': {},
    //'talk': {}, //to begin talking,
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
                    'jaw_inner': [[0, 0, 0], [-0.02, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.3, 0.8], [0, 0, 0]],
                },
                'AU2': {//upper face deosn't move when talking
                    'eyebrow_inner': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_middle': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_outer': [[0, 0, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[0, 0, 0], [0, 0, 0]],
                },
                'AU2t': {//lower face moves while talking
                    'jaw_upper': [[0, 0, 0], [0, 0, 0]],
                    'pal_ja_jooreum': [[0, 0, 0], [0, 0, 0]],
                    'philtrum': [[0, 0, 0], [0, 0, 0]],
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

        'neutral': {
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
                    'jaw_inner': [[0, 0, 0], [-0.02, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.3, 0.8], [0, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_middle': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_outer': [[0, 0, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[0, 0, 0], [0, 0, 0]],
                },
                'AU2t': {    
                    'jaw_upper': [[0, 0, 0], [0, 0, 0]],
                    'pal_ja_jooreum': [[0, 0, 0], [0, 0, 0]],
                    'philtrum': [[0, 0, 0], [0, 0, 0]],
                    'lip_upper_inner': [[0.04, 0.05, -0.08], [0.08, 0, 0]],
                    'lip_upper_outer': [[0.06, 0.05, -0.04], [0.08, 0, 0]],
                    'lip_edge_upper': [[0.08, 0.06, -0.08], [0, 0, -0.1]],
                    'lip_edge_lower': [[0.08, 0.06, -0.08], [0, 0, -0.13]],
                    'lip_lower_outer': [[0.06, 0.04, -0.08], [0, 0, 0]],
                    'lip_lower_inner': [[0.04, 0.05, -0.04], [0, 0, 0]],
                },
            },
            'eyelids': -0.04,
        },

        'surprise': {
            'name': 'surprise',
            'changeVoice': false,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0.23, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [0.21, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, -0.3, -0.8], [0, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[0, 0.3, 0], [0, 0, 0]],
                    'eyebrow_middle': [[0, 0.4, 0], [0, 0, 0]],
                    'eyebrow_outer': [[0, 0.3, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[-0.06, 0, 0], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[0, 0, -0.15], [0, 0, 0]],
                    'pal_ja_jooreum': [[0, -0.3, 0], [0, 0, 0]],
                    'philtrum': [[0, 0, 0], [0, 0, 0]],
                    'lip_upper_inner': [[0, 0.05, 0], [0, 0, -0.1]],
                    'lip_upper_outer': [[-0.08, -0.06, 0.05], [0, 0, 0]],
                    'lip_edge_upper': [[-0.23, -0.4, 0.1], [0, 0, -0.08]],
                    'lip_edge_lower': [[-0.3, -0.65, 0.1], [0, 0, -0.2]],
                    'lip_lower_outer': [[-0.1, -1.0, 0.05], [-0.1, 0, -0.14]],
                    'lip_lower_inner': [[-0.017, -1, 0], [-0.1, 0, 0]],
                },
            },
            'eyelids': 0.2,
        },

        'happy': {
            'name': 'happy',
            'changeVoice': true,
            'pitch': 1.5,
            'speaking_rate': 0.05,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [-0.02, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.3, 0.8], [0, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_middle': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_outer': [[0, 0, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[0.1, 0.3, 0.2], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[0.15, 0.15, 0.05], [0, 0, 0]],
                    'pal_ja_jooreum': [[0.085, 0.2, -0.25], [0, 0, 0]],
                    'philtrum': [[0, 0, 0], [0, 0, 0]],
                    'lip_upper_inner': [[0, 0.4, -0.45], [0.45, 0, -0.1]],
                    'lip_upper_outer': [[0.15, 0.3, -0.45], [0.3, 0, -0.1]],
                    'lip_edge_upper': [[0.30, 0.34, -0.5], [0, 0, -0.3]],
                    'lip_edge_lower': [[0.225, 0.365, -0.5], [0, 0, 0.4]],
                    'lip_lower_outer': [[0.225, 0.15, -0.4], [-0.1, 0.2, 0.1]],
                    'lip_lower_inner': [[0.1, 0.005, -0.3], [-0.1, 0, 0]],
                },
            },
            'eyelids': -0.1,
        },

        'content': {
            'name': 'content',
            'changeVoice': true,
            'pitch': 1,
            'speaking_rate': 0.025,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [-0.02, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.3, 0.8], [0, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_middle': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_outer': [[0, 0, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[0.1, 0.2, 0.1], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[0.09, 0.06, 0.025], [0, 0, 0]],
                    'pal_ja_jooreum': [[0.075, 0.1, -0.125], [0, 0, 0]],
                    'philtrum': [[0, 0, 0], [0, 0, 0]],
                    'lip_upper_inner': [[0.1, 0.125, -0.2], [0.2, 0, 0]],
                    'lip_upper_outer': [[0.18, 0.135, -0.1], [0.2, 0, 0]],
                    'lip_edge_upper': [[0.225, 0.17, -0.2], [0, 0, -0.25]],
                    'lip_edge_lower': [[0.225, 0.17, -0.2], [0, 0, -0.3]],
                    'lip_lower_outer': [[0.18, 0.12, -0.2], [0, 0, 0]],
                    'lip_lower_inner': [[0.1, 0.12, -0.1], [0, 0, 0]],
                },
            },
            'eyelids': -0.05,
        },

        'sad': {

            'name': 'sad',
            'changeVoice': true,
            'pitch': -4,
            'speaking_rate': -0.04,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [-0.02, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.3, 0.8], [0, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[-0.1, 0.2, 0], [0, 0, 0]],
                    'eyebrow_middle': [[-0.1, -0.15, 0], [0, 0, 0]],
                    'eyebrow_outer': [[-0.1, -0.15, 0], [0, 0, 0]],
                    'cheek': [[0, -0.2, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[0, -0.1, 0], [0, 0, 0]],
                    'pal_ja_jooreum': [[-0.2, -0.2, 0], [0, 0, 0]],
                    'philtrum': [[0, 0, 0], [0, 0, 0]],
                    'lip_upper_inner': [[0, 0, 0], [0.3, 0, 0]],
                    'lip_upper_outer': [[-0.05, -0.05, 0], [0.3, 0, 0]],
                    'lip_edge_upper': [[-0.1, -0.2, 0], [0, 0, 0]],
                    'lip_edge_lower': [[-0.1, -0.2, 0], [0, 0, 0]],
                    'lip_lower_outer': [[-0.05, -0.05, 0], [0.1, 0, 0]],
                    'lip_lower_inner': [[0, 0, 0], [0.2, 0, 0]],
                },
            },
            'eyelids': -0.1,

        },

        'fear': {

            'name': 'fear',
            'changeVoice': true,
            'pitch': 1,
            'speaking_rate': -0.025,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [-0.02, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.3, 0.8], [0, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[-0.2, 0.4, 0], [0, 0, 0]],
                    'eyebrow_middle': [[-0.2, 0.2, 0], [0, 0, 0]],
                    'eyebrow_outer': [[-0.2, 0.1, 0], [0, 0, 0]],
                    'cheek': [[0, -0.1, -0.05], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[-0.1, -0.2, 0], [0, 0, 0]],
                    'pal_ja_jooreum': [[0, -0.3, -0.1], [0, 0, 0]],
                    'philtrum': [[0, 0, 0], [0, 0, 0]],
                    'lip_upper_inner': [[0, 0, 0], [0, 0, 0]],
                    'lip_upper_outer': [[0, 0, -0.1], [0, 0, 0]],
                    'lip_edge_upper': [[0.05, -0.1, -0.2], [0, 0, 0]],
                    'lip_edge_lower': [[0.05, -0.2, -0.2], [0, 0, 0]],
                    'lip_lower_outer': [[0, -0.3, -0.1], [0, 0, 0]],
                    'lip_lower_inner': [[0, -0.2, 0], [0, 0, 0]],
                },
            },
            'eyelids': 0.2,

        },

        'disgust': {

            'name': 'disgust',
            'changeVoice': true,
            'pitch': -1,
            'speaking_rate': -0.025,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0.1, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [-0.02, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.3, 0.8], [0, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[-0.15, 0.1, 0], [0, 0, 0]],
                    'eyebrow_middle': [[-0.1, -0.2, 0], [0, 0, 0]],
                    'eyebrow_outer': [[-0.1, -0.2, 0], [0, 0, 0]],
                    'cheek': [[0, 0.5, 0], [0, 0, 0]],
                    'nose_side': [[0.2, 0.3, 0.2], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[0, 0, 0], [0, 0, 0]],
                    'pal_ja_jooreum': [[0, 0.7, 0], [0, 0, 0]],
                    'philtrum': [[0, 0, 0], [0, 0, 0]],
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

        'listening': {

            'name': 'listening',
            'changeVoice': false,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [-0.02, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.3, 0.8], [0, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[0, 0.1, 0], [0, 0, 0]],
                    'eyebrow_middle': [[0, 0.1, 0], [0, 0, 0]],
                    'eyebrow_outer': [[0, 0.1, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[0, 0, 0], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[0, 0, 0], [0, 0, 0]],
                    'pal_ja_jooreum': [[0, 0, 0], [0, 0, 0]],
                    'philtrum': [[0, 0, 0], [0, 0, 0]],
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

        'thinkingNeutral': {
            'name': 'thinkingNeutral',
            'changeVoice': true,
            'pitch': 0,
            'speaking_rate': 0,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [-0.02, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.3, 0.8], [0, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_middle': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_outer': [[0, 0, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[0, 0, 0], [0, 0, 0]],
                },
                'AU2t': {    
                    'jaw_upper': [[0, 0, 0], [0, 0, 0]],
                    'pal_ja_jooreum': [[0, 0, 0], [0, 0, 0]],
                    'philtrum': [[0, 0, 0], [0, 0, 0]],
                    'lip_upper_inner': [[0.04, 0.05, -0.08], [0.08, 0, 0]],
                    'lip_upper_outer': [[0.06, 0.05, -0.04], [0.08, 0, 0]],
                    'lip_edge_upper': [[0.08, 0.06, -0.08], [0, 0, -0.1]],
                    'lip_edge_lower': [[0.08, 0.06, -0.08], [0, 0, -0.13]],
                    'lip_lower_outer': [[0.06, 0.04, -0.08], [0, 0, 0]],
                    'lip_lower_inner': [[0.04, 0.05, -0.04], [0, 0, 0]],
                },
            },
            'eyelids': -0.05,
        },

        'thinkingHard': {

            'name': 'thinkingHard',
            'changeVoice': false,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [-0.02, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.3, 0.8], [0, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[-0.05, -0.05, 0.05], [0, 0, 0]],
                    'eyebrow_middle': [[-0.05, -0.075, 0.025], [0, 0, 0]],
                    'eyebrow_outer': [[-0.025, -0.075, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[0, 0, 0], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[0, 0, 0], [0, 0, 0]],
                    'pal_ja_jooreum': [[0, 0, 0], [0, 0, 0]],
                    'philtrum': [[0, 0, 0], [0, 0, 0]],
                    'lip_upper_inner': [[0, -0.025, 0], [0, 0, 0]],
                    'lip_upper_outer': [[-0.05, -0.025, 0], [0, 0, 0]],
                    'lip_edge_upper': [[-0.1, 0, 0], [0, 0, 0]],
                    'lip_edge_lower': [[-0.1, 0, 0], [0, 0, 0]],
                    'lip_lower_outer': [[-0.05, 0.025, 0], [0, 0, 0]],
                    'lip_lower_inner': [[0, 0.025, 0], [0, 0, 0]],
                },
            },
            'eyelids': -0.2,

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
                    'jaw_inner': [[0, 0, 0], [-0.02, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.3, 0.8], [0, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[-0.1, -0.15, 0], [0, 0, 0]],
                    'eyebrow_middle': [[-0.075, -0.15, 0], [0, 0, 0]],
                    'eyebrow_outer': [[-0.05, -0.15, 0], [0, 0, 0]],
                    'nose_side': [[0, 0.15, 0.1], [0, 0, 0]],
                    'cheek': [[0.1, 0.25, 0], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[0, 0, 0], [0, 0, 0]],
                    'pal_ja_jooreum': [[0, 0, 0], [0, 0, 0]],
                    'philtrum': [[0, 0, 0], [0, 0, 0]],
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

        'flinch': {

            'name': 'flinch',
            'changeVoice': false,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0.1, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [-0.02, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0.6, 0], [0.1, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.3, 0.7], [0, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[-0.1, 0.1, 0], [0, 0, 0]],
                    'eyebrow_middle': [[-0.05, -0.1, 0], [0, 0, 0]],
                    'eyebrow_outer': [[-0.1, -0.2, 0], [0, 0, 0]],
                    'cheek': [[0, 0.5, 0], [0, 0, 0]],
                    'nose_side': [[0.2, 0.3, 0.2], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[0.1, 0, 0], [0, 0, 0]],
                    'pal_ja_jooreum': [[0, 0.7, 0], [0, 0, 0]],
                    'philtrum': [[0, 0, 0], [0, 0, 0]],
                    'lip_upper_inner': [[0, 0.2, -0.3], [0.3, 0, 0]],
                    'lip_upper_outer': [[0, 0.1, -0.3], [0, 0, 0]],
                    'lip_edge_upper': [[0.05, 0.1, -0.4], [0, 0, -0.15]],
                    'lip_edge_lower': [[0.05, -0.05, -0.4], [0, 0, -0.15]],
                    'lip_lower_outer': [[0.1, -0.3, -0.4], [-0.3, 0, 0]],
                    'lip_lower_inner': [[0, -0.4, -0.4], [-0.5, 0, 0]],
                },
            },
            'eyelids': -0.4,
        },

        'halfFlinch': {

            'name': 'halfFlinch',
            'changeVoice': false,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0.05, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [-0.01, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0.3, 0], [0.05, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.3, 0.7], [0, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[-0.05, 0.05, 0], [0, 0, 0]],
                    'eyebrow_middle': [[-0.025, -0.05, 0], [0, 0, 0]],
                    'eyebrow_outer': [[-0.05, -0.1, 0], [0, 0, 0]],
                    'cheek': [[0, 0.25, 0], [0, 0, 0]],
                    'nose_side': [[0.1, 0.15, 0.1], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[0.05, 0, 0], [0, 0, 0]],
                    'pal_ja_jooreum': [[0, 0.35, 0], [0, 0, 0]],
                    'philtrum': [[0, 0, 0], [0, 0, 0]],
                    'lip_upper_inner': [[0, 0.1, -0.15], [0.15, 0, 0]],
                    'lip_upper_outer': [[0, 0.05, -0.15], [0, 0, 0]],
                    'lip_edge_upper': [[0.025, 0.05, -0.2], [0, 0, -0.075]],
                    'lip_edge_lower': [[0.025, -0.025, -0.2], [0, 0, -0.075]],
                    'lip_lower_outer': [[0.05, -0.15, -0.2], [-0.15, 0, 0]],
                    'lip_lower_inner': [[0, -0.2, -0.2], [-0.25, 0, 0]],
                },
            },
            'eyelids': -0.2,
        },

        //mouthOpen: {
            //'name': 'mouthOpen',
            //'changeVoice': false,
            //'AUs': {
                //'AU1': {
                    //'nose': [[0, 0, 0], [0, 0, 0]],
                    //'jaw': [[0, 0, 0], [0.23, 0, 0]],
                //},
                //'AU1m': {
                    //'jaw_inner': [[0, 0, 0], [0.21, 0, 0]],
                    //'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    //'tounge_tip': [[0, 0.3, 0.8], [0, 0, 0]],
                //},
                //'AU2': {
                    //'eyebrow_inner': [[0, 0, 0], [0, 0, 0]],
                    //'eyebrow_middle': [[0, 0, 0], [0, 0, 0]],
                    //'eyebrow_outer': [[0, 0, 0], [0, 0, 0]],
                    //'nose_side': [[0, 0, 0], [0, 0, 0]],
                    //'cheek': [[-0.06, 0, 0], [0, 0, 0]],
                    //'jaw_upper': [[0, 0, -0.15], [0, 0, 0]],
                    //'pal_ja_jooreum': [[0, -0.3, 0], [0, 0, 0]],
                    //'lip_upper_inner': [[0, 0.05, 0], [0, 0, -0.1]],
                    //'lip_upper_outer': [[-0.08, -0.06, 0.05], [0, 0, 0]],
                    //'lip_edge_upper': [[-0.23, -0.4, 0.1], [0, 0, -0.08]],
                    //'lip_edge_lower': [[-0.3, -0.65, 0.1], [0, 0, -0.2]],
                    //'lip_lower_outer': [[-0.1, -1.0, 0.05], [-0.1, 0, -0.14]],
                    //'lip_lower_inner': [[-0.017, -1, 0], [-0.1, 0, 0]],
                //},
            //},
            //'eyelids': 0,
        //},

        //purseLips: {
            //'name': 'purseLips',
            //'changeVoice': false,
            //'AUs': {
                //'AU1': {
                    //'nose': [[0, 0, 0], [0, 0, 0]],
                    //'jaw': [[0, 0, 0], [0, 0, 0]],
                //},
                //'AU1m': {
                    //'jaw_inner': [[0, 0, 0], [-0.02, 0, 0]],
                    //'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    //'tounge_tip': [[0, 0.3, 0.8], [0, 0, 0]],
                //},
                //'AU2': {
                    //'eyebrow_inner': [[0, 0, 0], [0, 0, 0]],
                    //'eyebrow_middle': [[0, 0, 0], [0, 0, 0]],
                    //'eyebrow_outer': [[0, 0, 0], [0, 0, 0]],
                    //'nose_side': [[0, 0, 0], [0, 0, 0]],
                    //'cheek': [[0, 0, 0], [0, 0, 0]],
                    //'jaw_upper': [[0, 0, 0], [0, 0, 0]],
                    //'pal_ja_jooreum': [[0, 0, 0], [0, 0, 0]],
                    //'lip_upper_inner': [[-0.1, 0, 0.05], [0, 0, 0]],
                    //'lip_upper_outer': [[-0.2, 0, 0.15], [0, 0, 0]],
                    //'lip_edge_upper': [[-0.3, 0, 0.3], [0, 0.3, 0]],
                    //'lip_edge_lower': [[-0.3, 0, 0.3], [0, 0.3, 0]],
                    //'lip_lower_outer': [[-0.15, 0, 0.15], [0, 0, 0]],
                    //'lip_lower_inner': [[-0.05, 0, 0.05], [0, 0, 0]],
                //},
            //},
            //'eyelids': 0,
        //},

        'speechRecognition': {

            'name': 'speechRecognition',
            'changeVoice': false,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [-0.02, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.3, 0.8], [0, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[0, 0.05, 0], [0, 0, 0]],
                    'eyebrow_middle': [[0, 0.05, 0], [0, 0, 0]],
                    'eyebrow_outer': [[0, 0.05, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[0, 0, 0], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[0, 0, 0], [0, 0, 0]],
                    'pal_ja_jooreum': [[0, 0, 0], [0, 0, 0]],
                    'philtrum': [[0, 0, 0], [0, 0, 0]],
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

        'talkBase': {
            'name': 'talkBase',
            'changeVoice': false,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0.025, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [0.005, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.3, 0.8], [0, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_middle': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_outer': [[0, 0, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[-0.0075, 0, 0], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[0, 0, -0.015], [0, 0, 0]],
                    'pal_ja_jooreum': [[0, -0.03, 0], [0, 0, 0]],
                    'philtrum': [[0, 0, 0], [0, 0, 0]],
                    'lip_upper_inner': [[0, 0.005, 0], [0, 0, -0.01]],
                    'lip_upper_outer': [[-0.108, -0.006, 0.005], [0, 0, 0]],
                    'lip_edge_upper': [[-0.225, -0.04, 0.01], [0, 0, -0.008]],
                    'lip_edge_lower': [[-0.23, -0.06, 0.01], [0, 0, -0.02]],
                    'lip_lower_outer': [[-0.11, -0.1, 0.005], [-0.01, 0, -0.015]],
                    'lip_lower_inner': [[-0.0015, -0.1, 0], [-0.01, 0, 0]],
                },
            },
            'eyelids': 0,
        },

        'f': {
            'name': 'f',
            'changeVoice': false,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0.01, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [-0.01, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.3, 0.8], [0, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_middle': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_outer': [[0, 0, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[0, 0, 0], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[0.025, 0, -0.015], [0, 0, 0]],
                    'pal_ja_jooreum': [[0.05, 0.2, 0], [0, 0, 0]],
                    'philtrum': [[0, 0.025, 0], [0, 0, 0]],
                    'lip_upper_inner': [[0, 0.15, -0.25], [0.4, 0, -0.01]],
                    'lip_upper_outer': [[-0.05, 0.05, -0.1], [0.15, 0, 0]],
                    'lip_edge_upper': [[-0.225, 0.03, -0.06], [0, 0, -0.004]],
                    'lip_edge_lower': [[-0.23, 0.02, -0.05], [0, 0, -0.01]],
                    'lip_lower_outer': [[-0.08, -0.035, -0.25], [-0.2, 0, 0.16]],
                    'lip_lower_inner': [[-0.001, -0.25, -0.25], [-0.8, 0, 0.125]],
                },
            },
            'eyelids': 0,
        },

        'fEmp': {
            'name': 'fEmp',
            'changeVoice': false,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [-0.02, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.3, 0.8], [0, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[0, 0.2, 0], [0, 0, 0]],
                    'eyebrow_middle': [[0, 0.2, 0], [0, 0, 0]],
                    'eyebrow_outer': [[0, 0.2, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[0, 0, 0], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[0.04, 0, -0.015], [0, 0, 0]],
                    'pal_ja_jooreum': [[0.08, 0.5, 0], [0, 0, 0]],
                    'philtrum': [[0, 0.04, 0], [0, 0, 0]],
                    'lip_upper_inner': [[0, 0.2, -0.4], [0.65, 0, -0.01]],
                    'lip_upper_outer': [[-0.02, 0.08, -0.16], [0.25, 0, 0]],
                    'lip_edge_upper': [[-0.125, 0.06, -0.11], [0, 0, -0.001]],
                    'lip_edge_lower': [[-0.13, 0.074, -0.09], [0, 0, 0]],
                    'lip_lower_outer': [[-0.06, 0, -0.4], [-0.3, 0, 0.22]],
                    'lip_lower_inner': [[-0.0005, -0.32, -0.4], [-1.21, 0, 0.2]],
                },
            },
            'eyelids': 0.1,
        },

        'th': {
            'name': 'th',
            'changeVoice': false,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0.035, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [0.015, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.6, 1.05], [0.010, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_middle': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_outer': [[0, 0, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[-0.0075, 0, 0], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[0, 0, -0.015], [0, 0, 0]],
                    'pal_ja_jooreum': [[0.025, 0.1, 0], [0, 0, 0]],
                    'philtrum': [[0, 0.01, 0], [0, 0, 0]],
                    'lip_upper_inner': [[0, 0.05, -0.05], [0.075, 0, -0.05]],
                    'lip_upper_outer': [[-0.085, 0.01, -0.015], [0.125, 0, -0.2]],
                    'lip_edge_upper': [[-0.225, -0.04, 0.01], [0, 0, -0.008]],
                    'lip_edge_lower': [[-0.23, -0.06, 0.01], [0, 0, -0.02]],
                    'lip_lower_outer': [[-0.11, -0.15, 0.055], [-0.01, 0, -0.015]],
                    'lip_lower_inner': [[-0.0015, -0.175, -0.05], [0.2, 0, 0]],
                },
            },
            'eyelids': 0,
        },

        'thEmp': {
            'name': 'thEmp',
            'changeVoice': false,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0.04, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [0.02, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.57, 1.3], [-0.5, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[0, 0.2, 0], [0, 0, 0]],
                    'eyebrow_middle': [[0, 0.2, 0], [0, 0, 0]],
                    'eyebrow_outer': [[0, 0.2, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[-0.0075, 0, 0], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[0, 0, -0.025], [0, 0, 0]],
                    'pal_ja_jooreum': [[0.04, 0.16, 0], [0, 0, 0]],
                    'philtrum': [[0, 0.016, 0], [0, 0, 0]],
                    'lip_upper_inner': [[0, 0.08, -0.08], [0.105, 0, -0.08]],
                    'lip_upper_outer': [[-0.075, 0.017, -0.025], [0.195, 0, -0.1]],
                    'lip_edge_upper': [[-0.175, -0.04, 0.01], [0, 0, -0.008]],
                    'lip_edge_lower': [[-0.18, -0.06, 0.01], [0, 0, -0.01]],
                    'lip_lower_outer': [[-0.11, -0.2, 0.085], [-0.01, 0, -0.015]],
                    'lip_lower_inner': [[-0.0015, -0.2225, -0.08], [0.25, 0, 0]],
                },
            },
            'eyelids': 0.1,
        },

        'b': {
            'name': 'b',
            'changeVoice': false,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0.01, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [-0.01, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.3, 0.8], [0, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_middle': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_outer': [[0, 0, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[-0.0075, 0, 0], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[0.05, 0, -0.015], [0, 0, 0]],
                    'pal_ja_jooreum': [[0, 0.1, 0], [0, 0, 0]],
                    'philtrum': [[0, -0.025, 0], [0, 0, 0]],
                    'lip_upper_inner': [[-0.05, 0.05, -0.15], [0.3, 0, 0]],
                    'lip_upper_outer': [[-0.108, -0.06, -0.08], [0.2, 0, 0]],
                    'lip_edge_upper': [[-0.25, -0.04, 0.01], [0, 0, -0.008]],
                    'lip_edge_lower': [[-0.255, -0.05, 0.01], [0, 0, -0.02]],
                    'lip_lower_outer': [[-0.11, -0.055, 0.005], [-0.25, 0, 0.2]],
                    'lip_lower_inner': [[-0.1, -0.055, 0], [-0.3, 0, 0]],
                },
            },
            'eyelids': 0,
        },

        'bEmp': {
            'name': 'bEmp',
            'changeVoice': false,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [-0.02, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.3, 0.8], [0, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[0, 0.2, 0], [0, 0, 0]],
                    'eyebrow_middle': [[0, 0.2, 0], [0, 0, 0]],
                    'eyebrow_outer': [[0, 0.2, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[-0.0075, 0.1, 0], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[0.08, 0, -0.015], [0, 0, 0]],
                    'pal_ja_jooreum': [[0, 0.16, 0], [0, 0, 0]],
                    'philtrum': [[0, -0.04, 0], [0, 0, 0]],
                    'lip_upper_inner': [[-0.08, 0.08, -0.25], [0.5, 0, 0]],
                    'lip_upper_outer': [[-0.108, -0.1, -0.13], [0.32, 0, 0]],
                    'lip_edge_upper': [[-0.25, -0.04, 0.01], [0, 0, -0.008]],
                    'lip_edge_lower': [[-0.255, -0.043, 0.01], [0, 0, -0.02]],
                    'lip_lower_outer': [[-0.11, -0.025, 0.005], [-0.35, 0, 0.35]],
                    'lip_lower_inner': [[-0.16, -0.02, -0.2], [-0.46, 0, 0]],
                },
            },
            'eyelids': 0.1,
        },

        't': {
            'name': 't',
            'changeVoice': false,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0.025, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [0.005, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.9, 0.8], [-0.2, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_middle': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_outer': [[0, 0, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[-0.0075, 0, 0], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[0, 0, -0.015], [0, 0, 0]],
                    'pal_ja_jooreum': [[0, -0.03, 0], [0, 0, 0]],
                    'philtrum': [[0, 0, 0], [0, 0, 0]],
                    'lip_upper_inner': [[0, 0.005, 0], [0, 0, -0.01]],
                    'lip_upper_outer': [[-0.108, -0.006, 0.005], [0, 0, 0]],
                    'lip_edge_upper': [[-0.225, -0.04, 0.01], [0, 0, -0.008]],
                    'lip_edge_lower': [[-0.23, -0.06, 0.01], [0, 0, -0.02]],
                    'lip_lower_outer': [[-0.11, -0.1, 0.005], [-0.01, 0, -0.015]],
                    'lip_lower_inner': [[-0.0015, -0.1, 0], [-0.01, 0, 0]],
                },
            },
            'eyelids': 0,
        },

        'tEmp': {
            'name': 'tEmp',
            'changeVoice': false,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0.025, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [0.005, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.9, 0.8], [-0.2, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[0, 0.2, 0], [0, 0, 0]],
                    'eyebrow_middle': [[0, 0.2, 0], [0, 0, 0]],
                    'eyebrow_outer': [[0, 0.2, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[-0.0075, 0, 0], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[0, 0, -0.015], [0, 0, 0]],
                    'pal_ja_jooreum': [[0, -0.03, 0], [0, 0, 0]],
                    'philtrum': [[0, 0, 0], [0, 0, 0]],
                    'lip_upper_inner': [[0, 0.005, 0], [0, 0, -0.01]],
                    'lip_upper_outer': [[-0.108, -0.006, 0.005], [0, 0, 0]],
                    'lip_edge_upper': [[-0.225, -0.04, 0.01], [0, 0, -0.008]],
                    'lip_edge_lower': [[-0.23, -0.06, 0.01], [0, 0, -0.02]],
                    'lip_lower_outer': [[-0.11, -0.1, 0.005], [-0.01, 0, -0.015]],
                    'lip_lower_inner': [[-0.0015, -0.1, 0], [-0.01, 0, 0]],
                },
            },
            'eyelids': 0.1,
        },

        's': {
            'name': 's',
            'changeVoice': false,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0.015, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [-0.015, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.5, 0.8], [0.8, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_middle': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_outer': [[0, 0, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[-0.0075, 0, 0], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[0, 0, -0.015], [0, 0, 0]],
                    'pal_ja_jooreum': [[0, -0.03, 0], [0, 0, 0]],
                    'philtrum': [[0, 0, 0], [0, 0, 0]],
                    'lip_upper_inner': [[0, 0.005, 0], [0, 0, -0.01]],
                    'lip_upper_outer': [[-0.108, -0.006, 0.005], [0, 0, 0]],
                    'lip_edge_upper': [[-0.195, -0.04, 0.01], [0, 0, -0.008]],
                    'lip_edge_lower': [[-0.2, -0.07, 0.01], [0, 0, -0.02]],
                    'lip_lower_outer': [[-0.03, -0.13, -0.12], [-0.01, 0, 0.085]],
                    'lip_lower_inner': [[-0.0015, -0.2, -0.15], [-0.01, 0, -0.2]],
                },
            },
            'eyelids': 0,
        },

        'sEmp': {
            'name': 'sEmp',
            'changeVoice': false,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0.008, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [-0.022, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.6, 0.8], [0.8, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[0, 0.2, 0], [0, 0, 0]],
                    'eyebrow_middle': [[0, 0.2, 0], [0, 0, 0]],
                    'eyebrow_outer': [[0, 0.2, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[-0.0075, 0, 0], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[0, 0, -0.015], [0, 0, 0]],
                    'pal_ja_jooreum': [[0, -0.03, 0], [0, 0, 0]],
                    'philtrum': [[0, 0, 0], [0, 0, 0]],
                    'lip_upper_inner': [[0, 0.005, 0], [0, 0, -0.01]],
                    'lip_upper_outer': [[-0.108, -0.006, 0.005], [0, 0, 0]],
                    'lip_edge_upper': [[-0.17, -0.04, 0.01], [0, 0, -0.008]],
                    'lip_edge_lower': [[-0.16, -0.09, 0.01], [0, 0, -0.02]],
                    'lip_lower_outer': [[0.02, -0.2, -0.2], [-0.01, 0, 0.085]],
                    'lip_lower_inner': [[-0.0015, -0.28, -0.3], [-0.01, 0, -0.2]],
                },
            },
            'eyelids': 0.1,
        },

        'k': {
            'name': 'k',
            'changeVoice': false,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0.025, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [0.005, 0, 0]],
                    'tongue_root': [[0, 1, 0], [0, 0, 0]],
                    'tounge_tip': [[0, -0.1, 0.8], [0, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_middle': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_outer': [[0, 0, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[-0.0075, 0, 0], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[0, 0, -0.015], [0, 0, 0]],
                    'pal_ja_jooreum': [[0, -0.03, 0], [0, 0, 0]],
                    'philtrum': [[0, 0, 0], [0, 0, 0]],
                    'lip_upper_inner': [[0, 0.005, 0], [0, 0, -0.01]],
                    'lip_upper_outer': [[-0.108, -0.006, 0.005], [0, 0, 0]],
                    'lip_edge_upper': [[-0.225, -0.04, 0.01], [0, 0, -0.008]],
                    'lip_edge_lower': [[-0.23, -0.06, 0.01], [0, 0, -0.02]],
                    'lip_lower_outer': [[-0.11, -0.1, 0.005], [-0.01, 0, -0.015]],
                    'lip_lower_inner': [[-0.0015, -0.1, 0], [-0.01, 0, 0]],
                },
            },
            'eyelids': 0,
        },

        'kEmp': {
            'name': 'kEmp',
            'changeVoice': false,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0.035, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [0.015, 0, 0]],
                    'tongue_root': [[0, 1.1, -0.4], [0, 0, 0]],
                    'tounge_tip': [[0, -0.1, 0.2], [0, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[0, 0.2, 0], [0, 0, 0]],
                    'eyebrow_middle': [[0, 0.2, 0], [0, 0, 0]],
                    'eyebrow_outer': [[0, 0.2, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[-0.0075, 0, 0], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[0, 0, -0.015], [0, 0, 0]],
                    'pal_ja_jooreum': [[0, -0.03, 0], [0, 0, 0]],
                    'philtrum': [[0, 0, 0], [0, 0, 0]],
                    'lip_upper_inner': [[0, 0.005, 0], [0, 0, -0.01]],
                    'lip_upper_outer': [[-0.07, -0.006, 0.005], [0, 0, 0]],
                    'lip_edge_upper': [[-0.175, -0.04, 0.01], [0, 0, -0.008]],
                    'lip_edge_lower': [[-0.18, -0.06, 0.01], [0, 0, -0.02]],
                    'lip_lower_outer': [[-0.06, -0.19, 0.005], [-0.01, 0, -0.015]],
                    'lip_lower_inner': [[-0.0015, -0.225, 0], [-0.01, 0, -0.15]],
                },
            },
            'eyelids': 0.1,
        },

        'w': {
            'name': 'w',
            'changeVoice': false,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0.035, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [0.015, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.3, 0.8], [0, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_middle': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_outer': [[0, 0, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[-0.0075, 0, 0], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[0, 0, -0.015], [0, 0, 0]],
                    'pal_ja_jooreum': [[-0.1, -0.2, 0], [0, 0, 0]],
                    'philtrum': [[0, 0, 0], [0, 0, 0]],
                    'lip_upper_inner': [[-0.15, -0.015, -0.1], [0.1, 0.1, -0.25]],
                    'lip_upper_outer': [[-0.15, -0.1, -0.05], [0.15, 0.2, -0.3]],
                    'lip_edge_upper': [[-0.35, -0.08, 0.25], [0, 0.1, -0.2]],
                    'lip_edge_lower': [[-0.35, -0.07, 0.225], [0, 0.1, -0.2]],
                    'lip_lower_outer': [[-0.15, -0.13, -0.025], [-0.2, 0, -0.015]],
                    'lip_lower_inner': [[-0.1, -0.16, -0.1], [-0.4, 0, 0]],
                },
            },
            'eyelids': 0,
        },

        'wEmp': {
            'name': 'wEmp',
            'changeVoice': false,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0.035, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [0.015, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.3, 0.8], [0, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[0, 0.2, 0], [0, 0, 0]],
                    'eyebrow_middle': [[0, 0.2, 0], [0, 0, 0]],
                    'eyebrow_outer': [[0, 0.2, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[-0.0075, 0, 0], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[-0.05, 0, -0.015], [0, 0, 0]],
                    'pal_ja_jooreum': [[-0.15, -0.3, 0], [0, 0, 0]],
                    'philtrum': [[0, 0, 0], [0, 0, 0]],
                    'lip_upper_inner': [[-0.2, -0.017, -0.1], [0.1, 0.1, -0.25]],
                    'lip_upper_outer': [[-0.3, -0.12, -0.05], [0.15, 0.2, -0.3]],
                    'lip_edge_upper': [[-0.45, -0.1, 0.25], [0, 0.1, -0.2]],
                    'lip_edge_lower': [[-0.45, -0.09, 0.225], [0, 0.1, -0.2]],
                    'lip_lower_outer': [[-0.3, -0.15, -0.025], [-0.2, 0, -0.015]],
                    'lip_lower_inner': [[-0.15, -0.18, -0.1], [-0.4, 0, 0]],
                },
            },
            'eyelids': 0.1,
        },

        'r': {
            'name': 'r',
            'changeVoice': false,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0.025, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [0.005, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.8, -0.2], [-1.5, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_middle': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_outer': [[0, 0, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[-0.0075, 0, 0], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[0, 0, -0.015], [0, 0, 0]],
                    'pal_ja_jooreum': [[0, -0.03, 0], [0, 0, 0]],
                    'philtrum': [[0, 0, 0], [0, 0, 0]],
                    'lip_upper_inner': [[0, 0.005, 0], [0, 0, -0.01]],
                    'lip_upper_outer': [[-0.128, -0.016, 0.005], [0, 0, 0]],
                    'lip_edge_upper': [[-0.3, -0.06, 0.11], [0, 0.1, -0.008]],
                    'lip_edge_lower': [[-0.3, -0.04, 0.11], [0, 0.1, -0.0208]],
                    'lip_lower_outer': [[-0.11, -0.1, 0.005], [-0.01, 0, -0.015]],
                    'lip_lower_inner': [[-0.0015, -0.1, 0], [-0.01, 0, 0]],
                },
            },
            'eyelids': 0,
        },

        'rEmp': {
            'name': 'rEmp',
            'changeVoice': false,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0.025, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [0.005, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.8, -0.2], [-1.5, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[0, 0.2, 0], [0, 0, 0]],
                    'eyebrow_middle': [[0, 0.2, 0], [0, 0, 0]],
                    'eyebrow_outer': [[0, 0.2, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[-0.0075, 0, 0], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[0, 0, -0.015], [0, 0, 0]],
                    'pal_ja_jooreum': [[0, -0.03, 0], [0, 0, 0]],
                    'philtrum': [[0, 0, 0], [0, 0, 0]],
                    'lip_upper_inner': [[0, 0.005, 0], [0, 0, -0.01]],
                    'lip_upper_outer': [[-0.178, -0.016, 0.005], [0, 0, 0]],
                    'lip_edge_upper': [[-0.3, -0.06, 0.11], [0, 0.1, -0.008]],
                    'lip_edge_lower': [[-0.35, -0.04, 0.11], [0, 0.1, -0.0208]],
                    'lip_lower_outer': [[-0.16, -0.15, -0.1], [-0.21, 0, -0.015]],
                    'lip_lower_inner': [[-0.0015, -0.25, -0.2], [-0.41, 0, 0]],
                },
            },
            'eyelids': 0.1,
        },

        'l': {
            'name': 'l',
            'changeVoice': false,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0.035, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [0.015, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.65, 1.05], [-0.3, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_middle': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_outer': [[0, 0, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[-0.0075, 0, 0], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[0, 0, -0.015], [0, 0, 0]],
                    'pal_ja_jooreum': [[0, -0.03, 0], [0, 0, 0]],
                    'philtrum': [[0, 0, 0], [0, 0, 0]],
                    'lip_upper_inner': [[0, 0, 0], [0, 0, -0.03]],
                    'lip_upper_outer': [[-0.108, -0.006, 0.005], [0, 0, 0]],
                    'lip_edge_upper': [[-0.225, -0.04, 0.01], [0, 0, -0.008]],
                    'lip_edge_lower': [[-0.23, -0.06, 0.01], [0, 0, -0.02]],
                    'lip_lower_outer': [[-0.11, -0.13, 0.005], [-0.01, 0, 0]],
                    'lip_lower_inner': [[-0.0015, -0.15, 0], [-0.01, 0, 0]],
                },
            },
            'eyelids': 0,
        },

        'lEmp': {
            'name': 'lEmp',
            'changeVoice': false,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0.04, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [0.02, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.8, 1.35], [-0.35, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[0, 0.2, 0], [0, 0, 0]],
                    'eyebrow_middle': [[0, 0.2, 0], [0, 0, 0]],
                    'eyebrow_outer': [[0, 0.2, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[-0.0075, 0, 0], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[0, 0, -0.015], [0, 0, 0]],
                    'pal_ja_jooreum': [[0, -0.03, 0], [0, 0, 0]],
                    'philtrum': [[0, 0, 0], [0, 0, 0]],
                    'lip_upper_inner': [[0, 0.055, 0], [0, 0, -0.06]],
                    'lip_upper_outer': [[-0.108, -0.006, 0.005], [0, 0, 0]],
                    'lip_edge_upper': [[-0.175, -0.05, 0.01], [0, 0, -0.008]],
                    'lip_edge_lower': [[-0.18, -0.07, 0.01], [0, 0, -0.02]],
                    'lip_lower_outer': [[-0.05, -0.18, 0.005], [-0.01, 0, -0.015]],
                    'lip_lower_inner': [[-0.0015, -0.2, 0], [-0.01, 0, 0]],
                },
            },
            'eyelids': 0.1,
        },

        'u': {
            'name': 'u',
            'changeVoice': false,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0.03, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [0.01, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.3, 0.8], [0, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_middle': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_outer': [[0, 0, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[-0.0075, 0, 0], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[-0.015, 0, -0.015], [0, 0, 0]],
                    'pal_ja_jooreum': [[-0.1, 0, 0], [0, 0, 0]],
                    'philtrum': [[0, -0.025, 0], [-0.05, 0, 0]],
                    'lip_upper_inner': [[-0.1, 0.005, 0.075], [0, 0.1, -0.2]],
                    'lip_upper_outer': [[-0.2, -0.1, 0.125], [0, 0.2, -0.3]],
                    'lip_edge_upper': [[-0.35, -0.05, 0.2], [0, 0.15, -0.2]],
                    'lip_edge_lower': [[-0.35, -0.04, 0.1], [0, 0.15, -0.2]],
                    'lip_lower_outer': [[-0.15, -0.025, 0.175], [-0.01, 0, -0.015]],
                    'lip_lower_inner': [[-0.1, -0.05, 0.125], [0.2, 0, 0]],
                },
            },
            'eyelids': 0,
        },

        'uEmp': {
            'name': 'uEmp',
            'changeVoice': false,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0.035, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [0.015, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.3, 0.8], [0, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[0, 0.2, 0], [0, 0, 0]],
                    'eyebrow_middle': [[0, 0.2, 0], [0, 0, 0]],
                    'eyebrow_outer': [[0, 0.2, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[-0.0075, 0, 0], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[-0.025, 0, -0.015], [0, 0, 0]],
                    'pal_ja_jooreum': [[-0.16, 0, 0], [0, 0, 0]],
                    'philtrum': [[0, -0.04, 0], [-0.08, 0, 0]],
                    'lip_upper_inner': [[-0.2, 0.005, 0.175], [-0.1, 0.1, -0.2]],
                    'lip_upper_outer': [[-0.3, -0.1, 0.2], [0, 0.2, -0.3]],
                    'lip_edge_upper': [[-0.45, -0.07, 0.3], [0, 0.25, -0.3]],
                    'lip_edge_lower': [[-0.45, -0.06, 0.2], [0, 0.25, -0.3]],
                    'lip_lower_outer': [[-0.25, -0.025, 0.25], [-0.01, 0, -0.015]],
                    'lip_lower_inner': [[-0.15, -0.05, 0.225], [0.3, 0, 0]],
                },
            },
            'eyelids': 0.1,
        },

        'e': {
            'name': 'e',
            'changeVoice': false,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0.04, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [0.02, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.3, 0.8], [0, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_middle': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_outer': [[0, 0, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[-0.0075, 0, 0], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[0, 0, -0.015], [0, 0, 0]],
                    'pal_ja_jooreum': [[0, -0.03, 0], [0, 0, 0]],
                    'philtrum': [[0, 0, 0], [0, 0, 0]],
                    'lip_upper_inner': [[0, 0.005, 0], [0, 0, -0.01]],
                    'lip_upper_outer': [[-0.108, -0.006, 0.005], [0, 0, 0]],
                    'lip_edge_upper': [[-0.28, -0.06, 0.11], [0, 0, -0.208]],
                    'lip_edge_lower': [[-0.28, -0.04, 0.11], [0, 0, 0.5]],
                    'lip_lower_outer': [[-0.11, -0.1, 0.005], [-0.01, 0, 0.2]],
                    'lip_lower_inner': [[-0.0015, -0.15, 0], [-0.01, 0, 0]],
                },
            },
            'eyelids': 0,
        },

        'eEmp': {
            'name': 'eEmp',
            'changeVoice': false,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0.06, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [0.04, 0, 0]],
                    'tongue_root': [[0, 0, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.3, 0.8], [0, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[0, 0.2, 0], [0, 0, 0]],
                    'eyebrow_middle': [[0, 0.2, 0], [0, 0, 0]],
                    'eyebrow_outer': [[0, 0.2, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[-0.0075, 0, 0], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[0, 0, -0.015], [0, 0, 0]],
                    'pal_ja_jooreum': [[-0.05, -0.06, 0], [0, 0, 0]],
                    'philtrum': [[0, 0, 0], [0, 0, 0]],
                    'lip_upper_inner': [[0, 0.005, 0], [0, 0, -0.01]],
                    'lip_upper_outer': [[-0.108, -0.006, 0.005], [0, 0, 0]],
                    'lip_edge_upper': [[-0.2, -0.08, 0.11], [0, 0, -0.208]],
                    'lip_edge_lower': [[-0.2, -0.12, 0.11], [0, 0, 0.5]],
                    'lip_lower_outer': [[-0.11, -0.25, 0.005], [-0.01, 0, 0.2]],
                    'lip_lower_inner': [[-0.0015, -0.3, 0], [-0.01, 0, 0]],
                },
            },
            'eyelids': 0.1,
        },

        'i': {
            'name': 'i',
            'changeVoice': false,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0.035, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [0.015, 0, 0]],
                    'tongue_root': [[0, 1, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.5, 0.8], [0, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_middle': [[0, 0, 0], [0, 0, 0]],
                    'eyebrow_outer': [[0, 0, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[-0.0075, 0, 0], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[0.05, 0, -0.015], [0, 0, 0]],
                    'pal_ja_jooreum': [[0.05, 0.05, 0], [0, 0, 0]],
                    'philtrum': [[0, 0, 0], [0.05, 0, 0]],
                    'lip_upper_inner': [[0, 0.125, -0.1], [0.25, 0, 0]],
                    'lip_upper_outer': [[-0.05, 0.075, -0.1], [0.2, 0, 0]],
                    'lip_edge_upper': [[-0.15, 0.05, -0.05], [0.1, 0, -0.004]],
                    'lip_edge_lower': [[-0.15, 0.06, -0.05], [0, 0, 0.15]],
                    'lip_lower_outer': [[0, -0.1, -0.2], [-0.005, 0, 0.15]],
                    'lip_lower_inner': [[0, -0.125, -0.1], [-0.005, 0, 0]],
                },
            },
            'eyelids': 0,
        },

        'iEmp': {
            'name': 'iEmp',
            'changeVoice': false,
            'AUs': {
                'AU1': {
                    'nose': [[0, 0, 0], [0, 0, 0]],
                    'jaw': [[0, 0, 0], [0, 0, 0]],
                },
                'AU1m': {
                    'jaw_inner': [[0, 0, 0], [-0.02, 0, 0]],
                    'tongue_root': [[0, 1, 0], [0, 0, 0]],
                    'tounge_tip': [[0, 0.5, 0.7], [0, 0, 0]],
                },
                'AU2': {
                    'eyebrow_inner': [[0, 0.2, 0], [0, 0, 0]],
                    'eyebrow_middle': [[0, 0.2, 0], [0, 0, 0]],
                    'eyebrow_outer': [[0, 0.2, 0], [0, 0, 0]],
                    'nose_side': [[0, 0, 0], [0, 0, 0]],
                    'cheek': [[-0.0075, 0, 0], [0, 0, 0]],
                },
                'AU2t': {
                    'jaw_upper': [[0.05, 0, -0.015], [0, 0, 0]],
                    'pal_ja_jooreum': [[0.05, 0.05, 0], [0, 0, 0]],
                    'philtrum': [[0, 0, 0], [0.05, 0, 0]],
                    'lip_upper_inner': [[0, 0.175, -0.1], [0.25, 0, 0]],
                    'lip_upper_outer': [[-0.05, 0.125, -0.1], [0.2, 0, 0]],
                    'lip_edge_upper': [[-0.05, 0.1, 0.15], [0.1, 0, -0.004]],
                    'lip_edge_lower': [[-0.05, 0.01, 0.15], [0, 0, 0.15]],
                    'lip_lower_outer': [[0.1, -0.05, 0.2], [-0.005, 0, 0.15]],
                    'lip_lower_inner': [[0, -0.125, 0.2], [-0.005, 0, -0.2]],
                },
            },
            'eyelids': 0.1,
        },

    }

}
