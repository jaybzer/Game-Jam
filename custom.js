let bullets = 5; 
let count = 0; 

window.onload = function() {
    document.getElementById("currentScore").innerHTML = count;
    document.getElementById("currentAmmo").innerHTML = bullets;
  };


function shoot(bird){
    bullets--;
    if (bullets != 0){
    bird.style.display= 'none';
    document.getElementById("currentScore").innerHTML = ++count;
    document.getElementById("currentAmmo").innerHTML = bullets;
    }
    else {
        alert("Vous n'avez plus de munitions");
    }
}
