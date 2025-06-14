const { addSignup } = require("../controllers/signupController");
const router = require("express").Router();

router.post("/addsignup/", addSignup);


module.exports = router;
