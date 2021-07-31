const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./Routes/userRoute");
const indexRouter = require("./Routes/indexRoute");

//Inicijalizacija express
const app = express();
app.use(express.json());

//Dodavanje porta
const PORT = process.env.PORT || 3000;

//Povezivanje na bazu
const dbString =
  "mongodb+srv://milos:milos@mvsajt.ei20o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//Povezivanje baze
mongoose.connect(
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

//ROUTES
app.use("/", indexRouter);
app.use("/user", userRouter);
