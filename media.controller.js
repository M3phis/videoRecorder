// Prefer camera resolution nearest to 1280x720.

/*  
         TODOS:

get audio input select
get audio output select

separate into MVC model
separate getStream function into get stream and function to render the DOM

*/

async function onInit() {
  //model

  const videoDevices = await getVideoDevices();

  const videoStream = await getVideoMediaStream(videoDevices[0].deviceId);
  console.log("Video stream -", videoStream);
  //render
  renderVideoMediaStream(videoStream);

  //set video input select
  renderVideoInputList(videoDevices);
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
  const elSelect = document.querySelector(".cam-select");
  var strHTML = videoInputs.map((input) => {
    return `
        <option value="${input.deviceId}">${input.label}</option>
      `;
  });
  console.log("str html", strHTML.join(""));
  elSelect.innerHTML = strHTML;
}
