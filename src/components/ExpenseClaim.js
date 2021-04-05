import React from 'react';
import DataTable from './DataTable.js';
import AddExpenseClaim from './AddExpenseClaim.js';
import EditExpenseClaim from './EditExpenseClaim.js';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default function ExpenseClaim() {
  return (
    <div>
      {/* <div>
        <AddExpenseClaim />
      </div> */}
      {/* <div>
        <EditExpenseClaim />
      </div> */}
      <div>
        <DataTable />
      </div>
    </div>
  );
}
