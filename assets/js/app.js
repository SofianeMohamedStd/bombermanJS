//notre zone de jeu
let zonejeu = document.getElementById("zonejeu");

// le joueur
let player = document.getElementById("joueur");

//tableau des directions qui nous sera utile pour deplacer notre joueur
const directions = ["up", "down", "left", "right"];


//functoion permet de recupérer les valeur du left et top
function getComputedStyleInteger(element, Property) {
    
    return parseInt(window.getComputedStyle(element).getPropertyValue(Property));
}

// fuction de deplacement
function move(player, direction) {
    const leftElement = getComputedStyleInteger(player, "left");
    const topElement = getComputedStyleInteger(player, "top");

    switch (direction) {
        case "up":
            if (topElement > 0) {
                player.style.top = topElement - 50 + "px";
            }
            break;

        case "down":
            if (topElement < 600) {
                player.style.top = topElement + 50 + "px";
            }
            break;

        case "left":
            if (leftElement > 0) {
                player.style.left = leftElement - 50 + "px";
            }
            break;

        case "right":
            if (leftElement < 600) {
                player.style.left = leftElement + 50 + "px";
            }
            break;
    }
}
// ecouter la frappe des fleches et appliquer la fuction move
document.addEventListener("keydown", function (e) {
    switch (e.key) {
        case "ArrowLeft":
            move(player, "left");
            break;

        case "ArrowRight":
            move(player, "right")
            break;

        case "ArrowUp":
            move(player, "up")
            break;

        case "ArrowDown":
            move(player, "down")
            break;
    }
});