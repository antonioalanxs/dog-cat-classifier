const $ = (selector) => document.querySelector(selector);

const VIDEO_SIZE = 315;
const PIXELS_NUMBER = 255;
const PREDICT_TIMEOUT = 150;
const PREDICT_THRESHOLD = 0.5;
const CAT_LABEL = "Cat";
const DOG_LABEL = "Dog";

const $videoElement = $("#video");
const $mainCanvas = $("#main-canvas");
const $hiddenCanvas = $("#hidden-canvas");
const $mainCtx = $mainCanvas.getContext("2d");
const $result = $("#result");

let currentStream = null;
let cameraMode = "user";
let model = null;

/**
 * Asynchronous function to load the machine learning model.
 * Logs loading process and model loaded confirmation.
 */
(async () => {
  console.log("Loading model...");
  model = await tf.loadLayersModel("../out/model.json");
  console.log("Model loaded!");
})();

/**
 * Event handler when the window is fully loaded,
 * starts the camera with the default settings.
 */
window.onload = () => {
  startCamera();
};

/**
 * Starts the camera with specified options.
 * Sets up video stream and initiates image processing.
 */
function startCamera() {
  const options = {
    audio: false,
    video: {
      width: VIDEO_SIZE,
      height: VIDEO_SIZE,
      facingMode: cameraMode,
    },
  };

  navigator.mediaDevices
    .getUserMedia(options)
    .then(function (stream) {
      currentStream = stream;
      $videoElement.srcObject = currentStream;
      $videoElement.onloadedmetadata = () => {
        $videoElement.play();
        processCamera();
        predict();
      };
    })
    .catch((e) => alert(e));
}

/**
 * Switches between front and rear cameras of the device.
 * Stops the current camera stream if it exists and restarts with the new mode.
 */
function switchCamera() {
  currentStream &&
    currentStream.getTracks().forEach((track) => {
      track.stop();
    });

  cameraMode = cameraMode === "user" ? "environment" : "user";

  startCamera();
}

/**
 * Continuously captures video frames from the camera and processes them on the main canvas.
 * Uses requestAnimationFrame for efficient frame processing.
 */
function processCamera() {
  $mainCtx.drawImage($videoElement, 0, 0, VIDEO_SIZE, VIDEO_SIZE);

  requestAnimationFrame(processCamera);
}

/**
 * Performs prediction based on the current image in the main canvas.
 * Converts the image to grayscale and makes a prediction using the loaded model.
 * Updates the result in the DOM.
 */
function predict() {
  if (model != null) {
    resizeCanvas($mainCanvas, 100, 100, $hiddenCanvas);

    const hiddenCtx = $hiddenCanvas.getContext("2d");
    const imgData = hiddenCtx.getImageData(0, 0, 100, 100);

    let grayscaleImage = [];
    let row = [];

    for (let index = 0; index < imgData.data.length; index += 4) {
      const red = imgData.data[index] / PIXELS_NUMBER;
      const green = imgData.data[index + 1] / PIXELS_NUMBER;
      const blue = imgData.data[index + 2] / PIXELS_NUMBER;

      const gray = (red + green + blue) / 3;

      row.push([gray]);

      if (row.length === 100) {
        grayscaleImage.push(row);

        row = [];
      }
    }

    const inputTensor = tf.tensor4d([grayscaleImage]);
    const prediction = model.predict(inputTensor).dataSync();

    const result = prediction <= PREDICT_THRESHOLD ? CAT_LABEL : DOG_LABEL;

    $result.innerHTML = result;
  }

  setTimeout(predict, PREDICT_TIMEOUT);
}

/**
 * Resizes the source canvas to the specified dimensions and copies the image to the target canvas.
 * Handles resizing and copying of image data between canvases.
 */
function resizeCanvas(sourceCanvas, width, height, targetCanvas) {
  const targetCtx = targetCanvas.getContext("2d");

  const sourceWidth = sourceCanvas.width;
  const sourceHeight = sourceCanvas.height;

  width = Math.round(width);
  height = Math.round(height);

  targetCanvas.width = width;
  targetCanvas.height = height;

  targetCtx.drawImage(
    sourceCanvas,
    0,
    0,
    sourceWidth,
    sourceHeight,
    0,
    0,
    width,
    height
  );
}
