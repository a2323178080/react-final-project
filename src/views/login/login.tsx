import "./login.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import Navbar from "../../components/navbar";

interface LoginState {
  message?: string;
}

interface FormData {
  username: string;
  password: string;
}

export default function Login() {
  const [loginState, setLoginState] = useState<LoginState>({});
  const navigate = useNavigate();

  const [data, setData] = useState<FormData>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await axios.post(
          // 登入
          "/signin"
          , data);

      const { token, expired } = res?.data;
      // axios.defaults.headers.common["Authorization"] = token;
      document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
      if (res?.data?.success) {
        navigate("/admin/adminProducts");
      }
    } catch (error: any) {
      setLoginState(error.response?.data);
      message.error("登入失敗");
    }
  };

  return (
    <>
      <Navbar cartIcon={false}/>
      <div className="login container w-100 h-100 mt-5">
        <div className="row justify-content-center h-100">
          <div className="col-md-6">
            <h2>後台管理系統</h2>
            <div
              className={`alert alert-danger ${
                loginState?.message === "登入失敗" ? "d-block" : "d-none"
              }`}
              role="alert"
            >
              {loginState?.message}
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="form-label w-100">
                Email
                <input
                  id="email"
                  className="form-control"
                  name="username"
                  type="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="form-label w-100">
                密碼
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  placeholder="password"
                  onChange={handleChange}
                />
              </label>
            </div>
            <button type="button" className="btn btn-primary" onClick={submit}>
              登入
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
