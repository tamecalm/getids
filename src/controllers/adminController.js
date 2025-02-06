import express from "express";
import {
  login,
  logout,
  create,
  deleteAdmin,
  update,
  read,
} from "../services/adminService.js";

const adminController = express.Router();

// admin login controller
adminController.post("/login", login);

// admin logout controller
adminController.post("/logout", logout);

// admin create controller
adminController.post("/create", create);

// admin delete controller
adminController.delete("/delete", deleteAdmin);

// admin update controller
adminController.put("/update", update);

// admin read controller
adminController.get("/read", read);

export default adminController;
