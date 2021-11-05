import { db, doc, getDoc } from './base.js';

const guidesList = document.querySelector('#guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('#account-details');
const adminItems = document.querySelectorAll('.admin');

// show or hide menu links depending on if user is logged in or not
export const setupUI = async (user) => {
    if (user) {
        //Display these only if user is admin
        if (user.admin) {
            adminItems.forEach(item => item.style.display = 'block');
        }
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
        // toggle links
        loggedInLinks.forEach(link => link.style.display = 'block');
        loggedOutLinks.forEach(link => link.style.display = 'none');
    } else {
        //hide admin items
        adminItems.forEach(item => item.style.display = 'none');
        //hide account info
        accountDetails.innerHTML = '';
        // toggle links
        loggedInLinks.forEach(link => link.style.display = 'none');
        loggedOutLinks.forEach(link => link.style.display = 'block');
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
    } else {
        guidesList.innerHTML = `<h5 class="not-loggedIn">Login to view guides </h5>`;
    }
    
}

document.addEventListener('DOMContentLoaded', () => {
    //NB: since I didn't use materialise.css, the expandlists() only works when called in setupGuides()
});
