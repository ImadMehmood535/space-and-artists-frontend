import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { blog } from "./blogApi";
import SingleBlog from "./SingleBlog";

class Blog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blogs: blog,
    };
  }

  componentDidMount() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  render() {
    return (
      <Fragment>
        <div className="BlogsSec DBlock">
          <div className="container">
            <div className="BlogsOuterDiv DBlock">
              <h2>Get Inspired</h2>
              <div className="BlogSearch DFlex">
                <form action="" className="form DFlex">
                  <label htmlFor="Search" className="d-none d-md-block">
                    Search
                  </label>
                  <input
                    type="text"
                    name="Search"
                    id="Search"
                    placeholder="Search here..."
                    required=""
                  />
                  <button type="submit" className="SearchBtn">
                    <i className="fas fa-search icon"></i>
                  </button>
                </form>
                {/* <ul className='PaginationUl DFlex'>
                  <li>
                    <Link to='!#'>
                      <i className='fas fa-angle-left icon'></i>
                    </Link>
                  </li>
                  <li>
                    <Link to='!#'>
                      <i className='fas fa-angle-right icon'></i>
                    </Link>
                  </li>
                </ul> */}
              </div>
              <div className="BlogsBody DBlock">
                <div className="row">
                  <SingleBlog blogs={[...this.state.blogs].reverse()} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Blog;
