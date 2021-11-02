import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './base.js';
import { db, collection, getDocs, query } from './base.js';
import { setupGuides } from './index.js';
import linksWithDataTarget from './modal.js';

let closeModalAndResetForm = (form) => {
    // Close modal
    const modalSection = document.querySelector('#modal-section');
    modalSection.classList.add('collapse');
    Array.from(linksWithDataTarget).forEach(link => {
        document.querySelector(`#${link.dataset.target}`).classList.remove('collapse');
    });
    // Reset form
    form.reset();
}

//===[ Get firestore data ]===//

const q = query(collection(db, 'guides'));
const snapshot = await getDocs(q); //use the await keyword
//console.log(snapshot.docs);
setupGuides(snapshot.docs);


//===[ Authentication starts from here ]===//


//listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) console.log('User logged in: ', user);
        else console.log('User looged out!');
});


// Sign user up
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const emailValue = signupForm['signup-email'].value;
    const passWordValue = signupForm['signup-password'].value;

    createUserWithEmailAndPassword(auth, emailValue, passWordValue).then(cred => {
        //console.log(cred.user);
        closeModalAndResetForm(signupForm);
    });
});


// Log user out
const logout = document.querySelector('#logout');
logout.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut();/*.then(() => {
        console.log('User signed out!');
    });*/
});


// Log user (back) in
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const emailValue = loginForm['login-email'].value;
    const passWordValue = loginForm['login-password'].value;

    signInWithEmailAndPassword(auth, emailValue, passWordValue).then(cred => {
        //console.log(cred.user);
        closeModalAndResetForm(loginForm);
    });
});