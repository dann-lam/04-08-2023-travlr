# 04-08-2023-travlr
A trip itinerary budget planner

# Description
This application calculates your trip budget by comparing the trip distance, gas mileage, gas prices, and any other extra expenses you might have while traveling. When the user inputs their starting location and inputs their destination, a static map image will be displayed. A user inputs their vehicle information to determine their miles per gallon(MPG) and gas cost. Application also displays the user's trip summary for convenience. 

# Technologies Used
HTML - The base skeleton of the page.
CSS- Materialize - Styling and formatting.
Javascript
Bing Maps Rest Services - Pulls routing data.
FuelEconomy API - Pulls vehicle data
AnimeJS - Animation
Granim JS - Gradient animations

# Code snippets
Full webpage display:

![WebPage](img\chrome_2seq0nDAww.gif)

The following displays an image of the interaction with the Route Form:

![Route Form](img\chrome_TWDqqN87Yz.png)

    <section id="location-routing" class="z-depth-5">
        <div class="card-panel">
            <form id="location-form">
                <label for="start-location"></label>
                <input id="start-location" type="text" placeholder="Start Location"
                    id="location-form-start">
                <label for="end-location"></label>
                <input id="end-location" type="text" placeholder="End Location"
                    id="location-form-end">
            </form>
        </div>
        <div>
            <form id="submissions" action="#" class="row">
                <label for="avoid-tolls-box">
                    <input id="avoid-tolls-box" type="checkbox" id="avoid-tolls-box">
                    <span>Avoid Tolls</span>
                </label>
                <label for="get-route">
                    <input id="get-route" type="button" placeholder="Get Route" value="Get Route">
                </label>
            </form>
        </div>
    </section>

The following displays an image of the interaction with the Vehicle Form:

![VehicleForm](img\chrome_FgLs5tmsJ4.gif)

    <section id="gas-calculation" class="column">
        <div class="card-panel">
            <form id="car-info">
                <!--Daniel's Section-->
                <label for="get-car-year">Get Car Year</label>
                <select id="get-car-year" class="browser-default"></select>
                <br>
                <label for="get-car-make">Get Car Make</label>
                <select id="get-car-make" class="browser-default"></select>
                <br>
                <label for="get-car-model">Get Car model</label>
                <select id="get-car-model" class="browser-default"></select>
                <br>
                <label for="get-car-engine">Get Car Engine</label>
                <select id="get-car-engine" class="browser-default"></select>
                <hr>
                <p id="get-average-mpg">Your MPG: <span id="gas-mpg-output"></span></p>
                <!--Daniel's Section-->
            </form>
        </div>
    </section>

The following displays an image of the interaction with the Trip Summary Form:
![TripSummary](img\chrome_OxRE2Lc0fB.gif)

    <section id="budget-information" class="col s12 m12 l9 offset-l3">
        <div id="trip-summary" class="col s4">
        <h2>
        Trip Summary
        </h2>
        <hr>
        <ul id="trip-info-box">
        <li id="trip-info-distance">

            </li>
            <li id="trip-info-average-mpg">

            </li>
            <li id="price-of-gas">

            </li>
        </ul>
    </div>
    <div id="budget-calculation-container" class="col s4">
        <form id="user-budget-input">
            <label for="user-total-budget">$
            </label>
            <input id="user-total-budget" type="number" placeholder="Please insert your budget: ">
            <label for="user-budget-snacks">$
            </label>
            <input id="user-budget-snacks" type="number"
                placeholder="Please insert your cost for snacks: ">
        </form>
        <p id="gas-budget-cost">$<span id="gas-budget-calculation"></span></p>
        <hr>
        <p id="final-budget-leftovers">$<span id="final-budget-calculation"></span></p>
    </div>
    <label for="get-price">
        <input id="get-price" type="button" placeholder="Get Price" value="Get Price">
    </label>
    <div class="col s4">

![Map](img\chrome_rgjAXqpudT.jpg)

    <section class="route-img col s12 m12 l9">
        <img id="routing-image" src="./img/gps_map.jpg">
    </section>

    let drawMap = () => {
    let url = `https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/Routes?wayPoint.0=${location1};64;1&wayPoint.1=${location2};66;2&mapSize=1000,1000&key=${apiKey}`;
    fetch(url, {})
    .then(function (response) {
        if (response.ok){
            //the response has to be blobbed - turns into raw data essentially.
            return response.blob()
        } else {
            console.log(response);
        }
    })
    .then(function (image){
        //set the source of routing image and create a url object out of it
        routingImage.src = URL.createObjectURL(image);
        return;
    })
    }

# Usage
Interacting with the Route Form:
- Input the starting location
- Input final destination
- Check the box if you want to avoid routes with tolls.
- Submit form to get a static map of route
- Data for the distance and travel time are stored for later use.

Interacting with the Vehicle Form:
- Select from the dropdown menus, initiate from the first dropdown option and work your way down the list of dropdown options.
- Select a car year from the options given in "Get Car Year"
- Select a car make from the options given in "Get Car Make"
- Select a car model from the options given in "Get Car Model"
- Select a car engine from the options given in "Get Car Engine"
- Once all options are changed, the form will self-submit and return a value for MPG 

Note: You can always make changes by selecting from any of the previous dropdown menus.

Interacting with the Trip Summary and Budget Form:
- Data for the travel distance and time is displayed.
- Data for the gas cost is displayed.
- Input a desired budget for trip.
- Input cost of snacks for the trip.
- Click "Price" button
- Gas cost will get pre-filled.
- A calculation of the remaining budget will be displayed.

# Author info
Created by: 
Daniel Lam
Victoria Tolliver
Rogelio Sanchez

# License