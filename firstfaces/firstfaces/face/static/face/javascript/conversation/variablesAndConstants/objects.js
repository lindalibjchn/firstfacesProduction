/////////////////// OBJECTS


//var sentenceObject = {
    //alphabetDict: {},
    //background: {},
    //sentence: " this is a sentence 1 this is a sentence 2 this is a sentence 3 this is a sentence 4 this is a sentence 5 this is a sentence 6 this is a sentence 7 this is a sentence 8 this is a sentence 9 this is a sentence 10 this is a sentence 11 this is a sentence 13 this is a sentence 1 this is a sentence 2 this is a sentence 3 this is a sentence 4 this is a sentence 5 this is a sentence 6 this is a sentence 7 this is a sentence 8 this is a sentence 9 this is a sentence 10 this is a sentence 11 this is a sentence 13.",
    //splitIndexes: [],
    //cloneLetters: [],
    //wrongIndexes: [[3,6]],
//}

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
    bubble2: {},
    background: {},
    cloneLetters: [],
    splitIndexes: [],
    sentence: " Yo hey this is gonna be my speech which will be coming out at a rate of fifty million words per second and that may be a a a difficult to understand." 
}
// movement stuff

// controls all movements on first entry to class
//var mainEnterObject = {
    //bool: false
//}

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
    'sin': sineArrays[ secsOneBreath.toString() ],
    'scaleMult': 0.4 / secsOneBreath,
    // from experimenting the y position of shoulder is 13 times greater than scale of upperspine
    'yPosMult': 20 / secsOneBreath,
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

var synthesisObject = {
    //finalTextInBox : "blank",
    //text: "",
    audio: null, // dom element added in <load_scene/main.js>
    pitch: 0,
    speaking_rate: 0.70,
    firstClip: false,
    now: {}, 
    data: {

        mustTypeChoice: {

            URLs: [ prefixURL + tiaMediaLoc + "you_must_type_your_choice_of_topic_in_the_box_below.wav" ],
            texts: [ "you must type your choice of topic in the box below" ],
            phones: [[

                'vowelMedium',
                'vowelRound',
                'bilabial',
                'vowelMedium',
                'alveolar',
                'alveolar',
                'alveolar',
                'vowelMedium',
                'bilabial',
                'vowelMedium',
                'alveolar',
                'alveolar',
                'vowelMedium',
                'alveolar',
                'vowelMedium',
                'labioDental',
                'alveolar',
                'vowelMedium',
                'bilabial',
                'vowelMedium',
                'belar',
                'vowelMedium',
                'alveolar',
                'dentalFricative',
                'vowelMedium',
                'bilabial',
                'vowelMedium',
                'belar',
                'alveolar',
                'bilabial',
                'vowelMedium',
                'alveolar',
                'vowelRound'

            ]],

        },

        beginWhenYou: {

            URLs: [ prefixURL + tiaMediaLoc + "begin_when_you_are_ready.wav" ],
            texts: [ "begin when you are ready" ],
            phones: [[


                'bilabial',
                'vowelMedium',
                'belar',
                'vowelMedium',
                'alveolar',
                'vowelRound',
                'vowelMedium',
                'alveolar',
                'vowelMedium',
                'vowelRound',
                'vowelMedium',
                'alveolar',
                'alveolar',
                'vowelMedium',
                'alveolar',
                'vowelEe'

            ]],

        }

    }

}

var volumeObject = {
    bool: false,
    display: false,
}

var tiaThinkingObject = {

    thinking: false,
    startX: - 0.1,
    startY: 0.2,
    maxX: 0.075,
    maxY: 0.15,

}









