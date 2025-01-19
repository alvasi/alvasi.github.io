document.addEventListener('DOMContentLoaded', function() {
    const burgerIcon = document.getElementById('burger-icon');
    const burgerMenu = document.getElementById('burger-menu');

    burgerIcon.addEventListener('click', function() {
        burgerMenu.classList.toggle('show');
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024) {
            burgerMenu.classList.remove('show');
        }
    });
});