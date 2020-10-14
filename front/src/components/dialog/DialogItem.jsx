import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ButtonCustom from '../button/Button';

// eslint-disable-next-line react/display-name
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const DialogItem = ({isOpen, handleClose, contentText, contentTitle, children}) =>
    <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
    >
        <DialogTitle id="alert-dialog-slide-title">{contentTitle}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                {contentText}
            </DialogContentText>
            {children}
        </DialogContent>

        <DialogActions>
            <ButtonCustom
                onClick={() => handleClose(true)}
                color="primary"
                text="Annuler"
            />
            <ButtonCustom
                onClick={() => handleClose(false)}
                color="primary"
                text="Valider"
            />
        </DialogActions>
    </Dialog>;

export default DialogItem;
