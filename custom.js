let bullets = 50;
let count = 0;
let start = false;
let paused = false;
let elapsedTime = 0;
let totalGameTime = 60;
let timeRemaining = totalGameTime;
let timerInterval;
let IntervId1;
let IntervId2;
let IntervId3;
const birdSize = 40;
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
let birds = []
let difficulty = 'Facile'; // niveau de difficulté par défaut

const difficultyParams = {
    'Facile': { // Paramètres pour le niveau easy
        birdInterval: 2000,
        birdSpeed: 3
    },
    'Intermediaire': { // Paramètres pour le niveau medium
        birdInterval: 1000,
        birdSpeed: 5
    },
    'Difficile': { // Paramètres pour le niveau hard
        birdInterval: 500,
        birdSpeed: 7
    },
    '?': { // Paramètres pour le niveau insane
        birdInterval: 100,
        birdSpeed: 10
    }
}
let { birdInterval, birdSpeed } = difficultyParams[difficulty];


window.onload = function () {
  document.getElementById("currentScore").innerHTML = count;
  document.getElementById("currentAmmo").innerHTML = bullets;
};

// Choix de la difficulté dans le menu
function ChooseDifficulty(id) {
    let difficulties = document.querySelectorAll('.difficulty');
    let dif = document.getElementById(id);
    difficulties.forEach(element => {
        element.classList.remove('active');
    });
    dif.classList.add("active");
    difficulty = id;
}

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
    bullets = 50;
    count = 0;
    bullets++
    document.getElementById("end").style.display = 'none';
    document.getElementById("play").style.display = "none";
    document.getElementById("title").style.display = "none";
    document.getElementById("title-bg").style.display = "none";
    document.getElementById("pause").style.display = "block";
    document.getElementById("menu-pause").style.display = "none";
    document.getElementById("currentScore").innerHTML = count;
    document.getElementById("currentAmmo").innerHTML = bullets;
    timerDisplay.textContent = timeRemaining;

    changeDifficulty(difficulty);
    document.getElementById("level").innerHTML = difficulty;
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
    clearInterval(IntervId3);
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



// Fonction pour créer un canard de façon aléatoire

function createBird(type) {
    if (!paused) {
    let bird = document.createElement('img');
    bird.style.position = 'absolute';
    bird.style.width = birdSize + 'px';
    bird.style.height = birdSize + 'px';
    bird.style.top = Math.floor(Math.random() * (windowHeight - birdSize)) + 'px';
    let speed; 
    switch (type) {
        case 'duck': 
        bird.setAttribute("src", "img/duck.gif");
        bird.setAttribute("class", "duck");
        speed = Math.floor(Math.random() * 3) + birdSpeed;
        break;
        case 'hummingbird': 
        bird.setAttribute("src", "img/flutter.gif");
        bird.setAttribute("class", "hummingbird");
        speed = Math.floor(Math.random() * 3) + birdSpeed;
        break;
        case 'ufo': 
        bird.setAttribute("src", "img/ufo.gif");
        bird.setAttribute("class", "ufo");
        speed = 16;
        break;
    }
    
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
       
        
        switch (bird.getAttribute("class")) {
            case "duck":
            document.getElementById("currentScore").innerHTML = ++count;
            break;
            case "hummingbird":
            document.getElementById("currentScore").innerHTML = --count;
            break;
            case "ufo":
            count += 3
            document.getElementById("currentScore").innerHTML = count;
            console.log(count);
            break;
           }
            checkScore();
           killBird(bird, "UserKill")
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

function checkScore() {
    switch (difficulty) {
        case "Facile":
            if (count >=10) {
                changeDifficulty("Intermediaire");
                bullets += 15
                document.getElementById("currentAmmo").innerHTML=bullets;
                timeRemaining += 18;
            }
        break;
        case "Intermediaire":
            if (count >=20) {
                changeDifficulty("Difficile");
                bullets += 15
                document.getElementById("currentAmmo").innerHTML=bullets;
                timeRemaining += 18;
            }
        break;
        case "Difficile":
            if (count >=30) {
                changeDifficulty("?");
                bullets += 15
                document.getElementById("currentAmmo").innerHTML=bullets;
                timeRemaining += 18;
            }
        break;
       }
}
function changeDifficulty(newDifficulty) {
    difficulty = newDifficulty;
    document.getElementById("level").innerHTML = newDifficulty;
    birdSpeed = difficultyParams[newDifficulty].birdSpeed;
    if (IntervId1 || IntervId2 || IntervId3){
        clearInterval(IntervId1); 
        clearInterval(IntervId2);
        clearInterval(IntervId3);
    }
    IntervId1 = setInterval(function() { createBird('duck') }, difficultyParams[newDifficulty].birdInterval);
    IntervId2 = setInterval(function() { createBird('hummingbird') },  difficultyParams[newDifficulty].birdInterval*2);
    IntervId3 = setInterval(function() { createBird('ufo') },  difficultyParams[newDifficulty].birdInterval*5);    
}