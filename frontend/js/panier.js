const listPanier = document.getElementById("list-panier");
const myForm = document.getElementById("myForm")
let panier = [];
const strPanier = localStorage.getItem("panier");
if (strPanier !== null) {
    panier = JSON.parse(strPanier);
};


// ***FONCTION QUI AFFICHE UN TITRE PANIER VIDE***
titrePanier = () => {
    if (panier.length === 0) {
        document.getElementById("panier-vide").style.display = "block";
    } else {
        document.getElementById("panier-vide").style.display = "none";
    }
}

// ***FONCTION QUI AFFICHE LA LISTE DU PANIER***
displayProduct = () => {
    console.log(panier)
    panier.map((produit, index) => {
        listPanier.innerHTML += 
        `
        <div class="d-flex flex-wrap flex-sm-nowrap panier-height overflow-hidden mb-3 pt-2 border-top border-warning justify-content-between">
            <div class="">
                <div class="d-flex align-items-center">
                    <i class="far fa-trash-alt me-3" onclick="removeProduct(${index})"></i> 
                    <img src="${produit.imageUrl}"  class="product-img size-img-panier" alt="vcam_1">
                </div>
            </div>
            <div class="d-flex justify-content-between w-100">
                <div class="titre-produit ms-sm-3">
                    <h1 class="product-name fs-4 me-4">${produit.name}</h1>
                </div>
                <div class="descrip-produit">
                    <p class="product-description">Option: ${produit.option}</p>
                </div>
                <div class="prix-produit">
                    <p class="product-price fw-bold ms-4">${produit.price} €</p>
                </div>
            </div>
        </div> 
        `   
    });
};

// ***FONCTION QUI CALCULE LE PRIX TOTAL DU PANIER***
totalPrice = () => {
    let sommeTotal = 0;
    for (let i = 0; i < panier.length; i++) {
        sommeTotal += panier[i].price;
        
    }
    document.getElementById("total-prix").innerHTML = `${sommeTotal} €`;
    document.getElementById("total-button").innerHTML = `${sommeTotal} €`;
    console.log(sommeTotal);
};
// ***FONCTION QUI SUPPRIME UN SEUL ELEMENT DU PANIER***
removeProduct = (index) => {
    panier.splice(index, 1);
    localStorage.setItem("panier", JSON.stringify(panier));
    listPanier.innerHTML = "";
    displayProduct();
    totalPrice();
    titrePanier();
};
// ***FONCTION QUI VIDE TOTALEMENT LE PANIER***
clearPanier = () => {
    localStorage.removeItem("panier");
    panier = [];
    listPanier.innerHTML = "";
    titrePanier();;
    totalPrice();
};

// ***ON APPELLE LES FONCTIONS***
titrePanier();
totalPrice();
displayProduct();

// *********LE FORMULAIRE**********
myForm.addEventListener("submit", (e) => {
    // **SELECTIONNE LES VALEURS DES INPUTS**
    const inputNom = document.getElementById("inputNom").value;
    const inputPrenom = document.getElementById("inputPrenom").value;
    const inputMail = document.getElementById("inputMail").value;
    const inputAdresse = document.getElementById("inputAdresse").value;
    const inputVille = document.getElementById("inputVille").value;;
    // **PREVENT DEFAULT POUR NE PAS RECHARGER LA PAGE AU CLICK**
    e.preventDefault();

    const regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const regexEspace = /^[A-zÀ-ú]/g;
    const regexAddress = /^[A-zÀ-ú0-9]/g;
    // **ON CREE UN ARRAY PRODUCTS A ENVOYER A L'API**
    let products = [];
    // **ON PUSH L'ID DES PRODUITS DANS L'ARRAY PRODUCTS**
    panier.forEach(produit => {
        products.push(produit._id);
    });
    // **ON CREER UN OBJET CONTACT A ENVOYER A L'API**
    const contact = 
        {
            firstName : inputNom,
            lastName : inputPrenom,
            address : inputAdresse,
            city : inputVille,
            email : inputMail
        };
    // **ON STOCK L'ARRAY ET L'OBJET DANS UNE VARIABLE A ENVOYER A L'API**
    const postData = {
        contact,
        products
    };

    console.log(postData);
    // **SI TOUS LES INPUTS SONT CONFORMES AU REGEX ET LE PANIER N'EST PAS VIDE, REQUETE POST**
    if (regexMail.test(inputMail) === true && regexAddress.test(inputAdresse) === true && regexEspace.test(inputNom, inputPrenom, inputVille) === true && panier.length > 0) {
        fetch("http://localhost:3000/api/cameras/order", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // **STRINGIFY LA VARIABLE POUR L'API**
            body: JSON.stringify(postData),
        })
        .then(res => res.json())
        .then(data => {
            // **ON RECUPERE LA REPONSE ORDER ID ET ON SAUVEGARDE DANS LE LOCALSTORAGE**
            window.localStorage.setItem("order", JSON.stringify(data));
            // **ON VIDE LE PANIER**
            clearPanier();
            // **REDIRECTION VERS LA PAGE COMMANDE AVEC L'ID**
            window.location.href = `commande.html?${data.orderId}`;
        })
        .catch(error => {
            console.warn(error);
        })
    } else {
        alert("Le formulaire n'est pas rempli correctement ou votre panier est vide.")
    }
});













