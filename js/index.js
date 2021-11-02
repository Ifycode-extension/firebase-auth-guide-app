const guidesList = document.querySelector('#guides');

let expandLists = () => {
    //Collapsible list items
    const collapseLists = document.querySelectorAll('#guides > li');
    collapseLists.forEach(list => {
        list.addEventListener('click', () => {
            //toggle class for current list (last div child)
            list.lastElementChild.classList.toggle('collapse');

            //close other other lists (last div child) when current list is open
            const otherLists = Array.from(collapseLists).filter(other => { return other !== list });
            otherLists.forEach(other => {
                other.lastElementChild.classList.add('collapse');
            });
        }, false);
    });
}

export const setupGuides = (data) => {
    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const guide = doc.data();
            //console.log(guide);
            const li = `
            <li>
                <div>${guide.title}</div>
                <div class="collapse-body collapse"><span>${guide.content}</span></div>
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
