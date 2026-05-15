// Classifier Variable
  let classifier;
  // Model URL
  let imageModelURL = './my_model/';
  
  // Video
  let video;
  let flippedVideo;
  // To store the classification
  let label = "";
  let confianza = 0
  texto = ""

  // Load the model first
  function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  }

  function setup() {
    createCanvas(320, 260);
    // Create the video
    video = createCapture(VIDEO);
    video.size(320, 240);
    video.hide();

    flippedVideo = ml5.flipImage(video);
    // Start classifying
    classifyVideo();
  }

  function draw() {
    background(0);
    // Draw the video
    image(flippedVideo, 0, 0);

    // Draw the label
    fill(255);
    textSize(16);
    textAlign(CENTER);
    texto = label
    if (label === "peluchegeorge") {
        texto = "⚡⚡ Peluche george ⚡⚡"
    } else if (label === "libro") {
        texto = "💙 ¡Libro! 💙"
    } else if (label === "controlps5") {
        texto = "🎮 ¡Control ps5! 🎮"
    }

    text(texto + " " + confianza, width / 2, height - 4);
  }

  // Get a prediction for the current video frame
  function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
    flippedVideo.remove();

  }

  // When we get a result
  function gotResult(error, results) {
    // If there is an error
    if (error) {
      console.error(error);
      return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    label = results[0].label;
     confianza = results[0].confidence.toFixed(4);
    // Classifiy again!
    classifyVideo();
  }