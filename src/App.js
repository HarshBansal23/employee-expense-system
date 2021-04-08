import logo from './logo.svg';
import './App.css';
import DataTable from './components/DataTable.js';
import AddExpenseClaim from './components/AddExpenseClaim.js';
import EditExpenseClaim from './components/EditExpenseClaim.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/add" component={AddExpenseClaim}>
        </Route>
        <Route path="/edit/:id" component={EditExpenseClaim}>
        </Route>
        <Route path="/" component={DataTable}>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;