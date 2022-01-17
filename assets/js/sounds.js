let tone1 = document.getElementById("tone1");
let tone2 = document.getElementById("tone2");
let tone3 = document.getElementById("tone3");
let tone4 = document.getElementById("tone4");
let fail = document.getElementById("fail");

let isMuted = false;
let currentAudio;

function PlayTone(tone) {
    if (currentAudio !== undefined) currentAudio.pause();
    if (!isMuted) {
        switch (tone) {
            case 'tone1':
                tone1.play();
                currentAudio = tone1;
                break;
            case 'tone2':
                tone2.play();
                currentAudio = tone2;
                break;
            case 'tone3':
                tone3.play();
                currentAudio = tone3;
                break;
            case 'tone4':
                tone4.play();
                currentAudio = tone4;
                break;
            case 'fail':
                fail.play();
                currentAudio = fail;
                break;
        }
    }
}

function ToggleMute() {
    isMuted = !isMuted;
}