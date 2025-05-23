const express =require("express")
const mainRoute=express.Router()



const authRouter=require("../modules/auth/auth.router")
const userRouter=require("../modules/user/user.router")
const bannerRouter=require("../modules/banner/banner.router")
const brandRouter=require("../modules/brand/brand.router")
const categoryRouter=require("../modules/category/category.router")
const productRouter=require("../modules/product/product.router")
const orderRouter=require("../modules/delivery/delivery.router")
const conformRouter=require("../modules/conformation/confrom.router")
const addToCartRouter= require("../modules/addToCart/add.router")

mainRoute.use('/auth',authRouter)
mainRoute.use('/user',userRouter)
mainRoute.use("/banner",bannerRouter)
mainRoute.use("/brand",brandRouter)
mainRoute.use("/category",categoryRouter)
mainRoute.use("/product",productRouter)
mainRoute.use("/order",orderRouter)
mainRoute.use("/confrom",conformRouter)
mainRoute.use("/addToCart",addToCartRouter)
module.exports=mainRoute