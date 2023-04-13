// ROY-GET-ELEMENT
let getStartLocation = document.getElementById("start-location");
let getEndLocation = document.getElementById("end-location");
let getRouteButton = document.getElementById("get-route");
let routingImage = document.getElementById("routing-image");
// ROY-GET-ELEMENT
// DANIEL-GET-ELEMENT
let getCarYear = document.getElementById("get-car-year");
let getCarMake = document.getElementById("get-car-make");
let getCarModel = document.getElementById("get-car-model");
let getCarEngine = document.getElementById("get-car-engine");
let carInfo = document.getElementById("car-info");
let mpgInfo = document.getElementById("get-average-mpg")
let averageMPGCost = document.getElementById("trip-info-average-mpg");
let checkBox = document.getElementById("avoid-tolls-box");
// DANIEL-GET-ELEMENT
// VICTORIA-GET-ELEMENT
// VICTORIA-GET-ELEMENT


// ROY-FUNCTIONS
//Fetch data from query URL based on location which returns lat and lons

// ROY-FUNCTIONS
// DANIEL-FUNCTIONS
//Figure out how to get distance from a REST FETCH somehow how?? based on two lat long waypoints.
//Initialize variables that we can use for other functions
let siteInitialized = false;
let carYear;
let carMake;
let carModel;
let carEngine;
let carMPG;
let gasPrice;
//Initialize options for years.

let userTypingTimer;
let userTypingTimer2;
let doneTypingTimer = 250;
let location1 = "location1String"
let location2 = "location2String"
let travelDuration;
let travelDistance;
let travelDurationTraffic;
let apiKey = "AhEgN-fj49LnYoTNAb3nT6XtcNw1KFBB5k0Qa6ktZGH3ynJDk7F3grkZfEqvjyUz"

let init = () => {
    initializeOptions();
    getGasPrice();
}

//Function that encodes and assigns the input text to a location variable.
let assignLocation = (inputText) => {
    if(!inputText){
        console.log("Nothing typed in.")
        return
    }
        //Encode it, from a normal string to a encoded one for insertion.
    //exampleString: 21%20Jump%20St
    inputText = encodeURIComponent(inputText);
    return inputText;
}
//Lat Lon router, accepts a string name stored in location1 or location2.
let getLocation = (location_input) => {

    let baseUrl = `http://dev.virtualearth.net/REST/v1/Locations?q=${location_input}&key=${apiKey}`
        fetch(baseUrl, {})
        .then(function (response) {
            if (response.ok){
                promise = response.json();
                return promise;
            } else {
                console.log(response);
            }
        })
        .then(function (data){
            let lat = data.resourceSets[0].resources[0].geocodePoints[0].coordinates[0];
            let lon = data.resourceSets[0].resources[0].geocodePoints[0].coordinates[1]
            //Need error handlers.

            location_input = `${lat}, ${lon}`

            return
        })

}



//get Route information that we'll use to calculate distance.
let getRouteInfo = (location1_input, location2_input) => {
    if(!location1_input || !location2_input){
        console.log("Must have both locations!");
        return;
    }
    let avoid;
    //Checks to see if the box is checked or not.
    if(checkBox.checked){
        avoid = "tolls"
    } else {
        avoid = "";
    }
    let baseUrl = `http://dev.virtualearth.net/REST/v1/Routes?wayPoint.1=${location1_input}&wayPoint.2=${location2_input}&avoid=${avoid}&distanceUnit=mi&key=${apiKey}`
        fetch(baseUrl, {})
        .then(function (response) {
            if (response.ok){
                promise = response.json();
                return promise;
            } else {
                console.log(response);
            }
        })
        //grabs and assigns our wanted data.
        .then(function (data){
            travelDuration = data.resourceSets[0].resources[0].travelDuration;
            travelDurationTraffic = data.resourceSets[0].resources[0].travelDurationTraffic;
            travelDistance = data.resourceSets[0].resources[0].travelDistance;
            travelDistance = travelDistance.toFixed(2);
            return;
        })

}
//Get the image based on our locations.
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
// getRouteInfo(location1, location2)
// drawMap(location1, location2);



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

        return fetchResult(baseurl, type)


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

// const ctx = canvas.getContext("2d");
// let img = new Image();
// img.src = "img/road-project-pic.jpg";
// img.onload = () => {
//     ctx.imageSmoothingQuality = "low";
//     ctx.drawImage(img, 0, 0, 300, 150);
// }
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

// ROY-EVENT-LISTENERS
//Event listener for getting lat long on entering location 1 + 2

//"buttonup" event listener
// ROY-EVENT-LISTENERS
// DANIEL-EVENT-LISTENERS

    getStartLocation.addEventListener('keyup', (event) => {
        event.stopPropagation;
        clearTimeout(userTypingTimer);
        //Inside an anonymous function because I want to pass parameters
        //into the function, if I don't, it's immediately used.
        userTypingTimer = setTimeout(function(){location1 = assignLocation(getStartLocation.value)}, doneTypingTimer);
    })

    getStartLocation.addEventListener('keydown', (event) => {
        clearTimeout(userTypingTimer);
    })

    getEndLocation.addEventListener('keyup', (event) => {
        event.stopPropagation;
        clearTimeout(userTypingTimer2);
        //Inside an anonymous function because I want to pass parameters
        //into the function, if I don't, it's immediately used.
        userTypingTimer2 = setTimeout(function(){location2 = assignLocation(getEndLocation.value)}, doneTypingTimer);
    })

    getEndLocation.addEventListener('keydown', (event) => {
        clearTimeout(userTypingTimer2);
    })
    //Listens for a change in the event on the carInfo Form
    getCarYear.addEventListener("change", (event) => {
        carYear = event.target.value;
        //If the user selects "select", then reset the list.
        //This is done to protect users from making unintended combinations.
        if(carYear){
            modularFetch(carYear)
            initializeOptions(getCarModel);
            initializeOptions(getCarEngine);
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
            initializeOptions(getCarEngine);
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

    getRouteButton.addEventListener("click", (event) => {
        event.preventDefault;
        getLocation(location1);
        getLocation(location2);
        getRouteInfo(location1, location2);
        drawMap();
    })
// DANIEL-EVENT-LISTENERS
// VICTORIA-EVENT-LISTENERS
// VICTORIA-EVENT-LISTENERS
