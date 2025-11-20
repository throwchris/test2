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

const audio = document.querySelector('audio');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const rewindBtn = document.getElementById('rewindBtn');
const fastForwardBtn = document.getElementById('fastForwardBtn');
const currentTimeSpan = document.getElementById('currentTime');
const durationSpan = document.getElementById('duration');

let isPlaying = false;

function playAudio() {
  audio.play();
  isPlaying = true;
  playBtn.style.display = 'none';
  pauseBtn.style.display = 'inline-block';
}

function pauseAudio() {
  audio.pause();
  isPlaying = false;
  playBtn.style.display = 'inline-block';
  pauseBtn.style.display = 'none';
}

function rewindAudio() {
  audio.currentTime -= 10;
}

function fastForwardAudio() {
  audio.currentTime += 10;
}

function updateTime() {
  const currentTime = Math.floor(audio.currentTime);
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime - minutes * 60;
  currentTimeSpan.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateDuration() {
  const duration = Math.floor(audio.duration);
  const minutes = Math.floor(duration / 60);
  const seconds = duration - minutes * 60;
  durationSpan.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

playBtn.addEventListener('click', playAudio);
pauseBtn.addEventListener('click', pauseAudio);
rewindBtn.addEventListener('click', rewindAudio);
fastForwardBtn.addEventListener('click', fastForwardAudio);
audio.addEventListener('timeupdate', updateTime);
audio.addEventListener('loadedmetadata', updateDuration);
