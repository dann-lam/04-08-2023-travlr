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


//GOAL: Dynamically add years 2024 to 2007 to get-car-year
    //Make a function that dynamically adds car years to the
    //id-get-car-year select
    //creates an option with a value year starting from 2024
    //descds to 2007
    //Initialize years
    //Handler for this select
    //Once the year is selected, perform our queries.
    //Once (carMake) populate the select with car make array from api
    //We have to clear/reset the values of selections if som
    //We could make a conditional check on the other fields if there is a match
