
let canvas, canvasContext;
let ballX = 75, ballY = 75;
const FPS = 30;

window.onload = () => {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    setInterval(function() {
        moveAll();
        drawAll();
    }, 1000/FPS);
}

moveAll = () => {
    ballX += 2;
}

drawAll = () => {
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    canvasContext.fillStyle = 'white'; // sets the color
    canvasContext.beginPath(); // begins a new seperate shape
    canvasContext.arc(ballX, ballY, 10, 0, Math.PI*2, true); // x, y coordinates of center, radius, start & end angles, counterclockwise(true)
    canvasContext.fill(); // fills the shape drawn since beginPath()
}