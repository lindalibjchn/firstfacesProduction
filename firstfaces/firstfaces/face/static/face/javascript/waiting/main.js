
$(window).on( 'load', function() {

    // begins the loading of objects
    init();

    // gets session id's in lit to order the calling of sessions from the sessionsDict
    getSessionsIdList();
    insertChart();
    
    // this is for developing the sentences book
    //$('#bookContentBackground').fadeIn( 1000 ); 
    showSentencesBook();

    //$('.fa-angle-double-left').on( 'click', sessionLeft );
    //$('.fa-angle-double-right').on( 'click', sessionRight );

    $('#whatIsScoresBtn').hover( showScoresExpl, hideScoresExpl );

});

function onMouseMove(event) {
    
    let x = (event.clientX / window.innerWidth) * 2 - 1;
    let y = -(event.clientY / window.innerHeight) * 2 + 1;
    let dir = new THREE.Vector3(x, y, -1)
    dir.unproject(camera)

    let ray = new THREE.Raycaster(camera.position, dir.sub(camera.position).normalize())
    
    var intersects
    
    if ( scheduleObject.availableNow ) {
    
        if ( JSON.parse( scheduleObject.availableNow ) ) {

            intersects = ray.intersectObjects( [ clickableObjects.laptop, clickableObjects.tests, clickableObjects.sentences, clickableObjects.doorSign ] );

        if ( JSON.parse( scheduleDict.class_already_done_today ) ) {

            intersects = ray.intersectObjects( [ clickableObjects.laptop, clickableObjects.tests, clickableObjects.sentences ] );

        } else {

            intersects = ray.intersectObjects( [ clickableObjects.laptop, clickableObjects.tests, clickableObjects.sentences, clickableObjects.doorSign ] );

        }

    } else {

        intersects = ray.intersectObjects( [ clickableObjects.laptop, clickableObjects.tests, clickableObjects.sentences ] );
    
    }

    if ( intersects.length > 0 ) {

        document.body.style.cursor = 'pointer';
        
        if ( clickableObjects.intersectedObj !== intersects[0].object ) {

            if ( clickableObjects.intersectedObj.material !== "nope" ) {

                clickableObjects.intersectedObj.material[0].emissive = { r: 0, g: 0, b: 0 };
                clickableObjects.intersectedObj.scale.set( 1, 1, 1 );

            }

            clickableObjects.intersectedObj = intersects[0].object;

            clickableObjects.intersectedObj.material[0].emissive = { r: 0.1, g: 0.1, b: 0.1 };
            clickableObjects.intersectedObj.scale.set( 1.1, 1.1, 1.1 );

            if ( clickableObjects.underMouse !== true ) {

                clickableObjects.underMouse = true;

            }

        }

    } else {

        if ( clickableObjects.underMouse ) {

            clickableObjects.underMouse = false;

            clickableObjects.intersectedObj.material[0].emissive = { r: 0, g: 0, b: 0 };
            clickableObjects.intersectedObj.scale.set( 1, 1, 1 );

        }

            clickableObjects.intersectedObj = { material: "nope" };
            document.body.style.cursor = 'default';

    }

}

function onClick(event) {
    
    let x = (event.clientX / window.innerWidth) * 2 - 1;
    let y = -(event.clientY / window.innerHeight) * 2 + 1;
    let dir = new THREE.Vector3(x, y, -1)
    dir.unproject(camera)

    let ray = new THREE.Raycaster(camera.position, dir.sub(camera.position).normalize())

    var intersects
    
    if ( scheduleObject.availableNow ) {
    
        if ( JSON.parse( scheduleDict.class_already_done_today ) ) {

            intersects = ray.intersectObjects( [ clickableObjects.laptop, clickableObjects.tests, clickableObjects.sentences ] );

        } else {

            intersects = ray.intersectObjects( [ clickableObjects.laptop, clickableObjects.tests, clickableObjects.sentences, clickableObjects.doorSign ] );

        }

    } else {

        intersects = ray.intersectObjects( [ clickableObjects.laptop, clickableObjects.tests, clickableObjects.sentences ] );
    
    }


    if ( intersects.length > 0 ) {
        
        //if ( clickableObjects.clickedObj !== intersects[0].object ) {

            clickableObjects.clickedObj = intersects[0].object;

            let clickedName = clickableObjects.clickedObj.name;
            //clickableObjects.intersectedObj.material[0].emissive = { r: 0, g: 0, b: 0 };
            clickableObjects.intersectedObj.scale.set( 1, 1, 1 );

            renderer.domElement.removeEventListener( "click", onClick );
            renderer.domElement.removeEventListener( "mousemove", onMouseMove );

            if ( clickedName === "doorSign" ) {
             
                doDoor();   
                
            } else {

                initBookMove( clickedName, "face", '1.5' );

            }

        //}

    }

}

function bookBackToDesk() {

    $("#bookContentBackground").fadeOut( 1000, initBookBack );
    function initBookBack() {

        initBookMove( clickableObjects.clickedBook, "desk", "2" )

        clickableObjects.clickedBook = "";

    };

}

function doDoor() {

    if ( scheduleDict.in_class_now === false ) {

        $.ajax({
            url: "/book_session",
            type: "POST",
            success: function(json) {
                if ( json.sessionCreated ) {
                    
                    scheduleDict.session_id = json.session_id;
                    initDoorOpen('3');
                    initCameraMove('class', '3');

                } else {

                    alert("session didn't book");

                }

            },
            error: function() {
                console.log("that's wrong");
            },
        });

    } else {

        initDoorOpen('3');
        initCameraMove('class', '3');

    }

}

function getRecording() {

    let audio_url = this.id

    let aud = document.getElementById('listen_audio');
    aud.src = "http://127.0.0.1:8000/media/" + audio_url;
    //aud.src = "https://erle.ucd.ie/media/" + audio_url;
    aud.play();

}

function getSynth() {

    let sent = this.id;
    let sess_id = this.sessID;

    $.ajax({
        url: "/tts",
        type: "GET",
        data: {
            'sentence': sent,
            'tiaSpeaker': false,
            'sessionID': sess_id,
            'pitch': 0,
            'speaking_rate': 0.85,
            'caller': 'talk',
            'blob_no_text': false,
            'blob_no_text_sent_id': null,
        },
        success: function(json) {

            let aud = document.getElementById('listen_audio');
            aud.src = "http://127.0.0.1:8000/" + json.synthURL;
            //aud.src = "https://erle.ucd.ie/" + json.synthURL;

            setTimeout( function() {

                aud.play();

            }, 1500 );

        },
        error: function() {
            console.log("that's wrong");
        },
        
    });

}

//function sessionLeft() {

    //if ( sessionsDict.currentPos !== sessionsDict.IDList.length - 1 ) {

        //sessionsDict.currentPos += 1;
    
        //showSession( sessionsDict.currentPos );

    //}

//}

//function sessionRight() {

    //if ( sessionsDict.currentPos !== 0 ) {

        //sessionsDict.currentPos -= 1;
    
        //showSession( sessionsDict.currentPos );

    //}

    

//}

function showScoresExpl() {

    $('#scoresExplanation').show();
    console.log('show scores');

}

function hideScoresExpl() {

    $('#scoresExplanation').hide()

}









