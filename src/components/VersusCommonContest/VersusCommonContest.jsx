import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
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

const VersusCommonContest = ({ userContest1, userContest2 }) => {
    const classes = useStyles();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // Check if userContest1 and userContest2 are available and not empty
    if (!userContest1 || !userContest2 || userContest1.length === 0 || userContest2.length === 0) {
        return <div>No contest data available</div>;
    }

    const contest1 = new Map(userContest1.map(contest => [contest.contestId, contest]));
    const username1 = userContest1[0].handle;
    const username2 = userContest2[0].handle;

    const rows = userContest2
        .filter(contest2 => contest1.has(contest2.contestId))
        .map(contest2 => {
            const contest1Data = contest1.get(contest2.contestId);
            return {
                name: contest2.contestName,
                user1: contest1Data.rank,
                user2: contest2.rank,
                diff: contest1Data.rank - contest2.rank,
            };
        })
        .reverse();

    const columns = [
        { id: 'name', label: 'Common Contest', minWidth: 170, align: 'left' },
        { id: 'rank1', label: username1, minWidth: 100, align: 'right' },
        { id: 'rank2', label: username2, minWidth: 100, align: 'right' },
        { id: 'diff', label: 'Difference', minWidth: 100, align: 'right' },
    ];

    return (
        <Paper className={`${classes.root} shadow-lg rounded-lg overflow-hidden`}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.tableBody}>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow key={row.name} className={`transition-colors duration-200 ${
                                row.diff > 0 ? 'bg-purple-100' : 'bg-pink-100'
                            }`}>
                                <TableCell component="th" scope="row" className="font-medium text-gray-800">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right" className="text-gray-700">{row.user1}</TableCell>
                                <TableCell align="right" className="text-gray-700">{row.user2}</TableCell>
                                <TableCell align="right" className={`font-semibold ${
                                    row.diff > 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                    {Math.abs(row.diff)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                className="bg-gray-100 text-gray-700"
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default VersusCommonContest;
