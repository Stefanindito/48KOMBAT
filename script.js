const player = document.getElementById("player");
const stick = document.createElement('img');
const hand = document.createElement('img');
const enemy = document.querySelector(".enemy");
const gameOverScreen = document.getElementById("game-over");
const centeredText = document.getElementById('centered-text');
const notificationSound = document.getElementById('notification-sound');
const notificationSong = document.getElementById('notification-song');
let isJumping = false;
let isMovingRight = false;
let isMovingLeft = false;
let gameInterval;
let isPlayerHealthZero = false;
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

hand.setAttribute('src', 'hand.png');    
hand.setAttribute('alt', 'hand');
hand.style.position = 'absolute';
hand.style.width = '30px'; // Sesuaikan ukuran tongkat
hand.style.display = 'none'; // Sembunyikan tongkat secara default
hand.style.marginTop = '46px'; // Sembunyikan tongkat secara default
hand.style.marginLeft = '129px'; // Sembunyikan tongkat secara default
hand.style.transform = "rotate(12deg)"; // Sembunyikan tongkat secara default
hand.style.zIndex = '998'; // Sembunyikan tongkat secara default
player.appendChild(stick); // Menambahkan tongkat ke dalam kontainer player1

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        // Setelah 10 detik, tambahkan gambar dan mulai pemutaran suara
        const movingAudio = document.getElementById('moving-audio');
        const player = document.getElementById("player");
        const enemy = document.querySelector(".enemy");

        // Mulai suara
        movingAudio.play();

        // Tambahkan gambar di belakang player dan enemy
        const movingImage = new Image();
        movingImage.src = 'cameo.png'; // Ganti 'cameo.png' dengan path gambar yang sesuai
        movingImage.alt = 'Moving Image';
        movingImage.style.position = 'fixed';
        // movingImage.style.top = '43%';
        movingImage.style.bottom = '0';
        movingImage.style.width = '300px';
        movingImage.style.height = '500px';
        movingImage.style.zIndex = '999';
        movingImage.style.left = '-100vw'; // Mulai di luar layar kiri
        movingImage.style.transition = 'left 4s linear'; // Animasi pergerakan ke kanan selama 4 detik

        // Tempatkan gambar di belakang player dan enemy
        document.body.appendChild(movingImage); // Tambahkan gambar ke dalam body

        // Tunda mulai animasi agar suara dan gambar dimulai bersamaan
        setTimeout(function() {
            movingImage.style.left = 'calc(100vw + 100px)'; // Berakhir di luar layar kanan
        }, 1100); // Delay start of animation to synchronize with sound
    }, 6000); // Tunggu 10 detik sebelum memulai animasi
});

function throwEnemyWeapon() {
    if (!isEnemyStickThrown) {
        // Membuat elemen senjata musuh
        const enemyWeapon = document.createElement('img');
        enemyWeapon.setAttribute('src', 'stick.png'); // Ganti dengan nama file senjata musuh
        enemyWeapon.setAttribute('alt', 'enemy-weapon');
        enemyWeapon.style.position = 'absolute';
        enemyWeapon.style.width = '100px'; // Sesuaikan ukuran senjata musuh
        enemyWeapon.style.display = 'absolute'; // Tampilkan senjata musuh
        // enemyWeapon.style.bottom = '100px'; // Sesuaikan posisi senjata musuh
        enemyWeapon.style.marginLeft = '45px'; // Sesuaikan posisi awal (di sini asumsi posisi awalnya adalah 0px)
        enemyWeapon.style.marginBottom = '40px'; // Sesuaikan posisi awal (di sini asumsi posisi awalnya adalah 0px)
        enemyWeapon.style.marginTop = '30px'; // Sesuaikan posisi awal (di sini asumsi posisi awalnya adalah 0px)
        enemyWeapon.style.transform = "rotate(-20deg)"; // Sesuaikan rotasi senjata musuh
        enemyWeapon.style.zIndex = '10';
        enemy.appendChild(enemyWeapon); // Menambahkan senjata musuh ke dalam enemy
        
        const throwSound = new Audio('star.mp3');
        throwSound.play();

        isEnemyStickThrown = true; // Menandakan bahwa senjata musuh sedang dilemparkan
        

        
        // Animasi melempar senjata musuh ke arah player
        setTimeout(() => {
            enemyWeapon.style.transition = 'all 1s ease-in-out';
            enemyWeapon.style.transform = 'rotate(-900deg) translateX(-1200px)'; // Animasi melempar ke arah player
        }, 1000); // Melempar setelah 5 detik



// Event listener untuk deteksi tabrakan antara senjata musuh yang sedang terlempar dan pemain
setInterval(() => {
    if (isCollision(player, enemyWeapon)) { // Jika terjadi tabrakan antara player dan senjata musuh
        playerHealth -= 25; // Kurangi health player sebesar 10
        healthBarPlayer.style.width = playerHealth + 'px'; // Update health bar player
        // player.style.filter = ' drop-shadow(0px 0px 10px red)';
    }
}, 20); // Setiap 20ms

        // Setelah 5 detik, kembalikan status senjata musuh ke semula
        setTimeout(() => {
            isEnemyStickThrown = false;
            enemyWeapon.remove(); // Hapus senjata musuh setelah dilemparkan
        }, 3000); // Hapus setelah 6 detik
    }
}

// Fungsi untuk memanggil throwEnemyWeapon setiap 8 detik
setInterval(throwEnemyWeapon, 2000);

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
    
    const throwSound = new Audio('wosh.mp3');
    throwSound.play();

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
            enemyHealth -= 54;
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
    if (event.key === 'e' && !isStickThrown) {
        // Munculkan tongkat saat tombol e ditekan
        stick.style.display = 'block';
        stick.style.transform = "rotate(12deg)";
        stick.style.left = '40px'; // Posisi awal tongkat relatif terhadap gambar player
        isStickThrown = true;
    }
    else if (event.key === 'e' && isStickThrown) {
        // Melempar tongkat saat tombol e ditekan kembali (jika tongkat sudah ada)
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
    if (isEnemyMovingRight && enemyPosition <  330) {
        enemy.style.left = (enemyPosition + 5) + 'px';
    }
    // Jika musuh mencapai batas kanan layar, arahkan pergerakan ke kiri
    else {
        isEnemyMovingRight = false;
    }

    // Jika musuh bergerak ke kiri dan belum mencapai batas kiri layar, lanjutkan pergerakan ke kiri
    if (!isEnemyMovingRight && enemyPosition > 5) {
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

function playNotificationSong() {
    if (!isPlayerHealthZero) { // Memastikan bahwa suara belum diputar jika health bar player sudah mencapai 0
        const notificationSong = document.getElementById('notification-song');
        notificationSong.play();
        isPlayerHealthZero = true; // Mengatur penanda bahwa suara sudah diputar
    }
}


function checkPlayerHealth() {
    if (playerHealth <= 0) {
        // Matikan kontrol pemain
        isMovingLeft = false;
        isMovingRight = false;
        isJumping = false;
        movePlayer = false;
        throwStick = false;

        // Sembunyikan player
        player.style.display = 'none';

        // Tampilkan gambar game over di tengah layar
        gameOverScreen.style.display = 'block';

        // Memanggil fungsi untuk memutar suara dan menampilkan gambar
        playNotificationSong();
        gameOverScreen.style.display = 'block';
    } else {
        isPlayerHealthZero = false; // Mengatur ulang penanda jika kondisi tidak terpenuhi
    }
}

function checkEnemyHealth() {
    if (enemyHealth <= 0) {
        // Matikan kontrol pemain

        moveEnemy = false;
        isEnemyStickThrown = true;
        isCollisionPlayerEnemy = true

        // Sembunyikan player
        enemy.style.display = 'block';

        // Tampilkan gambar kalah di tengah layar
        
    }
}


function playNotificationSound() {
    const notificationSound = document.getElementById('notification-sound');
    notificationSound.play();
}

function checkHealthBar() {
    if (enemyHealth <= 50) {
        centeredText.innerHTML = '<img id="notification-image" src="finishher.png" color="white" alt="Finish Her"> Click Enter'; // Perbaikan syntax width
        centeredText.style.display = 'block';
        playNotificationSound(); // Play notification sound
        isEnemyStickThrown = true;
        
        // Menambahkan event listener untuk mengarahkan ke halaman lain saat menekan Enter
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                window.location.href = 'fatality.html'; // Redirect ke halaman lain yang memainkan video fullscreen
            }
        });
    } else {
        centeredText.style.display = 'none';
    }
}

// Simulate enemy health changes (for testing purposes)
setInterval(() => {
    enemyHealth -= 0;
    healthBarEnemy.style.width = enemyHealth + 'px';
    checkHealthBar();
}, 1000); // Update every second (adjust as needed)

// Memanggil fungsi untuk memeriksa kesehatan pemain setiap 100ms
setInterval(checkPlayerHealth, 100);
setInterval(checkEnemyHealth, 100);


// Memanggil fungsi untuk mendeteksi tabrakan pemain dan musuh setiap 20ms
setInterval(() => {
    if (isCollisionPlayerEnemy(player, enemy)) {
        // Kurangi health player jika terjadi tabrakan dengan musuh
        playerHealth -= 10;
        healthBarPlayer.style.width = playerHealth + 'px';
    }
}, 20);

document.addEventListener("DOMContentLoaded", function() {
    // Menampilkan gambar dan memainkan suara setelah 1.5 detik
    setTimeout(function() {
        playNotifSound();
    }, 1300);
});

function playNotifSound() {
    const notifSound = document.getElementById('notif-sound');
    const notificationImage = document.getElementById('notification-image');

    // Memunculkan gambar dan memainkan suara
    notificationImage.style.display = 'block';
    notifSound.play();

    // Menghilangkan gambar dan suara setelah 1.5 detik
    setTimeout(function() {
        notificationImage.style.display = 'none';
    }, 1700);
}

