const express = require("express");
const { check } = require("express-validator");

const placesControllers = require("../controllers/places-controllers");
const fileUpload = require("../middleware/file-upload");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/:pid", placesControllers.getPlaceById);

router.get("/user/:uid", placesControllers.getPlacesByUserId);

router.use(authMiddleware);

router.post(
  "/",
  fileUpload.single("image"),
  authMiddleware,
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placesControllers.createPlace
);

router.patch(
  "/:pid",
  authMiddleware,
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placesControllers.updatePlace
);

router.delete("/:pid", authMiddleware, placesControllers.deletePlace);

module.exports = router;
