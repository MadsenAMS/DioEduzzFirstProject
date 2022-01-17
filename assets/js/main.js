let gameover = false;
document.getElementById("start").addEventListener('click', function() { Start() });

function Start() {
    gameover = false;
    ResetBoard();
    playSequence.next();
}