const router = require("express").Router();
const {Product} = require("../models");
const { v4: uuidv4 } = require('uuid');


router.get("/list", async(req, res)=>{
    console.log('req.headers', req.headers.jwt)
    const productList = await Product.findAll();
    res.status(200).send({
        ...productList
    })
})

router.post("/add", async(req, res)=>{
    const {productName, description, price, quantity} = req.body;
    const uuid = uuidv4();
    console.log('uuid', uuid)
    const newProduct = await Product.create({
        productId : uuid,
        productName: productName,
        description: description,
        price: price,
        quantity: quantity
    })
    res.status(201).send({
        ...newProduct,
        message: "product added successfully!",
        
    })
})

router.put("/update/:productId", async (req, res)=>{
    const productId = req.params.productId;
    const productToUpdate = await Product.findByPk(productId);
    const updateProps = req.body;
    const changedFields = {};
    for(const key in updateProps){
       if(updateProps.hasOwnProperty(key) && productToUpdate[key] !== updateProps[key]){
        changedFields[key] = updateProps[key];
       }
    }

    if (Object.keys(changedFields).length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
      }
      console.log('changedFields', changedFields)
      console.log('productToUpdate', productToUpdate)
      await Product.update(changedFields, {
        where: {
            productId: productId
        }
      });

      res.json(productToUpdate)

})


router.delete("/delete/:productId", async(req, res)=>{
    const productId = req.params.productId;
    await Product.destroy({
        where: {
            productId: productId
        }
    });
    res.status(200).send({
        message: "product deleted successfully!"
    });
})

module.exports = router;
