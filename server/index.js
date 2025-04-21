const http=require("http")
const express= require('express')
const app=require("./src/config/express.config")

const server=http.createServer(app)
server.listen(9004,'127.0.0.1',(err)=>{
    if(!err){
        console.log("Server is running successfully");
        console.log("Press CTRL C to disconnect")
    }
})