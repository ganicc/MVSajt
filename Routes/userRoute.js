const router = require("express").Router();
const User = require("../Models/userModel");
const bcrypt = require("bcrypt");

router.get("/svi", (req, res) => {
  User.find().then((user) => {
    res.send(user);
  });
});

router.post("/register", (req, res) => {
  try {
    const { name, email, password } = req.body;
    //const name = req.body.name;
    User.findOne({ email }).then((user) => {
      if (user)
        return res.status(400).send("Vec ste se registrovali sa tim emailom.");
      else {
        const newUser = User({
          name,
          email,
          password,
        });
        //Kriptovanje sifre
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            //console.log(newUser);
            newUser.save();
            return res.send("Uspesno ste se registrovali.");
          })
        );
      }
    });
  } catch (err) {
    res.status(500).send("Greska na serveru.");
  }
});

module.exports = router;

/*if (user)
      return res.status(400).send("Vec postoji korisnik sa tim emailom.");
    
    if (user) {
      const newUser = User({
        name,
        email,
        password,
      });
      res.send(newUser);

    newUser.save();
      return res.send("Uspesno ste se registrovali.");
      */

/*

      const niz=[milos,vuksan];
      niz.map((korisnik)=>{
        return korisnik.name;
      })

      */
