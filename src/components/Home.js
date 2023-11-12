import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./CSS/Home.css"
import { useLocation, useNavigate } from "react-router-dom";
import photo from "../images/10.jpeg";
import ProductCard from "./ProductCard";
import Categories from "./Components/Categories";
import { fetchproducts, searchProducts } from "./Components/Slices/ProductSlice";
// import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { MyContext } from "./Redux";
const Home = () => {

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [furnitureProducts, setFurnitureProducts] = useState([]);
    const [womensDressesProducts, setwomensDressesProducts] = useState([]);
    const [laptops, setLaptops] = useState([]);   
    const [images, setImages] = useState([]);
    const [mensShirts, setMensShirts] = useState([]);

    // const [productsOfCategory, setProductsofCategory] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const location = useLocation()
    const dispatch = useDispatch();
    const [skincareProducts, setSkincareProducts] = useState([]);
    const [cart,setCart] = useState([]);
//   const productData = useContext(MyContext);

    const nav = useNavigate();
    
    const GetAllProductsOfMensShirts = () => {

        fetch(`https://dummyjson.com/products/category/mens-shirts`)
            .then(res => res.json())
            .then((data) => setMensShirts(data.products));
    }
    const GetAllProductsOfSkincare = () => {

        fetch(`https://dummyjson.com/products/category/skincare`)
            .then(res => res.json())
            .then((data) => setSkincareProducts(data.products));
    }
    const GetAllProductsOfFurniture = () => {

        fetch(`https://dummyjson.com/products/category/furniture`)
            .then(res => res.json())
            .then((data) => setFurnitureProducts(data.products));
    }

    const GetAllProductsOfWomensDresses = () => {

        fetch(`https://dummyjson.com/products/category/womens-dresses`)
            .then(res => res.json())
            .then((data) => setwomensDressesProducts(data.products));
    }
    const GetAllProductsOfLaptops = () => {

        fetch(`https://dummyjson.com/products/category/laptops`)
            .then(res => res.json())
            .then((data) => setLaptops(data.products));
    }

    const GetAllCategories = async () => {
        try {
          const response = await fetch('https://dummyjson.com/products/categories');
          if (response.ok) {
            const data = await response.json();
            setCategories(data);
          } else {
            // Handle the error here, e.g., show an error message.
            console.error('Failed to fetch categories');
          }
        } catch (error) {
          // Handle network or other errors here.
          console.error('Error:', error);
        }
      }
      
    const GetAllProducts = () => {

        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data =>
                 {
                    setProducts(data)
                    // // productData.setId(data.id);
                    // productData.setTitle(data.title);
                    // productData.setPrice(data.price);
                    // productData.setRating(data.rating);
                    // productData.setCategory(data.category);
                 }
                );
    }
// console.log(productData)
    const getimages = () => {
        fetch('https://dummyjson.com/products')
            .then(response => response.json())
            .then(data => {
                // Collect all images from all products
                const allImages = data?.products?.reduce((acc, product) => {
                    return [...acc, ...product?.images];
                }, []);

                setImages(allImages);
            });
    }

    useEffect(() => {
        GetAllProductsOfMensShirts();
        GetAllProductsOfLaptops();
        GetAllCategories();
        GetAllProductsOfWomensDresses();
        GetAllProductsOfSkincare();
        GetAllProductsOfFurniture();
        GetAllProducts();
        getimages();
        // GetAllProductsOfCategory()

    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + Math.floor(Math.random() * images.length)) % images.length);
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [images]);

    const extractNumberFromUrl = (url) => {
        const parts = url.split('/');
        return parts[5];
    };

    //  const getNumberFromUrl = (url) => {
    //     const startIndex = url.indexOf('products/') + 'products/'.length;
    //     const endIndex = url.indexOf('/', startIndex);
    //     return url.substring(startIndex, endIndex);
    // };
    const goToProduct = (id) => {
        nav(`/product/${id}`, { state: { productId: id,categories:categories } });
    }

    const addToCart = (item)=>{
        cart.push(item);
        console.log(cart);
    }
   
    // console.log(products)
    // console.log(categories)
    // console.log(productsOfCategory)


useEffect(() => {
        dispatch(fetchproducts());
        // dispatch(searchProducts());

    });
    return (
        <>
        <Navbar categories={categories} setCart={setCart} addToCart={addToCart} carts={cart} />

           <Categories categories={categories}/>
            <div className="ContainerAllDataInHomeAfterSliders">
                <h2>Some Of Our Products</h2>
                <div className="ContAllImageSlider">
                    <div className="image-slider">
                        <img alt="Wait For response" onClick={() => {
                            if (images[currentIndex]) {
                                const image = images[currentIndex];
                                const productNumber = extractNumberFromUrl(image);
                                goToProduct(productNumber);
                            } else {
                                // Reload the page if image doesn't exist
                            }
                        }}
                            src={images[currentIndex] ? images[currentIndex] : ""}
                             />
                    </div>
                    <div className="image-slider">
                        <img
                            onClick={() => {
                                if (images[currentIndex + 5]) {
                                    const image = images[currentIndex + 5];
                                    const productNumber = extractNumberFromUrl(image);
                                    goToProduct(productNumber);
                                } else {
                                     // Reload the page if image doesn't exist
                                }
                            }}
                            src={images[currentIndex + 5] ? images[currentIndex + 5] : ""} alt={`Wait For response`} />
                    </div><div className="image-slider">
                        <img
                            onClick={() => {
                                if (images[currentIndex + 30]) {
                                    const image = images[currentIndex + 30];
                                    const productNumber = extractNumberFromUrl(image);
                                    goToProduct(productNumber);
                                } else {
                                     // Reload the page if image doesn't exist
                                }
                            }}
                            src={images[currentIndex + 30] ? images[currentIndex + 30] : ""} alt={`Wait For response`} />
                    </div>
                    <div className="image-slider">
                        <img
                            onClick={() => {
                                if (images[currentIndex + 50]) {
                                    const image = images[currentIndex + 50];
                                    const productNumber = extractNumberFromUrl(image);
                                    goToProduct(productNumber);
                                } else {
                                     // Reload the page if image doesn't exist
                                }
                            }}
                            src={images[currentIndex + 50] ? images[currentIndex + 50] : ""} alt={`Wait For response`} />
                    </div>
                </div>
                <div className="AllSkinWithHeader">
                    <h2>Skincare Products</h2>

                    <div className="AllSkincareProducts">
                        {skincareProducts?.map((product, index) => (
                            <ProductCard product={product} key={index} addToCart={addToCart} />
                        ))}
                    </div>

                </div>
                <div className="AllSkinWithHeader">
                    <h2>Furniture Products</h2>

                    <div className="AllSkincareProducts">
                        {furnitureProducts?.map((product, index) => (
                            <ProductCard product={product} key={index} addToCart={addToCart} />
                            ))}
                    </div>

                </div>
                <div className="AllSkinWithHeader">
                    <h2> Women Dresses</h2>

                    <div className="AllSkincareProducts">
                        { womensDressesProducts?.map((product, index) => (
                            <ProductCard product={product} key={index} addToCart={addToCart} />
                            ))}
                    </div>

                </div>
                <div className="AllSkinWithHeader">
                    <h2> Laptops</h2>

                    <div className="AllSkincareProducts">
                        { laptops?.map((product, index) => (
                            <ProductCard product={product} key={index} addToCart={addToCart} />
                            ))}
                    </div>

                </div>
                <div className="AllSkinWithHeader">
                    <h2> Men Shirts</h2>

                    <div className="AllSkincareProducts">
                        { mensShirts?.map((product, index) => (
                            <ProductCard product={product} key={index} addToCart={addToCart} />
                            ))}
                    </div>

                </div>

               


            </div>





        </>
    )
}

export default Home;