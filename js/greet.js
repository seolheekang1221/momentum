const greet = document.querySelector(".greet");
const profile = document.querySelector("#profile");

const LS_GREET_KEY = {
    NAME: 'name'
};

function main() {
    const user = localStorage.getItem(LS_GREET_KEY.NAME) || 'rockstar';
    const hour = new Date().getHours();
    let greeting = '';

    if (hour >= 18) {
        greeting = "Good evening";
    } else if (hour >= 12) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good morning";
    }

    const message = `${greeting}, ${user}.`;
    greet.innerHTML = message;
}
main()