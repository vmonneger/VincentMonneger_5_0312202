const urlId = window.location.search.substring(1);
const orderRender = document.getElementById("order-render");
let orderArray = [];
orderStorage = localStorage.getItem("order");
if (orderStorage !== null) {
    orderArray = JSON.parse(orderStorage);
    console.log(orderArray);
};


let orderContact = [];
orderContact.push(orderArray);


console.log(orderContact);


let productPrice = orderContact[0].products


let totalPrice = 0

for (let i = 0; i < productPrice.length; i++) {
    totalPrice += productPrice[i].price;
    console.log(totalPrice);
}

orderContact.map((order, index) => {
    console.log(order);
    console.log(order.products[index].price);
    console.log(totalPrice);
    orderRender.innerHTML =
    `<h1>Commande ${order.orderId}</h1><p>Bonjour ${order.contact.lastName} ${order.contact.firstName}, votre commande de ${totalPrice}€ a bien été
    enregistré.</p>`
})


