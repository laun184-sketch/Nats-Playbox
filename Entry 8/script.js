const unicorn = document.getElementById('unicorn');
const overlay = document.getElementById('overlay');

let x = Math.random() * (window.innerWidth - 150);
let y = Math.random() * (window.innerHeight - 80);
let dx = 0.8;
let dy = 0.8;
let isDragging = false;
let offsetX, offsetY;

function animate() {
    if (!isDragging) {
        x += dx;
        y += dy;

        // Wall collision
        if (x + 150 >= window.innerWidth || x <= 0) {
            dx = -dx;
        }
        if (y + 80 >= window.innerHeight || y <= 0) {
            dy = -dy;
        }

        unicorn.style.left = x + 'px';
        unicorn.style.top = y + 'px';
    }

    requestAnimationFrame(animate);
}

// Window resize
window.addEventListener('resize', () => {
    if (x + 150 > window.innerWidth) x = window.innerWidth - 150;
    if (y + 80 > window.innerHeight) y = window.innerHeight - 80;
});

// Dragging functionality
unicorn.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - unicorn.offsetLeft;
    offsetY = e.clientY - unicorn.offsetTop;
    e.preventDefault();
    
    // Start the scroll animation
    overlay.style.animationPlayState = 'running';
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        x = e.clientX - offsetX;
        y = e.clientY - offsetY;

        // Keep within bounds
        x = Math.max(0, Math.min(x, window.innerWidth - 150));
        y = Math.max(0, Math.min(y, window.innerHeight - 80));

        unicorn.style.left = x + 'px';
        unicorn.style.top = y + 'px';
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    
    // Pause and reset the scroll animation
    overlay.style.animation = 'none';
    setTimeout(() => {
        overlay.style.animation = 'scrollUp 100s linear forwards';
        overlay.style.animationPlayState = 'paused';
    }, 10);
});

animate();