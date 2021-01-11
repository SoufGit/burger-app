import React, {useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import DatePickerField from 'Components/datePicker/DatePickerField';
import DialogItem from './DialogItem';
import {InputItem, InputSelect} from '../input';

const useStyles = makeStyles(theme => ({
    container: {
        marginBottom: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
    },
    dense: {
        marginTop: 19
    },
    menu: {
        width: 200
    },
    selectField: {
        //marginLeft: theme.spacing(1),
        // MarginRight: theme.spacing(12),
        width: 300
    },
    textField: {
        // MarginLeft: theme.spacing(1),
        //marginRight: theme.spacing(10),
        width: 300
    }
}));

const DialogWithSelect = ({isOpen, values, handleSelectEmployeeChange, handleSelectEventTypeChange, handleDialogClose, handleInputChange, eventTextValue, employeeId,
    eventTypeId, isInputTextError, inputHelperText, handleValidate, handleDateChange, selectedDate}) => {
    const classes = useStyles();
    const employeeName = employeeId && values.find(employee => employee._id === employeeId).name
    const toto = [{_id: 111, name: 'Congés'}, {_id: 1, name: 'toto'}, {_id: 11, name: 'Fermé'}];
    return (
        <DialogItem
            isOpen={isOpen}
            handleClose={handleDialogClose}
            handleValidate={handleValidate}
            contentText='Let Google help apps determine location.'
            contentTitle={employeeName || 'Créer un événement'}
        >
            <div className={classes.container}>
                <InputSelect
                    values={toto}
                    handleInputSelectChange={handleSelectEventTypeChange}
                    classes={classes}
                    label={'Type dévénement'}
                    value={eventTypeId}
                    required
                />
                <InputSelect
                    values={values}
                    handleInputSelectChange={handleSelectEmployeeChange}
                    classes={classes}
                    label={'Sélectionner un employé'}
                    value={employeeId}
                    required
                />
                <InputItem
                    id="standard-with-placeholder"
                    label="Saisir le texte..."
                    className={classes.textField}
                    onChange={handleInputChange}
                    value={eventTextValue}
                    error={isInputTextError}
                    helperText={inputHelperText}
                    required
                />
                <DatePickerField
                    label="DD/MM/YYYY"
                    onChange={handleDateChange}
                    value={selectedDate} />
            </div>
        </DialogItem>
    );
};

export default DialogWithSelect;
