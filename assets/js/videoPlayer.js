const videoContainer = document.querySelector("#wetube-player");
const videoPlayer = videoContainer && videoContainer.querySelector("video");
const playBtn =
  videoContainer && videoContainer.querySelector("#wetube-player__playBtn");
const volumeBtn =
  videoContainer && videoContainer.querySelector("#wetube-player__volumeBtn");
const screenBtn =
  videoContainer && videoContainer.querySelector("#wetube-player__screenBtn");
const currentTime =
  videoContainer && videoContainer.querySelector("#wetube-player__currentTime");
const fullTime =
  videoContainer && videoContainer.querySelector("#wetube-player__fullTime");

function handleVideoPlay(event) {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
  }
}

function handleVideoVolume(event) {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = `<i class="fas fa-volume-mute"></i>`;
  }
}

function compressFullScreen(event) {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
  screenBtn.innerHTML = `<i class="fas fa-expand"></i>`;
  screenBtn.addEventListener("click", expandFullScreen, { once: true });
}

function expandFullScreen(event) {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullScreen) {
    videoContainer.mozRequestFullScreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  }
  screenBtn.innerHTML = `<i class="fas fa-compress"></i>`;
  screenBtn.addEventListener("click", compressFullScreen, { once: true });
}

const formatDate = (seconds) => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

function getFullTime(event) {
  fullTime.innerHTML = formatDate(videoPlayer.duration);
}

function getCurrentTime(event) {
  currentTime.innerHTML = formatDate(videoPlayer.currentTime);
}

function handleVideoEnd(event) {
  playBtn.innerHTML = `<i class="fas fa-play"></i>`;
}

function init() {
  playBtn.addEventListener("click", handleVideoPlay);
  volumeBtn.addEventListener("click", handleVideoVolume);
  screenBtn.addEventListener("click", expandFullScreen, { once: true });
  videoPlayer.addEventListener("loadedmetadata", getFullTime);
  videoPlayer.addEventListener("timeupdate", getCurrentTime);
  videoPlayer.addEventListener("ended", handleVideoEnd);
}

videoContainer && init();
