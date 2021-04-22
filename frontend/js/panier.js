const listPanier = document.getElementById("list-panier");
const myForm = document.getElementById("myForm")
let panier = [];
const strPanier = localStorage.getItem("panier");
if (strPanier !== null) {
    panier = JSON.parse(strPanier);
}


displayProduct = () => {
    panier.map((produit, index) => {
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
    });
}

removeProduct = (index) => {
    panier.splice(index, 1);
    localStorage.setItem("panier", JSON.stringify(panier));
    console.log(panier);
    listPanier.innerHTML = "";
    displayProduct();
    totalPrice();
};

clearPanier = () => {
    localStorage.removeItem("panier");
    listPanier.innerHTML = "";
    document.getElementById("total-prix").innerHTML = "";
};

totalPrice = () => {
    let sommeTotal = 0;
    for (let i = 0; i < panier.length; i++) {
        sommeTotal += panier[i].price;
        
    }
    document.getElementById("total-prix").innerHTML = sommeTotal;
    console.log(sommeTotal);
}

totalPrice();
displayProduct();


myForm.addEventListener("submit", (e) => {
    const inputNom = document.getElementById("inputNom").value;
    const inputPrenom = document.getElementById("inputPrenom").value;
    const inputMail = document.getElementById("inputMail").value;
    const inputAdresse = document.getElementById("inputAdresse").value;
    const inputVille = document.getElementById("inputVille").value;;
    
    e.preventDefault();

    const regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    const regexEspace = /^[A-zÀ-ú]/g
    const regexAddress = /^[A-zÀ-ú0-9]/g

    let products = [];
    panier.forEach(produit => {
        products.push(produit._id);
    });
    const contact = 
        {
            firstName : inputNom,
            lastName : inputPrenom,
            address : inputAdresse,
            city : inputVille,
            email : inputMail
        };

    const postData = {
        contact,
        products
    }

    console.log(postData);
    if (regexMail.test(inputMail) === true && regexAddress.test(inputAdresse) === true && regexEspace.test(inputNom, inputPrenom, inputVille) === true) {
        fetch("http://localhost:3000/api/cameras/order", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            window.localStorage.setItem("order", JSON.stringify(data));
            window.location.href = `commande.html?${data.orderId}`;
        })
        .catch(error => {
            console.warn(error);
        })
    } else {
        alert("Le formulaire n'est pas rempli correctement, veuillez entrer des informations valides.")
    }
})












