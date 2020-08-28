const greet = document.querySelector(".greet");

const LS_KEY = {
    NAME: 'name'
};

function main() {
    const user = localStorage.getItem(LS_KEY.NAME) || 'rockstar';
    console.log(user, LS_KEY.NAME   )
    const hour = new Date().getHours();
    // 0 ~ 11 Good morning,
    // 12 ~ 18 Good afternnon
    // 18 ~ 24 good evening
    let greeting = '';
    if (hour >= 18) {
        greeting = "Good evening";
    } else if (hour >= 12) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good morning";
    }
    const message = `${greeting}, ${user}.`;
    greet.innerHTML=message;

}
main()