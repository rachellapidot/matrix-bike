import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from "moment"

const DatePicker = ({label, date, setDate}) => {
  

  const handleDateChange = (date) => {
    setDate(moment(date).valueOf());
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>    
        <KeyboardDatePicker
          variant="inline"
          margin="normal"
          id="date-picker-dialog"
          label={label}
          format="MM/dd/yyyy"
          value={date}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          style={{width:"10.5rem", margin: "0rem 0.7rem 0rem 0rem", fontSize:"0.5rem"}}
        />    
    </MuiPickersUtilsProvider>
  );
}

export default DatePicker