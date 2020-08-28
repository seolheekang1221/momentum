const user = document.querySelector("#profile");
const loginContainer = document.querySelector(".login-container");
const overlayImage = document.querySelector(".overlay-image");

let containerToggle = false;

function main(){
    user.onclick = function(){
        containerToggle = !containerToggle;
        if(containerToggle) {
            loginContainer.style.display="flex";
            overlayImage.style.opacity=0.9;
        }else{
            loginContainer.style.display="none";
            overlayImage.style.opacity=0.2;
        }
    }

}

main()