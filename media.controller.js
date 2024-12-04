// Prefer camera resolution nearest to 1280x720.

/*  
         TODOS:

get audio input select
get audio output select

separate into MVC model ---- DONE
separate getStream function into get stream and function to render the DOM --- DONE

*/

async function onInit() {
  //model

  const videoDevices = await getVideoDevices();
  const audioDevices = await getAudioDevices();

  const videoStream = await getVideoMediaStream(videoDevices[0].deviceId);
  //get audio stream
  console.log("Video stream -", videoStream);
  //render
  renderVideoMediaStream(videoStream);

  //set video input select
  renderVideoInputList(videoDevices);
  renderMicInputList(audioDevices);
}

async function onSetCamera(id) {
  const stream = await getVideoMediaStream(id);
  renderVideoMediaStream(stream);
}

function renderVideoMediaStream(videoStream) {
  console.log("setting");
  const video = document.querySelector("video");
  video.srcObject = videoStream;
  video.onloadedmetadata = () => video.play();
}

function renderVideoInputList(videoInputs) {
  const elSelect = document.querySelector(".video-select");
  var strHTML = videoInputs.map((input) => {
    return `
        <option value="${input.deviceId}">${input.label}</option>
      `;
  });
  console.log("str html", strHTML.join(""));
  elSelect.innerHTML = strHTML;
}

function renderMicMediaStream(audioStream) {
  console.log("setting");
  const audio = document.querySelector("audio");
  audio.srcObject = audioStream;
  audio.onloadedmetadata = () => audio.play();
}

function renderMicInputList(micInputs) {
  const elSelect = document.querySelector(".mic-select");
  var strHTML = micInputs.map((input) => {
    return `
        <option value="${input.deviceId}">${input.label}</option>
      `;
  });
  console.log("str html", strHTML.join(""));
  elSelect.innerHTML = strHTML;
}
