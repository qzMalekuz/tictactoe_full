const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const { WebSocketServer } = require("ws");
const authMiddleware = require("./authMiddleware")
const {signupController, loginController, gameController, makeMoveController} = require("./controller")

const app = express();
app.use(express.json());
const port = parseInt(process.env.PORT);

app.post('/signup',signupController);
app.post('/login', loginController);

app.post('/game/create', authMiddleware, gameController);
app.post('/game/move', authMiddleware, makeMoveController);

app.listen(port, () => {
    console.log(`listening to Aujla on port ${port}`)
});