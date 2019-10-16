'use strict';

// Store the products array into local storage as a formatted JSON string
// Retrieve the products array from local storage and then utilize the JSON.Parse() function. Remember, you will have to send each item in the array back through constructor function.

// if (there is local storage) {
//   - retrieve data from local storage
//   - assign data to where it will be used
// } else {
//   create instances
// }

var leftImageEl = document.getElementById('left');
var centerImageEl = document.getElementById('center');
var rightImageEl = document.getElementById('right');
var containerEl = document.getElementById('image_container');

var allProducts = [];

function Product(name) {
  this.name = name;
  this.path = `images/${name}.jpg`;
  this.views = 0;
  this.votes = 0;
  allProducts.push(this);
}

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');

function makeRandom() {
  return Math.floor(Math.random() * allProducts.length);
}

var uniquePicsArray = [];
function uniqueArrayGenerator() {
  while (uniquePicsArray.length < 6) {
    var random = makeRandom();
    while (!uniquePicsArray.includes(random)) {
      uniquePicsArray.push(random);
    }
  }
  console.log('40: ', uniquePicsArray);
}

function uniqueArrayCarousel() {
  console.log('44: ', uniquePicsArray);
  uniqueArrayGenerator();
  console.log('46: ', uniquePicsArray);
  for (var i = 0; i < uniquePicsArray.length; i++) {
    console.log('48: ', uniquePicsArray);
    uniquePicsArray.shift();
    console.log('50: ', uniquePicsArray);
  }
  console.log('52: ', uniquePicsArray);
  return uniquePicsArray;
}

function renderProducts() {
  console.log('71: ', uniquePicsArray);
  uniqueArrayCarousel();
  console.log('73: ', uniquePicsArray);
  //add views here
  allProducts[uniquePicsArray[0]].views++;
  allProducts[uniquePicsArray[1]].views++;
  allProducts[uniquePicsArray[2]].views++;

  //display a product whose index is the random number
  leftImageEl.src = allProducts[uniquePicsArray[0]].path;
  leftImageEl.name = allProducts[uniquePicsArray[0]].name;
  leftImageEl.title = allProducts[uniquePicsArray[0]].name;

  centerImageEl.src = allProducts[uniquePicsArray[1]].path;
  centerImageEl.name = allProducts[uniquePicsArray[1]].name;
  centerImageEl.title = allProducts[uniquePicsArray[1]].name;

  rightImageEl.src = allProducts[uniquePicsArray[2]].path;
  rightImageEl.name = allProducts[uniquePicsArray[2]].name;
  rightImageEl.title = allProducts[uniquePicsArray[2]].name;
}

var clicks = 0;
var maxClicks = 15;

function displayScores() {
  var chartLabelArray = [];
  var chartDataArray = [];
  //GRAB VOTE DATA FROM LOCAL STORAGE
  //TODO: 3. var storageAllProducts = localStorage.getItem('voteData');
  //TODO: 4. var parseAllProducts = JSON.parse(storageAllProducts)
  //TODO: 5. for (var i=0; i < parseAllProducts.length) {
  //TODO:      new Product(parseAllProducts[i].name, parseAllProducts[i].votes);
  //         }
  }

  for (var i = 0; i < allProducts.length; i++) {
    chartLabelArray.push(allProducts[i].name);
    chartDataArray.push(allProducts[i].votes);
  }
  var ctx = document.getElementById('myChart');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartLabelArray,
      datasets: [{
        label: 'vote count',
        data: chartDataArray,
        backgroundColor: [
          'rgba(0, 92, 53, 0.2)', /* bag */
          'rgba(0, 85, 92, 0.2)', /* banana */
          'rgba(0, 63,92, 0.2)', /* bathroom */
          'rgba(68, 78, 134, 0.2)', /* boots */
          'rgba(149, 81, 150, 0.2)', /* breakfast */
          'rgba(221, 81, 130, 0.2)', /* bubblegum */
          'rgba(255, 110, 84, 0.2)', /* chair */
          'rgba(255, 166, 0, 0.2)', /* cthulhu */
          'rgba(255, 249, 61, 0.2)' /* dog-duck */
        ],
        borderColor: [
          'rgba(0, 92, 53, 0.8)', /* bag */
          'rgba(0, 85, 92, 0.8)', /* banana */
          'rgba(0, 63,92, 0.8)', /* bathroom */
          'rgba(68, 78, 134, 0.8)', /* boots */
          'rgba(149, 81, 150, 0.8)', /* breakfast */
          'rgba(221, 81, 130, 0.8)', /* bubblegum */
          'rgba(255, 110, 84, 0.8)', /* chair */
          'rgba(255, 166, 0, 0.8)', /* cthulhu */
          'rgba(255, 249, 61, 0.8)' /* dog-duck */
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: false,
      title: {
        display: true,
        text: 'Product Votes'
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
    }
  });
}

function handleClick() {
  if (clicks < maxClicks) {
    var chosenImage = event.target.title;
    clicks++;
    // console.log('chosenImage: ', chosenImage);
    for (var i = 0; i < allProducts.length; i++) {
      if (allProducts[i].name === chosenImage) {
        allProducts[i].votes++;
        // SAVE VOTE DATA TO LOCAL STORAGE
        //AS AN ARRAY
        //
        //TODO: 1. var allProductsStringified = JSON.stringify(allProducts);
        //TODO: 2. localStorage.setItem('voteData', allProductsStringified); 
      }
    }
    renderProducts();
  } else {
    removeEventListener('click', handleClick);
    containerEl.remove();
    displayScores();
  }
}

containerEl.addEventListener('click', handleClick);

renderProducts();
