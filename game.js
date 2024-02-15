const BLOCK_SIZE = 15; // ширина и высота клетки в пикселях
const FIELD_WIDTH = 20; // ширина игрового поля в клетках(гор.)
const FIELD_HEIGHT = 17; // ширина игрового поля в клетках(верт.)
const SNAKE_COLOR = "aqua";
const APPLE_COLOR = "red";
let DIRECTION = null;
let SPEED = 500;

const canvas = document.getElementById("gameField");
const context = canvas.getContext("2d");
const snake = [
    { x: 4, y: 2 },
    { x: 3, y: 2 },
    { x: 2, y: 2 },
    { x: 1, y: 2 },
];
const apple = { x: null, y: null, score: 0 }

function drawBlock(xPos, yPos, color) {
    context.fillStyle = color;
    context.fillRect(
        xPos * BLOCK_SIZE,
        yPos * BLOCK_SIZE,
        BLOCK_SIZE,
        BLOCK_SIZE
    );
}

function clearBlock(xPos, yPos) {
    context.clearRect(
        xPos * BLOCK_SIZE,
        yPos * BLOCK_SIZE,
        BLOCK_SIZE,
        BLOCK_SIZE
    );
}

function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        drawBlock(snake[i].x, snake[i].y, SNAKE_COLOR);
    }
}

function drawApple() {
    let x = Math.floor(Math.random() * FIELD_WIDTH);
    let y = Math.floor(Math.random() * FIELD_HEIGHT);
    if (!isOccupied(x, y)) {
        apple.x = x
        apple.y = y
        drawBlock(apple.x, apple.y, APPLE_COLOR);
    } else drawApple();
}

function isOccupied(x, y) {
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x == x && snake[i].y == y) return true;
    }
    return false;
}

function isOccupiedApple(x, y) {
    if (x == apple.x && y == apple.y) {
        apple.score += 1;
        drawApple()
        return true;
    }
    return false;
}

function gameOver() {
    alert(`Game over your score is ${apple.score}`)
}

function outOfBorder(x, y) {
    if ( (x > FIELD_WIDTH-1 || x < 0) || (y > FIELD_HEIGHT-1 || y < 0)) return true;
    else return false;
}

function name(x,y){
    
}

drawSnake();
drawApple();

document.addEventListener("keydown", moveSnake);

function moveSnake(dir) {
    DIRECTION = dir.code.substring(5);
    let { x, y } = snake[0];
    let isApple = isOccupiedApple(x, y);

    //проверка выхода за границы
    if (outOfBorder(x, y)) gameOver();

    //проверка на съедание
    if (!isApple) {
        let lastElem = snake.pop();
        clearBlock(lastElem.x, lastElem.y);
    }
    
    switch (DIRECTION) {
        case "Down":
            //проверка самопересечения
            if (isOccupied(x, y + 1)) {
                gameOver();
                break;
            }
            snake.unshift({
                x: x,
                y: y + 1,
            });
            drawBlock(snake[0].x, snake[0].y, SNAKE_COLOR);
        break;
        case "Up":
            if (isOccupied(x, y - 1)) gameOver();
            snake.unshift({
                x: x,
                y: y - 1,
            });
            drawBlock(snake[0].x, snake[0].y, SNAKE_COLOR);
            break;
        case "Right":
            if (isOccupied(x + 1, y)) gameOver();
            snake.unshift({
                x: x + 1,
                y: y,
            });
            drawBlock(snake[0].x, snake[0].y, SNAKE_COLOR);
            break;
        case "Left":
            if (isOccupied(x - 1, y)) gameOver();
            snake.unshift({
                x: x - 1,
                y: y,
            });
            drawBlock(snake[0].x, snake[0].y, SNAKE_COLOR);
            break;
    }
}
