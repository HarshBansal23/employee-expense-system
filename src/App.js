import logo from './logo.svg';
import './App.css';
import ExpenseClaim from './components/ExpenseClaim.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (

            <ExpenseClaim />

  );
}

export default App;
