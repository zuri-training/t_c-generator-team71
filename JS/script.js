const selectEl = document.querySelector('.FAQs-section__select')
const arrowIcons = document.querySelector('.FAQs-section__select img')
const answersDropdown = document.querySelector('.FAQs-section__answer-dropdown')


arrowIcons.onclick = displayAnswer;

function displayAnswer() {
    selectEl.classList.toggle('active')
    answersDropdown.classList.toggle('active')
    arrowIcons.classList.toggle('active')
}



// mobile menu

const hamburgerIcon = document.querySelector('.hamburger__wrapper')
const menuBar = document.querySelector('.mobile-nav__container')
const menuBarOverlay = document.querySelector('#overlay')

hamburgerIcon.onclick = showMenuBar

function showMenuBar() {
    hamburgerIcon.classList.toggle('active')
    menuBar.classList.toggle('slide-out')
    menuBarOverlay.classList.toggle('active')
}

menuBarOverlay.addEventListener('click', function() {
    hamburgerIcon.classList.remove('active')
    menuBar.classList.remove('slide-out')
    menuBarOverlay.classList.remove('active')
})
