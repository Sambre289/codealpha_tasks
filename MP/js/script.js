const content = document.querySelector(".content"),
  Playimage = document.querySelector(".music-image img"),
  musicName = document.querySelector(".music-titles .name"),
  musicArtist = document.querySelector(".music-titles .artist"),
  Audio = document.querySelector(".main-song"),
  playbtn = document.querySelector(".play-pause"),
  playbtnIcon = document.querySelector(".play-pause span"),
  prevBtn = document.querySelector("#prev"),
  nextBtn = document.querySelector("#next"),
  progressBar = document.querySelector(".progress-bar span"),
  currentTimeText = document.querySelector(".time .current"),
  durationText = document.querySelector(".time .final");

let index = 0;

window.addEventListener("load", () => {
  loadData(index);
});

function loadData(i) {
  const song = songs[i];
  musicName.textContent = song.name;
  musicArtist.textContent = song.artist;
  Playimage.src = "images/" + song.img + ".jpeg";
  Audio.src = "music/" + song.audio + ".mp3";
}

playbtn.addEventListener("click", () => {
  if (content.classList.contains("paused")) {
    pauseSong();
  } else {
    playSong();
  }
});

function playSong() {
  content.classList.remove("paused");
  playbtnIcon.textContent = "pause";
  Audio.play();
}

function pauseSong() {
  content.classList.add("paused");
  playbtnIcon.textContent = "play_arrow";
  Audio.pause();
}

nextBtn.addEventListener("click", () => {
  index = (index + 1) % songs.length;
  loadData(index);
  playSong();
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + songs.length) % songs.length;
  loadData(index);
  playSong();
});

Audio.addEventListener("timeupdate", () => {
  if (Audio.duration) {
    const percent = (Audio.currentTime / Audio.duration) * 100;
    progressBar.style.width = percent + "%";
    currentTimeText.textContent = formatTime(Audio.currentTime);
    durationText.textContent = formatTime(Audio.duration);
  }
});

function formatTime(time) {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60);
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
}
