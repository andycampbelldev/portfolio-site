//trap focus within header nav when nav open on mobile
const trapFocusNav = (trapping) => {
    const nav = document.querySelector('header nav');
    const focusable = document.querySelectorAll('a, button, input, textarea, .carousel-controls');
    for (let el of focusable) {
        if (!nav.contains(el) && trapping) {
            el.tabIndex = "-1"
        } else if (!nav.contains(el) && !trapping) {
            el.classList.contains('carousel-controls') ? el.tabIndex="0" : el.removeAttribute('tabindex');
        }
    }
}

const toggleNav = () => {
    const nav = document.querySelector('header nav');
    if (nav.offsetWidth) {
        nav.classList.remove('nav-open');
        document.body.classList.remove('no-scroll');
        setTimeout(() => {
            nav.classList.add('nav-display-override');
            trapFocusNav(false);
        },300)
    } else {
        nav.classList.remove('nav-display-override');
        trapFocusNav(true);
        setTimeout(() => {
            nav.classList.add('nav-open');
            document.body.classList.add('no-scroll');
        }, 0)
    }
}

// add event listener for nav toggle buttons
document.querySelectorAll('.toggle-nav').forEach(button => {
    button.addEventListener('click', toggleNav);
});

// profile photo easter egg ;)
const profilePhoto = document.querySelector('#profile-photo');

const hulkMode = () => {
    profilePhoto.style.filter = 'hue-rotate(-267deg) saturate(1.3)';
}

const today = new Date;
if (today.getDate() === 31 && today.getMonth() === 9) {
    setTimeout(
        hulkMode, 3000
    )
}

if(document.querySelector('#tech-section')) {
    document.querySelector('.fa-react').addEventListener('dblclick', evt => {
        const github = document.querySelector('.fa-github');
        github.addEventListener('dblclick', hulkMode);
        setTimeout(() => {
            github.removeEventListener('dblclick', hulkMode);
        }, 2000)
    })
}