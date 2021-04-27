const urlId = window.location.search.substring(1);
const orderRender = document.getElementById("order-render");
let orderArray = [];
orderStorage = localStorage.getItem("order");
if (orderStorage !== null) {
    orderArray = JSON.parse(orderStorage);
};


let orderContact = [];
orderContact.push(orderArray);




let productPrice = orderContact[0].products;


let totalPrice = 0;

for (let i = 0; i < productPrice.length; i++) {
    totalPrice += productPrice[i].price;
    console.log(totalPrice);
};

orderContact.map((order) => {
    orderRender.innerHTML =
    
    `<div class="alert alert-success" role="alert">
        Votre commande a été passé avec succès.
    </div>
    <h1>Commande ${order.orderId}</h1>
    <p>Bonjour ${order.contact.lastName} ${order.contact.firstName}, votre commande de ${totalPrice}€ a bien été
    enregistré.</p>`
});

clearPanier = () => {
    localStorage.removeItem("panier");
};

clearPanier();


