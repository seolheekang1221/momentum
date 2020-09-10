const user = document.querySelector("#profile");
const loginContainer = document.querySelector(".login-container");
const overlayImage = document.querySelector(".overlay-image");


function renderInputName() {
    // <input type="text" id="name" name="name" placeholder="Input your name" />
    const name = document.createElement("input");
    /*
    const name = {
        type: 'text',
        id: 'name',
        name: 'name',
        placeholder: '~'
    }
    name.type = 'text';
    // name.setAttribute('type', 'text')
    */
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
    if (!loginContainer.hidden && localStorage.getItem(LS_GREET_KEY.NAME) !== "") {
        loginContainer.innerHTML = `<button id="logout">Logout</button>`;
        const logout = document.querySelector("#logout");
        logout.onclick = function () {
            localStorage.removeItem(LS_GREET_KEY.NAME);
            document.location.href = "/";
        }
    }

}

function submitHandler(event) {
    event.preventDefault();
    console.log(this.children[0].value);
    localStorage.setItem(LS_GREET_KEY.NAME, this.children[0].value);
    document.location.href = "/";
}

function main() {
    loginContainer.onsubmit = submitHandler;
    //loginContainer.addEventListener('submit', submitHandler);
    loginContainer.hidden = true;
    user.onclick = clickHandler;
    //user.addEventListener('click', clickHandler);

}

main()