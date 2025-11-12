// ======= SPOTIFY CLONE APP ======= //
// Handles UI, playback, and cookies.

// ======= GLOBAL STATE ======= //
let currentTrack = null;
let isPlaying = false;
let volume = 0.8;

// ======= DOM ELEMENTS ======= //
const playBtn = document.getElementById("play-btn");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const progressBar = document.getElementById("progress");
const volumeSlider = document.getElementById("volume");
const trackTitle = document.getElementById("track-title");
const trackArtist = document.getElementById("track-artist");
const sidebarItems = document.querySelectorAll(".sidebar-item");
const themeToggle = document.getElementById("theme-toggle");

// ======= COOKIE HELPERS ======= //
function setCookie(name, value, days = 365) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

// ======= UI INIT ======= //
document.addEventListener("DOMContentLoaded", () => {
  loadCookies();
  setupEventListeners();
  renderSidebarState();
});

// ======= EVENT LISTENERS ======= //
function setupEventListeners() {
  playBtn.addEventListener("click", togglePlay);
  nextBtn.addEventListener("click", nextTrack);
  prevBtn.addEventListener("click", prevTrack);
  volumeSlider.addEventListener("input", changeVolume);
  themeToggle?.addEventListener("click", toggleTheme);

  sidebarItems.forEach((item) => {
    item.addEventListener("click", () => {
      sidebarItems.forEach((el) => el.classList.remove("active"));
      item.classList.add("active");
      setCookie("lastTab", item.id);
    });
  });
}

// ======= THEME SYSTEM ======= //
function toggleTheme() {
  const body = document.body;
  body.classList.toggle("dark-theme");
  const isDark = body.classList.contains("dark-theme");
  setCookie("theme", isDark ? "dark" : "light");
}

function loadCookies() {
  const savedTheme = getCookie("theme");
  if (savedTheme === "dark") document.body.classList.add("dark-theme");

  const savedTab = getCookie("lastTab");
  if (savedTab) {
    document.getElementById(savedTab)?.classList.add("active");
  }

  const savedVolume = getCookie("volume");
  if (savedVolume) {
    volume = parseFloat(savedVolume);
    volumeSlider.value = volume;
  }
}

// ======= PLAYBACK SYSTEM ======= //
function togglePlay() {
  if (!currentTrack) return;

  isPlaying = !isPlaying;
  playBtn.innerHTML = isPlaying ? "⏸️" : "▶️";
  if (isPlaying) {
    // play audio
    currentTrack.play();
  } else {
    currentTrack.pause();
  }
}

function nextTrack() {
  console.log("Next track clicked");
  // You can implement playlist skipping here later
}

function prevTrack() {
  console.log("Previous track clicked");
}

function changeVolume() {
  volume = volumeSlider.value;
  setCookie("volume", volume);
  if (currentTrack) currentTrack.volume = volume;
}

// ======= TRACK MANAGEMENT ======= //
function loadTrack(trackData) {
  if (currentTrack) currentTrack.pause();

  currentTrack = new Audio(trackData.src);
  trackTitle.textContent = trackData.title;
  trackArtist.textContent = trackData.artist;
  currentTrack.volume = volume;
  currentTrack.play();
  isPlaying = true;
  playBtn.innerHTML = "⏸️";
}

// ======= RENDER SIDEBAR ======= //
function renderSidebarState() {
  const activeTab = getCookie("lastTab");
  sidebarItems.forEach((item) => {
    item.classList.toggle("active", item.id === activeTab);
  });
}

// ======= DEMO TRACK ======= //
// Example usage:
loadTrack({
  src: "music/demo.mp3", // Replace with real track path
  title: "Demo Track",
  artist: "Your Artist Name",
});
