import React, { Fragment, useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import { headers, limit, notificationError, notificationSuccess } from '../../../common/admin/constants';
import { ReactTable } from '../../../common/admin/ReactTable';
import ListActions from '../../../common/admin/listActions';
import Loader from '../../../common/admin/Loader';
import { Link } from 'react-router-dom';

const CategoryTable = () => {
  const [allCategories, setAllCategories] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [delId, setDelId] = React.useState(null);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(`category/${delId}`, {
        headers: { ...headers.image, authorization: localStorage.getItem('adminToken') },
      });
      if (res.status === 204) {
        setLoading(false);
        setOpen(false);
        getAllCategories(0);
        notificationSuccess('Delete Category', 'User has been deleted successfully!');
      } else {
        setLoading(false);
        notificationError('Delete Category', 'Something went wrong please try again!');
      }
    } catch (error) {
      setLoading(false);
      setOpen(false);
      notificationError('Delete Category', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setDelId(null);
  };

  const editClick = (id) => {};

  const deleteClick = (id) => {
    setOpen(true);
    setDelId(id);
  };

  const getAllCategories = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(`category/pagination?limit=${limit}&page=${page}`, { headers: headers.simple });
      if (res.status === 200) {
        let tableData = [];
        res.data.result.map((item, i) => {
          tableData[i] = {
            id: item.id,
            name: item.category_name,
            status: item.parent_id === 0 ? 'Yes' : 'No',
            action: [
              <ListActions
                actionsData={[
                  {
                    title: 'Edit',
                    id: item.id,
                    onClick: editClick,
                    to: `/admin/edit-category/${item.id}`,
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
        setAllCategories(res.data);
        notificationSuccess('Categories', 'Categories loaded successfully!');
      }
    } catch (error) {
      notificationError('Categories', 'Something went wrong. Please try again!');
    }
  };

  useEffect(() => {
    getAllCategories(0);
  }, []);

  return (
    <Fragment>
      {allCategories ? (
        <Fragment>
          <div className='UserTableDiv DBlock'>
            <Loader loader={loading} position={true} />
            <div className='TableTitle DFlex'>
              <h2>Categories Table</h2>
              <Link to='/add-category' className='AddBtn'>
                Add Category
              </Link>
            </div>
            <ReactTable
              cols={cols}
              getPageData={tableData}
              data={tableData}
              defaultPageSize={limit}
              pageCount={allCategories.pagination.totalPage}
              canPreviousPage={allCategories.pagination.previous}
              canNextPage={allCategories.pagination.next}
              previousPage={() => getAllCategories(allCategories.pagination.current - 1)}
              nextPage={() => getAllCategories(allCategories.pagination.current + 1)}
              gotoPage={getAllCategories}
            />
          </div>
        </Fragment>
      ) : null}
      <Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title' className='text-center'>
          {'Delete User'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description' className='text-center'>
            Are you sure you want to delete the category.
          </DialogContentText>
        </DialogContent>
        <DialogActions className='d-flex justify-content-center mb-3'>
          <button type='button' className='btn btn-outline-secondary' onClick={handleClose}>
            Cancel
          </button>
          <button type='button' className='btn btn-outline-danger' onClick={handleDelete} color='primary' autoFocus>
            Delete
          </button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default CategoryTable;

const cols = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Parent',
    accessor: 'status',
  },
  {
    Header: 'Action',
    accessor: 'action',
  },
];
