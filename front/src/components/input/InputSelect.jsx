import React from 'react';
import InputItem from './InputItem';

const InputSelect = ({values, handleInputSelectChange, classes, label, value, ...otherProps}) =>
    <InputItem
        select
        defaultValue={value}
        id="standard-select-currency-native"
        label={label}
        onChange={handleInputSelectChange}
        className={classes.selectField}
        SelectProps={{
            MenuProps: {
                className: classes.menu
            },
            native: true
        }}
        helperText="Ce champs n'est pas obligatoire"
        {...otherProps}
    >
        <option value="" />
        {values.map(option =>
            <option key={option._id} value={option._id}>
                {option.name}
            </option>)}
    </InputItem>;

export default InputSelect;
