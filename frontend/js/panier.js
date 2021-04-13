const listPanier = document.getElementById("list-panier");
const clearPanier = document.getElementById("clear-panier");
let panier = [];
const strPanier = localStorage.getItem("panier");
if (strPanier !== null) {
    panier = JSON.parse(strPanier);
}



let localPanier = JSON.parse(localStorage.getItem("panier"));

localPanier.map((produit, index) => {
    listPanier.innerHTML += 
    `
    <div class="d-flex panier-height overflow-hidden mb-3 pt-2 border-top border-warning justify-content-between">
        <i class="far fa-trash-alt d-flex align-items-center" onclick="removeProduct(${index})"></i> 
        <img src="${produit.imageUrl}"  class="product-img img-fluid me-4" alt="vcam_1">
        <h1 class="product-name fs-4 me-4">${produit.name}</h1>
        <p class="product-description">Option: ${produit.option}</p>
        <p class="product-price fw-bold ms-4">${produit.price}</p>
        </div> 
        `
        console.log(localPanier)
        removeProduct = (index) => {
            localPanier.splice(index, 1);
        }
        
        removeProduct();
});




// class Boutique {
//     constructor() {
//         this.produits = [];
//         this.categorie = "cameras";
//         this.produit = null;
//     }
//     chargeProduit() {
//         fetch(`http://localhost:3000/api/${this.categorie}`)
//         .then((response) => {
//             if (response.ok) {
//                 response.json()
//                 .then(data => {
//                     this.produits = data;
//                     this.afficheProduit();
//                 })
//             } else {
//                 console.log("ERREUR PAS DE CONNEXION AVEC SERVEUR")
//             }
//         });
//     };
//     afficheProduit() {
//         let render = this.produits.map((produit) => {
            // return`
            // <div class="d-flex panier-height overflow-hidden mb-3 pt-2 border-top border-warning">
            //     <img src="${produit.imageUrl}"  class="product-img img-fluid me-4" alt="vcam_1">
            //     <h1 class="product-name fs-4 me-4">${produit.name}</h1>
            //     <p class="product-description">${produit.description}</p>
            //     <p class="product-price fw-bold ms-4">${produit.price}</p>
            //   </div> 
            //   `
//         }).join('')
//         listPanier.innerHTML = render
//     }    
//     ajoutePanier() {
//         let selectValue = select.value;
//         panier.push({
//             ...this.produit,
//             option: selectValue
//         });
//         localStorage.setItem('panier', JSON.stringify(panier));
//     }
// }

// const boutique = new Boutique();










