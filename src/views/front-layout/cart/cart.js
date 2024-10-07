import axios from "axios";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { message } from "antd";

export default function Cart() {
  const { cartData, getCart } = useOutletContext();
  const [loadingItems, setLoadingItem] = useState([]);
  const navigate = useNavigate();
  const removeCartItem = async (id) => {
    try {
      const res = await axios.delete(
          // 刪除購物車
          `/cart/${id}`
      );
      message.success("刪除成功");
      getCart();
    } catch (error) {
      message.error("刪除失敗");
    }
  };
  const updateCartItem = async (item, quantity) => {
    const data = {
      data: {
        product_id: item.product_id,
        qty: quantity,
      },
    };
    setLoadingItem([...loadingItems, item.id]);
    try {
      const res = await axios.put(
          // 編輯購物車
         `/cart/${item.id}`,
        data,
      );
      message.success("編輯成功");
      setLoadingItem(
        loadingItems.filter((loadingObject) => loadingObject !== item.id),
      );
      getCart();
    } catch (error) {
      message.error("編輯失敗");
    }
  };
  const toNext=()=>{
    if(cartData.carts.length>0){
      navigate("/checkout")
    }
    else{
      navigate("/products")
    }
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div
          className="col-md-6 bg-white py-5"
          style={{ minHeight: "calc(100vh - 56px - 76px)" }}
        >
          <div className="d-flex justify-content-between">
            <h2 className="mt-2">您的餐點</h2>
          </div>
          {cartData?.carts?.map((item) => {
            return (
              <div className="d-flex mt-4 bg-light" key={item.id}>
                <img
                  src={item.product.imageUrl}
                  alt=""
                  style={{
                    width: "120px",
                    objectFit: "cover",
                  }}
                />
                <div className="w-100 p-3 position-relative">
                  <button
                    type="button"
                    className="position-absolute btn"
                    style={{ top: "10px", right: "10px" }}
                    onClick={() => {
                      removeCartItem(item.id);
                    }}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                  <p className="mb-0 fw-bold">{item.product.title}</p>
                  <p className="mb-1 text-muted" style={{ fontSize: "14px" }}>
                    {item.product.content}
                  </p>
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="input-group w-50 align-items-center">
                      <select
                        name=""
                        className="form-select"
                        id=""
                        value={item.qty}
                        disabled={loadingItems.includes(item.id)}
                        onChange={(e) => {
                          updateCartItem(item, e.target.value * 1);
                        }}
                      >
                        {[...new Array(20)].map((i, num) => {
                          return (
                            <option value={num + 1} key={num}>
                              {num + 1}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <p className="mb-0 ms-auto">NT${item.final_total}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="d-flex justify-content-between mt-4">
            <p className="mb-0 h4 fw-bold">總金額</p>
            <p className="mb-0 h4 fw-bold">NT${cartData.final_total}</p>
          </div>
          <button
            onClick={toNext}
            className="btn btn-dark w-100 mt-4 rounded-0 py-3"
          >
            確認餐點正確
          </button>
        </div>
      </div>
    </div>
  );
}
