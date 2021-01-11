import React from 'react';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import {makeStyles} from '@material-ui/core/styles';
import Button from 'Components/button/Button';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
    root: {
        height: 0,
        float: 'right'
    }
}));

// Example implementation of a wrapper
const CalendarEvent = handleDeleteEvent => ({event}) => {
    const classes = useStyles();
    return (
        <div>
            {event.eventTitle}
            <span>
                <IconButton
                    color='inherit'
                    classes={classes}
                    aria-label="delete"
                    onClick={e => handleDeleteEvent(e, event._id, event.eventTitle)}
                >
                    <DeleteIcon />
                </IconButton>
            </span>
        </div>
    )
};

export default CalendarEvent;

