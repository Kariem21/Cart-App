import React from "react";
import "./CSS/ProductCard.css"
import { useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "./Components/Slices/CartSlice";
import { AiTwotoneDelete } from "react-icons/ai";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
const ProductCard = (props) => {
    const { product,categories } = props;
    const nav = useNavigate();
    const goToProduct = (id) => {
        nav(`/product/${id}`, { state: { productId: id,categories:categories } })
    }
    const Cart = useSelector(state => state.cart);

    const check = (productId) => {
        return Cart.some(product => product.id === productId);
    };
    const originalPrice = product?.price / (1 - product?.discountPercentage / 100);
    const roundedPrice = originalPrice.toFixed(2);
    // console.log(product)
    const dispatch = useDispatch();

    return (
        <>
            <div className="AllCardContainer">
                <div onClick={() => {
                    goToProduct(product?.id)


                }} className="ImgDiv">
                    <img alt="wait for response" src={product?.images[0]} />
                </div>
                <div className="ContContentOfCard1">

                <div style={{ margin: "0" }} className="PriceBigDiv1">
                    <p className="TitleOfCard">{product?.title}</p>
                    <div className="divOldPriceStyle">Was: <span className="OldPriceStyle">{roundedPrice}$</span></div>
                    <div className="divNewPriceStyle">Price(1pcs): <span className="NewPriceStyle">{product?.price}$</span></div>
                    <div className="divSavingPriceStyle">Saving: <span className="SavingPriceStyle">{(roundedPrice - product?.price).toFixed(2)}$</span>
                        <div className="DivInsideSaving"><span>{product?.discountPercentage}% Off</span></div>
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
        </>

    )

}

export default ProductCard;