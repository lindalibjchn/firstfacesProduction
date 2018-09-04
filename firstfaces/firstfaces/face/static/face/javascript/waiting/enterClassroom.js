
function initCameraMove( to, speed ) {

    let from = cameraObject.currentState;

    if ( from !== to ) { 

        if ( from === "enter" ) {

            assignSinArrayForSpeed( speed, cameraObject, sineArrays );

            cameraObject[ 'startCount' ] = mainCount;
            cameraObject[ 'bool' ] = true;

            cameraObject[ 'movementX' ] = enterPosX - deskPosX;
            cameraObject[ 'movementY' ] = enterPosY - deskPosY;
            cameraObject[ 'movementZ' ] = enterPosZ - deskPosZ;

            cameraObject[ 'rotationY' ] = enterRotY - deskRotY;
                
            cameraObject.currentState = "desk";

        } else if ( from === "desk" ) {

            if ( to === "class" ) {

                assignSinArrayForSpeed( speed, cameraObject, sineArrays );

                cameraObject[ 'startCount' ] = mainCount;
                cameraObject[ 'bool' ] = true;

                cameraObject[ 'movementX' ] = deskPosX - classPosX;
                cameraObject[ 'movementY' ] = deskPosY - classPosY;
                cameraObject[ 'movementZ' ] = deskPosZ - classPosZ;

                cameraObject[ 'rotationY' ] = deskRotY - classRotY;
                    
                cameraObject.currentState = "class";

            }

        }

    } else {

        console.log( "same place" );

    }

}    

function initBookMove( book, to, speed ) {

    let bookObj = {}
    $('#testsBook').hide(); 
    $('#sentencesBook').hide(); 
    $('#newsBook').hide(); 

    if ( book === "tests" ) {
        
        bookObj = clickableObjects.tests;
        showTestsBook();
        clickableObjects.clickedBook = "tests";

    } else if ( book === "sentences" ) {

        bookObj = clickableObjects.sentences;
        showSentencesBook();
        clickableObjects.clickedBook = "sentences";

    } else if ( book === "laptop" ) {

        bookObj = clickableObjects.laptop;
        showNewsBook();
        clickableObjects.clickedBook = "laptop";

    }

    let from = bookObj.currentState;

    if ( from !== to ) { 

        var mult;

        if ( from === "desk" ) {

            mult = 1

        } else if ( from === "face" ) {

            mult = -1;

        }
            
        assignSinArrayForSpeed( speed, bookObj, sineArrays );

        bookObj[ 'startCount' ] = mainCount;
        bookObj[ 'bool' ] = true;

        bookObj[ 'movementX' ] = mult * ( bookObj.deskPos.x - bookObj.facePos.x );
        bookObj[ 'movementY' ] = mult * ( bookObj.deskPos.y - bookObj.facePos.y );
        bookObj[ 'movementZ' ] = mult * ( bookObj.deskPos.z - bookObj.facePos.z );

        bookObj[ 'rotationX' ] = mult * bookObj.faceRot.x;
        bookObj[ 'rotationY' ] = mult * bookObj.faceRot.y;
        bookObj[ 'rotationZ' ] = mult * bookObj.faceRot.z;
            
        bookObj.currentState = "face";

    } else {

        console.log( "same place" );

    }

}    

function initDoorOpen( speed ) {

    assignSinArrayForSpeed( speed, doorObject, sineArrays );

    doorObject[ 'startCount' ] = mainCount;
    doorObject[ 'bool' ] = true;

}


function moveCamera( main ) {

    let main_start = main - cameraObject.startCount;

    let sinArray = cameraObject.sin;

    let sinAmount = sinArray[ main_start ]
    
    if ( main_start < cameraObject.sinLength ) {

        camera.position.x -= sinAmount * cameraObject.movementX;
        camera.position.y -= sinAmount * cameraObject.movementY;
        camera.position.z -= sinAmount * cameraObject.movementZ;

        camera.rotation.y -= sinAmount * cameraObject.rotationY;

    } else {

        cameraObject[ 'bool' ] = false;

        if ( cameraObject.currentState === "desk" ) {

        } else if ( cameraObject.currentState === "class" ) {

            window.location.href = "/class_time/" + scheduleDict[ 'session_id' ].toString();

        }

    }


}

function moveBook( main, bookObj ) {

    let main_start = main - bookObj.startCount;

    let sinArray = bookObj.sin;

    let sinAmount = sinArray[ main_start ]
    
    if ( main_start < bookObj.sinLength ) {

        bookObj.position.x -= sinAmount * bookObj.movementX;
        bookObj.position.y -= sinAmount * bookObj.movementY;
        bookObj.position.z -= sinAmount * bookObj.movementZ;

        bookObj.rotation.x += sinAmount * bookObj.rotationX;
        bookObj.rotation.y += sinAmount * bookObj.rotationY;
        bookObj.rotation.z += sinAmount * bookObj.rotationZ;

    } else {

        bookObj.bool = false;

        if ( clickableObjects.clickedBook !== "" ) {
            
            $("#bookContentBackground").fadeIn( 1000 );
        
        } else {

            bookObj.material[0].emissive = { r: 0, g: 0, b: 0 };
            renderer.domElement.addEventListener( "click", onClick );
            renderer.domElement.addEventListener( "mousemove", onMouseMove );
            bookObj.currentState = "desk";

        }

    }

}

function moveDoor( main ) {

    let main_start = main - doorObject.startCount;

    let sinArray = doorObject.sin;

    let sinAmount = sinArray[ main_start ]
    
    if ( main_start < doorObject.sinLength ) {

        doorBone.rotation.y += sinAmount * doorOpenRotY;

    } else {

        cameraObject[ 'bool' ] = false;

    }

}

///////// enter the classroom

//function enterClass() {

   //$("#see-through-background").fadeOut( 1500 );
   
   //initCameraMove( "inside", '4' );
   //initDoorsOpen( '4' );

//}

function putTimetableUp() {


    scheduleObject.timeBlock.position.set( scheduleObject.position.x, scheduleObject.position.y, scheduleObject.position.z );

    // add green blocks to schedule on wall
    for ( var key in scheduleDict ) {

        if ( scheduleDict.hasOwnProperty( key ) ) {

            if ( scheduleDict[ key ].length !== 0 ) {
    
                for ( let i=0; i<scheduleDict[ key ].length; i++ ) {

                    let hourBlockClone = scheduleObject.hourBlock.clone();
                    
                    hourBlockClone.scale.y = scheduleDict[ key ][ i ][ 1 ] - scheduleDict[ key][ i ][ 0 ];

                    let blueBlockMat = new THREE.MeshBasicMaterial( { color: 0x0089cf, transparent: true, opacity: 0.5 } );

                    let intKey = parseInt( key );

                    // gets the colour right for the time blocks
                    if ( intKey < scheduleNow[ 0 ] ) {

                        hourBlockClone.material = blueBlockMat;

                    } else if ( intKey === scheduleNow[ 0 ] ) {

                        console.log('yo');
                        if ( scheduleDict[ key ][ i ][ 0 ] <= scheduleNow[ 1 ] ) {

                            if ( scheduleDict[ key ][ i ][ 1 ] > scheduleNow[ 1 ] ) {

                                hourBlockClone.material = new THREE.MeshBasicMaterial( { color: 0x53ef59, transparent: true, opacity: 0.5 } );
                                scheduleObject.blinkingBlock = hourBlockClone;
                                scheduleObject.availableNow = true;

                            } else {

                                hourBlockClone.material = blueBlockMat;

                            }
                        
                        }

                    }

                    scheduleObject.timeBlock.add( hourBlockClone );
                    hourBlockClone.position.x = scheduleObject.topLeftPos.x + key * scheduleObject.lenX / 5;
                    hourBlockClone.position.y = scheduleObject.topLeftPos.y - schedYMult * scheduleDict[ key ][ i ][ 0 ] - schedYMult * ( hourBlockClone.scale.y - 1 ) / 2;
                    hourBlockClone.position.z = 0.01;

                }
            
            }

        }

    }

    //add blue line for current time

    scheduleObject.timeNowLine.position.x = scheduleObject.topLeftPos.x + scheduleNow[0] * scheduleObject.lenX / 5;
    scheduleObject.timeNowLine.position.z = 0.01;

    if ( scheduleNow[ 1 ] < 0 ) {

        scheduleObject.timeNowLine.position.y = scheduleObject.topLeftPos.y + 0.11;

    } else if ( scheduleNow[ 1 ] < 7 ) {

        console.log('deq');
        scheduleObject.timeNowLine.position.y = scheduleObject.topLeftPos.y + schedYMult / 2 - schedYMult * scheduleNow[1];

    } else {

        scheduleObject.timeNowLine.position.y = scheduleObject.topLeftPos.y - 1.50;

    }

    if ( scheduleNow[ 0 ] >= 0 ) {

        scheduleObject.timeBlock.add( scheduleObject.timeNowLine );

    }

}

function blink() {

    if ( scheduleObject.blinkOn ) {

        scheduleObject.blinkingBlockMat.color.setHex( 0x53ef59 );
        scheduleObject.blinkOn = false;

    } else {

        scheduleObject.blinkingBlockMat.color.setHex( 0xecef52 );
        scheduleObject.blinkOn = true;

    }

}











