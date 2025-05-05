import orderModel from './../models/orderModel.js';
import userModel from './../models/userModel.js';

// Placing user order for frontend (without Stripe)
const placeOrder = async (req, res) => {
    try {
        // Create a new order in the database
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,  // You may calculate the total amount here if needed
            address: req.body.address,
            payment: true  // Assume payment is done since we're bypassing Stripe
        });

        // Save the order to the database
        await newOrder.save();

        // Clear the user's cart after placing the order
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Return success response with the order ID
        res.json({
            success: true,
            message: "Order placed successfully, payment simulated as completed",
            orderId: newOrder._id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || "Error placing the order"
        });
    }
};

// Verifying the order after user confirmation (still assuming payment as true without Stripe)
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === 'true') {
            // If the payment is successful, mark the order as paid
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Order paid successfully" });
        } else {
            // If the payment fails, delete the order
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Order not paid" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error verifying the order"
        });
    }
};

// Fetching user orders (for frontend)
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error fetching user orders"
        });
    }
};

// Listing all orders for the admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error listing orders"
        });
    }
};

// Updating order status (for admin panel)
const updateStatus = async (req, res) => {
    const { orderId, status } = req.body;
    try {
        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // Update order status
        order.status = status;
        await order.save();

        res.json({ success: true, message: "Order status updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error updating order status"
        });
    }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
