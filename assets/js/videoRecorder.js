const recorderContainer = document.querySelector("#jsRecordContainer");
const recorderBtn =
  recorderContainer && recorderContainer.querySelector("button");
const recorderVideo =
  recorderContainer && recorderContainer.querySelector("video");

const handlerRecorder = async (event) => {
  await navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: true,
    })
    .then((stream) => {
      recorderVideo.srcObject = stream;
      recorderVideo.muted = true;
      recorderVideo.play();
      recorderBtn.innerHTML = "Recoding...";
    })
    .catch((error) => {
      recorderBtn.disabled = "disabled";
      recorderBtn.innerHTML = "Permission denied";
    });
};

function init() {
  recorderBtn.addEventListener("click", handlerRecorder);
}

recorderContainer && init();
