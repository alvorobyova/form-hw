// ЗАДАНИЕ 1
window.onload
{
    // ЗАДАНИЕ 2
    let fullName = document.querySelector('#full-name');
    fullName.onkeypress = function noDigits(event) {
        // if ("1234567890".indexOf(event.key) !== -1)
        if (!isNaN(parseInt(event.key))) {
            event.preventDefault();
        }
    }

    // ЗАДАНИЕ 3
    let userName = document.querySelector('#user-name');
    userName.onkeypress = function noSymbols(event) {
        if (".,".indexOf(event.key) !== -1)
            event.preventDefault();
    }

    // ЗАДАНИЕ 4
    let checkboxValue = document.getElementById('agree');
    checkboxValue.addEventListener('change', function () {
        if (this.checked) {
            console.log('Agree');
        } else {
            console.log('Not agree');
        }
    });

    // ЗАДАНИЕ 5
    let form = document.querySelector('form');
    let pageContainer = document.querySelector('.container.container-first');
    let validation = true;

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (event.target[0].value.length < 1) {
            alert("Fill in field 'Full Name'");
        } else if (event.target[1].value.length < 1) {
            alert("Fill in field 'Your Username'");
        } else if (event.target[2].value.length < 1) {
            alert("Fill in field 'E-mail'");
        } else if (event.target[3].value.length < 8) {
            alert("Password must contain at least 8 characters");
        } else if (event.target[4].value !== event.target[3].value) {
            alert("Password mismatch");
        } else if (!event.target[5].checked) {
            alert("Select checkbox");
        } else if (validation) {
            popup.setAttribute("style", "display: block")
            popup.scrollIntoView({behavior: "smooth"});
            pageContainer.style.opacity = "0.2";
            form.reset();
        }
    });

    // условие для перехода на страницу логина, если пользователь нажал ОК
    let popup = document.getElementById("popup");
    let popupOkButton = document.getElementById("popup-ok-button");

    let modalBlock = document.querySelector('.modal');

    popupOkButton.addEventListener("click", (event) => {
        pageContainer.style.display = "none";
        popup.style.display = "none";
        modalBlock.style.display = "block";
    });

// ЗАДАНИЕ 6

    let modalForm = document.querySelector('.modal__content .content__form');
    let modalValidation = true;

    modalForm.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (event.target[0].value.length < 1) {
            alert("Fill in field 'Your Username'");
        } else if (event.target[1].value.length < 1) {
            alert("Fill in field 'Password'");
        } else if (event.target[1].value.length < 8) {
            alert("Password must contain at least 8 characters. Please try again");
        } else if (modalValidation) {
            alert('Welcome, ' + event.target[0].value + '!');
            modalForm.reset();
        }
    });

    // переход на страницу логина по ссылке Already have an account?
    let link = document.querySelector('.form__question');

    link.onclick = function () {
        pageContainer.style.display = "none";
        modalBlock.style.display = "block";
    };

}



