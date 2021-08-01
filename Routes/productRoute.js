const router = require("express").Router();
const Product = require("../Models/productModel");

router.get("/svi", (req, res) => {
    Product.find().then((product) => {
    res.send(product);
    });
});

router.post("/add", (req, res) => {
    try {
        const {productID, title, price, description, content, category} = req.body;
        Product.findOne({productID}).then((product) => {
            if(product) return res.status(400).send("Vec postoji proizvod sa ovim ID");
            else {
                const newProduct = new Product({
                    productID,
                    title,
                    price,
                    description,
                    content,
                    category
                });
                newProduct.save();
                return res.send("Uspesno ste dodali proizvod");
            }
        });
    } catch(err) {
        return res.status(500).send("Greska na serveru " + err);
    };
});






    // res.send({productID, title, price, description, content, category});


module.exports = router;