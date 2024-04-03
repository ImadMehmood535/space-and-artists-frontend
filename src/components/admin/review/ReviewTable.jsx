import React, { Fragment, useState, useEffect } from 'react';
import ReactStars from 'react-rating-stars-component';
import axios from 'axios';
import { headers, limit, notificationError, notificationSuccess, validateValue } from '../../../common/admin/constants';
import { ReactTable } from '../../../common/admin/ReactTable';
import ListActions from '../../../common/admin/listActions';
import Loader from '../../../common/admin/Loader';
import UpdateReviewDialog from './UpdateReviewDialog';
import DeleteReviewDialog from './DeleteReviewDialog';

const ReviewTable = () => {
  const [allReviews, setAllReviews] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [updateOpen, setUpdateOpen] = React.useState(false);
  const [delId, setDelId] = React.useState(null);
  const [editId, setEditId] = React.useState(null);
  const [values, setValues] = React.useState({ id: null, rating: '', review: '' });

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(`review/${delId}`, {
        headers: { ...headers.image, authorization: localStorage.getItem('adminToken') },
      });
      if (res.status === 204) {
        setLoading(false);
        setOpen(false);
        getAllReviews(0);
        notificationSuccess('Delete Review', 'Review has been deleted successfully!');
      } else {
        setLoading(false);
        notificationError('Delete Review', 'Something went wrong please try again!');
      }
    } catch (error) {
      setLoading(false);
      setOpen(false);
      notificationError('Delete Review', error);
    }
  };

  const ratingChanged = (newRating) => {
    setValues({ ...values, rating: newRating });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setOpen(false);
    setDelId(null);
  };

  const handleUpdateClose = () => {
    setEditId(null);
    setUpdateOpen(false);
    setValues({ id: null, rating: '', review: '' });
  };

  const editClick = (id) => {
    setEditId(id);
    getReviewById(id);
  };

  const getReviewById = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`review/${id}`, { headers: headers.simple });
      if (res.status === 200) {
        setLoading(false);
        setValues({
          id: res.data[0].id,
          rating: res.data[0].rating,
          review: res.data[0].review,
        });
        setUpdateOpen(true);
      }
    } catch (error) {
      setLoading(false);
      notificationError('Review', error);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    if (validateValue(values.rating) === true && validateValue(values.review) === true) {
      let data = {
        rating: values.rating,
        review: values.review,
      };
      try {
        const res = await axios.put(`review/${editId}`, data, { headers: { ...headers.simple, authorization: localStorage.getItem('adminToken') } });
        if (res.status === 201) {
          setUpdateOpen(false);
          setLoading(false);
          getAllReviews(0);
          setValues({ id: null, rating: '', review: '' });
          notificationSuccess('Review', 'Review updated successfully!');
        }
      } catch (error) {
        setLoading(false);
        notificationError('Review', error);
      }
    } else {
      setLoading(false);
      notificationError('Review', 'Review name required!');
    }
  };

  const deleteClick = (id) => {
    setOpen(true);
    setDelId(id);
  };

  const getAllReviews = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(`review/pagination?limit=${limit}&page=${page}`, { headers: headers.simple });
      if (res.status === 200) {
        let tableData = [];
        res.data.result.map((item, i) => {
          tableData[i] = {
            recommendedBy: item.recommendedByFirstName + ' ' + item.recommendedByLastName,
            recommendedTo: item.recommendedToFirstName + ' ' + item.recommendedToLastName,
            rating: (
              <div className='Rating DFlex w-auto justify-content-start'>
                <small></small>
                <ReactStars count={5} value={item.rating} size={24} name='disabled' activeColor='#e8b239' />
              </div>
            ),
            review: item.review.length > 50 ? item.review.substring(0, 50) + '...' : item.review,
            action: [
              <ListActions
                actionsData={[
                  {
                    title: 'Edit',
                    id: item.id,
                    onClick: editClick,
                    icon: 'icon fas fa-user-edit',
                  },
                  {
                    title: 'Delete',
                    id: item.id,
                    onClick: deleteClick,
                    icon: 'icon fas fa-trash-alt',
                  },
                ]}
              />,
            ],
          };
        });
        setLoading(false);
        setTableData(tableData);
        setAllReviews(res.data);
        notificationSuccess('Review', 'Review loaded successfully!');
      }
    } catch (error) {
      notificationError('Review', 'Something went wrong. Please try again!');
    }
  };

  useEffect(() => {
    getAllReviews(0);
  }, []);

  return (
    <Fragment>
      {allReviews ? (
        <Fragment>
          <div className='UserTableDiv DBlock'>
            <Loader loader={loading} position={true} />
            <div className='TableTitle DFlex'>
              <h2>Review Table</h2>
            </div>
            <ReactTable
              cols={cols}
              getPageData={tableData}
              data={tableData}
              defaultPageSize={limit}
              pageCount={allReviews.pagination.totalPage}
              canPreviousPage={allReviews.pagination.previous}
              canNextPage={allReviews.pagination.next}
              previousPage={() => getAllReviews(allReviews.pagination.current - 1)}
              nextPage={() => getAllReviews(allReviews.pagination.current + 1)}
              gotoPage={getAllReviews}
            />
          </div>
        </Fragment>
      ) : null}
      <UpdateReviewDialog
        updateOpen={updateOpen}
        ratingChanged={ratingChanged}
        rating={values.rating}
        review={values.review}
        handleUpdateClose={handleUpdateClose}
        handleChange={handleChange}
        handleUpdate={handleUpdate}
      />
      <DeleteReviewDialog open={open} handleClose={handleClose} handleDelete={handleDelete} />
    </Fragment>
  );
};

export default ReviewTable;

const cols = [
  {
    Header: 'Recommended By',
    accessor: 'recommendedBy',
  },
  {
    Header: 'Recommended To',
    accessor: 'recommendedTo',
  },
  {
    Header: 'Rating',
    accessor: 'rating',
  },
  {
    Header: 'Review',
    accessor: 'review',
  },
  {
    Header: 'Action',
    accessor: 'action',
  },
];
