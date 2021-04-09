let theProduct = document.getElementById("le-produit");
const select = document.getElementById("select");
const urlId = window.location.search.substring(1);


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
                console.log("ERREUR PAS DE CONNEXION AVEC SERVEUR")
            }
        });
    };
    afficheProduit() {
        const findProduit = this.produits.find( object => object._id === urlId);
        theProduct.innerHTML = 
            `
            
              <img src="${findProduit.imageUrl}"  class="product-img img-fluid" alt="vcam_1">
            
            <div class="col-sm-12 col-lg-6 text-center w-100">
              <h1 class="product-name">${findProduit.name}</h1>
              <p class="product-description">${findProduit.description}</p>
              <p class="product-price fw-bold">${findProduit.price}</p>
            </div>  
              `
        select.innerHTML = findProduit.lenses.map((option, index) => {
            console.log(option)
            return`<option value="${index + 1}">${option}</option>`
        }).join('')
        
        // let options = findProduit.lenses;
        // let ari = options.forEach(element => select.innerHTML = element);
        
        
    }    
    changeCategorie(categorie) {
        this.categorie = categorie;
        this.chargeProduit();
    }
}

select.innerHTML = "bonjour"

const boutique = new Boutique();










