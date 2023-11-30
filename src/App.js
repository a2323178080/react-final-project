import './assets/App.css';
import {Routes, Route} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
import Home from "./views/home/index";
import Example from "./views/example/example";
import Login from "./views/login/login";
import Admin from "./views/admin/admin";
import AdminProducts from "./views/admin/admin-products/admin-products";
import AdminOrders from "./views/admin/admin-orders/admin-orders";
import AdminCoupons from "./views/admin/admin-coupons/admin-coupons";

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
            <Route path="/" element={<Home/>}></Route>
            <Route path="/example" element={<Example/>}></Route>
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
