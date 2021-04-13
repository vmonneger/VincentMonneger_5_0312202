let theProduct = document.getElementById("le-produit");
const select = document.getElementById("select");
const urlId = window.location.search.substring(1);

let panier = [];
const strPanier = localStorage.getItem("panier");
if (strPanier !== null) {
    panier = JSON.parse(strPanier);
}


class Boutique {
    constructor() {
        this.produits = [];
        this.categorie = "cameras";
        this.produit = null;
    }
    chargeProduit() {
        fetch(`http://localhost:3000/api/${this.categorie}/${urlId}`)
        .then((response) => {
            if (response.ok) {
                response.json()
                .then(data => {
                    this.produit = data;
                    this.afficheProduit();
                })
            } else {
                console.log("ERREUR PAS DE CONNEXION AVEC SERVEUR")
            }
        });
    };
    afficheProduit() {
        theProduct.innerHTML = 
            `
            <img src="${this.produit.imageUrl}"  class="product-img img-fluid" alt="vcam_1">
            
            <div class="col-sm-12 col-lg-6 text-center w-100">
              <h1 class="product-name">${this.produit.name}</h1>
              <p class="product-description">${this.produit.description}</p>
              <p class="product-price fw-bold">${this.produit.price}</p>
            </div>  
              `
        select.innerHTML = this.produit.lenses.map((option, index) => {
            return`<option value="${option}">${option}</option>`
        }).join('')
    }    
    ajoutePanier() {
        let selectValue = select.value;
        panier.push({
            ...this.produit,
            option: selectValue
        });
        localStorage.setItem('panier', JSON.stringify(panier));
    }
}

const boutique = new Boutique();










