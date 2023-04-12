let bullets = 70;
let count = 0;
let start = false;
let paused = false;
let elapsedTime = 0;
let totalGameTime = 60;
let timeRemaining = totalGameTime;
let timerInterval;
let IntervId1;
let IntervId2;
let birds = []
let difficulty = 'easy'; // niveau de difficulté par défaut


const difficultyParams = {
    'easy': { // Paramètres pour le niveau easy
        birdInterval: 2000,
        birdSpeed: 5
    },
    'medium': { // Paramètres pour le niveau medium
        birdInterval: 1000,
        birdSpeed: 7
    },
    'hard': { // Paramètres pour le niveau hard
        birdInterval: 500,
        birdSpeed: 10
    },
    'insane': { // Paramètres pour le niveau insane
        birdInterval: 100,
        birdSpeed: 15
    }
}

let { birdInterval, birdSpeed } = difficultyParams[difficulty];


window.onload = function () {
  document.getElementById("currentScore").innerHTML = count;
  document.getElementById("currentAmmo").innerHTML = bullets;
};

function Start() {

  let timerDisplay = document.getElementById("time");
  let pseudo = document.getElementById("pseudo");

  if (!pseudo.value) {
    document.querySelector(".errorPseudo").style.display = "inline";
  } else {
    document.querySelector(".pseudo").innerHTML = pseudo.value;
    pseudo.style.display = "none";
    document.querySelector(".errorPseudo").style.display = "none";
  start = true;
  bullets = 70;
  count = 0;
  bullets++;
  document.getElementById("end").style.display = 'none';
  document.getElementById("play").style.display = "none";
  document.getElementById("title").style.display = "none";
  document.getElementById("title-bg").style.display = "none";
  document.getElementById("pause").style.display = "block";
  document.getElementById("menu-pause").style.display = "none";
  document.getElementById("currentScore").innerHTML = count;
  document.getElementById("currentAmmo").innerHTML = bullets;
  timerDisplay.textContent = timeRemaining;

  IntervId1 = setInterval(function() { createBird('duck') }, birdInterval);
  IntervId2 = setInterval(function() { createBird('hummingbird') }, birdInterval * 2.5);

  timerInterval = setInterval(() => {
    if (start) {
        timeRemaining--;
        timerDisplay.textContent = timeRemaining;
    }
    if (timeRemaining === 0) {
      setTimeout(() => End('time'));
      clearInterval(timerInterval);
    }
  }, 1000);
  }
}


// Fonction au clic sur le bouton pause
function Pause() {
    paused = true;
    document.getElementById("menu-pause").style.display = "block";
    start = false;
}

// Fonction au clic sur le bouton reprendre
function Resume() {
    document.getElementById("menu-pause").style.display = "none";
    start = true;
    start = true;
    setTimeout(() => {
        paused = false;
      }, "100")
}


function End(type) {
    switch (type) {
        case 'time':
        document.getElementById("end-message").innerHTML = "C'est fini, le temps est écoulé... ";
        document.getElementById("end").style.display = 'block';
        break;
        case 'ammo': 
        document.getElementById("end-message").innerHTML = "C'est fini, vous n'avez plus de munitions... ";
        document.getElementById("end").style.display = 'block';
        break;
        case 'return':
        document.getElementById("menu-pause").style.display = "none";
        paused = false;
        document.getElementById("title").style.display = "block";
        document.getElementById("title-bg").style.display = "block";
        document.getElementById("play").style.display = "inline-block";
        break;
        case 'restart':
        document.getElementById("menu-pause").style.display = "none";
        paused = false;
        document.getElementById("title").style.display = "block";
        break;
    }
    document.getElementById("pause").style.display = "none";
    clearInterval(IntervId1);
    clearInterval(IntervId2);
    clearInterval(timerInterval);

    timeRemaining = 60;
    start = false;
    birds.forEach(function(bird) {
        bird.remove();
      });
      if(type == 'restart'){
        Start();
      }

}

window.onclick = function() { 
    if(start && !paused){
        if (bullets != 1){
            document.getElementById("shot").play()
            document.getElementById("currentAmmo").innerHTML=--bullets;
            }
        else {
            document.getElementById("currentAmmo").innerHTML=--bullets;
            End('ammo');            
        }
    }

}


const birdSize = 40;
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

// Fonction pour créer un canard de façon aléatoire

function createBird(type) {
    if (!paused) {
    let bird = document.createElement('img');
    bird.style.position = 'absolute';
    bird.style.width = birdSize + 'px';
    bird.style.height = birdSize + 'px';
    bird.style.top = Math.floor(Math.random() * (windowHeight - birdSize)) + 'px';
    switch (type) {
        case 'duck': 
        bird.setAttribute("src", "img/duck.gif");
        bird.setAttribute("class", "duck");
        break;
        case 'hummingbird': 
        bird.setAttribute("src", "img/flutter.gif");
        bird.setAttribute("class", "hummingbird");
        break;
    }
    // Déterminer la direction de l'apparition du canard (de gauche à droite ou de droite à gauche)
    let direction = Math.floor(Math.random() * 2);
    birds.push(bird);
    if (direction === 0) { // de gauche à droite

        moveSquareRight(bird, birdSpeed);
    } else { // de droite à gauche
        bird.style.transform='scaleX(-1)';

        moveSquareLeft(bird, birdSpeed);
    }

    // Ajouter l'événement de clic pour supprimer le canard
    bird.addEventListener('click', function() {
        if (bullets != 0 && !paused){
        killBird(bird, "UserKill")
        switch (bird.getAttribute("class")) {
            case "duck":
            document.getElementById("currentScore").innerHTML = ++count;
            break;
            case "hummingbird":
            document.getElementById("currentScore").innerHTML = --count;
            break;
           }
          }
    }, {once: true}); // Supprimer le canard

    // Ajouter le canard à la page web
    document.body.appendChild(bird);
    }
   }


// Fonction pour faire bouger le canard de gauche à droite
function moveSquareRight(bird, speed) {
    let position = -birdSize;
    let interval = setInterval(function () {
        if (!paused) {
        position += speed;
        bird.style.left = position + 'px';
        if (position > windowWidth) {
            clearInterval(interval);
            killBird(bird, "left");
        }
    }}, 20);
 }


function moveSquareLeft(bird, speed) {

    let position = windowWidth;
    let interval = setInterval(function () {
        if (!paused) {
        position -= speed;
        bird.style.left = position + 'px';
        if (position < -birdSize) {
            clearInterval(interval);
            killBird(bird, "right");
        }
    }}, 20);
}


// Fonction pour supprimer le canard
function killBird(bird, msg) {
    bird.remove();

}

function changeDifficulty(newDifficulty) {
    //TODO: probleme avec le changement d'apparition des canards (birdInterval)
    birdSpeed = difficultyParams[newDifficulty].birdSpeed;
    IntervId1 = setInterval(function() { createBird('duck') }, difficultyParams[newDifficulty].birdInterval);
    IntervId2 = setInterval(function() { createBird('hummingbird') },  difficultyParams[newDifficulty].birdInterval);
    }