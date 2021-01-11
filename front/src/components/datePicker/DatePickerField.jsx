// @flow
import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import french from "date-fns/locale/fr";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";


const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 300,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1)
    }
}));

const DatePickerField = ({value, onChange, ...props}) => {
    const classes = useStyles();
    const [selectedDate, handleDateChange] = useState(value || null);

    const isValueNull = value => {
        return (
            value === null ||
            value === 'null' ||
            value === undefined ||
            value === 'undefined' ||
            value === '' ||
            value === Number.NaN ||
            value === 'NaN'
        );
    };

    /**
    * @description Returns true if the specified value is not null or kind of null.
    * @param value         Value to process.
    * @returns {boolean}   True if the specified value is not null or kind of null.
    */
    const isValueNotNull = value => {
        return !isValueNull(value);
    };

    /**
    * @description Returns true if the specified nested value is null or kind of null.
    * @param value         Value to process.
    * @returns {boolean}   True if the specified nested value is null or kind of null.
    */
    const onChangeDate = value => {
        if(isValueNotNull(onChange)) {
            onChange(value);
        }
        handleDateChange(value);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}
            locale={french}>
            <KeyboardDatePicker
                classes={classes}
                disableFuture
                variant="inline"
                format="dd/MM/yyyy"
                value={selectedDate}
                onChange={date => onChangeDate(date)}
                placeholder="DD/MM/YYYY"
                autoOk={true}
                invalidDateMessage='Format de Date non valide'
                {...props}
            />
        </MuiPickersUtilsProvider>
    )
};

export default DatePickerField;
