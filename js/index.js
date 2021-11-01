

document.addEventListener('DOMContentLoaded', () => {
    //Collapsible list items
    const collapseLists = document.querySelectorAll('.collapse-container > li');
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
});




/* //Only toggle current list

document.addEventListener('DOMContentLoaded', () => {
    const collapseLists = document.querySelectorAll('.collapse-container > li');
    collapseLists.forEach(list => {
        console.log(list.lastChild);
        list.addEventListener('click', () => {
            list.lastElementChild.classList.toggle('collapse');
        }, false);
    });
});
*/