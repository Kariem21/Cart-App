import React from "react";
import ProductCard from "../ProductCard";
import loader from "../../images/loaderpng.gif";
import "../CSS/Modal.css";
import "../CSS/Home.css";

const Modal = (props) => {
    const { onClose, load, searchData } = props;

    // Show loader if data is loading (load is false)
    // if (!load) {
    //     return (
    //         <img alt="wait" src={loader} />
    //     );
    // }

    // Show products if data is available
    return (
        <div className="modalOverlay">
            <div className="modal2">
                <label className="exit" onClick={() => onClose()}>Exit</label>
                <h1 className="headContact2">Products You Searched For</h1>
                <div className="AllSkincareProducts">
                    {searchData?.map((product, index) => (
                        <ProductCard product={product} key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Modal;
