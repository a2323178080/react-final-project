import { useNavigate } from "react-router-dom";
import img0 from "../../../assets/picture/home/img0.jpg";
import img1 from "../../../assets/picture/home/img1.jpg";
import img2 from "../../../assets/picture/home/img2.jpg";
import img3 from "../../../assets/picture/home/img3.jpg";
import img4 from "../../../assets/picture/home/img4.jpg";
import img5 from "../../../assets/picture/home/img5.jpg";
import img6 from "../../../assets/picture/home/img6.jpg";
import img7 from "../../../assets/picture/home/img7.jpg";
import img8 from "../../../assets/picture/home/img8.jpg";

export default function Home() {
  const navigate = useNavigate();
  const exhibition = [
    { picture: img1, title: "清新怡人", content: "讓你感受到清涼的味蕾之旅" },
    { picture: img2, title: "醇厚濃郁", content: "深深陶醉於濃郁的口感" },
    { picture: img3, title: "絕妙搭配", content: "口感層次分明的美妙滋味" },
    {
      picture: img4,
      title: "輕盈清爽",
      content: "一口喝下去，彷彿身處清新的天地",
    },
  ];
  const secondExhibition = [
    {
      picture: img6,
      title: "時光隧道的奇妙體驗",
      content:
        "NOOM，宛如一場從正午一直延伸到月光下的旅程，每一口都是一段穿越時光隧道的奇妙體驗"
    },
    {
      picture: img7,
      title: "一口，一種情感的交換",
      content:
        "舉起NOOM猶如握住心靈之鑰，不僅是飲料，更是與同事歡笑、與朋友分享心情的寶貴時刻",
    },
    {
      picture: img8,
      title: "工作的好夥伴",
      content:
        "讓這杯NOOM成為情緒的治癒之旅，從正午的忙碌到月光的寧靜，每口都是從疲憊中昇華的美好契機",
    },
  ];
  return (
    <div>
      <div className="container mt-3">
        <div className="row flex-md-row-reverse flex-column">
          <div className="col-md-6">
            <img src={img0} alt="" className="rounded-2 card-img-top" />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center mt-md-0 mt-3">
            <h2 className="fw-bold">理念</h2>
            <h5 className="font-weight-normal text-muted mt-2">
              讓美好的飲品成為你下午的靈感之伴，成為一場情緒的治癒之旅。從正午的忙碌到月光的寧靜，讓每一口NOOM都是一次從疲憊中升華的美好契機
            </h5>
            <div className="mb-0 mt-4">
              <div>
                <button
                  className="btn btn-dark rounded-0"
                  type="button"
                  id="search"
                  onClick={() => {
                    navigate("/products");
                  }}
                >
                  了解更多
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          {exhibition.map((item, index) => {
            return (
              <div className="col-md-6 mt-md-4" key={index}>
                <div className="card border-0 mb-4 position-relative ">
                  <img
                    src={item.picture}
                    className="card-img-top rounded-2"
                    alt="..."
                  />
                  <div className="card-body p-0">
                    <h4 className="mb-0 mt-4">{item.title}</h4>
                    <div className="d-flex justify-content-between mt-3">
                      <p className="card-text text-muted mb-0 w-75">
                        {item.content}
                      </p>
                      <button
                        className="btn btn-outline-dark rounded-0 text-nowrap"
                        onClick={() => {
                          navigate("/products");
                        }}
                      >
                        選購去
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
                      src={img5}
                      alt=""
                      className="rounded-circle me-5"
                      style={{
                        width: "160px",
                        height: "160px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="d-flex flex-column justify-content-center">
                      <p className="h5">
                        在NOOM的陪伴下，讓你的下午充滿色彩，讓工作的煩悶在飲料的香氣中隨風而逝。讓我們一起NOOM，品味生活中的每一個精彩瞬間
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
          {secondExhibition.map((item, index) => {
            return (
              <div className="col-md-4" key={index}>
                <img
                  src={item.picture}
                  alt=""
                  style={{
                    width: "160px",
                    height: "160px",
                    objectFit: "cover",
                  }}
                />
                <h4 className="mt-4">{item.title}</h4>
                <p className="text-muted">{item.content}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-light py-7">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-4 text-center">
              <h3>NOOM</h3>
              <p className="text-muted">
                定期推陳出新，讓顧客時刻能夠享受到新鮮、驚喜的口味，每一次光臨都是一場新的品味冒險
              </p>
              <button
                className="btn btn-dark mt-4 rounded-0"
                onClick={() => {
                  navigate("/products");
                }}
              >
                了解更多
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
