// import "./CSS/Modal.css";
// import ProductCard from "./ProductCard";
import ProductCardWithoutIcon from "../ProductCardWithoutIcon";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clear } from "./Slices/CartSlice";
import Navbar from "../Navbar.js"
import "../CSS/Home.css"
import { FaCartShopping } from "react-icons/fa6";


const MainCart = ({ setShow,setCart }) => {
const dispatch = useDispatch();
const Carts = useSelector(state=>state.cart);

const totlaPrice = Carts.reduce((acc,product)=> {acc+=product.price * product.quantity;return acc},0)
  return (
    <>
    <Navbar/>
    <div className="ContCart">
    <h1 className="headContact2">My Cart</h1> <div style={{fontWeight:"bold",fontSize:"18px",color:"#404553"}}>Total Price : {totlaPrice} $</div>
    {Carts.length>0 ?(    <button className ="btnClear"onClick={()=>dispatch(clear())}> Clear <FaCartShopping /> Cart</button>
):(<div>Cart Is Empty</div>)}
    
        <div className="AllSkincareProducts">
          {Carts.map((cart,index)=>(
             <ProductCardWithoutIcon  product={cart} key={index}   />

          ))}
        </div>
    </div>
    </>
    
  )
}

export default MainCart;