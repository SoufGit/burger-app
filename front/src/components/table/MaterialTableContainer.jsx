/* eslint-disable react/display-name */
import React, {forwardRef, useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import Alert from '@material-ui/lab/Alert';
import DatePickerField from 'Components/datePicker/DatePickerField';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import french from "date-fns/locale/fr";
import {BACK_URL} from '../../Configuration.js';
import DateFnsUtils from '@date-io/date-fns';
import {DatePicker, KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";

//const data = require('../../data/data.json');

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import IconButton from '@material-ui/core/IconButton';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {red} from '@material-ui/core/colors';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    CalendarIcon: forwardRef((props, ref) => <CalendarTodayIcon {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const addEmployee = async addEmployee => {
    try {
        const response = await fetch(`${BACK_URL}/employees`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addEmployee)
        });
        return await response.json();
    } catch(error) {
        console.log('errorerrorerror_addEmployee', error);
    }
};

const updateEmployee = async (id, employeeUpdated) => {
    try {
        const response = await fetch(`${BACK_URL}/employees/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employeeUpdated)
        });
        return await response.json();
    } catch(error) {
        console.log('errorerrorerror_updateEmployee', error);
    }
};

const deleteEmployee = async id => {
    try {
        const response = await fetch(`${BACK_URL}/employees/${id}`, {
            method: 'DELETE'
        });
        return await response.json();
    } catch(error) {
        console.log('errorerrorerror_deleteEmployee', error);
    }
};

const displayDatePicker = ({onChange, value}, rowData) => (
    <DatePickerField
        local={french}
        maxDateMessage={'La date dentrée ne doit être supérieur à la date de sortie'}
        minDate={rowData.entryDate || null}
        minDateMessage={'La date de sortie ne doit être inférieur à la date dentrée'}
        onChange={onChange}
        value={value}
    />
)

const MaterialTableContainer = () => {
    const invalidRecordName = {isValid: false, helperText: 'Obligatoire, 3 caractères minimum'};
    const [datePickerError, setDatePickerError] = useState(false);
    const [state, setState] = useState({
        columns: [
            {
                field: 'id',
                title: 'ID'
            },
            {
                field: 'name',
                title: 'Nom',
                validate: rowData => rowData.name ? (rowData.name.length < 3
                    ? invalidRecordName : true)
                    : invalidRecordName
            },
            {
                field: 'entryDate',
                title: 'Date dentrée',
                type: "date",
                // validate: rowData => {
                //     console.log('datePickerError', datePickerError);
                //     if(!rowData.entryDate) {
                //         //return {isValid: false, helperText: 'Obligatoire, 3 caractères minimum'};
                //     }
                //     else {
                //         //return true;
                //     }
                // },
                editComponent: props => (
                    <DatePickerField
                        maxDateMessage={'La date dentrée ne doit être supérieur à la date de sortie'}
                        maxDate={props.rowData.outDate}
                        onChange={props.onChange}
                        value={props.value}
                        onAccept={() => setDatePickerError(false)}
                        onError={error => setDatePickerError(!!error)}
                    />
                )
            },
            {
                field: 'outDate',
                title: 'Date de sortie',
                type: "date",
                editComponent: props => (
                    <DatePickerField
                        maxDateMessage={'La date dentrée ne doit être supérieur à la date de sortie'}
                        minDate={props.rowData.entryDate}
                        minDateMessage={'La date de sortie ne doit être inférieur à la date dentrée'}
                        onChange={props.onChange}
                        value={props.value}
                        onAccept={() => setDatePickerError(false)}
                        onError={error => setDatePickerError(!!error)}
                    />
                )
            }
        ],
        datePickerError: false,
        dataList: [],
        isAlertOpen: false,
        msg: ''
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${BACK_URL}/employees`);
                const dataList = await response.json();
                setState((prevState) => {
                    return {
                        ...prevState,
                        dataList
                    }
                });
            } catch(error) {
                console.log('errorerrorerror_useEffect', error);
            }
            // ...
        }
        fetchData();
    }, []); // Or [] if effect doesn't need props or state

    const handleAlertClose = () => {
        setState({
            ...state,
            isAlertOpen: false
        });
    };

    const SlideTransition = props => {
        return <Slide {...props} direction="right" />;
    };

    return (
        <React.Fragment>
            <MaterialTable
                title="Liste des employés"
                columns={state.columns}
                data={state.dataList}
                icons={tableIcons}
                localization={{
                    body: {
                        addTooltip: 'Ajouter un employé',
                        editTooltip: 'Editer un employé',
                        deleteTooltip: 'Supprimer un employé',
                        editRow: {
                            deleteText: 'Etes-vous de vouloir supprimer cet employé ?',
                            cancelTooltip: 'Annuler',
                            saveTooltip: 'Valider'
                        },
                        emptyDataSourceMessage: 'Aucune donnée',
                        filterRow: {
                            filterTooltip: 'Filter'
                        },
                        dateTimePickerLocalization: french
                    },
                    header: {
                        actions: 'Actions'
                    },
                    pagination: {
                        labelDisplayedRows: '{from}-{to} of {count}'
                    },
                    toolbar: {
                        nRowsSelected: '{0} row(s) selected',
                        searchPlaceholder: 'Rechercher'
                    }
                }}
                options={{
                    actionsColumnIndex: -1,
                    headerStyle: {
                        backgroundColor: '#3f51b5',
                        color: '#FFF'
                    }
                }}
                editable={{
                    //isEditable: rowData => {console.log(rowData); return (isRowEditable);},
                    onRowAdd: (newData) =>
                        new Promise(resolve => {
                            setTimeout(async () => {
                                resolve();
                                // Retour pour affichage de msg succès
                                const result = await addEmployee(newData);
                                const {employeeAdded, message} = result;
                                setState((prevState) => {
                                    const dataAdd = [...prevState.dataList];

                                    dataAdd.push(employeeAdded);

                                    return {
                                        ...prevState,
                                        dataList: dataAdd,
                                        isAlertOpen: true,
                                        msg: message,
                                        severity: 'success'
                                    };
                                });
                            }, 600);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise(resolve => {
                            setTimeout(async () => {
                                resolve();
                                const {_id} = oldData;
                                // Retour pour affichage de msg succès
                                const result = await deleteEmployee(_id);
                                if(result.message) {
                                    setState((prevState) => {
                                        const dataDelete = [...prevState.dataList];

                                        dataDelete.splice(dataDelete.indexOf(oldData), 1);

                                        return {
                                            ...prevState,
                                            dataList: dataDelete,
                                            isAlertOpen: true,
                                            msg: result.message,
                                            severity: 'success'
                                        };
                                    });
                                }
                            }, 600);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(async () => {
                                if(datePickerError) {
                                    reject();
                                    return;
                                }
                                resolve();
                                if(oldData) {
                                    const {_id} = oldData;
                                    // Retour pour affichage de msg succès
                                    const result = await updateEmployee(_id, newData);
                                    setState((prevState) => {
                                        const dataUpdate = [...prevState.dataList];

                                        dataUpdate[dataUpdate.indexOf(oldData)] = newData;

                                        return {
                                            ...prevState,
                                            dataList: dataUpdate,
                                            isAlertOpen: true,
                                            msg: result.message,
                                            severity: 'success'
                                        };
                                    });
                                }
                            }, 600);
                        })
                }}
            />
            <Snackbar
                open={state.isAlertOpen}
                autoHideDuration={4000}
                onClose={handleAlertClose}
                TransitionComponent={SlideTransition}
            >
                <Alert severity={state.severity}>
                    {state.msg}
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
};

export default MaterialTableContainer;
