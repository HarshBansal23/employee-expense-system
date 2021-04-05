import logo from './logo.svg';
import './App.css';
import ExpenseClaim from './components/ExpenseClaim.js';
import DataTable from './components/DataTable.js';
import AddExpenseClaim from './components/AddExpenseClaim.js';
import EditExpenseClaim from './components/EditExpenseClaim.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <div>
          <Link to="/">View Claims</Link>
        </div>
        <div>
          <Link to="/add">Add Claim</Link>
        </div>
      </div>
        <Switch>
          <Route path="/add">
            <AddExpenseClaim />
          </Route>
          <Route path="/">
            <DataTable />
          </Route>
          <Route path="/edit/:id">
            <EditExpenseClaim />
          </Route>
        </Switch>

    </Router>
  );
}


export default App;
