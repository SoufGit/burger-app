import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import DialogItem from './DialogItem';
import {InputItem, InputSelect} from '../input';

const useStyles = makeStyles(theme => ({
    container: {
        marginBottom: theme.spacing(3)
    },
    dense: {
        marginTop: 19
    },
    menu: {
        width: 200
    },
    selectField: {
        marginLeft: theme.spacing(1),
        // MarginRight: theme.spacing(12),
        width: 200
    },
    textField: {
        // MarginLeft: theme.spacing(1),
        marginRight: theme.spacing(10),
        width: 250
    }
}));

const DialogWithSelect = ({isOpen, values, handleInputSelectChange, handleDialogClose, handleInputChange, inputValue, inputSelectValue}) => {
    const classes = useStyles();

    return (
        <DialogItem
            isOpen={isOpen}
            handleClose={handleDialogClose}
            contentText="Let Google help apps determine location."
            contentTitle="Saisie des informations"
        >
            <div className={classes.container}>
                <InputItem
                    id="standard-with-placeholder"
                    label="Saisir le texte..."
                    className={classes.textField}
                    margin="normal"
                    onChange={handleInputChange}
                    value={inputValue}
                    required
                />
                <InputSelect
                    values={values}
                    handleInputSelectChange={handleInputSelectChange}
                    className={classes}
                    value={inputSelectValue}
                    margin="normal"
                />
            </div>
        </DialogItem>
    );
};

export default DialogWithSelect;
