const express = require("express");
const mongoose = require("mongoose");

//Inicijalizacija express
const app = express();

//Dodavanje porta
const PORT = process.env.PORT || 3000;

//Povezivanje na bazu
const dbString =
  "mongodb+srv://admin:admin123@mvsajt.ei20o.mongodb.net/MVSajt?retryWrites=true&w=majority";

//Povezivanje baze
mongoose.createConnection(
  dbString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Povezan na MongoDB")
);

//Listen se koristi za povezivanje porta na server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

/* Ovo je isto samo lepsi zapis
function() {
    
}

()=>{
    
}*/

//HTTP GET-trazis podatke od servera
app.get("/", (req, res) => {
  res.send("Hello");
});
//HTTP POST-upisujes podatke(u bazu)
app.post("/post", (req, res) => {});

//HTTP PUT-azuriras podatke koje vec postoje na serveru(u bazi)
app.put("/put", (req, res) => {});
//HTTP DELETE-brises podatke
app.delete("/delete", (req, res) => {});
