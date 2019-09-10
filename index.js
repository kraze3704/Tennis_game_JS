
let canvas, canvasContext;
let ballX = 75, ballY = 75, ballRadius = 10;
const FPS = 30;
let ballSpeedX = 2, ballSpeedY = 2;

window.onload = () => {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    setInterval(function() {
        moveAll();
        drawAll();
    }, 1000/FPS);
}

moveAll = () => {
    if(ballX > canvas.width - ballRadius || ballX < ballRadius) { // added ballRadius for more accurate collision checks
        ballSpeedX *= -1;
    }
    if(ballY > canvas.height - ballRadius || ballY < ballRadius) {
        ballSpeedY *= -1;
    }
    ballX += ballSpeedX;
    ballY += ballSpeedY;
}

drawAll = () => {
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    canvasContext.fillStyle = 'white'; // sets the color
    canvasContext.beginPath(); // begins a new seperate shape
    canvasContext.arc(ballX, ballY, ballRadius, 0, Math.PI*2, true); // x, y coordinates of center, radius, start & end angles, counterclockwise(true)
    canvasContext.fill(); // fills the shape drawn since beginPath()
}