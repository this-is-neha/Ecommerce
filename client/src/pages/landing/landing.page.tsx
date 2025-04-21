import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../config/axios.config";
import { NavLink } from "react-router-dom";
import "./landing.page.css";
import { HomeBannerComponent } from "../../components/banner";
import React from "react";

interface Category {
  section: string;
  _id: string;
  title: string;
  image: string;
}

interface Brand {
  _id: string;
  title: string;
  image: string; // Assuming 'image' is part of the Brand response too
}

const LandingPage = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loadingBrands, setLoadingBrands] = useState(false);
  const [showBrands, setShowBrands] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const baseUrl = 'http://127.0.0.1:5500/public/uploads/category/';
  const baseUrll = 'http://127.0.0.1:5500/public/uploads/brands/';
  const excludedCategoryIds = ["663b8d07bd6403f707ba7694", "663b8d67bd6403f707ba769d"];

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await axiosInstance.get("/category", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      const filteredCategories = response.result.filter(
        (category: Category) => !excludedCategoryIds.includes(category._id)
      );
      setCategories(filteredCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error fetching categories...");
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchBrands = async () => {
    try {
      setLoadingBrands(true);
      const response = await axiosInstance.get("/brand", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      
      // Filter out the brand with title 'Parade'
      const filteredBrands = response.result.filter(
        (brand: Brand) => brand.title.toLowerCase() !== "parade"
      );
      
      setBrands(filteredBrands);
      setShowBrands(true);
    } catch (error) {
      console.error("Error fetching brands:", error);
      toast.error("Error fetching brands...");
    } finally {
      setLoadingBrands(false);
    }
  };
  
  return (
    <>
      <HomeBannerComponent />

      {/* Brands Section */}
      <div className="bg-lime-50 my-10">
        <button
          onClick={fetchBrands}
          className="bg-blue-500 text-white py-2 px-4 rounded"
          disabled={loadingBrands}
        >
          {loadingBrands ? "Loading..." : "Brand Choice"}
        </button>

        {showBrands && (
          <div className="mt-4 relative">
            <button
              onClick={() => setShowBrands(false)}
              className="absolute top-0 right-0 p-2 text-red-500"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold">Available Brands</h2>

            <ul className="grid grid-cols-2 md:grid-cols-4 gap-5">
  {brands.length > 0 ? (
    brands.map((brand) => (
      <li key={brand._id} className="flex flex-col items-center">
<div className="w-[400px] h-auto border-2 border-black p-2">
          <NavLink to={`/brand/${brand._id}`}>
            <img
              src={`${baseUrll}${brand.image}`}
              alt={brand.title}
               className="w-full h-auto object-cover"
            />
          </NavLink>
        </div>
        <p className="text-center font-bold text-xl mt-2">
          {brand.title}
        </p>
      </li>
    ))
  ) : (
    <p>No brands available</p>
  )}
</ul>


          </div>
        )}
      </div>

      {/* Categories Section */}
      <div className="bg-lime-50 my-10">
        {loadingCategories ? (
          <p>Loading categories...</p>
        ) : (
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {categories.length > 0 ? (
              categories.map((category) => (
                <li key={category._id} className="flex flex-col items-center">
                  <div className="w-[400px] h-auto border-2 border-black p-2">
                    <NavLink to={`/category/${category._id}`}>
                      <img
                        src={`${baseUrl}${category.image}`}
                        alt={category.title}
                        className="w-full h-auto object-cover"
                      />
                    </NavLink>
                  </div>
                  <p className="text-center font-bold text-xl mt-2">
                    {category.title}
                  </p>
                </li>
              ))
            ) : (
              <p>No categories available</p>
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default LandingPage;
