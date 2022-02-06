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