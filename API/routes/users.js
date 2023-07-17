const router = require("express").Router();
const User=require("../models/User");
const bcrypt=require("bcrypt");

const {
    verifyToken, 
    verifyTokenAndAuthorization,
}=require("./verifyToken")


//if the token verify then user can update the user or user should be admin
router.put("/update", async(req,res)=>{
    if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
        const updateUser = await User.findByIdAndUpdate(
            req.body.id,
            {
                $set:req.body,
            },
            {new:true}
        );
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete("/delete/:id", async(req,res)=>{
    if(req.params.id){
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Accoutn has been deleted!")
        } catch (error) {
            return res.status(500).json(error)
        }
    }else{
        return res.status(403).json("You can delete only your account")
    } 
});

router.get("/",verifyTokenAndAuthorization, async(req, res) => {
    const userId=req.query.userId;
    const username = req.query.username;
    try {
        const user=userId
        ? await User.findById(userId)
        : await User.findOne({username:username});
        const {password, updatedAt, ...others}=user._doc;
        res.status(200).json(others)
    } catch (error) {
        return res.status(500).json(error)
    }
})

router.get("/all", async(req, res) => {
    try {
        const user= await User.find({})
        res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports=router;