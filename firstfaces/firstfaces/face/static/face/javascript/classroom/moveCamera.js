

///////// MOVE CAMERA AND TIAS HEAD 

// CAMERA

function initCameraMove( to, secs ) {

    let from = cameraObject.currentState;

    if ( from !== to ) { 

        assignSinArrayForSpeed( secs, cameraObject, cumSineArrays );

        cameraObject[ 'startCount' ] = mainCount;
        cameraObject[ 'bool' ] = true;

        if ( from === "laptop" ) {

            cameraObject[ 'startPointX' ] = CAMERA_SIT_TO_LAPTOP_ROT.x;
            cameraObject[ 'startPointY' ] = CAMERA_SIT_TO_LAPTOP_ROT.y;
            
            if ( to === "tia" ) {

                cameraObject[ 'rotationX' ] = CAMERA_SIT_TO_TIA_ROT.x - CAMERA_SIT_TO_LAPTOP_ROT.x;
                cameraObject[ 'rotationY' ] = CAMERA_SIT_TO_TIA_ROT.y - CAMERA_SIT_TO_LAPTOP_ROT.y;
                
                cameraObject.currentState = "tia";
            
            } else if ( to === "board" ) {

                cameraObject[ 'rotationX' ] = CAMERA_SIT_TO_BOARD_ROT.x - CAMERA_SIT_TO_LAPTOP_ROT.x;
                cameraObject[ 'rotationY' ] = CAMERA_SIT_TO_BOARD_ROT.y - CAMERA_SIT_TO_LAPTOP_ROT.y;

                cameraObject.currentState = "board";

            }

        } else if ( from === "tia" ) {

            cameraObject[ 'startPointX' ] = CAMERA_SIT_TO_TIA_ROT.x;
            cameraObject[ 'startPointY' ] = CAMERA_SIT_TO_TIA_ROT.y;
            
            if ( to === "laptop" ) {

                cameraObject[ 'rotationX' ] = CAMERA_SIT_TO_LAPTOP_ROT.x - CAMERA_SIT_TO_TIA_ROT.x;
                cameraObject[ 'rotationY' ] = CAMERA_SIT_TO_LAPTOP_ROT.y - CAMERA_SIT_TO_TIA_ROT.y;

                cameraObject.currentState = "laptop";

            } else if ( to === "board" ) {

                cameraObject[ 'rotationX' ] = CAMERA_SIT_TO_BOARD_ROT.x - CAMERA_SIT_TO_TIA_ROT.x;
                cameraObject[ 'rotationY' ] = CAMERA_SIT_TO_BOARD_ROT.y - CAMERA_SIT_TO_TIA_ROT.y;

                cameraObject.currentState = "board";

            }

        } else if ( from === "board" ) {

            cameraObject[ 'startPointX' ] = CAMERA_SIT_TO_BOARD_ROT.x;
            cameraObject[ 'startPointY' ] = CAMERA_SIT_TO_BOARD_ROT.y;
            
            if ( to === "laptop" ) {

                cameraObject[ 'rotationX' ] = CAMERA_SIT_TO_LAPTOP_ROT.x - CAMERA_SIT_TO_BOARD_ROT.x;
                cameraObject[ 'rotationY' ] = CAMERA_SIT_TO_LAPTOP_ROT.y - CAMERA_SIT_TO_BOARD_ROT.y;

                cameraObject.currentState = "laptop";

            } else if ( to === "tia" ) {

                cameraObject[ 'rotationX' ] = CAMERA_SIT_TO_TIA_ROT.x - CAMERA_SIT_TO_BOARD_ROT.x;
                cameraObject[ 'rotationY' ] = CAMERA_SIT_TO_TIA_ROT.y - CAMERA_SIT_TO_BOARD_ROT.y;

                cameraObject.currentState = "tia";

            }

        }

    } else {

        console.log( "same place" );

    }

}    

function rotateCamera( main ) {

    let main_start = main - cameraObject.startCount;

    let sinArray = cameraObject.sin;

    let sinAmount = sinArray[ main_start ]
    
    if ( main_start < cameraObject.sinLength ) {

        camera.rotation.x = sinAmount * cameraObject[ 'rotationX' ] + cameraObject[ 'startPointX' ];
        camera.rotation.y = sinAmount * cameraObject[ 'rotationY' ] + cameraObject[ 'startPointY' ];

    } else {

        cameraObject[ 'bool' ] = false;

    }
}


