
const express = require("express");
const ClothesController = require("../controller/clothe.controller");
const multer = require("multer");

const clothesRouter = express.Router();
const loginMiddleware = require("../middleware/login.auth")
// Multer Storage Configuration
const uploadStorage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${Math.floor(Math.random() * 9999)}-${file.originalname}`);
  },
});

const uploadObj = multer({ storage: uploadStorage });

console.log("✅ Multer is working");

// Define Routes
clothesRouter.get("/all",ClothesController.getAllClothes);
clothesRouter.post("/add", uploadObj.single("cAvatar"), ClothesController.addClothe);
clothesRouter.delete("/delete/:cid",ClothesController.deleteClothe)
clothesRouter.put("/update/:cid",ClothesController.updatedClothe)

module.exports = clothesRouter;
console.log("✅ clothe router is working");

