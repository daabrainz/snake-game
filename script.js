const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start-btn');
const endBtn = document.getElementById('end-btn');
const countdownElement = document.getElementById('countdown');

const gridSize = 10;
const startX = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
const startY = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
let snake = [{ x: gridSize * 5, y:gridSize * 5 }];
let direction = { x: gridSize, y: 0};
let food = { x: startX, y: startY };
let gameInterval;


function startCountdown() {
    let countdown = 3;
    countdownElement.textContent = countdown;

    const countdownInterval = setInterval(() => {
        countdown -= 1;
        countdownElement.textContent = countdown;

        if (countdown === 0) {
            clearInterval(countdownInterval);
            countdownElement.textContent = '';
            startGame();
        }
    }, 1000);
}

// Funktion zum Zeichnen der Schlange und der Nahrung auf dem Canvas
function draw() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
    
    // Zeichnen der Schlange
    ctx.fillStyle = 'orange';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
    
    // Zeichnen der Nahrung
    ctx.fillStyle = 'purple';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Funktion zum Aktualisieren der Position der Schlange
function update() {
    // Berechnen der neuen Position des Kopfes der Schlange basierend auf der aktuellen Richtung
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    
    // Hinzufügen des neuen Kopfes an den Anfang des Arrays
    snake.unshift(head);
    
    if (head.x === food.x && head.y === food.y) {
        food = {
            x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
            y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
        };
    } else {
        // Entfernen des letzten Segments der Schlange, um die Länge konstant zu halten
        snake.pop();
    }
}

// Hauptspielschleife, die die `update`- und `draw`-Funktionen in regelmäßigen Abständen aufruft
function gameLoop() {
    update();
    draw();
}

function startGame() {
    if (gameInterval) {
        clearInterval(gameInterval)
    }

    const startX = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    const startY = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;

    snake = [{ x: gridSize * 5, y: gridSize * 5 }];
    direction = { x: gridSize, y: 0 };
    food = { x: startX , y: startY };
    
    gameInterval = setInterval(gameLoop, 100);
}

function endGame() {
    clearInterval(gameInterval);
    gameInterval = null;

    
    update();
}


startBtn.addEventListener('click', startCountdown);
endBtn.addEventListener('click', endGame);


// Hinzufügen eines Event-Listeners für Tastendrücke, um die Richtung der Schlange zu ändern
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -gridSize };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: gridSize };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -gridSize, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: gridSize, y: 0 };
            break;

    }
});