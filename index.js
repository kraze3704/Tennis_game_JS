
let canvas, canvasContext;

let ballX = 75, ballY = 75;
const ballRadius = 10;
let PADDLE_Y = 250;
const PADDLE_HEIGHT = 100, PADDLE_WIDTH = 10;

const FPS = 30;
let ballSpeedX = 2, ballSpeedY = 2;

window.onload = () => {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    canvas.addEventListener('mousemove', function(evt) {
        let mousePos = calculateMousePos(evt);
        PADDLE_Y = mousePos.y - (PADDLE_HEIGHT/2);
    });

    setInterval(function() {
        moveAll();
        drawAll();
    }, 1000/FPS);
}

calculateMousePos = (evt) => {
    let rect = canvas.getBoundingClientRect(), root = document.documentElement;

    // account for margins, canvas position on page, scroll amount etc.
    let mouseX = evt.clientX - rect.left - root.scrollLeft;
    let mouseY = evt.clientY - rect.top - root.scrollTop;

    return {
        x: mouseX,
        y: mouseY
    };
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

colorRect = (topLeftX, topLeftY, boxWidth, boxHeight, fillColor) => {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

colorCircle = (centerX, centerY, radius, fillColor) => {
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI *2, true);
    canvasContext.fill();
}

drawAll = () => {
    // clear game view by filling it black
    colorRect(0, 0, canvas.width, canvas.height, '#000000');

    // draw white rectangle to use as left player's paddle
    colorRect(0, PADDLE_Y, PADDLE_WIDTH, PADDLE_HEIGHT, '#FFFFFF');

    // draw the ball
    colorCircle(ballX, ballY, 10, '#FFFFFF');
}