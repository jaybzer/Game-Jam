let bullets = 5; 
let count = 0; 



window.onload = function() {
    document.getElementById("currentScore").innerHTML = count;
    document.getElementById("currentAmmo").innerHTML = bullets;
  };



function shoot(bird){
    
    if (bullets != 0){
    bird.style.display= 'none';
    document.getElementById("currentScore").innerHTML = ++count;
    }
}


window.onclick = function() { 
    console.log("yes");
    if (bullets != 0){
	bullets--; 
    console.log(bullets);
	document.getElementById("currentAmmo").innerHTML=bullets;
    }
    else {
        console.log("yno");
        alert("Vous n'avez plus de munitions");
    }
}


