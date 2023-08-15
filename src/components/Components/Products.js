import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchproducts } from "./Slices/ProductSlice";
import { addToCart } from "./Slices/CartSlice";
import Categories from "./Categories";
const Products = () => {
    const location = useLocation()
    const products = useSelector((state) => state?.products);
    const categories = location.state.categories;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchproducts());
    });
    return (
        <div>
            <Navbar />
            <Categories categories={categories} />


            <div className="AllSkinWithHeader">
                <h2>Suggested Products</h2>

                <div className="AllSkincareProducts">
                    {products.map((product, index) => (
                        <ProductCard categories={categories} product={product} key={index} addToCart={() => dispatch(addToCart(product))} />
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Products;