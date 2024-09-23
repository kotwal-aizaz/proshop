import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

/**
 * @description create new order
 * @route POST /api/orders
 * @access private
 */
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((item) => ({
        ...item,
        product: item._id, // we need this id to relate this object with the product modal
        _id: undefined, // not sure why I need to put this here
      })),
      user: req.user._id,
      shippingAddress,
      shippingPrice,
      itemsPrice,
      taxPrice,
      totalPrice,
      paymentMethod,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

/**
 * @description get logged in user orders
 * @route GET /api/orders/myorders
 * @access private
 */
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});
/**
 * @description get order by id
 * @route GET /api/orders/:id
 * @access private
 */
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name, email"
  );
  if (order) res.status(200).json(order);
  else {
    res.status(404);
    throw new Error("Order not found");
  }
});

/**
 * @description update order to paid
 * @route GET /api/orders/:id/pay
 * @access private / admin
 */
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("update order to paid");
});

/**
 * @description update to delivered
 * @route GET /api/orders/:id/deliver
 * @access private / admin
 */
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("update order to delivered");
});

/**
 * @description get all orders
 * @route GET /api/orders/:id
 * @access private / admin
 */
const getOrders = asyncHandler(async (req, res) => {
  res.send("get all orders");
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
