// Circle 1 
const circle1 = document.querySelector('.circle');
let x1 = Math.random() * window.innerWidth - 350; 
let y1 = Math.random() * window.innerHeight - 350;
let targetX1 = Math.random() * window.innerWidth - 350;
let targetY1 = Math.random() * window.innerHeight - 350;
let speed1 = 0.01;

// Circle 2 
const circle2 = document.querySelector('.circle2');
const centerRangeX = window.innerWidth * 0.6; 
const centerRangeY = window.innerHeight * 0.6;
const centerX = (window.innerWidth - 700) / 2;
const centerY = (window.innerHeight - 700) / 2;

let x2 = centerX + (Math.random() - 0.5) * centerRangeX;
let y2 = centerY + (Math.random() - 0.5) * centerRangeY;
let targetX2 = centerX + (Math.random() - 0.5) * centerRangeX;
let targetY2 = centerY + (Math.random() - 0.5) * centerRangeY;
let speed2 = 0.008;

function animate() {
    // Circle 1 - Free movement
    x1 += (targetX1 - x1) * speed1;
    y1 += (targetY1 - y1) * speed1;

    if (Math.abs(targetX1 - x1) < 100 && Math.abs(targetY1 - y1) < 100) {
        targetX1 = Math.random() * window.innerWidth - 350; 
        targetY1 = Math.random() * window.innerHeight - 350;
    }

    circle1.style.left = x1 + 'px';
    circle1.style.top = y1 + 'px';

    // Circle 2 - Center area movement
    x2 += (targetX2 - x2) * speed2;
    y2 += (targetY2 - y2) * speed2;

    if (Math.abs(targetX2 - x2) < 80 && Math.abs(targetY2 - y2) < 80) {
        targetX2 = centerX + (Math.random() - 0.5) * centerRangeX;
        targetY2 = centerY + (Math.random() - 0.5) * centerRangeY;
    }

    circle2.style.left = x2 + 'px';
    circle2.style.top = y2 + 'px';

    requestAnimationFrame(animate);
}

animate();



// Cursor follower for section 3
const cursorShape = document.getElementById('cursorShape');
const section3 = document.getElementById('section3');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

// Track mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function followCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    
    cursorShape.style.left = cursorX + 'px';
    cursorShape.style.top = cursorY + 'px';
    
    requestAnimationFrame(followCursor);
}

followCursor();

// Play sound on hover, stop on leave
const rabbit = document.getElementById("rabbit");
const rabbitSound = document.getElementById("rabbitSound");

const dog = document.getElementById("dog");
const dogSound = document.getElementById("dogSound");

const elephant = document.getElementById("elephant");
const elephantSound = document.getElementById("elephantSound");

const moose = document.getElementById("moose");
const mooseSound = document.getElementById("mooseSound");

const bird = document.getElementById("bird");
const birdSound = document.getElementById("birdSound");

rabbit.addEventListener('mouseenter', () => {
    rabbitSound.currentTime = 0;
    rabbitSound.play();
});

rabbit.addEventListener('mouseleave', () => {
    rabbitSound.pause();
    rabbitSound.currentTime = 0;
});

dog.addEventListener('mouseenter', () => {
    dogSound.currentTime = 0;
    dogSound.play();
});

dog.addEventListener('mouseleave', () => {
    dogSound.pause();
    dogSound.currentTime = 0;
});

elephant.addEventListener('mouseenter', () => {
    elephantSound.currentTime = 0;
    elephantSound.play();
});

elephant.addEventListener('mouseleave', () => {
    elephantSound.pause();
    elephantSound.currentTime = 0;
});

moose.addEventListener('mouseenter', () => {
    mooseSound.currentTime = 0;
    mooseSound.play();
});

moose.addEventListener('mouseleave', () => {
    mooseSound.pause();
    mooseSound.currentTime = 0;
});

bird.addEventListener('mouseenter', () => {
    birdSound.currentTime = 0;
    birdSound.play();
});

bird.addEventListener('mouseleave', () => {
    birdSound.pause();
    birdSound.currentTime = 0;
});