document.addEventListener('DOMContentLoaded', function() {
    const lines = [
        "hello,",
        "it's Alva!",
        "welcome to my portfolio"
    ];
    const ids = ["line1", "line2", "line3"];
    let index = 0;
    const speed = 100; // typing speed in milliseconds

    function typeWriter(lineIndex, charIndex) {
        if (charIndex < lines[lineIndex].length) {
            document.getElementById(ids[lineIndex]).innerHTML += lines[lineIndex].charAt(charIndex);
            setTimeout(() => typeWriter(lineIndex, charIndex + 1), speed);
        } else if (lineIndex < lines.length - 1) {
            setTimeout(() => typeWriter(lineIndex + 1, 0), speed);
        }
    }

    typeWriter(0, 0);
});