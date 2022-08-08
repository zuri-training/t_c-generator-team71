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
    }
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    fetch('http://127.0.0.1:8000/api/password_reset/', {
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
        }

        console.log(res);
        return res.json()
    }).then(data => console.log(data))
        .catch(error => console.log(error));
    window.location.href = 'http://127.0.0.1:5500/login.html';
})