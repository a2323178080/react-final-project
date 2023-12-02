import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";
import "./checkout.scss";
import axios from "axios";
export default function Checkout() {
  const { cartData } = useOutletContext();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const data = {
      data: {
        user: values,
      },
    };
    try {
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/order`,
        data,
      );
      navigate(`/success/${res.data.orderId}`)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="checkout bg-light pt-5 pb-7">
      <div className="container">
        <div className="row justify-content-center flex-md-row flex-column-reverse">
          <div className="col-md-6">
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onSubmit}
              autoComplete="off"
              size="large"
            >
              <Form.Item
                label="姓名"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "請輸入姓名!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="電話"
                name="tel"
                rules={[
                  {
                    required: true,
                    message: "請輸入電話!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="e-mail"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "請輸入e-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="地址"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "請輸入地址!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  送出表單
                </Button>
              </Form.Item>
            </Form>
            <Link className="text-dark mt-md-5 mt-5" to="/cart">
              <i className="bi bi-chevron-left me-2"></i> 繼續點餐
            </Link>
          </div>

          <div className="col-md-4">
            <div className="border p-4 mb-4">
              <h4 className="mb-4">選購餐點</h4>
              {cartData?.carts?.map((item) => {
                return (
                  <div className="d-flex" key="item.id">
                    <img
                      src={item.product.imageUrl}
                      alt=""
                      className="me-2"
                      style={{
                        width: "48px",
                        height: "48px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="w-100">
                      <div className="d-flex justify-content-between fw-bold">
                        <p className="mb-0">{item.product.title}</p>
                        <p className="mb-0">x{item.qty}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="text-muted mb-0">
                          <small>NT$ {item.product.price}</small>
                        </p>
                        <p className="mb-0">NT$ {item.final_total}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="d-flex justify-content-between mt-4">
                <p className="mb-0 h4 fw-bold">Total</p>
                <p className="mb-0 h4 fw-bold">NT$ {cartData.final_total}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
