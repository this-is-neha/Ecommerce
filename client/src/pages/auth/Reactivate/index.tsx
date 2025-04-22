import React from "react";
import { FooterComponent, HeaderComponent } from "../../../components/common";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "axios";
import { toast } from "react-toastify";
const baseURL = import.meta.env.VITE_API_BASE_URL;
const Reactivate = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputToken, setInputToken] = useState(token || ''); 
  const [activationMessage, setActivationMessage] = useState('');

  useEffect(() => {
    if (token) {
      setInputToken(token);
      reactivateAccount(token);
    }
  }, [token]);

  const reactivateAccount = async (activationToken: string) => {
    if (!activationToken) {
      toast.error("Token is missing!");
      return;
    }
    try {
      setLoading(true);
      const response = await axiosInstance.get(`${baseURL}/auth/resettok/${activationToken}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      });

      setLoading(false);
      if (response.data.message === "Token is valid") {
        toast.success("Token validated successfully!");
        setActivationMessage("Token is valid. You can now reset your password.");
        navigate("/reset-password");
      } else {
        toast.error(response.data.message || "Activation failed!");
        setActivationMessage(response.data.message || "Activation failed!");
      }
    } catch (error: any) {
      setLoading(false);
      console.error("Activation error:", error);
 
      const errorMessage = error.response?.data?.message || "Invalid or expired token.";
      toast.error(errorMessage);
      setActivationMessage(errorMessage);
    }
  };

  const handleActivate = () => {
    if (inputToken.trim() !== '') {
      reactivateAccount(inputToken);
    } else {
      toast.error("Please enter activation token!");
    }
  };

  const handleInputChange = (e: any) => {
    setInputToken(e.target.value);
  };

  return (
    <>
      <HeaderComponent />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-20 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-14 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
            Enter the code
          </h2>
          <div className="mt-6">
            <input
              type="text"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              placeholder="Enter activation token"
              value={inputToken}
              onChange={handleInputChange}
            />
            <button
              className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
              onClick={handleActivate}
              disabled={!inputToken.trim() || loading}
            >
              {loading ? 'Processing...' : 'Reset Password'}
            </button>
          </div>
          {activationMessage && (
            <p
              className={`mt-4 text-center text-gray-700 ${activationMessage.includes("failed") ? "text-red-500" : ""}`}
            >
              {activationMessage}
            </p>
          )}
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default Reactivate;
