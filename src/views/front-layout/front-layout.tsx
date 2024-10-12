import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar";
import {
  FacebookOutlined,
  InstagramOutlined,
  WechatOutlined,
} from "@ant-design/icons";
export default function FrontLayout() {
  const [cartData, setCartData] = useState({});

  const getCart = async () => {
    try {
      const res = await axios.get(
          // 取得購物車
          `/cart`
      );
      setCartData(res.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCart();
  }, [])
  return (
    <div>
      <Navbar cartData={cartData} cartIcon/>
      <Outlet context={{ getCart ,cartData}}></Outlet>
      <div className="bg-dark">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between text-white py-4">
            <p className="mb-0">© 2023 LOGO All Rights Reserved.</p>
            <ul className="d-flex list-unstyled mb-0 h4">
              <li>
                <a href="#" className="text-white mx-3">
                  <FacebookOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
                </a>
              </li>
              <li>
                <a href="#" className="text-white mx-3">
                  <InstagramOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
                </a>
              </li>
              <li>
                <a href="#" className="text-white ms-3">
                  <WechatOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
