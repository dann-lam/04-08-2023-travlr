let getCarYear = document.getElementById("get-car-year");
let getCarMake = document.getElementById("get-car-make");
let carInfo = document.getElementById("car-info");


    //Handler for this select
    //Once the year is selected, perform our queries.
    //Once (carMake) populate the select with car make array from api
    //We have to clear/reset the values of selections if som
    //We could make a conditional check on the other fields if there is a match


//Sets the first option to each menu below the selected option to "please select"
//create options of available years
let siteInitialized = false;
let init = () => {

    initializeOptions();
}
//draws options for the inputted list ID.
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
    for(let i = 0; i < items.length; i++){
        let currItem = items[i].text
        let currOption = document.createElement("option");
        currOption.value = currItem;
        currOption.innerHTML = currItem;
        list.appendChild(currOption)
    }
    return;
}
let drawCarMake = (year) => {
    let items;
    let url = `https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=${year}`
    fetch(url, {headers: {accept: 'application/json',}})
    .then(function (response) {
        promise = response.json();
        return promise;
    })
    .then(function (data){
        items = data.menuItem

        drawOptions(items, getCarMake);

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




//Listens for a change in the event on the carInfo Form
getCarYear.addEventListener("change", (event) => {
    let year = event.target.value;
    drawCarMake(year);
})

//need to make a selection changer.
//Once you change a selection, change the options below it back to default.



//REDRAW user options each time they select an option above.

//create an option in the select area for every year.

//when the user selects a year from the options, then

//Make an API call to get the makes and put those in as an option for each make

//After the user has selected a make

//api call to get each car model, put those in as an option for each model

//after user has selected a model

//api call to get each car engine

//after user has selected an engine

//api call to get the average mpg.

//As I select an option, it will reset options DOWN the DOM chain.
//This way, if a user decides to change a year or something, it will reset the form.

//If user hits "Get ID" Button, it will yell at the user to enter in information.
