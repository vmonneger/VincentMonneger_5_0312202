let listProduct = document.getElementById("list-product")

fetch("http://localhost:3000/api/cameras")
.then((response) => {
    if (response.ok) {
        response.json()
        .then(data => {
            console.log(data);
            data.map((product) => {
                listProduct.innerHTML +=`
                <li class="col-md-6 col-lg-4">
                    <div class="card h-100 bg-white">
                    <img src="${product.imageUrl}" class="product-img card-img-top" alt="vcam_1">
                    <div class="card-body d-flex justify-content-center flex-column align-items-center">
                        <h2 class="product-name fs-6 card-text text-body fw-bold">${product.name}</h2>
                        <p class="product-description text-body" id="description1">${product.description}</p>
                        <p class="product-price text-body fw-bold">${product.price}</p>
                        <a href="produit.html?${product._id}">
                        <button type="button" class="btn btn-warning px-5 shadow-sm">Personnaliser</button>
                        </a>
                    </div>
                    </div>
                </li>`
            }).join("")
        })
    } else {
        console.log("ERREUR PAS DE CONNEXION AVEC SERVEUR")
    }
});
    





