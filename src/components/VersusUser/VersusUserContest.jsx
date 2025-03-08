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

const VersusUserContest = ({ userContest1, userContest2 }) => {
    const classes = useStyles();
    
    let username1 = userContest1.length > 0 ? userContest1[0].handle : '';
    let username2 = userContest2.length > 0 ? userContest2[0].handle : '';
    
    userContest1 = Array.from(userContest1);
    userContest2 = Array.from(userContest2);

    const calculateStats = (contests) => ({
        bestRank: Math.min(...contests.map(item => item.rank)),
        worstRank: Math.max(...contests.map(item => item.rank)),
        maxUp: Math.max(...contests.map(item => item.newRating - item.oldRating)),
        maxDown: Math.min(...contests.map(item => item.newRating - item.oldRating))
    });

    const stats1 = calculateStats(userContest1);
    const stats2 = calculateStats(userContest2);

    rows.splice(0, rows.length);
    rows.push({ name: "No of contests", data1: userContest1.length, data2: userContest2.length });
    rows.push({ name: 'Best Rank', data1: stats1.bestRank, data2: stats2.bestRank });
    rows.push({ name: 'Worst Rank', data1: stats1.worstRank, data2: stats2.worstRank });
    rows.push({ name: 'Max Up', data1: stats1.maxUp, data2: stats2.maxUp });
    rows.push({ name: 'Max Down', data1: stats1.maxDown, data2: stats2.maxDown });

    return (
        <div className="p-4 animate-fade-in">
            <TableContainer 
                component={Paper} 
                className={`${classes.tableContainer} shadow-lg rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl dark:bg-dark-secondary`}
            >
                <Table className={classes.table} aria-label="versus contest statistics table">
                    <TableHead>
                        <TableRow className={classes.tableHead}>
                            <TableCell className="font-semibold text-lg">Contests of</TableCell>
                            <TableCell align="right" className="font-semibold text-lg">
                                <span className="text-white dark:text-gray-100">{username1}</span>
                            </TableCell>
                            <TableCell align="right" className="font-semibold text-lg">
                                <span className="text-white dark:text-gray-100">{username2}</span>
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
                                    className={`text-gray-700 dark:text-gray-300 ${
                                        row.name === 'Max Up' ? 'text-green-600 dark:text-green-400' :
                                        row.name === 'Max Down' ? 'text-red-600 dark:text-red-400' : ''
                                    }`}
                                >
                                    {row.data1}
                                </TableCell>
                                <TableCell 
                                    align="right"
                                    className={`text-gray-700 dark:text-gray-300 ${
                                        row.name === 'Max Up' ? 'text-green-600 dark:text-green-400' :
                                        row.name === 'Max Down' ? 'text-red-600 dark:text-red-400' : ''
                                    }`}
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

export default VersusUserContest;
