
const pathRotX = -0.05;
const doorRotX = 0.15;
const insideRotX = -0.05;
const pathPosY = 2;
const pathPosZ = 26;
const doorPosZ = 8;
const insidePosZ = -2;

const doorOpenRotY = 2;

var cameraObject = {
    currentState: "path",
    startCount: 0,
    bool: false,
    sin: []
}

var doorsObject = {
    currentState: "closed",
    startCount: 0,
    bool: false,
    sin: []
}

var currentSlide = 0;

var doorLBone;
var doorRBone;
