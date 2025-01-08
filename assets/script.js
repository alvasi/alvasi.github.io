document.addEventListener('DOMContentLoaded', function() {
    const text = "hello, it's Alva! welcome to my portfolio";
    let index = 0;
    const speed = 100; // typing speed in milliseconds

    function typeWriter() {
        if (index < text.length) {
            document.getElementById("intro-text").innerHTML += text.charAt(index);
            index++;
            setTimeout(typeWriter, speed);
        }
    }

    typeWriter();
});