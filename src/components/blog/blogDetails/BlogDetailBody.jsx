import React, { Fragment } from 'react';

const BlogDetailBody = ({ singleBlog, handlePrevPost, handleNextPost }) => {
  return (
    <Fragment>
      <div className='BlogDetailDiv DBlock'>
        <div className='row '>
          <div className='col-md-8'>
            <div className='Title DBlock h-auto'>
              <h3>{singleBlog[0].title}</h3>
              <h5>{singleBlog[0].subTitle}</h5>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='BlogDetailsImgDiv DBlock'>
              <div className='ImgDiv DBlock'>
                <img src={singleBlog[0].image} alt='' />
              </div>
              <h5>{singleBlog[0].name}</h5>
            </div>
          </div>
          <div className='col-12'>
            <div className='BlogDetailsTextDiv DBlock'>
              <h6>By: {singleBlog[0].publishedBy}</h6>
              <small>{singleBlog[0].date}</small>
              {singleBlog[0].description.map((item, i) => (
                <p key={i}>{item.text}</p>
              ))}
            </div>
          </div>
        </div>
        <ul className='PaginationUl DFlex'>
          <li onClick={() => handlePrevPost(singleBlog[0].id - 1)}>
            <span>
              <i className='fas fa-angle-left icon'></i>
            </span>
            <p className='text'>Previous Blog Post</p>
          </li>
          <li onClick={() => handleNextPost(singleBlog[0].id + 1)}>
            <p className='text'>Next Blog Post</p>
            <span>
              <i className='fas fa-angle-right icon'></i>
            </span>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default BlogDetailBody;
