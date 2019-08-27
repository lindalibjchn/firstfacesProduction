function normalBreathing() {
    
    let breatheCount = mainCount % secsOneBreath;

    // change breathing direction
    if ( breatheCount === 0 ) {

        breatheObject.direction *= -1;

    }

    breathe( breatheCount, 1 )

}

function speakingBreathing() {

    let speakingBreatheCount = mainCount - breatheObject.speakingBreath.startCount;
    //console.log('speakingBreatheCount:', speakingBreatheCount );
    
    if ( mainCount < breatheObject.speakingBreath.endCount ) {

        //console.log(' in breathe');
        breathe( speakingBreatheCount, 1.75 );

    } else {

        //console.log(' in else');
        if ( breatheObject.direction === 1 ) {

            initSpeakingBreath( -1 );

        } else {

            // wait for count to come round to same as before speaking breath interrupted
            if ( mainCount % secsOneBreath === breatheObject.normalBreatheStopCount ) {

                breatheObject.sin = sineArrays[ secsOneBreath.toString() ];
                breatheObject.sinLength = 180
                breatheObject.direction = breatheObject.normalBreatheStopDirection;
                breatheObject.bool = true;

            }

        }

    }

}

function breathe( bCount, mult ) {

    tiaObject.bodyBones.spineUpper.scale.x += mult * breatheObject.direction * breatheObject.scaleMultX * breatheObject.sin[ bCount ];
    tiaObject.bodyBones.spineUpper.scale.y += mult * breatheObject.direction * breatheObject.scaleMultY * breatheObject.sin[ bCount ];
    tiaObject.bodyBones.spineUpper.scale.z += mult * breatheObject.direction * breatheObject.scaleMultZ * breatheObject.sin[ bCount ]; 
    tiaObject.faceBones['shoulder.L'].position.y += mult * breatheObject.direction * breatheObject.yPosMult * breatheObject.sin[ bCount ];
    tiaObject.faceBones['shoulder.R'].position.y += mult * breatheObject.direction * breatheObject.yPosMult * breatheObject.sin[ bCount ];

}

function initSpeakingBreath( direction ) {

    breatheObject.bool = false;

    if ( direction === 1 ) {

        breatheObject.speakingBreath.inCount = synthesisObject.durationOfFirstAndLastPhones;
        breatheObject.speakingBreath.startCount = mainCount;
        breatheObject.normalBreatheStopCount = mainCount % secsOneBreath;
        breatheObject.normalBreatheStopDirection = breatheObject.direction;
        breatheObject.direction = direction;
        assignSinArrayForSpeed( breatheObject.speakingBreath.inCount, breatheObject, sineArrays ); 
        breatheObject.speakingBreath.endCount = mainCount + breatheObject.sinLength;;
        console.log('breatheObject.sin:', breatheObject.sin);

    } else {

        breatheObject.speakingBreath.startCount = mainCount;
        breatheObject.direction = direction;//needs to be here twice to allow keeping of direction above
        breatheObject.speakingBreath.endCount = mainCount + breatheObject.speakingBreath.outCount * 60;
        assignSinArrayForSpeed( breatheObject.speakingBreath.outCount, breatheObject, sineArrays ) 

    }

}
