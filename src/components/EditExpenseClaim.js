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
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
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
    view: {
        margin: theme.spacing(2, 4, 2, 1),
    },
    cancel: {
        margin: theme.spacing(3, 4, 2, 0),
        bottom: 0,
        left: 0,
    },
    update: {
        margin: theme.spacing(3, 4, 2, 21),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
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

export default function EditExpenseClaim(props) {

    let id = props.id

    const classes = useStyles()

    const alert = useSelector(state => state.alert)

    const claim = useSelector(state => state.claim)

    const updated = useSelector((state) => state.updated);

    const [expenseAmount, setAmount] = React.useState(0)
    const [startDate, setSd] = React.useState(new Date())
    const [endDate, setEd] = React.useState(new Date())
    const [openSnack, setOpenSnack] = React.useState(false)
    const [open, setOpen] = React.useState(false)

    const history = useHistory();

    const [errors, setErrors] = React.useState({
        expenseAmount: ""
    });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.fetchClaim(id))
    }, []);

    useEffect(() => {
        if (updated) {
            console.log(history);
           
            props.handleCancel()
        }
    }, [updated, history]);

    useEffect(() => {
        if (alert && alert.type === "error") {
            setOpen(false);
            setOpenSnack(true);
        }
    }, [alert]);

    const handleCancel = () => {
        console.log(history)
        history.goBack()
    }

    useEffect(() => {
        if (alert && alert.type==='error') {
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
        if (((date.getMonth() + 1) < 10) && (date.getDate() < 10)) {
            return "0" + (date.getMonth() + 1) + "/" + "0" + date.getDate() + "/" + date.getFullYear();
        }
        else if (((date.getMonth() + 1) < 10) && (date.getDate() > 9)) {
            return "0" + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
        }
        else if (((date.getMonth() + 1) > 9) && (date.getDate() < 10)) {
            return (date.getMonth() + 1) + "/" + "0" + date.getDate() + "/" + date.getFullYear();
        }
        else {
            return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
        }
    }

    const handleStartDate = (date) => {
        setSd(changeDateFormat(date));
    };

    const handleEndDate = (date) => {
        setEd(changeDateFormat(date));
    };

    const handleChange = (e) => {
        const { name, value } = e.target
        var err = errors;
        if (name === 'expenseAmount') {
            setAmount(value)
            err.expenseAmount =
                value >= 0 ? "" : "Amount must be greater than Zero!!!";
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm(errors)) {
            if (expenseAmount && startDate && endDate) {
                setOpen(true);
                const updateRequest = {
                    id: id,
                    expenseAmount: expenseAmount,
                    startDate: startDate,
                    endDate: endDate
                };
                dispatch(actions.editClaim(updateRequest));
            } else {
                window.alert("Fields cannot be null");
            }
        } else {
            window.alert("Invalid form");
        }
    };


    return (
        <div>
            <div className={classes.view}>
                <Button color="primary">
                    <Link to="/">
                        View Claims
                    </Link>
                </Button>
            </div>
            <Container component="main" maxWidth="xs">
                {alert && (
                    <Snackbar
                        open={openSnack}
                        autoHideDuration={6000}
                        onClose={handleCloseSnack}
                    >
                        <Alert
                            onClose={handleCloseSnack}
                            severity={alert ? alert.type : "success"}
                        >
                            {alert ? alert.message : "sample"}
                        </Alert>
                    </Snackbar>
                )}
                <Backdrop className={classes.backdrop} open={open}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Edit claim
                </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
                                        value={expenseAmount}
                                        onChange={handleChange}
                                    />
                                )}
                            </Grid>

                            <Grid item xs={12}>
                                <Typography>Start Date</Typography>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker required
                                        fullWidth
                                        id="start date"
                                        value={startDate}
                                        name='startDate'
                                        onChange={handleStartDate}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography>End Date</Typography>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker required
                                        minDate={startDate}
                                        fullWidth
                                        id="end date"
                                        value={endDate}
                                        name='endDate'
                                        onChange={handleEndDate}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.cancel}
                                onClick={handleCancel}
                            >
                                Cancel
                        </Button>
                            <Button type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.update}
                                onClick={handleSubmit}
                            >Update</Button>
                        </Grid>
                    </form>
                </div>
            </Container>
        </div>
    )
}