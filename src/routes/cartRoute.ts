import express from "express";
import { addItemToCart, getActiveCartForUser, updateItemInCart } from "../services/cartService";
import validateJWT from "../middleware/validateJWT";
import { ExtendRequest } from "../types/extendedRequest";

const router = express.Router();

router.get("/",
    validateJWT, 
    async (req:ExtendRequest, res) => {
    const userId = req.user._id;
        //
    const cart = await getActiveCartForUser({userId})
    res.status(200).send(cart);
    },
); 
router.post("/items", validateJWT, async (req: ExtendRequest, res) => {
    try {
      const userId = req?.user?._id;
      const { productId, quantity } = req.body;
      const response = await addItemToCart({ userId, productId, quantity });
      res.status(response.statusCode).send(response.data);
    } catch {
      res.status(500).send("Something went wrong!");
    }
  });

  router.put("/items", validateJWT, async (req: ExtendRequest, res) => {
    try {
      const userId = req?.user?._id;
      const { productId, quantity } = req.body;
      const response = await updateItemInCart({ userId, productId, quantity });
      res.status(response.statusCode).send(response.data);
    } catch {
      res.status(500).send("Something went wrong!");
    }
  });
export default router;
