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

navigator.mediaDevices
  .getUserMedia(constraints)
  .then((mediaStream) => {
    console.log("this is a media stream: ", mediaStream);
    const video = document.querySelector("video");
    console.log("this is a video ele: ", video);
    video.srcObject = mediaStream;
    video.onloadedmetadata = () => {
      video.play();
    };
  })
  .catch((err) => {
    // always check for errors at the end.
    console.error(`${err.name}: ${err.message}`);
  });

const devices = navigator.mediaDevices
  .enumerateDevices()
  .then((devices) => {
    //got the devices
    //get video inputs, get their names and put in the select element
    console.log(devices);
    const videoInputs = devices.filter(
      (device) => device.kind === "videoinput"
    );
    //render them

    const elSelect = document.querySelector(".cam-select");
    console.log(videoInputs);
    var strHTML = videoInputs.map((input) => {
      return `
          <option value="${input.deviceId}">${input.label}</option>
        `;
    });
    console.log("str html", strHTML.join(""));
    elSelect.innerHTML = strHTML;
  })
  .catch((err) => console.log("this is your error: ", err));

function onSetCamera(id) {
  console.log("camera id: ", id);
  getMediaStream(id);
}

function getMediaStream(id) {
  constraints.video.deviceId = id;

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((mediaStream) => {
      console.log("this is a media stream: ", mediaStream);
      const video = document.querySelector("video");
      console.log("this is a video ele: ", video);
      video.srcObject = mediaStream;
      video.onloadedmetadata = () => {
        video.play();
      };
    })
    .catch((err) => {
      // always check for errors at the end.
      console.error(`${err.name}: ${err.message}`);
    });
}
