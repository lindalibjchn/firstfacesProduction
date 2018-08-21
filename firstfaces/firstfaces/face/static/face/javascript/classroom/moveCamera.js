

///////// MOVE CAMERA AND TIAS HEAD 

// CAMERA

function initCameraMove( to, speed ) {

    let from = cameraObject.currentState;

    if ( from !== to ) { 

        assignSinArrayForSpeed( speed, cameraObject, cumSineArrays );

        cameraObject[ 'startCount' ] = mainCount;
        cameraObject[ 'bool' ] = true;

        if ( from === "laptop" ) {

            cameraObject[ 'startPointX' ] = CAMERA_ROTATION_LAPTOP_X;
            cameraObject[ 'startPointY' ] = CAMERA_ROTATION_LAPTOP_Y;
            
            if ( to === "tia" ) {

                cameraObject[ 'rotationX' ] = CAMERA_ROTATION_TIA_X - CAMERA_ROTATION_LAPTOP_X;
                cameraObject[ 'rotationY' ] = CAMERA_ROTATION_TIA_Y - CAMERA_ROTATION_LAPTOP_Y;
                
                cameraObject.currentState = "tia";
            
            } else if ( to === "board" ) {

                cameraObject[ 'rotationX' ] = CAMERA_ROTATION_BOARD_X - CAMERA_ROTATION_LAPTOP_X;
                cameraObject[ 'rotationY' ] = CAMERA_ROTATION_BOARD_Y - CAMERA_ROTATION_LAPTOP_Y;

                cameraObject.currentState = "board";

            }

        } else if ( from === "tia" ) {

            cameraObject[ 'startPointX' ] = CAMERA_ROTATION_TIA_X;
            cameraObject[ 'startPointY' ] = CAMERA_ROTATION_TIA_Y;
            
            if ( to === "laptop" ) {

                cameraObject[ 'rotationX' ] = CAMERA_ROTATION_LAPTOP_X - CAMERA_ROTATION_TIA_X;
                cameraObject[ 'rotationY' ] = CAMERA_ROTATION_LAPTOP_Y - CAMERA_ROTATION_TIA_Y;

                cameraObject.currentState = "laptop";

            } else if ( to === "board" ) {

                cameraObject[ 'rotationX' ] = CAMERA_ROTATION_BOARD_X - CAMERA_ROTATION_TIA_X;
                cameraObject[ 'rotationY' ] = CAMERA_ROTATION_BOARD_Y - CAMERA_ROTATION_TIA_Y;

                cameraObject.currentState = "board";

            }

        } else if ( from === "board" ) {

            cameraObject[ 'startPointX' ] = CAMERA_ROTATION_BOARD_X;
            cameraObject[ 'startPointY' ] = CAMERA_ROTATION_BOARD_Y;
            
            if ( to === "laptop" ) {

                cameraObject[ 'rotationX' ] = CAMERA_ROTATION_LAPTOP_X - CAMERA_ROTATION_BOARD_X;
                cameraObject[ 'rotationY' ] = CAMERA_ROTATION_LAPTOP_Y - CAMERA_ROTATION_BOARD_Y;

                cameraObject.currentState = "laptop";

            } else if ( to === "tia" ) {

                cameraObject[ 'rotationX' ] = CAMERA_ROTATION_TIA_X - CAMERA_ROTATION_BOARD_X;
                cameraObject[ 'rotationY' ] = CAMERA_ROTATION_TIA_Y - CAMERA_ROTATION_BOARD_Y;

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


