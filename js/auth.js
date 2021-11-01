import { auth, createUserWithEmailAndPassword } from './base.js';
import linksWithDataTarget from './modal.js';

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const emailValue = signupForm['signup-email'].value;
    const passWordValue = signupForm['signup-password'].value;

    createUserWithEmailAndPassword(auth, emailValue, passWordValue).then(cred => {
        console.log(cred.user);
        // Close modal
        const modalSection = document.querySelector('#modal-section');
        modalSection.classList.add('collapse');
        Array.from(linksWithDataTarget).forEach(link => {
            document.querySelector(`#${link.dataset.target}`).classList.remove('collapse');
        });
        // Reset form
        signupForm.reset();
    });
});