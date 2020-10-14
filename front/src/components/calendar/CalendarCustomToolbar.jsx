
import React from 'react';

// Example implementation of a wrapper
const CalendarToolbar = ({label, onNavigate, onView}) =>
    <div className="rbc-toolbar">
        <div className="rbc-btn-group">
            <button type="button" onClick={() => onNavigate('TODAY')}>Aujourd'hui</button>
            <button type="button" onClick={() => onNavigate('PREV')}>Précedent</button>
            <button type="button" onClick={() => onNavigate('NEXT')}>Suivant</button>
        </div>
        <div className="rbc-toolbar-label">{label}</div>
        <div className="rbc-btn-group">
            <button type="button" onClick={onView.bind(null, 'month')}>Mois</button>
            <button type="button" onClick={onView.bind(null, 'week')}>Semaine</button>
            <button type="button" onClick={onView.bind(null, 'day')}>Jour</button>
            <button type="button" onClick={onView.bind(null, 'agenda')}>Agenda</button>
        </div>
    </div>;

export default CalendarToolbar;
