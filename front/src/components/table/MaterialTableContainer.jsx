/* eslint-disable react/display-name */
import React, {forwardRef, useState} from 'react';
import MaterialTable from 'material-table';
const data = require('../../data/data.json');

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
        ]
    });

    return (
        <MaterialTable
            title="Liste des employés"
            columns={state.columns}
            data={data.employeeList}
            icons={tableIcons}
            localization={{
                body: {
                    addTooltip: 'toto',
                    emptyDataSourceMessage: 'No records to display',
                    filterRow: {
                        filterTooltip: 'Filter'
                    }
                },
                header: {
                    actions: 'Actiojjjjns'
                },
                pagination: {
                    labelDisplayedRows: '{from}-{to} of {count}'
                },
                toolbar: {
                    nRowsSelected: '{0} row(s) selected',
                    searchPlaceholder: 'Recherchehkjkkjjk'
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
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const dataAdd = [...prevState.data];

                                dataAdd.push(newData);

                                return {
                                    ...prevState,
                                    dataAdd
                                };
                            });
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const dataDelete = [...prevState.data];

                                dataDelete.splice(dataDelete.indexOf(oldData), 1);

                                return {
                                    ...prevState,
                                    dataDelete
                                };
                            });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            if(oldData) {
                                setState((prevState) => {
                                    const dataUpdate = [...prevState.data];

                                    dataUpdate[dataUpdate.indexOf(oldData)] = newData;

                                    return {
                                        ...prevState,
                                        dataUpdate
                                    };
                                });
                            }
                        }, 600);
                    })
            }}
        />
    );
};

export default MaterialTableContainer;
