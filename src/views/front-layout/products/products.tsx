import { useEffect, useState } from "react";
import axios from "axios";
import {Pagination} from 'antd';
import { Link } from "react-router-dom";
import "./products.scss"

interface Product {
  id: number;
  title: string;
  content: string;
  price: number;
  imageUrl: string;
}

interface PaginationData {
  total_pages: number;
}
export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({ total_pages: 0 });
  const [current, setCurrent] = useState<number>(1);

  const getProducts = async (page: number = 1) => {
    const productRes = await axios.get(
       // 取得商品
      `/products?page=${page}&pageSize=5`
    );
    setProducts(productRes.data.products);
    setPagination(productRes.data.pagination);
  };

  useEffect(() => {
    getProducts(1);
  }, []);

  const switchPage = (page: number) => {
    getProducts(page)
    setCurrent(page);
  };
  return (
      <div className="products">
      <div className="container mt-md-5 mt-3 mb-7">
        <div className="row">
          {products.map((product) => {
            return (
              <div className="col-md-3" key={product?.id}>
                <div className="card border-0 mb-4 position-relative position-relative">
                  <img
                    src={product?.imageUrl}
                    className="card-img-top rounded-2"
                    alt="..."
                    height={300}
                    style={{objectFit:'cover'}}
                  />
                  <div className="card-body p-0">
                    <h4 className="mb-0 mt-2">
                      <Link to={`/product/${product?.id}`}>{product?.title}</Link>
                    </h4>
                      <p className="text-muted mb-0">{product?.content}</p>
                    <p className="text-muted mt-1">NT$ {product?.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-5">
          <Pagination current={current} onChange={switchPage} total={parseInt(String(pagination.total_pages), 10) * 10||0}/>
        </div>
      </div>
      </div>
  );
}
