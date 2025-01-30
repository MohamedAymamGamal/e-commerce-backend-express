import { cartModel } from "../models/cartModel";
import productModel from "../models/productModel";

interface createCartForUser {
  userId: string;
}
const createCartForUser = async ({ userId }: createCartForUser) => {
  const cart = await cartModel.create({ userId });
  await cart.save();
  return cart;
};
interface getActiveCardForUser {
  userId: string;
}

export const getActiveCartForUser = async ({
  userId,
}: getActiveCardForUser) => {
  let cart = await cartModel.findOne({ userId, status: "active" });
  if (!cart) {
    cart = await createCartForUser({ userId });
  }
  return cart;
};

interface addItemToCart {
  productId: any;
  quantity: number;
  userId: string;
}
export const addItemToCart = async ({
  productId,
  quantity,
  userId,
}: addItemToCart) => {
  const cart = await getActiveCartForUser({ userId });
  // Does the item exist in the cart ?
  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );

  if (existsInCart) {
    return { data: "Item already exists in cart!", statusCode: 400 };
  }
  //
  const product = await productModel.findById(productId);
  //
  if (!product) {
    return { data: "product not found!", statusCode: 400 };
  }
  if (product.stock < quantity) {
    return { data: "product not found!", statusCode: 400 };
  }
  cart.items.push({
    product: productId,
    unitPrice: product.price,
    quantity,
  });
  const udpateCart = await cart.save();
  cart.totalAmount += product.price * quantity;
  return { data: udpateCart, statusCode: 200 };
};
interface UpdateItemInCart {
  productId: any;
  quantity: number;
  userId: string;
}

export const updateItemInCart = async ({
  productId,
  quantity,
  userId,
}: UpdateItemInCart) => {
  const cart = await getActiveCartForUser({ userId });

  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );

  if (!existsInCart) {
    return { data: "Item does not exist in cart", statusCode: 400 };
  }

  const product = await productModel.findById(productId);

  if (!product) {
    return { data: "Product not found!", statusCode: 400 };
  }

  if (product.stock < quantity) {
    return { data: "Low stock for item", statusCode: 400 };
  }

  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId
  );

  let total = otherCartItems.reduce((sum,product)=>{
     sum += product.quantity * product.unitPrice;
     return sum;
  },0);

  existsInCart.quantity = quantity;
  total += existsInCart.quantity * existsInCart.unitPrice;

  cart.totalAmount = total;

  const updateCart = await cart.save();

  return {
    data:updateCart,
    statusCode: 200,
  };
};


