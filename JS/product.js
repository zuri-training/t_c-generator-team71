const backDrop=document.getElementById('back-drop')
const navMenu=document.getElementById('nav-menu')
const navToggle=document.getElementById('nav-toggle')


let currentToggle=true

navToggle.addEventListener('click', ()=>{
    navMenu.classList.toggle('show_nav')
    backDrop.classList.toggle('visible_blackdrop')

    if(currentToggle){
        navToggle.getAttribute('src')
        navToggle.removeAttribute('src')
        navToggle.setAttribute('src', 'images/menu_close.svg')
    }else{
        navToggle.getAttribute('src')
        navToggle.removeAttribute('src')
        navToggle.setAttribute('src', 'images/menu_open.svg')
    }
    currentToggle=!currentToggle
})


