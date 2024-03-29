const player = document.getElementById("player");
const stick = document.createElement('img');
const enemy = document.querySelector(".enemy");
const gameOverScreen = document.getElementById("game-over");
let isJumping = false;
let isMovingRight = false;
let isMovingLeft = false;
let gameInterval;
let playerBottom = 20; // Initial vertical position
const healthBarPlayer = document.getElementById('health-bar-player');
const healthBarEnemy = document.getElementById('health-bar-enemy');
let playerHealth = 500;
let enemyHealth = 500;
let isEnemyMovingRight = true; // Menandakan arah gerakan musuh
let enemyLeft = 0; // Posisi awal musuh
let isStickThrown = false; 
let isEnemyStickThrown = false; // Menandakan apakah senjata musuh sedang dilemparkan
stick.setAttribute('src', 'suling.png');    
stick.setAttribute('alt', 'stick');
stick.style.position = 'absolute';
stick.style.width = '30px'; // Sesuaikan ukuran tongkat
stick.style.display = 'none'; // Sembunyikan tongkat secara default
stick.style.marginTop = '46px'; // Sembunyikan tongkat secara default
stick.style.marginLeft = '129px'; // Sembunyikan tongkat secara default
stick.style.transform = "rotate(12deg)"; // Sembunyikan tongkat secara default
player.appendChild(stick); // Menambahkan tongkat ke dalam kontainer player1

function throwEnemyWeapon() {
    if (!isEnemyStickThrown) {
        // Membuat elemen senjata musuh
        const enemyWeapon = document.createElement('img');
        enemyWeapon.setAttribute('src', 'stick.png'); // Ganti dengan nama file senjata musuh
        enemyWeapon.setAttribute('alt', 'enemy-weapon');
        enemyWeapon.style.position = 'absolute';
        enemyWeapon.style.width = '70px'; // Sesuaikan ukuran senjata musuh
        enemyWeapon.style.display = 'block'; // Tampilkan senjata musuh
        enemyWeapon.style.bottom = '20px'; // Sesuaikan posisi senjata musuh
        enemyWeapon.style.left = '0px'; // Sesuaikan posisi awal (di sini asumsi posisi awalnya adalah 0px)
        enemyWeapon.style.transform = "rotate(-12deg)"; // Sesuaikan rotasi senjata musuh
        enemy.appendChild(enemyWeapon); // Menambahkan senjata musuh ke dalam enemy
        
        isEnemyStickThrown = true; // Menandakan bahwa senjata musuh sedang dilemparkan
        
        // Animasi melempar senjata musuh ke arah player
        setTimeout(() => {
            enemyWeapon.style.transition = 'all 1s ease-in-out';
            enemyWeapon.style.transform = 'rotate(-900deg) translateX(-1000px)'; // Animasi melempar ke arah player
        }, 5000); // Melempar setelah 5 detik

        // Setelah 5 detik, kembalikan status senjata musuh ke semula
        setTimeout(() => {
            isEnemyStickThrown = false;
            enemyWeapon.remove(); // Hapus senjata musuh setelah dilemparkan
        }, 6000); // Hapus setelah 6 detik
    }
}

// Fungsi untuk memanggil throwEnemyWeapon setiap 8 detik
setInterval(throwEnemyWeapon, 8000);

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
            player.style.bottom = playerBottom + "px";
            if (playerBottom >= 280) { // Maximum jump height
                clearInterval(jumpInterval);
                let fallInterval = setInterval(() => {
                    playerBottom -= 9;
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
        player.style.left = (playerLeft + 10) + "px";
    }
    if (isMovingLeft) {
        let playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
        if (playerLeft > 0) {
            player.style.left = (playerLeft - 10) + "px";
        }
    }
}

document.addEventListener('keyup', function(event) {
    if (event.key === 'a') {
        player.style.transform = 'scaleX(1)'; // Kembali ke arah asli
    }
});

document.addEventListener("keydown", event => {
    if (event.key === 'w' && !isJumping) {
        jump();
    }
    if (event.key === 'd') {
        isMovingRight = true;
        movePlayer();
    }
    if (event.key === 'a') {
        isMovingLeft = true;
    }
});

function isCollision(stick, enemy) {
    const rect1 = stick.getBoundingClientRect();
    const rect2 = enemy.getBoundingClientRect();
    if (rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top) {
        // Terdapat tabrakan
        return true;
    } else {
        // Tidak ada tabrakan
        return false;
    }
}

function throwStick() {
    // Animasi lemparan stick
    stick.style.transition = 'all 1s ease-in-out';
    stick.style.transform = 'rotate(900deg)'; // Animasi putaran tongkat saat melempar

    const playerLeft = parseInt(window.getComputedStyle(player).left);
    stick.style.left = (playerLeft + 1900) + 'px'; // Posisi tongkat relatif terhadap gambar player
    
    // Saat tongkat mencapai musuh
    setTimeout(() => {
        // Atur kembali tongkat untuk respawn
        stick.style.transition = 'none'; // Hentikan transisi untuk rotasi 
        stick.style.transform = 'none'; // Hentikan animasi rotasi
        stick.style.display = 'none'; // Hentikan animasi rotasi
        stick.style.left = '40px'; // Posisi awal tongkat relatif terhadap gambar player
       
        // Tambahkan console.log() untuk memeriksa nilai enemyHealth sebelum dan sesudah diperbarui
        console.log('Health sebelum terkena stick:', enemyHealth);
        
        setTimeout(() => {
            enemy.style.filter = 'none';
        }, 1000);

        // Periksa jarak antara tongkat dan musuh
        const distance = Math.abs(parseInt(window.getComputedStyle(stick).left) - parseInt(window.getComputedStyle(enemy).left));
        if (distance < 800) {
            enemyHealth -= 50;
            healthBarEnemy.style.width = enemyHealth + 'px';
            enemy.style.filter = ' drop-shadow(0px 0px 10px red)';
        }

        // Tambahkan console.log() untuk memeriksa nilai enemyHealth setelah diperbarui
        console.log('Health setelah terkena stick:', enemyHealth);
        

        // Set ulang status tongkat
        isStickThrown = false;
    }, 1000); // Tunggu 1000ms (sesuaikan dengan durasi lemparan)
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'x' && !isStickThrown) {
        // Munculkan tongkat saat tombol X ditekan
        stick.style.display = 'block';
        stick.style.transform = "rotate(12deg)";
        stick.style.left = '40px'; // Posisi awal tongkat relatif terhadap gambar player
        isStickThrown = true;
    }
    else if (event.key === 'x' && isStickThrown) {
        // Melempar tongkat saat tombol X ditekan kembali (jika tongkat sudah ada)
        throwStick();
    }
});

// Fungsi untuk mendeteksi tabrakan antara senjata musuh dan pemain
function isCollisionEnemyWeapon(enemyWeapon, player) {
    const rect1 = enemyWeapon.getBoundingClientRect();
    const rect2 = player.getBoundingClientRect();
    if (rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top) {
        // Terdapat tabrakan
        return true;
    } else {
        // Tidak ada tabrakan
        return false;
    }
}

// Memanggil fungsi untuk mendeteksi tabrakan senjata musuh setiap 20ms
setInterval(() => {
    const enemyWeapon = document.querySelector('.enemy img'); // Ambil senjata musuh
    if (enemyWeapon) { // Pastikan senjata musuh ada
        if (isCollisionEnemyWeapon(enemyWeapon, player)) { // Deteksi tabrakan dengan pemain
            // Kurangi health player
            playerHealth -= 10;
            healthBarPlayer.style.width = playerHealth + 'px';
            
            // Set ulang senjata musuh ke posisi awal
            enemyWeapon.remove(); // Hapus senjata musuh
            setTimeout(() => {
                const newEnemyWeapon = document.createElement('img');
                newEnemyWeapon.setAttribute('src', 'stick.png');
                newEnemyWeapon.style.position = 'absolute';
                newEnemyWeapon.style.width = '70px';
                newEnemyWeapon.style.display = 'block';
                newEnemyWeapon.style.bottom = '20px';
                newEnemyWeapon.style.left = '0px';
                newEnemyWeapon.style.transform = "rotate(-12deg)";
                enemy.appendChild(newEnemyWeapon); // Tambahkan senjata musuh kembali ke musuh
            }, 5000); // Setelah 5 detik
        }
    }
}, 20); // Setiap 20ms

// Memanggil fungsi untuk mendeteksi perpindahan pemain setiap 20ms
setInterval(movePlayer, 20);

function detectPlayerMovement() {
    // Dapatkan lebar pemain
    const playerWidth = player.offsetWidth;

    // Jika pemain mencapai batas kanan layar, hentikan pergerakan ke kanan
    if (parseInt(player.style.left) + playerWidth >= screenWidth) {
        isMovingRight = false;
    }
}

// Memanggil fungsi untuk mendeteksi perpindahan pemain setiap 20ms
setInterval(detectPlayerMovement, 20);

// Mendapatkan lebar layar
const screenWidth = window.innerWidth;

// Fungsi untuk mendeteksi perpindahan pemain
function detectPlayerMovement() {
    // Dapatkan lebar pemain
    const playerWidth = player.offsetWidth;

    // Jika pemain mencapai batas kanan layar, hentikan pergerakan ke kanan
    if (parseInt(player.style.left) + playerWidth >= screenWidth) {
        isMovingRight = false;
    }
}

// Mem
// Memanggil fungsi untuk mendeteksi perpindahan pemain setiap 20ms
setInterval(detectPlayerMovement, 20);

// Fungsi untuk mendeteksi perpindahan pemain
function detectPlayerMovement() {
    // Dapatkan lebar pemain
    const playerWidth = player.offsetWidth;

    // Jika pemain mencapai batas kanan layar, hentikan pergerakan ke kanan
    if (parseInt(player.style.left) + playerWidth >= screenWidth) {
        isMovingRight = false;
    }
}

// Memanggil fungsi untuk mendeteksi perpindahan musuh setiap 20ms
setInterval(moveEnemy, 20);

// Fungsi untuk menggerakkan musuh
function moveEnemy() {
    // Ambil posisi horizontal musuh saat ini
    let enemyPosition = parseInt(window.getComputedStyle(enemy).getPropertyValue('left'));
    
    // Jika musuh bergerak ke kanan dan belum mencapai batas kanan layar, lanjutkan pergerakan ke kanan
    if (isEnemyMovingRight && enemyPosition < screenWidth - 330) {
        enemy.style.left = (enemyPosition + 5) + 'px';
    }
    // Jika musuh mencapai batas kanan layar, arahkan pergerakan ke kiri
    else {
        isEnemyMovingRight = false;
    }

    // Jika musuh bergerak ke kiri dan belum mencapai batas kiri layar, lanjutkan pergerakan ke kiri
    if (!isEnemyMovingRight && enemyPosition > 0) {
        enemy.style.left = (enemyPosition - 5) + 'px';
    }
    // Jika musuh mencapai batas kiri layar, arahkan pergerakan ke kanan
    else {
        isEnemyMovingRight = true;
    }
}

// Fungsi untuk mendeteksi tabrakan antara pemain dan musuh
function isCollisionPlayerEnemy(player, enemy) {
    const rect1 = player.getBoundingClientRect();
    const rect2 = enemy.getBoundingClientRect();
    if (rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top) {
        // Terdapat tabrakan
        return true;
    } else {
        // Tidak ada tabrakan
        return false;
    }
}

// Memanggil fungsi untuk mendeteksi tabrakan pemain dan musuh setiap 20ms
setInterval(() => {
    if (isCollisionPlayerEnemy(player, enemy)) {
        // Kurangi health player jika terjadi tabrakan dengan musuh
        playerHealth -= 10;
        healthBarPlayer.style.width = playerHealth + 'px';
    }
}, 20);
