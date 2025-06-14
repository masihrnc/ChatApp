const login = require("../models/signupModel")


 module.exports.addLogin =  async(req , res ,next)=> {

     try {
     const { 
         email,
         password,
          } = req.body;
   
   const user = await login.findOne({email});
 if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
   
   if (user) return res.json({ msg: "user login successfully." ,status: true, userFrom : user });
    else return res.json({ msg: "Failed to Login" });
  } catch (ex) {
    next(ex);
  }

//console.log("yojur request",req.body)
//res.send('Hello  frojm signup cojntrojler')  



}
module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};
module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await login.find({ _id: { $ne: req.params.id } }).select([
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
module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await login.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage:avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};
