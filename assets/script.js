document.addEventListener('DOMContentLoaded', function() {
    const text = "hello,<br>it's Alva!<br>welcome to my portfolio";
    let index = 0;
    const speed = 150; // typing speed in milliseconds
    const lastLineStart = text.lastIndexOf('<br>') + 4; // Find the start of the last line

    function typeWriter() {
        if (index < text.length) {
            if (text.charAt(index) === '<') {
                const endIndex = text.indexOf('>', index);
                document.getElementById("intro-text").innerHTML += text.substring(index, endIndex + 1);
                index = endIndex + 1;
            } else {
                if (index >= lastLineStart) {
                    document.getElementById("intro-text").innerHTML += `<span class='final-line'>${text.charAt(index)}</span>`;
                } else {
                    document.getElementById("intro-text").innerHTML += text.charAt(index);
                }
                index++;
            }
            setTimeout(typeWriter, speed);
        }
    }

    typeWriter();
});