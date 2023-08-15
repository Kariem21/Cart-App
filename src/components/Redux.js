import React, { createContext, useEffect, useState } from 'react';
export const MyContext = createContext();

export const MyProvider = ({ children }) => {
    const [id, setId] = useState('');
    const [token, setToken] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [images, setImages] = useState([]);
    const [price, setPrice] = useState(0);
    const [rating, setRating] = useState(0);
    const [stock, setStock] = useState(0);
    const [thumbnail, setThumbnail] = useState('');
    const [title, setTitle] = useState('');


    // Load data from sessionStorage on component mount
    useEffect(() => {
        const storedId = sessionStorage.getItem('id');
        const storedToken = sessionStorage.getItem('token');
        const storedBrand = sessionStorage.getItem('brand');
        const storedCategory = sessionStorage.getItem('category');
        const storedDiscountPercentage = sessionStorage.getItem('discountPercentage');
        const storedImages = sessionStorage.getItem('images');
        const storedPrice = sessionStorage.getItem('price');
        const storedRating = sessionStorage.getItem('rating');
        const storedStock = sessionStorage.getItem('stock');
        const storedThumbnail = sessionStorage.getItem('thumbnail');
        const storedTitle = sessionStorage.getItem('title');

        // const storedRoles = JSON.parse(sessionStorage.getItem('roles'));

        if (storedId) {
            setId(storedId);
        }

        if (storedToken) {
            setToken(storedToken);
        }

        if (storedBrand) {
            setBrand(storedBrand);
        }
        if (storedCategory) {
            setCategory(storedCategory);
        }
        if (storedDiscountPercentage) {
            setImages(storedDiscountPercentage);
        }


        if (storedImages) {
            setImages(storedImages);
        }

        if (storedPrice) {
            setPrice(storedPrice);
        }
        if (storedRating) {
            setRating(storedRating);
        }
        if (storedStock) {
            setStock(storedStock);
        }
        if (storedRating) {
            setRating(storedRating);
        }
        if (storedThumbnail) {
            setThumbnail(storedThumbnail);
        }
        if (storedTitle) {
            setTitle(storedTitle);
        }

        
    }, []);

    // Update sessionStorage when data changes
    useEffect(() => {
        sessionStorage.setItem('id', id);
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('brand', brand);
        sessionStorage.setItem('category', category);
        sessionStorage.setItem('description', description);
        sessionStorage.setItem('discountPercentage', discountPercentage);
        sessionStorage.setItem('images', images);
        sessionStorage.setItem('price', price);
        sessionStorage.setItem('rating', rating);
        sessionStorage.setItem('stock', stock);
        sessionStorage.setItem('thumbnail', thumbnail);
        sessionStorage.setItem('title', title);
    }, [id, token, brand, category, description, description, discountPercentage, images, price, rating, stock, thumbnail, title]);

    const contextValue = {
        id,
        setId,
        token,
        setToken,
        brand,
        setBrand,
        category,
        setCategory,
        description,
        setDescription,
        discountPercentage,
        setDiscountPercentage,
        images,
        setImages,
        price,
        setPrice,
        rating,
        setRating,
        stock,
        setStock,
        thumbnail,
        setThumbnail,
        title,
        setTitle



    };

    return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
};
