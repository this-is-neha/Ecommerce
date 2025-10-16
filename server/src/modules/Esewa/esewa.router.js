// esewa.router.js
import express from "express";
import  verifyEsewaPayment from "./esewa.controller.js"; 
const router = express.Router();

router.post("/verify-esewa", verifyEsewaPayment);

export default router;
