const urlId = window.location.search.substring(1);
const orderRender = document.getElementById("order-render");
let orderArray = [];
orderStorage = localStorage.getItem("order");
if (orderStorage !== null) {
    // **ON PUSH DANS L'ARRAY VIDE POUR UTILISER METHOD MAP**
    orderArray.push(JSON.parse(orderStorage));
};

// **ON RECUPERE LES PRODUITS DANS L'ARRAY POUR CALCULER SOMME TOTAL**
let productPrice = orderArray[0].products;
let totalPrice = 0;

for (let i = 0; i < productPrice.length; i++) {
    totalPrice += productPrice[i].price;
    console.log(totalPrice);
};

orderArray.map((order) => {
    orderRender.innerHTML =
    
    `<div class="alert alert-success" role="alert">
        Votre commande a été passé avec succès.
    </div>
    <h1>Commande ${order.orderId}</h1>
    <p>Bonjour ${order.contact.lastName} ${order.contact.firstName}, votre commande de ${totalPrice}€ a bien été
    enregistré.</p>`
});


