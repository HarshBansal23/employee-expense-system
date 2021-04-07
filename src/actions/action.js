export const saveExpenseClaim = (payload) => {
  return { type: "ADD_EXPENSE_CLAIM", payload: { alert: { type: 'success', message: "Successfully added expense claim!!" } } }
}

export const addExpenseClaim = (payload) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  };

  return dispatch => {
    fetch('http://localhost:8081/api/v1/expenseClaim/', requestOptions)
      .then(res => {
        console.log(res)
        if (res.status === 201) {
          console.log("success");
          dispatch(saveExpenseClaim())
        }
      })
  }
}


const findClaim = (claim) => {
  return { type: "FIND_CLAIM", payload: { claim } }
}

export const fetchClaim = (id) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  };

  return dispatch => {
    fetch('http://localhost:8081/api/v1/expenseClaim/' + id, requestOptions)
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(data => {
        console.log(data);
        dispatch(findClaim(data));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}


export const findExpenseClaims = (payload) => {
  return { type: "FIND_EXPENSE_CLAIMS", payload }
}

export const fetchExpenseClaims = () => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  return dispatch => {
    fetch('http://localhost:8081/api/v1/expenseClaims/', requestOptions)
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(data => {
        console.log(data);
        dispatch(findExpenseClaims(data));
      })
  }
}


export const findProjects = (payload) => {
  return { type: "FIND_PROJECTS", payload }
}

export const fetchProjects = () => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  return dispatch => {
    fetch('http://localhost:8081/api/v1/projects/', requestOptions)
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(data => {
        console.log(data);
        dispatch(findProjects(data));
      })
  }
}


export const findExpenses = (payload) => {
  return { type: "FIND_EXPENSES", payload }
}

export const fetchExpenses = () => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  return dispatch => {
    fetch('http://localhost:8081/api/v1/expenses/', requestOptions)
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(data => {
        console.log(data);
        dispatch(findExpenses(data));
      })
  }
}


export const updateClaim = () => {
  return { type: "UPDATE_CLAIM", payload: { alert: { type: 'success', message: "Successfully update expense claim!!" } } }
}

export const editClaim = (updateRequest) => {
  console.log("claim: " + updateRequest)
  console.log("claim id : " + updateRequest.id)
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateRequest)
  };

  return dispatch => {
    fetch('http://localhost:8081/api/v1/expenseClaim/', requestOptions)
      .then(res => {
        console.log(res);
        dispatch(updateClaim());
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}


const removeExpenseClaim = (payload) => {
  return { type: "DELETE_EXPENSE_CLAIM", payload };
};

export const deleteExpenseClaim = (id) => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  return (dispatch) => {
    fetch("http://localhost:8081/api/v1/expenseClaim/" + id, requestOptions)
      .then((res) => {
        console.log(res);
        dispatch(removeExpenseClaim(id));
      })
      .catch((error) => {
        console.error('Error');
      });
  };
};