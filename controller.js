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

module.exports = {
    signupController
}