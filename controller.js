const { User, Game } = require("./models");
const { userSchemaZ } = require("./types");
const express = require("express");
const bcrypt = require("bcrypt");

app.use(express.json());

const saltRounds = parseInt(process.env.SALT_ROUNDS);

const signupController =  async (req, res) => {

    const parsed= userSchemaZ.safeParse(req.body);
    if(!parsed.success) {
        return res.status(400).json(parsed.error.errors);
    }

    const{ username, password } = parsed.data;
    const exists = await User.findOne({username});

    if(exists){
        return res.status(400).json({
            err: "User already exists"
        });
    }

    const hashed = await bcrypt.hash(password, saltRounds);

try{
const user = await User.create({username: username, password: hashed});

    res.json({
        msg: "Signup successful.",
        data: user
    });
} catch(err) {
    console.log(err);
}
}

const loginController = async (req, res) => {
    const parsed = userSchemaZ.safeParse(req.body);
    if(!parsed.success){
        return res.status(400).json(parsed.error.errors);
    }

    const { username, password } = parsed.data;
    const user = await User.findOne({username});
    if(!user){
        return res.status(400).json({
            err: "User not found"
        });
    }
    const match = bcrypt.compareSync(password, user.password);
    if(!match){
        return res.status(400).json({
            err: "Incorrect password"
        });
    }
}



module.exports = {
    signupController,
    loginController
}