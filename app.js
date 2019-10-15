'use strict';

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

function makeUniquePicsArray() {
  //create an array to hold unique indexes
  //assign values to index 0, 1, and 2 and splice all allProducts
  uniquePicsArray[0] = makeRandom();
  uniquePicsArray[1] = makeRandom();
  uniquePicsArray[2] = makeRandom();

  while (uniquePicsArray[0] === uniquePicsArray[1] || uniquePicsArray[1] === uniquePicsArray[2] || uniquePicsArray[0] === uniquePicsArray[2]) {
    console.error('Duplicate found, Re-rolling!');
    uniquePicsArray[1] = makeRandom();
    uniquePicsArray[2] = makeRandom();
  }
  return uniquePicsArray;
}

function renderProducts() {
  makeUniquePicsArray();
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
var maxClicks = 5;

function displayScores() {
  var chartLabelArray = [];
  var chartDataArray = [];
  for (var i = 0; i < allProducts.length; i++) {
    var ulEl = document.getElementById('tally');
    var liEl = document.createElement('li');
    liEl.textContent = `${allProducts[i].name} got ${allProducts[i].votes} votes.`;
    ulEl.appendChild(liEl);
    chartLabelArray.push(allProducts[i].name);
    chartDataArray.push(allProducts[i].votes);
  }
  var ctx = document.getElementById('myChart');
  var myChartElement = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: chartLabelArray,
      datasets: [{
        label: '# of Votes',
        data: chartDataArray,
        backgroundColor: [
          'rgba()',
          'rgba()',
          'rgba()',
          'rgba()',
          'rgba()',
          'rgba()',
        ],
        borderColor: [
          'rgba()',
          'rgba()',
          'rgba()',
          'rgba()',
          'rgba()',
          'rgba()',
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: false,
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
    console.log('chosenImage: ', chosenImage);
    for (var i = 0; i < allProducts.length; i++) {
      if (allProducts[i].name === chosenImage) {
        allProducts[i].votes++;
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
