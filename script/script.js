const NAVBAR_LI_ELEMENTS = document.getElementById('navbar').firstElementChild.children;    // Access all the <li> in side navigation
let flag = false;


// check for a match with the <li> element and SITE_URL, then make it active
Array.from(NAVBAR_LI_ELEMENTS).forEach((liElement) => {
    if (liElement.firstElementChild.href == location.href) {
        liElement.classList.add('active');
        flag = true;
        return;
    }
})

// if no other tab is active, then the Home tab becomes active
if (!flag) NAVBAR_LI_ELEMENTS[0].classList.add('active');