document.addEventListener('DOMContentLoaded', function() {
    const text = "hello,<br>it's Alva!<br>welcome to my portfolio";
    let index = 0;
    const speed = 100; // typing speed in milliseconds

    function typeWriter() {
        if (index < text.length) {
            if (text.charAt(index) === '<') {
                const endIndex = text.indexOf('>', index);
                document.getElementById("intro-text").innerHTML += text.substring(index, endIndex + 1);
                index = endIndex + 1;
            } else {
                document.getElementById("intro-text").innerHTML += text.charAt(index);
                index++;
            }
            setTimeout(typeWriter, speed);
        }
    }

    typeWriter();
});