let product=[];

class productCard extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    product = JSON.parse(this.dataset.product);
    // console.log(product);
    let productImages = product.images.split(" | ");
    // console.log(productImages);
    if (product != undefined) {
      this.innerHTML = `
          <div class="card w-72 bg-base-100 shadow-xl hover:drop-shadow-2xl">
          <figure><img src=${productImages[0]} alt="Shoes" class='cursor-pointer' /></figure>
      <div class="card-body">
      <h2 class="card-title cursor-pointer">${product?.title}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-end">
      <button id='buyNow' data-product=${JSON.stringify(
        product
      )} class="btn btn-primary hover:shadow-lg shadow-indigo-500/50">Buy Now</button>
      </div>
      </div>
      </div>
      `;
    }
  }
}

customElements.define("product-card".toLowerCase(), productCard);
