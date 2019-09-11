function newTilt( boneObject ) {

    boneObject.startCount = mainCount;

    if ( boneObject.to ) {

        boneObject.direction *= -1;
        boneObject.to = false;
    

    } else {
        
        let newSinAmount = SINEARRAYFORTILTSECONDS[ Math.floor( Math.random() *  SINEARRAYFORTILTSECONDS.length ) ];
        boneObject.sin = sineArrays[ newSinAmount.toString() ];
        boneObject.sinLength = boneObject.sin.length;
        boneObject.direction *= Math.random() < 0.5 ? -1 : 1;
        if ( boneObject === neckRandomTiltObject ) {
         
            boneObject.mult =  2.5 * Math.random();

        } else {

            boneObject.mult = Math.random();
        
        }

        boneObject.to = true;

    }

}

function randomTiltSpine( remaining ) {

    tiaObject.bodyBones.spineLower.rotation.z = spineRandomTiltObject.direction * spineRandomTiltObject.mult * spineRandomTiltObject.sin[ remaining ];

}

function randomTiltNeck( remaining ) {

    tiaObject.faceBones.neck.rotation.z = neckRandomTiltObject.direction * neckRandomTiltObject.mult * neckRandomTiltObject.sin[ remaining ];

}


