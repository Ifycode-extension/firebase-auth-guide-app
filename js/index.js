import { db, doc, getDoc } from './base.js';

const guidesList = document.querySelector('#guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const loggedInOuTLinks = document.querySelectorAll('.logged-in-out');
const accountDetails = document.querySelector('#account-details');
const adminItems = document.querySelectorAll('.admin');
const description = document.querySelector('#description');

// show or hide menu links depending on if user is logged in or not
export const setupUI = async (user) => {
    if (user) {
        // Display these only if user is admin
        if (user.admin) {
            description.classList.add('hidden');
            adminItems.forEach(item => item.classList.add('show-block'));
        }

        // If not admin
        if (!user.admin) {
            description.classList.remove('hidden');
        }

        // toggle links
        loggedInOuTLinks.forEach(link => link.classList.add('show-block'));
        loggedInLinks.forEach(link => link.classList.add('show-block'));
        loggedOutLinks.forEach(link => link.classList.remove('show-block'));
        // display account info (all users)
        const usersRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(usersRef);
        const html = `
        <h2>${docSnap.data().name}</h2>
        <div>Logged in as ${user.email}</div>
        <div>Bio: ${docSnap.data().bio}</div>
        <div class='${user.admin ? 'admin-badge' : ''}'><b>${user.admin ? 'Admin' : ''}</b></div>
        `;
        accountDetails.innerHTML = html;
    } else {
        description.classList.remove('hidden');
        // toggle links
        loggedInOuTLinks.forEach(link => link.classList.add('show-block'));
        loggedInLinks.forEach(link => link.classList.remove('show-block'));
        loggedOutLinks.forEach(link => link.classList.add('show-block'));
        //hide admin items
        adminItems.forEach(item => item.classList.remove('show-block'));
        //hide account info
        accountDetails.innerHTML = '';
    }
}

// expand | collapse guides list items (returned from db) on click
let expandLists = () => {
    //Collapsible list items
    const collapsibleLists = document.querySelectorAll('#guides > li');
    collapsibleLists.forEach(list => {
        list.addEventListener('click', () => {
            //toggle class for current list (last div child)
            list.lastElementChild.classList.toggle('hidden');

            //close other other lists (last div child) when current list is open
            const otherLists = Array.from(collapsibleLists).filter(other => { return other !== list });
            otherLists.forEach(other => {
                other.lastElementChild.classList.add('hidden');
            });
        }, false);
    });
}

// setup guides
export const setupGuides = (data) => {
    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const guide = doc.data();
            //console.log(guide);
            const li = `
            <li>
                <div>${guide.title}</div>
                <div class="collapsible-body hidden"><span>${guide.content}</span></div>
            </li>
            `;
    
            //Add li elements to html
            html += li;
        });
        guidesList.innerHTML = html;
        expandLists();
    } /*else {
        guidesList.innerHTML = `<h5 class="not-loggedIn">Login to view guides </h5>`;
    }*/
    
}

document.addEventListener('DOMContentLoaded', () => {
    //NB: since I didn't use materialise.css, the expandlists() only works when called in setupGuides()
});
