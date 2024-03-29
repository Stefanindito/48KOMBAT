const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const healthBarPlayer1 = document.getElementById('health-bar-player1');
const healthBarPlayer2 = document.getElementById('health-bar-player2');

let isJumping = false;
let isMovingRight = false;
let isMovingLeft = false;
let gameInterval;
let playerBottom = 20; // Initial vertical position
let player1Health = 100;
let player2Health = 100;


document.addEventListener('keydown', function(event) {
    if (event.key === 'a') {
        player1.style.transform = 'scaleX(-1)'; // Mirror horizontal
    }
});

document.addEventListener('keyup', function(event) {
    if (event.key === 'd') {
        player1.style.transform = 'scaleX(1)'; // Kembali ke arah asli
    }
});

document.addEventListener("keydown", event => {
    if (event.key === 'w' && !isJumping) {
        jump();
    }
    if (event.key === 'd') {
        isMovingRight = true;
    }
    if (event.key === 'a') {
        isMovingLeft = true;
    }
});

document.addEventListener("keyup", event => {
    if (event.key === 'd') {
        isMovingRight = false;
    }
    if (event.key === 'a') {
        isMovingLeft = false;
    }
});

function jump() {
    if (!isJumping) {
        isJumping = true;
        let jumpInterval = setInterval(() => {
            playerBottom += 20;
            player1.style.bottom = playerBottom + "px";
            if (playerBottom >= 230) { // Maximum jump height
                clearInterval(jumpInterval);
                let fallInterval = setInterval(() => {
                    playerBottom -= 9;
                    player1.style.bottom = playerBottom + "px";
                    if (playerBottom <= 0) { // Back to ground level
                        clearInterval(fallInterval);
                        isJumping = false;
                    }
                }, 20);
            }
        }, 20);
        const jumpSound = document.getElementById("jump-sound");
        jumpSound.currentTime = 0; // Set the audio time to start
        jumpSound.play();
    }
}

function movePlayer() {
    if (isMovingRight) {
        let playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
        player.style.left = (playerLeft + 7) + "px";
    }
    if (isMovingLeft) {
        let playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
        
        if (playerLeft > 0) {
            player.style.left = (playerLeft - 7) + "px";
        }
    }
}

setInterval(detectPlayerMovement, 20);