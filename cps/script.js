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
let delay = 3;
let history = [];
let cpsUpdateInterval;  // Variable for CPS update interval

// Function to update CPS display
function updateCPS() {
    if (delay === 0) {
        cps = clicks / (mode - timerCount + 1);  // Avoid division by zero
        cpsBtn.textContent = cps.toFixed(2) + " CPS";
    }
}

// Function to start timer
function startTimer() {
    modeSelect.disabled = true;
    startBtn.disabled = true;
    
    timerCount = mode;
    timerMinutes.textContent = Math.floor(timerCount / 60).toString().padStart(2, "0");
    timerSeconds.textContent = (timerCount % 60).toString().padStart(2, "0");

    cpsBtn.disabled = false;
    cpsUpdateInterval = setInterval(updateCPS, 100);  // Update CPS every 100ms

    timer = setInterval(() => {
        if (delay > 0) {
            delay--;
            timerSeconds.textContent = delay.toString().padStart(2, "0");
        } else {
            timerCount--;
            timerMinutes.textContent = Math.floor(timerCount / 60).toString().padStart(2, "0");
            timerSeconds.textContent = (timerCount % 60).toString().padStart(2, "0");

            if (timerCount === 0) {
                clearInterval(timer);
                clearInterval(cpsUpdateInterval);  // Clear CPS update interval when timer ends
                endTimer();
            }
        }
    }, 1000);
}

// Function to end timer
function endTimer() {
    cpsBtn.disabled = true;
    cps = clicks / mode;
    cpsBtn.textContent = cps.toFixed(2) + " CPS";

    history.push(cps.toFixed(2));
    const historyItem = document.createElement("li");
    historyItem.textContent = cps.toFixed(2) + " CPS";
    historyList.appendChild(historyItem);

    if (cps > parseFloat(bestRecord.textContent)) {
        bestRecord.textContent = cps.toFixed(2) + " CPS";
    }

    modeSelect.disabled = false;
    startBtn.disabled = false;
    delay = 3;
}

// Event listeners
modeSelect.addEventListener("change", () => {
    mode = parseInt(modeSelect.value);
});

startBtn.addEventListener("click", () => {
    clicks = 0;
    startTimer();
});

cpsBtn.addEventListener("click", () => {
    if (delay === 0) {
        clicks++;
    }
});

clearHistoryBtn.addEventListener("click", () => {
    history = [];
    historyList.innerHTML = "";
    bestRecord.textContent = "0 CPS";
});
