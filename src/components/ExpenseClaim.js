import React from 'react';
import DataTable from './DataTable.js';
import AddExpenseClaim from './AddExpenseClaim.js';
import SimpleDialogDemo from './SimpleDialogDemo.js';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function ExpenseClaim() {
    return (
      <div>
        <DataTable />
        {/* <SimpleDialogDemo /> */}
      </div>
    );
  }

