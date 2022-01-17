let isPlayersTurn = false;
let geniusOrder = [];
let playerOrder = [];
let score = 0;
let playSequence;

const blueButton = document.getElementById("blue");
blueButton.addEventListener('click', function() { Click(this) });
const redButton = document.getElementById("red");
redButton.addEventListener('click', function() { Click(this) });
const yellowButton = document.getElementById("yellow");
yellowButton.addEventListener('click', function() { Click(this) });
const greenButton = document.getElementById("green")
greenButton.addEventListener('click', function() { Click(this) });

const COLOR = {
    RED: 0,
    BLUE: 1,
    YELLOW: 2,
    GREEN: 3
}

function ResetBoard() {
    geniusOrder = [];
    playerOrder = [];
    isPlayersTurn = false;
    score = 0;
    blueButton.classList.add('unselected');
    redButton.classList.add('unselected');
    greenButton.classList.add('unselected');
    yellowButton.classList.add('unselected');
    playSequence = Sequence();
}

function* Sequence() {
    geniusOrder[geniusOrder.length] = ShuffleColor();

    for (let i = 0; i < geniusOrder.length; i++) {
        LightColor(geniusOrder[i], 750);
        yield;
    }

    isPlayersTurn = true;
}

function ShuffleColor() {
    let nextColor = Math.floor(Math.random() * 4);
    return nextColor;
}

async function LightColor(number, timer) {
    switch (number) {
        case COLOR.BLUE:
            PlayTone('tone1');
            LightUp(blueButton, timer);
            break;
        case COLOR.RED:
            PlayTone('tone2');
            LightUp(redButton, timer);
            break;
        case COLOR.YELLOW:
            PlayTone('tone3');
            LightUp(yellowButton, timer);
            break;
        case COLOR.GREEN:
            PlayTone('tone4');
            LightUp(greenButton, timer);
            break;
    }

    async function LightUp(targetElement, timer) {
        targetElement.classList.remove("unselected");
        setTimeout(() => {
            targetElement.classList.add("unselected");
        }, timer);
        setTimeout(() => {
            if (!isPlayersTurn) playSequence.next();
        }, timer + (timer * 0.5));
    }
}

function Click(button) {
    if (isPlayersTurn) {
        switch (button) {
            case blueButton:
                LightColor(COLOR.BLUE, 300)
                playerOrder[playerOrder.length] = COLOR.BLUE;
                break;
            case yellowButton:
                LightColor(COLOR.YELLOW, 300)
                playerOrder[playerOrder.length] = COLOR.YELLOW;
                break;
            case redButton:
                LightColor(COLOR.RED, 300)
                playerOrder[playerOrder.length] = COLOR.RED;
                break;
            case greenButton:
                LightColor(COLOR.GREEN, 300)
                playerOrder[playerOrder.length] = COLOR.GREEN;
                break;
        }

        if (playerOrder[playerOrder.length - 1] === geniusOrder[playerOrder.length - 1]) {
            if (playerOrder.length === geniusOrder.length) {
                isPlayersTurn = false;
                setTimeout(() => {
                    score++;
                    document.getElementById("score").innerHTML = score;
                    playerOrder = [];
                    playSequence = Sequence();
                    playSequence.next();
                }, 1000)
            }
        } else {
            PlayTone('fail');
            blueButton.classList.remove('unselected');
            redButton.classList.remove('unselected');
            greenButton.classList.remove('unselected');
            yellowButton.classList.remove('unselected');
            alert("Game Over!");
        }
    }
}