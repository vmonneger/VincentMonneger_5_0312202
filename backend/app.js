import error404Screen from "./error404Screen.js";
import homeScreen from "./homeScreen.js"
import productScreen from "./productScreen.js"
import { parseRequestUrl } from "./utils.js";

// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const path = require('path');

// const cameraRoutes = require('./routes/camera');
// const teddyRoutes = require('./routes/teddy');
// const furnitureRoutes = require('./routes/furniture');

// const app = express();
const routes = {
  "/": homeScreen,
  "/product/:id": productScreen,
}
const router = () => {
  const request = parseRequestUrl();
  const parseUrl =
  (request.ressource ? `/${request.resource}` : "/") +
  (request.id ? "/:id" : "") +
  (request.verb ? `/${request.verb}` : "");
  const screen = routes[parseUrl] ? routes[parseUrl] : error404Screen;

  const main = document.getElementById("list-product")
  main.innerHTML = screen.render();
}
window.addEventListener("load", router);
window.addEventListener("hashchange", router);

// mongoose.connect(
//   'mongodb+srv://will:nAcmfCoHGDgzrCHG@cluster0-pme76.mongodb.net/test?retryWrites=true',
//   { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Successfully connected to MongoDB Atlas!');
//   })
//   .catch((error) => {
//     console.log('Unable to connect to MongoDB Atlas!');
//     console.error(error);
//   });

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//   next();
// });

// app.use('/images', express.static(path.join(__dirname, 'images')));

// app.use(bodyParser.json());

// app.use('/api/cameras', cameraRoutes);
// app.use('/api/teddies', teddyRoutes);
// app.use('/api/furniture', furnitureRoutes);

// module.exports = app;
