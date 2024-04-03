import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { baseUrl, headers, notificationError, dynamicSort } from '../../common/constants';
import axios from 'axios';
class LookingFor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      subCategories: [],
    };
  }

  getAllCategories = async () => {
    try {
      const res = await axios.get('category/all', { headers: headers.simple });
      if (res.status === 200) {
        let data = res.data.sort(dynamicSort('category_name'));
        this.setState({
          ...this.state,
          subCategories: [],
          categories: data,
        });
      }
    } catch (error) {
      notificationError('Categories', 'Something went wrong. Please try again');
    }
  };

  getCategoryByParent = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axios.get(`category/all/${id}`, { headers: headers.simple });
      if (res.status === 200) {
        let data = res.data.sort(dynamicSort('category_name'));
        this.setState({
          ...this.state,
          categories: [],
          subCategories: data,
        });
      }
    } catch (error) {
      notificationError('Categories', 'Something went wrong. Please try again');
    }
  };

  componentDidMount() {
    this.getAllCategories();
  }

  render() {
    return (
      <Fragment>
        <div className='LookingSec DBlock'>
          <div className='container'>
            <div className='LookingDiv DBlock'>
              <div className='TitleStyle Title DBlock h-auto'>
                <h2>What are you looking for?</h2>
              </div>
              {this.state.subCategories.length > 0 ? (
                <button className='BackBtn' onClick={() => this.getAllCategories()}>
                  Back
                </button>
              ) : (
                ''
              )}
              <ul className='LookingUl DFlex justify-content-center'>
                {this.state.categories.length > 0 &&
                  this.state.categories.map((list, i) => (
                    <Fragment key={i}>
                      <li>
                        <Link to={`/leads/${list.id}`} onClick={(e) => this.getCategoryByParent(e, list.id)}>
                          <span>{list.category_name}</span>
                        </Link>
                      </li>
                    </Fragment>
                  ))}
                {this.state.subCategories.length > 0 &&
                  this.state.subCategories.map((list, i) => (
                    <Fragment key={i}>
                      <li>
                        <Link to={`/leads/${list.id}`}>
                          <span>{list.category_name}</span>
                        </Link>
                      </li>
                    </Fragment>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default LookingFor;
