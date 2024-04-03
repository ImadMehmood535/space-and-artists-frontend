import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const UpdateCityDialog = ({ updateOpen, handleUpdateClose, handleUpdate, handleChange, name, allCountries, countryId }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Dialog
        open={updateOpen}
        className='AdminModal'
        onClose={handleUpdateClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title' className='text-center'>
          {'Update City'}
        </DialogTitle>
        <DialogContent>
          <form action='' className='form CountryForm'>
            <div className='row'>
              <div className='col-12'>
                <TextField name='name' value={name} onChange={handleChange} label='City Name' />
              </div>
              <div className='col-md-12'>
                <FormControl className={classes.formControl}>
                  <InputLabel id='allCountries'>Parent Category</InputLabel>
                  <Select labelId='allCountries' id='countryId' name='countryId' value={countryId} onChange={handleChange}>
                    <MenuItem value=''>Select</MenuItem>
                    {allCountries?.map((list) => (
                      <MenuItem value={list.id} key={list.id}>
                        {list.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          </form>
        </DialogContent>
        <DialogActions className='d-flex justify-content-center mb-3'>
          <button type='button' className='btn btn-outline-success' onClick={handleUpdate} color='primary'>
            Update City
          </button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default UpdateCityDialog;
