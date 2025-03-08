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

export default function UserContest({ userContest, username }) {
  const classes = useStyles();

  userContest = Array.from(userContest);
  let bestRank = Math.min.apply(null, userContest.map(item => item.rank));
  let worstRank = Math.max.apply(null, userContest.map(item => item.rank));
  let maxUp = Math.max.apply(null, userContest.map(item => item.newRating - item.oldRating));
  let maxDown = Math.min.apply(null, userContest.map(item => item.newRating - item.oldRating));

  rows.splice(0, rows.length);
  rows.push({ name: "No of contests", data: userContest.length });
  rows.push({ name: 'Best Rank', data: bestRank });
  rows.push({ name: 'Worst Rank', data: worstRank });
  rows.push({ name: 'Max Up', data: maxUp });
  rows.push({ name: 'Max Down', data: maxDown });

  return (
    <div className="p-4 animate-fade-in">
      <TableContainer 
        component={Paper} 
        className={`${classes.tableContainer} shadow-lg rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl dark:bg-dark-secondary`}
      >
        <Table className={classes.table} aria-label="contest statistics table">
          <TableHead>
            <TableRow className={classes.tableHead}>
              <TableCell className="font-semibold text-lg">Contests of</TableCell>
              <TableCell align="right" className="font-semibold text-lg">
                <span className="text-white dark:text-gray-100">{username}</span>
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
                  {row.data}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
