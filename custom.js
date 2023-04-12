let bullets = 30;
let count = 0;
let start = false;
let paused = false;
let elapsedTime = 0;
let totalGameTime = 60;
let timeRemaining = totalGameTime;
let timerInterval;
let IntervId1;
let IntervId2;
let birds = [];

window.onload = function () {
  document.getElementById("currentScore").innerHTML = count;
  document.getElementById("currentAmmo").innerHTML = bullets;
};

function Start() {

  let timerDisplay = document.getElementById("time");
  start = true;
  bullets = 30;
  count = 0;
  bullets++;
  document.getElementById("end").style.display = 'none';
  document.getElementById("play").style.display = "none";
  document.getElementById("title").style.display = "none";
  document.getElementById("pause").style.display = "block";
  document.getElementById("menu-pause").style.display = "none";
  document.getElementById("currentScore").innerHTML = count;
  document.getElementById("currentAmmo").innerHTML = bullets;
  timerDisplay.textContent = timeRemaining;

  IntervId1 = setInterval(function() { createBird('duck') }, 2000);
  IntervId2 = setInterval(function() { createBird('hummingbird') }, 5000);


  timerInterval = setInterval(() => {
    timeRemaining--;
    timerDisplay.textContent = timeRemaining;
    if (timeRemaining === 0) {
      setTimeout(() => End('time'));
      clearInterval(timerInterval);
    }
  }, 1000);
}


// Fonction au clic sur le bouton pause
function Pause() {
    paused = true;
    console.log("in p fonction" + paused);
  document.getElementById("menu-pause").style.display = "block";
}

// Fonction au clic sur le bouton reprendre
function Resume() {
    document.getElementById("menu-pause").style.display = "none";
    setTimeout(() => {
        paused = false;
      }, "100");
      
}


function End(type) {
    switch (type) {
        case 'time':
        document.getElementById("end-message").innerHTML = "C'est fini, le temps est écoulé... ";
        break;
        case 'ammo': 
        document.getElementById("end-message").innerHTML = "C'est fini, vous n'avez plus de munition ";
        break;
    }
    document.getElementById("end").style.display = 'block';
    clearInterval(IntervId1);
    clearInterval(IntervId2);
    clearInterval(timerInterval);
    timeRemaining = 60;
    start = false;
    birds.forEach(function(bird) {
        bird.remove();
      });
}

window.onclick = function() { 
    console.log("before cond" + paused);
    if(start != false && paused == false){
        if (bullets != 1){
            console.log("after cond" +paused);
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
    if (paused == false) {
    let bird = document.createElement('img');
    bird.style.position = 'absolute';
    bird.style.width = birdSize + 'px';
    bird.style.height = birdSize + 'px';
    bird.style.top = Math.floor(Math.random() * (windowHeight - birdSize)) + 'px';
    birds.push(bird);
    switch (type) {
        case 'duck': 
        bird.setAttribute("src", "img/duck.gif");
        break;
        case 'hummingbird': 
        bird.setAttribute("src", "img/flutter.gif");
        break;
    }
    let speed = Math.floor(Math.random() * 5) + 1;
    // Déterminer la direction de l'apparition du canard (de gauche à droite ou de droite à gauche)
    let direction = Math.floor(Math.random() * 2);
    if (direction === 0) { // de gauche à droite

        moveSquareRight(bird, speed);
    } else { // de droite à gauche
        bird.style.transform='scaleX(-1)';

        moveSquareLeft(bird, speed);
    }

    // Ajouter l'événement de clic pour supprimer le canard
    bird.addEventListener('click', function() {
        if (bullets != 0){
        killBird(bird, "UserKill")
        document.getElementById("currentScore").innerHTML = ++count;
        } // Supprimer le canard
    }, {once: true});

    // Ajouter le canard à la page web
    document.body.appendChild(bird);
    }
   }


// Fonction pour faire bouger le canard de gauche à droite
function moveSquareRight(bird, speed) {
    if (paused == false){
    let position = -birdSize;
    let interval = setInterval(function () {
        position += speed;
        bird.style.left = position + 'px';
        if (position > windowWidth) {
            clearInterval(interval);
            killBird(bird, "left");
        }
    }, 20);
 }
}

function moveSquareLeft(bird, speed) {
    if (paused == false){
    let position = windowWidth;
    let interval = setInterval(function () {
        position -= speed;
        bird.style.left = position + 'px';
        if (position < -birdSize) {
            clearInterval(interval);
            killBird(bird, "right");
        }
    }, 20);
}
}

// Fonction pour supprimer le canard
function killBird(bird) {

    bird.remove();

}

