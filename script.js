let timerInterval;
let startTime;
let elapsedTime = 0;
let isRunning = false;

function formatTime(ms) {
  const totalMilliseconds = ms;
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const milliseconds = String(Math.floor((totalMilliseconds % 1000) / 10)).padStart(2, '0'); // hundredths

  return `${hours} : ${minutes} : ${seconds} : ${milliseconds}`;
}

function updateTimeDisplay() {
  const currentTime = Date.now() - startTime + elapsedTime;
  document.getElementById("time").innerText = formatTime(currentTime);
}

function startPause() {
  const button = document.getElementById("startPauseBtn");

  if (!isRunning) {
    startTime = Date.now();
    timerInterval = setInterval(updateTimeDisplay, 10); // update every 10ms
    button.innerText = "Pause";
    isRunning = true;
  } else {
    clearInterval(timerInterval);
    elapsedTime += Date.now() - startTime;
    button.innerText = "Start";
    isRunning = false;
  }
}

function reset() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  isRunning = false;
  document.getElementById("time").innerText = "00 : 00 : 00 : 00";
  document.getElementById("startPauseBtn").innerText = "Start";
  document.getElementById("laps").innerHTML = "";
}

function lap() {
  if (isRunning) {
    const lapTime = document.getElementById("time").innerText;
    const li = document.createElement("li");
    li.innerText = `Lap: ${lapTime}`;
    document.getElementById("laps").appendChild(li);
  }
}
