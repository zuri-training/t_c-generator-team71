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
    
        fetch('https://termbuddy.herokuapp.com/api/password-reset/', {
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
                document.querySelector('.success').style.display = 'block';
                form.reset();
                setTimeout(() => {
                    window.location.href = 'https://zuri-training.github.io/t_c-generator-team71/login.html'
                }, 3000)
            }
            return res.json()
        }).then(data => console.log(data))
            .catch(error => console.log(error));

    }
})