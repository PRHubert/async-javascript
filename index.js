
API_key = "f4b548007394a5b93f012815fcabba74";

async function getCurrentWeather(lat, lon){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`, {mode: "cors"});
        const weatherData = await  response.json();
        console.log(weatherData);
        return weatherData
    } catch{}
}


async function getCoordinates(name){
    try{    
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${API_key}`, {mode: "cors"});
        const data = await response.json();
        const latLon ={

            lat: data[0].lat,
            lon: data[0].lon,
    }
    return latLon
}catch{}

}

async function weather(name){
    try{
        const coordinates = getCoordinates(name);
        const data = await getCurrentWeather((await coordinates).lat, (await coordinates).lon);
       
        const namelocation = data.name;
        const countryCode = data.sys.country;
        const description = data.weather[0].description;
        const temperature = data.main.temp;
        const feelsLike = data.main.feels_like;
        const windspeed = data.wind.speed;
        const humidity = data.main.humidity;

        return{
            namelocation,
            countryCode,
            description,
            temperature,
            feelsLike,
            windspeed,
            humidity,
        }
    }catch{
        return " error"
    }
}
weather("london");
const renderWeatherComponents = (weatherObject) => {

    const main = document.createElement("main");
    document.querySelector("body").appendChild(main)

    const locationName = document.createElement("H1");
    locationName.id='location';
    locationName.textContent = `${weatherObject.namelocation}, ${weatherObject.countryCode}`;
    main.appendChild(locationName)

    const description = document.createElement("h2");
    description.id='description';
    description.textContent = `${weatherObject.description}`;
    main.appendChild(description);

    const bottomContainer = document.createElement("div");
    bottomContainer.id = "bottomContainer";
    main.appendChild(bottomContainer);

    const leftSide = document.createElement("div");
    leftSide.id = "leftSide";
    bottomContainer.appendChild(leftSide);

    const temperature = document.createElement("h2");
    temperature.id = "temperature";
    temperature.textContent = `${weatherObject.temperature}`;
    leftSide.appendChild(temperature);

    const units = document.createElement("h4")
    units.id = "units";
    units.textContent = 'C';
    leftSide.appendChild(units);

    const rightSide = document.createElement("div");
    rightSide.id = "rightSide";
    bottomContainer.appendChild(rightSide);

    const feelsLike = document.createElement("p");
    feelsLike.id = "feelsLike";
    feelsLike.textContent = `Feels Like: ${weatherObject.feelsLike} C`;
    rightSide.appendChild(feelsLike);

    const windspeed = document.createElement("p");
    windspeed.id = "wind";
    windspeed.textContent = `Wind: ${weatherObject.windspeed}`;
    rightSide.appendChild(windspeed);

    const humidity = document.createElement("p");
    humidity.id = "humidity";
    humidity.textContent = `Humidity: ${weatherObject.humidity}%`;
    rightSide.appendChild(humidity);
}

async function renderer(weatherObj, first = false){
    const weatherData = await weatherObj;

    if (first == true){
        renderWeatherComponents(weatherData);

    }else{
        document.querySelector("main").remove();
        document.querySelector("input").value=="";
        renderWeatherComponents(weatherData);
    }
}
document.querySelector("form").addEventListener("submit", (event)=> {
    event.preventDefault();
    renderer(weather(document.querySelector("input").value));
})
renderer(weather("lyon"),true);