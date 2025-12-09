const canvas = document.getElementById('puppetCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 4536; // Your image width
canvas.height = window.innerHeight;

// puppet default 
let state = {
    bodyPos: { x: window.innerWidth / 2, y: window.innerHeight - 160 },
    headAngle: 0,
    leftShoulderAngle: 140,
    leftElbowAngle: 250,
    rightShoulderAngle: 60,
    rightElbowAngle: 30
};

// responsive website
window.addEventListener('resize', () => {
    canvas.width = 4536; // Your image width
    canvas.height = window.innerHeight;

    state.bodyPos.x = window.innerWidth / 2;
    state.bodyPos.y = window.innerHeight - 220;
    drawPuppet();
});

// dragging 
let dragging = null;
let dragStart = { x: 0, y: 0 };

// images
const images = {};
let imagesLoaded = 0;
const imageNames = ['head', 'body', 'left-upper-arm', 'left-forearm', 'right-upper-arm', 'right-forearm'];

// will use placeholders if images not found
imageNames.forEach(name => {
    const img = new Image();
    img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === imageNames.length) {
            drawPuppet();
        }
    };
    img.onerror = () => {
        imagesLoaded++;
        if (imagesLoaded === imageNames.length) {
            drawPuppet();
        }
    };
    img.src = name + '.png';
    images[name] = img;
});

// initial draw
drawPuppet();

// Redraw puppet when scrolling to keep it fixed
window.addEventListener('scroll', () => {
    drawPuppet();
});

function drawPuppet() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const bodyWidth = 360;
    const bodyHeight = 440;
    const headWidth = 350;
    const headHeight = 350;
    const upperArmLength = 150;  
    const forearmLength = 200;
    
    // draw body
    ctx.save();
    ctx.translate(state.bodyPos.x + window.scrollX, state.bodyPos.y);
    if (images.body.complete && images.body.naturalWidth > 0) {
        ctx.drawImage(images.body, -bodyWidth/2, -bodyHeight/2, bodyWidth, bodyHeight);
    } else {
        ctx.fillStyle = '#d32f2f';
        ctx.fillRect(-bodyWidth/2, -bodyHeight/2, bodyWidth, bodyHeight);
        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Body', 0, 0);
    }
    ctx.restore();
    
    // draw head
    ctx.save();
    ctx.translate(state.bodyPos.x + window.scrollX + 15, state.bodyPos.y - bodyHeight/2 - headHeight/2 + 80);
    ctx.rotate(state.headAngle * Math.PI / 180);
    if (images.head.complete && images.head.naturalWidth > 0) {
        ctx.drawImage(images.head, -headWidth/2, -headHeight/2, headWidth, headHeight);
    } else {
        ctx.fillStyle = '#daa520';
        ctx.fillRect(-headWidth/2, -headHeight/2, headWidth, headHeight);
        ctx.fillStyle = '#ffd700';
        ctx.fillRect(-headWidth/2, -headHeight/2 - 20, headWidth, 20);
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.fillText('Head', 0, 0);
    }
    ctx.restore();
    
    // RIGHT ARM FIRST (drawn behind)
    const rightShoulderX = state.bodyPos.x + window.scrollX + bodyWidth/2-70;
    const rightShoulderY = state.bodyPos.y - bodyHeight/3-55;
    
    ctx.save();
    ctx.translate(rightShoulderX, rightShoulderY);
    ctx.rotate(state.rightShoulderAngle * Math.PI / 180);
    
    // right upper arm
    if (images['right-upper-arm'].complete && images['right-upper-arm'].naturalWidth > 0) {
        ctx.drawImage(images['right-upper-arm'], 0, -60, 164, 120);
    } else {
        ctx.fillStyle = '#d32f2f';
        ctx.fillRect(0, -73, upperArmLength, 146);
        ctx.fillStyle = '#000';
        ctx.fillText('R Upper', upperArmLength/2, 0);
    }
    
    ctx.translate(upperArmLength - 40, -30);
    ctx.rotate(state.rightElbowAngle * Math.PI / 180);
    
    // right forearm
    if (images['right-forearm'].complete && images['right-forearm'].naturalWidth > 0) {
        ctx.drawImage(images['right-forearm'], 0, -60, 219, 120);
    } else {
        ctx.fillStyle = '#cd853f';
        ctx.fillRect(0, -73, forearmLength, 146);
        ctx.fillStyle = '#000';
        ctx.fillText('R Hand', forearmLength/2, 0);
    }
    ctx.restore();
    
    // LEFT ARM SECOND (drawn on top)
    const leftShoulderX = state.bodyPos.x + window.scrollX - bodyWidth/2+85;
    const leftShoulderY = state.bodyPos.y - bodyHeight/3-65;
    
    ctx.save();
    ctx.translate(leftShoulderX, leftShoulderY);
    ctx.rotate(state.leftShoulderAngle * Math.PI / 180);
    
    // left upper arm
    if (images['left-upper-arm'].complete && images['left-upper-arm'].naturalWidth > 0) {
        ctx.drawImage(images['left-upper-arm'], 0, -60, 164, 120);
    } else {
        ctx.fillStyle = '#d32f2f';
        ctx.fillRect(0, -73, upperArmLength, 146);
        ctx.fillStyle = '#000';
        ctx.fillText('L Upper', upperArmLength/2, 0);
    }
    
    ctx.translate(upperArmLength - 0, 15);
    ctx.rotate(state.leftElbowAngle * Math.PI / 180);
    
    // left forearm
    if (images['left-forearm'].complete && images['left-forearm'].naturalWidth > 0) {
        ctx.drawImage(images['left-forearm'], 0, -60, 219, 412);
    } else {
        ctx.fillStyle = '#cd853f';
        ctx.fillRect(0, -73, forearmLength, 146);
        ctx.fillStyle = '#000';
        ctx.fillText('L Hand', forearmLength/2, 0);
    }
    ctx.restore();
}

// Helper function to clamp angle between min and max
function clampAngle(angle, min, max) {
    if (angle < min) return min;
    if (angle > max) return max;
    return angle;
}

// limb end positions (joints)
function getLimbPositions() {
    const bodyWidth = 360;
    const bodyHeight = 440;
    const headWidth = 280;
    const headHeight = 320;
    const upperArmLength = 150;
    const forearmLength = 200;
    
    // left shoulder
    const leftShoulderX = state.bodyPos.x + window.scrollX - bodyWidth/2 + 85;
    const leftShoulderY = state.bodyPos.y - bodyHeight/3 - 65;
    
    // left elbow position
    const leftElbowAngleRad = state.leftShoulderAngle * Math.PI / 180;
    const leftElbowX = leftShoulderX + Math.cos(leftElbowAngleRad) * upperArmLength;
    const leftElbowY = leftShoulderY + Math.sin(leftElbowAngleRad) * upperArmLength + 15;
    
    // left hand position
    const leftHandAngleRad = leftElbowAngleRad + state.leftElbowAngle * Math.PI / 180;
    const leftHandX = leftElbowX + Math.cos(leftHandAngleRad) * forearmLength;
    const leftHandY = leftElbowY + Math.sin(leftHandAngleRad) * forearmLength;
    
    return {
        leftShoulder: { x: leftShoulderX, y: leftShoulderY },
        leftElbow: { x: leftElbowX, y: leftElbowY },
        leftHand: { x: leftHandX, y: leftHandY }
    };
}

// mouse for dragging
canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const positions = getLimbPositions();
    
    // check - only left arm can be dragged
    if (distance(mouseX, mouseY, positions.leftHand.x, positions.leftHand.y) < 50) {
        dragging = 'leftHand';
        dragStart = { x: mouseX, y: mouseY };
    } else if (distance(mouseX, mouseY, positions.leftElbow.x, positions.leftElbow.y) < 50) {
        dragging = 'leftElbow';
        dragStart = { x: mouseX, y: mouseY };
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const bodyWidth = 360;
    const bodyHeight = 440;
    const upperArmLength = 150;  
    const forearmLength = 200;
    
    if (dragging === 'leftElbow') {
        const leftShoulderX = state.bodyPos.x + window.scrollX - bodyWidth/2 + 85;
        const leftShoulderY = state.bodyPos.y - bodyHeight/3 - 65;
        let angle = Math.atan2(mouseY - leftShoulderY, mouseX - leftShoulderX) * 180 / Math.PI;
        
        // Normalize angle to 0-360 range
        if (angle < 0) angle += 360;
        
        // Only update if within valid range (0-180)
        if (angle <= 180) {
            state.leftShoulderAngle = angle;
        } else {
            // When outside range, stick to closest boundary
            if (angle > 180 && angle <= 270) {
                state.leftShoulderAngle = 180;
            } else {
                state.leftShoulderAngle = 0;
            }
        }
    } else if (dragging === 'leftHand') {
        const leftShoulderX = state.bodyPos.x + window.scrollX - bodyWidth/2 + 85;
        const leftShoulderY = state.bodyPos.y - bodyHeight/3 - 65;
        
        const leftElbowAngleRad = state.leftShoulderAngle * Math.PI / 180;
        const leftElbowX = leftShoulderX + Math.cos(leftElbowAngleRad) * upperArmLength;
        const leftElbowY = leftShoulderY + Math.sin(leftElbowAngleRad) * upperArmLength + 15;
        
        const handAngle = Math.atan2(mouseY - leftElbowY, mouseX - leftElbowX);
        let elbowAngle = (handAngle - leftElbowAngleRad) * 180 / Math.PI;
        
        // If shoulder angle is less than 90, restrict elbow to 0 to -90
        if (state.leftShoulderAngle < 90) {
            if (elbowAngle > 0) {
                elbowAngle = 0;
            } else if (elbowAngle < -90) {
                elbowAngle = -90;
            }
        }
        
        state.leftElbowAngle = elbowAngle;
    }
    
    drawPuppet();
});


canvas.addEventListener('mouseup', () => {
    dragging = null;
});

canvas.addEventListener('mouseleave', () => {
    dragging = null;
});

function distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function resetPose() {
    state = {
        bodyPos: { x: window.innerWidth / 2, y: window.innerHeight - 160 },
        headAngle: 0,
        leftShoulderAngle: 140,
        leftElbowAngle: 250,
        rightShoulderAngle: 60,
        rightElbowAngle: 30
    };
    
    drawPuppet();
}

// Convert vertical scroll to horizontal scroll
window.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0) {
        e.preventDefault();
        window.scrollBy({
            left: e.deltaY,
            behavior: 'auto'
        });
    }
}, { passive: false });

// Prevent vertical scrolling on touch devices
let touchStartY = 0;
window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchmove', (e) => {
    const touchY = e.touches[0].clientY;
    const deltaY = touchStartY - touchY;
    
    if (Math.abs(deltaY) > 0) {
        e.preventDefault();
        window.scrollBy(deltaY, 0);
        touchStartY = touchY;
    }
}, { passive: false });