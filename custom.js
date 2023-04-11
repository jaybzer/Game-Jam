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
    IntervId = setInterval(createDuck, 2000);

}

function End() {
    document.getElementById("no-ammo").style.display = 'block';
    clearInterval(IntervId);
    start = false;
}

function shoot(bird){
    
    if (bullets != 0){
    bird.style.display= 'none';
    document.getElementById("currentScore").innerHTML = ++count;
    }
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


const duckSize = 40;
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

// Fonction pour créer un canard de façon aléatoire

function createDuck() {
    let duck = document.createElement('img');
    duck.style.position = 'absolute';
    duck.style.width = duckSize + 'px';
    duck.style.height = duckSize + 'px';
    duck.style.transition='img/duck.gif';
    duck.setAttribute("src", "img/duck.gif");

    
    duck.style.top = Math.floor(Math.random() * (windowHeight - duckSize)) + 'px';

    // Déterminer la direction de l'apparition du canard (de gauche à droite ou de droite à gauche)
    let direction = Math.floor(Math.random() * 2);
    if (direction === 0) { // de gauche à droite
        
        let speed = Math.floor(Math.random() * 5) + 1;
        moveSquareRight(duck, speed);
    } else { // de droite à gauche
        duck.style.transform='scaleX(-1)';
        let speed = Math.floor(Math.random() * 5) + 1;
        moveSquareLeft(duck, speed);
    }

    // Ajouter l'événement de clic pour supprimer le canard
    duck.addEventListener('click', function() {
        if (bullets != 0){
        console.log(count);
        document.getElementById("currentScore").innerHTML = ++count;
        killDuck(duck, "UserKill")
        } // Supprimer le canard
    }, {once: true});

    // Ajouter le canard à la page web
    document.body.appendChild(duck);
}

// Fonction pour faire bouger le canard de gauche à droite
function moveSquareRight(duck, speed) {
    let position = -duckSize;
    let interval = setInterval(function () {
        position += speed;
        duck.style.left = position + 'px';
        if (position > windowWidth) {
            clearInterval(interval);
            killDuck(duck, "left");
        }
    }, 20);
}

// Fonction pour faire bouger le canard de droite à gauche
function moveSquareLeft(duck, speed) {
    let position = windowWidth;
    let interval = setInterval(function () {
        position -= speed;
        duck.style.left = position + 'px';
        if (position < -duckSize) {
            clearInterval(interval);
            killDuck(duck, "right");
        }
    }, 20);
}

// Fonction pour supprimer le canard
function killDuck(duck, msg) {
    duck.remove();
        console.log('KillDuck ' + msg);
}
