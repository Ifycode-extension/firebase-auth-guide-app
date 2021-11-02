import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './base.js';
import { db, collection, query, addDoc, onSnapshot } from './base.js';
import { setupGuides, setupUI } from './index.js';
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


//===[ Authentication starts from here ]===//


//listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('User logged in: ', user);
        // Get firestore data if user is logged in
        const q = query(collection(db, 'guides'));
        // Realtime updates: Use onSnapshot (instead of getDocs)
        onSnapshot(q, (snapshot) => {
            setupGuides(snapshot.docs);
        });
        setupUI(user);
    } else {
        console.log('User logged out! user:', user);
        //Use empty array if user is NOT logged in
        setupGuides([]);
        setupUI(); //leaving it empty evaluates to null/false
    }
    //NB | TODO: onSnapshot still fires and there's error in the console when user logs out - fix this later.
});


// Create guides
const createGuidesForm = document.querySelector('#create-form');
createGuidesForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const guidesCollection = collection(db, 'guides');
        const docRef = await addDoc(guidesCollection, {
            title: createGuidesForm['title'].value,
            content: createGuidesForm['content'].value
        });
        closeModalAndResetForm(createGuidesForm);
    } catch(err) {
        console.log(err.message);
    }
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