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
  level = 1; 
  bullets++;

  document.getElementById("level").innerHTML = level;
  document.getElementById("end").style.display = 'none';
  document.getElementById("title").style.display = "none";
  document.getElementById("pause").style.display = "block";
  document.getElementById("menu-pause").style.display = "none";
  document.getElementById("currentScore").innerHTML = count;
  document.getElementById("currentAmmo").innerHTML = bullets;
  timerDisplay.textContent = timeRemaining;

  IntervId1 = setInterval(function() { createBird('duck') }, 2000);
  IntervId2 = setInterval(function() { createBird('hummingbird') }, 5000);

  timerInterval = setInterval(() => {
    if (start) {
        timeRemaining--;
        timerDisplay.textContent = timeRemaining;
    }
    if (timeRemaining === 0) {
      setTimeout(() => End('time'));
      clearInterval(timerInterval);
    }
  }, 1000);}
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
    paused = false;
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
        break;
        case 'restart': 
        document.getElementById("menu-pause").style.display = "none";
        paused = false;
        document.getElementById("title").style.display = "block";
        break;
    }
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
    let speed = Math.floor(Math.random() * 5) + 1;
    // Déterminer la direction de l'apparition du canard (de gauche à droite ou de droite à gauche)
    let direction = Math.floor(Math.random() * 2);
    birds.push(bird);
    if (direction === 0) { // de gauche à droite

        moveSquareRight(bird, speed);
    } else { // de droite à gauche
        bird.style.transform='scaleX(-1)';

        moveSquareLeft(bird, speed);
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
        } // Supprimer le canard
    , {once: true});

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
function killBird(bird) {

    bird.remove();

}

