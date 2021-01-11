
import React from 'react';
import {Calendar, momentLocalizer, Views} from 'react-big-calendar';
import moment from 'moment';
import CustomToolbar from './CalendarCustomToolbar';
import CalendarEvent from './EventComponent';

const localizer = momentLocalizer(moment);
const allViews = Object.keys(Views).map(view => Views[view]);

const CalendarItem = ({handleDeleteEvent, handleSelectSlot, handleSelectEvent, eventList, eventPropGetter}) =>
    <Calendar
        selectable
        localizer={localizer}
        events={eventList}
        startAccessor="start"
        //startAccessor={totot => toto(totot)}
        endAccessor="end"
        culture="fr-FR"
        components={{
            toolbar: CustomToolbar,
            event: CalendarEvent(handleDeleteEvent)
        }}
        onSelectEvent={event => handleSelectEvent(event)}
        onSelectSlot={handleSelectSlot}
        views={allViews}
        eventPropGetter={eventPropGetter}
        popup
    //showMultiDayTimes={true}
    />;

export default CalendarItem;
