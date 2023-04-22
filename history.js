// Initialize variables
let historyList = document.getElementById("history-list");
let clearHistoryBtn = document.getElementById("clear-history-btn");
let bestRecord = document.getElementById("best-record");

// Load history from local storage
let history = JSON.parse(localStorage.getItem("history")) || [];

// Display history on page load
displayHistory();

// Add event listener to clear history button
clearHistoryBtn.addEventListener("click", clearHistory);

// Function to display history on page
function displayHistory() {
  // Clear history list
  historyList.innerHTML = "";

  // Loop through history array and add each item to the list
  for (let i = 0; i < history.length; i++) {
    let listItem = document.createElement("li");
    listItem.innerText = history[i] + " CPS";
    historyList.appendChild(listItem);
  }

  // Update best record
  let maxRecord = Math.max(...history);
  bestRecord.innerText = maxRecord + " CPS";
}

// Function to add new record to history
function addRecord(cps) {
  history.push(cps);
  localStorage.setItem("history", JSON.stringify(history));
  displayHistory();
}

// Function to clear history
function clearHistory() {
  history = [];
  localStorage.removeItem("history");
  displayHistory();
}
