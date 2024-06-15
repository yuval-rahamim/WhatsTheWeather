// Fetch country information including flags from the API
fetch("https://countriesnow.space/api/v0.1/countries/info?returns=flag")
    .then(response => {
        console.log(response); // Log the response object for debugging
        return response.json(); // Parse the JSON response
    })
    .then(res => {
        // Once data is fetched, populate the country dropdown list
        selectcreateCountry(res);
    })
    .catch(error => {
        console.log("Error fetching country information:", error); // Log any errors that occur during fetching
    });

// Elements from the HTML DOM
const Country = document.getElementById("Country"); // Select the dropdown for countries
const City = document.getElementById("City"); // Select the dropdown for cities
const cool = document.getElementById("cool"); // Select the container for weather information
const myloader = document.getElementById("loader"); // Select the loader element
const CountryCity = document.getElementById("CountryCity"); // Select the element to display selected country and city

const firstoption = document.getElementById("firstoption"); // Select the first option for cities dropdown
const firstoptionCountry = document.getElementById("firstoptionCountry"); // Select the first option for countries dropdown

// Function to populate the country dropdown list
function selectcreateCountry(coun) {
    console.log(coun); // Log the country data object for debugging
    // Sort countries alphabetically by name
    const sortedList = coun.data.sort((a, b) => a.name.localeCompare(b.name));
    // Create an <option> for each country and append it to the Country dropdown
    sortedList.forEach(c => {
        var option = document.createElement("option");
        option.value = String(c.name);
        option.text = c.name;
        Country.appendChild(option);
    });
}

// Function to populate the city dropdown list based on selected country
function selectcreateCity(city) {
    console.log(city); // Log the city data object for debugging
    // Sort cities alphabetically
    const sortedList = city.data.sort((a, b) => a.localeCompare(b));
    // Create an <option> for each city and append it to the City dropdown
    sortedList.forEach(c => {
        var option = document.createElement("option");
        option.value = String(c).replace("/ /gi", "&nbsp");
        option.text = c;
        City.appendChild(option);
    });
}

// Event handler when a country is selected
function testCounty(event) {
    CountryCity.innerText = event.target.value; // Display selected country in UI
    City.innerHTML = ""; // Clear previous cities in dropdown
    cool.innerHTML = ""; // Clear previous weather results

    // Replace spaces in country name for URL compatibility
    var eventValue = String(event.target.value).replace("/ /gi", "%20");
    console.log(eventValue);

    // Fetch cities for the selected country from API
    fetch(("https://countriesnow.space/api/v0.1/countries/cities/q?country=") + eventValue)
        .then(response => {
            console.log(response); // Log the response object for debugging
            return response.json(); // Parse the JSON response
        })
        .then(res => {
            // Once data is fetched, populate the city dropdown list
            selectcreateCity(res);
        })
        .catch(error => {
            console.log("Error fetching cities:", error); // Log any errors that occur during fetching
        })
        .finally(() => {
            // Insert a default option at the beginning of the City dropdown
            City.insertBefore(firstoption, City.firstChild);
            firstoption.selected = true; // Select the default option
        });
}

// Event handler when a city is selected
function testCity(event) {
    cool.innerHTML = ""; // Clear previous weather results from the UI
    myloader.style.visibility = "visible"; // Show loader while fetching data

    var eventValue = event.target.value; // Get the value of the selected city from the event
    CountryCity.innerText = Country.value + " - " + eventValue; // Update UI with selected country and city

    // Log the selected city and country (replacing spaces with "&nbsp;" for logging)
    console.log(eventValue + " " + String(Country.value).replace("/ /gi", "&nbsp"));

    // Fetch geolocation data for the selected city and country from Nominatim API
    fetch(("https://nominatim.openstreetmap.org/search.php?city=" + eventValue + "&country=" + Country.value + "&format=jsonv2"))
        .then(response => {
            return response.json(); // Parse the JSON response
        })
        .then(res => {
            if (res.length > 0) {
                console.log(res[0].lon); // Log longitude of the city for debugging
            } else {
                console.log("No results found"); // Log message if no results are found
                CountryCity.innerText = "error"; // Display "error" in UI if no results are found
            }

            // Fetch weather forecast data using longitude and latitude from 7Timer Astro API
            fetch(("https://www.7timer.info/bin/astro.php?lon=" + res[0].lon + "&lat=" + res[0].lat + "&ac=0&unit=metric&output=json&tzshift=0"))
                .then(response => {
                    return response.json(); // Parse the JSON response
                })
                .then(res => {
                    console.log(res); // Log weather forecast data for debugging
                    createWeather(res.dataseries); // Create HTML elements to display weather forecast
                })
                .catch(error => {
                    console.log("Error fetching weather data:", error); // Log any errors that occur during fetching weather data
                })
                .finally(() => {
                    myloader.style.visibility = "hidden"; // Hide loader after fetching data

                    // Insert a default option at the beginning of the City dropdown
                    City.innerHTML ="";
                    City.insertBefore(firstoption, City.firstChild);
                    firstoption.selected = true; // Select the default option in the City dropdown

                    // Insert a default option at the beginning of the Country dropdown
                    Country.insertBefore(firstoptionCountry, Country.firstChild);
                    firstoptionCountry.selected = true; // Select the default option in the Country dropdown
                });
        })
        .catch(error => {
            console.log("Error fetching geolocation data:", error); // Log any errors that occur during fetching geolocation data
            myloader.style.visibility = "hidden"; // Hide loader if there's an error
            CountryCity.innerText = "error - try other country/city"; // Display "error - try other country/city" in UI
        });
}


// Function to create HTML elements to display weather forecast
function createWeather(weather) {
    console.log(weather); // Log weather data for debugging
    weather.forEach(w => {
        console.log(w);
        let ho = document.createElement("div");
        ho.id = 'ho';

        let timepoint = document.createElement("h3");
        timepoint.textContent = "+" + w.timepoint + "hrs"; // Display timepoint of forecast
        ho.appendChild(timepoint);

        let cloudCover = getCloudCover(w); // Calculate cloud cover percentage
        let prec_type = w.prec_type; // Determine precipitation type

        // Create and display weather icon based on weather conditions
        var weatherPhoto = document.createElement("img");
        if (prec_type == "rain") {
            weatherPhoto.src = "src/downpour-rainy-day-16531.png";
        } else if (prec_type == "snow") {
            weatherPhoto.src = "src/snowfall-and-blue-cloud-16541.png";
        } else if (prec_type == "none") {
            if (cloudCover < 20) {
                weatherPhoto.src = "src/yellow-sun-16526.png";
            } else if (cloudCover < 80) {
                weatherPhoto.src = "src/yellow-sun-and-blue-cloud-16528.png";
            } else {
                weatherPhoto.src = "src/blue-cloud-and-weather-16527.png";
            }
        }
        if (w.lifted_index <= -6) {
            if (w.prec_amount < 4) {
                weatherPhoto.src = "src/cloud-and-yellow-lightning-16534.png";
            } else {
                weatherPhoto.src = "src/lightning-and-blue-rain-cloud-16533.png";
            }
        }
        ho.appendChild(weatherPhoto); // Append weather icon to the HTML element

        let cel = document.createElement("h2");
        cel.textContent = w.temp2m + "°"; // Display temperature
        ho.appendChild(cel);

        cool.appendChild(ho); // Append weather forecast element to the HTML container
    });

}

// Function to calculate cloud cover percentage
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
