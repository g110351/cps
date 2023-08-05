// Get necessary elements from HTML
const startBtn = document.getElementById("start-btn");
const modeSelect = document.getElementById("mode-select");
const timerMinutes = document.getElementById("timer-minutes");
const timerSeconds = document.getElementById("timer-seconds");
const cpsBtn = document.getElementById("cps-btn");
const clearHistoryBtn = document.getElementById("clear-history-btn");
const historyList = document.getElementById("history-list");
const bestRecord = document.getElementById("best-record");

// Initialize variables
let mode = 5;
let timer;
let timerCount;
let clicks = 0;
let cps = 0;
let history = [];

// Function to start timer
function startTimer() {
  // Disable mode select and start button
  modeSelect.disabled = true;
  startBtn.disabled = true;

  // Set timer count and display
  timerCount = mode
  timerMinutes.textContent = Math.floor(timerCount / 60).toString().padStart(2, "0");
  timerSeconds.textContent = (timerCount % 60).toString().padStart(2, "0");

  // Enable CPS button
  cpsBtn.disabled = false;

  // Add 1 second delay before starting timer countdown
  setTimeout(() => {
    // Start timer countdown
    timer = setInterval(() => {
      timerCount--;
      timerMinutes.textContent = Math.floor(timerCount / 60).toString().padStart(2, "0");
      timerSeconds.textContent = (timerCount % 60).toString().padStart(2, "0");

      // End timer when countdown reaches 0
      if (timerCount === 0) {
        clearInterval(timer);
        endTimer();
      }
    }, 1000);
  }, 1000);
}

// Function to end timer
function endTimer() {
  // Disable CPS button
  cpsBtn.disabled = true;

  // Calculate CPS and update display
  cps = clicks / mode;
  cpsBtn.textContent = cps.toFixed(2) + " CPS";

  // Add CPS to history and update display
  history.push(cps.toFixed(2));
  const historyItem = document.createElement("li");
  historyItem.textContent = cps.toFixed(2) + " CPS";
  historyList.appendChild(historyItem);

  // Update best record if necessary
  if (cps > parseFloat(bestRecord.textContent)) {
    bestRecord.textContent = cps.toFixed(2) + " CPS";
  }

  // Enable mode select and start button
  modeSelect.disabled = false;
  startBtn.disabled = false;
}

// Event listener for mode select
modeSelect.addEventListener("change", () => {
  mode = parseInt(modeSelect.value);
});

// Event listener for start button
startBtn.addEventListener("click", () => {
  clicks = 0;
  startTimer();
});

// Event listener for CPS button
cpsBtn.addEventListener("click", () => {
  clicks++;
  cps = clicks / (mode - timerCount);
  cpsBtn.textContent = cps.toFixed(2) + " CPS";
});

// Event listener for clear history button
clearHistoryBtn.addEventListener("click", () => {
  history = [];
  historyList.innerHTML = "";
  bestRecord.textContent = "0 CPS";
});
