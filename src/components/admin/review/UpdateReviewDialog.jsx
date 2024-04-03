import React, { Fragment } from 'react';
import ReactStars from 'react-rating-stars-component';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const UpdateReviewDialog = ({ updateOpen, handleUpdateClose, handleChange, ratingChanged, rating, review, handleUpdate }) => {
  return (
    <Fragment>
      <Dialog open={updateOpen} onClose={handleUpdateClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title' className='text-center'>
          {'Update Review'}
        </DialogTitle>
        <DialogContent>
          <form action='' className='RecTextDiv DFlex justify-content-start'>
            <label>Overall Rating</label>
            <ReactStars count={5} value={rating} onChange={ratingChanged} size={24} activeColor='#e8b239' />
            <h4>Write your review</h4>
            <TextareaAutosize
              name='review'
              value={review}
              onChange={(e) => handleChange(e)}
              placeholder='What did you like or dislike?'
              id='review'
            />
          </form>
        </DialogContent>
        <DialogActions className='d-flex justify-content-center mb-3'>
          <button type='button' className='btn btn-outline-success' onClick={handleUpdate} color='primary'>
            Update Review
          </button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default UpdateReviewDialog;
