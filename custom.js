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
  document.getElementById("no-ammo").style.display = 'none';
  document.getElementById("play").style.display = "none";
  document.getElementById("title").style.display = "none";
  document.getElementById("title-bg").style.display = "none";
  document.getElementById("pause").style.display = "block";
  document.getElementById("menu-pause").style.display = "none";
  document.getElementById("currentScore").innerHTML = count;
  document.getElementById("currentAmmo").innerHTML = bullets;
  timerDisplay.textContent = timeRemaining;

  IntervId1 = setInterval(function() { createBird('duck') }, 2000);
  IntervId2 = setInterval(function() { createBird('hummingbird') }, 5000);

  timerInterval = setInterval(() => {
    let score = document.querySelector("#currentScore").textContent;
    if (start) {
        timeRemaining--;
        timerDisplay.textContent = timeRemaining;
    }
    if (timeRemaining === 0) {
      setTimeout(() => End('time'));
           //ajout en base
        // addScoreInRanking({ pseudo: pseudo.value, score: score });
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
                 //Ajout en base du pseudo et du score
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

function openModal() {
  document.getElementById("myModal").style.display = "block";
  getScoreInRanking();
}
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

window.onclick = function (event) {
  if (event.target == document.getElementById("myModal")) {
    closeModal();
  }
};

async function addScoreInRanking(data) {
  console.log(data);
  let scoreToAdd = { pseudo: data.pseudo, score: data.score };
  console.log("scoreToAdd", scoreToAdd);
  await fetch("addRank.js", {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(scoreToAdd),
  });
}
async function getScoreInRanking() {
  let modalRanking = document.querySelector(".modal-content");

  const request = await fetch("ranking.json");
  const ranking = await request.json();
  const rankingSorted = ranking.sort((a, b) => b.score - a.score);

  for (i = 0; i < 5; i++) {
    console.log(rankingSorted[i]);
    let createDiv = document.createElement("div");
    createDiv.classList.add("containerTop5");
    createPseudo = document.createElement("p");
    createPseudo.classList.add("name");
    createScore = document.createElement("p");
    createScore.classList.add("score");
    createPseudo.innerHTML = rankingSorted[i].pseudo;
    createScore.innerHTML = rankingSorted[i].score + " points";

    createDiv.appendChild(createPseudo);
    createDiv.appendChild(createScore);
    modalRanking.appendChild(createDiv);
  }
}
