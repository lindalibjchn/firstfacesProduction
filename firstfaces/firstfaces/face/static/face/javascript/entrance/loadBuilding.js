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

    var WIDTH = window.innerWidth;
    var HEIGHT = window.innerHeight;

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


    // CAMERA \\

    camera = new THREE.PerspectiveCamera( 55, WIDTH / HEIGHT, 0.1, 1000 );
    camera.position.set( 0, pathPosY, pathPosZ );
    camera.rotation.x = pathRotX;
    //camera.up = new THREE.Vector3( 0, 1, 0 );
    //camera.lookAt( new THREE.Vector3( 0, cameraObject.lookAtY, 0 ) );
    scene.add( camera );

    //controls = new THREE.OrbitControls( camera, renderer.domElement );


    // LIGHTS \\

    var pointLight = new THREE.PointLight( 0xe0fffa, 1, 0, 2 );
    pointLight.position.set( 100, 50, 30 );
    pointLight.castShadow = true
    scene.add( pointLight );

    var ambientLight = new THREE.AmbientLight( 0xffffff, 0.4 );
    scene.add( ambientLight )

    var hemiLight = new THREE.HemisphereLight( 0xf9f8ed, 0xf9f8ed, 0.4);
    scene.add( hemiLight );


    // LOAD OBJECTS \\

    var loader = new THREE.JSONLoader();
    loader.load( building, addBuilding );


    var mBuilding;

    function addBuilding( geom, mat ) {

        mat[12].skinning = true;
        mat[12].morphtargets = true;
        
        mBuilding = new THREE.SkinnedMesh( geom, mat );

        doorLBone = mBuilding.skeleton.bones[0];
        doorRBone = mBuilding.skeleton.bones[1];

        loader.load( trees, addTrees );

    };

    function addTrees( geom, mat ) {

        var mTrees = new THREE.Mesh( geom, mat );
        mTrees.castShadow = true;

        mBuilding.add( mTrees );
        loader.load( ground, addGround );

    };

    function addGround( geom, mat ) {

        var mGround = new THREE.Mesh( geom, mat );
        mGround.receiveShadow = true;

        mBuilding.add( mGround );

        addSign();

    };

    function addSign() {
       
        let signText = "motional       esponse      anguage      ducation";

        let fontloader = new THREE.FontLoader();
        
        fontloader.load( board_font, function( font ) {
           
            let textGeom = new THREE.TextGeometry( signText, {

                font: font,
                size: 0.23,
                height: 0,
                curveSegments: 2,

            });

            let material = new THREE.MeshLambertMaterial( { color: 0x263d7c } );

            let textMesh = new THREE.Mesh( textGeom, material )

            textMesh.position.set( -2.7, 4.2, 0.88);
      
            scene.add( textMesh );


        });

        let acronymText = "E             R            L            E"
        fontloader.load( board_font, function( font ) {
           
            let textGeom = new THREE.TextGeometry( acronymText, {

                font: font,
                size: 0.34,
                height: 0,
                curveSegments: 2,

            });

            let material = new THREE.MeshLambertMaterial( { color: 0x263d7c } )

            let textMesh = new THREE.Mesh( textGeom, material )

            textMesh.position.set( -2.97, 4.20, 0.88);
      
            scene.add( textMesh );


        });

        addToScene();

    }

    function addToScene( ) {

        scene.add( mBuilding );
     
        $("#loadingIcon").hide();
        $("#foreground").fadeOut( 1500, function(){initCameraMove( 'inside', '6' )} );

        animate()

    }

};

function animate () {

    if ( cameraObject.bool ) {

        moveCamera( mainCount );
    
    }
    
    if ( doorsObject.bool ) {

        moveDoors( mainCount );
    
    }
    

    mainCount += 1;
    
    requestAnimationFrame( animate );
    
    renderer.render(scene, camera);

};

