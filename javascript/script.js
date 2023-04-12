
// ROY-GET-ELEMENT
// ROY-GET-ELEMENT
// DANIEL-GET-ELEMENT
// DANIEL-GET-ELEMENT
// VICTORIA-GET-ELEMENT
// VICTORIA-GET-ELEMENT

// ROY-FUNCTIONS
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
    
    // image : {
    //     source: 'img/cracked-ground-opt1.jpg',
    //     position: ['center', 'center'],
    //     stretchMode: ['stretch', 'stretch'],
    //     blendingMode: 'multiply',
    // },
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
