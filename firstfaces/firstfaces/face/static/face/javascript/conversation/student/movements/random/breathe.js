function normalBreathing() {
    
    let breatheCount = mainCount % secsOneBreath;

    // change breathing direction
    if ( breatheCount === 0 ) {

        breatheObject.direction *= -1;

    }

    breathe( breatheCount, 1.5 )

}

function singleBreathing() {

    let singleBreatheCount = mainCount - breatheObject.singleBreath.startCount;
    
    if ( mainCount < breatheObject.singleBreath.endCount ) {

        //console.log(' in breathe');
        breathe( singleBreatheCount, breatheObject.singleBreath.mult );

    } else {

        //console.log(' in else');
        if ( breatheObject.direction === -1 ) {

            // wait for count to come round to same as before single breath interrupted
            if ( mainCount % secsOneBreath === breatheObject.normalBreatheStopCount ) {

                breatheObject.sin = sineArrays[ secsOneBreath.toString() ];
                breatheObject.sinLength = 180;
                breatheObject.direction = breatheObject.normalBreatheStopDirection;
                breatheObject.bool = true;

            }

        }

    }

}

function breathe( bCount, mult ) {

    let genMult = mult * breatheObject.direction * breatheObject.sin[ bCount ];
    tiaObject.bodyBones.spineUpper.scale.x += genMult * breatheObject.scaleMultX;
    tiaObject.bodyBones.spineUpper.scale.y += genMult * breatheObject.scaleMultY;
    tiaObject.bodyBones.spineUpper.scale.z += genMult * breatheObject.scaleMultZ; 
    let shoulderMult = genMult * breatheObject.yPosMult;
    //tiaObject.faceBones['shoulder.L'].scale.x += genMult * breatheObject.scaleMultX;
    //tiaObject.faceBones['shoulder.R'].scale.x += genMult * breatheObject.scaleMultX;
    tiaObject.faceBones['shoulder.L'].scale.y += genMult * breatheObject.scaleMultShoulder;
    tiaObject.faceBones['shoulder.R'].scale.y += genMult * breatheObject.scaleMultShoulder;
    //tiaObject.faceBones['shoulder.L'].scale.z += genMult * breatheObject.scaleMultZ;
    //tiaObject.faceBones['shoulder.R'].scale.z += genMult * breatheObject.scaleMultZ;

}

function initSingleBreath( direction, amount, duration ) {

    if ( direction === 1 ) {

        breatheObject.normalBreatheStopCount = mainCount % secsOneBreath;
        breatheObject.normalBreatheStopDirection = breatheObject.direction;

    }

    breatheObject.bool = false;
    breatheObject.direction = direction;
    breatheObject.singleBreath.startCount = mainCount;
    breatheObject.singleBreath.mult = amount;
    breatheObject.singleBreathCount = duration;
    assignSinArrayForSpeed( breatheObject.singleBreathCount, breatheObject, sineArrays ); 
    breatheObject.singleBreath.endCount = mainCount + breatheObject.sinLength;
    
}
