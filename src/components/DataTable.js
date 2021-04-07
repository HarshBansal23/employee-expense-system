import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { connect, useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions/action';


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  deleteBtn: {
    color: 'red',
  },
  editBtn: {
    color: 'blue',
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function ViewExpenseClaims() {

  const classes = useStyles()

  const dispatch = useDispatch()

  const claims = useSelector(state => state.claims)

  const [openSnack, setOpenSnack] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  const alert = useSelector(state => state.alert)

  const [rows, setRows] = React.useState([])

  useEffect(() => {
    dispatch(actions.fetchExpenseClaims())
  }, [])

  useEffect(() => {
    if (claims != null) {
      const rows = claims.map((claim, i) => {
        return (
          {
            id: claim.expenseCodeId,
            amount: claim.expenseAmount,
            startDate: claim.startDate,
            endDate: claim.endDate,
            status: claim.status,
            expense: claim.expense.expenseType,
            project: claim.project.title,
            action: claim.expenseCodeId
          }
        )
      })
      setRows(rows)
    }
  }, [claims])

  const handleDelete = (id) => {
    console.log('deleting id  : ' + id)
    dispatch(actions.deleteExpenseClaim(id))
  }

  const handleEdit = (id) => {
    <Link to={"/edit/" + id}></Link>
  }

  return (

    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        columns={[
          { field: 'id', headerName: 'Id' },
          { field: 'amount', headerName: 'Amount', width: 150 },
          { field: 'startDate', headerName: 'Start Date', width: 180 },
          { field: 'endDate', headerName: 'End Date', width: 180 },
          { field: 'status', headerName: 'Status', width: 150 },
          { field: 'expense', headerName: 'Expense Type', width: 200 },
          { field: 'project', headerName: 'Project Name', width: 200 },
          {
            field: 'action', headerName: 'Actions', width: 150,
            renderCell: (params) => (
              <strong>
                <Link to="/">
                  <IconButton aria-label="delete" className={classes.deleteBtn} onClick={() => handleDelete(params.value)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Link>
                <Link to={"/edit/" + params.value}>
                  <IconButton aria-label="Edit" className={classes.editBtn}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Link>
              </strong>
            ),
          },
        ]}
        rows={rows}

        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
  )
}