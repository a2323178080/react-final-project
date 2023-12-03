import { NavLink } from "react-router-dom";
import { ShoppingCartOutlined,UserOutlined  } from "@ant-design/icons";
export default function Navbar({cartData,cartIcon}) {
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
            飲品首頁
          </NavLink>
          <div className="d-flex order-md-last gap-3">
            <NavLink to="/login" className="nav-link">
              <UserOutlined style={{ fontSize: "25px" }} />
            </NavLink>
            {cartIcon&& <NavLink to="/cart" className="nav-link position-relative">
              <ShoppingCartOutlined style={{ fontSize: "25px" }} />
              <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                {cartData?.carts?.length}
              </span>
            </NavLink>}
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
