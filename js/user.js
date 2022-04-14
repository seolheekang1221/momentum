const user = document.querySelector("#profile");
const loginContainer = document.querySelector(".login-container");
const overlayImage = document.querySelector(".overlay-image");


function renderInputName() {
    const name = document.createElement("input");

    name.type = 'text';
    name.id = 'name';
    name.name = 'name';
    name.placeholder = 'input your name';

    loginContainer.appendChild(name);
}

function clickHandler() {
    loginContainer.hidden = !loginContainer.hidden;
    console.log(loginContainer.hidden, localStorage.getItem(LS_GREET_KEY.NAME))
    console.log(!loginContainer.hidden && localStorage.getItem(LS_GREET_KEY.NAME) !== 'rockstar');
    document.querySelector('.login-background').style.display = 'block';
    if (!loginContainer.hidden && localStorage.getItem(LS_GREET_KEY.NAME) !== "") {
        loginContainer.innerHTML = `<button id="logout">Logout</button>`;
        const logout = document.querySelector("#logout");
        logout.onclick = function () {
            localStorage.removeItem(LS_GREET_KEY.NAME);
            document.querySelector('.login-background').style.display = 'none';
            document.location.href = "/";
        }
    }
}

function submitHandler(event) {
    event.preventDefault();
    console.log(this.children[0].value);
    localStorage.setItem(LS_GREET_KEY.NAME, this.children[0].value);
    document.querySelector('.login-background').style.display = 'none';
    document.location.href = "/";
}

function main() {
    loginContainer.onsubmit = submitHandler;
    loginContainer.hidden = true;
    user.onclick = clickHandler;
}

main()