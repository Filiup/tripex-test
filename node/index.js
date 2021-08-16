require("dotenv").config(); // System variables (contains Email, Password and Enviroment)
const config = require("config"); // Enviroment configuration files, stored in config folder
const SendMail = require("./email");
const express = require("express");
const path = require("path");
const uuid = require('node-uuid');
const origins = require("./middleware/origins");
const app = express();

const port = process.env.PORT || 2443;
const Server_IP = config.get("ip");
let payments = [];


function GenerateID() {
  return uuid.v4();
}


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set('json spaces', 2);
app.use(express.json());
app.use(express.static("public"));

if (process.env.NODE_ENV == "development") {
  app.use(origins);
}


app.get("/", (req, res) => {
  res.send(payments);
});

app.post("/", (req, res) => {
  // Post request, error handling is on the front end
  const id = GenerateID();
  const ip = `${Server_IP}:${port}/${id}`;

  const data = {
    id: id,
    data: req.body.data
  };

  
  payments.push(data);

  // Send Mail

  
  SendMail({
    service: "gmail",
    to: req.body.data.customer_mail,
    subject: "Hello world !!!",
    text: `Funguje to ? ${ip}`
  });

  res.send(ip);
  

});


app.get("/:id", (req, res) => {
  // Look up the payment
  // If not existing, return 404

  const payment = payments.find( c => c.id === req.params.id);
  if (!payment) return res.status(404).send("Platba s týmto ID bohužial neexistuje");

  // If the payment was found, render page with it's data

  res.render("index", payment.data);




});

app.delete("/:id", (req, res) => {
  // Look up the payment
  // If not existing, return 404

  const payment = payments.find( c => c.id === req.params.id);
  if (!payment) return res.status(404).send("Platba s týmto ID bohužial neexistuje");

  // If the payment was found, delete it
  const index = payments.indexOf(payment);
  payments.splice(index, 1);


});

app.listen(port, () => console.log(`Server is running on port ${port}`));