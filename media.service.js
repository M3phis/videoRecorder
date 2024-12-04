const constraints = {
  audio: false,
  video: {
    width: 1280,
    height: 720,
    frameRate: { ideal: 30, max: 120 },
    deviceId: "",
  },
};

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

async function getAudioDevices() {
  return navigator.mediaDevices
    .enumerateDevices()
    .then((devices) => {
      const audioInputs = devices.filter((device) => {
        return device.kind === "audioinput";
      });
      return audioInputs;
    })
    .catch((err) => console.log("this is your error: ", err));
  //render them
}

async function getAudioMediaStream(id) {
  constraints.audio.deviceId = id;
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    return stream;
  } catch {
    console.error("Error accesing video stream", error);
    throw error;
  }
}
