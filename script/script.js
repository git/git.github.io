const NAVBAR_LI_ELEMENTS = document.getElementById('navbar').firstElementChild.children;    // Access all the <li> in side navigation

// check for a match with the <li> element and SITE_URL, then make it active
Array.from(NAVBAR_LI_ELEMENTS).forEach((liElement) => {
    if (liElement.firstElementChild.href == location.href) {
        liElement.classList.add('active');
        return;
    }
})