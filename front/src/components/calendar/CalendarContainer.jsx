
import React, {useEffect, useState} from 'react';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import {v4 as uuidv4} from 'uuid';
import {BACK_URL, fetchApiRequest, requestContentTypes, requestMethods} from 'Helpers/api';
import CalendarItem from './CalendarItem';
import CustomToolbar from './CalendarCustomToolbar';
import {DialogWithSelect} from '../dialog';
import {DialogItem} from '../dialog';


const addCalendarEvent = async addCalendarEvent => await fetchApiRequest(URL_CALENDAR_EVENTS, requestMethods.POST, addCalendarEvent);
const updateCalendarEvent = async (id, calendarEventUpdated) => await fetchApiRequest(`${URL_CALENDAR_EVENTS}/${id}`, requestMethods.PATCH, calendarEventUpdated);
const deleteCalendarEvent = async id => await fetchApiRequest(`${URL_CALENDAR_EVENTS}/${id}`, requestMethods.DELETE);

const URL_CALENDAR_EVENTS = '/calendarEvents';
const URL_EMPLOYEES = '/employees';

// const useStateWithLocalStorage = localStorageKey => {
//     const [eventList, setEventList] = useState(JSON.parse(localStorage.getItem(localStorageKey)) || []);

//     // Similaire à componentDidMount et componentDidUpdate :
//     useEffect(() => {
//         localStorage.setItem(localStorageKey, JSON.stringify(eventList));
//     }, [eventList]);

//     return [eventList, setEventList];
// };

// eslint-disable-next-line max-statements
const CalendarContainer = () => {
    //const [eventList, setEventList] = useStateWithLocalStorage('eventList');
    const [eventList, setEventList] = useState([]);
    const [newEvent, setNewEvent] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);
    const [dataEmployeeList, setDataEmployeeList] = useState([]);
    const [currentEmployee, setCurrentEmployee] = useState({});
    const [eventTextValue, setEventTextValue] = useState('');
    const [employeeId, setEmployeeId] = useState(null);
    const [eventTypeId, setEventTypeId] = useState(null);
    const [isInputTextError, setIsInputTextError] = useState(false);
    const [inputHelperText, setInputHelperText] = useState('');
    const [eventId, setEventId] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [msg, setMsg] = useState('');
    const [severity, setSeverity] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const responseApiEmployeeList = await fetchApiRequest(URL_EMPLOYEES); // await fetch(`${BACK_URL}/employees`);
                //const employeeList = await responseApiEmployees.json();
                setDataEmployeeList(responseApiEmployeeList);
                const responseApiCalendarEventList = await fetchApiRequest(URL_CALENDAR_EVENTS); // await fetch(`${BACK_URL}/calendarEvents`);
                //const calendarEventList = await responseApiCalendarEvents.json();
                setEventList(responseApiCalendarEventList);

                // const responseApiEmployees = await fetch(`${BACK_URL}/employees`);
                // const employeeList = await responseApiEmployees.json();
                // const responseApiCalendarEvents = await fetch(`${BACK_URL}/calendarEvents`);
                // const calendarEventList = await responseApiCalendarEvents.json();
                // setDataEmployeeList(employeeList);
                // setEventList(calendarEventList);
            } catch(error) {
                console.log('errorerrorerror_useEffect', error);
            }
            // ...
        }
        fetchData();
    }, []); // Or [] if effect doesn't need props or state

    const handleSelectSlot = ({end, start}) => {
        setNewEvent({end, start});
        setEmployeeId('');
        setEventTextValue('');
        setEventId(null);
        setIsOpen(true);
    };

    const handleSelectEvent = ({date, employeeId, eventTitle, eventTypeId, _id}) => {
        setIsOpen(true);
        setEmployeeId(employeeId);
        setEventTypeId(eventTypeId)
        setEventTextValue(eventTitle);
        setEventId(_id);
        setSelectedDate(date);
        setCurrentEmployee({
            ...getCurrentEmployee(employeeId)
        });
    };

    const getSelectedEvent = eventId => event => event._id === eventId;
    const getCurrentEmployee = id => dataEmployeeList.find(employee => employee._id === id);
    const eventStyleGetter = event => {
        const employee = getCurrentEmployee(event._id);
        const backgroundColor = employee ? employee.color : '#3f51b5';


        return {style: {backgroundColor}};

        /*
         *Return {
         *    className: "",
         *    style: newStyle
         *};
         */
    };

    const handleSelectEmployeeChange = event => {
        setEmployeeId(event.target.value);
        setCurrentEmployee({
            ...getCurrentEmployee(event.target.value)
        });
    };

    const handleSelectEventTypeChange = event => setEventTypeId(event.target.value);

    const handleSubmit = async () => {
        if(!eventTextValue || eventTextValue.length < 3) {
            setIsInputTextError(true);
            setInputHelperText('Obligatoire, 3 caractères minimum');
            return;
        };
        const index = eventList.findIndex(getSelectedEvent(eventId));
        let newEventList = eventList.slice();
        // POST
        if(index === -1) {
            const eventToAdd = buildEvent(newEvent);
            const result = await addCalendarEvent(eventToAdd);
            const {calendarEventAdded, message} = result;
            setIsAlertOpen(true);
            setMsg(message);
            setSeverity('success');
            //setEventId(calendarEventAdded._id);
            newEventList = [
                ...eventList,
                calendarEventAdded
            ];
            // UPDATE
        } else {
            const eventToUpdate = buildEvent(newEventList[index]);
            const result = await updateCalendarEvent(eventId, eventToUpdate);
            setIsAlertOpen(true);
            setMsg(result.message);
            setSeverity('success');
            newEventList[index] = eventToUpdate;
        }
        setIsOpen(false);
        setIsInputTextError(false);
        setInputHelperText('');
        setEventTypeId(null);
        setSelectedDate(null);
        setEventList([...newEventList]);
    };

    const buildEvent = eventList => ({
        ...eventList,
        employeeId: currentEmployee && currentEmployee._id,
        eventTitle: eventTextValue,
        eventTypeId: eventTypeId,
        //eventId: uuidv4(),
        date: selectedDate
    })

    const handleDialogClose = () => {
        setIsOpen(false);
        setIsOpenConfirmDialog(false);
        setIsInputTextError(false);
        setInputHelperText('');
        setEventTypeId(null);
        setSelectedDate(null);
    };

    const handleInputChange = event => {
        setIsInputTextError(event.target.value.length < 3);
        setInputHelperText(event.target.value.length < 3 ? 'Obligatoire, 3 caractères minimum' : '');
        setEventTextValue(event.target.value);
    };

    const handleDateChange = date => {
        setSelectedDate(date);
    };

    const handleValidateDeleteEvent = async () => {
        const idx = eventList.findIndex(getSelectedEvent(eventId))
        eventList.splice(idx, 1);
        setEventList([...eventList]);
        setIsOpenConfirmDialog(false);
        setIsOpen(false);
        //setEventId(null);
        const result = await deleteCalendarEvent(eventId);
        setIsAlertOpen(true);
        setMsg(result.message);
        setSeverity('success');
    };

    const handleDeleteEvent = (e, eventId, eventTitle) => {
        setIsOpenConfirmDialog(true);
        setEventId(eventId);
        setEventTextValue(eventTitle);
        // Pour ne pas passer dans handleSelectEvent
        e.stopPropagation();
    };

    const SlideTransition = props => (<Slide {...props} direction="right" />);

    const handleAlertClose = () => setIsAlertOpen(false);

    console.log('dataEmployeeListdataEmployeeList', dataEmployeeList);
    return (
        <div className="calendar__container">
            {isOpen && !isOpenConfirmDialog &&
                <DialogWithSelect
                    isOpen={isOpen}
                    values={dataEmployeeList}
                    handleDateChange={handleDateChange}
                    handleSelectEmployeeChange={handleSelectEmployeeChange}
                    handleSelectEventTypeChange={handleSelectEventTypeChange}
                    handleDialogClose={handleDialogClose}
                    handleValidate={handleSubmit}
                    handleInputChange={handleInputChange}
                    eventTextValue={eventTextValue}
                    isInputTextError={isInputTextError}
                    employeeId={employeeId}
                    eventTypeId={eventTypeId}
                    inputHelperText={inputHelperText}
                    selectedDate={selectedDate}
                />
            }
            {isOpenConfirmDialog &&
                <DialogItem
                    isOpen={isOpenConfirmDialog}
                    handleClose={handleDialogClose}
                    handleValidate={handleValidateDeleteEvent}
                    contentText='Etes-vous sur de vouloir supprimer cette événement ?'
                    contentTitle={`Suppression de ${eventTextValue}`}
                />
            }
            <CalendarItem
                handleDeleteEvent={handleDeleteEvent}
                handleSelectSlot={handleSelectSlot}
                handleSelectEvent={handleSelectEvent}
                eventList={eventList}
                eventPropGetter={eventStyleGetter} />
            <Snackbar
                open={isAlertOpen}
                autoHideDuration={4000}
                onClose={handleAlertClose}
                TransitionComponent={SlideTransition}
            >
                <Alert severity={severity}>
                    {msg}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default CalendarContainer;
