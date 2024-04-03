import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

function DateCustomPicker({ setDate, value }) {
  console.log({ value });
  const [selectedDate, setSelectedDate] = useState(new Date(value));
  console.log({ selectedDate });
  const handleDate = (date) => {
    const modifiedDate = new Date(date).toISOString().slice(0, 10);
    const formateDate = `${modifiedDate.split('-')[0]}-${modifiedDate.split('-')[1]}-${modifiedDate.split('-')[2]}`;
    setSelectedDate(date);
    setDate(formateDate);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin='normal'
        className='w-100'
        id='date-picker-dialog'
        format='dd/MM/yyyy'
        placeholder='DD/MM/YYYY'
        value={selectedDate}
        onChange={handleDate}
        onBlur={() => handleDate(selectedDate)}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  );
}

export default DateCustomPicker;
