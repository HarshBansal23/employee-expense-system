import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Link
} from "react-router-dom";
import { connect,useDispatch,useSelector  } from 'react-redux';
import * as actions from '../actions/action';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  deleteBtn:{
    color : 'red',
  }
}));


export default function ViewExpenseClaims(){

  const classes = useStyles()
  
  const dispatch = useDispatch()
 
  const claims = useSelector(state => state.claims)

  const [rows, setRows] = React.useState([])

  useEffect(()=>{
    dispatch(actions.fetchExpenseClaims())
  },[])

  useEffect(()=>{
    const rows = claims.map((claim, i) => {
      return (
        { id: claim.expenseCodeId,
          amount: claim.expenseAmount,
          startDate: claim.startDate,
          endDate: claim.endDate,
          status: claim.status,
          expense: claim.expense.expenseType,
          project: claim.project.title,
          action : claim.expenseCodeId
        }
      )
    })
    setRows(rows)
  },[claims])

  const handleDelete = (id) =>{
    console.log('deleting id  : ' + id)
    dispatch(actions.deleteExpenseClaim(id))
  }
    
    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          columns={[
            { field: 'id',headerName: 'Id'},
            { field: 'amount', headerName: 'Amount', width: 150 },
            { field: 'startDate', headerName: 'Start Date', width: 200 },
            { field: 'endDate', headerName: 'End Date', width: 200 },
            { field: 'status', headerName: 'Status', width: 200 },
            { field: 'expense', headerName: 'Expense', width: 200 },
            { field: 'project', headerName: 'Project', width: 200 },
            { field: 'action', headerName: 'Action', 
            renderCell: (params) => (
              <IconButton aria-label="delete" className={classes.deleteBtn } onClick={() => handleDelete(params.value)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
            ),},
          ]}
          rows={rows}
 
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
    )
}