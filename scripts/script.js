window.onload = () => {
    let pageContainer = document.querySelector('.container.container-first');
    let popup = document.getElementById("popup");

    let buttonSignUp = document.getElementById('signup-button');

    function handleInputChange(event) {
        const input= event.target;
        input.value !== ''?
            input.style.borderColor = 'palegreen':
            input.style.borderColor = '#C6C6C4';
    }
    const formInputs = document.querySelectorAll('form input');
    formInputs.forEach(input => {
        input.addEventListener('input', handleInputChange);
    });

    buttonSignUp.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        let formSignUp = document.getElementById('signup-form');
        let inputs = formSignUp.querySelectorAll('input.input__item');
        let formIsValid = true;

        inputs.forEach(input => {
            let value = input.value.trim();
            let errorEmpty = input.parentElement.querySelector('.signup__error.empty');
            let errorMistake = input.parentElement.querySelector('.signup__error.mistake');
            let password = document.querySelector('#password');
            let repeatPassword = document.querySelector('#repeat-password');

            errorMistake.style.display = 'none';
            input.style.borderColor = '#C6C6C4';

            let fieldIsValid = true;
            // Проверка наличие значения
            if (!value) {
                errorEmpty.style.display = 'block';
                input.style.borderColor = '#DD3142';
                fieldIsValid = false;
            } else {
                errorEmpty.style.display = 'none';
                input.style.borderColor = '#C6C6C4';
                fieldIsValid = false;

                if (input.id === 'full-name' && !/^[a-zA-Z\s]+$/.test(value)) {
                    errorMistake.style.display = 'block';
                    input.style.borderColor = '#DD3142';
                    fieldIsValid = false;
                } else if (input.id === 'user-name' && !/^[a-zA-Z0-9_-]+$/.test(value)) {
                    errorMistake.style.display = 'block';
                    input.style.borderColor = '#DD3142';
                    fieldIsValid = false;
                } else if (input.id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    errorMistake.style.display = 'block';
                    input.style.borderColor = '#DD3142';
                    fieldIsValid = false;
                } else if (input.id === 'password' && !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(value)) {
                    errorMistake.style.display = 'block';
                    input.style.borderColor = '#DD3142';
                    fieldIsValid = false;
                } else if (input.id === 'repeat-password' && password.value !== repeatPassword.value) {
                    errorMistake.style.display = 'block';
                    input.style.borderColor = '#DD3142';
                    fieldIsValid = false;
                } else {
                    fieldIsValid = true;
                    errorMistake.style.display = 'none';
                    input.style.borderColor = '#C6C6C4';
                }
            }

            formIsValid = formIsValid && fieldIsValid;

        });


        let checkboxValue = document.getElementById('agree');
        let checkboxEmpty = document.getElementById('checkbox-empty');
        let checkboxIsValid = true;

        if (checkboxValue.checked) {
            checkboxEmpty.style.display = 'none';
            checkboxIsValid = true;
        } else {
            checkboxEmpty.style.display = 'block';
            checkboxIsValid = false;
        }

        formIsValid = formIsValid && checkboxIsValid;

        if (formIsValid) {
            popup.setAttribute("style", "display: block");
            popup.scrollIntoView({behavior: "smooth"});
            pageContainer.style.opacity = "0.2";

            // Сохранение данные пользователя
            let fullName = document.getElementById('full-name').value;
            let userName = document.getElementById('user-name').value;
            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;

            // Создание объекта с данными о пользователе
            let user = {
                fullname: fullName,
                username: userName,
                password: password,
                email: email,
            };

            // Текущий массив с клиентами из Local Storage
            let users = JSON.parse(localStorage.getItem('users')) || [];

            // Новый пользователь в массив с клиентами
            users.push(user);

            // Сохранение массива с клиентами в Local Storage
            localStorage.setItem('users', JSON.stringify(users));

            console.log(users);

            // Очищаем форму после отправки
            document.getElementById('signup-form').reset();
        }
    });


    // условие для перехода на страницу логина, если пользователь нажал ОК
    let popupOkButton = document.getElementById("popup-ok-button");
    let loginPage = document.querySelector('.login');

    popupOkButton.addEventListener("click", (event) => {
        pageContainer.style.display = "none";
        popup.style.display = "none";
        loginPage.style.display = "block";
    });

    // переход на страницу входа по ссылке Already have an account?
    let linkToLogin = document.querySelector('.form__link.to-login');

    linkToLogin.onclick = function () {
        pageContainer.style.display = "none";
        loginPage.style.display = "block";
    };

    // СТРАНИЦА ВХОДА


    // обновление страницы при клике на Registration
    let linkToRegistration = document.querySelector('.form__link.to-registration');
    linkToRegistration.onclick = function (event) {
        event.preventDefault();

        document.body.style.transition = 'opacity 0.5s ease-out'; // Плавное исчезновение страницы входа
        document.body.style.opacity = 0;

        setTimeout(function () {
            location.reload();
        }, 500);
    };

    // валидация

    let buttonLogin = document.getElementById('login-button');

    buttonLogin.addEventListener('click', function (event) {
        event.preventDefault();

        let usernameError = document.querySelector('.login__error.username');
        let passwordError = document.querySelector('.login__error.password');
        let loginPassword = document.getElementById('password2');
        let loginUsername = document.getElementById('user-name2');

        usernameError.style.display = 'none';
        passwordError.style.display = 'none';
        loginUsername.style.borderColor = '#C6C6C4';
        loginPassword.style.borderColor = '#C6C6C4';

        let username = loginUsername.value.trim();
        let password = loginPassword.value.trim();

        let currentUsers = JSON.parse(localStorage.getItem('users')) || [];
        let user = currentUsers.find(user => user.username === username);


        if (!username) {
            usernameError.style.display = 'block';
            loginUsername.style.borderColor = '#DD3142';
        }

       if (!password) {
            passwordError.style.display = 'block';
            loginPassword.style.borderColor = '#DD3142';
        }

        else {
            if (!user) {
                loginUsername.style.borderColor = '#DD3142';
                usernameError.style.display = 'block';
                usernameError.innerText = 'Such user does not exist';
            } else if (user.password !== password) {
                loginPassword.style.borderColor = '#DD3142';
                passwordError.style.display = 'block';
                passwordError.innerText = 'Incorrect password';
            } else {
                usernameError.style.display = 'none';
                passwordError.style.display = 'none';
                loginPage.style.display = "none";
                document.querySelector('.container.container-third').style.display = "block";
                document.querySelector('.account__header span').textContent = user.fullname + '!';
            }
        }
    });

    //обновление страницы при нажатии на кнопку exit

    let exitButton = document.getElementById('exit');

    exitButton.onclick = function (event) {
        event.preventDefault();
        document.body.style.transition = 'opacity 0.5s ease-out'; // Плавное исчезновение страницы входа
        document.body.style.opacity = 0;

        setTimeout(function () {
            location.reload();
        }, 500);
    }

}



