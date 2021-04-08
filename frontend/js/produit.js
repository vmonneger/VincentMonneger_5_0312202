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
            <div class=" col-sm-12 col-lg-6">
              <img src="${findProduit.imageUrl}"  class="product-img img-fluid" alt="vcam_1">
            </div>
            <div class="container col-sm-12 col-lg-6 text-center">
              <h1 class="product-name">${findProduit.name}</h1>
              <p class="product-description">${findProduit.description}</p>
              <p class="product-price fw-bold">${findProduit.price}</p>
              `
              
        // let render = findProduit.lenses.forEach(option => {
        //     select.innerHTML +=`
        //     <select class="form-select mb-5" id="select" aria-label="Default select example">
        //         <option selected>Open this select menu</option>
        //         <option value="1">${option}</option>
        //         <option value="2">Two</option>
        //         <option value="3">Three</option>
        //       </select>
        //     `
        //     console.log(render)
        // })
        
        let options = findProduit.lenses;
        let ari = options.forEach(element => select.innerHTML = element);
        
        
    }    
    changeCategorie(categorie) {
        this.categorie = categorie;
        this.chargeProduit();
    }
}


const boutique = new Boutique();










