const toggleNav = () => {
    const nav = document.querySelector('nav');
    if (nav.offsetWidth) {
        nav.classList.remove('nav-open');
        document.body.classList.remove('stop-scroll');
    } else {
        nav.classList.add('nav-open');
        document.body.classList.add('stop-scroll');
    }
}

document.querySelectorAll('.toggle-nav').forEach(button => {
    button.addEventListener('click', toggleNav);
})