//////////////// LOAD SCENE AND OBJECTS \\\\\\\\\\\\\\\\\\\\\

var scene, renderer, camera;
var pointLight, ambientLight;
var loader, fontloader;

// this count increases by 1 after each frame refresh. 60 per second.
var mainCount = 0;


//// FUNCTIONS TO BE CALLED IN INIT() \\\\

function enterOrReEnter() {

    //// on first enter the camera starts at the door and entrance sequence is run
    function firstEnter() {

        initMainEnter();

        camera.position.set( CAMERA_ENTER_POS.x, CAMERA_ENTER_POS.y, CAMERA_ENTER_POS.z  );
        camera.rotation.set( CAMERA_ENTER_ROT.x, CAMERA_ENTER_ROT.y, CAMERA_ENTER_ROT.z,);
        movementController( movements.laptop, 0.1, 0.1 );

    }

    function reEnter() {
 
        camera.position.set( CAMERA_SIT_POS.x, CAMERA_SIT_POS.y, CAMERA_SIT_POS.z );
        //camera.rotation.set( CAMERA_SIT_TO_BOARD_ROT.x, CAMERA_SIT_TO_BOARD_ROT.y, CAMERA_SIT_TO_BOARD_ROT.z );
        camera.rotation.set( CAMERA_SIT_TO_LAPTOP_ROT.x, CAMERA_SIT_TO_LAPTOP_ROT.y, CAMERA_SIT_TO_LAPTOP_ROT.z );
        cameraObject.currentState = "laptop";

        talkObject.learning = true;
        //initCameraMove('laptop', 0.1);
        initInputReady('');

    };

    //if first enter then run entrance animation else sitting at chair
    if ( classVariableDict.first_enter ) {
        
        firstEnter();

    } else {

        reEnter();

    }

}

// start random movements and calculate stuff after bodyparts loaded
function engineRunning() {

    setBaseExpressionsMovements(); // do this after all of Tia is loaded
    animate();
    blinkControllerObject.bool = true;
    expressionController( expressionObject.abs.neutral, 0.1 );
    enterOrReEnter();
    if ( classVariableDict.tutorial === false ) {

        showTimeRemaining();
        //showQuestionStreak();

    }


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
        
        let randColor00 = Math.floor( 44 + Math.random() * 55).toString()
        let randColor01 = Math.floor( 44 + Math.random() * 55).toString()
        let randColor02 = Math.floor( 44 + Math.random() * 55).toString()

        let hexCol = "0x" + randColor00 + randColor01 + randColor02;

        mat[0].color.setHex( hexCol );

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

        //function componentToHex(c) {
            //var hex = c.toString(16);
            //return hex.length == 1 ? "0" + hex : hex;
        //}

        //function rgbToHex(r, g, b) {
            //return "0x" + componentToHex(r) + componentToHex(g) + componentToHex(b);
        //}

        //function randLipstickRGBGenerator() {
            //let randRed = 200 + Math.floor( Math.random() * 55 );
            //let randGreen = 90 + Math.floor( Math.random() * 100 );
            //let randBlue = 100 + Math.floor( Math.random() * 70 );

            //return [ randRed, randGreen, randBlue ]
        //}

        //let randLipstickRGB = randLipstickRGBGenerator();
        //console.log( 'randLipstickRGB:', randLipstickRGB );

        //let randLipstickHex = rgbToHex( randLipstickRGB[0], randLipstickRGB[1], randLipstickRGB[2] );

        //mat[1].color.setHex( randLipstickHex );
        //console.log( 'randLipstickHex:', randLipstickHex );

        tiaObject.mFace = new THREE.SkinnedMesh( geom, mat );

        // iterate over the bones in the JSON file and put them into the global faceBones object. Call bones with faceBones["<bone name>"] 
        for (var i=0; i<tiaObject.mFace.skeleton.bones.length; i++) {
            
            tiaObject.faceBones[tiaObject.mFace.skeleton.bones[i].name] = tiaObject.mFace.skeleton.bones[i];

        }
        
        tiaObject.mFace.position.set( FACE_POS.x, FACE_POS.y, FACE_POS.z );
        tiaObject.mFace.rotation.set( FACE_ROT.x, FACE_ROT.y, FACE_ROT.z );        
        tiaObject.bodyBones.spineUpperInner.add( tiaObject.mFace );

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

        loader.load( hair00, addHair)
    
    }

    function addHair( geom, mat ) {

        tiaObject.mHair = new THREE.Mesh( geom, mat );

        // need to manually assign position again
        tiaObject.mHair.position.set( -0.1, 5.5, 1.9 );
        
        // again, parent to headbone
        tiaObject.faceBones.head.add( tiaObject.mHair );

        //// SET CAMERAS AND TIA UP DEPENDING ON ENTER OR REENTER \\\\

        scene.add( tiaObject.mBody );

        engineRunning();

    }
        
    let randBody = [ body, body00, body01, body02, body03 ][ Math.floor( Math.random() * 5 ) ]
    loader.load( randBody, addBody);    

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
                    size: 1.7,
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
        
    loadAlphabet();
    loadSentenceBackground();
    loadWrongHighlights();
    loadCorrectionBackground();

};

function setBaseExpressionsMovements() {

    expressionObject.base = getAbsoluteCoordsOfExpressionNow(); // get absolute position of base expression
    expressionObject.now = $.extend( true, {}, expressionObject.base ); // create a copy of this for expression now
    getAbsoluteCoordsOfMainExpressions(); // gets coordinates for all main expressions
    
    movementBase = getAbsoluteCoordsOfMovementNow(); // same as above for movements
    movementNow = $.extend( true, {}, movementBase );

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

    //controls = new THREE.OrbitControls( camera, renderer.domElement );


    //// LIGHTS \\\\

    addLights();


    //// CREATE JSON LOADER \\\\

    loader = new THREE.JSONLoader();
    
    
    //// LOAD JSON OBJECTS \\\\
    
    loader.load( classroom, addClassroom );
    addTia(); // contains all the loaders for head, body etc.
    loadAllTextElements(); // loads all text and backgrounds for text



}

   

