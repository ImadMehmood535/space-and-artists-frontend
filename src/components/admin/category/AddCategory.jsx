import axios from 'axios';
import React, { Fragment, useState, useEffect } from 'react';
import { headers, notificationError, notificationSuccess, validateValue } from '../../../common/admin/constants';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Loader from '../../../common/admin/Loader';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const AddCategory = (props) => {
  const classes = useStyles();
  const [parentCategory, setParentCategory] = useState([]);
  const [values, setValues] = useState({
    id: null,
    name: '',
    isParent: false,
    parentId: null,
  });
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleIsParent = (event) => {
    setValues({ ...values, [event.target.name]: event.target.checked, parentId: 0 });
  };

  const getAllParentCategory = async () => {
    try {
      const res = await axios.get('category/all', { headers: headers.simple });
      if (res.status === 200) {
        setLoading(false);
        setParentCategory(res.data);
      }
    } catch (error) {
      notificationError('Edit Category', error);
    }
  };

  const getCategoryById = async (id) => {
    setLoader(true);
    try {
      const res = await axios.get(`category/single/${id}`, { headers: { ...headers.simple, authorization: localStorage.getItem('adminToken') } });
      if (res.status === 200) {
        setLoader(false);
        setValues({
          id: res.data[0].id,
          name: res.data[0].category_name,
          isParent: res.data[0].parent_id !== 0 ? false : true,
          parentId: res.data[0].parent_id !== 0 ? res.data[0].parent_id : 0,
        });
      }
    } catch (error) {
      notificationError('Category', error);
    }
  };

  const submitCategory = async () => {
    setLoader(true);
    if (validateValue(values.name) === true) {
      if (validateValue(values.parentId) === true) {
        let data = { category_name: values.name, parent_id: values.parentId.toString() };
        try {
          const res = await axios.post('category', data, { headers: { ...headers.simple, authorization: localStorage.getItem('adminToken') } });
          if (res.status === 200) {
            setLoader(false);
            notificationSuccess('Add Category', 'Category added successfully!');
          }
        } catch (error) {
          setLoader(false);
          notificationError('Add Category', error);
        }
      } else {
        setLoader(false);
        notificationError('Add Category', 'Please select the type of Category!');
      }
    } else {
      setLoader(false);
      notificationError('Add Category', 'Name is required!');
    }
  };

  const updateCategory = async (id) => {
    setLoader(true);
    if (validateValue(values.name) === true) {
      if (validateValue(values.parentId) === true) {
        let data = { category_name: values.name, parent_id: values.parentId.toString() };
        try {
          const res = await axios.put(`category/${id}`, data, { headers: { ...headers.simple, authorization: localStorage.getItem('adminToken') } });
          if (res.status === 201) {
            getCategoryById(id);
            notificationSuccess('Update Category', 'Category updated successfully!');
          }
        } catch (error) {
          setLoader(false);
          notificationError('Update Category', error);
        }
      } else {
        setLoader(false);
        notificationError('Update Category', 'Please select the type of Category!');
      }
    } else {
      setLoader(false);
      notificationError('Update Category', 'Name is required!');
    }
  };

  useEffect(() => {
    let id = props.match.params.id;
    getAllParentCategory();
    if (id) getCategoryById(id);
  }, []);

  return (
    <Fragment>
      <div className='CategoryForm DBlock h-auto'>
        <h2>Edit Category</h2>
        {loading ? (
          <Loader loader={loading} />
        ) : (
          <Fragment>
            <form className='form position-relative'>
              <Loader loader={loader} position={true} />
              <div className='row align-items-center'>
                <div className='col-md-6 col-lg-4'>
                  <TextField id='name' name='name' value={values.name} label='Category Name' onChange={handleChange} />
                </div>
                <div className='col-md-6 col-lg-4'>
                  <FormControlLabel
                    control={<Checkbox checked={values.isParent} onChange={handleIsParent} name='isParent' color='primary' />}
                    label='isParent Category'
                  />
                </div>
                {!values.isParent ? (
                  <div className='col-md-6 col-lg-4'>
                    <FormControl className={classes.formControl}>
                      <InputLabel id='parentCategory'>Parent Category</InputLabel>
                      <Select labelId='parentCategory' id='parentId' name='parentId' value={values.parentId} onChange={handleChange}>
                        <MenuItem value=''>Select</MenuItem>
                        {parentCategory?.map((list) => (
                          <MenuItem value={list.id} key={list.id}>
                            {list.category_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                ) : null}
              </div>
              <div className='SubmitBtnDiv DFlex justify-content-end'>
                {values.id ? (
                  <button type='button' className='SubmitBtn' onClick={() => updateCategory(values.id)}>
                    Update Category
                  </button>
                ) : (
                  <button type='button' className='SubmitBtn' onClick={() => submitCategory()}>
                    Add Category
                  </button>
                )}
              </div>
            </form>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default AddCategory;
