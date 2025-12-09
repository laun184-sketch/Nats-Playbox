function followCursor(eyeId, pupilId) {
    const eye = document.getElementById(eyeId);
    const pupil = document.getElementById(pupilId);

    const eyeRadius = 75;
    const pupilRadius = 25;
    const maxMove = eyeRadius - pupilRadius;

    document.addEventListener("mousemove", (e) => {
        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const dx = e.clientX - eyeCenterX;
        const dy = e.clientY - eyeCenterY;

        const distance = Math.hypot(dx, dy);
        const clamped = Math.min(distance, maxMove);
        const angle = Math.atan2(dy, dx);

        const x = Math.cos(angle) * clamped;
        const y = Math.sin(angle) * clamped;

        // combine original centering + movement
        pupil.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
}

followCursor("lefteye", "leftpupil");
followCursor("righteye", "rightpupil");
