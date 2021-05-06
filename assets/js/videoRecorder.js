const recorderContainer = document.querySelector("#jsRecordContainer");
const recorderBtn =
  recorderContainer && recorderContainer.querySelector("button");
const recorderVideo =
  recorderContainer && recorderContainer.querySelector("video");
const downloadLink = recorderContainer && recorderContainer.querySelector("a");

const handleMediaAvailable = (event) => {
  const { data: fileUrl } = event;
  downloadLink.href = URL.createObjectURL(fileUrl);
  downloadLink.download = `${Date.now()}.webm`;
  downloadLink.click();
};

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

      const mediaRecoder = new MediaRecorder(stream);
      mediaRecoder.start();
      mediaRecoder.addEventListener("dataavailable", handleMediaAvailable);
      console.log(stream);
      recorderBtn.addEventListener(
        "click",
        (event) => {
          recorderVideo.pause();
          mediaRecoder.stop();
          recorderBtn.innerHTML = "Start Recording";
          recorderBtn.addEventListener("click", handlerRecorder, {
            once: true,
          });
        },
        { once: true }
      );
      return;
    })
    .catch((error) => {
      recorderBtn.disabled = "disabled";
      recorderBtn.innerHTML = "Permission denied";
    });
};

function init() {
  recorderBtn.addEventListener("click", handlerRecorder, { once: true });
}

recorderContainer && init();
