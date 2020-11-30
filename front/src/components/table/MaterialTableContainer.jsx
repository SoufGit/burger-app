/* eslint-disable react/display-name */
import React, {forwardRef, useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import Alert from '@material-ui/lab/Alert';

import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import {BACK_URL} from '../../Configuration.js';

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
        console.log('errorerrorerror', error);
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
        console.log('errorerrorerror', error);
    }
};

const deleteEmployee = async id => {
    try {
        const response = await fetch(`${BACK_URL}/employees/${id}`, {
            method: 'DELETE'
        });
        return await response.json();
    } catch(error) {
        console.log('errorerrorerror', error);
    }
};

const MaterialTableContainer = () => {

    const [state, setState] = useState({
        columns: [
            {
                field: 'id',
                title: 'ID'
            },
            {
                field: 'name',
                title: 'Nom'
            },
            {
                field: 'entryDate',
                title: 'Date dentrée'
            },
            {
                field: 'outDate',
                title: 'Date de sortie'
            }
        ],
        dataList: [],
        isAlertOpen: false,
        msg: ''
    });

    console.log('STATE', state);

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
                console.log('errorerrorerror', error);
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
    }

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
                        emptyDataSourceMessage: 'Aucune donnée',
                        filterRow: {
                            filterTooltip: 'Filter'
                        }
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
                    onRowAdd: (newData) =>
                        new Promise(resolve => {
                            setTimeout(async () => {
                                resolve();
                                // Retour pour affichage de msg succès
                                const result = await addEmployee(newData);
                                setState((prevState) => {
                                    const dataAdd = [...prevState.dataList];

                                    dataAdd.push(newData);

                                    return {
                                        ...prevState,
                                        dataList: dataAdd,
                                        isAlertOpen: true,
                                        msg: result.message,
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
                                    console.log('resultresultresult', result);
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
                        new Promise((resolve) => {
                            setTimeout(async () => {
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
