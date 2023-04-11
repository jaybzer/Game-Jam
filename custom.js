let bullets = 30; 
let count = 0; 
let start = false; 
let IntervId;

window.onload = function() {
    document.getElementById("currentScore").innerHTML = count;
    document.getElementById("currentAmmo").innerHTML = bullets;
  };

function Start() {
    start = true;
    bullets = 30;
    count = 0;
    bullets++;
    document.getElementById("play").style.display = 'none';
    document.getElementById("no-ammo").style.display = 'none';
    document.getElementById("currentScore").innerHTML = count;
    document.getElementById("currentAmmo").innerHTML = bullets;
    IntervId = setInterval(function() { createBird('duck') }, 2000);
    IntervId = setInterval(function() { createBird('hummingbird') }, 5000);

}

function End() {
    document.getElementById("no-ammo").style.display = 'block';
    clearInterval(IntervId);
    start = false;
}

window.onclick = function() { 
    if(start != false){
        if (bullets != 1){
	    document.getElementById("currentAmmo").innerHTML=--bullets;
        }
        else {
            document.getElementById("currentAmmo").innerHTML=--bullets;
            End();            
        }
    }
}


const birdSize = 40;
const hummingbirdSize = 60;
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

// Fonction pour créer un canard de façon aléatoire

function createBird(type) {
    let bird = document.createElement('img');
    bird.style.position = 'absolute';
    bird.style.width = birdSize + 'px';
    bird.style.height = birdSize + 'px';
    bird.style.top = Math.floor(Math.random() * (windowHeight - birdSize)) + 'px';
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

// Fonction pour faire bouger le canard de gauche à droite
function moveSquareRight(bird, speed) {
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

// Fonction pour faire bouger le canard de droite à gauche
function moveSquareLeft(bird, speed) {
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

// Fonction pour supprimer le canard
function killBird(bird, msg) {

    bird.remove();
      
}
