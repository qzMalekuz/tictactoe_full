const { User, Game } = require("./models");
const { userSchemaZ } = require("./types");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const jwtPassword = process.env.JWT_SECRET;
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

    const token = jwt.sign({username}, jwtPassword);
    return res.json({
        msg: "Login Successfully",
        token
    });
};

const gameController = async (req, res) => {
    try{
    const user = await User.findOne({username: req.username});
    if(!user){
        return res.json({
            err: "User not found"
        });
    }

    const game = await Game.create({
        player1: req.user._id,
        moves: []
    });

    game.title = `game-${game._id}`;
    await game.save()

    return res,json({
        msg: "Game created",
        game
    });
    } catch (err) {
        console.error(err);
        return res.json({msg: "internal server erroe"})
    }
}

const makeMoveController = async (req, res) => {
    const { gameId, x, y } = req.body;
    
    const user = await User.findOne({username: req.username});
    const game = await Game.findbyId(gameId).populate("player1 player2");
    if(!game){
        return res.json({msg: "Game not found"});
    }

    const moves = game.moves;
    
}

module.exports = {
    signupController,
    loginController,
    gameController,
    makeMoveController
}