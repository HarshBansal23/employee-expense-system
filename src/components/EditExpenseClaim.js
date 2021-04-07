import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import * as actions from '../actions/action';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { format } from "date-fns";
import {
    Link
} from "react-router-dom";


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
        margin: theme.spacing(3, 4, 2),
    },
}));

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
};

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function EditExpenseClaim({ match }) {

    let id = match.params.id

    const classes = useStyles()

    const alert = useSelector(state => state.alert)

    const claim = useSelector(state => state.claim)

    const [expenseAmount, setAmount] = React.useState(0)
    const [startDate, setSd] = React.useState('')
    const [endDate, setEd] = React.useState('')
    const [openSnack, setOpenSnack] = React.useState(false)
    const [open, setOpen] = React.useState(false)

    const [errors, setErrors] = React.useState({
        expenseAmount: ""
    });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.fetchClaim(id))
    }, []);

    const history = useHistory()
    const handleCancel = () => {
        console.log(history)
        history.goBack()
    }

    useEffect(() => {

        if (alert) {
            setOpen(false)
            setOpenSnack(true)
        }

    }, [alert]);

    const handleCloseSnack = () => {
        setOpenSnack(false)
    }

    useEffect(() => {
        if (claim != null) {
            setAmount(claim.expenseAmount)
            setSd(claim.startDate)
            setEd(claim.endDate)
        }
    }, [claim]);

    const changeDateFormat = (date) => {
        date = date.split('-')
        return (date[1] + "/" + date[2] + "/" + date[0])
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        var err = errors;
        if (name === 'expenseAmount') {
            setAmount(value)
            err.expenseAmount =
                value >= 0 ? "" : "Amount must be greater than Zero!!!";
        }
        else if (name === 'startDate')
            setSd(value)
        else if (name === 'endDate')
            setEd(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const updateRequest = {
            id: id,
            expenseAmount: expenseAmount,
            startDate: changeDateFormat(startDate),
            endDate: changeDateFormat(endDate)
        }
        dispatch(actions.editClaim(updateRequest))
    }


    return (
        <Container component="main" maxWidth="xs">
            <Snackbar
                open={openSnack}
                autoHideDuration={6000}
                onClose={handleCloseSnack}
            >
                <Alert onClose={handleCloseSnack} severity={alert ? alert.type : 'success'}>
                    {alert ? alert.message : 'sample'}
                </Alert>
            </Snackbar>
            <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop>
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Edit claim
                </Typography>
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField name="id" onChange={handleChange} fullWidth required disabled
                                value={id}
                                id="id"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {errors.expenseAmount.length > 0 ? (
                                <TextField name="expenseAmount" onChange={handleChange} fullWidth required
                                    value={expenseAmount}
                                    error
                                    id="amount"
                                    label="Enter Amount"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    onChange={handleChange}
                                    helperText={errors.expenseAmount}
                                />
                            ) : (
                                <TextField
                                    autoComplete="amt"
                                    name="expenseAmount"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="expenseAmount"
                                    label="Expense Amount"
                                    autoFocus
                                    onChange={handleChange}
                                />
                            )}
                        </Grid>

                        <Grid item xs={12}>
                            <Typography>Start Date</Typography>
                            <input
                                type="date"
                                value={startDate} required name="startDate" className="form-control" placeholder="Enter Start Date" onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography>End Date</Typography>
                            <input
                                type="date"
                                value={endDate} required name="endDate" className="form-control" placeholder="Enter End Date" aria-label="Username" onChange={handleChange}
                                min={startDate}
                            />
                        </Grid>
                        <Link to="/">
                            <Button type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={handleSubmit}
                            >Update</Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={handleCancel}
                            >
                                Cancel
                        </Button>
                        </Link>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}