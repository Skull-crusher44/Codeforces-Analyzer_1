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

export default function UserInfo({ userInfo, username }) {
  const classes = useStyles();

  let name = userInfo.firstName + " " + userInfo.lastName;
  let country = userInfo.country;
  let rating = userInfo.rating + '(' + userInfo.rank + ')';
  let maxRating = userInfo.maxRating + '(' + userInfo.maxRank + ')';
  let contribution = userInfo.contribution;

  rows.splice(0, rows.length);
  rows.push({ name: "Name", data: name });
  rows.push({ name: 'Country', data: country });
  rows.push({ name: 'Rating', data: rating });
  rows.push({ name: 'Max Rating', data: maxRating });
  rows.push({ name: 'Contribution', data: contribution });

  return (
    <div className="p-4 animate-fade-in">
      <TableContainer 
        component={Paper} 
        className={`${classes.tableContainer} shadow-lg rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl dark:bg-dark-secondary`}
      >
        <Table className={classes.table} aria-label="user information table">
          <TableHead>
            <TableRow className={classes.tableHead}>
              <TableCell className="font-semibold text-lg">Info of</TableCell>
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
                  className="text-gray-700 dark:text-gray-300"
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
