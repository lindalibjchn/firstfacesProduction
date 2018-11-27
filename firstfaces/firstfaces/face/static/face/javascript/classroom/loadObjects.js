//////////////// LOAD SCENE AND OBJECTS \\\\\\\\\\\\\\\\\\\\\

var scene, renderer, camera;
var pointLight, ambientLight;
var loader, fontloader;

// this count increases by 1 after each frame refresh. 60 per second.
var mainCount = 0;


//// FUNCTIONS TO BE CALLED IN INIT() \\\\

// start random movements and calculate stuff after bodyparts loaded
function engineRunning() {

    setBaseExpressionsMovements(); // do this after all of Tia is loaded
    animate();
    blinkControllerObject.bool = true;
    initCameraMove('laptop', 0.1);
    expressionController( expressionObject.abs.neutral, 0.1 );

    setTimeout( function() {
        
        $("#foreground").fadeOut( 1500 );
    
    }, 500 );

}

function dealWithResizing() {

    window.addEventListener('resize', function() {
        
        WIDTH = window.innerWidth;
        HEIGHT = window.innerHeight - 22;
        renderer.setSize( WIDTH, HEIGHT );
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();

    });

}

function renderScene() {

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( WIDTH, HEIGHT );
    renderer.setClearColor(0x7ec0ee, 0.5);
    document.body.appendChild( renderer.domElement );

}

function addCamera() {

    camera = new THREE.PerspectiveCamera( 55, WIDTH / HEIGHT, 0.1, 1000 );
    scene.add( camera );

}

function addClassroom( geom, mat ) {

    mClassroom = new THREE.Mesh( geom, mat );
    mClassroom.scale.set(12,12,12);

    // classroom is at weird height and angle to the avatar. Avatar contains many pieces and so it is easier to change positiona and rotation of the space
    mClassroom.position.set(-40,-40,10)
    mClassroom.rotation.y += 1.2;

    scene.add( mClassroom );


}

function addLights() {

    pointLight = new THREE.PointLight( 0xe0fffa, 0.55, 0 );
    pointLight.position.set( POINTLIGHT_POS.x,  POINTLIGHT_POS.y, POINTLIGHT_POS.z );
    scene.add( pointLight );

    ambientLight = new THREE.AmbientLight( 0xffffff, 0.9 );
    scene.add( ambientLight )

}

function addTia() {

    function addBody( geom, mat ) {

        //// load the materials for the skin and jumper. Only need 2 materials but JSON has all.
        mat[0].skinning = true;
        mat[1].skinning = true;
        mat[0].morphtargets = true;
        mat[1].morphtargets = true;

        tiaObject.mBody = new THREE.SkinnedMesh( geom, mat );
        
        // iterate over the bones in the JSON file and put them into the global bodyBones object. Call bones with bodyBones["<bone name>"] 
        for (var i=0; i<tiaObject.mBody.skeleton.bones.length; i++) {
            
            tiaObject.bodyBones[tiaObject.mBody.skeleton.bones[i].name] = tiaObject.mBody.skeleton.bones[i];

        }

        tiaObject.mBody.position.set( BODY_POS.x, BODY_POS.y, BODY_POS.z );

        loader.load( face, addFace) 
    
    }

    function addFace( geom, mat ) {

        console.log(' in addface ');
        // load the materials for the skin, lips and eyebrows
        mat[0].skinning = true;
        mat[1].skinning = true;
        mat[2].skinning = true;
        mat[0].morphtargets = true;
        mat[1].morphtargets = true;
        mat[2].morphtargets = true;

        let mFace = new THREE.SkinnedMesh( geom, mat );

        // iterate over the bones in the JSON file and put them into the global faceBones object. Call bones with faceBones["<bone name>"] 
        for (var i=0; i<mFace.skeleton.bones.length; i++) {
            
            tiaObject.faceBones[mFace.skeleton.bones[i].name] = mFace.skeleton.bones[i];

        }
        
        mFace.position.set( FACE_POS.x, FACE_POS.y, FACE_POS.z );
        mFace.rotation.set( FACE_ROT.x, FACE_ROT.y, FACE_ROT.z );        
        tiaObject.bodyBones.spineUpperInner.add( mFace );

        loader.load( mouth, addMouth ) 
    
    }

    function addMouth( geom, mat ) {

        console.log(' in addMouth ');
        // load the materials for the skin, lips and eyebrows
        mat[0].skinning = true;
        mat[1].skinning = true;
        mat[0].morphtargets = true;
        mat[1].morphtargets = true;

        tiaObject.mMouth = new THREE.SkinnedMesh( geom, mat );

        // iterate over the bones in the JSON file and put them into the global faceBones object. Call bones with faceBones["<bone name>"] 
        for (var i=0; i<tiaObject.mMouth.skeleton.bones.length; i++) {
            
            tiaObject.mouthBones[tiaObject.mMouth.skeleton.bones[i].name] = tiaObject.mMouth.skeleton.bones[i];

        }

        tiaObject.mMouth.position.set( MOUTH_ROT.x, MOUTH_ROT.y, MOUTH_ROT.z );

        tiaObject.faceBones.head.add( tiaObject.mMouth );

        loader.load( eye, addEyes)

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
        tiaObject.mEyeL.position.set( EYEL_POS.x, EYEL_POS.y, EYEL_POS.z );
        tiaObject.mEyeR.position.set( EYER_POS.x, EYER_POS.y, EYER_POS.z  );

        // attach bones to global variables
        tiaObject.eyeBones.eyeL = tiaObject.mEyeL.skeleton.bones[0];
        tiaObject.eyeBones.eyeR = tiaObject.mEyeR.skeleton.bones[0];

        // rotate inwards so not staring inifinitely into distance
        tiaObject.eyeBones.eyeL.rotation.set( EYEL_ROT.x, EYEL_ROT.y, EYEL_ROT.z );
        tiaObject.eyeBones.eyeR.rotation.set( EYER_ROT.x, EYER_ROT.y, EYER_ROT.z );

        loader.load( hair, addHair)
    
    }

    function addHair( geom, mat ) {

        tiaObject.mHair = new THREE.Mesh( geom, mat );

        // need to manually assign position again
        tiaObject.mHair.position.set( -0.1, 5.5, 1.9 );
        
        // again, parent to headbone
        tiaObject.faceBones.head.add( tiaObject.mHair );

        engineRunning();

        scene.add( tiaObject.mBody );
    }
        
    loader.load( body, addBody);    

}

function loadAllTextElements() {

    function loadAlphabet() {

        //// define all characters in the alphabet in a list - ['a', 'b', 'c',... ,'\t']
        let alphabet = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,.-_:?/#~()*&^%$@!£[<`||>]{}=+\\;\'\"\n\t'.split('');

        fontloader = new THREE.FontLoader();
        
        //// load the board_font from the template
        fontloader.load( board_font, function( font ) {
            
            let textGeom;

            //// create a geom for every letter in the alphabet list
            for ( l=0; l<alphabet.length; l++ ) {
                
                textGeom = new THREE.TextGeometry( alphabet[l], {

                    font: font,
                    size: 1.8,
                    height: 0.0,
                    curveSegments: 1, // keep this low for less vertices

                });

                let materials = [
                    new THREE.MeshLambertMaterial( { color: 0xffffff, transparent:true, opacity: 0 } ),
                ];

                sentenceObject.alphabetDict[alphabet[l]] = new THREE.Mesh( textGeom, materials )

            };

        });

    }

    function loadSentenceBackground() {

        let backgroundGeom = new THREE.PlaneGeometry( sentBackLen.x, sentBackLen.y );
        let backgroundMat = new THREE.MeshBasicMaterial( { color: 0x0000ff, transparent: true, opacity: 0 } );
        sentenceObject.background = new THREE.Mesh(backgroundGeom, backgroundMat);
        sentenceObject.background.position.set( sentBackPOS.x, sentBackPOS.y, sentBackPOS.z );
        sentenceObject.background.rotation.set( sentBackROT.x, sentBackROT.y, sentBackROT.z );

    }

    function loadWrongHighlights() {
       
        let highlightBackgroundGeom = new THREE.PlaneGeometry( charX, charY );
        let highlightBackgroundMat = new THREE.MeshBasicMaterial( { color: 0xffc4c4 } );
        correctionObject.highlight = new THREE.Mesh(highlightBackgroundGeom, highlightBackgroundMat);

    }

    function loadCorrectionBackground() {
        
        let backgroundGeom = new THREE.PlaneGeometry( sentBackLen.x, sentBackLen.y );
        let backgroundMat = new THREE.MeshLambertMaterial( { transparent: true, opacity: 0 } );
        correctionObject.correctionBackground = new THREE.Mesh(backgroundGeom, backgroundMat);
        correctionObject.correctionBackground.position.set( sentBackPOS.x, correctionBackPOSY, sentBackPOS.z );//just y position changes for sentenceObject.background as the correction shifts lower
        correctionObject.correctionBackground.rotation.set( sentBackROT.x, sentBackROT.y, sentBackROT.z );

    }
        
    //function loadSpeechBubbles() {

        //function addSpeechBubbleTextBackground() {

            ////// this adds the background where the letters can be added
            //console.log('loading speech bubbles');

            //let backgroundGeom = new THREE.PlaneGeometry( speechBubbleBackLen.x, speechBubbleBackLen.y, speechBubbleBackLen.z );
            //let backgroundMat = new THREE.MeshBasicMaterial( { [>color: 0xffc4c4<] transparent: true, opacity: 0 } );
            
            //let background = new THREE.Mesh( backgroundGeom, backgroundMat );

            //background.scale.set( speechBubbleBackSCALE.x, speechBubbleBackSCALE.x, speechBubbleBackSCALE.x );
            
            //speechBubbleObject.background = background;

        //}

        //loader.load( speechBubble, addSpeechBubble1JSON );
        //loader.load( speechBubble2, addSpeechBubble2JSON );
        
        //function addSpeechBubble1JSON( geom, mat ) {

            ////// this adds the actual bubble from the JSON file

            //mat[0].transparent = true;
            //mat[0].opacity = 1;
            //mat[1].transparent = true;
            //mat[1].opacity = 1;

            //let bubble = new THREE.Mesh( geom, mat );
            //bubble.scale.set( speechBubbleSCALE.x, speechBubbleSCALE.y, speechBubbleSCALE.z );
            //bubble.position.y -= 4;
            //bubble.position.z -= 0.02;
        
            //speechBubbleObject.bubble = bubble;

        //}

        //function addSpeechBubble2JSON( geom, mat ) {

            ////// this adds the actual bubble from the JSON file

            //mat[0].transparent = true;
            //mat[0].opacity = 1;
            //mat[1].transparent = true;
            //mat[1].opacity = 1;

            //let bubble2 = new THREE.Mesh( geom, mat );
            //bubble2.scale.set( speechBubbleSCALE.x, speechBubbleSCALE.y, speechBubbleSCALE.z );
            //bubble2.position.y -= 4;
            //bubble2.position.z -= 0.02;

            //speechBubbleObject.bubble2 = bubble2;

        //}

        //addSpeechBubbleTextBackground();

    //}

    loadAlphabet();
    loadSentenceBackground();
    loadWrongHighlights();
    loadCorrectionBackground();
    //loadSpeechBubbles();

};

function setBaseExpressionsMovements() {

    expressionObject.base = getAbsoluteCoordsOfExpressionNow(); // get absolute position of base expression
    expressionObject.now = $.extend( true, {}, expressionObject.base ); // create a copy of this for expression now
    getAbsoluteCoordsOfMainExpressions(); // gets coordinates for all main expressions
    
    movementBase = getAbsoluteCoordsOfMovementNow(); // same as above for movements
    movementNow = $.extend( true, {}, movementBase );

}

function enterOrReEnter() {

    //// on first enter the camera starts at the door and entrance sequence is run
    function firstEnter() {

        //movementController( movements.laptop, '0.1', '0.1' );

        //initMainEnter();

        camera.position.set( CAMERA_ENTER_POS );
        camera.rotation.set( CAMERA_ENTER_ROT );

    }

    function reEnter( lookingAt ) {
 
        camera.position.set( CAMERA_SIT_POS.x, CAMERA_SIT_POS.y, CAMERA_SIT_POS.z );
        
        if ( lookingAt === "tia" ) {

            camera.rotation.set( CAMERA_SIT_TO_TIA_ROT.x, CAMERA_SIT_TO_TIA_ROT.y, CAMERA_SIT_TO_TIA_ROT.z );

        } else if ( lookingAt === "laptop" ) {

            camera.rotation.set( CAMERA_SIT_TO_LAPTOP_ROT.x, CAMERA_SIT_TO_LAPTOP_ROT.y, CAMERA_SIT_TO_LAPTOP_ROT.z );

        } else if ( lookingAt === "board" ) {

            camera.rotation.set( CAMERA_SIT_TO_BOARD_ROT.x, CAMERA_SIT_TO_BOARD_ROT.y, CAMERA_SIT_TO_BOARD_ROT.z );

        }

        talkObject.learning = true;
        initInputReady('');
        //movementController( movements.student, '0.1', '0.1' );

        // change these while making facial expressions
        //initSmile('0.5', '0.1', smileClosedObject);
        //setTimeout( function() {
            
            //whenAllMovFinished( function(){

                //expressionController( expressionObject.abs.neutral, '0.1', false );

            //})

            //if ( classVariableDict.classOver === false ) {
            
                //setTimeout( function() {
                    
                    //initInputReady('');
                    //normalBlinkObject.bool = true;

                //}, 1000)

            //}

        //}, 200 );

    };

    //if first enter then run entrance animation else sitting at chair
    if ( classVariableDict.first_enter ) {
        
        firstEnter();

    } else {

        reEnter();

    }

}


// load all the objects
function init() {
    
    //// SCENE \\\\
    
    scene = new THREE.Scene();
    

    //// WINDOW \\\\

    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight - 22;


    //// RENDERER \\\\

    renderScene();
    dealWithResizing();


    //// CAMERA \\\\

    addCamera();


    //// CAMERA CONTROLS \\\\

    controls = new THREE.OrbitControls( camera, renderer.domElement );


    //// LIGHTS \\\\

    addLights();


    //// CREATE JSON LOADER \\\\

    loader = new THREE.JSONLoader();
    
    
    //// LOAD JSON OBJECTS \\\\
    
    loader.load( classroom, addClassroom );
    addTia(); // contains all the loaders for head, body etc.
    loadAllTextElements(); // loads all text and backgrounds for text


    //// CALCULATE STUFF FOR SIDE PANEL \\\\
    
    showTimeRemaining();
    //showQuestionStreak();


    //// SET CAMERAS AND TIA UP DEPENDING ON ENTER OR REENTER \\\\

    enterOrReEnter();

}

   

