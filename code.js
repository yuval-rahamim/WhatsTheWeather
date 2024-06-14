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
const CountryCity = document.getElementById("Country");

function selectcreateCountry(coun)
{
    console.log(coun);
    const sortedList = coun.data.sort((a, b) =>
        a.name.localeCompare(b.name));
    sortedList.forEach(c => {
        var option = document.createElement("option");
        option.value = String(c.name).replace(" ","%20");;
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
        option.value = String(c).replace(" ","%20");;
        option.text = c;
        City.appendChild(option);
    });
}

function testCounty(event) {
    cool.innerHTML = ""; // Clear previous results
    
    var eventValue =event.target.value;
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
    
    var eventValue =String(event.target.value).replace(" ","%20");
    console.log(eventValue);
    fetch(("https://nominatim.openstreetmap.org/search.php?city="+eventValue+"&country="+Country.value+"&format=jsonv2")).then(response=>{
        return response.json();
        }).then(res=>{
            console.log(res);
            fetch(("https://www.7timer.info/bin/astro.php?lon="+res.lon+"&lat="+res.lat+"&ac=0&unit=metric&output=json&tzshift=0"+eventValue+"&country="+Country.value+"&format=jsonv2")).then(response=>{
                return response.json();
                }).then(res=>{
                    console.log(res);
                    createWeather(res);
                }).catch(error=>{
                    console.log("error");
                })
        }).catch(error=>{
            console.log("error");
        }).finally(()=>{
            
        });
}

function createWeather(weather)
{
    console.log(weather);
    weather.dataseries.forEach(w => {
        console.log(w);
        let ho = document.createElement("div");
        ho.id = 'ho';

        let timepoint = document.createElement("h3");
        timepoint.textContent = "+"+ w.timepoint+"hrs";
        ho.appendChild(timepoint);

        // var playerPhoto = document.createElement("img");
        // playerPhoto.src = "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/"+p.playerId+".png"
        // ho.appendChild(playerPhoto);

        let cel = document.createElement("h2");
        cel.textContent =  w.temp2m+"°";
        ho.appendChild(cel);

        cool.appendChild(ho);
    });
}
