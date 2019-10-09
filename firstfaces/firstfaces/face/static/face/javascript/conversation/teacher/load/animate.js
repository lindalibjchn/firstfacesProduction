function animate () {

    if ( expressionObject.bool ) {

        expression( mainCount );

    }

    if ( movementObject.bool ) {

        movement( mainCount );

    }

    if ( eyeObject[ 'bool' ] ) {

        moveEyes( mainCount );

    }


    if ( eyelidObject.bool ) {

        moveEyelids( mainCount );

    }

    if ( nodObject.bool ) {

        nod( mainCount )

    }

    if ( shakeObject.bool ) {

        shake( mainCount )

    }
    ////console.log('in animate');
    mainCount += 1;

    requestAnimationFrame( animate );
    
    renderer.render(scene, camera);

};

