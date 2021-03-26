import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  head: {
    backgroundColor: red[500],
  },
});

function createData(Amount, StartDate, EndDate, Status) {
  return {
    Amount,
    StartDate,
    EndDate,
    Status,
    Project: [
      { Title: 'bygv', Description: 'dfgbvfdb' , StartDate: '2020-01-05', EndDate: '2021-01-05'}
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.Amount}
        </TableCell>
        <TableCell align="right">{row.StartDate}</TableCell>
        <TableCell align="right">{row.EndDate}</TableCell>
        <TableCell align="right">{row.Status}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Project
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow className={classes.head}>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>StartDate</TableCell>
                    <TableCell align="right">EndDate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.Project.map((projectRow) => (
                    <TableRow key={projectRow.Title}>
                      <TableCell component="th" scope="row">
                        {projectRow.Title}
                      </TableCell>
                      <TableCell>{projectRow.Description}</TableCell>
                      <TableCell>{projectRow.StartDate}</TableCell>
                      <TableCell align="right">{projectRow.EndDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData(50000, '2020-01-05', '2021-01-05', 'Pending'),
  createData(40000, '2020-01-05', '2021-01-05', 'Pending'),
];

export default function DataTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Amount</TableCell>
            <TableCell align="right">StartDate&nbsp;</TableCell>
            <TableCell align="right">EndDate&nbsp;</TableCell>
            <TableCell align="right">Status&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.Amount} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
