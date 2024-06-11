const NAVBAR_LI_ELEMENTS = document.getElementById('navbar').firstElementChild.children;    // Access all the <li> in side navigation
let flag = false;


// rotate the arrow of <li> which matches the SITE_URL
Array.from(NAVBAR_LI_ELEMENTS).forEach((liElement) => {
    if (liElement.firstElementChild.href == location.href) {
        liElement.classList.add('active');
        flag = true;
        return;
    }
})

// if non of other is active the the Home tab is active
if (!flag) NAVBAR_LI_ELEMENTS[0].classList.add('active');