import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch,useSelector } from 'react-redux';
import * as actions from '../actions/action';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {
    Link
  } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
})); 

export default function AddExpenseClaim(){

    const classes = useStyles();

    // const user = JSON.parse(localStorage.getItem('user'))

    const projects = useSelector((state) => state.projects);
    const [projectList, setProjectList] = React.useState();

    const expenses = useSelector((state) => state.expenses);
    const [expenseList, setExpenseList] = React.useState();
    
    const dispatch = useDispatch()

    const [amount, setAmount] = React.useState(0)
    const [sd, setSd] = React.useState('')
    const [ed, setEd] = React.useState('')
    const [project, setProject] = React.useState('')
    const [expense, setExpense] = React.useState('')

    const addExpenseClaim = () =>{
        console.log("adding")
        console.log("amount = " + amount)
        console.log("startdate = " + sd)
        console.log("enddate = " + ed)
        console.log("project = " + project)
        console.log("expense = " + expense)

        var claim = {
            amount: parseInt(amount),
            startDate: sd,
            endDate: ed,
            expenseId: expense,
            employeeId: 1,
            projectId: project,
        }

        dispatch(actions.addExpenseClaim(claim))
    }

    useEffect(() => {
        dispatch(actions.fetchProjects());
        console.log(projects);
    }, []);

    useEffect(() => {
        if(projects != null){
        let list = projects.map((pro) => {
            return (
                <option value={pro.projectCode}>{pro.title}</option>
            );
        });
        setProjectList(list);}
    }, [projects]);

    useEffect(() => {
        dispatch(actions.fetchExpenses());
        console.log(expenses);
    }, []);

    useEffect(() => {
        if(expenses != null){
            let eList = expenses.map((exp) => {
                return (
                    <option value={exp.expenseCode}>{exp.expenseType}</option>
                );
            });
            setExpenseList(eList);
        }
    }, [expenses]);


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
        else if(name==='project')
        setProject(value)
        else if(name==='expense')
        setExpense(value)
    }
    
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField name="amount" onChange={handleChange}
                                id="amount"
                                label="Enter Amount"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography>Start Date</Typography>
                            <input type="date" name="startDate" className="form-control" placeholder="Enter Start Date" onChange={handleChange}/>
                        </Grid>  

                        <Grid item xs={12}>
                            <Typography>End Date</Typography>
                            <input type="date" name="endDate" className="form-control" placeholder="Enter End Date" onChange={handleChange}/>
                        </Grid>

                        <Grid item xs={12}>
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Expense Type</span>
                            </div>
                            <NativeSelect value={expense} name='expense' onChange={handleChange}>
                                <option aria-label="None" value="" >{'None'}</option>
                                {expenseList}
                            </NativeSelect>
                        </Grid>         

                        <Grid item xs={12}>
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Project</span>
                            </div>
                            <NativeSelect value={project} name='project' onChange={handleChange}>
                                <option aria-label="None" value="" >{'None'}</option>
                                {projectList}
                            </NativeSelect>
                        </Grid>
                    </Grid>

                    <Link to="/">
                        <Button fullWidth variant="contained" color="primary" className={classes.submit} onClick={addExpenseClaim}>Add Expense Claim</Button>
                    </Link>
                </form>
            </div>
        </Container>
    )
}