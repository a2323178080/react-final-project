import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar";
import {
  FacebookOutlined,
  InstagramOutlined,
  WechatOutlined,
} from "@ant-design/icons";
export default function FrontLayout() {
  return (
    <div>
      <Navbar />
      <Outlet></Outlet>
      <div className="bg-dark">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between text-white py-4">
            <p className="mb-0">© 2023 LOGO All Rights Reserved.</p>
            <ul className="d-flex list-unstyled mb-0 h4">
              <li>
                <a href="#" className="text-white mx-3">
                  <FacebookOutlined />
                </a>
              </li>
              <li>
                <a href="#" className="text-white mx-3">
                  <InstagramOutlined />
                </a>
              </li>
              <li>
                <a href="#" className="text-white ms-3">
                  <WechatOutlined />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
