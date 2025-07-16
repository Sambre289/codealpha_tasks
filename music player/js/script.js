const content = document.querySelector(".content"),
  Playimage = document.querySelector(".music-image img"),
  musicName = document.querySelector(".music-titles .name"),
  musicArtist = document.querySelector(".music-titles .artist"),
  Audio = content.querySelector(".main-song"),
  playbtn = content.querySelector(".play-pause"),
  playbtnIcon = document.querySelector(".play-pause span"),
  prevBtn = document.querySelector("#prev"),
  nextBtn = document.querySelector("#next"),
  progressBar = document.querySelector(".progress-bar"),
  progressHandle = document.querySelector(".progress-bar span"),
  currentTimeText = document.querySelector(".time .current"),
  durationText = document.querySelector(".time .final");

let index = 1;
let isPlaying = false; // ✅ Use this to track play state

// Load song data on page load
window.addEventListener("load", () => {
  loadData(index);
  playSong();
});

// Load song data into UI
function loadData(indexValue) {
  const song = songs[indexValue - 1];
  musicName.textContent = song.name;
  musicArtist.textContent = song.artist;
  Playimage.src = "images/" + song.img + ".jpeg";
  Audio.src = "music/" + song.Audio + ".mp3";
}

// Toggle play/pause
playbtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

function playSong() {
  isPlaying = true;
  content.classList.add("paused");
  playbtnIcon.textContent = "pause";
  Audio.play();
}

function pauseSong() {
  isPlaying = false;
  content.classList.remove("paused");
  playbtnIcon.textContent = "play_arrow";
  Audio.pause();
}

// Handle next/prev
nextBtn.addEventListener("click", () => {
  index++;
  if (index > songs.length) index = 1;
  loadData(index);
  playSong();
});

prevBtn.addEventListener("click", () => {
  index--;
  if (index < 1) index = songs.length;
  loadData(index);
  playSong();
});

// Update progress bar
Audio.addEventListener("timeupdate", () => {
  if (Audio.duration) {
    const percent = (Audio.currentTime / Audio.duration) * 100;
    progressBar.style.width = `${percent}%`;

    // Update time text
    currentTimeText.textContent = formatTime(Audio.currentTime);
    durationText.textContent = formatTime(Audio.duration);
  }
});

// Seek on progress click
document.querySelector(".progress-details").addEventListener("click", (e) => {
  const width = e.currentTarget.clientWidth;
  const clickX = e.offsetX;
  const duration = Audio.duration;

  Audio.currentTime = (clickX / width) * duration;
});

// Format time in MM:SS
function formatTime(time) {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60);
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
}
