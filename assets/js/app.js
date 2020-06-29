//notre zone de jeu
let zonejeu = document.getElementById("zonejeu");

// le joueur
let player = document.getElementById("player");

//tableau des directions qui nous sert a deplacer notre joueur
const directions = ["up", "down", "left", "right"];

function getComputedStyleInteger(element, Property) {
    
    return parseInt(window.getComputedStyle(element).getPropertyValue(Property));
}


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