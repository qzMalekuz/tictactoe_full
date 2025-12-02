const mongoose = require("mongoose");
const mongooseString = process.env.MONGOOSE_URL;

mongoose.connect(mongooseString)
    .then(() => console.log("Mongoose Connected"))
    .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, trim: true, sparse: true },
    password: { type: String, unique: true}
});

const gameSchema = new mongoose.Schema({
    title: { type: String, unique: true},
    player1: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    player2: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    moves: [{
        x: Number,
        y: Number,
        winner: {type: mongoose.Types.ObjectId},
        status: String
    }]
});

const User = mongoose.model("Users", userSchema);
const Game = mongoose.model("Games", gameSchema);

module.exports = {
    User,
    Game
}