import React, { Component } from 'react';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import {
  Link
} from "react-router-dom";
import { connect,useDispatch,useSelector  } from 'react-redux';
import * as actions from '../actions/action';

class ViewExpenseClaims extends Component {

  constructor(){
      super();
      this.state = {claims: []}
  }

  componentDidMount() {
    this.props.onFetchExpenseClaims()
  }

  render() {

    const rows = this.props.claims.map((claim, i) => {

      return (
        { id: claim.expenseCodeId,
          amount: claim.expenseAmount,
          startDate: claim.startDate,
          endDate: claim.endDate,
          status: claim.status,
          expense: claim.expense.expenseType,
          project: claim.project.projectDescription,
        }
      )
    })

    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          columns={[
            { field: 'id',headerName: 'Id', hide: true },
            { field: 'amount', headerName: 'Amount', width: 200 },
            { field: 'startDate', headerName: 'Start Date', width: 200 },
            { field: 'endDate', headerName: 'End Date', width: 200 },
            { field: 'status', headerName: 'Status', width: 200 },
            { field: 'expense', headerName: 'Expense', width: 200 },
            { field: 'project', headerName: 'Project', width: 200 },
          ]}
          rows={rows}
 
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    claims: state.claims
  }
}

const mapDispatchToState = (dispatch) => {
  return {
      onFetchExpenseClaims: () => dispatch(actions.fetchExpenseClaims())
  }
}

export default connect(mapStateToProps, mapDispatchToState)(ViewExpenseClaims);