
import React from 'react';
import {Calendar, momentLocalizer, Views} from 'react-big-calendar';
import moment from 'moment';

const localizer = momentLocalizer(moment);
const allViews = Object.keys(Views).map(view => Views[view]);

const CalendarItem = ({CustomToolbar, handleSelect, eventList, eventPropGetter}) =>
    <Calendar
        selectable
        localizer={localizer}
        events={eventList}
        startAccessor="start"
        endAccessor="end"
        culture="fr-FR"
        components={{
            toolbar: CustomToolbar
            // Event: EventComponent
        }}
        onSelectEvent={event => alert(event.title)}
        onSelectSlot={handleSelect}
        views={allViews}
        eventPropGetter={eventPropGetter}
    />;

export default CalendarItem;
