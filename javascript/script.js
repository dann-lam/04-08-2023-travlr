// ROY-GET-ELEMENT
// ROY-GET-ELEMENT
// DANIEL-GET-ELEMENT
let getCarYear = document.getElementById("get-car-year");
let getCarMake = document.getElementById("get-car-make");
let getCarModel = document.getElementById("get-car-model");
let getCarEngine = document.getElementById("get-car-engine");
let carInfo = document.getElementById("car-info");
let mpgInfo = document.getElementById("get-average-mpg")
// DANIEL-GET-ELEMENT
// VICTORIA-GET-ELEMENT
// VICTORIA-GET-ELEMENT


// ROY-FUNCTIONS
// ROY-FUNCTIONS
// DANIEL-FUNCTIONS
let siteInitialized = false;
let carYear;
let carMake;
let carModel;
let carEngine;
let carMPG;
let init = () => {

    initializeOptions();
}

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
    //If length is greater than year, it's not a year, it's a car ID.
    if (year.length >= 5){
        mode = `/ympg/shared/ympgVehicle/${year}`
        type = false;
        } else if (year && make && model) {
            mode = `/vehicle/menu/options?year=${year}&make=${make}&model=${model}`
            type = getCarEngine
        } else if (year && make && !model){
            mode = `/vehicle/menu/model?year=${year}&make=${make}`
            type = getCarModel
        } else if (year && !make && !model && year.length == 4){
            mode = `/vehicle/menu/make?year=${year}`
            type = getCarMake
        } else {
            return console.log(`Oh god what did you do now? I hit ${type} and ${mode}`)
        }
        baseurl = baseurl + mode;

        return fetchResult(baseurl, type)


}

let fetchResult = (url, type) => {

    fetch(url, {headers: {accept: 'application/json',}})
    .then(function (response) {
        promise = response.json();
        return promise;
    })
    .then(function (data){

        if(data.menuItem){
            items = data.menuItem
            return drawOptions(items, type);
        } else if (data.avgMpg && type == false){
            mpgInfo.innerHTML = data.avgMpg;
        } else {
            mpgInfo.innerHTML = "Could not retrieve MPG!"
        }

    });
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
// VICTORIA-FUNCTIONS!
// VICTORIA-FUNCTIONS

// const ctx = canvas.getContext("2d");
// let img = new Image();
// img.src = "img/road-project-pic.jpg";
// img.onload = () => {
//     ctx.imageSmoothingQuality = "low";
//     ctx.drawImage(img, 0, 0, 300, 150);
// }
var granimInstance = new Granim({
    element: '.main',
    direction: 'top-bottom',
    isPausedWhenNotInView: true,

    image : {
        source: 'img/road-project-pic.jpg',
        blendingMode: 'multiply'
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
// ROY-EVENT-LISTENERS
// DANIEL-EVENT-LISTENERS
    //Listens for a change in the event on the carInfo Form
    getCarYear.addEventListener("change", (event) => {
        carYear = event.target.value;
        //Reinitialize make, model, and engine.
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
        if (carMake){
            modularFetch(carYear, carMake);
        } else {
            initializeOptions(getCarModel);
            initializeOptions(getCarEngine);
        }


    })
    getCarModel.addEventListener("change", (event) => {
        carModel = event.target.value;
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
// VICTORIA-EVENT-LISTENERS
// VICTORIA-EVENT-LISTENERS
