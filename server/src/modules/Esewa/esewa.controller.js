// esewa.controller.js
import axios from "axios";
import Order from "../delivery/delivery.model.js"; 
const MERCHANT_ID = "EPAYTEST";

const verifyEsewaPayment = async (req, res) => {
  const { amt, refId, pid } = req.body.amt ? req.body : req.query;

  console.log("eSewa Callback Data:", req.body);

  try {
    const payload = new URLSearchParams({
      amt,
      rid: refId,
      pid,
      scd: MERCHANT_ID,
    }).toString();

    const verifyRes = await axios.post(
      "https://uat.esewa.com.np/epay/transrec",
      payload,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    if (verifyRes.data.includes("Success")) {
      await Order.findOneAndUpdate({ _id: pid }, { status: "Paid", refId });
      return res.redirect("http://localhost:5173/payment/success");
    } else {
      return res.redirect("http://localhost:5173/payment/failure");
    }
  } catch (error) {
    console.error("Payment verification error:", error.message);
    res.status(500).send("Payment verification failed");
  }
};

module.exports =new verifyEsewaPayment;