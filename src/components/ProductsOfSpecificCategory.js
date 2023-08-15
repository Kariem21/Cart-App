import React, { useEffect, useState } from "react";
import "../App.css"
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import "./CSS/ProductsOfSpecificCategory.css"
import Navbar from "./Navbar";
import Categories from "./Components/Categories";
import { addToCart } from "./Components/Slices/CartSlice";

const ProductsOfSpecificCategory = () => {
    const [productsOfCategory, setProductsofCategory] = useState([]);
const nav = useNavigate();
    const location = useLocation();
    // const products = location?.state?.products;
    const category = location?.state?.category;
    const categories = location?.state?.categories;

    const GetAllProductsOfCategory = (category) => {

        fetch(`https://dummyjson.com/products/category/${category}`)
            .then(res => res.json())
            .then((data) => setProductsofCategory(data.products));
    }
                                
useEffect(()=>{
    GetAllProductsOfCategory(category);
},[category]);
    console.log(productsOfCategory);
    return (
       <>
       <Navbar/>
       <Categories categories={categories}/>
       {/* <div className="AllDivOfBtns">
                <div className="DivBtn">
                    <button 
                    onClick={() => {
                        nav(`/products`,{state:{categories:categories}})
                    }}
                    className="BTN">
                        Suggested Products
                    </button> </div>
                {categories.map((category, index) => (
                    <div className="DivBtn" key={index}>
                        <button className="BTN"
                            onClick={() => {
                                nav(`/category/${category}`, { state: { category: category,categories:categories } })
                            }}
                        >
                            {category}
                        </button>
                    </div>
                ))}
            </div> */}
       <div className="CategoryName">
       {category}
       </div>
       <div className="productsOfCategory">
       {productsOfCategory.map((product,index)=>(
        <ProductCard  product ={product} key={index} categories={categories}/>))}
           
       </div>
       
       
       </>
    )
}

export default ProductsOfSpecificCategory;