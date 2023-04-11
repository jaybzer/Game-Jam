let bullets = 5; 
let count = 0; 

function shoot(bird){
    bird.style.display= 'none';
    document.getElementById("score").innerHTML = ++count;
    console.log(count);
}
