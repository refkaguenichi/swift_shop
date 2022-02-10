import Order from "../models/orderModel.js";

export const createOrder = async (req, res) => {
  try {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "Cart is empty!" });
    } else {
      const order = new Order({
        // seller: req.body.orderItems[0].seller,
        ...req.body,
        user: req.user._id,
      });
      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: "New Order Created", order: createdOrder });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMineOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.status(201).send(orders);
  } catch (error) {
    res.status(404).send({ message: "Orders Not Found" });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.status(201).send(order);
    }
  } catch (error) {
    res.status(404).send({ message: "Order Not Found" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(201).send({ message: "Order deleted" });
  } catch (error) {
    res.status(404).send({ message: "Order Not Found" });
  }
};

export const payOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();
      res.status(201).send({ message: "Order Paid", order: updatedOrder });
    }
  } catch (error) {
    res.status(404).send({ message: "Order Not Found" });
  }
};
