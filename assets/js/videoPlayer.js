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
const volumeRange =
  videoContainer && videoContainer.querySelector("#wetube-player__volume");

function handleVideoPlay(event) {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
  }
}

function handleVideoMute(event) {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
    volumeRange.value = videoPlayer.volume;
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = `<i class="fas fa-volume-mute"></i>`;
    volumeRange.value = 0;
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
  videoPlayer.volume = volumeRange.value;
  fullTime.innerHTML = formatDate(videoPlayer.duration);
}

function getCurrentTime(event) {
  currentTime.innerHTML = formatDate(videoPlayer.currentTime);
}

function handleVideoEnd(event) {
  registerView();
  playBtn.innerHTML = `<i class="fas fa-play"></i>`;
}

function handleVideoVolume(event) {
  const {
    target: { value },
  } = event;
  videoPlayer.volume = value;
  if (value > 0.7) {
    volumeBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
  } else if (value > 0.4) {
    volumeBtn.innerHTML = `<i class="fas fa-volume-down"></i>`;
  } else if (value > 0.1) {
    volumeBtn.innerHTML = `<i class="fas fa-volume-off"></i>`;
  } else {
    volumeBtn.innerHTML = `<i class="fas fa-volume-mute"></i>`;
  }
}

const registerView = () => {
  const videoId = window.location.href.split("/videos")[1];
  fetch(`/api/${videoId}/view`, {
    method: "POST",
  });
};

function init() {
  playBtn.addEventListener("click", handleVideoPlay);
  volumeBtn.addEventListener("click", handleVideoMute);
  screenBtn.addEventListener("click", expandFullScreen, { once: true });
  videoPlayer.addEventListener("loadedmetadata", getFullTime);
  videoPlayer.addEventListener("timeupdate", getCurrentTime);
  videoPlayer.addEventListener("ended", handleVideoEnd);
  volumeRange.addEventListener("input", handleVideoVolume);
}

videoContainer && init();
