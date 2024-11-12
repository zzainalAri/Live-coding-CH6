const router = require("express").Router();

const carRouter = require("./carRouter");
const userRouter = require("./userRouter");

router.use("/cars", carRouter);
router.use("/users", userRouter);

module.exports = router;
