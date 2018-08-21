const enterPosX = 4.0;
const enterPosY = 4.4;
const enterPosZ = 5.0;

const enterRotX = 0;
const enterRotY = 1.0;
const enterRotZ = 0;

const deskPosX = -0.3;
const deskPosY = 3.4;
const deskPosZ = 4.5;

const deskRotX = 0;
const deskRotY = 0.3;
const deskRotZ = 0;

const classPosX = -5;
const classPosY = 4.4;
const classPosZ = 0 

const classRotX = -0.2;
const classRotY = 0;
const classRotZ = 0;

const doorOpenRotY = 2.5;

const doorSignPosX = 2.0;
const doorSignPosY = 1.6;
const doorSignPosZ = 0.02;

const schedYMult = 0.22;

var sessionId;

var cameraObject = {
    currentState: "enter",
    startCount: 0,
    bool: false,
    sin: []
}

var doorObject = {
    currentState: "closed",
    startCount: 0,
    bool: false,
    sin: []
}

var doorBone;

var clickableObjects = {
    underMouse: false,
    intersectedObj: {material: "nope"},
    tests: {},
    sentencesData: {},
    doorSign: {},
    laptop: {},
}

var scheduleObject = {

    timeBlock: {},
    lenX: 2.77,
    lenY: 1.64,
    position: { x: -0.34, y: 3.93, z: 0.1 },
    topLeftPos: { x: -1.1, y: 0.71, z: 0 },
    blinkingBlock: {},
    blinkingBlockMat: new THREE.MeshBasicMaterial( { color: 0x53ef59 /*, transparent: true, opacity: 0.5 */} ),
    availableNow: false,
    blinkOn: true 
        
}




