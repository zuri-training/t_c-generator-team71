const form = document.querySelector('.form')
const inputType = document.getElementById('password')
const email = document.getElementById('email')
const xIcon = document.querySelector('.eye-off')
const errEmail = document.querySelector('.error-email')
const errPassword = document.querySelector('.error-password')
const incorrect = document.querySelector('.incorrect')
const incorrectText = document.querySelector('.incorrect-text')
const baseUrl = 'https://termbuddy.herokuapp.com/api';

//onclick, check if the input type is [password] if it is, switch the input type [text] 
xIcon.addEventListener('click', () => {
    if (password.type === 'password') {
        inputType.setAttribute('type', 'text')
        //remove the original attribute then set a new attribute with a diffrent src path [your alternate icon]
        xIcon.removeAttribute('src')
        xIcon.setAttribute('src', 'images/eye.svg')
    } else {
        //reset
        inputType.setAttribute('type', 'password')
        xIcon.removeAttribute('src')
        xIcon.setAttribute('src', 'images/eye-slash.svg')
    }
})


form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (email.value === '' && inputType.value === '') {
        form.classList.add('error')
        setTimeout(() => {
            form.classList.remove('error')
        }, 2500)
    } else if (email.value === '') {
        form.classList.add('error1')
        setTimeout(() => {
            form.classList.remove('error1')
        }, 2500)
    } else if (inputType.value === '') {
        form.classList.add('error2')
        setTimeout(() => {
            form.classList.remove('error2')
        }, 2500)
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    fetch(`${baseUrl}/users/obtain-token/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => {
        if (res.status === 201) {
            window.location.href = 'https://zuri-training.github.io/t_c-generator-team71/dashboard/dashboard.html'
        } else {
            incorrect.style.display = 'flex';
            incorrectText.innerHTML = 'Incorrect email or password';

            setTimeout(() => {
                incorrect.style.display = 'none';
            }, 2500)
        }
        return res.json();
    }).then(data => {
        authToken = {
            refresh: data.tokens.refresh,
            access: data.tokens.access,
            id: data.id
        }
        localStorage.setItem('credentials', JSON.stringify(authToken));
        return authToken;
    }).then({

    }).catch(error => console.log(error));
})