import React from 'react';
import Button from '@material-ui/core/Button';

const ButtonCustom = ({className, text, color, variant, onClick, ...otherProps}) =>
    <Button
        color={color}
        className={className}
        variant={variant}
        onClick={onClick}
        {...otherProps}
    >
        {text}
    </Button>;

export default ButtonCustom;
