const router = require("express").Router();

//HTTP GET-trazis podatke od servera
router.get("/", (req, res) => {
  res.send("Hello");
});

//HTTP POST-upisujes podatke(u bazu)
router.post("/post", (req, res) => {});

//HTTP PUT-azuriras podatke koje vec postoje na serveru(u bazi)
router.put("/put", (req, res) => {});

//HTTP DELETE-brises podatke
router.delete("/delete", (req, res) => {});

module.exports = router;
