

import { FooterComponent, HeaderComponent } from "../../../components/common";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "axios"; 
import { toast } from "react-toastify";
import React from "react";

const Activate = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputToken, setInputToken] = useState(token || ''); 
  const [activationMessage, setActivationMessage] = useState('');

  useEffect(() => {
    if (token) {
      setInputToken(token);
      ActivateAccount(token);
    }
  }, [token]);

  const ActivateAccount = async (activationToken:any) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`http://localhost:9004/auth/activate/${activationToken}`);
      setLoading(false);

      if (response.data.result) {
        toast.success(response.data.message || "Your account has been activated successfully!");
        setActivationMessage("Account activated");
        navigate("/login");
      } else {
        toast.error(response.data.message || "Activation failed!");
        setActivationMessage("Activation failed! Please try again.");
      }
    } catch (error:any) {
      setLoading(false);
      console.error("Activation error:", error);
      toast.error(error.response?.data?.message || "Activation failed!");
      setActivationMessage("Activation failed! Please try again.");
    }
  };

  const handleActivate = () => {
    if (inputToken.trim() !== '') {
      ActivateAccount(inputToken);
    } else {
      toast.error("Please enter activation token!");
    }
  };

  const handleInputChange = (e:any) => {
    setInputToken(e.target.value);
  };

  return (
    <>
      <HeaderComponent />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-20 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-m">
          <h2 className="mt-40 text-center text-5xl font-bold leading-9 tracking-tight text-gray-900">
            Activating your account...
          </h2>
          <div className="mt-6">
            <input
              type="text"
              className="border border-gray-300 text-xl rounded-md px-3 py-6 w-full"
              placeholder="Enter activation token"
              value={inputToken}
              onChange={handleInputChange}
            />
            <button
              className="mt-6 bg-indigo-600 text-white px-6 py-4 text-xl  rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
              onClick={handleActivate}
              disabled={!inputToken.trim()}
            >
              Activate Account
            </button>
          </div>
          {activationMessage && (
            <p className={`mt-4 text-center text-gray-700 ${activationMessage.includes("failed") ? "text-red-500" : ""}`}>
              {activationMessage}
            </p>
          )}
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <FooterComponent />
    </>
  );
};

export default Activate;
