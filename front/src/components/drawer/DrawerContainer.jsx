
import React from 'react';
import {Link} from 'react-router-dom';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import classnames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import {ChevronLeftIcon, ChevronRightIcon, GroupIcon, HistoryIcon, HomeIcon, IconButton, MailIcon, MenuIcon, PeopleOutlineIcon, PersonIcon} from '../../assets/icons';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    appBar: {
        transition: theme.transitions.create(['width', 'margin'], {
            duration: theme.transitions.duration.leavingScreen,
            easing: theme.transitions.easing.sharp
        }),
        zIndex: theme.zIndex.drawer + 1
    },
    appBarShift: {
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['width', 'margin'], {
            duration: theme.transitions.duration.enteringScreen,
            easing: theme.transitions.easing.sharp
        }),
        width: `calc(100% - ${drawerWidth}px)`
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    drawer: {
        flexShrink: 0,
        whiteSpace: 'nowrap',
        width: drawerWidth
    },
    drawerClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            duration: theme.transitions.duration.leavingScreen,
            easing: theme.transitions.easing.sharp
        }),
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1
        }
    },
    drawerOpen: {
        transition: theme.transitions.create('width', {
            duration: theme.transitions.duration.enteringScreen,
            easing: theme.transitions.easing.sharp
        }),
        width: drawerWidth
    },
    hide: {
        display: 'none'
    },
    link: {
        color: theme.palette.text.primary,
        textDecoration: 'none'
    },
    menuButton: {
        marginRight: 36
    },
    root: {
        display: 'flex'
    },
    toolbar: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar
    }
}));

const getTextLink = text => `/${text.toLowerCase()}`;

const DrawerContainer = ({children}) => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={classnames(classes.appBar, {
                    [classes.appBarShift]: open
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={classnames(classes.menuButton, {
                            [classes.hide]: open
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        XL Burger Back-Office
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={classnames(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open
                })}
                classes={{
                    paper: classnames({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open
                    })
                }}
                open={open}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <Link to="/" className={classes.link}>
                        <ListItem button>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Accueil'} />
                        </ListItem>
                    </Link>
                    {['Administration', 'Teams', 'CRA'].map((text, index) =>
                        <Link to={getTextLink(text)} className={classes.link} key={text}>
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <HistoryIcon /> : <PeopleOutlineIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        </Link>)}
                </List>
                <Divider />
                <List>
                    {['Fournisseurs', 'Clients'].map((text, index) =>
                        <Link to={getTextLink(text)} key={text}>
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <GroupIcon /> : <PersonIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        </Link>)}
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
        </div>
    );
};

export default DrawerContainer;
