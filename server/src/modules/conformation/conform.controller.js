const axios = require("axios");
const Order = require("../delivery/delivery.model"); // adjust path if needed

class ConformController {
  // Endpoint to create/initiate payment
  async createPayment(req, res) {
    try {
      const { amount, buyerName, accountNumber, orderId } = req.body;

      console.log("Received payment request:", req.body);

      if (!buyerName || !accountNumber || !amount || !orderId) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Check if order already exists
      let order = await Order.findById(orderId);
      if (!order) {
        order = await Order.create({
          _id: orderId, // use orderId from frontend
          buyerName,
          accountNumber,
          amount,
          status: "Pending",
        });
      }

      console.log("Order created/found:", order);

      return res.status(200).json({ orderId: order._id });
    } catch (error) {
      console.error("Error creating payment:", error);
      return res.status(500).send("Payment verification failed");
    }
  }

  // Endpoint to verify eSewa payment
  async verifyEsewaPayment(req, res) {
    const MERCHANT_ID = "EPAYTEST"; 
    const { amt, refId, pid, buyerName, accountNumber } = req.body;

    console.log("eSewa Callback Data:", req.body);

    try {
      const payload = new URLSearchParams({
        amt,
        rid: refId || "",
        pid,
        scd: MERCHANT_ID,
      }).toString();

      const verifyRes = await axios.post(
        "https://uat.esewa.com.np/epay/transrec",
        payload,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      if (verifyRes.data.includes("Success")) {
        await Order.findByIdAndUpdate(pid, {
          status: "Paid",
          refId,
          buyerName,
          accountNumber,
          amount: amt,
        });

        return res.redirect("http://localhost:5173/payment/success");
      } else {
        return res.redirect("http://localhost:5173/payment/failure");
      }
    } catch (error) {
      console.error("Payment verification error:", error.message);
      res.status(500).send("Payment verification failed");
    }
  }
}

module.exports = new ConformController();
