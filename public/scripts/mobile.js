const mobileMenuBtnEle = document.getElementById("mobile-menu-btn");
const mobileMenuEle = document.getElementById("mobile-menu");

function toggleMobileMenu() {
    mobileMenuEle.classList.toggle('open');
}

mobileMenuBtnEle.addEventListener('click', toggleMobileMenu);