function renderScene() {

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( WIDTH, HEIGHT );
    renderer.setClearColor(0x00ffff, 0.5);
    document.body.appendChild( renderer.domElement );

}

function dealWithResizing() {

    window.addEventListener('resize', function() {
        
        WIDTH = window.innerWidth;
        HEIGHT = window.innerHeight;
        renderer.setSize( WIDTH, HEIGHT );
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();

    });

}

function addCamera() {

    camera = new THREE.PerspectiveCamera( 55, WIDTH / HEIGHT, 0.1, 1000 );
    scene.add( camera );

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

        // load the materials for the skin and jumper. Only need 2 materials but JSON has all.
        mat[0].skinning = true;
        mat[1].skinning = true;
        mat[0].morphtargets = true;
        mat[1].morphtargets = true;

        tiaObject.mBody = new THREE.SkinnedMesh( geom, mat );
       
        let randTwoNumberString = randStrIntChangeEveryDay + randStrIntChangeEveryTenDays
        let tiaClothesColour = "0x" + randTwoNumberString + randTwoNumberString + randTwoNumberString;
        mat[0].color.setHex( tiaClothesColour );

        // iterate over the bones in the JSON file and put them into the global bodyBones object. Call bones with bodyBones["<bone name>"] 
        for (var i=0; i<tiaObject.mBody.skeleton.bones.length; i++) {
            
            tiaObject.bodyBones[tiaObject.mBody.skeleton.bones[i].name] = tiaObject.mBody.skeleton.bones[i];

        }

        tiaObject.mBody.position.set( BODY_POS.x, BODY_POS.y, BODY_POS.z );

        loader.load( face, addFace) 
    
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
    
    // for change in clothes and color
    function getTwoRandomIntsBasedOnDate() {

        let n = Math.floor(new Date()/8.64e7).toString()
        let changeEveryDay = n[n.length-1]
        let changeEveryTenDays = n[n.length-2]

        return [ changeEveryDay, changeEveryTenDays ];

    }

    let randStrInts = getTwoRandomIntsBasedOnDate();
    let randStrIntChangeEveryDay = randStrInts[ 0 ];
    let randStrIntChangeEveryTenDays = randStrInts[ 1 ];
    
    let randBody = [ body, body00, body01, body02, body03, body, body00, body01, body02, body03][ parseInt( randStrIntChangeEveryDay ) ];
    
    loader.load( randBody, addBody );    

}

function enterOrReEnter() {

    tiaMediaLoc = "media/prePreparedTiaPhrases/";

    //load this early and change .src later
    synthesisObject.synthAudio = document.getElementById( 'synthClip' );
    //// on first enter the camera starts at the door and entrance sequence is run
    function firstEnter() {

        initMainEnter();

        camera.position.set( CAMERA_SIT_POS.x, CAMERA_SIT_POS.y, CAMERA_SIT_POS.z  );
        camera.rotation.set( CAMERA_SIT_TO_LAPTOP_ROT.x, CAMERA_SIT_TO_LAPTOP_ROT.y, CAMERA_SIT_TO_LAPTOP_ROT.z,);
        //movementController( movementObject.rel.blank, 0.1, 0.1 );
        //movementController( movementObject.rel.laptop, 0.1, 0.1 );

    }

    function reEnter() {
 
        camera.position.set( CAMERA_SIT_POS.x, CAMERA_SIT_POS.y, CAMERA_SIT_POS.z );
        //camera.rotation.set( CAMERA_SIT_TO_BOARD_ROT.x, CAMERA_SIT_TO_BOARD_ROT.y, CAMERA_SIT_TO_BOARD_ROT.z );
        camera.rotation.set( CAMERA_SIT_TO_LAPTOP_ROT.x, CAMERA_SIT_TO_LAPTOP_ROT.y, CAMERA_SIT_TO_LAPTOP_ROT.z );
        cameraObject.currentState = "laptop";

        talkObject.learning = true;
        //initCameraMove('laptop', 0.1);
        initInputReady();

    };

    //if first enter then run entrance animation else sitting at chair
    if ( conversationVariables.first_enter ) {
        
        firstEnter();

    } else {

        reEnter();

    }

}

// start random movementObject.rel and calculate stuff after bodyparts loaded
function engineRunning() {

    setBaseExpressionsMovements(); // do this after all of Tia is loaded
    animate();
    blinkControllerObject.bool = true;
    //expressionController( expressionObject.abs.neutral, 0.01 );
    //movementController( movementObject.rel.blank, 0.01, 0.01)
    enterOrReEnter();

    setTimeout( function() {
        
        $("#foregroundContainer").fadeOut( 1500 );
    
    }, 500 );

}

function setBaseExpressionsMovements() {

    expressionObject.base = getAbsoluteCoordsOfExpressionNow(); // get absolute position of base expression
    expressionObject.now = $.extend( true, {}, expressionObject.base ); // create a copy of this for expression now
    getAbsoluteCoordsOfMainExpressions(); // gets coordinates for all main expressions
    
    movementObject.base = getAbsoluteCoordsOfMovementNow(); // same as above for movementObject.rel
    movementObject.now = $.extend( true, {}, movementObject.base );

    getAbsoluteCoordsOfMainMovements(); // gets coordinates for all main expressions

}

function init() {
    
    scene = new THREE.Scene();

    // WINDOW
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    // RENDERER
    renderScene();
    dealWithResizing();

    // CAMERA
    addCamera();

    //// CAMERA CONTROLS
    controls = new THREE.OrbitControls( camera, renderer.domElement );

    // LIGHTS
    addLights();

    // CREATE JSON LOADER
    loader = new THREE.JSONLoader();
    
    // LOAD JSON OBJECTS FOR TIA
    addTia();

}

   

