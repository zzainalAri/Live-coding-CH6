const express = require("express");
const router = express.Router();
const CarController = require("../controllers/carController");
const { auth, checkRole } = require("../middlewares/auth");

router.get("/", auth, CarController.getAllCars);
router.get("/:id", CarController.getCarById);

router.post(
  "/",
  auth,
  checkRole("admin", "superadmin"),
  CarController.createCar
);
router.put(
  "/:id",
  auth,
  checkRole("admin", "superadmin"),
  CarController.updateCar
);
router.delete(
  "/:id",
  auth,
  checkRole("admin", "superadmin"),
  CarController.deleteCar
);

module.exports = router;
