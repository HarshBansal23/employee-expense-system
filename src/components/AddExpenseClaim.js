import React, { Component } from 'react'
import { connect,useDispatch,useSelector } from 'react-redux';
import * as actions from '../actions/action'
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
}));
 

 export default function AddExpenseClaim(){

    const classes = useStyles();
    
    const message = useSelector(state => state.message)
    const dispatch = useDispatch()

    const [amount, setAmount] = React.useState(0)
    const [sd, setSd] = React.useState('')
    const [ed, setEd] = React.useState('')

    const addExpenseClaim = () =>{
        console.log("adding")
        console.log("amount = " + amount)
        console.log("startdate = " + sd)
        console.log("enddate = " + ed)

        var claim = {
            amount : parseInt(amount),
            startDate : sd,
            endDate : ed
        }
       // console.log('method for adding expense claim', this.startDate.current.value)
       // console.log('method for adding expense claim', this.endDate.current.value)
       // event.preventDefault();


       // this.props.onAddExpenseClaim({name: this.amount.current.value, startDate: this.startDate.current.value, endDate: this.endDate.current.value});
       
       dispatch(actions.addExpenseClaim(claim))

    }

    const changeDateFormat=(date)=>{

        date = date.split('-')

        return (date[1]+"/"+date[2]+"/"+date[0])

    }

    const handleChange = (e) =>{
        const { name, value } = e.target;
        
        if(name==='amount')
        setAmount(value)
        else if(name==='startDate')
        setSd(changeDateFormat(value))
        else if(name==='endDate')
        setEd(changeDateFormat(value))

    }
    
        return (
            <div>
                
                <div className="alert alert-success" role="alert">
                    {message}
                </div>

                <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Amount</span>
                </div>
                <input type="number" name='amount' className="form-control" placeholder="Enter Amount" aria-describedby="basic-addon1" onChange={handleChange}/>
                </div>

                <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Start Date</span>
                </div>
                <input type="date" name="startDate" className="form-control" placeholder="Enter Start Date" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange}/>
                </div>

                <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">End Date</span>
                </div>
                <input type="date" name="endDate" className="form-control" placeholder="Enter End Date" aria-label="Username" aria-describedby="basic-addon1"  onChange={handleChange}/>
                </div>


                <button type="button" className="btn btn-primary" onClick={addExpenseClaim}>Add Expense Claim</button>
            </div>
        )
    }



// export default AddEmployee;


