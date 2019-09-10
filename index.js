
let canvas, canvasContext;

let ballX = 75, ballY = 75;
const ballRadius = 10;
let PADDLE_Y = 250, PADDLE_Y_RIGHT = 250;
const PADDLE_HEIGHT = 100, PADDLE_WIDTH = 10;

const FPS = 30;
const ballSpeedMultiplier = 10;
const computerPaddleSpeed = 4, computerPaddleAccuracy = 35; // consts for changing AI difficulty, speed for paddle and angles of the shots
const MAX_SCORE = 2;

let ballSpeedX = 10, ballSpeedY = 2;
let player1_Score = 0, player2_Score = 0;

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

ballReset = () => {
    if(player1_Score == MAX_SCORE || player2_Score == MAX_SCORE) {
        player1_Score = 0;
        player2_Score = 0;
    }

    ballX = canvas.height / 2;
    ballY = canvas.width / 2;

    ballSpeedX *= -1; // flip horizontal direction when ball resets
    ballSpeedY = 2; // reset vertical direction when ball resets
}

moveComputerPaddle = () => {
    const distance = ballY -(PADDLE_Y_RIGHT + (PADDLE_HEIGHT/2)); // const for measuring distance the balls y coordinates with the paddle

    if(ballY < PADDLE_Y_RIGHT + (PADDLE_HEIGHT/2)) {
        if(distance < -35) {
            PADDLE_Y_RIGHT -= computerPaddleSpeed;
        }
    }else if(ballY > PADDLE_Y_RIGHT + (PADDLE_HEIGHT/2)) {
        if(distance > 35) {
            PADDLE_Y_RIGHT += computerPaddleSpeed;
        }
    };
}

moveAll = () => {
    moveComputerPaddle();

    if(ballX > canvas.width - ballRadius) { // added ballRadius for more accurate collision checks
        //collision check for right paddle
        if(ballY > PADDLE_Y_RIGHT && ballY < PADDLE_Y_RIGHT + PADDLE_HEIGHT) {
            let modifier = (ballY - (PADDLE_Y_RIGHT + (PADDLE_HEIGHT/2))) / (PADDLE_HEIGHT/2)
            ballSpeedY = modifier * ballSpeedMultiplier;
            ballSpeedX *= -1;
        }else {
            player1_Score++;
            ballReset();
        }
    }else if(ballX < ballRadius) {
        //collision check for left paddle
        if(ballY > PADDLE_Y && ballY < PADDLE_Y + PADDLE_HEIGHT) {
            let modifier = (ballY - (PADDLE_Y + (PADDLE_HEIGHT/2))) / (PADDLE_HEIGHT/2)
            ballSpeedY = modifier * ballSpeedMultiplier;
            ballSpeedX *= -1;
        }else {
            player2_Score++;
            ballReset();
        }
    }
    if(ballY > canvas.height - ballRadius) {
        ballSpeedY *= -1;
    }else if(ballY < ballRadius) {
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

writeText = (topLeftX, topY, text) => {
    canvasContext.font = "20px Comic Sans MS";
    canvasContext.fillStyle = "red";
    canvasContext.textAlign = "center";
    canvasContext.fillText("score: " + text, topLeftX, topY);
}

drawAll = () => {
    // clear game view by filling it black
    colorRect(0, 0, canvas.width, canvas.height, '#000000');

    // draw white rectangle to use as left player's paddle
    colorRect(0, PADDLE_Y, PADDLE_WIDTH, PADDLE_HEIGHT, '#FFFFFF');

    // draw white rectangle to use as right player's paddle
    colorRect(canvas.width - PADDLE_WIDTH, PADDLE_Y_RIGHT, PADDLE_WIDTH, PADDLE_HEIGHT, '#FFFFFF');

    // draw the ball
    colorCircle(ballX, ballY, 10, '#FFFFFF');

    // write score on canvas for player 1
    writeText(100, 100, player1_Score);

    // write score on canvas for player 2
    writeText(canvas.width - 100, 100, player2_Score);
}