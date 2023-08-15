import React from "react";
import "./CSS/ProductCard.css"
import { useNavigate } from "react-router-dom";
import {  FaCartPlus } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, updateQuantityMinus, updateQuantityPlus } from "./Components/Slices/CartSlice";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
const ProductCardWithoutIcon = ({ product,categories }) => {
    const dispatch = useDispatch()
    // const {product,addToCart} = props;
    const nav = useNavigate();
    const Cart = useSelector(state => state.cart);
    const goToProduct = (id) => {
        nav(`/product/${id}`, { state: { productId: id,categories:categories } })
    }
    const originalPrice = product?.price / (1 - product?.discountPercentage / 100);
    const roundedPrice = originalPrice.toFixed(2);

    // console.log(product.quantity)
    const UpdateQuantityAndCheck = (product) => {
        if (product.quantity === 0) {
            dispatch(removeFromCart(product));
            toastr.warning('Item removed from Cart');
        }
        else {
            dispatch(updateQuantityMinus(product))
        }
    }
    const check = (productId) => {
        return Cart.some(product => product.id === productId);
    };
    return (
        <div className="AllCardContainer">
            <div onClick={() => {
                goToProduct(product?.id)


            }} className="ImgDiv">
                <img alt="wait" src={product?.images[0]} />
            </div>
            <div className="ContContentOfCard1">

                <div style={{ margin: "0" }} className="PriceBigDiv1">
                    <p className="TitleOfCard">{product?.title}</p>
                    <div className="divOldPriceStyle">Was: <span className="OldPriceStyle">{roundedPrice}$</span></div>
                    <div className="divNewPriceStyle">Price(1pcs): <span className="NewPriceStyle">{product?.price}$</span></div>
                    <div className="divSavingPriceStyle">Saving: <span className="SavingPriceStyle">{(roundedPrice - product?.price).toFixed(2)}$</span>
                        <div className="DivInsideSaving"><span>{product?.discountPercentage}% Off</span></div>
                    </div>
                    <div> Total Price  : {product.quantity * product.price}</div>
                    <div className="QuantityWithButtons">
                        <button style={{borderRadius:"4px 0px 0px 4px"}} onClick={() => dispatch(updateQuantityPlus(product))}>+</button>
                        <div>{product.quantity}</div>
                        <button style={{borderRadius:"0px 4px 4px 0px"}} onClick={() => UpdateQuantityAndCheck(product)}>-</button>
                    </div>
                    <div className="ConIconPlusDel">


                        {check(product.id) ? (
                            <AiTwotoneDelete className="delete" onClick={() => {dispatch(removeFromCart(product));toastr.warning('Item Removed From Cart')}} />
                        ) : (
                            <FaCartPlus className="add" onClick={() => {dispatch(addToCart(product));toastr.success('Item Added To Cart')}} />
                        )}

                    </div>
                </div>

            </div>


        </div>
    )

}

export default ProductCardWithoutIcon;