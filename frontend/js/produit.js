let theProduct = document.getElementById("le-produit");
const select = document.getElementById("select");
const urlId = window.location.search.substring(1);

let panier = [];
const strPanier = localStorage.getItem("panier");
if (strPanier !== null) {
    panier = JSON.parse(strPanier);
};



fetch(`http://localhost:3000/api/cameras/${urlId}`)
.then((response) => {
    if (response.ok) {
        response.json()
        .then(data => {
            theProduct.innerHTML = 
                `
                <img src="${data.imageUrl}"  class="product-img img-fluid" alt="vcam_1">
                
                <div class="col-sm-12 col-lg-6 text-center w-100">
                    <h1 class="product-name">${data.name}</h1>
                    <p class="product-description">${data.description}</p>
                    <p class="product-price fw-bold">${data.price}</p>
                </div>  
                    `
            select.innerHTML = data.lenses.map((option) => {
                return`<option value="${option}">${option}</option>`
            }).join('')   
            ajoutePanier = () => {
                let selectValue = select.value;
                panier.push({
                    ...data,
                    option: selectValue
                });
                localStorage.setItem('panier', JSON.stringify(panier));
            }
        })
    } else {
        console.log("ERREUR PAS DE CONNEXION AVEC SERVEUR")
    };
});










