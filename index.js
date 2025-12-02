const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = require("./authMiddleware")
const { User, Game } = require("./models");
const {signupController} = require("./controller")

const express = require("express");
const { WebSocketServer } = require("ws");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

const port = parseInt(process.env.PORT);
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const jwtPassword = process.env.JWT_SECRET;

app.post('/signup',);

app.listen(port, () => {
    console.log(`listening to Aujla on port ${port}`)
});