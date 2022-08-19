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



var products;


let loadingDiv = document.querySelector('#loading');

// Functions

const empty = (arr) => (arr.length = 0);
const loading = (state) => {
    loadingDiv.style.display = state ? 'visible' : 'none';
};

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

async function onInit(){
    loading(true);
    await fetch(base_url + '/product').then((res)=> res.json()).then((data)=> {
        let products_div = document.querySelector('#main_container').appendChild(document.createElement('div'));
        products = data;   
        products_div.setAttribute('class', 'grid p-5 overflow-hidden sm:grid-cols-1 md:grid-cols-3  xl:grid-cols-5 grid-rows-2 gap-2 place-items-center');
        for (let product of products){
            let product_card = document.createElement('product-card');
            product_card.setAttribute('data-product', JSON.stringify(product));
            products_div.appendChild(product_card);
        }
    })
    .then(()=>{
        loading(false);
    });
}

async function loadSideMenu(){
    const pages = [
        'Home', 'Shop', 'Cart', 'Orders'
    ];

  pages.forEach(page => {
    let tempLi = document.createElement('li');
    tempLi.innerHTML = page;
    tempLi.setAttribute('class', 'text-black mb-1 font-semibold cursor-pointer');
    tempLi.setAttribute('id', page.toLowerCase());
    sidemenu.appendChild(tempLi);
  });

}

window.onload = function() {
    loadSideMenu();
    onInit();
}   


// Event Listeners
searchInput.addEventListener('keyup', onKeyUp);