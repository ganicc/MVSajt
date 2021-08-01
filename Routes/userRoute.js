const router = require("express").Router();
const User = require("../Models/userModel");

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
        return res.status(400).send("Vec postoji korisnik sa tim emailom.");
    });

    const newUser = User({
      name,
      email,
      password,
    });
    newUser.save();
    res.send("Uspesno ste se registrovali.");
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
