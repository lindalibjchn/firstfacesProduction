

//////// LOAD SCENE AND OBJECTS \\\\\\\\


function init( skeleton=false ) {

    
    // MESH VARIABLES \\
    
    var mFace;
    var mHair;
    var mEyes;

    
    // SCENE \\
    
    scene = new THREE.Scene();
    
    
    // WINDOW \\

    var WIDTH = window.innerWidth;
    var HEIGHT = window.innerHeight - 22;

    window.addEventListener('resize', function() {
        
        WIDTH = window.innerWidth;
        HEIGHT = window.innerHeight - 22;
        renderer.setSize( WIDTH, HEIGHT );
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();

    });


    // RENDERER \\

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( WIDTH, HEIGHT );
    renderer.setClearColor(0x7ec0ee, 0.5);

    document.body.appendChild( renderer.domElement );


    // CAMERA \\

    camera = new THREE.PerspectiveCamera( 55, WIDTH / HEIGHT, 0.1, 1000 );
    
    //camera.position.set( 
            //CAMERA_DESK_POSITION_X, 
            //CAMERA_DESK_POSITION_Y, 
            //CAMERA_DESK_POSITION_Z 
        //);
    //camera.rotation.x = CAMERA_DESK_ROTATION_X;
    //camera.rotation.y = CAMERA_DESK_ROTATION_Y;
    
    scene.add( camera );

    //controls = new THREE.OrbitControls( camera, renderer.domElement );


    // LIGHTS \\

    var pointLight = new THREE.PointLight( 0xe0fffa, 0.7, 0, 2 );
    pointLight.position.set( 100, 10, 60 );
    scene.add( pointLight );

    var pointLightLowLeft = new THREE.PointLight( 0xe0fffa, 0.5, 0, 2 );
    pointLightLowLeft.position.set( -100, -10, 60 );
    scene.add( pointLightLowLeft );

    var ambientLight = new THREE.AmbientLight( 0xffffff, 0.4 );
    scene.add( ambientLight )

    var hemiLight = new THREE.HemisphereLight( 0xf9f8ed, 0xf9f8ed, 0.4);
    scene.add( hemiLight );


    // LOAD OBJECTS \\

    var loader = new THREE.JSONLoader();
    
    loader.load( classroom, addClassroom );

    function addClassroom( geom, mat ) {

        // global center
        //var globalCentre = new THREE.Mesh( new THREE.BoxGeometry(10, 10, 10), new THREE.MeshBasicMaterial( {color: 0x00ff00} ) )
        //scene.add( globalCentre );   

        mClassroom = new THREE.Mesh( geom, mat );
        mClassroom.scale.set(12,12,12);

        // classroom is ate weird height and angle to the avatar. Avatar contains many pieces and so it is easier to change positiona and rotation of the space
        mClassroom.position.set(-40,-40,10)
        mClassroom.rotation.y += 1.2;

        scene.add( mClassroom );

        loader.load( body, addBody );

    }

    function addBody( geom, mat ) {

        // load the materials for the hair and hair-tie. Only need 2 materials but JSON has all.
        mat[0].skinning = true;
        mat[1].skinning = true;
        mat[0].morphtargets = true;
        mat[1].morphtargets = true;

        tiaObject.mBody = new THREE.SkinnedMesh( geom, mat );
        
        // iterate over the bones in the JSON file and put them into the global bodyBones object. Call bones with bodyBones["<bone name>"] 
        for (var i=0; i<tiaObject.mBody.skeleton.bones.length; i++) {
            
            tiaObject.bodyBones[tiaObject.mBody.skeleton.bones[i].name] = tiaObject.mBody.skeleton.bones[i];

        }

        tiaObject.mBody.position.set( 0, -18.5, 7.2 );
        // finish to callback to add next object
        loader.load( face, addFace );


    }

    function addFace( geom, mat ) {

        // load the materials for the skin, lips and eyebrows
        mat[0].skinning = true;
        mat[1].skinning = true;
        mat[2].skinning = true;
        mat[0].morphtargets = true;
        mat[1].morphtargets = true;
        mat[2].morphtargets = true;

        tiaObject.mFace = new THREE.SkinnedMesh( geom, mat );


        // SKELETON HELPER \\
        
        if ( skeleton ) {
            
            faceSkeletonHelper = new THREE.SkeletonHelper( tiaObject.mFace )
            scene.add( faceSkeletonHelper );

        };

        // iterate over the bones in the JSON file and put them into the global faceBones object. Call bones with faceBones["<bone name>"] 
        for (var i=0; i<tiaObject.mFace.skeleton.bones.length; i++) {
            
            tiaObject.faceBones[tiaObject.mFace.skeleton.bones[i].name] = tiaObject.mFace.skeleton.bones[i];

        }
        
        tiaObject.mFace.position.set( 0, 18.9, 1.7 );
        tiaObject.mFace.rotation.set( 0.05, 0, 0 );
        tiaObject.bodyBones.spineUpperInner.add( tiaObject.mFace );
        // finish to callback to next add object
        loader.load( mouth, addMouth );

    }

    function addMouth( geom, mat ) {

        // load the materials for the skin, lips and eyebrows
        mat[0].skinning = true;
        mat[1].skinning = true;
        mat[0].morphtargets = true;
        mat[1].morphtargets = true;

        mouthObject.mMouth = new THREE.SkinnedMesh( geom, mat );

        // iterate over the bones in the JSON file and put them into the global faceBones object. Call bones with faceBones["<bone name>"] 
        for (var i=0; i<mouthObject.mMouth.skeleton.bones.length; i++) {
            
            mouthObject.mouthBones[mouthObject.mMouth.skeleton.bones[i].name] = mouthObject.mMouth.skeleton.bones[i];

        }

        mouthObject.mMouth.position.set( 0, 5.53, 1.93 );

        tiaObject.faceBones.head.add( mouthObject.mMouth );

        // finish to callback to next add object
        loader.load( eye, addEyes );

    }

    function addEyes( geom, mat ) {

        // load the materials for the eyeball, iris and pupil
        mat[0].skinning = true;
        mat[0].morphtargets = true;
        //mat[0].color.setHex( 0xfcfae0 );

        // mEyeL is a clone of mEyeR
        tiaObject.mEyeL = new THREE.SkinnedMesh( geom, mat );
        tiaObject.mEyeR = tiaObject.mEyeL.clone();
        
        // make headbone the parent so eyes move with it
        tiaObject.faceBones.head.add( tiaObject.mEyeL );
        tiaObject.faceBones.head.add( tiaObject.mEyeR );

        // manually set position
        tiaObject.mEyeL.position.set( 0.02, 5.6, 1.92 );
        tiaObject.mEyeR.position.set( -3.08, 5.6, 1.92 );

        // attach bones to global variables
        tiaObject.eyeBones.eyeL = tiaObject.mEyeL.skeleton.bones[0];
        tiaObject.eyeBones.eyeR = tiaObject.mEyeR.skeleton.bones[0];

        // rotate inwards so not staring inifinitely into distance
        tiaObject.eyeBones.eyeL.rotation.y = -TIA_EYES_NON_PARALLEL_OFFSET;
        tiaObject.eyeBones.eyeR.rotation.y = TIA_EYES_NON_PARALLEL_OFFSET;
    
        // finish to callback to add next object
        loader.load( hair, addHair );

    }

    function addHair( geom, mat ) {

        // load the materials for the hair and hair-tie. Only need 2 materials but JSON has all.
        mat[0].skinning = true;
        mat[1].skinning = true;
        mat[0].morphtargets = true;
        mat[1].morphtargets = true;

        tiaObject.mHair = new THREE.SkinnedMesh( geom, mat );


        // SKELETON HELPER \\
        
        if ( skeleton ) {
        
            hairSkeletonHelper = new THREE.SkeletonHelper( tiaObject.mHair );
            scene.add( hairSkeletonHelper );

        };
        // iterate over the bones in the JSON file and put them into the global hairBones object. Call bones with hairBones["<bone name>"] 
        for (var i=0; i<tiaObject.mHair.skeleton.bones.length; i++) {
            
            tiaObject.hairBones[ tiaObject.mHair.skeleton.bones[i].name ] = tiaObject.mHair.skeleton.bones[i];

        }
        
        // need to manually assign position again
        tiaObject.mHair.position.set( 0, 5.6, 1.9 );
        
        // again, parent to headbone
        tiaObject.faceBones.head.add( tiaObject.mHair );

        addHeadBodyToScene();
    }
        
    function addHeadBodyToScene() {

        //scene.add( tiaObject.mFace );
        scene.add( tiaObject.mBody );

        loadText();

    }

    function loadText() {

        loadAlphabetNBackgrounds();

        cameraAndTiaLookAt();

    }

    function loadAlphabetNBackgrounds() {

        let alphabet = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,.-_:?/#~()*&^%$@!£[<`||>]{}=+\\;\'\"\n\t'.split('');
        let alphabetSet = new Set(alphabet);

        let fontloader = new THREE.FontLoader();
        
        fontloader.load( board_font, function( font ) {
            
            let textGeom;

            for ( l=0; l<alphabet.length; l++ ) {
                
                textGeom = new THREE.TextGeometry( alphabet[l], {

                    font: font,
                    size: 1.8,
                    height: 0.0,
                    curveSegments: 1,

                });

                let materials = [
                    new THREE.MeshLambertMaterial( { color: 0xff0000, transparent:true, opacity: 0 } ),
                ];

                sentenceObject.alphabetDict[alphabet[l]] = new THREE.Mesh( textGeom, materials )
                //scene.add( sentenceObject.alphabetDict[alphabet[l]] );

            };

            //parseText( sentenceObject, true, 0x2d2d2d );
            //addCloneLettersToTextBackground( sentenceObject, lineY );
        });

        //////////////////////    FONT BACKGROUND
       
        let fontBackgroundGeom = new THREE.PlaneGeometry( sentBackLenX, sentBackLenY );
        let fontBackgroundMat = new THREE.MeshBasicMaterial( { color: 0x0000ff, transparent: true, opacity: 0 } );
        sentenceObject.background = new THREE.Mesh(fontBackgroundGeom, fontBackgroundMat);
        sentenceObject.background.position.set( sentBackVisiblePOSX, sentBackPOSY, sentBackPOSZ );
        sentenceObject.background.rotation.set( 0, sentBackRotY, 0 );
        scene.add( sentenceObject.background );

        //////////////////////    WRONG HIGHLIGHTS
       
        let highlightBackgroundGeom = new THREE.PlaneGeometry( charX, charY );
        let highlightBackgroundMat = new THREE.MeshBasicMaterial( { color: 0xffc4c4 } );
        correctionObject.highlight = new THREE.Mesh(highlightBackgroundGeom, highlightBackgroundMat);
        scene.add( correctionObject.highlight );


        /////////////////////    CORRECTION BACKGROUND
        
        let correctionBackgroundGeom = new THREE.PlaneGeometry( sentBackLenX, sentBackLenY );
        let correctionBackgroundMat = new THREE.MeshLambertMaterial( { /*color: 0x007f00,*/ transparent: true, opacity: 0 } );
        correctionObject.correctionBackground = new THREE.Mesh(correctionBackgroundGeom, correctionBackgroundMat);
        correctionObject.correctionBackground.position.set( sentBackVisiblePOSX, correctionBackPOSY, sentBackPOSZ );
        correctionObject.correctionBackground.rotation.set( 0, sentBackRotY, 0 );
        scene.add( correctionObject.correctionBackground );

        /////////////////////    SPEECH BUBBLE BACKGROUND
        
        loader.load( speechBubble, addSpeechBubble );

        function addSpeechBubble( geom, mat ) {

            mat[0].transparent = true;
            mat[0].opacity = 0;
            mat[1].transparent = true;
            mat[1].opacity = 0;
            speechBubbleObject.bubble = new THREE.Mesh( geom, mat );
            speechBubbleObject.bubble.scale.set(17,15,1);

            let backgroundGeom = new THREE.PlaneGeometry( speechBubbleBackLenX, speechBubbleBackLenY );
            let backgroundMat = new THREE.MeshBasicMaterial( { color: 0x000000, transparent: true, opacity: 0 } );
            speechBubbleObject.background = new THREE.Mesh( backgroundGeom, backgroundMat );

            speechBubbleObject.background.position.set(speechBubbleBackPOSX, speechBubbleBackPOSY, speechBubbleBackPOSZ )
            speechBubbleObject.background.rotation.y += speechBubbleBackRotY;

            speechBubbleObject.background.scale.set( 0.28, 0.32, 1 );
            speechBubbleObject.bubble.material[0].opacity = 0.95; 
            speechBubbleObject.bubble.material[1].opacity = 0.95; 

            
            speechBubbleObject.background.add( speechBubbleObject.bubble );
            speechBubbleObject.bubble.position.set( 1.5, 0, -0.3);

        }

    };

    function cameraAndTiaLookAt() {

        //addGUI( 'face' );

        $.when(createRelativeExpression( neutralExpression )).then(initExpression( relativeExpression, '0.1' ));
        //if first enter then run entrance animation else sitting at chair
        if ( classVariableDict.first_enter ) {
            
            $.when(createRelativeMovement( laptopMovement )).then( initMovement( relativeMovement, '0.1', '0.1' ));

            initMainEnter();

            camera.position.set( 
                    CAMERA_ENTER_POSITION_X, 
                    CAMERA_ENTER_POSITION_Y, 
                    CAMERA_ENTER_POSITION_Z 
                );
            camera.rotation.x = CAMERA_ENTER_ROTATION_X;
            camera.rotation.y = CAMERA_ENTER_ROTATION_Y;

        } else {

            camera.position.set( 
                    CAMERA_POSITION_X, 
                    CAMERA_POSITION_Y, 
                    CAMERA_POSITION_Z 
                );
            camera.rotation.x = CAMERA_ROTATION_TIA_X;
            camera.rotation.y = CAMERA_ROTATION_TIA_Y;
            
            // camera looking at place in main.js - should be laptop
            cameraLookingAt( 'laptop' );

            createRelativeMovement( studentMovement );
            createRelativeExpression( neutralExpression )
            initMovement( relativeMovement, '0.1', '0.1' );
            



            // change these while making facial expressions
            //initSmile('0.5', '0.1', smileClosedObject);
            normalBlinkObject.bool = true;

            setTimeout( function() {
                
                initInputReady();

            }, 1000 );

        }

        setTimeout( function() {
            
            $("#foreground").fadeOut( 1500 );
        
        }, 1000 );

        animate();

    }


    function cameraLookingAt( cameraFocus ) {

        /**

            Directs student's head toward focus of attention.
            Arguments indicate place where looking.

            Called from loadObjects.js

        **/

        if ( cameraFocus === "tia" ) {

            camera.rotation.x = CAMERA_ROTATION_TIA_X;
            camera.rotation.y = CAMERA_ROTATION_TIA_Y;

            cameraCurrentlyLookingAt = "tia";
            cameraObject.currentState = "tia";

        } else if ( cameraFocus === "laptop" ) {

            camera.rotation.x = CAMERA_ROTATION_LAPTOP_X;
            camera.rotation.y = CAMERA_ROTATION_LAPTOP_Y;

            cameraCurrentlyLookingAt = "laptop";
            cameraObject.currentState = "laptop";

        } else if ( cameraFocus === "board" ) {

            camera.rotation.x = CAMERA_ROTATION_BOARD_X;
            camera.rotation.y = CAMERA_ROTATION_BOARD_Y;

            cameraCurrentlyLookingAt = "board";
            cameraObject.currentState = "board";

        }

    }

}

   

function animate () {

    if ( cameraObject[ 'bool' ] ) {

        rotateCamera( mainCount );

    }

    if ( enterCameraObject[ 'bool' ] ) {

        enterCameraMove( mainCount );

    }

    if ( tiaObject[ 'bool' ] ) {

        rotateTia( mainCount );

    }

    if ( expressionObject.bool ) {

        expression( mainCount );

    }

    if ( movementObject.bool ) {

        movement( mainCount );

    }

    if ( eyelidObject.bool ) {

        moveEyelids( mainCount );

    }

    if ( eyebrowObject[ 'bool' ] ) {

        moveEyebrow( mainCount );

    }

    if ( eyeObject[ 'bool' ] ) {

        moveEyes( mainCount );

    }

    if ( nodObject.bool ) {

        nod( mainCount )

    }

    if ( shakeObject.bool ) {

        shake( mainCount )

    }

    if ( leanObject.bool ) {

        lean( mainCount )

    }

    if ( armIndicateObject.bool ) {

        armIndicate( mainCount );

    }

    // Full movements

    if ( mainEnterObject.bool ) {

        mainEnter();

    }

    //if ( backNReadALineObject.bool ) {

        //backNReadALine();

    //}

    // CONTINUOUS AND RANDOM MOVEMENTS
    

    // normal breathing
    let breatheRemaining = mainCount % secsOneBreath;

    // change breathing direction
    if ( breatheRemaining === 0 ) {

        breatheObject.direction *= -1;

    }

    breathe( breatheRemaining )

    
    //normal blinking
    
    if ( normalBlinkObject.bool ) {

        let untilNextBlink = normalBlinkObject.nextBlinkCount - mainCount;

        if ( untilNextBlink <= 0 ) {

            blinkNowObject.bool = true;
            normalBlinkObject.bool = false;
            normalBlinkObject.nextBlinkCount = mainCount + Math.floor( 200 + Math.random() * 240 );

            //call the show time remaining to reload it and keep it up to pace
            showTimeRemaining();
        }

    }

    if ( blinkNowObject.bool ) {

        if ( blinkNowObject.countdown === 7 ) {
            
            eyelidObject.coords.beforeBlinkUpper = eyelidObject.coords.currentUpper;
            eyelidObject.coords.beforeBlinkLower = eyelidObject.coords.currentLower;
            initMoveEyelids( -1, 1, '0.1', false); 
            blinkNowObject.countdown -= 1;

        } else if ( blinkNowObject.countdown === 0 ) {

            initMoveEyelids( eyelidObject.coords.beforeBlinkUpper, eyelidObject.coords.beforeBlinkLower, '0.1', false); 
            blinkNowObject.countdown -= 1;

        } else if ( blinkNowObject.countdown <= -7 ) {

            blinkNowObject.bool = false;
            blinkNowObject.countdown = 8;
            normalBlinkObject.bool = true;

        } else {

            blinkNowObject.countdown -= 1;

        }

    }

    // Random tilt spine and neck
    let randomTiltSpineRemaining = mainCount - spineRandomTiltObject.startCount;

    if ( randomTiltSpineRemaining === spineRandomTiltObject.sinLength ) {
        
        newTilt( spineRandomTiltObject );

    } else {
        
        randomTiltSpine( randomTiltSpineRemaining )

    }
    
    let randomTiltNeckRemaining = mainCount - neckRandomTiltObject.startCount;

    if ( randomTiltNeckRemaining === neckRandomTiltObject.sinLength ) {
        
        newTilt( neckRandomTiltObject );

    } else {
        
        randomTiltNeck( randomTiltNeckRemaining )

    }



    mainCount += 1;

    requestAnimationFrame( animate );
    
    renderer.render(scene, camera);

};

function newTilt( boneObject ) {

    boneObject.startCount = mainCount;

    if ( boneObject.to ) {

        boneObject.direction *= -1;
        boneObject.to = false;
    

    } else {
        
        let newSinAmount = SINEARRAYFORBREATHESECONDS[ Math.floor( Math.random() *  SINEARRAYFORBREATHESECONDS.length ) ];
        boneObject.sin = sineArrays[ newSinAmount.toString() ];
        boneObject.sinLength = boneObject.sin.length;
        boneObject.direction *= Math.random() < 0.5 ? -1 : 1;
        if ( boneObject === neckRandomTiltObject ) {
         
            boneObject.mult =  2 * Math.random();

        } else {

            boneObject.mult = Math.random();
        
        }

        boneObject.to = true;

    }

}

    










