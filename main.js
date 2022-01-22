const toggleNav = () => {
    const nav = document.querySelector('nav');
    if (nav.offsetWidth) {
        nav.classList.remove('nav-open');
        document.body.classList.remove('no-scroll');
    } else {
        nav.classList.add('nav-open');
        document.body.classList.add('no-scroll');
    }
}

// add event listener for nav toggle buttons
document.querySelectorAll('.toggle-nav').forEach(button => {
    button.addEventListener('click', toggleNav);
});