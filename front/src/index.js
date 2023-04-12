// Définir les variables pour la taille du canard et les limites de la fenêtre du naviguateur
const duckSize = 40;
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

// Fonction pour créer un canard de façon aléatoire

let score = 0;
function createDuck() {
    score++;
    console.log(score);
    let duck = document.createElement('div');
    duck.style.position = 'absolute';
    duck.style.width = duckSize + 'px';
    duck.style.height = duckSize + 'px';
    duck.style.backgroundColor = 'red';
    duck.style.top = Math.floor(Math.random() * (windowHeight - duckSize)) + 'px';

    // Déterminer la direction de l'apparition du canard (de gauche à droite ou de droite à gauche)
    let direction = Math.floor(Math.random() * 2);
    if (direction === 0) { // de gauche à droite
        let speed = Math.floor(Math.random() * 5) + 1;
        moveSquareRight(duck, speed);
    } else { // de droite à gauche
        let speed = Math.floor(Math.random() * 5) + 1;
        moveSquareLeft(duck, speed);
    }

    // Ajouter l'événement de clic pour supprimer le canard
    duck.addEventListener('click', function() {
        console.log(score);
        killDuck(duck, "UserKill") // Supprimer le canard
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
        score--;
        console.log('KillDuck ' + msg);
        console.log(score);
}


// Créer un canard toutes les 2 secondes
setInterval(createDuck, 2000);
