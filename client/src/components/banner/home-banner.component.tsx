import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import banner1 from "../../assets/banner1.jpg"
import banner2 from "../../assets/banner2.jpg"
import banner3 from "../../assets/banner3.png"
import banner4 from "../../assets/banner4.jpg"
import banner5 from "../../assets/banner5.jpg"
import banner11 from "../../assets/banner11.webp"
import banner12 from "../../assets/banner12.webp"
import banner13 from "../../assets/banner13.webp"
import { useSelector } from "react-redux"
import {useState,useEffect} from "react"
import axiosInstance from "../../config/axios.config"
import React from "react"
const HomeBannerComponent =()=>{
 
  var settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000, // 3000 milliseconds = 3 seconds
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true
  };



  const [data,setData]=useState([]as any)
  const getBannerForHomePage=async()=>{
    try{
const response:any=await axiosInstance.get("/banner/home-list")
setData(response.result)
    }
    catch(exception){
      getBannerForHomePage()
    }
  }
  useEffect(()=>{},[])

//   const bannerData=useSelector((root:any)=>{
//     return  root.banner.listAll;
//   })
// console.log(bannerData)

 return (<>
 <div className="bg-white">
        <div className="relative isolate ">
          

        <Slider {...settings}>
{
  data && data.map((banner:any, ind:number)=>{
    <div key={ind}>
      <a href={banner.link} target="blank">
        <img src={import.meta.env.VITE_IMAGE_URL+"/uploads/banner"+banner.image} alt="" />
      </a>
    </div>
  })  
}
  
       <div>
       <img src={banner11} className="w-full h-full"/>
      </div>
      <div>
      <img src={banner12} className="w-full h-full"/>
      </div>
      <div>
      <img src={banner13 } className="w-full h-full"/>
      </div>
      <div>
      <img src={banner4} className="w-full h-full"/>
      </div>
      <div>
      <img src={banner5} className="w-full h-full"/>
      </div>   

      
    </Slider>



        </div>
      </div>
 
 
 
 </>)
}
export default HomeBannerComponent