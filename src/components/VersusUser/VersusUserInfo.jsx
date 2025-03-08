import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {},
    tableContainer: {
        '@media (min-width: 640px)': {
            maxWidth: '600px',
        },
    },
    tableHead: {
        '& th': {
            backgroundColor: '#8ba3cf',
            color: 'white',
        },
    },
    tableBody: {
        '& td, & th': {
            backgroundColor: '#f0d6f6',
        },
    }
});

const rows = [];

const VersusUserInfo = ({ userInfo1, userInfo2 }) => {
    const classes = useStyles();

    const createUserData = (userInfo) => ({
        username: userInfo.handle,
        name: `${userInfo.firstName} ${userInfo.lastName}`,
        country: userInfo.country,
        rating: `${userInfo.rating} (${userInfo.rank})`,
        maxRating: `${userInfo.maxRating} (${userInfo.maxRank})`,
        contribution: userInfo.contribution
    });

    const user1 = createUserData(userInfo1);
    const user2 = createUserData(userInfo2);

    rows.splice(0, rows.length);
    rows.push({ name: "Name", data1: user1.name, data2: user2.name });
    rows.push({ name: 'Country', data1: user1.country, data2: user2.country });
    rows.push({ name: 'Rating', data1: user1.rating, data2: user2.rating });
    rows.push({ name: 'Max Rating', data1: user1.maxRating, data2: user2.maxRating });
    rows.push({ name: 'Contribution', data1: user1.contribution, data2: user2.contribution });

    return (
        <div className="p-4 animate-fade-in">
            <TableContainer 
                component={Paper} 
                className={`${classes.tableContainer} shadow-lg rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl dark:bg-dark-secondary`}
            >
                <Table className={classes.table} aria-label="versus user information table">
                    <TableHead>
                        <TableRow className={classes.tableHead}>
                            <TableCell className="font-semibold text-lg">Info of</TableCell>
                            <TableCell align="right" className="font-semibold text-lg">
                                <span className="text-white dark:text-gray-100">{user1.username}</span>
                            </TableCell>
                            <TableCell align="right" className="font-semibold text-lg">
                                <span className="text-white dark:text-gray-100">{user2.username}</span>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.tableBody}>
                        {rows.map((row) => (
                            <TableRow 
                                key={row.name}
                                className="transition-colors duration-200 hover:bg-opacity-90"
                            >
                                <TableCell 
                                    component="th" 
                                    scope="row"
                                    className="font-medium text-gray-800 dark:text-gray-200"
                                >
                                    {row.name}
                                </TableCell>
                                <TableCell 
                                    align="right"
                                    className="text-gray-700 dark:text-gray-300"
                                >
                                    {row.data1}
                                </TableCell>
                                <TableCell 
                                    align="right"
                                    className="text-gray-700 dark:text-gray-300"
                                >
                                    {row.data2}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default VersusUserInfo;
