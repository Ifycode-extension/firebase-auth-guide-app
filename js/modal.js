
// Manipulating modal-section and modal components

const modalSection = document.querySelector('#modal-section');
const navLinks = document.querySelectorAll('header li > a');
const linksWithDataTarget = Array.from(navLinks).filter(link => { return link.dataset.target !== undefined });
linksWithDataTarget.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        // Open modal-section when nav links are clicked on
        modalSection.classList.remove('hidden');

        // Hide all other modal components not needed yet
        const otherDataTargetLinks = Array.from(linksWithDataTarget).filter(others => { return others !== link });
        otherDataTargetLinks.forEach(other => {
            document.querySelector(`#${other.dataset.target}`).classList.add('hidden');
        });
    }, false);
});

// On element click
modalSection.addEventListener('click', e => {
    // Close modal when outside the form is clicked
    if (e.target === e.currentTarget) {
        modalSection.classList.add('hidden');

        // Restore all back to not hidden in preparation for hiding when necessary
        linksWithDataTarget.forEach(link => {
            document.querySelector(`#${link.dataset.target}`).classList.remove('hidden');
        });
    }
}, false);

// export for use in auth.js
export default linksWithDataTarget;