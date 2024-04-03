import React, { Component, Fragment } from 'react';
import BlogDetailBody from './BlogDetailBody';
import { blog } from './../blogApi';
import Loader from './../../../common/Loader';

class BlogDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loader: true,
      blogs: blog,
      singleBlog: {},
    };
  }

  handlePrevPost = (id) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.setState({
      ...this.state,
      loader: true,
    });
    if (id !== 0) {
      let blog = this.state.blogs.filter((item) => item.id == id);
      this.setState({
        ...this.state,
        singleBlog: blog,
        loader: false,
      });
    } else {
      this.setState({
        ...this.state,
        loader: false,
      });
    }
  };

  handleNextPost = (id) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.setState({
      ...this.state,
      loader: true,
    });
    if (id <= this.state.blogs.length) {
      let blog = this.state.blogs.filter((item) => item.id == id);
      this.setState({
        ...this.state,
        singleBlog: blog,
        loader: false,
      });
    } else {
      this.setState({
        ...this.state,
        loader: false,
      });
    }
  };

  componentDidMount() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    let id = this.props.match.params.id;
    let blog = this.state.blogs.filter((item) => item.id == id);
    this.setState({
      ...this.state,
      singleBlog: blog,
      loader: false,
    });
  }

  render() {
    return (
      <Fragment>
        {this.state.loader ? (
          <Loader loader={this.state.loader} />
        ) : (
          <Fragment>
            <div className='HomeSec DBlock'>
              <div
                className='BlogDetailsHomeSec DBlock'
                style={{ backgroundImage: `url("${this.state.singleBlog ? this.state.singleBlog[0].cover_image : ''}")` }}
              ></div>
            </div>
            <div className='BlogDetailSec DBlock'>
              <div className='container'>
                <BlogDetailBody handlePrevPost={this.handlePrevPost} handleNextPost={this.handleNextPost} singleBlog={this.state.singleBlog} />
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default BlogDetail;
