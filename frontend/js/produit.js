let theProduct = document.getElementById("le-produit");
const select = document.getElementById("select");
// *****ON RECUPERE L'ID DANS LES PARAMS DE L'URL*****
const urlId = window.location.search.substring(1);
// *****ON PARSE DANS ARRAY VIDE PANIER SI LE LOCALSTORAGE N'EST PAS VIDE*****
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
                <img src="${data.imageUrl}"  class="product-img size-img-produit" alt="vcam_1">
                
                <div class="col-sm-12 col-lg-6 text-center w-100">
                    <h1 class="product-name">${data.name}</h1>
                    <p class="product-description">${data.description}</p>
                    <p class="product-price fw-bold">${data.price} €</p>
                </div>  
                    `
            data.lenses.map((option) => {
                select.innerHTML += `<option value="${option}">${option}</option>`
            }).join('')
            // ****FONCTION QUI RECUPERE OPTION DANS LE SELECT ET PUSH LE PRODUIT DANS LOCALSTORAGE****
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










