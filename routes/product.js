const router = require("express").Router();
const {Product} = require("../models");
const { v4: uuidv4 } = require('uuid');
const verifyToken = require("../middlewares/verifyToken")

router.get("/list", async (req, res) => {
    try {
        const jwtVerification = verifyToken(req);
        if (!jwtVerification.success) {
            return res.status(401).send({
                message: "Authentication failed!"
            });
        }

        const productList = await Product.findAll();
        res.status(200).send({
            productList
        });
    } catch (error) {
        console.error("Error in /list endpoint:", error);
        res.status(500).send({
            message: "Internal server error"
        });
    }
});

router.post("/add", async (req, res) => {
    try {
        const jwtVerification = verifyToken(req);
        if (!jwtVerification.success) {
            return res.status(401).send({
                message: "Authentication failed!"
            });
        }
        
        const { user } = jwtVerification;
        if (!user.isAdmin) {
            return res.status(401).send({
                message: "You are not authorized for this action!"
            });
        }
        
        const { productName, description, price, quantity } = req.body;
        const uuid = uuidv4();
        
        await Product.create({
            productId: uuid,
            productName: productName,
            description: description,
            price: price,
            quantity: quantity
        });
        
        res.status(201).send({
            productName: productName,
            description: description,
            price: price,
            quantity: quantity,
            message: "Product added successfully!"
        });
    } catch (error) {
        console.error("Error in /add endpoint:", error);
        res.status(500).send({
            message: "Internal server error"
        });
    }
});

router.put("/update/:productId", async (req, res) => {
    try {
        const jwtVerification = verifyToken(req);
        if (!jwtVerification.success) {
            return res.status(401).send({
                message: "Authentication failed!"
            });
        }
        
        const { user } = jwtVerification;
        if (!user.isAdmin) {
            return res.status(401).send({
                message: "You are not authorized for this action!"
            });
        }
        
        const productId = req.params.productId;
        const productToUpdate = await Product.findByPk(productId);
        if (!productToUpdate) {
            return res.status(404).json({ error: "Product not found" });
        }
        
        const updateProps = req.body;

        const changedFields = {};
        for (const key in updateProps) {
            if (updateProps.hasOwnProperty(key) && productToUpdate[key] !== updateProps[key]) {
                changedFields[key] = updateProps[key];
            }
        }

        if (Object.keys(changedFields).length === 0) {
            return res.status(400).json({ error: 'No fields to update' });
        }

        await Product.update(changedFields, {
            where: {
                productId: productId
            }
        });

        res.status(200).json(productToUpdate);
    } catch (error) {
        console.error("Error in /update/:productId endpoint:", error);
        res.status(500).send({
            message: "Internal server error"
        });
    }
});


router.delete("/delete/:productId", async (req, res) => {
    try {
        const jwtVerification = verifyToken(req);
        if (!jwtVerification.success) {
            return res.status(401).send({
                message: "Authentication failed!"
            });
        }
        
        const { user } = jwtVerification;
        if (!user.isAdmin) {
            return res.status(401).send({
                message: "You are not authorized for this action!"
            });
        }
        
        const productId = req.params.productId;
        const productToDelete = await Product.findByPk(productId);
        if (!productToDelete) {
            return res.status(404).json({ error: "Product not found" });
        }
        
        await Product.destroy({
            where: {
                productId: productId
            }
        });

        res.status(200).send({
            message: "Product deleted successfully!"
        });
    } catch (error) {
        console.error("Error in /delete/:productId endpoint:", error);
        res.status(500).send({
            message: "Internal server error"
        });
    }
});

module.exports = router;
