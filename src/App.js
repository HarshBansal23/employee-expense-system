import logo from './logo.svg';
import './App.css';
import ExpenseClaim from './components/ExpenseClaim.js';
import DataTable from './components/DataTable.js';
import AddExpenseClaim from './components/AddExpenseClaim.js';
import EditExpenseClaim from './components/EditExpenseClaim.js';
import Button from '@material-ui/core/Button';
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
        <Button color="primary">
          <Link to="/">View Claims</Link>
          </Button>
        </div>
        <div>
        <Button color="primary">
          <Link to="/add">Add Claim</Link>
          </Button>
        </div>
      </div>
        <Switch>
          <Route path="/add">
            <AddExpenseClaim />
          </Route>
          <Route path="/edit/:id" component={EditExpenseClaim}>
          </Route>
          <Route path="/">
            <DataTable />
          </Route>
        </Switch>

    </Router>
  );
}


export default App;
