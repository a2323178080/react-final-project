import './assets/App.css';
import {Routes, Route} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
import Login from "./views/login/login";
import Admin from "./views/admin/admin";
import AdminProducts from "./views/admin/admin-products/admin-products";
import AdminOrders from "./views/admin/admin-orders/admin-orders";
import AdminCoupons from "./views/admin/admin-coupons/admin-coupons";
import FrontLayout from "./views/front-layout/front-layout";
import Home from "./views/front-layout/home/home";
import Products from "./views/front-layout/products/products";
import ProductDetail from "./views/front-layout/product-detail/product-detail";

function App() {
    useEffect(() => {
        (async () => {
            try {
                const result = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products/all`)
            } catch (error) {
                console.log("錯誤")
            }
        })()
    }, [])

    return (<div className="App">
        <Routes>
            <Route path='/' element={ <FrontLayout/>}>
                <Route path='' element={<Home/>}></Route>
                <Route path='products' element={<Products/>}></Route>
                <Route path='product/:id' element={<ProductDetail />}></Route>
            </Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/admin" element={<Admin/>}>
                <Route path="adminProducts" element={<AdminProducts/>}></Route>
                <Route path="adminOrders" element={<AdminOrders/>}></Route>
                <Route path="adminCoupons" element={<AdminCoupons/>}></Route>
            </Route>
        </Routes>

    </div>);
}

export default App;
