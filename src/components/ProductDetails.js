import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./CSS/ProductDetails.css"
import "../App.css"
import { BiSolidStar } from "react-icons/bi";
import Navbar from "./Navbar";
import {  FaCartPlus } from "react-icons/fa";
import { addToCart, removeFromCart } from "./Components/Slices/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { AiTwotoneDelete } from "react-icons/ai";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
const ProductDetails = () => {
    const [product, setProduct] = useState([]);
    const [images, setImages] = useState([]);
    const [selectedimage, setSelectedetImage] = useState('');
    useEffect(() => {
        if (images?.length > 0) {
            setSelectedetImage(images[0]);
        }
    }, [images]);
    const location = useLocation()
    const productId = location?.state?.productId;

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${productId}`)
            .then(res => res.json())
            .then((data) => { setProduct(data); setImages(data.images) });
    }, [productId])
    const onSetImages = (image) => {

        setSelectedetImage(image)
    }


    const dispatch = useDispatch();
    const Cart = useSelector(state => state.cart);
   
    const check = (productId) => {
        return Cart.some(product => product.id === productId);
    };
    console.log(check()[0]);
    const originalPrice = product.price / (1 - product.discountPercentage / 100);
    const roundedPrice = originalPrice.toFixed(2)
    return (
        <>
            <Navbar />


            <div className="AllContProductDetails">
                <div className="ImagesContainer">
                    <div className="DivImageGroup">
                        {
                            images?.map((image, index) => (
                                <img
                                    style={{
                                        border: selectedimage === image ? "1px solid blue" : "none"
                                    }}
                                    className="imageInGroup"

                                    alt="not found" key={index} src={image} onClick={() => onSetImages(image)} />
                            ))
                        }
                    </div>
                    <div className="DivSelectedImage">
                        <img className="SelectedImage" alt="select one" src={selectedimage} />

                    </div>


                </div>
                <div className="ConAllData">
                    <div className="brand">{product?.brand}</div>
                    <div className="Title"> {product?.title}</div>
                    <div className="Category"> {product?.category}</div>
                    <div className="Rating">{product?.rating} <BiSolidStar /></div>
                    <div className="PriceBigDiv">
                        <div className="divOldPriceStyle">Was: <span className="OldPriceStyle">{roundedPrice}$</span></div>
                        <div className="divNewPriceStyle">Now: <span className="NewPriceStyle">{product?.price}$</span></div>
                        <div className="divSavingPriceStyle">Saving: <span className="SavingPriceStyle">{(roundedPrice - product?.price).toFixed(2)}$</span>
                            <div className="DivInsideSaving"><span>{product?.discountPercentage}% Off</span></div></div>
                    </div>
                    <div className="Description">
                        <span className="Overview">
                            Overview
                        </span>
                        <span className="DescriptionContent"> {product?.description} </span>

                    </div>


                    {/* Inside your mapping */}
                    <div style={{margin:"20px 0"}}>
                    {check(product.id) ? (
                            <AiTwotoneDelete className="delete" onClick={() => { dispatch(removeFromCart(product)); toastr.warning("Item Removed from cart") }} />
                        ) : (
                            <FaCartPlus className="add" onClick={() => { dispatch(addToCart(product)); toastr.success("Item Added To Cart") }} />
                        )}
                    </div>



                  


                </div>

            </div>
        </>

    )
}

export default ProductDetails;