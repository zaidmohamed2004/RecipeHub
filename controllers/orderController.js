const Order = require("../models/order.model");
const Cart = require("../models/cart.model");

const createOrder = async (req, res) => {
  try {
    const { shippingAddress, phone, paymentMethod } = req.body;
    const user = req.userId;

    const cart = await Cart.findOne({ user }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ msg: "Cart is empty, cannot place order" });
    }

    let totalAmount = 0;
    const orderItems = cart.items.map((item) => {
      const itemTotal = item.product.price * item.quantity;
      totalAmount += itemTotal;

      return {
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      };
    });

    const newOrder = new Order({
      user,
      items: orderItems,
      shippingAddress,
      phone,
      paymentMethod: paymentMethod || "Cash on Delivery",
      totalAmount,
    });

    await newOrder.save();

    cart.items = [];
    await cart.save();

    res.status(201).json({
      msg: "Order created successfully and cart cleared!",
      order: newOrder,
    });
  }
  
  catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId });
    res.status(200).json({ orders });
  
  } 
  catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
};