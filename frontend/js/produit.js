let theProduct = document.getElementById("le-produit")

class Boutique {
    constructor() {
        this.produits = [];
        this.categorie = "cameras";
        this.produit = null;
    }
    chargeProduit() {
        fetch(`http://localhost:3000/api/${this.categorie}`)
        .then((response) => {
            if (response.ok) {
                response.json()
                .then(data => {
                    this.produits = data;
                    this.afficheProduit();
                })
            } else {
                console.log("ERREUR")
            }
        });
    };
    afficheProduit() {
        let render = this.produits.map((product) => {
            return`
            <div class=" col-sm-12 col-lg-6">
              <img src="${product.imageUrl}"  class="product-img img-fluid" alt="vcam_1">
            </div>
            <div class="container col-sm-12 col-lg-6 text-center">
              <h1 class="product-name">${product.name}</h1>
              <p class="product-description">${product.description}</p>
              <p class="product-price fw-bold">${product.price}</p>
              <select class="form-select mb-5" aria-label="Default select example">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <a href="panier.html">
                <button type="button" class="btn btn-warning px-5 shadow-sm">Ajouter au panier</button>
              </a>
            </div>`
        }).join("")
        theProduct.innerHTML = render;
    }
    changeCategorie(categorie) {
        this.categorie = categorie;
        this.chargeProduit();
    }
}


const boutique = new Boutique();







