import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './base.js';
import { db, collection, query, addDoc, onSnapshot, doc, setDoc } from './base.js';
import { functions, httpsCallable } from './base.js';
import { setupGuides, setupUI } from './index.js';
import linksWithDataTarget from './modal.js';

// Access cloud function from your application
const adminForm = document.querySelector('#admin-form');
adminForm.addEventListener('submit', async e => {
    e.preventDefault();
    const adminEmailValue = document.querySelector('#admin-email').value;
    const addAdminRole = httpsCallable(functions, 'addAdminRole');
    addAdminRole({ email: adminEmailValue }).then(result => {
        console.log(result);
        // Reset form too
        adminForm.reset();
    }).catch(err => {
        console.log(err);
    });
});


// Close modal and reset modal forms
let closeModalAndResetForm = (form) => {
    // Close modal
    const modalSection = document.querySelector('#modal-conatiner');
    modalSection.classList.add('hidden');
    Array.from(linksWithDataTarget).forEach(link => {
        document.querySelector(`#${link.dataset.target}`).classList.remove('hidden');
    });
    // Reset form
    form.reset();
}


//===[ Authentication starts from here ]===//


//listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('User logged in: ', user);

        //get if admin property and boolean value 
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            setupUI(user);
        });

        // Get firestore data if user is logged in
        const q = query(collection(db, 'guides'));
        // Realtime updates: Use onSnapshot (instead of getDocs)
        onSnapshot(q, (snapshot) => {
            setupGuides(snapshot.docs);
        }, (err) => {
            console.log(err.message);
        });
    } else {
        console.log('User logged out! user:', user);
        //Use empty array if user is NOT logged in
        setupGuides([]);
        setupUI(); //leaving it empty evaluates to null/false
    }
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
        const newUsersRef = doc(db, 'users', cred.user.uid);
        return setDoc(newUsersRef, { 
            name: signupForm['signup-name'].value,
            bio: signupForm['signup-bio'].value 
        });
    }).then(() => {
        closeModalAndResetForm(signupForm);
        signupForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
        signupForm.querySelector('.error').innerHTML = err.message;
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
        loginForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
        loginForm.querySelector('.error').innerHTML = err.message;
    });
});