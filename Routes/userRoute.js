const router = require("express").Router();
const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

            newUser.save();

            //ACCESS i REFRESH tokeni
            const accessToken = createAccessToken({ _id: newUser._id });
            const refreshToken = createRefreshToken({ _id: newUser._id });

            res.cookie("refreshtoken", refreshToken, {
              httpOnly: true,
              path: "/user/refresh_token",
              maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
            });

            //res.send({ accessToken, refreshToken });

            return res.send("Uspesno ste se registrovali.");
          })
        );
      }
    });
  } catch (err) {
    res.status(500).send("Greska na serveru.");
  }
});

router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;
    User.findOne({ email }).then((user) => {
      if (!user) res.status(400).send("Nije registrovan taj email");
      else {
        //Kreiranje Access i Refresh tokena

        res.send("Uspesno ste se ulogovali.");
      }
    });
  } catch (err) {
    return res.status(500).send("Greska na serveru " + err);
  }
});

const createAccessToken = (user) => {
  return jwt.sign(user, "KK(jxpfYPjr,;<@jMMR#AKjG,5.ZkEtm3'Vku?,;h;&5.k$_~u", {
    expiresIn: "11m",
  });
};

const createRefreshToken = (user) => {
  return jwt.sign(
    user,
    "Z~_<[U^ef%e[wK?H*9/)7j`.QggK?xnAEB;`m29E~~$x{Sc^S[^jACp<?9BeV/>t_s]286!mnW7*^,r+r=/M3<V{WLJhB7Py:S",
    { expiresIn: "7d" }
  );
};

module.exports = router;
