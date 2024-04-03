import React, { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Sidebar = () => {
  const { dispatch } = useContext(UserContext);
  const [active, setActive] = useState('users');

  return (
    <Fragment>
      <div className='col-lg-2 col-sm-1  col-1 navBg px-0'>
        <nav className='nav  navbar-toggleable-sm'>
          <div className='navbar  flex-column mt-md-0  pt-md-0  p-0 w-100' id='navbarWEX'>
            <h1>Dashboard</h1>
            <Link to='/admin/users' className={`nav-link ${active == 'users' ? 'active' : ''}`} onClick={() => setActive('users')}>
              <i className='fas fa-users'> </i>
              <span>Users </span>
            </Link>
            <Link
              to='/admin/users-gallery'
              className={`nav-link ${active == 'usersGallery' ? 'active' : ''}`}
              onClick={() => setActive('usersGallery')}
            >
              <i class='fas fa-photo-video'></i>
              <span>Users Gallery</span>
            </Link>
            <Link to='/admin/category' className={`nav-link ${active == 'category' ? 'active' : ''}`} onClick={() => setActive('category')}>
              <i class='fas fa-clipboard-list'></i>
              <span>Category </span>
            </Link>
            <Link to='/admin/country' className={`nav-link ${active == 'country' ? 'active' : ''}`} onClick={() => setActive('country')}>
              <i class='fas fa-globe-americas'></i>
              <span>Country </span>
            </Link>
            <Link to='/admin/city' className={`nav-link ${active == 'city' ? 'active' : ''}`} onClick={() => setActive('city')}>
              <i class='fas fa-city'></i>
              <span>City </span>
            </Link>
            <Link to='/admin/reviews' className={`nav-link ${active == 'review' ? 'active' : ''}`} onClick={() => setActive('review')}>
              <i class='fas fa-poll-h'></i>
              <span>Reviews </span>
            </Link>
            <Link to='/admin/subscriptions' className={`nav-link ${active == 'subscriptions' ? 'active' : ''}`} onClick={() => setActive('subscriptions')}>
              <i class='fas fa-poll-h'></i>
              <span>Subscriptions</span>
            </Link>
            <Link to='/admin/blogs' className={`nav-link ${active == 'blogs' ? 'active' : ''}`} onClick={() => setActive('blogs')}>
              <i class='fas fa-blog'></i>
              <span>Blogs </span>
            </Link>
            <Link to='/' className='nav-link' onClick={() => dispatch({ type: 'ADMIN_LOGOUT_SUCCESS' })}>
              <i class='fas fa-user-circle'></i>
              <span>Logout </span>
            </Link>
          </div>
        </nav>
      </div>
    </Fragment>
  );
};

export default Sidebar;
