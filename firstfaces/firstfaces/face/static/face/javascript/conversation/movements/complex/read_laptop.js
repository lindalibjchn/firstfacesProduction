function backNReadALine() {

    var randomReadingMovement = $.extend( true, {}, movementObject.abs.laptop );

    let plusOrMinusX = Math.random() - 0.5; 
    let plusOrMinusY = Math.random() - 0.5; 
    let randomHeadRotX = 0.15 + plusOrMinusX * 0.03;
    let randomHeadRotY = plusOrMinusY * 0.15;
    randomReadingMovement.AUs.AU1.head = [[0,0,0],[randomHeadRotX, randomHeadRotY, 0]]

    let randomEyeRotX = 0.2 + plusOrMinusX * 0.075;
    let randomEyeRotY = plusOrMinusY * 0.3;
    randomReadingMovement.sacc = [[0,0,0],[randomEyeRotX, randomEyeRotY, 0]]
    
    let randSaccDur = [ '0.25', '0.5' ][Math.floor(Math.random() * 2)]
    let randHeadDur = [ '0.75', '1', '1.5' ][Math.floor(Math.random() * 3)]
    
    movementController( randomReadingMovement, randSaccDur, randHeadDur )

    let delayForReadingSacc = 1000 + Math.random() * 2500;
    setTimeout( waitForWrongSlices, delayForReadingSacc )

}

