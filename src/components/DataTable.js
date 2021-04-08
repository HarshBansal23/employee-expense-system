import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid, GridToolbar, GridToolbarContainer } from '@material-ui/data-grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Button from '@material-ui/core/Button';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Chip from "@material-ui/core/Chip";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorIcon from "@material-ui/icons/Error";
import Container from '@material-ui/core/Container';
import { Icon } from '@iconify/react';
import currencyInr from '@iconify-icons/mdi/currency-inr';
import DialogContentText from '@material-ui/core/DialogContentText';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions/action';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function AddBtn(props) {
  return (
    <div className={props.add}>
      <Button color="primary">
        <Link to="/add">
          <AddBoxIcon></AddBoxIcon><span className={props.addText}>Add Claim</span></Link>
      </Button>
    </div>
  )
}

const useChipStyles = makeStyles((theme) => ({
  success: {
    backgroundColor: 'green',
    color: 'white',
  },
  warning: {
    backgroundColor: 'orange',
    color: 'white',
  },
  icon: {
    color: 'white',
  }

}));


function StatusChip(props) {

  const classes = useChipStyles()

  return (
    <Chip
      icon={
        props.label.toLowerCase() === "approved" ? (
          <CheckCircleOutlineIcon />
        ) : (
          <ErrorIcon />
        )
      }
      label={props.label}
      classes={{
        icon: classes.icon
      }}
      className={props.label.toLowerCase() === "approved" ? classes.success : classes.warning}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  add: {
    position: 'absolute',
    right: 0
  },
  addText: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  deleteBtn: {
    color: 'red',
  },
  editBtn: {
    color: 'blue',
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function ViewExpenseClaims() {

  const classes = useStyles()

  const dispatch = useDispatch()

  const claims = useSelector(state => state.claims)

  const [openSnack, setOpenSnack] = React.useState(false)

  const [open, setOpen] = React.useState(false)

  const [selected, setSelected] = React.useState(-1)

  const alert = useSelector(state => state.alert)

  const [value, setValue] = React.useState('approve');

  const handleChange = (event) => {
    setValue(event.target.value);

  };

  const handleApprove = () => {
    console.log(value + " claim = " + selected)
    if (value === "approve") {
      dispatch(actions.approvingClaim(selected));
    }
    else {
      dispatch(actions.rejectingClaim(selected));
    }
    setOpen(false)
  }

  // const handleOpenEdit = (id) =>{

  //   console.log("id = " + id)

  //   setSelected(id)
  //   setOpenEdit(true)
  // }

  const handleOpen = (id) => {
    console.log("id = " + id)
    setSelected(id)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbar />
        <AddBtn add={classes.add} addText={classes.addText} />
      </GridToolbarContainer>
    );
  }

  useEffect(() => {
    if (alert) {
      setOpenSnack(true)
    }
  }, [alert]);

  const handleCloseSnack = () => {
    setOpenSnack(false)
  }

  const [rows, setRows] = React.useState([])

  useEffect(() => {
    console.log("dispatching fetch claims...")
    dispatch(actions.fetchExpenseClaims())
  }, [])

  useEffect(() => {
    if (claims !== null && claims !== undefined) {
      const rows = claims.map((claim, i) => {
        return (
          {
            id: claim.expenseCodeId,
            amount: claim.expenseAmount,
            startDate: claim.startDate,
            endDate: claim.endDate,
            status: claim.status,
            expense: claim.expense.expenseType,
            project: claim.project.title,
            action: claim.expenseCodeId + " " + claim.status
          }
        )
      })
      setRows(rows)
    }
  }, [claims])

  const handleDelete = (id) => {
    console.log('deleting id  : ' + id)
    dispatch(actions.deleteExpenseClaim(id))
  }

  const handleEdit = (id) => {
    <Link to={"/edit/" + id}></Link>
  }

  return (

    <Container component="main" maxWidth="l">
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Approve</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select Approve or Reject
          </DialogContentText>
          <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
            <FormControlLabel value="approve" control={<Radio />} label="Approve" />
            <FormControlLabel value="reject" control={<Radio />} label="Reject" />
          </RadioGroup>
          {/* <Edit id={selected} /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleApprove} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      {alert && <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity={alert ? alert.type : 'success'}>
          {alert ? alert.message : 'sample'}
        </Alert>
      </Snackbar>}
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          columns={[
            { field: 'id', headerName: 'Id' },
            {
              field: 'amount', headerName: 'Amount', width: 150,
              renderCell: (params) => (
                <div>
                  <Icon icon={currencyInr} />{params.value}
                </div>
              )
            },
            { field: 'startDate', headerName: 'Start Date', width: 180 },
            { field: 'endDate', headerName: 'End Date', width: 180 },
            {
              field: 'status', headerName: 'Status', width: 150,
              renderCell: (params) => (
                <StatusChip label={params.value} />
              ),
            },
            { field: 'expense', headerName: 'Expense Type', width: 200 },
            { field: 'project', headerName: 'Project Name', width: 200 },
            {
              field: 'action', headerName: 'Actions', width: 150,
              renderCell: (params) => (
                <strong>
                  <Link to="/">
                    <IconButton aria-label="delete" className={classes.deleteBtn} onClick={() => handleDelete(params.value.split(" ")[0])}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Link>
                  <Link to={"/edit/" + params.value.split(" ")[0]}>
                    <IconButton aria-label="Edit" className={classes.editBtn}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Link>
                  { params.value.split(" ")[1].toLowerCase() === 'pending' && <IconButton aria-label="Edit" className={classes.editBtn} onClick={() => handleOpen(params.value.split(" ")[0])}>
                    <EditIcon fontSize="small" />
                  </IconButton>}
                </strong>
              ),
            },
          ]}
          rows={rows}

          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </div>
    </Container>
  )
}