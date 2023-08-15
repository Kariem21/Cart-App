import React, { useState } from "react";
import "./CSS/Navbar.css"
import "../App.css"
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import Modal from "./Components/Modal";
import { useEffect } from "react";

const Navbar = ({ categories }) => {
    const nav = useNavigate();
    const cart = useSelector(state => state.cart);
   
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState("");
    const [load,setLoad]=useState(false);

    const searchFucn = () => {
        fetch(`https://dummyjson.com/products/search?q=${search}`)
            .then(res => res.json())
            .then(data => {
                if (data?.products?.length === 0) {
                    setLoad(true); // No results found
                } else {
                    setLoad(true); // Results found
                    setSearchData(data.products);
                }
            });
    };
    
    
    const handleIconClick = () => {
        searchFucn(); // Call the search function to fetch data
        setShowModal(true); // Show the modal when the search icon is clicked
    };
    
    useEffect(()=>{
        searchFucn(search);
    })
    // console.log(search);
    // console.log(searchData);

    return (
        <div className="ContainerNavbar">


            <div className="Noon" onClick={() => nav(`/`)} >
                <img className="imgNoon" alt="noon" src="https://f.nooncdn.com/s/app/com/noon/design-system/logos/noon-logo-en.svg"></img>
            </div>
            <div className="divSearchBar">
    <input
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="What are you looking for?"
        className="search-input"
        name="search"
    />
    <FaSearch className="SearchIcon" onClick={handleIconClick} />
    {showModal && (
    <Modal load={load} searchTerm={search} searchData={searchData} onClose={() => setShowModal(false)} />
)}
</div>
            <div className="Language">
                <p>العربية</p>
            </div>
            <div className="SignIn">
                <button className="ButtonCont" type="button">
                    <span >Sign In</span>
                    <img src="https://f.nooncdn.com/s/app/com/noon/icons/user_thin.svg" alt="Open Login Modal" />

                </button>
            </div>
            <div className="Cart">
                <button onClick={() => nav(`/cart`, { state: { categories: categories } })} className="CartCont" title="Cart">

                    <span>Cart {cart.length}</span>
                    <img src="https://f.nooncdn.com/s/app/com/noon/icons/cart.svg" alt="cart" />
                </button>

            </div>

        </div>
    )
}

export default Navbar;