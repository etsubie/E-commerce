import express from "express";
import { authorizeRole } from "../middlewares/roleMiddleware.js";
import verifyToken from "../middlewares/authMiddleware.js";

const productRouter = express.Router();

productRouter.post("/product",verifyToken,authorizeRole("SuperAdmin"), (req, res) => {
  res.json({ message: "Customer page" });
});

export default productRouter;
