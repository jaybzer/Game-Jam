let bullets = 5; 
let count = 0; 
let start = false; 
let nbBirds = 3;

window.onload = function() {
    document.getElementById("currentScore").innerHTML = count;
    document.getElementById("currentAmmo").innerHTML = bullets;
  };

function Start() {
    start = true;
    bullets = 5;
    count = 0;
    bullets++;
    document.getElementById("play").style.display = 'none';
    document.getElementById("currentScore").innerHTML = count;
    document.getElementById("currentAmmo").innerHTML = bullets;
    for (let i = 1; i<nbBirds++; i++ ){
        document.getElementById("b"+i).style.animationName = "bird"+i; 
    }


}

function shoot(bird){
    
    if (bullets != 0){
    bird.style.display= 'none';
    document.getElementById("currentScore").innerHTML = ++count;
    }
}


window.onclick = function() { 
    if(start != false){
        if (bullets != 0){
	    bullets--; 
	    document.getElementById("currentAmmo").innerHTML=bullets;
        }
        else {
            alert("Vous n'avez plus de munitions");
            document.getElementById("play").style.display = 'block';
            for (let i = 1; i<nbBirds++; i++ ){
                document.getElementById("b"+i).style.animationName = "none";
                document.getElementById("b"+i).style.display = 'block';
            }
            
        }
    }
}


