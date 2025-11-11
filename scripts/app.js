// Something is better than nothing wether it works or not

// Elements
const fileInput = document.getElementById('fileinput');
const dropzone = document.getElementById('dropzone');
const libraryEl = document.getElementById('library');
const nowTitle = document.getElementById('now-title');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const loopBtn = document.getElementById('loop');
const shuffleBtn = document.getElementById('shuffle');
const progress = document.getElementById('progress');
const progressFill = document.getElementById('progress-fill');
const timer = document.getElementById('timer');

let tracks = [];               // Array of File objects
let audio = new Audio();
let currentIndex = 0;
let isLoop = false;
let isShuffle = false;

// ======= Load from localStorage =======
const storedTracks = localStorage.getItem('spoofify-tracks');
if (storedTracks) {
  tracks = JSON.parse(storedTracks);
  renderLibrary();
}
const storedIndex = localStorage.getItem('spoofify-currentIndex');
if (storedIndex) currentIndex = parseInt(storedIndex);

// ======= Handle file input =======
fileInput.addEventListener('change', e => {
  addTracks(Array.from(e.target.files));
});

dropzone.addEventListener('dragover', e => {
  e.preventDefault();
  dropzone.classList.add('hover');
});

dropzone.addEventListener('dragleave', e => {
  dropzone.classList.remove('hover');
});

dropzone.addEventListener('drop', e => {
  e.preventDefault();
  dropzone.classList.remove('hover');
  addTracks(Array.from(e.dataTransfer.files));
});

// ======= Add tracks and render library =======
function addTracks(newFiles) {
  newFiles.forEach(file => {
    if (!file.type.startsWith('audio/')) return;
    // store as object with name and URL
    const trackObj = {
      name: file.name,
      url: URL.createObjectURL(file)
    };
    tracks.push(trackObj);
  });
  localStorage.setItem('spoofify-tracks', JSON.stringify(tracks));
  renderLibrary();
}

// ======= Render library =======
function renderLibrary() {
  libraryEl.innerHTML = '';
  tracks.forEach((track, i) => {
    const li = document.createElement('li');
    li.textContent = track.name;
    li.classList.toggle('current', i === currentIndex);
    li.addEventListener('click', () => playTrack(i));
    libraryEl.appendChild(li);
  });
}

// ======= Play a specific track =======
function playTrack(index) {
  if (!tracks[index]) return;
  currentIndex = index;
  audio.src = tracks[index].url;
  audio.play();
  nowTitle.textContent = tracks[index].name;
  playBtn.textContent = 'Pause';
  updateLocalStorage();
  renderLibrary();
}

// ======= Play/Pause =======
playBtn.addEventListener('click', () => {
  if (!audio.src && tracks.length > 0) {
    playTrack(currentIndex);
    return;
  }
  if (audio.paused) {
    audio.play();
    playBtn.textContent = 'Pause';
  } else {
    audio.pause();
    playBtn.textContent = 'Play';
  }
});

// ======= Prev / Next =======
prevBtn.addEventListener('click', () => {
  if (isShuffle) {
    playTrack(randomIndex());
  } else {
    currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    playTrack(currentIndex);
  }
});

nextBtn.addEventListener('click', () => {
  if (isShuffle) {
    playTrack(randomIndex());
  } else {
    currentIndex = (currentIndex + 1) % tracks.length;
    playTrack(currentIndex);
  }
});

// ======= Loop =======
loopBtn.addEventListener('click', () => {
  isLoop = !isLoop;
  audio.loop = isLoop;
  loopBtn.style.backgroundColor = isLoop ? '#1db954' : '';
});

// ======= Shuffle =======
shuffleBtn.addEventListener('click', () => {
  isShuffle = !isShuffle;
  shuffleBtn.style.backgroundColor = isShuffle ? '#1db954' : '';
});

function randomIndex() {
  return Math.floor(Math.random() * tracks.length);
}

// ======= Progress bar & timer =======
audio.addEventListener('timeupdate', () => {
  const pct = (audio.currentTime / audio.duration) * 100 || 0;
  progressFill.style.width = pct + '%';
  timer.textContent = formatTime(audio.currentTime) + ' / ' + formatTime(audio.duration);
});

// Click progress bar to seek
progress.addEventListener('click', e => {
  const rect = progress.getBoundingClientRect();
  const pct = (e.clientX - rect.left) / rect.width;
  audio.currentTime = pct * audio.duration;
});

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// ======= Update localStorage =======
function updateLocalStorage() {
  localStorage.setItem('spoofify-currentIndex', currentIndex);
}

// ======= Auto-play next track =======
audio.addEventListener('ended', () => {
  if (!isLoop) {
    if (isShuffle) playTrack(randomIndex());
    else nextBtn.click();
  }
});

// ======= Initialize =======
if (tracks.length > 0) {
  playTrack(currentIndex);
}
