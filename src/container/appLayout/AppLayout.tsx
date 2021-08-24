import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Collapse from '@material-ui/core/Collapse';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

interface Props {
    dawerOpen?: boolean;
    consultantOpen?: boolean;
    shopOpen?: boolean;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        '& > *': {
            backgroundColor: '#2C2C34',
            color: '#FFFFFB',
        },
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    listItem: {
        '&:hover': {
            backgroundColor: '#3F51B5',
        },
    },
    active: {
        backgroundColor: '#3F51B5',
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const AppLayout: React.FC<Props> = ({
    dawerOpen,
    consultantOpen,
    shopOpen,
    children,
}): React.ReactElement => {
    const location = useLocation();
    const history = useHistory();

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(dawerOpen || false);
    const [openConsultant, setOpenConsultant] = React.useState(consultantOpen || false);
    const [openShop, setOpenShop] = React.useState(shopOpen || false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const logoutHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        localStorage.removeItem('token');
        history.push('/');
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar style={{ display: 'flex' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap style={{ flex: 1 }}>
                        {location?.pathname?.split('/')?.pop()?.toUpperCase()}
                    </Typography>
                    <Button endIcon={<ExitToAppIcon />} color="inherit" onClick={logoutHandler}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton style={{ color: '#FFFFFB' }} onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>

                <Divider style={{ backgroundColor: '#FFFFFB' }} />

                <List>
                    <Link to="/dashboard">
                        <ListItem
                            button
                            className={[
                                classes.listItem,
                                location.pathname.includes('dashboard') && classes.active,
                            ].join(' ')}
                        >
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                    </Link>

                    <ListItem button onClick={() => setOpenConsultant(!openConsultant)}>
                        <ListItemText primary="Consultant" />
                        {openConsultant ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openConsultant} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Link to="/appointments">
                                <ListItem
                                    button
                                    className={[
                                        classes.nested,
                                        classes.listItem,
                                        location.pathname.includes('appointments') &&
                                            classes.active,
                                    ].join(' ')}
                                >
                                    <ListItemText primary="Appointments" />
                                </ListItem>
                            </Link>

                            <Link to="/designations and services">
                                <ListItem
                                    button
                                    className={[
                                        classes.nested,
                                        classes.listItem,
                                        location.pathname.includes('designations') &&
                                            classes.active,
                                    ].join(' ')}
                                >
                                    <ListItemText primary="Designations & Services" />
                                </ListItem>
                            </Link>

                            <Link to="/consultants">
                                <ListItem
                                    button
                                    className={[
                                        classes.nested,
                                        classes.listItem,
                                        location.pathname.includes('consultants') && classes.active,
                                    ].join(' ')}
                                >
                                    <ListItemText primary="All Consultants" />
                                </ListItem>
                            </Link>
                        </List>
                    </Collapse>

                    <Link to="/tips and tricks">
                        <ListItem
                            button
                            className={[
                                classes.listItem,
                                location.pathname.includes('tips') && classes.active,
                            ].join(' ')}
                        >
                            <ListItemText primary="Tips & Tricks" />
                        </ListItem>
                    </Link>

                    <Link to="/pin videos">
                        <ListItem
                            button
                            className={[
                                classes.listItem,
                                location.pathname.includes('videos') && classes.active,
                            ].join(' ')}
                        >
                            <ListItemText primary="Pin Videos" />
                        </ListItem>
                    </Link>

                    <Link to="/light exercises">
                        <ListItem
                            button
                            className={[
                                classes.listItem,
                                location.pathname.includes('exercises') && classes.active,
                            ].join(' ')}
                        >
                            <ListItemText primary="Light Exercises" />
                        </ListItem>
                    </Link>

                    <Link to="/music">
                        <ListItem
                            button
                            className={[
                                classes.listItem,
                                location.pathname.includes('music') && classes.active,
                            ].join(' ')}
                        >
                            <ListItemText primary="Music" />
                        </ListItem>
                    </Link>

                    <ListItem button onClick={() => setOpenShop(!openShop)}>
                        <ListItemText primary="Shop" />
                        {openShop ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openShop} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Link to="/products">
                                <ListItem
                                    button
                                    className={[
                                        classes.nested,
                                        classes.listItem,
                                        location.pathname.includes('products') && classes.active,
                                    ].join(' ')}
                                >
                                    <ListItemText primary="Products" />
                                </ListItem>
                            </Link>

                            <Link to="/orders">
                                <ListItem
                                    button
                                    className={[
                                        classes.nested,
                                        classes.listItem,
                                        location.pathname.includes('order') && classes.active,
                                    ].join(' ')}
                                >
                                    <ListItemText primary="Orders" />
                                </ListItem>
                            </Link>
                        </List>
                    </Collapse>

                    <Link to="/notification">
                        <ListItem
                            button
                            className={[
                                classes.listItem,
                                location.pathname.includes('notification') && classes.active,
                            ].join(' ')}
                        >
                            <ListItemText primary="Send Notification" />
                        </ListItem>
                    </Link>

                    <Link to="/faq">
                        <ListItem
                            button
                            className={[
                                classes.listItem,
                                location.pathname.includes('faq') && classes.active,
                            ].join(' ')}
                        >
                            <ListItemText primary="FAQ" />
                        </ListItem>
                    </Link>

                    <Link to="/terms and conditions">
                        <ListItem
                            button
                            className={[
                                classes.listItem,
                                location.pathname.includes('conditions') && classes.active,
                            ].join(' ')}
                        >
                            <ListItemText primary="Terms and Conditions" />
                        </ListItem>
                    </Link>

                    <Link to="/privacy and policy">
                        <ListItem
                            button
                            className={[
                                classes.listItem,
                                location.pathname.includes('policy') && classes.active,
                            ].join(' ')}
                        >
                            <ListItemText primary="Privacy and Policy" />
                        </ListItem>
                    </Link>
                </List>
            </Drawer>

            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                {children}
            </main>
        </div>
    );
};

export default AppLayout;
