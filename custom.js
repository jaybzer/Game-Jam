let bullets = 5;
let count = 0;
let start = false;
let nbBirds = 3;
let elapsedTime = 0;
const totalGameTime = 60;
let timeRemaining = totalGameTime;

window.onload = function () {
  document.getElementById("currentScore").innerHTML = count;
  document.getElementById("currentAmmo").innerHTML = bullets;
};

function Start() {
  let timerDisplay = document.getElementById("time");
  start = true;
  bullets = 5;
  count = 0;
  bullets++;
  document.getElementById("play").style.display = "none";
  document.getElementById("currentScore").innerHTML = count;
  document.getElementById("currentAmmo").innerHTML = bullets;

  for (let i = 1; i <= nbBirds; i++) {
    document.getElementById("b" + i).style.animationName = "bird" + i;
  }

  timerDisplay.textContent = timeRemaining;

  const timerInterval = setInterval(() => {
    timeRemaining--;
    timerDisplay.textContent = timeRemaining;
    if (timeRemaining === 0) {
      setTimeout(() => alert("Temps écoulé !"));
      clearInterval(timerInterval);
    }
  }, 1000);
}

function shoot(bird) {
  if (bullets != 0) {
    bird.style.display = "none";
    document.getElementById("currentScore").innerHTML = ++count;
  }
}

window.onclick = function () {
  if (start != false) {
    if (bullets != 0) {
      bullets--;
      document.getElementById("currentAmmo").innerHTML = bullets;
    } else {
      alert("Vous n'avez plus de munitions");
      document.getElementById("play").style.display = "block";
      for (let i = 1; i < nbBirds++; i++) {
        document.getElementById("b" + i).style.animationName = "none";
        document.getElementById("b" + i).style.display = "block";
      }
    }
  }
};
