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

function redirectToNextPage() {
    window.location.href = "Win.html"; // Ganti dengan nama halaman yang sesuai
}

function startGame() {
    gameInterval = setInterval(moveEnemy, 20);
    enemyInterval = setInterval(checkCollision, 20);
}

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

function changeEnemySkin() {
    document.body.classList.add("background-2");
}

function checkCollision() {
    // Deteksi tabrakan dengan elemen yang menandai akhir permainan
    const playerRect = player.getBoundingClientRect();
    const endPointRect = endPoint.getBoundingClientRect();
    if (
        playerRect.bottom >= endPointRect.top &&
        playerRect.top <= endPointRect.bottom &&
        playerRect.right >= endPointRect.left &&
        playerRect.left <= endPointRect.right
    ) {
        redirectToNextPage(); // Arahkan pemain ke halaman lain jika menyentuh elemen akhir permainan
    }

    // Deteksi tabrakan dengan musuh
    enemies.forEach(enemy => {
        const enemyRect = enemy.getBoundingClientRect();
        if (
            playerRect.bottom >= enemyRect.top &&
            playerRect.top <= enemyRect.bottom &&
            playerRect.right >= enemyRect.left &&
            playerRect.left <= enemyRect.right
        ) {
            restartGame(); // Mulai ulang permainan jika pemain menyentuh musuh
        }
    });
}

// Panggil fungsi untuk memeriksa tabrakan secara berkala
setInterval(checkCollision, 20);


function restartGame() {
    window.location.href = window.location.href.split("?")[0]; // Memuat ulang halaman untuk memulai kembali permainan
}


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

