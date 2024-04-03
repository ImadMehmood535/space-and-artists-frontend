import React, { Fragment, useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Switch from '@material-ui/core/Switch';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import {
  headers,
  limit,
  notificationError,
  notificationSuccess,
} from '../../../common/admin/constants';
import { ReactTable } from '../../../common/admin/ReactTable';
import ListActions from '../../../common/admin/listActions';
import Loader from '../../../common/admin/Loader';

const UsersTable = () => {
  const [usersData, setUsersData] = useState(null);
  const [tableUsers, setTableUsers] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [delId, setDelId] = React.useState(null);

  const [currentPage, setCurrentPage] = useState(0);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(`user/${delId}`, {
        headers: {
          ...headers.image,
          authorization: localStorage.getItem('adminToken'),
        },
      });
      if (res.status === 204) {
        setLoading(false);
        setOpen(false);
        getAllUsers(0);
        notificationSuccess(
          'Delete Account',
          'User has been deleted successfully!'
        );
      } else {
        setLoading(false);
        notificationError(
          'Delete Account',
          'Something went wrong please try again!'
        );
      }
    } catch (error) {
      setLoading(false);
      notificationError('Delete Account', error);
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

  const updateFeatured = async (id, featured) => {
    setLoading(true);
    const featuredVal = featured ? 0 : 1;

    const res = await axios.get(`/user/featured/${id}/${featuredVal}`, {
      headers: headers.protect,
    });
    setLoading(false);
    if (res.status === 200) {
      const newData = usersData.result.map((user) =>
        user.id === id ? { ...user, featured: featuredVal ? 0 : 1 } : user
      );
      setUsersData((prev) => ({
        pagination: prev.pagination,
        result: newData,
      }));
    }
  };

  const getAllUsers = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `users/pagination?limit=${limit}&page=${page}`,
        { headers: headers.simple }
      );
      if (res.status === 200) {
        setLoading(false);
        setUsersData(res.data);
      }
    } catch (error) {
      notificationError('Artists', 'Something went wrong. Please try again!');
    }
  };

  useEffect(() => {
    if (usersData) {
      let tableData = [];
      usersData.result.map((item, i) => {
        tableData[i] = {
          id: item.id,
          name: item.firstName + ' ' + item.lastName,
          email: item.email,
          dateOfBirth: item.dateOfBirth,
          category: item.categoryName,
          status: item.verifiedAt === true ? 'Yes' : 'No',
          featured: (
            <Switch
              onChange={(e) => updateFeatured(item.id, e.target.checked)}
              checked={item.featured === 1}
            />
          ),
          action: [
            <ListActions
              actionsData={[
                {
                  title: 'Edit',
                  id: item.id,
                  onClick: editClick,
                  to: `/admin/edit-user/${item.id}`,
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

      setTableUsers(tableData);
    }
  }, [usersData]);

  useEffect(() => {
    getAllUsers(currentPage);
  }, []);

  return (
    <Fragment>
      {usersData ? (
        <Fragment>
          <Loader loader={loading} position={true} />
          <h2>Users Table</h2>
          <ReactTable
            cols={cols}
            getPageData={tableUsers}
            data={tableUsers}
            defaultPageSize={limit}
            pageCount={usersData.pagination.totalPage}
            canPreviousPage={usersData.pagination.previous}
            canNextPage={usersData.pagination.next}
            previousPage={() => getAllUsers(usersData.pagination.current - 1)}
            nextPage={() => getAllUsers(usersData.pagination.current + 1)}
            gotoPage={getAllUsers}
          />
        </Fragment>
      ) : null}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title' className='text-center'>
          {'Delete User'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id='alert-dialog-description'
            className='text-center'
          >
            Are you sure you want to delete the user.
          </DialogContentText>
        </DialogContent>
        <DialogActions className='d-flex justify-content-center mb-3'>
          <button
            type='button'
            className='btn btn-outline-secondary'
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type='button'
            className='btn btn-outline-danger'
            onClick={handleDelete}
            color='primary'
            autoFocus
          >
            Delete
          </button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default UsersTable;

const cols = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Date of birth',
    accessor: 'dateOfBirth',
  },
  {
    Header: 'Category',
    accessor: 'category',
  },
  {
    Header: 'Verified',
    accessor: 'status',
  },
  {
    Header: 'Featured',
    accessor: 'featured',
  },
  {
    Header: 'Action',
    accessor: 'action',
  },
];
