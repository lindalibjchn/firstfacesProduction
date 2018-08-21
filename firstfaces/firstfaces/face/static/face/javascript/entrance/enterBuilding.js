
function initCameraMove( to, speed ) {

    let from = cameraObject.currentState;

    console.log('initCameraMove');
    if ( from !== to ) { 

        if ( from === "path" ) {

            assignSinArrayForSpeed( speed, cameraObject, sineArrays );

            cameraObject[ 'startCount' ] = mainCount;
            cameraObject[ 'bool' ] = true;

            cameraObject[ 'movementZ' ] = pathPosZ - doorPosZ;
            cameraObject[ 'rotationX' ] = pathRotX - doorRotX;
                
            cameraObject.currentState = "door";

        } else if ( from === "door" ) {

            assignSinArrayForSpeed( speed, cameraObject, sineArrays );

            cameraObject[ 'startCount' ] = mainCount;
            cameraObject[ 'bool' ] = true;

            cameraObject[ 'movementZ' ] = camera.position.z - insidePosZ;
            cameraObject[ 'rotationX' ] = camera.rotation.x - insideRotX;
                
            cameraObject.currentState = "inside";

        }

    } else {

        console.log( "same place" );

    }

}    

function initDoorsOpen( speed ) {

    assignSinArrayForSpeed( speed, doorsObject, sineArrays );

    doorsObject[ 'startCount' ] = mainCount;
    doorsObject[ 'bool' ] = true;

}


function moveCamera( main ) {

    let main_start = main - cameraObject.startCount;

    let sinArray = cameraObject.sin;

    let sinAmount = sinArray[ main_start ]
    
    if ( main_start < cameraObject.sinLength ) {

        console.log('movement.z', cameraObject.movementZ);
        camera.position.z -= sinAmount * cameraObject.movementZ;
        camera.rotation.x -= sinAmount * cameraObject.rotationX;

    } else {

        cameraObject[ 'bool' ] = false;

        if ( cameraObject.currentState === "door" ) {

            $("#see-through-background").fadeIn( 1000, showInfoBoxes );

        } else if ( cameraObject.currentState === "inside" ) {

            window.location.href = "/face/waiting";

        }

    }

    function showInfoBoxes() {

        console.log('showing info boxes');

        let ids = [ "#infoCard01", "#infoCard02", "#infoCard03" ]

        let idCount = 0
        setTimeout(function(){showInfoBox( ids[ idCount ] )}, 1000);

        function showInfoBox( id ) {

            $( id ).fadeIn( 1000 );

            if ( idCount < ids.length ) {

                idCount += 1;
                setTimeout( function() {showInfoBox( ids[ idCount ] )}, 2000 );

            } else {

                $(".swapCardsButtonDiv").fadeIn( 1000 );
                $(".info-card").show();

            }

        }

    }

}

function moveDoors( main ) {

    let main_start = main - doorsObject.startCount;

    let sinArray = doorsObject.sin;

    let sinAmount = sinArray[ main_start ]
    
    if ( main_start < doorsObject.sinLength ) {

        doorLBone.rotation.y -= sinAmount * doorOpenRotY;
        doorRBone.rotation.y += sinAmount * doorOpenRotY;

    } else {

        cameraObject[ 'bool' ] = false;

    }

}

///////// enter the school doors

function enterSchool() {

   $("#see-through-background").fadeOut( 1500 );
   
   initCameraMove( "inside", '4' );
   initDoorsOpen( '4' );

}















