/////////////////// OBJECTS

// determines what is highlighted in thought bubble when Tia thinks
var grammarObject = {

    'D': {
       'show': true,
       'color': 'Blue',
       'class': 'pos-det',
       'types': {
           'a': {
                'movement': 'thinkSentenceArmArticleA',
                'handMov1Dur': 0.7,
            },
           'the': {
                'movement': 'thinkSentenceArmArticleThe',
                'handMov1Dur': 0.7,
            },
        },
    },
    'V': {
       'show': false,
       'color': 'Pink',
       'class': 'pos-verb',
       'movement': 'thinkSentenceArmVerb',
       'handMov1Dur': 1,
    },
    'I': {
       'show': false,
       'color': 'Orange',
       'class': 'pos-prep',
    },
    'T': {
       'show': false,
       'color': 'Orange',
       'class': 'pos-prep',
    },

}

//var sentenceObject = {
    //alphabetDict: {},
    //background: {},
    //sentence: " this is a sentence 1 this is a sentence 2 this is a sentence 3 this is a sentence 4 this is a sentence 5 this is a sentence 6 this is a sentence 7 this is a sentence 8 this is a sentence 9 this is a sentence 10 this is a sentence 11 this is a sentence 13 this is a sentence 1 this is a sentence 2 this is a sentence 3 this is a sentence 4 this is a sentence 5 this is a sentence 6 this is a sentence 7 this is a sentence 8 this is a sentence 9 this is a sentence 10 this is a sentence 11 this is a sentence 13.",
    //splitIndexes: [],
    //cloneLetters: [],
    //wrongIndexes: [[3,6]],
//}

//var correctionObject = {
    //correctionBackground: {},
    //highlightBackground: {},
    //cloneLetters: [],
    //splitIndexes: [],
    //correctionsIndexes: [],
    //corrections: [],
    //correctionString: ""
//}

var speechBubbleObject = {
    bubble: {},
    bubble2: {},
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

//var cameraObject = {
    //'currentState': 'tia',
    //'bool': false,
    //'startCount': 0,
    //'sin': cumSineArrays[ '120' ],
    //'sinLength': 0,
//};

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
    'bodyBones': {},
    'eyeBones': {},
    'mouthBones': {}
};


var mouthObject = {
    'bool': false,
    'startCount': 0,
    'sin': sineArrays[ '60' ],
    'sinLength': 0,
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

var armTapObject = new MoveObj();
armTapObject.name = 'armTap'

var typeObject = {
    
    'L': new MoveObj(),
    'R': new MoveObj(),

}

typeObject.L.name = 'typeL'
typeObject.R.name = 'typeR'

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

//var eyebrowObject = new MoveObj();
//eyebrowObject.coords = {
    //raised: [[1, 1, 0], [0, 0, 0]]
//}
//eyebrowObject.name = 'eyebrow';

//var leanObject = new MoveObj();
//leanObject.coords = {
    //middle: [[0, 0, 0], [0, 0, 0]],
    //close: [[0, 0, 0], [0.1, 0, 0]],
    //far: [[0, 0, 0], [-0.1, 0, 0]]
//}
//leanObject.name = 'lean';



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



var blinkControllerObject = {
    'bool': true,
    'nextBlinkCount': 60,//frames until next blink. set at 60 for first but random afterward 
}

var blinkObject = {
    'bool': false,
    'countdown': 15,
}

var breatheObject = {
    'bool': true,
    'sin': sineArrays[ secsOneBreath ],
    'scaleMultX': 1.5 / secsOneBreath,
    'scaleMultY': 2.75 / secsOneBreath,
    'scaleMultZ': 12 / secsOneBreath,
    'scaleMultShoulder': 25 / secsOneBreath,
    // from experimenting the y position of shoulder is 13 times greater than scale of upperspine
    //'yPosMult': 45 / secsOneBreath,
    //'yPosHeadMult': 12 / secsOneBreath,
    'direction': -1,
    'normalBreatheStopCount': null, 
    'normalBreatheStopDirection': null, 
    'speakingBreathMult': 1.2,
    'singleBreath': {
        'startCount': null,
        'endCount': null,
    }
};

var spineRandomTiltObject = {
    'startCount': 0,
    'sin': sineArrays[ '120' ],
    'sinLength': 120,
    'mult': 0.3, 
    'direction': Math.random() < 0.5 ? -1 : 1,
    // call the sway to and fro
    'to': true,
    'name': 'spineTilt',
}

var neckRandomTiltObject = {
    'startCount': 0,
    'sin': sineArrays[ '180' ],
    'sinLength': 180,
    'mult': 0.2, 
    'direction': Math.random() < 0.5 ? -1 : 1,
    // call the sway to and fro
    'to': true,
    'name': 'neckTilt',
}

var headXRandomTiltObject = {
    'startCount': 0,
    'sin': sineArrays[ 120 ],
    'sinLength': 120,
    'mult': 0.75, 
    'direction': Math.random() < 0.5 ? -1 : 1,
    // call the sway to and fro
    'to': true,
    'name': 'headXTilt',
}

var headYRandomTiltObject = {
    'startCount': 0,
    'sin': sineArrays[ 90 ],
    'sinLength': 90,
    'mult': 0.75,
    'direction': Math.random() < 0.5 ? -1 : 1,
    // call the sway to and fro
    'to': true,
    'name': 'headYTilt',
}

//var purseLipsObject = {
    //'bool': false,
    //'startCount': 0,
    //'sin': [ ],
    //'sinLength': 0,
    //'amount': 0,
//};

//var mouthOpenObject = {
    //'bool': false,
    //'startCount': 0,
    //'sin': [ ],
    //'sinLength': 0,
    //'amount': 0,
//};

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

//var armIndicateObject = {
    //'currentState': 0,
    //'startCount': 0,
    //'sin': [],
    //'sinLength': 0,
    //'bool': false,
//}

var talkObject = {
    bool: false,
}

// FULL MOVEMENT OBJECTS

//var backNReadALineObject = {
    //// states 0,1,2,3,4 for middle, start and 3 saccades to end of line
    //'state': 0,
    //'bool': false
//}


// SPEECH STUFF
var mouthingObject = {

    wordNo: 0,
    mouthing: false,
    phoneCount: 0,
    noOfPhones: 0,
    emphasis: false, // if emphasis on Noun or Verb so slower and raised eyebrows n had movement

}

var synthesisObject = {
    //finalTextInBox : "blank",
    //text: "",
    audio: null, // dom element added in <load_scene/main.js>
    sentenceNo: 0, //if multiple sentences it will start at first, iterates in <tiaSpeech.js>
    talking: false,
    pitch: 0,
    speaking_rate: 0.70,
    continuous: true,
    firstClip: false,
    now: {}, 
    data: {

        'prompt': {

            URLs: [],
            texts: [],
            phones: [[]],

        },

        'beginWhenYou': {

            URLs: [ prefixURL + tiaMediaLoc + "begin_when_you_are_ready.wav" ],
            texts: [ "begin when you are ready" ],
            phones: [
                [ 'b','e','k','e','t',  'w','e','t',  'e','u',  'e',  'r','e','t','i']
            ],

        },

        'goodbyeSeeYou': {

            URLs: [ prefixURL + tiaMediaLoc + "goodbye_see_you_next_time.wav" ],
            texts: [ "goodbye see you next time" ],
            phones: [
                ['k','e','t','b','e',  's','i',  'e','u',  't','e','k','s','t',  't','e','b']
            ],

        },

        'howAreYou': {

            URLs: [ prefixURL + tiaMediaLoc + "how_are_you_feeling_today.wav" ],
            texts: [ "how are you feeling today?" ],
            phones: [
                ['e','w',  'e','r',  'e','u',  'f','i','l','e','k',  't','e','t','e']
            ],

        },

        'iCouldntHear': {

            URLs: [ prefixURL + tiaMediaLoc + "i_couldnt_hear_anything_00.wav", prefixURL + tiaMediaLoc + "i_couldnt_hear_anything_01.wav" ],
            texts: [ "I couldn't hear anything", "can you try again?" ],
            phones: [
                ['e',  'k','e','t','t','t',  'e','i','r',  'e','t','i','th','e','k'],
                ['k','e','t',  'e','u',  't','r','e',  'e','k','e','t']
            ],

        },

        'iDontUnderstand': {

            URLs: [ prefixURL + tiaMediaLoc + "i_dont_understand_what_you_mean_00.wav", prefixURL + tiaMediaLoc + "i_dont_understand_what_you_mean_01.wav" ],
            texts: [ "I don't understand what you mean", "try to say that sentence in a different way" ],
            phones: [
                ['e',  't','e','t','t',  'e','t','t','e','r','s','t','e','t','t',  'w','e','t',  'e','u',  'b','i','t'],
                ['t','r','e',  't','u',  's','e',  'th','e','t',  's','e','t','t','e','t','s',  'e','t',  'e',  't','e','f','e','r','e','t','t',  'w','e']
            ],

        },

        'sorryToHear': {

            URLs: [ prefixURL + tiaMediaLoc + "im_sorry_to_hear_that.wav" ],
            texts: [ "I'm sorry to hear that" ],
            phones: [
                ['e','b',  's','e','r','i',  't','e',  'e','r',  'th','e','t']
            ],

        },

        'greatToSee': {

            URLs: [ prefixURL + tiaMediaLoc + "its_great_to_see_you_again.wav" ],
            texts: [ "It's great to see you again" ],
            phones: [
                ['e','t','s',  'k','r','e','t',  't','u',  's','i',  'e','u',  'e','k','e','t']
            ],

        },

        'moreThanThree': {

            URLs: [ prefixURL + tiaMediaLoc + "more_than_three_errors_00.wav", prefixURL + tiaMediaLoc + "more_than_three_errors_01.wav" ],
            texts: [ "There are more than 3 errors in your sentence", "Simplify and then try again" ],
            phones: [
                ['th','e','r', 'e','r',  'b','e','r',  'th','e','t',  'th','r','i',  'e','r','e','r','s',  'e','t',  'e','u','r',  's','e','t','t','e','t','s'],
                ['s','e','b','b','l','e','f','e',  'e','t','t',  't','r','e',  'e','k','e','t']
            ],

        },

        'veryLoud': {

            URLs: [ prefixURL + tiaMediaLoc + "that_was_very_loud_00.wav", prefixURL + tiaMediaLoc + "that_was_very_loud_01.wav" ],
            texts: [ "that was very loud", "be careful with the microphone volume" ],
            phones: [
                ['th','e','t',  'w','e','s',  'f','e','r','i',  'l','e','t'],
                ['b','i',  'k','e','r','f','e','l',  'w','e','th',  'th','e',  'b','e','k','l','e','f','e','t',  'f','e','l','u','b']
            ],

        },

        'thatsGreat': {

            URLs: [ prefixURL + tiaMediaLoc + "thats_great.wav" ],
            texts: [ "that's great" ],
            phones: [
                ['th','e','t','s',  'k','r','e','t']
            ],

        },

        'welcomeToFirst': {

            URLs: [ prefixURL + tiaMediaLoc + "welcome_to_your_first_full_class_at_erle.wav" ],
            texts: [ "Welcome to your first full class at ERLE" ],
            phones: [
                ['u','e','l','k','e','b',  't','u',  'e','u','r',  'f','e','r','s','t',  'f','e','l',  'k','l','e','s',  'e','t',  'e','r','l']
            ],

        },

        'talkAbout': {

            URLs: [ prefixURL + tiaMediaLoc + "what_would_you_like_to_talk_about_today.wav" ],
            texts: [ "What would you like to talk about today?" ],
            phones: [
                ['w','e','t',  'w','e','t',  'e','u',  'l','e','k',  't','u',  't','e','k',  'e','b','e','t',  't','u','t','e']
            ],

        },

        'mustTypeChoice': {

            URLs: [ prefixURL + tiaMediaLoc + "you_must_type_your_choice_of_topic_in_the_box_below.wav" ],
            texts: [ "you must type your choice of topic in the box below" ],
            phones: [
                ['e','u',  'b','e','s','t',  't','e','b',  'e','u','r',  't','e','t',  'e','f',  't','e','b','e','k',  'e','t',  'th','e',  'b','e', 'k','s',  'b','e','l','w']
            ],

        },

        'notSureAbout': {

            URLs: [ prefixURL + tiaMediaLoc + "im_not_sure_about_that_sentence_00.wav", prefixURL + tiaMediaLoc + "im_not_sure_about_that_sentence_01.wav" ],
            texts: [ "I'm not sure about that sentence", "continue with your topic and I will check it again later" ],
            phones: [
                ['e','b',   't','e','t',  's','e','r',  'e','b','e','t',  'th','e','t',  's','e','t','t','e','t','s' ],
                ['k','e','t','t','e','t','u',  'w','e','th',  'u','r',  't','e','b','e','k',  'e','t','t',  'e',  'w','e','l',  's','e','k',  'e','t',  'e','k','e','t',  'l','e','t','r' ]
            ],

        },

        'tryToSay': {

            URLs: [ prefixURL + tiaMediaLoc + "try_to_say_00.wav", prefixURL + tiaMediaLoc + "try_to_say_01.wav" ],
            texts: [ "Try to say...", "'the valuable supply'" ],
            phones: [
                ['t','r','e',  't','e',  's','e'],
                ['thEmp','eEmp',  'fEmp','eEmp','lEmp','uEmp','bEmp','lEmp',  'sEmp','eEmp','bEmp','lEmp','eEmp','iEmp']
            ],

        },


    }

}

var volumeObject = {
    bool: false,
    display: false,
}

var thoughtBubbleObject = {

    wordThinkingCount: 0,

}

var thinkingEyesObject = {

    bool: false,
    startX: - 0.05,
    startY: 0.25,
    maxX: 0.15,
    maxY: 0.15,

}









