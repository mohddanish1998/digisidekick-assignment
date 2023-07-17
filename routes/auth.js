const router=require("express").Router();
const User=require("../models/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

router.post("/register",async(req,res)=>{
    try {
        // encrypt password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword =  await bcrypt.hash(req.body.password, salt);
        // create new user
        const newUser =  new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
        })

        // save user and return response
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error)
    }
})

// Login
router.post("/login",async(req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email});
        !user && res.status(400).send("user not found")

        const validatePassword = await bcrypt.compare(req.body.password, user.password)
        !validatePassword && res.status(400).json("wrong password")

        const accessToken=jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin,
        },process.env.JWT_SEC,{expiresIn:"3d"},
        )

        const {password, ...restUser}=user._doc
        res.status(200).json({...restUser, accessToken});
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;