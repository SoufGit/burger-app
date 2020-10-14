// @flow
import React from 'react';
import TextField from '@material-ui/core/TextField';

const InputItem = ({id, label, placeholder, value, ...otherProps}) =>
    <TextField
        id={id}
        label={label}
        placeholder={placeholder}
        value={value}
        {...otherProps}
    />;

export default InputItem;
