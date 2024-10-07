import { useEffect, useState } from "react";
import axios from "axios";
import { useParams,useOutletContext } from "react-router-dom";
import banner from "../../../assets/picture/product-detail/banner.jpg";
import {message} from 'antd';
export default function ProductDetail() {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [cartQuantity, setCartQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { getCart } = useOutletContext();
  const getProduct = async (id) => {
    const productRes = await axios.get(
      //  取得單一筆產品
        `/product/${id}`,
    );
    setProduct(productRes.data.product);
  };
  const addToCart = async () => {
    const data = {
      data: {
        product_id: product.id,
        qty: cartQuantity,
      },
    };
    setIsLoading(true);
    try {
      const res = await axios.post(
        // 新增購物車
       `/cart`,
        data,
      );
      message.success("加入成功")
      getCart();
      setIsLoading(false);
    } catch (error) {
      message.error("加入失敗")
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProduct(id);
  }, [id]);
  return (
    <div className="container">
      <div
        style={{
          minHeight: "250px",
          backgroundImage: `url(${banner})`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      ></div>
      <div className="row  mt-4 mb-7">
        <div className="col-md-7">
          <h2 className="mb-0 fw-bold">{product.title}</h2>
          <p className="fw-bold">NT$ {product.price}</p>
          <p>{product.content}</p>
          <div className="my-4 rounded-2">
            <img
              src={product.imageUrl}
              alt=""
              className="img-fluid mt-4"
              width={600}
            />
          </div>
        </div>
        <div className="col-md-4 ">
          <div className="input-group mb-3 border mt-3">
            <div className="input-group-prepend">
              <button
                className="btn btn-outline-dark rounded-0 border-0 py-3"
                type="button"
                id="button-addon1"
                onClick={() =>
                  setCartQuantity((pre) => (pre === 1 ? pre : pre - 1))
                }
              >
                <i className="bi bi-dash"></i>
              </button>
            </div>
            <input
              type="number"
              className="form-control border-0 text-center my-auto shadow-none"
              placeholder=""
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
              readOnly
              value={cartQuantity}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-dark rounded-0 border-0 py-3"
                type="button"
                id="button-addon2"
                onClick={() => setCartQuantity((pre) => pre + 1)}
              >
                <i className="bi bi-plus"></i>
              </button>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-dark w-100 rounded-0 py-3"
            onClick={() => addToCart()}
            disabled={isLoading}
          >
            加入購物車
          </button>
          <h4 className="text-strong fw-bold fs-5 mt-5">產品介紹</h4>
          <ul className="lh-lg">
            <li>餘韻悠長</li>
            <li>豐富層次</li>
            <li>獨特口感</li>
            <li>用心創造每一杯具有靈魂的飲品</li>
            <li>期許感動每一個不平凡的味蕾</li>
          </ul>
          <hr className="mt-4" />
          <h4 className="text-strong fw-bold fs-5 mt-4">購物須知</h4>
          <p className="lh-lg">商品可以於指定送達時間與地點</p>
          <hr className="mt-4" />
          <h4 className="text-strong fw-bold fs-5 mt-4">退換貨須知</h4>
          <p className="lh-lg">倘若產品在運送過程中受損或漏液，請盡速聯繫我們，將予以退款或是幫您重新寄出</p>
        </div>
      </div>
    </div>
  );
}
