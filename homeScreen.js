import data from "./data.js"

const homeScreen = {
    render: () => {
        const {products} = data;
        return `
        <ul class="row gy-5 list-unstyled">
            ${products.map( 
                (product) =>`
            <ul class="row gy-5 list-unstyled">
            <li class="col-md-6 col-lg-4">
              <div class="card bg-white">
                <img src="${product.image}" class="product-img card-img-top" alt="vcam_1">
                <div class="card-body d-flex justify-content-center flex-column align-items-center">
                  <h2 class="${product.name} fs-6 card-text text-body fw-bold">VCAM 1</h2>
                  <p class="product-description text-body">${product.description}</p>
                  <p class="product-price text-body fw-bold">${product.price}</p>
                  <button type="button" class="btn btn-warning px-5 shadow-sm">Personnaliser</button>
                </div>
              </div>
            </li>
            `).join('')}
        `
    }
}

export default homeScreen