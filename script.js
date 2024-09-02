document.getElementById('start-btn').addEventListener('click', startGame);

function startGame() {
    const startButton = document.getElementById('start-btn');
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    
    startButton.style.display = 'none';
    canvas.style.display = 'block';

    const gridSize = 20;
    const canvasSize = canvas.width;
    const snake = [
        { x: gridSize * 2, y: gridSize * 2 }, 
        { x: gridSize, y: gridSize * 2 }
    ];  // Snake starts with two segments
    let direction = { x: gridSize, y: 0 };
    let food = randomFoodPosition();
    let gameInterval;

    function randomFoodPosition() {
        return {
            x: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
            y: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize
        };
    }

    function drawSnake() {
        ctx.fillStyle = 'lime';
        snake.forEach(part => {
            ctx.fillRect(part.x, part.y, gridSize, gridSize);
        });
    }

    function moveSnake() {
        const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

        // Check if the snake hits the walls and wrap around
        if (head.x >= canvasSize) head.x = 0;
        else if (head.x < 0) head.x = canvasSize - gridSize;
        if (head.y >= canvasSize) head.y = 0;
        else if (head.y < 0) head.y = canvasSize - gridSize;

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            food = randomFoodPosition(); // Snake eats food, so generate new food
        } else {
            snake.pop(); // Remove the last segment if no food is eaten
        }
    }

    function drawFood() {
        ctx.fillStyle = 'red';
        ctx.fillRect(food.x, food.y, gridSize, gridSize);
    }

    function update() {
        ctx.clearRect(0, 0, canvasSize, canvasSize);
        moveSnake();
        drawSnake();
        drawFood();

        // Check for collisions with the snake itself
        const head = snake[0];
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                clearInterval(gameInterval);
                alert('Game Over');
                location.reload();
            }
        }
    }

    function changeDirection(event) {
        const key = event.keyCode;
        if (key === 37 && direction.x === 0) { // Left arrow key
            direction = { x: -gridSize, y: 0 };
        } else if (key === 38 && direction.y === 0) { // Up arrow key
            direction = { x: 0, y: -gridSize };
        } else if (key === 39 && direction.x === 0) { // Right arrow key
            direction = { x: gridSize, y: 0 };
        } else if (key === 40 && direction.y === 0) { // Down arrow key
            direction = { x: 0, y: gridSize };
        }
    }

    document.addEventListener('keydown', changeDirection);
    gameInterval = setInterval(update, 100); // Snake moves every 100 ms
}
