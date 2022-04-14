const clock = document.querySelector(".clock");

function getZero(value) {
    return value < 10 ? `0${value}`: value;
}

function main() {
    setInterval(function () {
        const currentTime = new Date();
        const hour = getZero(currentTime.getHours());
        const min = getZero(currentTime.getMinutes());
        const sec = getZero(currentTime.getSeconds());
        clock.innerHTML = `${hour}:${min}:${sec}`;
    }, 1000);
}
main()