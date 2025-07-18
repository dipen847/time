const start = document.getElementById("start");
const stops = document.getElementById("stop");
const reset = document.getElementById("reset");
const timer = document.getElementById("timer");
let isRunning = false;
let startingTime = 0;
let elapsedTime = 0;
let timerss = null;
let hasJumped = false;

function updateClock(){
    const time = new Date();
    const hours = time.getHours();
    let real_hours;
    let timeofday;
    if (hours === 0) {
        real_hours = 12;
        timeofday = "AM";
    } else if (hours === 12) {
        real_hours = 12;
        timeofday = "PM";
    } else if (hours > 12) {
        real_hours = hours - 12;
        timeofday = "PM";
    } else {
        real_hours = hours;
        timeofday = "AM";
    }
    const minutes = time.getMinutes().toString().padStart(2,0);
    const seconds = time.getSeconds().toString().padStart(2,0);
    const timeString = `${real_hours}:${minutes}:${seconds} ${timeofday}`;
    document.getElementById("current_time").textContent = timeString; 
}



start.onclick = function(){
    if(!isRunning){
        startingTime = Date.now() - elapsedTime;  
        timerss = setInterval(update, 10);
        isRunning = true;
    }

}

stops.onclick = function(){
    if (isRunning) {
        clearInterval(timerss);
        isRunning = false;
    } else {
        startingTime = Date.now() - elapsedTime * 1000;
        timerss = setInterval(update, 10);
        isRunning = true;
    }
}

reset.onclick = function(){
    clearInterval(timerss);
    elapsedTime = 0;
    startingTime = 0;
    isRunning = false;
    document.getElementById("timer").textContent = "00:00:00:00";
}

function update(){
    let original = Date.now() - startingTime
    elapsedTime = (original)/1000;

    let hours = Math.floor(elapsedTime / 3600).toString().padStart(2,'0');
    let minutes = Math.floor((elapsedTime % 3600) / 60).toString().padStart(2,'0');
    let seconds = Math.floor(elapsedTime % 60).toString().padStart(2,'0');
    let milli = Math.floor((original%1000/10)).toString().padStart(2,'0');
    
    document.getElementById("timer").textContent = `${hours}:${minutes}:${seconds}:${(milli)}`
}

updateClock();
setInterval(updateClock, 100);