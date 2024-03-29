// script.js
const player = document.getElementById("player");
const endPoint = document.getElementById("endPoint");
const enemies = document.querySelectorAll(".enemy");
const gameOverScreen = document.getElementById("game-over");
let isJumping = false;
let isMovingRight = false;
let isMovingLeft = false;
let gameInterval;
let enemyInterval;
let playerBottom = 20; // Initial vertical position
let enemyRight = 0; // posisi awal musuh
const moveEnemyInterval = setInterval(moveEnemy, 20);
const gameOverText = document.getElementById('game-over-text');


function redirectToNextPage() {
    window.location.href = "Win.html"; // Ganti dengan nama halaman yang sesuai
}

function startGame() {
    gameInterval = setInterval(moveEnemy, 20);
    enemyInterval = setInterval(checkCollision, 20);
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'ArrowRight') {
        player.style.transform = 'scaleX(-1)'; // Mirror horizontal
    }
});

// Mendengarkan event saat tombol panah dilepas
document.addEventListener('keyup', function(event) {
    if (event.code === 'ArrowRight') {
        player.style.transform = 'scaleX(1)'; // Kembali ke arah asli
    }
});

document.addEventListener("keydown", event => {
    if (event.code === "ArrowUp" && !isJumping) {
        jump();
    }
    if (event.code === "ArrowRight") {
        isMovingRight = true;
    }
    if (event.code === "ArrowLeft") {
        isMovingLeft = true;
    }
});

document.addEventListener("keyup", event => {
    if (event.code === "ArrowRight") {
        isMovingRight = false;
    }
    if (event.code === "ArrowLeft") {
        isMovingLeft = false;
    }
});

function jump() {
    if (!isJumping) {
        isJumping = true;
        let jumpInterval = setInterval(() => {
            playerBottom += 20;
            player.style.bottom = playerBottom + "px";
            if (playerBottom >= 190) { // Maximum jump height
                clearInterval(jumpInterval);
                let fallInterval = setInterval(() => {
                    playerBottom -= 5;
                    player.style.bottom = playerBottom + "px";
                    if (playerBottom <= 20) { // Back to ground level
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


function moveEnemy() {
    enemy.forEach(enemy => {
        let enemyPosition = parseInt(window.getComputedStyle(enemy).getPropertyValue("right"));
        let enemyBottom = parseInt(window.getComputedStyle(enemy).getPropertyValue("bottom"));
        enemy.style.right = (enemyPosition - 3) + "px";
        enemy.style.bottom = (enemyBottom + 1) + "px";

        if (enemyPosition <= 0) {
            enemy.style.right = "calc(100% - 50px)";
            enemy.style.bottom = (Math.random() * (window.innerHeight - 50)) + "px";
        }
    });
}


    function checkCollision() {
        const playerRect = player.getBoundingClientRect();
        const enemyRect = enemy.getBoundingClientRect();

        if (
            playerRect.bottom >= enemyRect.top &&
            playerRect.top <= enemyRect.bottom &&
            playerRect.right >= enemyRect.left &&
            playerRect.left <= enemyRect.right
        ) {
            showGameOver(); // Panggil fungsi GAME OVER saat collision terdeteksi
        }
    }

function showGameOver() {
    gameOverText.style.display = 'block';
    clearInterval(gameInterval); // Hentikan pergerakan enemy
    clearInterval(enemyInterval); // Hentikan deteksi collision
    player.style.display = 'none'; // Sembunyikan player
    enemy.style.display = 'none'; // Sembunyikan enemy
}


// Panggil fungsi untuk memeriksa tabrakan secara berkala
setInterval(checkCollision, 20);




let enemyMoveInterval = setInterval(moveEnemy, 20);
setInterval(movePlayer, 20);


const gameContainer = document.getElementById("game-container");

// Mendapatkan lebar layar
const screenWidth = window.innerWidth;

// Mendapatkan lebar latar belakang tambahan (background2.png)
const backgroundWidth = 2000; // Sesuaikan dengan lebar background2.png

// Fungsi untuk mendeteksi perpindahan pemain

    
// Memanggil fungsi untuk mendeteksi perpindahan pemain secara terus-menerus
setInterval(detectPlayerMovement, 20);


setInterval(function() {
    const blinkingPng = document.querySelector('.blinking-png');
    blinkingPng.style.animation = 'none'; // Hentikan animasi sementara
    blinkingPng.offsetHeight; // Memicu reflow
    blinkingPng.style.animation = 'blinkAnimation 1s infinite'; // Mulai kembali animasi
}, 5000); // Panggil setiap 5 detik

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
      document.getElementById('overlay').classList.add('show');
    }, 2000); // 2000 milliseconds = 2 detik
  });