
// Menu button and nav for smaller screens


// Closing nav using menu button(s)
const menuBtns = document.querySelectorAll('.menu-btn');
menuBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        nav.classList.toggle('nav-hide');
    }, false);
});

// Close nav when the outside region is clicked on
const nav = document.querySelector('#nav');
nav.addEventListener('click', e => {
    if (e.target === e.currentTarget) {
        nav.classList.add('nav-hide');
    }
}, false);

const navLinks = document.querySelectorAll('header li > a');
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        nav.classList.add('nav-hide');
    }, false);
});
