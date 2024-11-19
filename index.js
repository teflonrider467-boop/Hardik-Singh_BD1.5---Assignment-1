const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

const totalCartPrice = (newItemPrice, cartTotal) => {
  return cartTotal + newItemPrice;
}

const totalCartPriceForMember = (cartTotal, isMember) => {
  return isMember ? cartTotal - ((cartTotal * discountPercentage) / 100) : cartTotal;
};

const totalCartPriceAfterTax = (cartTotal) => {
  return ((cartTotal * taxRate) / 100);
};

const timeForDelivery = (distance, shippingMethod) => {
  return shippingMethod === "express" ? distance/100 : distance/50;
}

const shippingCostByWeight = (distance, weight ) =>{
  return weight * distance * 0.1;
}

const loyaltyPoints = (purchaseAmount) => {
  return purchaseAmount*2;
}

app.get('/', (req, res) => {
  res.send("Root Route");
});

app.get('/cart-total', (req, res) => {
  const { newItemPrice, cartTotal } = req.query;  
  res.send(totalCartPrice(parseFloat(newItemPrice), parseFloat(cartTotal)).toString());
});

app.get('/membership-discount', (req, res) => {
  const { cartTotal } = req.query;
  const isMemeber = req.query.isMember === "true";  
  res.send(totalCartPriceForMember(parseFloat(cartTotal), isMemeber).toString());
});

app.get('/calculate-tax', (req, res) => {
  const { cartTotal } = req.query;  
  res.send(totalCartPriceAfterTax(parseFloat(cartTotal)).toString());
});

app.get('/estimate-delivery', (req, res) => {
  const { shippingMethod, distance } = req.query;  
  res.send(timeForDelivery(parseFloat(distance), shippingMethod).toString());
});

app.get('/shipping-cost', (req, res) => {
  const { weight, distance } = req.query;  
  res.send(shippingCostByWeight(parseFloat(distance), parseFloat(weight)).toString());
});

app.get('/loyalty-points', (req, res) => {
  const { purchaseAmount } = req.query;  
  res.send(loyaltyPoints(parseFloat(purchaseAmount)).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
