const toggleNav = () => {
    const nav = document.querySelector('nav');
    nav.offsetWidth ? nav.style.width = '0' : nav.style.width = '95%'
}

document.querySelectorAll('.toggle-nav').forEach(button => {
    button.addEventListener('click', toggleNav);
})