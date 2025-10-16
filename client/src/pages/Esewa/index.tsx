import { useState, useEffect } from "react";
import axios from "axios";
import { HeaderComponent, FooterComponent } from "../../components/common";
import { useNavigate, useParams } from "react-router-dom";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function PaymentForm() {
  const [amount, setAmount] = useState(2);
  const [name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();
  const { orderId } = useParams(); // get orderId from URL
  console.log("OrderId from URL:", orderId);

  const handlePay = async () => {
    if (!name || !accountNumber || amount <= 0) {
      setStatus("Please fill all fields correctly.");
      return;
    }

    if (!orderId) {
      setStatus("Order ID missing in URL!");
      console.warn("❌ Order ID is missing in URL params.");
      return;
    }

    setLoading(true);
    setStatus("Initiating payment...");
    console.log("Sending payment request with:", { amount, buyerName: name, accountNumber, orderId });

    try {
      const createRes = await axios.post(`${baseURL}/confrom/pay`, {
        amount,
        buyerName: name,
        accountNumber,
        orderId,
        email: "test@example.com",
        mobile: "9806800001",
      });

      console.log("Backend response:", createRes.data);

      const { orderId: returnedOrderId } = createRes.data;
      console.log("OrderId returned from backend:", returnedOrderId);

      if (!returnedOrderId) {
        setStatus("Failed to initialize payment (missing orderId from backend)");
        return;
      }

      setStatus("Payment initiated. Redirecting to eSewa...");

      const successURL = "http://localhost:5173/payment/success";
      const failureURL = "http://localhost:5173/payment/failure";
      const merchantCode = "EPAYTEST";

      const redirectUrl = `https://uat.esewa.com.np/epay/main?amt=${amount}&pid=${returnedOrderId}&scd=${merchantCode}&su=${successURL}&fu=${failureURL}`;
      console.log("Redirect URL:", redirectUrl);

      window.location.href = redirectUrl;
    } catch (err: any) {
      console.error("Error initiating payment:", err);
      setStatus("Error initiating payment ❌");
    } finally {
      setLoading(false);
    }
  };

  // Show success popup
  useEffect(() => {
    if (window.location.pathname.includes("/payment/success")) {
      setShowSuccess(true);
      const timer = setTimeout(() => navigate("/"), 3000);
      return () => clearTimeout(timer);
    }
  }, [navigate]);

  return (
    <>
      <HeaderComponent />
      <div className="p-6 border rounded-xl max-w-md mx-auto mt-12 shadow-md bg-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Test eSewa Payment</h2>

        <label className="block mb-2 font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block mb-2 font-medium">Bank Account Number</label>
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className="border p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

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

      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-bold mb-2">Payment Successful ✅</h3>
            <p className="text-gray-700">Redirecting to home page...</p>
          </div>
        </div>
      )}

      <FooterComponent />
    </>
  );
}
