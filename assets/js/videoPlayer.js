const videoContainer = document.querySelector("#wetube-player");
const videoPlayer = videoContainer && videoContainer.querySelector("video");
const playBtn =
  videoContainer && videoContainer.querySelector("#wetube-player__playBtn");
const volumeBtn =
  videoContainer && videoContainer.querySelector("#wetube-player__volumeBtn");
const screenBtn =
  videoContainer && videoContainer.querySelector("#wetube-player__screenBtn");

function handleVideoPlay(event) {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
  }
}

function handleVideoVolume() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = `<i class="fas fa-volume-mute"></i>`;
  }
}

function compressFullScreen(event) {
  document.exitFullscreen();
  screenBtn.innerHTML = `<i class="fas fa-expand"></i>`;
  screenBtn.addEventListener("click", expandFullScreen, { once: true });
}

function expandFullScreen(event) {
  videoContainer.requestFullscreen();
  screenBtn.innerHTML = `<i class="fas fa-compress"></i>`;
  screenBtn.addEventListener("click", compressFullScreen, { once: true });
}

function init() {
  playBtn.addEventListener("click", handleVideoPlay);
  volumeBtn.addEventListener("click", handleVideoVolume);
  screenBtn.addEventListener("click", expandFullScreen, { once: true });
}

videoContainer && init();
