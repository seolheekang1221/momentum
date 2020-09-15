const toggle = document.querySelector('.toggle_button');
const left = document.querySelector('.left');
const right = document.querySelector('.right');
const mobile = document.querySelector('.mobile-header');

function clickHandler() {
    // left.classList.toggle('active');
    // right.classList.toggle('active');
    console.log('start')
    if (mobile.classList.contains('inactive')) {
        mobile.classList.remove('inactive')
        mobile.classList.add('active');
    } else {
        mobile.classList.remove('active')
        mobile.classList.add('inactive');
    }
}

function resizeHandler(e) {
   // console.log(window.innerWidth)
   if(window.innerWidth >= 750){
       mobile.classList.remove('active');
       mobile.classList.add('inactive');
   }


}

function main() {
    toggle.addEventListener('click', clickHandler);
    window.addEventListener('resize', resizeHandler);
}
main();