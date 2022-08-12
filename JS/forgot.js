const form = document.getElementById('form');
const incorrect = document.querySelector('.error-message');
const incorrectText = document.querySelector('.incorrect-text');
const email = document.getElementById('email');
form.addEventListener('submit', e => {
    e.preventDefault();

    if (email.value === '') {
        incorrect.style.display = 'flex';
        incorrectText.innerHTML = 'Email cannot be blank';
        setTimeout(() => {
            incorrect.style.display = 'none';
        }, 2500)
    } else {

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
    
        fetch('https://termsbuddy.herokuapp.com/api/password-reset/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(res => {
            if (res.status === 400) {
                incorrect.style.display = 'flex';
                incorrectText.innerHTML = 'Email is not registered';
    
                setTimeout(() => {
                    incorrect.style.display = 'none';
                }, 2500)
            } else {
                window.location.href = 'https://abshaibu.github.io/test-P71/login.html';
    
            }
    
            console.log(res);
            return res.json()
        }).then(data => console.log(data))
            .catch(error => console.log(error));
    }
})