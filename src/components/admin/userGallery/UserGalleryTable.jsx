import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { headers, limit, notificationError, notificationSuccess, validateValue } from '../../../common/admin/constants';
import { ReactTable } from '../../../common/admin/ReactTable';
import ListActions from '../../../common/admin/listActions';
import Loader from '../../../common/admin/Loader';
import UpdateGalleryDialog from './UpdateGalleryDialog';
import DeleteGalleryDialog from './DeleteGalleryDialog';

const UserGalleryTable = () => {
  const [allGalleryImages, setAllGalleryImages] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [updateOpen, setUpdateOpen] = React.useState(false);
  const [delId, setDelId] = React.useState(null);
  const [editId, setEditId] = React.useState(null);
  const [values, setValues] = React.useState({ id: null, fileName: '' });

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(`gallery/${delId}`, {
        headers: { ...headers.image, authorization: localStorage.getItem('adminToken') },
      });
      if (res.status === 204) {
        setLoading(false);
        setOpen(false);
        getAllGalleryImages(0);
        notificationSuccess('Delete Gallery', 'Gallery Image has been deleted successfully!');
      } else {
        setLoading(false);
        notificationError('Delete Gallery', 'Something went wrong please try again!');
      }
    } catch (error) {
      setLoading(false);
      setOpen(false);
      notificationError('Delete Gallery', error);
    }
  };

  const handleChange = (value) => {
    setValues({ ...values, fileName: value });
  };

  const handleClose = () => {
    setOpen(false);
    setDelId(null);
  };

  const handleUpdateClose = () => {
    setEditId(null);
    setUpdateOpen(false);
    setValues({ id: null, fileName: '' });
  };

  const editClick = (id) => {
    setEditId(id);
    getGalleryById(id);
  };

  const getGalleryById = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`gallery-image/${id}`, { headers: headers.simple });
      if (res.status === 200) {
        setLoading(false);
        setValues({ user_id: res.data[0].user_id, id: res.data[0].id, fileName: res.data[0].file_name });
        setUpdateOpen(true);
      }
    } catch (error) {
      setLoading(false);
      notificationError('Gallery', error);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    if (validateValue(values.fileName) === true) {
      try {
        let formData = new FormData();
        formData.append('id', values.id);
        formData.append('user_id', values.user_id);
        formData.append('file_name', values.fileName[0]);
        const res = await axios.put(`gallery/${editId}`, formData, {
          headers: { ...headers.image, authorization: localStorage.getItem('adminToken') },
        });
        if (res.status === 201) {
          setLoading(false);
          setUpdateOpen(false);
          getAllGalleryImages(0);
          setValues({ id: null, fileName: '' });
          notificationSuccess('Gallery', 'Image updated successfully!');
        }
      } catch (error) {
        setLoading(false);
        notificationError('Gallery', error);
      }
    } else {
      setLoading(false);
      notificationError('Gallery', 'Gallery image must be required!');
    }
  };

  const deleteClick = (id) => {
    setOpen(true);
    setDelId(id);
  };

  const getAllGalleryImages = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(`gallery/pagination?limit=${limit}&page=${page}`, {
        headers: { ...headers.simple, authorization: localStorage.getItem('adminToken') },
      });
      if (res.status === 200) {
        let tableData = [];
        res.data.result.map((item, i) => {
          tableData[i] = {
            name: item.firstName + ' ' + item.lastName,
            image: item.file_name,
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
        setAllGalleryImages(res.data);
        notificationSuccess('Gallery', 'Gallery images loaded successfully!');
      }
    } catch (error) {
      notificationError('Gallery', 'Something went wrong. Please try again!');
    }
  };

  useEffect(() => {
    getAllGalleryImages(0);
  }, []);

  return (
    <Fragment>
      {allGalleryImages ? (
        <Fragment>
          <div className='UserTableDiv DBlock'>
            <Loader loader={loading} position={true} />
            <div className='TableTitle DFlex'>
              <h2>User Gallery Images Table</h2>
            </div>
            <ReactTable
              cols={cols}
              getPageData={tableData}
              data={tableData}
              defaultPageSize={limit}
              pageCount={allGalleryImages.pagination.totalPage}
              canPreviousPage={allGalleryImages.pagination.previous}
              canNextPage={allGalleryImages.pagination.next}
              previousPage={() => getAllGalleryImages(allGalleryImages.pagination.current - 1)}
              nextPage={() => getAllGalleryImages(allGalleryImages.pagination.current + 1)}
              gotoPage={getAllGalleryImages}
            />
          </div>
        </Fragment>
      ) : null}
      <UpdateGalleryDialog
        fileName={values.fileName}
        updateOpen={updateOpen}
        handleUpdateClose={handleUpdateClose}
        handleChange={handleChange}
        handleUpdate={handleUpdate}
      />
      <DeleteGalleryDialog open={open} handleClose={handleClose} handleDelete={handleDelete} />
    </Fragment>
  );
};

export default UserGalleryTable;

const cols = [
  {
    Header: 'User Name',
    accessor: 'name',
  },
  {
    Header: 'Image',
    accessor: 'image',
  },
  {
    Header: 'Action',
    accessor: 'action',
  },
];
