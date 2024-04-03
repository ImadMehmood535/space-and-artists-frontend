import React, { Component, Fragment } from "react";
import FeaturedArtist from "./FeaturedArtist";
import HomeBlogs from "./HomeBlogs";
import HowWork from "./HowWork";
import LookingFor from "./LookingFor";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      home: false,
    };
  }

  componentDidMount() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const id = window.location.href.split("/").pop();
    if (id === "") {
      this.setState({
        ...this.state,
        home: true,
      });
    }
  }

  render() {
    return (
      <Fragment>
        <div className="HomeSec DBlock">
          <div className="HomeDiv DBlock">
            <div
              id="carouselExampleCaptions"
              className="carousel HomeCarousel slide"
              data-ride="carousel"
            >
              <ol className="carousel-indicators">
                <li
                  data-target="#carouselExampleCaptions"
                  data-slide-to="0"
                  className="active"
                ></li>
                <li
                  data-target="#carouselExampleCaptions"
                  data-slide-to="1"
                ></li>
                <li
                  data-target="#carouselExampleCaptions"
                  data-slide-to="2"
                ></li>
                {/* <li
                  data-target="#carouselExampleCaptions"
                  data-slide-to="3"
                ></li> */}
              </ol>
              <div className="carousel-inner">
                {/* <div className="carousel-item active">
                  <img
                    src="/sna_new_banner.jpg"
                    className="d-block w-100 not_mobile_banner"
                    alt="HomeImg"
                  />
                  <img
                    src="/375x188.jpg"
                    className="d-block w-100 mobile_banner"
                    alt="HomeImg"
                  />
                </div> */}
                <div className="carousel-item active">
                  <img
                    src="/assets/images/HomeBanner1.jpg"
                    className="d-block w-100"
                    alt="HomeImg"
                  />
                  <div className="carousel-caption d-md-flex">
                    <h5>
                      The world’s first <br />
                      marketplace
                      <br />
                      for artists
                    </h5>
                    <Link to="/leads">EXPLORE</Link>
                  </div>
                </div>
                <div className="carousel-item">
                  <img
                    src="/assets/images/HomeBanner2.png"
                    className="d-block w-100"
                    alt="HomeImg"
                  />
                  <div className="carousel-caption d-md-flex">
                    <h5>
                      Join the global
                      <br /> network for <br />
                      all businesses
                    </h5>
                    <Link to="/leads">EXPLORE</Link>
                  </div>
                </div>
                <div className="carousel-item">
                  <img
                    src="/assets/images/HomeBanner3.png"
                    className="d-block w-100"
                    alt="HomeImg"
                  />
                  <div className="carousel-caption d-md-flex">
                    <h5>
                      Creativity <br />
                      knows no
                      <br />
                      bounds
                    </h5>{" "}
                    <Link to="/leads">EXPLORE</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FeaturedArtist />
        <HowWork />
        <LookingFor />
        <HomeBlogs />
      </Fragment>
    );
  }
}

export default Home;
