function newTilt( boneObject ) {

    boneObject.startCount = mainCount;

    if ( boneObject.to ) {

        boneObject.direction *= -1;
        boneObject.to = false;
    

    } else {
        var newSinAmount;
        boneObject.direction *= Math.random() < 0.5 ? -1 : 1;
        if ( boneObject === neckRandomTiltObject || boneObject === spineRandomTiltObject ) {
         
            newSinAmount = SINEARRAYFORTILTSECONDS[ Math.floor( Math.random() *  SINEARRAYFORTILTSECONDS.length ) ];
            boneObject.sin = sineArrays[ newSinAmount.toString() ];
            boneObject.sinLength = boneObject.sin.length;
            
            if ( boneObject === neckRandomTiltObject ) {
            
                boneObject.mult = 2.5 * Math.random();

            } else {

                boneObject.mult = Math.random();
        
            }

        } else {

            newSinAmount = SINEARRAYFORHEADTILTSECONDS[ Math.floor( Math.random() * SINEARRAYFORHEADTILTSECONDS.length ) ];
            boneObject.sin = sineArrays[ newSinAmount ];
            boneObject.sinLength = boneObject.sin.length;
            
            boneObject.mult = 0.75 + 0.75 * Math.random();

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

function randomTiltHeadX( remaining ) {

    let Xmult = headXRandomTiltObject.direction * headXRandomTiltObject.mult * headXRandomTiltObject.sin[ remaining ];
    tiaObject.faceBones.head.rotation.x = Xmult;
    eyeObject.currentCoords[ 1 ][ 0 ] = -Xmult;
    tiaObject.eyeBones.eyeL.rotation.x = -Xmult + EYEL_ROT.x;
    tiaObject.eyeBones.eyeR.rotation.x = -Xmult + EYER_ROT.x;

}

function randomTiltHeadY( remaining ) {

    let Ymult =  2 * headYRandomTiltObject.direction * headYRandomTiltObject.mult * headYRandomTiltObject.sin[ remaining ];
    tiaObject.faceBones.head.rotation.y = Ymult;
    eyeObject.currentCoords[ 1 ][ 1 ] = -Ymult;
    tiaObject.eyeBones.eyeL.rotation.y = -Ymult + EYEL_ROT.y;
    tiaObject.eyeBones.eyeR.rotation.y = -Ymult + EYER_ROT.y;

}


