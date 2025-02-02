import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
// import { useForm } from "react-hook-form";


// import ReactLoading from "react-loading";
import CheckoutForm from "./components/CheckoutForm";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import ProductModal from "./components/ProductModal";
import LoadingOverlay from "./components/LoadingOverlay";



const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function App() {
  const [products, setProducts] = useState([]);
  const [tempProduct, setTempProduct] = useState([]);
 

  //取得產品
  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsScreenLoading(true);
        const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products`);
        setProducts(res.data.products);
      } catch (error) {
        alert("取得產品失敗");
      } finally {
        setIsScreenLoading(false);
      }
    };
    getProducts();
    getCart();
  }, []);

  const productModalRef = useRef(null);
  useEffect(() => {
    new Modal(productModalRef.current, { backdrop: false });
  }, []);


  //加入購物車
  const addCartItem = async (id, qty) => {  
    setIsLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/v2/api/${API_PATH}/cart`, {
        data: {
          product_id: id,
          qty: Number(qty),
        },
      });

      getCart();
    } catch (error) {
      alert("加入購物車失敗");
    } finally {
      setIsLoading(false);
    }
  };

  const [cartData, setCartData] = useState({});
  //呼叫購物車
  const getCart = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
      setCartData(res.data.data);
    } catch (error) {
      alert("購物車載入失敗");
    }
  };

  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="container">
      <div className="mt-4">
      
        <ProductList products={products} setTempProduct={setTempProduct} productModalRef={productModalRef } addCartItem={addCartItem} isLoading={isLoading}/>

        <ProductModal productModalRef={productModalRef} tempProduct={tempProduct} isLoading={isLoading} addCartItem={addCartItem}/>

        {
          cartData.carts?.length > 0 && (<Cart cartData={cartData} setIsScreenLoading={setIsScreenLoading} getCart={getCart}/>)
        }
      </div>

      <div className="my-5 row justify-content-center">
        <CheckoutForm  setIsScreenLoading={setIsScreenLoading} getCart={getCart}/>
      </div>

      {isScreenLoading && (
        <LoadingOverlay />
      )}
    </div>
  );
}

export default App;
