const form = document.getElementById('form');
const password = document.getElementById('password');
const incorrect = document.querySelector('.incorrect');
const errorText = document.querySelector('.error-text');
form.addEventListener('submit', e => {
    e.preventDefault();

    if (password.value === '') {
        incorrect.style.display = 'flex';
        errorText.innerHTML = 'Password cannot be blank';
        setTimeout(() => {
            incorrect.style.display = 'none';
        }, 2500)
    } else { 

        let data = {};
        let link = window.location.href;
        const linkToken = link.slice(47);
        console.log(linkToken);
        data = {
            password: password.value,
            token: linkToken
        };
    
        fetch('https://termsbuddy.herokuapp.com/api/password-reset/confirm/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(res => {
            if (res.status === 200) {
                window.location.href = 'https://abshaibu.github.io/test-P71/login.html';
            } else {
                incorrect.style.display = 'flex';
                errorText.innerHTML = 'Password must be at least 8 characters long';
    
                setTimeout(() => {
                    incorrect.style.display = 'none';
                }, 2500)
            }
            console.log(res);
            return res.json()
        }).then(data => console.log(data))
            .catch(error => console.log(error));
    }
})


// Show or Hide Password Value
const xIcon = document.querySelector('.eye-off');
xIcon.addEventListener('click', () => {
    if (password.type === 'password') {
        password.setAttribute('type', 'text')
        //remove the original attribute then set a new attribute with a diffrent src path [your alternate icon]
        xIcon.removeAttribute('src')
        xIcon.setAttribute('src', 'images/eye.svg')
    } else {
        //reset
        password.setAttribute('type', 'password')
        xIcon.removeAttribute('src')
        xIcon.setAttribute('src', 'images/eye-slash.svg')
    }
})