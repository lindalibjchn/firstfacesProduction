//////// LOAD SCENE AND OBJECTS \\\\\\\\


// VARIABLES

var scene, camera, renderer, light;
var mainCount = 0;

function init() {

    
    // MESH VARIABLES \\
    
    //var mBuilding;
    
    // SCENE \\
    
    scene = new THREE.Scene();
    
    
    // WINDOW \\

    let WIDTH = window.innerWidth;
    let HEIGHT = window.innerHeight;

    window.addEventListener('resize', function() {
        
        WIDTH = window.innerWidth;
        HEIGHT = window.innerHeight;
        renderer.setSize( WIDTH, HEIGHT );
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();

    });

    // RENDERER \\

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( WIDTH, HEIGHT );
    renderer.setClearColor(0x87ceeb, 1.0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild( renderer.domElement );

    renderer.domElement.addEventListener("click", onClick, false)
    renderer.domElement.addEventListener("mousemove", onMouseMove, false)

    // CAMERA \\

    camera = new THREE.PerspectiveCamera( 60, WIDTH / HEIGHT, 0.1, 1000 );
    camera.position.set( enterPosX, enterPosY, enterPosZ);
    camera.rotation.set( enterRotX, enterRotY, enterRotZ);
    //camera.position.set( deskPosX, deskPosY, deskPosZ);
    //camera.rotation.set( deskRotX, deskRotY, deskRotZ);
    camera.up = new THREE.Vector3( 0, 1, 0 );
    //camera.lookAt( new THREE.Vector3( -1.5, 3.5, 0 ));
    scene.add( camera );

    //controls = new THREE.OrbitControls( camera, renderer.domElement );


    // LIGHTS \\

    var pointLight = new THREE.PointLight( 0xe0fffa, 0.4 );
    pointLight.position.set( -4, 9, 1 );
    //scene.add( pointLight );

    var pointLight1 = new THREE.PointLight( 0xe0fffa, 0.3);
    pointLight1.position.set( -14, 9, 5 );
    scene.add( pointLight1 );

    var pointLight2 = new THREE.PointLight( 0xe0fffa, 0.3);
    pointLight2.position.set( 4, 9, 1 );
    scene.add( pointLight2 );

    var ambientLight = new THREE.AmbientLight( 0xffffff, 0.2 );
    //scene.add( ambientLight )

    var hemiLight = new THREE.HemisphereLight( 0xf9f8ed, 0xf9f8ed, 1);
    scene.add( hemiLight );


    // LOAD OBJECTS \\

    var loader = new THREE.JSONLoader();
    loader.load( waitingRoom, addWaitingRoom );


    var mWaitingRoom;

    //function addWaitingRoom( geom, mat ) {

        //mWaitingRoom = new THREE.Mesh( geom, mat );

        //loader.load( sentencesBook, addSentencesBook );

    //};
    function addWaitingRoom( geom, mat ) {

        //door
        mat[6].skinning = true;
        mat[6].morphtargets = true;
        // notice
        mat[5].skinning = true;
        mat[4].morphtargets = true;
        // handle
        mat[7].skinning = true;
        mat[7].morphtargets = true;
        
        mWaitingRoom = new THREE.SkinnedMesh( geom, mat );

        doorBone = mWaitingRoom.skeleton.bones[0];

        loader.load( sentencesBook, addSentencesBook );

    };

    function addSentencesBook( geom, mat ) {

        var mSentencesBook = new THREE.Mesh( geom, mat );
        mSentencesBook.name = "sentences";

        clickableObjects.sentences = mSentencesBook;
        clickableObjects.sentences.currentState = "desk";
        clickableObjects.sentences.startCount = 0;
        clickableObjects.sentences.bool = false;
        clickableObjects.sentences.sin = [];
        clickableObjects.sentences.deskPos = { x: -1.49, y: 2.47, z: 1.83 };
        clickableObjects.sentences.facePos = { x: -0.6, y: 3.38, z: 3.5 };
        clickableObjects.sentences.faceRot = { x: 1.2, y: -0.27, z: -0.4 };

        mSentencesBook.position.set( clickableObjects.sentences.deskPos.x, clickableObjects.sentences.deskPos.y, clickableObjects.sentences.deskPos.z );
        //mSentencesBook.position.set( clickableObjects.sentences.facePos.x, clickableObjects.sentences.facePos.y, clickableObjects.sentences.facePos.z );
        //mSentencesBook.rotation.set( clickableObjects.sentences.faceRot.x, clickableObjects.sentences.faceRot.y, clickableObjects.sentences.faceRot.z );

        mWaitingRoom.add( mSentencesBook );
        geom.center();
        
        loader.load( testsBook, addTestsBook );

    };

    function addTestsBook( geom, mat ) {

        var mTestsBook = new THREE.Mesh( geom, mat );
        mTestsBook.name = "tests";
        clickableObjects.tests = mTestsBook;
        clickableObjects.tests.currentState = "desk";
        clickableObjects.tests.startCount = 0;
        clickableObjects.tests.bool = false;
        clickableObjects.tests.sin = [];
        clickableObjects.tests.deskPos = { x: -0.82, y: 2.6, z: 1.2 };
        clickableObjects.tests.facePos = { x: -0.6, y: 3.38, z: 3.5 };
        clickableObjects.tests.faceRot = { x: 1.3, y: 0.2, z: -0.3 };

        mTestsBook.position.set( clickableObjects.tests.deskPos.x, clickableObjects.tests.deskPos.y, clickableObjects.tests.deskPos.z );
        mTestsBook.rotation.x -= 0.02;

        mWaitingRoom.add( mTestsBook );
        geom.center();

        loader.load( schedule, addSchedule );

    };

    function addSchedule( geom, mat ) {

        mSchedule = new THREE.Mesh( geom, mat );
        mSchedule.name = "schedule";

        let timeBlockGeom = new THREE.PlaneGeometry( scheduleObject.lenX, scheduleObject.lenY );
        let timeBlockMat = new THREE.MeshBasicMaterial( { color: 0xffc4c4, transparent: true, opacity: 0.5 } );
        let hourBlockGeom = new THREE.PlaneGeometry( scheduleObject.lenX / 5.2, scheduleObject.lenY / 7.3 );
        let hourBlockMat = new THREE.MeshBasicMaterial( { color: 0x519f3f, transparent: true, opacity: 0.8 } );
        let timeNowGeom = new THREE.PlaneGeometry( scheduleObject.lenX / 5.2, 0.02 );
        let timeNowMat = new THREE.MeshBasicMaterial( { color: 0x00427a, transparent: true, opacity: 0.8 } );

        scheduleObject.timeBlock = new THREE.Mesh(timeBlockGeom, timeBlockMat);
        scheduleObject.hourBlock = new THREE.Mesh(hourBlockGeom, hourBlockMat);
        scheduleObject.timeNowLine = new THREE.Mesh(timeNowGeom, timeNowMat);

        putTimetableUp();

        mWaitingRoom.add( mSchedule );
        mSchedule.add( scheduleObject.timeBlock );
        
        loader.load( doorSign, addDoorSign );

    };

    function addDoorSign( geom, mat ) {

        var mDoorSign = new THREE.Mesh( geom, mat );
        mDoorSign.name = "doorSign";
        mDoorSign.position.set( doorSignPosX, doorSignPosY, doorSignPosZ );

        clickableObjects.doorSign = mDoorSign;

        doorBone.add( clickableObjects.doorSign );
        
        geom.center();
        
        addDoorWriting();

    };

    function addDoorWriting() {

        // add background
        let backgroundGeom = new THREE.PlaneGeometry( 2.3, 1 );
        let backgroundMat = new THREE.MeshBasicMaterial( { color: 0xffc4c4, transparent: true, opacity: 0 } );
        let background = new THREE.Mesh(backgroundGeom, backgroundMat);
        background.position.set( 0.05, 0, 0.02 );
        background.name = "background";
        clickableObjects.doorSign.add( background );

        var signText;
        if ( JSON.parse( scheduleDict.class_already_done_today ) ) {

            signText = "finished";

        // this variable doesn't need to be JSONed as the logic to create is is don in js in enterClassroom.js
        } else if ( scheduleObject.availableNow ) {

            signText = "OPEN"

        } else {

            signText = scheduleDict.upcomingClass;

        }

        let fontloader = new THREE.FontLoader();
        
        fontloader.load( board_font, function( font ) {
           
            let textGeom = new THREE.TextGeometry( signText, {

                font: font,
                size: 0.3,
                height: 0,
                curveSegments: 2,

            });

            var material;

            if ( scheduleObject.availableNow ) {

                if ( JSON.parse( scheduleDict.class_already_done_today ) ) {

                    material = new THREE.MeshLambertMaterial( { color: 0xffffff } );

                } else {

                    material = scheduleObject.blinkingBlockMat;

                }

            } else {

                material = new THREE.MeshLambertMaterial( { color: 0xffffff } );

            }

            let textMesh = new THREE.Mesh( textGeom, material );
      
            textMesh.position.x -= signText.length / 10;
            textMesh.position.y -= 0.15;
            textMesh.position.z += 0.01;

            clickableObjects.doorSign.text = textMesh;
            clickableObjects.doorSign.children[0].add( textMesh );


        });
        
        loader.load( laptop, addLaptop );

    };

    function addLaptop( geom, mat ) {

        var mLaptop = new THREE.Mesh( geom, mat );
        mLaptop.name = "laptop";

        clickableObjects.laptop = mLaptop;
        clickableObjects.laptop.currentState = "desk";
        clickableObjects.laptop.startCount = 0;
        clickableObjects.laptop.bool = false;
        clickableObjects.laptop.sin = [];
        clickableObjects.laptop.deskPos = { x: 0.4, y: 2.9, z: 1.9 };
        clickableObjects.laptop.facePos = { x: -0.4, y: 3.25, z: 4.2 };
        clickableObjects.laptop.faceRot = { x: 0.02, y: 0.95, z: 0.15};


        geom.center();

        mLaptop.position.set( clickableObjects.laptop.deskPos.x, clickableObjects.laptop.deskPos.y, clickableObjects.laptop.deskPos.z );
        //mLaptop.position.set( clickableObjects.laptop.facePos.x, clickableObjects.laptop.facePos.y, clickableObjects.laptop.facePos.z );
        //mLaptop.rotation.set( clickableObjects.laptop.faceRot.x, clickableObjects.laptop.faceRot.y, clickableObjects.laptop.faceRot.z );

        mWaitingRoom.add( mLaptop );
        
        addToScene();

    };

    

    function addToScene( ) {

        scene.add( mWaitingRoom );

        $("#loadingIcon").hide();
        $("#foreground").fadeOut( 1500, function(){initCameraMove( 'desk', '3' ) } );

        animate();

    }

};

function animate () {

    if ( cameraObject.bool ) {

        moveCamera( mainCount );
    
    }
    
    if ( doorObject.bool ) {

        moveDoor( mainCount );
    
    }
    
    if ( clickableObjects.laptop.bool ) {

        moveBook( mainCount, clickableObjects.laptop );
    
    }
    
    if ( clickableObjects.tests.bool ) {

        moveBook( mainCount, clickableObjects.tests );
    
    }
    
    if ( clickableObjects.sentences.bool ) {

        moveBook( mainCount, clickableObjects.sentences );
    
    }

    if ( scheduleObject.availableNow ) {

        if ( scheduleDict.class_already_done_today ) {
    
            if ( mainCount % 60 === 0 ) {

                blink();

            }

        }

    }
    
    mainCount += 1;
    
    requestAnimationFrame( animate );
    
    renderer.render(scene, camera);

};

