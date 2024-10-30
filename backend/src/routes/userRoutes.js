import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import { authorizeRole } from "../middlewares/roleMiddleware.js";

const userRouter = express.Router();

userRouter.post(
  "/super-admin",
  verifyToken,
  authorizeRole("SuperAdmin"),
  (req, res) => {
    res.json({ message: "Super Admin page" });
  }
);
userRouter.post(
  "/admin",
  verifyToken,
  authorizeRole("SuperAdmin", "Admin"),
  (req, res) => {
    res.json({ message: "Admin page" });
  }
);
userRouter.post(
  "/delivery-boy",
  verifyToken,
  authorizeRole("SuperAdmin"),
  (req, res) => {
    res.json({ message: "Delivery boy page" });
  }
);
userRouter.post(
  "/merchant",
  verifyToken,
  authorizeRole("SuperAdmin", "Merchant", "Admin"),
  (req, res) => {
    res.json({ message: "MErchant page" });
  }
);
userRouter.post(
  "/customer",
  verifyToken,
  authorizeRole("SuperAdmin"),
  (req, res) => {
    res.json({ message: "Customer page" });
  }
);

export default userRouter;
