const selectEl01 = document.getElementById('FAQ-select01')
const arrowIcon01 = document.querySelector('.img01')
const answerDropdown01 = document.getElementById('answer-dropdown01')

const selectEl02 = document.getElementById('FAQ-select02')
const arrowIcon02 = document.querySelector('.img02')
const answerDropdown02 = document.getElementById('answer-dropdown02')

const selectEl03 = document.getElementById('FAQ-select03')
const arrowIcon03 = document.querySelector('.img03')
const answerDropdown03 = document.getElementById('answer-dropdown03')

const selectEl04 = document.getElementById('FAQ-select04')
const arrowIcon04 = document.querySelector('.img04')
const answerDropdown04 = document.getElementById('answer-dropdown04')

const selectEl05 = document.getElementById('FAQ-select05')
const arrowIcon05 = document.querySelector('.img05')
const answerDropdown05 = document.getElementById('answer-dropdown05')

const selectEl06 = document.getElementById('FAQ-select06')
const arrowIcon06 = document.querySelector('.img06')
const answerDropdown06 = document.getElementById('answer-dropdown06')



selectEl01.onclick = displayAnswer01;

function displayAnswer01() {
    selectEl01.classList.toggle('active')
    answerDropdown01.classList.toggle('active')
    arrowIcon01.classList.toggle('active')
}

selectEl02.onclick = displayAnswer02;

function displayAnswer02() {
    selectEl02.classList.toggle('active')
    answerDropdown02.classList.toggle('active')
    arrowIcon02.classList.toggle('active')
}

selectEl03.onclick = displayAnswer03;

function displayAnswer03() {
    selectEl03.classList.toggle('active')
    answerDropdown03.classList.toggle('active')
    arrowIcon03.classList.toggle('active')
}

selectEl04.onclick = displayAnswer04;

function displayAnswer04() {
    selectEl04.classList.toggle('active')
    answerDropdown04.classList.toggle('active')
    arrowIcon04.classList.toggle('active')
}

selectEl05.onclick = displayAnswer05;

function displayAnswer05() {
    selectEl05.classList.toggle('active')
    answerDropdown05.classList.toggle('active')
    arrowIcon05.classList.toggle('active')
}

selectEl06.onclick = displayAnswer06;

function displayAnswer06() {
    selectEl06.classList.toggle('active')
    answerDropdown06.classList.toggle('active')
    arrowIcon06.classList.toggle('active')
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


// newsletter section

const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
    e.preventDefault
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log(data);

    fetch('https://termsbuddy.herokuapp.com/api/users/newsletter/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => { console.log(res);
        return res.json
    }).then(data => {console.log(data)}).catch(error => console.log(error));
})


