import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import { blog } from "./../blog/blogApi";
import ShowMoreText from "react-show-more-text";

class HomeBlogs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blogs: [...blog].reverse(),
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        1000: {
          items: 3,
        },
      },
    };
  }

  render() {
    return (
      <Fragment>
        <div className="HomeBlogSec DBlock">
          <div className="container">
            <div className="HomeBlogOuterDiv DBlock">
              <div className="TitleStyle Title DBlock h-auto">
                <h2>Blogs</h2>
              </div>
              <OwlCarousel
                className="owl-theme SlickCarousel DBlock"
                loop={false}
                responsive={this.state.responsive}
                margin={10}
                dots={false}
                nav
                navText={[
                  '<span class="slick-prev ArrowBtn"><i class="fas fa-angle-left icon"></i></span>',
                  '<span class="slick-next ArrowBtn"><i class="fas fa-angle-right icon"></i></span>',
                ]}
              >
                {this.state.blogs &&
                  this.state.blogs.map((list, i) => (
                    <div className="item" key={i}>
                      <Link
                        to={`/blog-detail/${list.id}`}
                        className="HomeBlogDiv DBlock"
                      >
                        <h5>
                          <ShowMoreText
                            lines={2}
                            width={250}
                            more=""
                            less=""
                            className="content-css"
                            anchorClass="my-anchor-css-class"
                            expanded={false}
                          >
                            {list.title}
                          </ShowMoreText>
                        </h5>
                        <div className="BlogImg DBlock">
                          <img src={list.image} alt="" />
                          <div className="Overlay"></div>
                        </div>
                        {/* <div className='BlogFooter DFlex'>
                          <div className='BlogText'>
                            <small>{list.date}</small>
                            <p className=''>
                              <ShowMoreText
                                lines={1}
                                more=''
                                less=''
                                className='content-css'
                                anchorClass='my-anchor-css-class'
                                expanded={false}
                                width={150}
                              >
                                {list.description[0].text}
                              </ShowMoreText>
                            </p>
                          </div>
                          <p>Read More</p>
                        </div> */}
                      </Link>
                    </div>
                  ))}
              </OwlCarousel>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default HomeBlogs;
