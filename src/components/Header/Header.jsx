import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        // marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        // fontSize:12 rem
    },
    btn: {
        marginRight: 20,
        fontSize: 12,
        color: 'white',
    },
    navLink: {
        textDecoration: 'none',
    },
    active: {
        backgroundColor: 'red',
        textDecoration: 'none',
    },
    appBar: {
        transition: 'background-color 0.2s ease',
    }
}));

const Header = () => {
    const classes = useStyles();

    return (
        <div className={`${classes.root} shadow-lg`}>
            <AppBar 
                position="static" 
                className={classes.appBar}
            >
                <Toolbar className="container mx-auto px-4">
                    <Typography variant="h6" className={`${classes.title} md:text-xl`}>
                        Codeforces Analyzer
                    </Typography>
                    <div className="hidden md:flex items-center space-x-2">
                        <Link to="/Codeforces-Analyzer/" className={classes.navLink}>
                            <Button 
                                color="inherit" 
                                className={`${classes.btn} hover:bg-opacity-20 hover:bg-white transition-colors duration-200`}
                            >
                                <PersonIcon className="mr-2" />
                                Single User
                            </Button>
                        </Link>
                        <Link to="/Codeforces-Analyzer/versus" className={classes.navLink}>
                            <Button 
                                color="inherit" 
                                className={`${classes.btn} hover:bg-opacity-20 hover:bg-white transition-colors duration-200`}
                            >
                                <PeopleIcon className="mr-2" />
                                Versus
                            </Button>
                        </Link>
                    </div>
                    
                    {/* Mobile Navigation */}
                    <div className="md:hidden flex items-center space-x-1">
                        <Link to="/Codeforces-Analyzer/" className={classes.navLink}>
                            <Button color="inherit" className="min-w-0 p-2">
                                <PersonIcon />
                            </Button>
                        </Link>
                        <Link to="/Codeforces-Analyzer/versus" className={classes.navLink}>
                            <Button color="inherit" className="min-w-0 p-2">
                                <PeopleIcon />
                            </Button>
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;
