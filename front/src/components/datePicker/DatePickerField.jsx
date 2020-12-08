// @flow
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import french from "date-fns/locale/fr";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";

const DatePickerField = ({value, onChange, ...props}) => (
    <MuiPickersUtilsProvider utils={DateFnsUtils}
        locale={french}>
        <KeyboardDatePicker
            disableFuture
            variant="inline"
            format="dd/MM/yyyy"
            value={value || null}
            onChange={onChange}
            placeholder="DD/MM/YYYY"
            autoOk={true}
            invalidDateMessage='Format de Date non valide'
            {...props}
        />
    </MuiPickersUtilsProvider>
);

export default DatePickerField;
