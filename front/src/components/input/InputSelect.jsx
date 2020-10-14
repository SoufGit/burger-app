import React from 'react';
import InputItem from './InputItem';

const InputSelect = ({values, handleInputSelectChange, className}) =>
    <InputItem
        select
        id="standard-select-currency-native"
        label="Sélectionner un employé"
        onChange={handleInputSelectChange}
        className={className.selectField}
        SelectProps={{
            MenuProps: {
                className: className.menu
            },
            native: true
        }}
        helperText="Ce champs n'est pas obligatoire"
        margin="normal"
    >
        <option value="" />
        {values.employeeList.map(option =>
            <option key={option.id} value={option.id}>
                {option.name}
            </option>)}
    </InputItem>;

export default InputSelect;
