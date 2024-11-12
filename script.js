const display = document.querySelector('.display');
const startPauseButton = document.getElementById('start-pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapTimesList = document.getElementById('lap-times');

let intervalId;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let isRunning = false;

function updateDisplay()
{
    display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`
}

function startPause() {
    if (isRunning) {
        clearInterval(intervalId);
        startPauseButton.textContent = 'Start';
    } else {
        intervalId = setInterval(() => {
            milliseconds++;
            if (milliseconds === 100) {
                milliseconds = 0;
                seconds++;
            }
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            updateDisplay();
        }, 10);
        startPauseButton.textContent = 'Pause';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(intervalId);
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    updateDisplay();
    lapTimesList.innerHTML = '';
    startPauseButton.textContent = 'Start';
    isRunning = false;
}
function lap() {
    if (isRunning) {
        const lapTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`
        const li = document.createElement('li');
        li.textContent = lapTime;
        lapTimesList.appendChild(li);
    }
}

startPauseButton.addEventListener('click', startPause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);