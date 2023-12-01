import { NavLink } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
export default function Navbar() {
  return (
    <div className="bg-white sticky-top">
      <div className="container">
        <nav className="navbar px-0 navbar-expand-lg navbar-light bg-white">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <NavLink
            className="navbar-brand position-absolute fs-4 fw-bold"
            to="/"
            style={{
              left: "50%",
              transform: "translate(-50%, -50%)",
              top: "50%",
            }}
          >
            美食首頁
          </NavLink>
          <div className="d-flex order-md-last">
            <NavLink to="/cart" className="nav-link">
              <ShoppingCartOutlined style={{ fontSize: "25px" }} />
            </NavLink>
          </div>
          <div
            className="collapse navbar-collapse bg-white custom-header-md-open"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item active">
                <NavLink className="nav-link ps-0 fs-4 fw-bold" to="/products" >
                  產品列表
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
