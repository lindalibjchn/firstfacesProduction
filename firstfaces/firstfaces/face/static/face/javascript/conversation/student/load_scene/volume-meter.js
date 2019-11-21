function initMicVolumeBar() {

    // CALLED EACH TIME THE MIC BUTTON IS PRESSED

    audioContext.close();// got a bug that I had too mnay contexts open
    audioContext = new AudioContext();
    
    // Create an AudioNode from the stream.
    mediaStreamSource = audioContext.createMediaStreamSource( conversationVariables.stream );

    // Create a new volume meter and connect it.
    meter = createAudioMeter(audioContext, 0.95, 0.98, 1000);

    mediaStreamSource.connect(meter);

    volumeObject.bool = true;// detect volume and be ready to show volume bar
    showVolumeBar();

}


/*
The MIT License (MIT)

Copyright (c) 2014 Chris Wilson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/*

Usage:
audioNode = createAudioMeter(audioContext,clipLevel,averaging,clipLag);

audioContext: the AudioContext you're using.
clipLevel: the level (0 to 1) that you would consider "clipping".
   Defaults to 0.98.
averaging: how "smoothed" you would like the meter to be over time.
   Should be between 0 and less than 1.  Defaults to 0.95.
clipLag: how long you would like the "clipping" indicator to show
   after clipping has occured, in milliseconds.  Defaults to 750ms.

Access the clipping through node.checkClipping(); use node.shutdown to get rid of it.
*/

function createAudioMeter(audioContext,clipLevel,averaging,clipLag) {
	var processor = audioContext.createScriptProcessor(512);
	processor.onaudioprocess = volumeAudioProcess;
	processor.clipping = false;
	processor.lastClip = 0;
	processor.volume = 0;
	processor.clipLevel = clipLevel || 0.98;
	processor.averaging = averaging || 0.95;
	processor.clipLag = clipLag || 750;

	// this will have no effect, since we don't copy the input to the output,
	// but works around a current Chrome bug.
	processor.connect(audioContext.destination);

	processor.checkClipping =
		function(){
			if (!this.clipping)
				return false;
			if ((this.lastClip + this.clipLag) < window.performance.now())
				this.clipping = false;
			return this.clipping;
		};

	processor.shutdown =
		function(){
			this.disconnect();
			this.onaudioprocess = null;
		};

	return processor;
}

function volumeAudioProcess( event ) {
	var buf = event.inputBuffer.getChannelData(0);
    var bufLength = buf.length;
	var sum = 0;
    var x;

	// Do a root-mean-square on the samples: sum up the squares...
    for (var i=0; i<bufLength; i++) {
    	x = buf[i];
    	if (Math.abs(x)>=this.clipLevel) {
    		this.clipping = true;
    		this.lastClip = window.performance.now();
    	}
    	sum += x * x;
    }

    // ... then take the square root of the sum.
    var rms =  Math.sqrt(sum / bufLength);

    // Now smooth this out with the averaging factor applied
    // to the previous sample - take the max here because we
    // want "fast attack, slow release."
    this.volume = Math.max(rms, this.volume*this.averaging);
}

function drawLoop() {

    if ( meter.checkClipping() ) {

        stopDrawingVolumeBar();

        if ( conversationVariables.interference_count === 0 ) {
        
            if ( !conversationVariables.stage2 && !conversationVariables.stage3 ) {
               // don't want to do full flinch animation in later stages
                conversationVariables.interference = true;
                tiaConfusedAfterClipping( true );

            } else {

                tiaConfusedAfterClipping( false );

            }

        } else {

            tiaConfusedAfterClipping( false );

        }

        conversationVariables.interference_count += 1;

    } else {

        drawVolumeBar();

    }

}

function drawVolumeBar() {

    canvasContext.clearRect(0,0,WIDTH_VOL,HEIGHT_VOL);
    canvasContext.fillRect(0, 0, meter.volume*WIDTH_VOL, HEIGHT_VOL);

}

function stopDrawingVolumeBar() {

    volumeObject.bool = false;

}

function beginDrawingVolumeBar() {

    volumeObject.bool = true;
    canvasContext.fillStyle = "#33ff00";

}

function tiaConfusedAfterClipping( firstTime ) {
    
    canvasContext.fillStyle = "#ff0000";
    canvasContext.fillRect(0, 0, WIDTH_VOL, HEIGHT_VOL);

    if ( firstTime ) {

        clearTimeout( recorder15sTimeout );
        micIntAud.src = micIntAudSources[Math.floor(Math.random()*4)]
        micIntAud.play();//play interference

        setTimeout( firstFlinch, 250 );// so Tia seems to react to interference sound

    } else {

        // actually just face contorting a bit
        
        subsequentFlinches();

    }

}

function showVolumeBar() {

    $('#meterContainer').show(); 
    volumeObject.bool = true;

}

function hideVolumeBar() {

    $('#meterContainer').hide(); 
    volumeObject.bool = false;

}


