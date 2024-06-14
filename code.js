fetch("https://countriesnow.space/api/v0.1/countries/info?returns=flag")
.then(response=>{
console.log(response);
return response.json();
}).then(res=>{
    
    selectcreateCountry(res);
}).catch(error=>{
    console.log("error");
}).finally(()=>{
});

const Country = document.getElementById("Country");
const City = document.getElementById("City");
const cool = document.getElementById("cool");
const myloader = document.getElementById("loader");
const CountryCity = document.getElementById("Country");

function selectcreateCountry(coun)
{
    console.log(coun);
    const sortedList = coun.data.sort((a, b) =>
        a.name.localeCompare(b.name));
    sortedList.forEach(c => {
        var option = document.createElement("option");
        option.value = String(c.name);
        option.text = c.name;
        Country.appendChild(option);
    });
}

function selectcreateCity(city)
{
    console.log(city);
    const sortedList = city.data.sort((a, b) =>
        a.localeCompare(b));
    city.data.forEach(c => {
        var option = document.createElement("option");
        option.value = String(c).replace("/ /gi","&nbsp");;
        option.text = c;
        City.appendChild(option);
    });
}

function testCounty(event) {
    City.innerHTML ="";
    cool.innerHTML = ""; // Clear previous results
    
    var eventValue =String(event.target.value).replace("/ /gi", "%20");
    console.log(eventValue);
    fetch(("https://countriesnow.space/api/v0.1/countries/cities/q?country=")+eventValue).then(response=>{
        console.log(response);
        return response.json();
        }).then(res=>{
            
            selectcreateCity(res);
        }).catch(error=>{
            console.log("error");
        }).finally(()=>{
            
        });
}

function testCity(event) {
    cool.innerHTML = ""; // Clear previous results
    myloader.style.visibility = "visible";
    var eventValue =String(event.target.value);
    console.log(eventValue +" "+ String(Country.value).replace("/ /gi","&nbsp"));
    fetch(("https://nominatim.openstreetmap.org/search.php?city="+eventValue+"&country="+Country.value+"&format=jsonv2")).then(response=>{
        return response.json();
        }).then(res=>{
            if (res.length > 0) {
                console.log(res[0].lon);
            } else {
                console.log("No results found");
            }
            fetch(("https://www.7timer.info/bin/astro.php?lon="+res[0].lon+"&lat="+res[0].lat+"&ac=0&unit=metric&output=json&tzshift=0")).then(response=>{
                return response.json();
                }).then(res=>{
                    console.log(res);
                    createWeather(res.dataseries);
                }).catch(error=>{
                    console.log("error");
                }).finally(()=>{
                    myloader.style.visibility = "hidden";
                });
        }).catch(error=>{
            console.log("error");
        })
}

function createWeather(weather)
{
    console.log(weather);
    weather.forEach(w => {
        console.log(w);
        let ho = document.createElement("div");
        ho.id = 'ho';

        let timepoint = document.createElement("h3");
        timepoint.textContent = "+"+ w.timepoint+"hrs";
        ho.appendChild(timepoint);

        let cloudCover = getCloudCover(w);
        let prec_type = w.prec_type;

        var weatherPhoto = document.createElement("img");
        if(prec_type == "rain")
        {
            weatherPhoto.src = "src/downpour-rainy-day-16531.png"
        }else if(prec_type == "Snow")
        {
            weatherPhoto.src = "src/snowfall-and-blue-cloud-16541.png"
        }else if(prec_type == "none")
        {
            if(cloudCover < 20)
            {
                weatherPhoto.src = "src/yellow-sun-16526.png"
            }else if(cloudCover < 80)
            {
                weatherPhoto.src = "src/yellow-sun-and-blue-cloud-16528.png"
            }else //if(cloudCover > 80)
            {
                weatherPhoto.src = "src/blue-cloud-and-weather-16527.png"
            }
        }
        if(w.lifted_index<=-6){
            if(w.prec_amount<4){
                weatherPhoto.src = "src/cloud-and-yellow-lightning-16534.png"
            }else{
                weatherPhoto.src = "src/lightning-and-blue-rain-cloud-16533.png"
            }
        }
        ho.appendChild(weatherPhoto);

        let cel = document.createElement("h2");
        cel.textContent =  w.temp2m+"°";
        ho.appendChild(cel);

        cool.appendChild(ho);
    });
}

function getCloudCover(w)
{
    switch(w.cloudcover){
        case 1:
            return 6;
        case 2:
            return 19;
        case 3:
            return 31;
        case 4:
            return 44;
        case 5:
            return 56;
        case 6:
            return 69;
        case 7:
            return 81;
        case 8:
            return 94;
        case 9:
            return 100;
    }
}

function getLifted_index(w)
{
    switch(w.lifted_index){
        case -10:

            break;
        case -6:
            
            break;
        case -4:

            break;
        case -1:
            
            break;
        case 2:

            break;
        case 6:
            
            break;
        case 10:

            break;
        case 15:
            
            break;
    }
}


function getPrec_type(w)
{
    switch(w.prec_type){
        case "snow":

            break;
        case "rain":
            
            break;
        case "frzr":

            break;
        case "icep":
            
            break;
        case "none":

            break;
    }
}
