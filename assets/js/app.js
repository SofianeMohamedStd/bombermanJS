//le terrain de jeu
let zonejeu = document.getElementById("zonejeu");

// le joueur
let player = document.getElementById("joueur");

let audioElement = new Audio('./assets/son/1807.wav');

audioElement.volum = 0.05;

//tableau des directions qui nous sera utile pour deplacer notre joueur
const directions = ["up", "down", "left", "right"];

//fonction qui gére un chiffre random
function getRandomizer(bottom, top) {
    return Math.floor(Math.random() * Math.floor(1 + top - bottom)) + bottom;
}


//fonction permet de recupérer les propiété d'un element
function getProperty(element, Property) {

    return parseInt(window.getComputedStyle(element).getPropertyValue(Property));
}

// fonction de deplacement
function move(player, direction) {
    const leftElement = getProperty(player, "left");
    const topElement = getProperty(player, "top");

    switch (direction) {
        case "up":
            if (topElement > 0) {
                player.style.top = topElement - 50 + "px";
            }
            else {
                audioElement.play()
            }
            break;

        case "down":
            if (topElement < 600) {
                player.style.top = topElement + 50 + "px";
            }
            else {
                audioElement.play()
            }
            break;

        case "left":
            if (leftElement > 0) {
                player.style.left = leftElement - 50 + "px";
            }
            else {
                audioElement.play()
            }
            break;

        case "right":
            if (leftElement < 600) {
                player.style.left = leftElement + 50 + "px";
            }
            else {
                audioElement.play()
            }
            break;
    }
}
// ecouter la frappe des fleches et appliquer la fonction move
window.addEventListener("keydown", function (e) {
                
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
        case 16:
            createBomb(getProperty(player, "top"),getProperty(player, "left"));
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
    }, 3000);
}

//fonction  creation d'explosion et supprission de bomb
function createExplosion(bomb) {
    bomb.classList.add("explosion");
    bomb.classList.remove("bomb");
    audioElement.play();
    setTimeout(function () {
        zonejeu.removeChild(bomb);
    }, 500);
}

//fonction de creation d'ennemi
function createEnnemi(top, left) {
    let ennemi = document.createElement("div");
    ennemi.setAttribute("class", "ennemi");
    ennemi.style.top = top + "px";
    ennemi.style.left = left + "px";
    zonejeu.appendChild(ennemi);
    
}

window.addEventListener('load',createEnnemi(getRandomizer(0, 500),getRandomizer(0, 500)));

