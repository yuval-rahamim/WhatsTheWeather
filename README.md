# What's the Weather

"What's the Weather" is a web application that allows users to check the weather forecast for the next 72 hours for any city worldwide.

## Usage

Visit the [What's the Weather](https://yuv-weather.netlify.app/) website and select a country and city to view the weather forecast.

## APIs Used

- [Countries Info API](https://countriesnow.space/api/v0.1/countries/info?returns=flag): Used to fetch country information and flags.
- [Countries Cities API](https://countriesnow.space/api/v0.1/countries/cities/q?country=israel): Provides cities information within a specific country.
- [Nominatim API](https://nominatim.openstreetmap.org/search.php): Used for geocoding to fetch latitude and longitude coordinates for cities.
- [7Timer Astro API](https://www.7timer.info/bin/astro.php): Provides weather forecast data including temperature, wind, precipitation, etc.

## How It Works

- Country Selection: Upon selecting a country, the application fetches cities available in that country using the Countries API.

- City Selection: Once a city is selected, the application fetches its geolocation (latitude and longitude) from Nominatim API.

- Weather Fetching: Using the obtained latitude and longitude, the application queries the 7Timer Astro API to fetch the weather forecast for the next 72 hours.

- Display: The weather data is parsed and displayed dynamically on the web page, including icons representing weather conditions.

- Error Handling: If no results are found for the selected city or if there's an error in fetching data, appropriate error messages are displayed to the user.

![image](https://github.com/user-attachments/assets/be70a62d-bc94-4d5c-9d35-6a711d96e030)
