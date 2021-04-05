import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import * as actions from '../actions/action';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link,useRouteMatch} from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  paper: {
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

export default function EditExpenseClaim({match}) {

    // let id = match.params.id
    // console.log(id)

    const classes = useStyles()

    const claim = useSelector(state => state.claim)

    const [expenseAmount, setAmount] = React.useState(0)
    const [startDate, setSd] = React.useState('')
    const [endDate, setEd] = React.useState('')

    const dispatch = useDispatch();  

    useEffect(() => {
        let id = match.params.id
        console.log(id)
        dispatch(actions.fetchClaim(id))
    },[]);

    useEffect(() => {
        if(claim!=null){
            setAmount(claim.expenseAmount)
            setSd(claim.startDate)
            setEd(claim.endDate)
        }
    },[claim]);

    const changeDateFormat=(date)=>{
        date = date.split('-')
        return (date[1]+"/"+date[2]+"/"+date[0])
    }

    const handleChange = (e) =>{
        const {name,value} = e.target
        if(name==='expenseAmount')
        setAmount(value)
        else if(name==='startDate')
        setSd(value)
        else if(name==='endDate')
        setEd(value)
    }

    const handleSubmit= (e) => {
        e.preventDefault();
        const updateRequest = {
            id: claim.id,
            expenseAmount: expenseAmount,
            startDate: changeDateFormat(startDate),
            endDate: changeDateFormat(endDate)
        }
        dispatch(actions.editClaim(updateRequest)) 
    }

 
    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Edit claim 
            </Typography>
            <form className={classes.form}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                        <TextField name="id" onChange={handleChange} fullWidth required disabled
                            
                            id="id"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="expenseAmount" onChange={handleChange} fullWidth required
                            value={expenseAmount}
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
                        <input type="date" value={startDate} required name="startDate" className="form-control" placeholder="Enter Start Date" onChange={handleChange}/>
                    </Grid>  

                    <Grid item xs={12}>
                        <Typography>End Date</Typography>
                        <input type="date" value={endDate} required name="endDate" className="form-control" placeholder="Enter End Date" aria-label="Username" onChange={handleChange}/>
                    </Grid>

                    <Button type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >Update</Button>
                </Grid>
            </form>
        </div>
    </Container>
    )
}