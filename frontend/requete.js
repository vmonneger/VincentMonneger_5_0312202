let productPrice = document.getElementById("prix1");
let productDescription = document.getElementById("description1");
let listProduct = document.getElementById("list-product")

let products;
let fetchFonction;

const fetchData = async() => {
    fetchFonction = await fetch("http://localhost:3000/api/cameras")
    .then((response) => {
        if (response.ok) {
            response.json()
            .then(data => {
                let render = data.map((product) => {
                    return`
                    <li class="col-md-6 col-lg-4">
                        <div class="card h-100 bg-white">
                        <img src="images/vcam_1.jpg" class="product-img card-img-top" alt="vcam_1">
                        <div class="card-body d-flex justify-content-center flex-column align-items-center">
                            <h2 class="product-name fs-6 card-text text-body fw-bold">${product.name}</h2>
                            <p class="product-description text-body" id="description1">${product.description}</p>
                            <p class="product-price text-body fw-bold" id="prix1">${product.price}</p>
                            <a href="produit.html">
                            <button type="button" class="btn btn-warning px-5 shadow-sm">Personnaliser</button>
                            </a>
                        </div>
                        </div>
                    </li>`
                }).join("")
                listProduct.innerHTML = render
            })
        } else {
            console.log("ERREUR")
        }
    });
};

fetchData();

// const showProducts = async() => {
//     await fetchData();
//     products.map((product) => {
//         `
//         <li class="col-md-6 col-lg-4">
//             <div class="card h-100 bg-white">
//             <img src="images/vcam_1.jpg" class="product-img card-img-top" alt="vcam_1">
//             <div class="card-body d-flex justify-content-center flex-column align-items-center">
//                 <h2 class="product-name fs-6 card-text text-body fw-bold">VCAM 1</h2>
//                 <p class="product-description text-body" id="description1">Appareil photo argentique calibre 12</p>
//                 <p class="product-price text-body fw-bold" id="prix1">${product.price}</p>
//                 <a href="produit.html">
//                 <button type="button" class="btn btn-warning px-5 shadow-sm">Personnaliser</button>
//                 </a>
//             </div>
//             </div>
//         </li>
//         `
//     }).join("")
// };








