const { addLogin , logOut  ,getAllUsers , setAvatar} = require("../controllers/loginController");
const router = require("express").Router();

router.post("/addlogin/", addLogin);
router.get("/logout/:id", logOut);
router.get("/allusers/:id", getAllUsers);
router.post("/setavatar/:id", setAvatar);


module.exports = router;