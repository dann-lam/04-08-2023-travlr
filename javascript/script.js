
// ROY-GET-ELEMENT
var bingAPIkey = "56dbff74c0ac3fba85a5a517abf01ddb";
var searchBtn = document.getElementById('search-btn');
var wayPoint1 = document.getElementById('start-location');
var wayPoint2 = document.getElementById('end-location');
var scriptBingRoute = document.getElementById('bing-route');
var routeImg = document.getElementById('routing-image')
// ROY-GET-ELEMENT
// DANIEL-GET-ELEMENT
// DANIEL-GET-ELEMENT
// VICTORIA-GET-ELEMENT
// VICTORIA-GET-ELEMENT

// ROY-FUNCTIONS
// Created variable sessionKey to hold the Bing API Key
var sessionKey;  
// The funtion will store an use the API key for the duration of the session, session key is non-billable
map.getCredentials(function (c) {  
    sessionKey = c;  
});

// Dynamicly load the Bing Maps Key and Script
(async () => {
    let script = document.createElement("script");
    script.setAttribute("src", `https://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=${bingAPIkey}`);
    document.body.appendChild(script);
})();

// Declared map and directionsManager variable
var map;
var directionsManager;
// Function will produce a map with the user's desired route 
function GetMap(){
    // Displays map
    map = new Microsoft.Maps.Map('routeImg', {});

    //Load the directions module.
    Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function () {
        //Create an instance of the directions manager.
        directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);

        //Specify where to display the route instructions.
        directionsManager.setRenderOptions({ itineraryContainer: 'location-routing' });

        //Specify the where to display the input panel
        directionsManager.showInputPanel('direction-form');
    });
}
// ROY-FUNCTIONS
// DANIEL-FUNCTIONS
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
// DANIEL-EVENT-LISTENERS
// VICTORIA-EVENT-LISTENERS
// VICTORIA-EVENT-LISTENERS
