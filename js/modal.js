
const modalSection = document.querySelector('#modal-section');
const navLinks = document.querySelectorAll('header li > a');
const linksWithDataTarget = Array.from(navLinks).filter(link => { return link.dataset.target !== undefined });
linksWithDataTarget.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        // Open modal-section when nav links are clicked on
        modalSection.classList.remove('collapse');

        // Hide all other forms not needed yet
        const otherDataTargetLinks = Array.from(linksWithDataTarget).filter(others => { return others !== link });
        otherDataTargetLinks.forEach(other => {
            document.querySelector(`#${other.dataset.target}`).classList.add('collapse');
        });
    }, false);
});

// First time page loads
modalSection.classList.add('collapse');

// On element click
modalSection.addEventListener('click', e => {
    // Close modal when outside the form is clicked
    if (e.target === e.currentTarget) {
        modalSection.classList.add('collapse');

        // Restore all back to not hidden in preparation for hiding when necessary
        linksWithDataTarget.forEach(link => {
            document.querySelector(`#${link.dataset.target}`).classList.remove('collapse');
        });
    }
}, false);