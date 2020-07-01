//le terrain de jeu
let zonejeu = document.querySelector("#zonejeu");

// le joueur
let player = document.querySelector("#joueur");

const ennemies = [].slice.call(document.querySelectorAll('.ennemi'));


//mur
let murs = document.querySelectorAll('.mur');


let life = 5;

let vie = document.querySelector("#vie");




let audioElement = new Audio('./assets/son/1807.wav');
let audioElement1 = new Audio('./assets/son/1024.wav');

audioElement.volum = 0.05;

audioElement1.volum = 0.20;

//tableau des directions qui nous sera utile pour deplacer les ennemis 
const directions = ["up", "down", "left", "right"];

//fonction qui gére un chiffre random
function getRandomizer(bottom, top) {

    return Math.floor(Math.random() * (bottom - top + 1)) + top;
}


//fonction permet de recupérer les propiété d'un element
function getProperty(element, Property) {

    return parseInt(window.getComputedStyle(element).getPropertyValue(Property));
}

// fonction de deplacement du joueur
function move(p, d) {
    const leftElement = getProperty(p, "left");
    const topElement = getProperty(p, "top");

    switch (d) {
        case "up":
            

            Boolean=false;
            for(let i = 0; i<murs.length; i++){
                let topMur = getProperty(murs[i], "top");
                let leftMur = getProperty(murs[i],"left");
                
                if(topMur + 50 == topElement && leftMur == leftElement){
                    Boolean = true;
                    break;
                }
            };
            if (topElement > 0 && Boolean == false) {
                p.style.top = topElement - 50 + "px";
            }
           
            else {
                audioElement.play()
            }
            break;

        case "down":
            

            Boolean=false;
            for(let i = 0; i<murs.length; i++){
                let topMur = getProperty(murs[i], "top");
                let leftMur = getProperty(murs[i],"left");
                
                if(topMur == topElement + 50 && leftMur == leftElement){
                    Boolean = true;
                    break;
                }
            };
            if (topElement < 600 && Boolean == false ) {
                p.style.top = topElement + 50 + "px";
            }
            else {
                audioElement.play()
            }
            break;

        case "left":
            Boolean=false;
            for(let i = 0; i<murs.length; i++){
                let topMur = getProperty(murs[i], "top");
                let leftMur = getProperty(murs[i],"left");
                
                if(topMur == topElement  && leftMur +50 == leftElement){
                    Boolean = true;
                    break;
                }
            };
            if (leftElement > 0 && Boolean == false) {
                p.style.left = leftElement - 50 + "px";
            }
            else {
                audioElement.play()
            }
            break;

        case "right":
            Boolean=false;
            for(let i = 0; i<murs.length; i++){
                let topMur = getProperty(murs[i], "top");
                let leftMur = getProperty(murs[i],"left");
                
                if(topMur == topElement  && leftMur == leftElement + 50){
                    Boolean = true;
                    break;
                }
            };
            if (leftElement < 600 && Boolean == false) {
                p.style.left = leftElement + 50 + "px";
            }
            else {
                audioElement.play()
            }
            break;
    }
    PlayerEnnemi();
}

//deplacement de l'ennemi
function move1(en, d) {
    const leftElement = getProperty(en, "left");
    const topElement = getProperty(en, "top");

        

    switch (d) {
        case "up":
            if (topElement > 0 ) {
                en.style.top = topElement - 50 + "px";
            }
            break;

        case "down":
            if (topElement < 600) {
                en.style.top = topElement + 50 + "px";
            }
            break;

        case "left":
            if (leftElement > 0 ) {
                en.style.left = leftElement - 50 + "px";
            }
            break;

        case "right":
            if (leftElement < 600 ) {
                en.style.left = leftElement + 50 + "px";
            }
            break;

            
    }
    
}
// ecouter la frappe des fleches et appliquer la fonction move
window.addEventListener("keydown", function (e) {
    const mur = document.querySelector('.mur');
    const leftMur = getProperty(mur, "left");
    const topMur = getProperty(mur, "top");
    const leftElement = getProperty(player, "left");
    const topElement = getProperty(player, "top");
    let key_code = e.keyCode;
    switch (key_code) {
        case 81:
            
           
                
               move(player, "left");
            

            break;

        case 68:
           
              move(player, "right");  
            
            break;

        case 90:
           
               move(player, "up"); 
            
            break;

        case 83:
           
                move(player, "down");
            break;
        case 32:
            createBomb(getProperty(player, "top"), getProperty(player, "left"));
            audioElement.play();

            break;
    }

});
// fonction creation de bomb et appelle a la creation d'explosion
function createBomb(top, left) {
    let bomb = document.createElement("div");
    bomb.setAttribute("class", "bomb");
    bomb.style.top = top + "px";
    bomb.style.left = left + "px";
    zonejeu.appendChild(bomb);
    setTimeout(function () {
        createExplosion(bomb);
    }, 1000);
}

//fonction  creation d'explosion et supprission de bomb
function createExplosion(bomb) {
    bomb.classList.add("explosion");
    bomb.classList.remove("bomb");
    audioElement1.play();
    audioElement.play();
    exploseBomb(bomb);
    
    setTimeout(function () {
        zonejeu.removeChild(bomb);
    }, 500);
}

//fonction de creation d'ennemi
/*for (let i = 0; i < getRandomizer(5, 2); i++) {
    function createEnnemi(top, left) {
        let ennemi = document.createElement("div");
        ennemi.setAttribute("class", "ennemi");
        ennemi.style.top = top + "px";
        ennemi.style.left = left + "px";
        zonejeu.appendChild(ennemi);

    }

    window.addEventListener('load', createEnnemi(getRandomizer(500, 0), getRandomizer(500, 0)));
}*/

// tableau des ennemis 
let button = document.querySelector('button');
//faire deplacer les énnemis aléatoirement
setInterval(function () {
    for (let i = 0; i < ennemies.length; i++) {
        let enn = ennemies[i];
        let direction = directions[getRandomizer(3, 0)];
        move1(enn, direction);
        
    }
}, 800)


/*function Dennemis() {
    setInterval(function(){
        for (let i = 0; i < ennemies.length; i++) {
            let enn = ennemies[i];
            let direction = directions[getRandomizer(3, 0)];
            move1(enn, direction);
        }
    },800)
}*/


//button.addEventListener('click',Dennemis);

function imlose(){
    let lose = document.createElement("div");
    lose.setAttribute("class", "imglose");
    lose.style.top =  "350px";
    lose.style.left = "350px";
    zonejeu.appendChild(lose);
}
function imwin(){
    let win = document.createElement("div");
    win.setAttribute("class", "imgwin");
    win.style.top =  "350px";
    win.style.left = "350px";
    zonejeu.appendChild(win);
}
// fonction permet de detruire les ennemis ainsi le joueur s'il est en zone d'explosion
function exploseBomb(bomb) {
    const bombTop = getProperty(bomb, "top");
    const bombLeft = getProperty(bomb, "left");

    for (let i = 0; i < ennemies.length; i++) {
        let enn = ennemies[i];

        const ennemiTop = getProperty(enn, "top");
        const ennemiLeft = getProperty(enn, "left");

        if ((ennemiTop >= bombTop && ennemiTop <= bombTop + 150) && (ennemiLeft >= bombLeft && ennemiLeft <= bombLeft + 150)) {

            zonejeu.removeChild(enn);
            ennemies.splice(i, 1);
            if(ennemies.length <= 0){
                imwin();
            }

        }
    }

    const playerTop = getProperty(player,"top");
    const playerLeft = getProperty(player,"left");

    if ((playerTop >= bombTop && playerTop <= bombTop + 100) && (playerLeft >= bombLeft && playerLeft <= bombLeft + 100)) {

        life--;
        if (life === 4) {

            //faire blinker le player pendant 3sec
            
            vie.innerHTML = "attention que 4 vies";
            
        }
         if (life === 3) {
            vie.innerHTML = "attention que 3 vies";
        }
         if (life === 2) {
            vie.innerHTML = "attention que 2 vies";
        }
        if (life === 1) {
            vie.innerHTML = "attention que  1 vies";
        }
        if (life === 0) {
            vie.innerHTML = "attention que 0 vies";
            zonejeu.removeChild(player);
            imlose();
           
        }

    }

}


function PlayerEnnemi() {
    let enemi = document.querySelectorAll(".ennemi");
    for (let i = 0; i < enemi.length; i++) {

        const playerTop = getProperty(player,"top");
        const playerLeft = getProperty(player,"left");

        const ennemiTop = getProperty(enemi[i],"top");
        const ennemiLeft = getProperty(enemi[i],"left");

       

        if (playerTop < ennemiTop + 50 && playerTop + 50 > ennemiTop &&
            playerLeft < ennemiLeft + 50 && playerLeft + 50  > ennemiLeft ) {

                life--;
        if (life === 4) {

            //faire blinker le player pendant 3sec
            
            vie.innerHTML = "attention que 4 vies";
            
        }
         if (life === 3) {
            vie.innerHTML = "attention que 3 vies";
        }
         if (life === 2) {
            vie.innerHTML = "attention que 2 vies";
        }
        if (life === 1) {
            vie.innerHTML = "attention que  1 vies";
        }
        if (life === 0) {
            vie.innerHTML = "attention que 0 vies";
            zonejeu.removeChild(player);
            imlose();
           
        }
            
            

           
        }
    }
}