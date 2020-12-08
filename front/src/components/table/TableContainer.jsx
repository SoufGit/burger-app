import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles, useTheme, withStyles} from '@material-ui/core/styles';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import IconButton from '@material-ui/core/IconButton';
import Check from '@material-ui/icons/Check';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import {BACK_URL} from '../../Configuration.js';
import Link from '@material-ui/core/Link';

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5)
    }
}));

const StyledTableCell = withStyles((theme) => ({
    body: {
        fontSize: 14
    },
    head: {
        backgroundColor: '#3f51b5',
        color: theme.palette.common.white
    }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover
        }
    }
}))(TableRow);

const TablePaginationActions = props => {
    const classes = useStyles1();
    const theme = useTheme();
    const {count, page, rowsPerPage, onChangePage} = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
};

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired
};

const createData = ({id, name, entryDate, outDate}) => ({
    entryDate,
    id,
    name,
    outDate
});

const descendingComparator = (aa, bb, orderBy) => {
    if(bb[orderBy] < aa[orderBy]) {
        return -1;
    }
    if(bb[orderBy] > aa[orderBy]) {
        return 1;
    }

    return 0;
};

const getComparator = (order, orderBy) => (order === "desc"
    ? (aa, bb) => descendingComparator(aa, bb, orderBy)
    : (aa, bb) => -descendingComparator(aa, bb, orderBy));

const stableSort = (array, comparator) => {
    console.log('stableSortstableSort', array);
    const stabilizedThis = array.map((el, index) => [el, index]);

    stabilizedThis.sort((aa, bb) => {
        const order = comparator(aa[0], bb[0]);

        if(order !== 0) {
            return order;
        }

        return aa[1] - bb[1];
    });

    return stabilizedThis.map(el => el[0]);
};



const useStyles2 = makeStyles({
    table: {
        minWidth: 500
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1
    }
});

const headCells = [
    {
        disablePadding: false,
        id: 'id',
        label: 'ID',
        numeric: true
    },
    {
        disablePadding: false,
        id: 'name',
        label: 'Nom',
        numeric: false
    },
    {
        disablePadding: false,
        id: 'entryDate',
        label: 'Date dentrée',
        numeric: false,
        type: 'date'
    },
    {
        disablePadding: false,
        id: 'outDate',
        label: 'Date de sortie',
        numeric: false
    },
    {
        disablePadding: false,
        id: 'action',
        label: 'Actions',
        numeric: false
    }
];

// eslint-disable-next-line max-statements
const CustomPaginationActionsTable = () => {
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [dataList, setDataList] = React.useState([]);

    React.useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${BACK_URL}/employees`);
                const dataList = await response.json();
                setDataList(dataList);
            } catch(error) {
                console.log('errorerrorerror', error);
            }
            // ...
        }
        fetchData();
    }, []);

    const rows = dataList.map(item => createData(item)).sort((aa, bb) => (aa.name < bb.name ? -1 : 1));

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - (page * rowsPerPage));

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';

        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const createSortHandler = property => event => {
        handleRequestSort(event, property);
    };

    const convertDate = dateToConvert => {
        const dateConverted = new Date(dateToConvert);
        return dateConverted.toLocaleDateString()
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="custom pagination table">
                <TableHead>
                    <StyledTableRow>
                        {headCells.map(headCell =>
                            <StyledTableCell
                                key={headCell.id}
                                // Align={headCell.numeric ? 'right' : 'left'}
                                padding={headCell.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === headCell.id ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={createSortHandler(headCell.id)}
                                >
                                    {headCell.label}
                                    {orderBy === headCell.id
                                        ? <span className={classes.visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </span>
                                        : null}
                                </TableSortLabel>
                            </StyledTableCell>)}
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {stableSort(rows, getComparator(order, orderBy)).
                        slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).
                        map(row =>
                            <StyledTableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell >
                                    {row.name}
                                </TableCell>
                                <TableCell>
                                    {convertDate(row.entryDate)}
                                </TableCell>
                                <TableCell >
                                    {convertDate(row.outDate)}
                                </TableCell>
                                <TableCell >
                                    <Link color='inherit' href='/employees' onClick={() => {
                                        console.info("I'm a button.");
                                    }}>
                                        <Check />
                                    </Link>
                                </TableCell>
                            </StyledTableRow>)}

                    {emptyRows > 0 &&
                        <StyledTableRow style={{height: 53 * emptyRows}}>
                            <TableCell colSpan={6} />
                        </StyledTableRow>
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[
                                5, 10, 25, {
                                    label: 'Tous',
                                    value: -1
                                }
                            ]}
                            colSpan={3}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {'aria-label': 'ligne / page'},
                                native: true
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer >
    );
};

export default CustomPaginationActionsTable;
