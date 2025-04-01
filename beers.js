/*
  * En el siguiente array de objetos (beers)
  * 1.- Desarrollar una function que retorne un array que incluya el precio segun el siguiente criterio
  *     a) Si el  grado alcoholico es < a 5.0 el precio es 300
  *     b) Si el grado alcoholico es >= 5.0 el precio es 350
  *     c) La cerveza 'Purple Iris' esta de oferta y si precio es 320
  * (map)
  * 2.- Desarrolle una función que inserte la propiedad file_name a cada uno de los objetos, esta propiedad debe tener solo
  * el nombre del archivo de la propiedad label (upload_xOMnlK-large.png, etc..)
  * (map)
  * 3.- Desarrollo una funcion que ordene por tipo (type)
  * (sort)
  *
 */

// 1)
const beers = [
  {
    name: "Purple Iris",
    abv: 6.8,
    label:
      "https://s3.amazonaws.com/brewerydbapi/beer/dMLwGo/upload_yiUllE-large.png",
    type: "IPA",
  },
  {
    name: "Orange Blossom Pilsner",
    abv: 5.5,
    label:
      "https://s3.amazonaws.com/brewerydbapi/beer/Rczcb9/upload_9Nhxxl-large.png",
    type: "Pilsner",
  },
  {
    name: "Darkness",
    abv: 4.2,
    label:
      "https://s3.amazonaws.com/brewerydbapi/beer/lnxbIV/upload_idNXFf-large.png",
    type: "Stout",
  },
  {
    name: "Belgian Wit",
    abv: 5.4,
    label:
      "https://s3.amazonaws.com/brewerydbapi/beer/3CvVQG/upload_xOMnlK-large.png",
    type: "Wheat",
  },
  {
    name: "Stolen Fruit",
    abv: 4.6,
    label:
      "https://s3.amazonaws.com/brewerydbapi/beer/YGT30k/upload_uVCHP7-large.png",
    type: "Wheat",
  },
];

const ALCOHOLIC_GRADE_LIMIT = 5.0;
const HIGH_ALCOHOLIC_BEER_PRICE = 350;
const LOW_ALCOHOLIC_BEER_PRICE = 300;
const OFFER_BEER_PRICE = 320;
const BEER_OFFER = "Purple Iris";

function getPrices(beersArr) {
  return beersArr.map(beer => {
    if (isInPromotion(beer.name)) return { ...beer, price: OFFER_BEER_PRICE };

    let price;
    price = setPriceForBeerAccordingAlcoholicGrade(beer.abv);

    return { ...beer, price };
  })
}

function setPriceForBeerAccordingAlcoholicGrade(alcoholicGrade) {
  return alcoholicGrade >= ALCOHOLIC_GRADE_LIMIT ? HIGH_ALCOHOLIC_BEER_PRICE : LOW_ALCOHOLIC_BEER_PRICE;
}

function isInPromotion(beerName) {
  return beerName === BEER_OFFER
}

const beersWithPrices = getPrices(beers);
console.log("Listado de cervezas con su precio: ", beersWithPrices)

// 2)
function insertFileNameInEachBear(beersArr) {
  return beersArr.map(beer => {
    let fileName = extractFileNameFromUrl(beer.label);
    return {...beer, file_name: fileName}
  });
}

function extractFileNameFromUrl(url) {
  return url.split("/").pop();
}

let beersWithFileName = insertFileNameInEachBear(beers);
console.log("Cervezas con nombre del archivo: ", beersWithFileName);

// 3)
console.log("Cervezas ordenadas por tipo ", beers.sort(beer => beer.label))