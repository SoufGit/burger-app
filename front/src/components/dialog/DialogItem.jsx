import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ButtonCancel from 'Components/button/Button';
import ButtonValidate from 'Components/button/Button';

// eslint-disable-next-line react/display-name
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const DialogItem = ({isOpen, handleClose, handleValidate, contentText, contentTitle, children, ...otherProps}) =>
    <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        maxWidth='xs'
        fullWidth={true}
        {...otherProps}
    >
        <DialogTitle id="alert-dialog-slide-title">{contentTitle}</DialogTitle>
        <DialogContent dividers>
            <DialogContentText id="alert-dialog-slide-description">
                {contentText}
            </DialogContentText>
            {children}
        </DialogContent>

        <DialogActions>
            <ButtonCancel
                onClick={handleClose}
                color="primary"
                text="Annuler"
            />
            <ButtonValidate
                onClick={handleValidate}
                color="primary"
                text="Valider"
            />
        </DialogActions>
    </Dialog>;

export default DialogItem;
