const videoContainer = document.querySelector("#wetube-player");
const videoPlayer = videoContainer && videoContainer.querySelector("video");
const playBtn =
  videoContainer && videoContainer.querySelector("#wetube-player__playBtn");

function handleVideoPlay() {
  console.log(videoPlayer.paused);
  if (videoPlayer.paused) {
    videoPlayer.play();
  } else {
    videoPlayer.pause();
  }
}

function init() {
  playBtn.addEventListener("click", handleVideoPlay);
}

videoContainer && init();
