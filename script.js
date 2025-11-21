//var myAudio = document.getElementById("myAudio");
//var isPlaying = false;

//function togglePlay() {
  //isPlaying ? myAudio.pause() : myAudio.play();
//};

//myAudio.onplaying = function() {
  //isPlaying = true;
//};
//myAudio.onpause = function() {
  //isPlaying = false;
//};

function myFunction4() {
  var element = document.getElementById("font");
  if (element.classList === "w3-large") {
    element.classList.toggle("w3-xlarge") 
  } else {
    element.classList.toggle("w3-xlarge")
  }

}



function myFunction2() {
  var element = document.body;
  element.classList.toggle("light-mode");
}

// === AUDIO + PLAYLIST SETUP ===
const audio = document.getElementById('myAudio');

const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const rewindBtn = document.getElementById('rewindBtn');
const fastForwardBtn = document.getElementById('fastForwardBtn');

const currentTimeSpan = document.getElementById('currentTime');
const durationSpan = document.getElementById('duration');

// Playlist: one entry per audio file + where to scroll
const playlist = [
  { src: 'gpfm1.mp3', anchorId: 'page1' },   // pp. 1–5
  { src: 'gpfm2.mp3', anchorId: 'page6' },   // pp. 6–12
  { src: 'gpfm3.mp3', anchorId: 'page13' },  // pp. 13–17
  { src: 'gpfm4.mp3', anchorId: 'page18' }   // pp. 18–24
];

let currentTrackIndex = 0;
let isPlaying = false;

// Helper: format seconds into MM:SS
function formatTime(seconds) {
  const s = Math.floor(seconds || 0);
  const min = Math.floor(s / 60);
  const sec = s % 60;
  return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

// Scroll page to the anchor for the current track
function scrollToCurrentSection() {
  const track = playlist[currentTrackIndex];
  const anchor = document.getElementById(track.anchorId);
  if (anchor) {
    anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Load a given track (0–3)
function loadTrack(index, options = {}) {
  const { autoPlay = false, doScroll = true } = options;

  if (index < 0 || index >= playlist.length) return;

  currentTrackIndex = index;
  const track = playlist[index];

  audio.src = track.src;
  audio.currentTime = 0;
  audio.load();

  if (doScroll) {
    scrollToCurrentSection();
  }

  if (autoPlay) {
    audio.play();
    isPlaying = true;
  }

  updateTimeDisplays();
}

// Update MM:SS displays
function updateTimeDisplays() {
  currentTimeSpan.textContent = formatTime(audio.currentTime);
  if (!isNaN(audio.duration)) {
    durationSpan.textContent = formatTime(audio.duration);
  }
}

// === EVENT HOOKS ===

// Time updating
audio.addEventListener('timeupdate', updateTimeDisplays);

// Duration known
audio.addEventListener('loadedmetadata', updateTimeDisplays);

// When a track finishes: go to next audio + scroll to its section
audio.addEventListener('ended', () => {
  if (currentTrackIndex < playlist.length - 1) {
    loadTrack(currentTrackIndex + 1, { autoPlay: true, doScroll: true });
  } else {
    isPlaying = false;
  }
});

// === CONTROLS ===
playBtn.addEventListener('click', () => {
  if (!isPlaying) {
    // If nothing loaded yet, load the current track
    if (!audio.src) {
      loadTrack(currentTrackIndex, { autoPlay: true, doScroll: true });
    } else {
      audio.play();
      isPlaying = true;
    }
  }
});

pauseBtn.addEventListener('click', () => {
  audio.pause();
  isPlaying = false;
});

// Rewind logic:
// - If more than 5 seconds into current track → jump to start of this track
// - If within first 5 seconds → go to previous track and scroll to its section
const REWIND_THRESHOLD_SECONDS = 5;

rewindBtn.addEventListener('click', () => {
  if (audio.currentTime > REWIND_THRESHOLD_SECONDS) {
    audio.currentTime = 0; // restart same track
  } else if (currentTrackIndex > 0) {
    loadTrack(currentTrackIndex - 1, { autoPlay: true, doScroll: true });
  } else {
    audio.currentTime = 0; // already at first track
  }
});

// Fast-forward logic:
// - Always go to next track (if any), scroll to its section
fastForwardBtn.addEventListener('click', () => {
  if (currentTrackIndex < playlist.length - 1) {
    loadTrack(currentTrackIndex + 1, { autoPlay: true, doScroll: true });
  } else {
    // last track → jump to near the end
    audio.currentTime = audio.duration || 0;
  }
});

// Initialize first track on page load (no auto-play)
window.addEventListener('DOMContentLoaded', () => {
  loadTrack(0, { autoPlay: false, doScroll: true });
});

