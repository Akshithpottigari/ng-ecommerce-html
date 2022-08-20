// imports 
import { base_url } from "./environment.js";


// route variables
let home = false;
let shop = false;


// Variables
let searchInput = document.querySelector('#searchInput');
let search = document.querySelector('#search');
let search_results = [];
let sidemenu = document.querySelector('#sidemenu');


let searchDropDown = document.createElement('div');
searchDropDown.setAttribute('class', 'dropdown');
search.appendChild(searchDropDown);
let tempUl = document.createElement('ul');
tempUl.setAttribute('class', 'menu menu-compact backdrop-blur-2xl mt-3 p-2 pl-4 shadow bg-base/30 rounded-box w-52');
searchDropDown.appendChild(tempUl);

let homePage;
let shopPage;
let homeDiv;
let shopDiv;

var products=[];


let loadingDiv = document.querySelector('#loading');

// Functions

const empty = (arr) => (arr.splice(0,arr.length));

const loading = (state) => {
    loadingDiv.style.display = state ? 'visible' : 'none';
};

const changePage = (page, state) => {
    // page = state;
    console.log(`changed page ${page} state ${state}`);
}

async function onKeyUp(){
    if (searchInput.value != ''){
        await fetch(`${base_url}/product?search_term=${searchInput.value}`)
        .then((res)=> res.json())
        .then((data)=> {
            empty(search_results);
            search_results = data[0];
            search_results.forEach(item => {
                let tempLi = document.createElement('li');
                tempLi.innerHTML = item.title;
                tempUl.appendChild(tempLi);
            });
        });
    }
}

async function loadHome(){
    loading(true);
    empty(products);
    if(shopDiv?.hasChildNodes()){ // clearing the shopdiv if present
        shopDiv.innerHTML = '';
    }

    if (homeDiv?.childElementCount > 0){
        homeDiv.innerHTML = ''; // clearing the homediv if user is clicks on home again
    }
    await fetch(base_url + '/product').then((res)=> res.json()).then((data)=> {
        empty(products);
        products = data;   
        homeDiv.setAttribute('class', 'grid p-5 overflow-hidden sm:grid-cols-1 md:grid-cols-3  xl:grid-cols-5 grid-rows-2 gap-2 place-items-center');
        homeDiv.setAttribute('id', 'home');
        for (let product of products){
            let product_card = document.createElement('product-card');
            product_card.setAttribute('data-product', JSON.stringify(product));
            homeDiv.appendChild(product_card);
        }
    })
    .then(()=>{
        changePage(home, true);
        changePage(shop, false);
        loading(false);
    });
}

async function loadShop(){
    empty(products);
    loading(true);
    if(homeDiv?.hasChildNodes()){ // clearing the homediv if present
        homeDiv.innerHTML = '';
    }
    if (shopDiv?.childElementCount > 0){ // clearing the shopdiv if user is clicks on shop again
        shopDiv.innerHTML = '';
    }
    await fetch(base_url + '/product').then((res)=> res.json()).then((data)=> {
        products = data;   
        shopDiv.setAttribute('class', 'grid p-5 overflow-hidden sm:grid-cols-1 md:grid-cols-3  xl:grid-cols-5 grid-rows-2 gap-2 place-items-center');
        shopDiv.setAttribute('id', 'home');
        for (let product of products){
            let product_card = document.createElement('product-card');
            product_card.setAttribute('data-product', JSON.stringify(product));
            shopDiv.appendChild(product_card);
        }
    })
    .then(()=>{
        changePage(shop, true);
        changePage(home, false);
        loading(false);
    });
}

async function onInit(){
    await loadHome();
}

async function loadSideMenu(){
    const pages = [
        'Home', 'Shop', 'Cart', 'Orders'
    ];

  pages.forEach(page => {
    let tempLi = document.createElement('li');
    tempLi.innerHTML = page;
    tempLi.setAttribute('class', 'text-black mb-1 font-semibold cursor-pointer');
    tempLi.setAttribute('id', `${page.toLowerCase()}Button`);
    sidemenu.appendChild(tempLi);
  });
}


window.onload = function() {
    loadSideMenu();
    onInit();

    // Declaring pages
    homePage = document.querySelector('#homeButton');
    shopPage = document.querySelector('#shopButton');
    shopPage.addEventListener('click', loadShop);
    homePage.addEventListener('click', loadHome);

    homeDiv = document.querySelector('#main_container').appendChild(document.createElement('div'));
    shopDiv = document.querySelector('#main_container').appendChild(document.createElement('div'));
}   

// Event Listeners
searchInput.addEventListener('keyup', onKeyUp);
