const signup = require("../models/signupModel")
const bcrypt = require("bcrypt");


 module.exports.addSignup =  async(req , res ,next)=> {

     try {
     const {  name,
         email,
         password,
         confirmPassword } = req.body;
   
   const user = await signup.create({
      email,
       name,
      password,
       confirmPassword
    });

    // const data = { name: name,
    //  email: email ,
    //    password: password,
    //   confirmPassword:confirmPassword}

     if (user) return res.json({ msg: "user added successfully." , userFrom : user ,status :true });
    else return res.json({ msg: "Failed to add user to the database" });
  } catch (ex) {
    next(ex);
  }

//console.log("yojur request",req.body)
//res.send('Hello  frojm signup cojntrojler')  



}

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await xyz.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "name",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};
