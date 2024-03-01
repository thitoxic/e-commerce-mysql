const router = require("express").Router();
const {User} = require("../models");
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken")

router.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, email, password, isAdmin } = req.body;
        const uuid = uuidv4();

        const registeredEmail = await User.findOne({
            where: {
                email: email
            }
        });
        if (registeredEmail) {
            return res.status(409).send({
                message: "Email is already registered!"
            });
        }

        await User.create({
            userId: uuid,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: Buffer.from(password).toString('base64'),
            isAdmin: isAdmin
        });

        res.status(201).send({
            message: "User created!"
        });
    } catch (error) {
        console.error("Error in /register endpoint:", error);
        res.status(500).send({
            message: "Internal server error"
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const jwtSecretKey = process.env.JWT_SECRET_KEY;
        const userEmail = await User.findOne({
            where: {
                email: email
            }
        });

        if (!userEmail) {
            return res.status(401).send({
                message: "You are not registered!"
            });
        }

        if (Buffer.from(password).toString('base64') !== userEmail.password) {
            return res.status(401).send({
                message: "Password is incorrect!"
            });
        }

        const data = {
            time: Date(),
            email: userEmail.email,
            isAdmin: userEmail.isAdmin
        };

        const token = jwt.sign(data, jwtSecretKey, { expiresIn: '2h' });

        res.status(200).send({
            token,
            message: "Logged in successfully!"
        });
    } catch (error) {
        console.error("Error in /login endpoint:", error);
        res.status(500).send({
            message: "Internal server error"
        });
    }
});



module.exports = router;
