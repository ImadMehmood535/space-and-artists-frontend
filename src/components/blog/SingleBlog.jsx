import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ShowMoreText from 'react-show-more-text';

const SingleBlog = ({ blogs }) => {
  return (
    <Fragment>
      {blogs &&
        blogs.map((list, i) => (
          <div className='col-lg-4 col-md-6' key={i}>
            <Link to={`/blog-detail/${list.id}`} className='DBlock h-auto'>
              <div className='BlogsDiv DBlock'>
                <h5 style={{height:47}}>
                  <ShowMoreText  lines={2} more='' less='' className='content-css' anchorClass='my-anchor-css-class' expanded={false}>
                    {list.title}
                  </ShowMoreText>
                </h5>
                <div className='BlogImg DBlock'>
                  <img src={list.image} alt='' />
                </div>
                <div className='BlogFooter DFlex'>
                  <div className='BlogText'>
                    <small>{list.date}</small>
                    <p>
                      <ShowMoreText lines={1} more='' less='' className='content-css' anchorClass='my-anchor-css-class' expanded={false} width={180}>
                        {list.description[0].text}
                      </ShowMoreText>
                    </p>
                  </div>
                  <p>Read More</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
    </Fragment>
  );
};

export default SingleBlog;
