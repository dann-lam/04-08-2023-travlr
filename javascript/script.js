// DANIEL-GET-ELEMENT
let getCarYear = document.getElementById("get-car-year");
let getCarMake = document.getElementById("get-car-make");
let getCarModel = document.getElementById("get-car-model");
let getCarEngine = document.getElementById("get-car-engine");
let carInfo = document.getElementById("car-info");
let mpgInfo = document.getElementById("get-average-mpg");
let averageMPGCost = document.getElementById("trip-info-average-mpg");
// DANIEL-GET-ELEMENT

// Dynamically load the Bing Maps Key and Script
(async () => {
    let script = document.createElement("script");
    let bingKey = 'AviX0mP6FUm_UMe09K2XStP633jFG4iSZ2tojZ_LEt4iqPnw5X4ReYstOdsDL5k8';
    script.setAttribute("src", `https://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=${bingKey}`);
    document.body.appendChild(script);
})();

var map;
var directionsManager;

function GetMap(){
    map = new Microsoft.Maps.Map('#myMap', {});

    //Load the directions module.
    Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function () {
        //Create an instance of the directions manager.
        directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);

        //Specify where to display the route instructions.
        directionsManager.setRenderOptions({ itineraryContainer: '#directionsItinerary' });

        //Specify the where to display the input panel
        directionsManager.showInputPanel('directionsPanel');
    });
}

// DANIEL-FUNCTIONS

//Initialize variables that we can use for other functions
let siteInitialized = false;
let carYear;
let carMake;
let carModel;
let carEngine;
let carMPG;
let gasPrice;
//Initialize options for years.
let init = () => {
    initializeOptions();
    getGasPrice();
}

//Handles drawing of list items.
let drawOptions = (items, list) => {
    //Empty the list
    list.innerHTML = '';
    //Recreate start option
    let startOption = document.createElement("option");
    startOption.value = ""
    startOption.innerHTML = "Select"
    //Append to the list
    list.appendChild(startOption);
    //for each thing inside of the array
    //Create a button,
    //append it to the list
    //redraw the list
    if (items.text){
        let currItem = items.text
        let currVal = items.value
        let currOption = document.createElement("option");
        currOption.value = currVal;
        currOption.innerHTML = currItem;
        list.appendChild(currOption)
    } else {
        for(let i = 0; i < items.length; i++){
            let currItem = items[i].text
            let currVal = items[i].value
            let currOption = document.createElement("option");
            currOption.value = currVal;
            currOption.innerHTML = currItem;
            list.appendChild(currOption)
        }
    }

}

let modularFetch = (year, make, model) => {
    let mode;
    let type;
    let baseurl = `https://www.fueleconomy.gov/ws/rest`
    if (year == "gas"){
        mode = "/fuelprices"
        type = "gas"
    //If length is greater than year, it's not a year, it's a car ID.
    } else if (year.length >= 5){
        mode = `/ympg/shared/ympgVehicle/${year}`
        //Set to false for a condition in fetch results.
        type = "mpg";
        //If all three were input, it wants the engine
    } else if (year && make && model) {
        mode = `/vehicle/menu/options?year=${year}&make=${make}&model=${model}`
        type = getCarEngine
    //If two were input, it wants the model
    } else if (year && make && !model){
        mode = `/vehicle/menu/model?year=${year}&make=${make}`
        type = getCarModel
    //If 1, wants model
    } else if (year && !make && !model && year.length == 4){
        mode = `/vehicle/menu/make?year=${year}`
        type = getCarMake
    } else {
        //Good luck fella
        return console.log(`Oh god what did you do now? I hit ${type} and ${mode}`)
    }
    //string append the query result to the base url.
    baseurl = baseurl + mode;

    return fetchResult(baseurl, type);

}
//takes in the url and ID variable stored as type
let fetchResult = (url, type) => {
    //header to accept JSONs instead of XMLs
    fetch(url, {headers: {accept: 'application/json',}})
    .then(function (response) {
        //checks if it's okay, JSONifies the response object.
        if (response.ok){
            promise = response.json();
            return promise;
        } else {
            console.log(response);
        }
    })
    .then(function (data){
        if(data.regular && type == "gas"){

            gasPrice = data.regular
            console.log(gasPrice);
            return;
        //The responses are consistently inside of .menuItem for car-items
        } else if(data.menuItem){
            items = data.menuItem
            return drawOptions(items, type);
            //Condition for MPGs, stores MPG here.
        } else if (data.avgMpg && type == "mpg"){
            carMPG = parseFloat(data.avgMpg).toFixed(2);
            let price = (gasPrice / carMPG).toFixed(2)
            return mpgInfo.innerHTML = `MPG for ${carModel}: ${carMPG} cost per mile is $${price}.`;
        } else {
            //Condition should not be met, but it *COULD* be.
            console.log("What did you do nooooowww");
            mpgInfo.innerHTML = "Uhhh... there's something wrong."
        }
    })
    .catch(err => {
        console.log("It was probably the MPG Retrieval.")
        console.log(err)
        mpgInfo.innerHTML = `Could not find MPG for ${carModel}, some engines don't have MPG listed in the database. Try a 2012 Honda Civic for a result.`
    })
    ;
}

let getGasPrice = () => {
    //Get the price of gas.
    modularFetch("gas");
}

let initializeYears = () => {

    //start year to end year
    let startYear = 1995;
    let endYear = 2024

    //initialize the "Start Here"

    //count from start to end, create an option for each
    //set that option's values
    //append that option

    for(let i = endYear; i > startYear - 1; i--){
        let currYear = document.createElement("option");
        currYear.value = `${i}`;
        currYear.innerHTML = i;
        currYear.id = `carYearBtn`;
        getCarYear.appendChild(currYear)
    }
}

let initializeOptions = (redrawMe) => {
    //condition hit if  user selects an option above the chain.
    //we reset the select options below the re-selected option

    if(redrawMe){
        //Reset the list to just Select option.
        redrawMe.innerHTML = '';
        let startOption = document.createElement("option");
        startOption.value = ""
        startOption.innerHTML = "Select"
        redrawMe.appendChild(startOption)
    } else if (!siteInitialized){
        //Should only be ran the first time the site is initialized.
        for(let i = 0; i < carInfo.length; i++){
            let startOption = document.createElement("option");
            startOption.value = ""
            startOption.innerHTML = "Select"
            carInfo[i].appendChild(startOption);

        }
        siteInitialized = true;
        initializeYears();
    }
}

//Initializes website
init();
// DANIEL-FUNCTIONS

// VICTORIA-FUNCTIONS
var relativeEl = document.querySelector('#travlr-logo');
relativeEl.style.transform = 'translateX(100px)';

anime({
    targets: '#travlr-logo',
    translateX: {
        value: '*=2.5', // 100px * 2.5 = '250px'
        duration: 1000
      },
      width: {
        value: '-=20px', // 28 - 20 = '8px'
        duration: 1800,
        easing: 'easeInOutSine'
      },
      rotate: {
        value: '+=2turn', // 0 + 2 = '2turn'
        duration: 1800,
        easing: 'easeInOutSine'
      },
    direction: 'alternate',
  });
// VICTORIA-FUNCTIONS
var granimInstance = new Granim({
    element: '#granim-canvas',
    direction: 'left-right',
    isPausedWhenNotInView: true,

     image : {
         source: 'img/mountains-forest-png.png',
         position: ['center', 'center'],
         stretchMode: ['stretch', 'stretch'],
         blendingMode: 'multiply',
     },
    states : {
        "default-state": {
            gradients: [
                ['#eee7df', '#dbcbbe'],
                ['#b0988e', '#f7f0c6'],
                ['#abded7', '#4d8581']
            ]
        }
    }
});
// VICTORIA-FUNCTIONS

// DANIEL-EVENT-LISTENERS

    //Listens for a change in the event on the carInfo Form
    getCarYear.addEventListener("change", (event) => {
        carYear = event.target.value;
        //If the user selects "select", then reset the list.
        //This is done to protect users from making unintended combinations.
        if(carYear){
            modularFetch(carYear);
        } else {

            initializeOptions(getCarMake)
            initializeOptions(getCarModel);
            initializeOptions(getCarEngine);
        }

    })
    getCarMake.addEventListener("change", (event) => {
        carMake = event.target.value;
        //If the user selects "select", then reset the list.
        //This is done to protect users from making unintended combinations.
        if (carMake){
            modularFetch(carYear, carMake);
        } else {
            initializeOptions(getCarModel);
            initializeOptions(getCarEngine);
        }
    })
    getCarModel.addEventListener("change", (event) => {
        carModel = event.target.value;
        //If the user selects "select", then reset the list.
        //This is done to protect users from making unintended combinations.
        if (carModel){
            modularFetch(carYear, carMake, carModel);
        } else {
            initializeOptions(getCarEngine);
        }

    })
    getCarEngine.addEventListener("change", (event) => {
        carEngine = event.target.value;

        if(carEngine){
            modularFetch(carEngine)
        }
    })
// DANIEL-EVENT-LISTENERS