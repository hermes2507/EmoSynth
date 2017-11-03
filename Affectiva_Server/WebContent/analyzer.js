var divRoot = $("#affdex_elements")[0];
var width = 640;
var height = 480;
var faceMode = affdex.FaceDetectorMode.LARGE_FACES;
var detector = new affdex.CameraDetector(divRoot, width, height, faceMode);
var interval;
var emotions;

detector.detectAllEmotions();
detector.detectAllExpressions();
detector.detectAllEmojis();
//detector.detectAllAppearance();

detector.addEventListener("onInitializeSuccess", function() {
	log('#logs', "The detector reports initialized");
	$("#face_video_canvas").css("display", "block");
	$("#face_video").css("display", "none");
});

	function submit() {
		$.ajax({
			url: "./InterCom",
			type:'POST',
			data:
			{
				joy: emotions.joy,
				sadness: emotions.sadness,
				disgust: emotions.disgust,
				contempt: emotions.contempt,
				anger: emotions.anger,
				fear: emotions.fear,
				surprise: emotions.surprise,
				valence: emotions.valence,
				engagement: emotions.engagement
			},
			/**success: function(msg){
        		alert('Email Sent');
        	}**/
		});
	}
	
	function setSubmit(){
		interval = setInterval(submit, 3000);
	}
	
	function stopSubmit(){
		clearInterval(interval);
	}
	
	function log(node_name, msg) {
		$(node_name).append("<span>" + msg + "</span><br />")
	}
	
	function onStart() {
		if (detector && !detector.isRunning) {
			$("#logs").html("");
			detector.start();
		}
		log('#logs', "Clicked the start button");
	}

	function onStop() {
		log('#logs', "Clicked the stop button");
		if (detector && detector.isRunning) {
			detector.removeEventListener();
			detector.stop();
		}
	};
	
	function onReset() {
		log('#logs', "Clicked the reset button");
		if (detector && detector.isRunning) {
			detector.reset();
			$('#results').html("");
		}
	};

	detector.addEventListener("onWebcamConnectSuccess", function() {
		log('#logs', "Webcam access allowed");
	});

	detector.addEventListener("onWebcamConnectFailure", function() {
		log('#logs', "webcam denied");
		console.log("Webcam access denied");
	});

	detector.addEventListener("onStopSuccess", function() {
		log('#logs', "The detector reports stopped");
		$("#results").html("");
	});

	detector.addEventListener("onImageResultsSuccess", function(faces, image, timestamp) {
		$('#results').html("");
		log('#results', "Number of faces found: " + faces.length);
		if (faces.length > 0) {
			/**log('#results', "Emotions: " + JSON.stringify(faces[0].emotions, function(key, val) {
				return val.toFixed ? Number(val.toFixed(0)) : val;
			}));
			**/
			
			log('#results', emotions = JSON.parse(JSON.stringify((faces[0].emotions))));
			
			//log('#results', "Appearance: " + JSON.stringify(faces[0].appearance));
			log('#results', "Expressions: " + JSON.stringify(faces[0].expressions, function(key, val) {
				return val.toFixed ? Number(val.toFixed(0)) : val;
			}));
			
			log('#results', "Emoji: " + faces[0].emojis.dominantEmoji);
			drawFeaturePoints(image, faces[0].featurePoints);
		}
	});

	function drawFeaturePoints(img, featurePoints) {
		var contxt = $('#face_video_canvas')[0].getContext('2d');
		var hRatio = contxt.canvas.width / img.width;
		var vRatio = contxt.canvas.height / img.height;
		var ratio = Math.min(hRatio, vRatio);
		contxt.strokeStyle = "#FFFFFF";
		for (var id in featurePoints) {
			contxt.beginPath();
			contxt.arc(featurePoints[id].x,
					featurePoints[id].y, 2, 0, 2 * Math.PI);
			contxt.stroke();
		}
	}

