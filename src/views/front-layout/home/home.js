import {useNavigate} from "react-router-dom";
import img1 from "../../../assets/img1.jpg";
import img2 from "../../../assets/img2.jpg";
import img3 from "../../../assets/img3.jpg";
import img4 from "../../../assets/img4.jpg";
import img5 from "../../../assets/img5.jpg";
import img6 from "../../../assets/img6.jpg";
import img7 from "../../../assets/img7.jpg";
import img8 from "../../../assets/img8.jpg";


export default function Home() {
  const navigate=useNavigate()
  return (
    <div>
      <div className="container mt-3">
        <div className="row flex-md-row-reverse flex-column">
          <div className="col-md-6">
            <img src={img1} alt="" className="rounded-2 card-img-top" />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center mt-md-0 mt-3">
            <h2 className="fw-bold">Lorem ipsum dolor sit</h2>
            <h5 className="font-weight-normal text-muted mt-2">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor
            </h5>
            <div className="mb-0 mt-4">
              <div>
                <button
                  className="btn btn-dark rounded-0"
                  type="button"
                  id="search"
                  onClick={()=>{navigate('/products')}}
                >
                  了解更多
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6 mt-md-4">
            <div className="card border-0 mb-4 position-relative ">
              <img src={img2} className="card-img-top rounded-2" alt="..." />
              <div className="card-body p-0">
                <h4 className="mb-0 mt-4">Lorem ipsum</h4>
                <div className="d-flex justify-content-between mt-3">
                  <p className="card-text text-muted mb-0 w-75">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod.
                  </p>
                  <button className="btn btn-outline-dark rounded-0 text-nowrap" onClick={()=>{navigate('/products')}}>
                    選購去
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-md-4">
            <div className="card border-0 mb-4 position-relative">
              <img src={img3} alt="..." className="card-img-top" />
              <div className="card-body p-0">
                <h4 className="mb-0 mt-4">Lorem ipsum</h4>
                <div className="d-flex justify-content-between mt-3">
                  <p className="card-text text-muted mb-0 w-75">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod.
                  </p>
                  <button className="btn btn-outline-dark rounded-0 text-nowrap" onClick={()=>{navigate('/products')}}>
                    選購去
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-md-4">
            <div className="card border-0 mb-4 position-relative position-relative">
              <img src={img4} className="card-img-top rounded-0" alt="..." />
              <div className="card-body p-0">
                <h4 className="mb-0 mt-4">Lorem ipsum</h4>
                <div className="d-flex justify-content-between mt-3">
                  <p className="card-text text-muted mb-0 w-75">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod.
                  </p>
                  <button className="btn btn-outline-dark rounded-0 text-nowrap" onClick={()=>{navigate('/products')}}>
                    選購去
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-md-4">
            <div className="card border-0 mb-4 position-relative position-relative">
              <img src={img5} className="card-img-top rounded-2" alt="..." />
              <div className="card-body p-0">
                <h4 className="mb-0 mt-4">Lorem ipsum</h4>
                <div className="d-flex justify-content-between mt-3">
                  <p className="card-text text-muted mb-0 w-75">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod.
                  </p>
                  <button className="btn btn-outline-dark rounded-0 text-nowrap" onClick={()=>{navigate('/products')}}>
                    選購去
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-light mt-7">
        <div className="container">
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row justify-content-center py-7">
                  <div className="col-md-8 d-flex">
                    <img
                      src={img4}
                      alt=""
                      className="rounded-circle me-5"
                      style={{
                        width: "160px",
                        height: "160px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="d-flex flex-column">
                      <p className="h5">
                        “Lorem ipsum dolor sit amet, consetetur sadipscing
                        elitr, sed diam nonumy eirmod tempor invidunt ut labore
                        et dolore magna aliquyam erat.”
                      </p>
                      <p className="mt-auto text-muted">
                        Lorem ipsum dolor sit amet.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-7">
        <div className="row">
          <div className="col-md-4">
            <img
              src={img6}
              alt=""
              style={{ width: "160px", height: "160px", objectFit: "cover" }}
            />
            <h4 className="mt-4">Lorem ipsum</h4>
            <p className="text-muted">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna.
            </p>
          </div>
          <div className="col-md-4">
            <img
              src={img7}
              alt=""
              style={{ width: "160px", height: "160px", objectFit: "cover" }}
            />
            <h4 className="mt-4">Lorem ipsum</h4>
            <p className="text-muted">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna.
            </p>
          </div>
          <div className="col-md-4">
            <img
                src={img8}
              alt=""
              style={{ width: "160px", height: "160px", objectFit: "cover" }}
            />
            <h4 className="mt-4">Lorem ipsum</h4>
            <p className="text-muted">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-light py-7">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-4 text-center">
              <h3>Lorem ipsum</h3>
              <p className="text-muted">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod.
              </p>
              <button className="btn btn-dark mt-4 rounded-0" onClick={()=>{navigate('/products')}}>
                了解更多
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
