// Prefer camera resolution nearest to 1280x720.

/*  
         TODOS:

get audio input select
get audio output select

separate into MVC model
separate getStream function into get stream and function to render the DOM

*/

const constraints = {
  audio: true,
  video: {
    width: 1280,
    height: 720,
    frameRate: { ideal: 30, max: 120 },
    deviceId: "",
  },
};

async function onInit() {
  //model

  const videoDevices = await getVideoDevices();

  const videoStream = await getVideoMediaStream(videoDevices[0].deviceId);
  console.log("Video stream -", videoStream);
  //render
  setVideoMediaStream(videoStream);

  //set video input select
  setVideoInputList(videoDevices);
}

async function getVideoDevices() {
  return navigator.mediaDevices
    .enumerateDevices()
    .then((devices) => {
      const videoInputs = devices.filter((device) => {
        return device.kind === "videoinput";
      });
      return videoInputs;
    })
    .catch((err) => console.log("this is your error: ", err));
  //render them
}

async function onSetCamera(id) {
  const stream = await getVideoMediaStream(id);
  setVideoMediaStream(stream);
}

async function getVideoMediaStream(id) {
  constraints.video.deviceId = id;
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    return stream;
  } catch {
    console.error("Error accesing video stream", error);
    throw error;
  }
}

function setVideoMediaStream(videoStream) {
  console.log("setting");
  const video = document.querySelector("video");
  video.srcObject = videoStream;
  video.onloadedmetadata = () => video.play();
}

function setVideoInputList(videoInputs) {
  const elSelect = document.querySelector(".cam-select");
  var strHTML = videoInputs.map((input) => {
    return `
        <option value="${input.deviceId}">${input.label}</option>
      `;
  });
  console.log("str html", strHTML.join(""));
  elSelect.innerHTML = strHTML;
}
