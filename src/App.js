import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from "./components/Home.js";

import ProductDetails from './components/ProductDetails.js';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar.js';
import ProductsOfSpecificCategory from './components/ProductsOfSpecificCategory.js';
import Products from './components/Components/Products.js';
import MainCart from './components/Components/MainCart.js';
function App() {



  return (
    <div >

      <Routes>
      <Route path='/products' element={<Products />} />

        <Route path='/cart' element={<MainCart />} />
        <Route path='/' element={<Home />} />
        <Route path='/product/:productDetails' element={<ProductDetails />} />
        <Route path='/category/:categoryName' element={<ProductsOfSpecificCategory />} />
      </Routes>
      
    



{/* <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:productDetails' element={<ProductDetails />} />
        <Route path='/category/:categoryName' element={<ProductsOfSpecificCategory />} />
        <Route path='/category/products' element={<AllProducts />} />     
      </Routes> */}
    </div>
  );
}

export default App;
