function getAbsoluteCoordsOfMovementNow() {

    let absMovement = $.extend(true, {}, movementObject.rel.blank);

    Object.keys( absMovement.AUs.AU2 ).forEach( function( key ) {

        absMovement.AUs.AU2[ key ][ 0 ][ 0 ] = tiaObject.faceBones[ key + '.L'  ].position.x;
        absMovement.AUs.AU2[ key ][ 0 ][ 1 ] = tiaObject.faceBones[ key + '.L'  ].position.y;
        absMovement.AUs.AU2[ key ][ 0 ][ 2 ] = tiaObject.faceBones[ key + '.L'  ].position.z;

        absMovement.AUs.AU2[ key ][ 1 ][ 0 ] = tiaObject.faceBones[ key + '.L'  ].rotation.x;
        absMovement.AUs.AU2[ key ][ 1 ][ 1 ] = tiaObject.faceBones[ key + '.L'  ].rotation.y;
        absMovement.AUs.AU2[ key ][ 1 ][ 2 ] = tiaObject.faceBones[ key + '.L'  ].rotation.z;

    })
        
    Object.keys( absMovement.AUs.AU2b ).forEach( function( key ) {

        absMovement.AUs.AU2b[ key ][ 0 ][ 0 ] = tiaObject.bodyBones[ key ].position.x;
        absMovement.AUs.AU2b[ key ][ 0 ][ 1 ] = tiaObject.bodyBones[ key ].position.y;
        absMovement.AUs.AU2b[ key ][ 0 ][ 2 ] = tiaObject.bodyBones[ key ].position.z;

        absMovement.AUs.AU2b[ key ][ 1 ][ 0 ] = tiaObject.bodyBones[ key ].rotation.x;
        absMovement.AUs.AU2b[ key ][ 1 ][ 1 ] = tiaObject.bodyBones[ key ].rotation.y;
        absMovement.AUs.AU2b[ key ][ 1 ][ 2 ] = tiaObject.bodyBones[ key ].rotation.z;

    })
        
    Object.keys( absMovement.AUs.AU1 ).forEach( function( key ) {
       
        absMovement.AUs.AU1[ key ][ 0 ][ 0 ] = tiaObject.faceBones[ key ].position.x;
        absMovement.AUs.AU1[ key ][ 0 ][ 1 ] = tiaObject.faceBones[ key ].position.y;
        absMovement.AUs.AU1[ key ][ 0 ][ 2 ] = tiaObject.faceBones[ key ].position.z;

        absMovement.AUs.AU1[ key ][ 1 ][ 0 ] = tiaObject.faceBones[ key ].rotation.x;
        absMovement.AUs.AU1[ key ][ 1 ][ 1 ] = tiaObject.faceBones[ key ].rotation.y;
        absMovement.AUs.AU1[ key ][ 1 ][ 2 ] = tiaObject.faceBones[ key ].rotation.z;

    })

    //Mouth Jaw Inner is part of a different object and so needs to be done separately
    Object.keys( absMovement.AUs.AU1b ).forEach( function( key ) {

        absMovement.AUs.AU1b[ key ][ 1 ][ 0 ] = tiaObject.bodyBones[ key ].position.x;
        absMovement.AUs.AU1b[ key ][ 1 ][ 1 ] = tiaObject.bodyBones[ key ].position.y;
        absMovement.AUs.AU1b[ key ][ 1 ][ 2 ] = tiaObject.bodyBones[ key ].position.z;
        
        absMovement.AUs.AU1b[ key ][ 1 ][ 0 ] = tiaObject.bodyBones[ key ].rotation.x;
        absMovement.AUs.AU1b[ key ][ 1 ][ 1 ] = tiaObject.bodyBones[ key ].rotation.y;
        absMovement.AUs.AU1b[ key ][ 1 ][ 2 ] = tiaObject.bodyBones[ key ].rotation.z;
        
    })

    return absMovement;

}

function getAbsoluteCoordsOfMainMovements() {

    Object.keys( movementObject.rel ).forEach( function( exp ) {

        indMovRel = movementObject.rel[ exp ];
        let movement = $.extend( true, {}, indMovRel );

        Object.keys( indMovRel.AUs.AU2 ).forEach( function( key ) {

            movement.AUs.AU2[ key ][ 0 ][ 0 ] += movementObject.base.AUs.AU2[ key ][ 0 ][ 0 ];
            movement.AUs.AU2[ key ][ 0 ][ 1 ] += movementObject.base.AUs.AU2[ key ][ 0 ][ 1 ];
            movement.AUs.AU2[ key ][ 0 ][ 2 ] += movementObject.base.AUs.AU2[ key ][ 0 ][ 2 ];

            movement.AUs.AU2[ key ][ 1 ][ 0 ] += movementObject.base.AUs.AU2[ key ][ 1 ][ 0 ];
            movement.AUs.AU2[ key ][ 1 ][ 1 ] += movementObject.base.AUs.AU2[ key ][ 1 ][ 1 ];
            movement.AUs.AU2[ key ][ 1 ][ 2 ] += movementObject.base.AUs.AU2[ key ][ 1 ][ 2 ];

        })
            
        Object.keys( movementObject.base.AUs.AU2b ).forEach( function( key ) {

            movement.AUs.AU2b[ key ][ 0 ][ 0 ] += movementObject.base.AUs.AU2b[ key ][ 0 ][ 0 ];
            movement.AUs.AU2b[ key ][ 0 ][ 1 ] += movementObject.base.AUs.AU2b[ key ][ 0 ][ 1 ];
            movement.AUs.AU2b[ key ][ 0 ][ 2 ] += movementObject.base.AUs.AU2b[ key ][ 0 ][ 2 ];


            movement.AUs.AU2b[ key ][ 1 ][ 0 ] += movementObject.base.AUs.AU2b[ key ][ 1 ][ 0 ];
            movement.AUs.AU2b[ key ][ 1 ][ 1 ] += movementObject.base.AUs.AU2b[ key ][ 1 ][ 1 ];
            movement.AUs.AU2b[ key ][ 1 ][ 2 ] += movementObject.base.AUs.AU2b[ key ][ 1 ][ 2 ];
            
        });

        Object.keys( movementObject.base.AUs.AU1 ).forEach( function( key ) {

            movement.AUs.AU1[ key ][ 0 ][ 0 ] += movementObject.base.AUs.AU1[ key ][ 0 ][ 0 ];
            movement.AUs.AU1[ key ][ 0 ][ 1 ] += movementObject.base.AUs.AU1[ key ][ 0 ][ 1 ];
            movement.AUs.AU1[ key ][ 0 ][ 2 ] += movementObject.base.AUs.AU1[ key ][ 0 ][ 2 ];


            movement.AUs.AU1[ key ][ 1 ][ 0 ] += movementObject.base.AUs.AU1[ key ][ 1 ][ 0 ];
            movement.AUs.AU1[ key ][ 1 ][ 1 ] += movementObject.base.AUs.AU1[ key ][ 1 ][ 1 ];
            movement.AUs.AU1[ key ][ 1 ][ 2 ] += movementObject.base.AUs.AU1[ key ][ 1 ][ 2 ];

        })

        //Mouth Jaw Inner is part of a different object and so needs to be done separately
        Object.keys( movementObject.base.AUs.AU1b ).forEach( function( key ) {

            movement.AUs.AU1b[ key ][ 0 ][ 0 ] += movementObject.base.AUs.AU1b[ key ][ 0 ][ 0 ];
            movement.AUs.AU1b[ key ][ 0 ][ 1 ] += movementObject.base.AUs.AU1b[ key ][ 0 ][ 1 ];
            movement.AUs.AU1b[ key ][ 0 ][ 2 ] += movementObject.base.AUs.AU1b[ key ][ 0 ][ 2 ];


            movement.AUs.AU1b[ key ][ 1 ][ 0 ] += movementObject.base.AUs.AU1b[ key ][ 1 ][ 0 ];
            movement.AUs.AU1b[ key ][ 1 ][ 1 ] += movementObject.base.AUs.AU1b[ key ][ 1 ][ 1 ];
            movement.AUs.AU1b[ key ][ 1 ][ 2 ] += movementObject.base.AUs.AU1b[ key ][ 1 ][ 2 ];
            
        });

        movementObject.abs[ indMovRel.name ] = movement;

    });

}

