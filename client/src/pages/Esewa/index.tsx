
import { useState } from "react";
import axios from "axios";
import { HeaderComponent } from "../../components/common";
import {FooterComponent} from "../../components/common";
export default function PaymentForm() {
  const [amount, setAmount] = useState(2);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    if (amount <= 0) {
      setStatus("Please enter a valid amount");
      return;
    }

    setLoading(true);
    setStatus("Initiating payment...");

    try {
     
      const createRes = await axios.post("http://localhost:173/order/esewa", {
        amount,
        buyerName: "Test User",
        email: "test@example.com",
        mobile: "9806800001",
      });

      const { pid } = createRes.data; 
      setStatus("Payment initiated. Redirecting to eSewa...");

    
      window.location.href = `https://uat.esewa.com.np/epay/main?amt=${amount}&pid=${pid}&scd=EPAYTEST&su=http://localhost:5173/payment/success&fu=http://localhost:5173/payment/failure`;

    } catch (err) {
      console.error(err);
      setStatus("Error initiating payment ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
<>
< HeaderComponent/>
    <div className="p-6 border rounded-xl max-w-md mx-auto mt-12 shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Test eSewa Payment</h2>

      <label className="block mb-2 font-medium">Amount (Rs.)</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="border p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        min={1}
      />

      <button
        onClick={handlePay}
        disabled={loading}
        className={`w-full py-2 rounded text-white font-semibold ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Processing..." : `Pay Rs. ${amount}`}
      </button>

      {status && <p className="mt-4 text-center text-gray-700">{status}</p>}
    </div>
<FooterComponent/>
</>
  );
}
