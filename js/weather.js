const API = "b4fea89290dc92e7fae4374a674da1fe";
function getLocationURL(lat, lon) {
    return `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}`;
}

const locationInfo = document.querySelector("#location-info");

function main(){
    navigator.geolocation.getCurrentPosition(function(data){
        // console.log(data);
        // data.coords.latitude, data.coords.longitude
        const { latitude, longitude} = data.coords;
        fetch(getLocationURL(latitude, longitude))
            .then(res => res.json())
            .then(res => {
                const{ name} = res;
                const { temp} = res.main;
                locationInfo.innerText = `${name}, ${Math.floor((temp - 270) * 100) / 100} °C`;
            })
    }, function(error){
        console.log(error);
    })
    // api continue

}

main()
