export const saveExpenseClaim = (claim) => {
  return { type: "ADD_EXPENSE_CLAIM", payload: { claim, added: true, alert: { type: 'success', message: "Successfully added expense claim!!" } } }
}

export const addExpenseClaim = (claim) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(claim)
  };

  return dispatch => {
    let code = 0;
    fetch('http://localhost:8081/api/v1/expenseClaim/', requestOptions)
      .then(res => {
        code = res.status
        if (res.status !== 201) {
          return res.text()
        }
        return res.json()
      })
      .then(res => {
        console.log(res)
        if (code === 201)
          dispatch(saveExpenseClaim(res));
        else
          return Promise.reject(res)
      })
      .catch((error) => {
        console.error('Error:', error);
        dispatch({ type: "ADD_EXPENSE_CLAIM_FAILED", payload: { alert: { type: 'error', message: error } } })
      });
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
      }).catch((error) => {
        console.error('Error:', error);
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


export const updateClaim = (type, alert) => {
  return { type, payload: { alert } }
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
    let code = 0
    fetch('http://localhost:8081/api/v1/expenseClaim/', requestOptions)
      .then(res => {
        console.log(res);
        code = res.status;
        if (code !== 204) {
          return res.text()
        }
        dispatch(updateClaim('UPDATE_CLAIM', { type: 'success', message: 'updated claim successfully' }));
      })
      .then(res => {
        if (code !== 204)
          return Promise.reject(res)
      })
      .catch((error) => {
        dispatch(updateClaim('UPDATE_CLAIM_FAILED', { type: 'error', message: error }));
      });
  }
}


const removeExpenseClaim = (id) => {
  return { type: "DELETE_EXPENSE_CLAIM", payload: { id, alert: { type: 'success', message: 'Claim deleted!' } } };
};

export const deleteExpenseClaim = (id) => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  return (dispatch) => {
    fetch("http://localhost:8081/api/v1/expenseClaim/" + id, requestOptions)
      .then((res) => {
        if (res.status !== 204)
          return Promise.reject("Couldn't delete!");
        dispatch(removeExpenseClaim(id));
      })
      .catch((error) => {
        console.error('Error:', error);
        dispatch({ type: "DELETE_EXPENSE_CLAIM_FAILED", payload: { alert: { type: 'error', message: error } } })
      });
  };
};


export const approveClaim = (id) => {
  return { type: "APPROVE_CLAIM", payload: { id, alert: { type: 'success', message: 'Approve claim successfully' } } }
}

export const approvingClaim = (id) => {
  console.log("claim id : " + id)
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(id)
  };

  return dispatch => {
    let code = 0
    fetch('http://localhost:8081/api/v1/expenseClaim/approve/' + id, requestOptions)
      .then(res => {
        console.log(res);
        code = res.status;
        if (code !== 200) {
          return res.text()
        }
        dispatch(approveClaim(id));
      })
      .then(res => {
        if (code !== 200)
          return Promise.reject(res)
      })
      .catch((error) => {
        console.log("error in approving")
      });
  }
}


export const rejectClaim = (id) => {
  return { type: "REJECT_CLAIM", payload: { id, alert: { type: 'success', message: 'Claim Rejected' } } }
}

export const rejectingClaim = (id) => {
  console.log("claim id : " + id)
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(id)
  };

  return dispatch => {
    let code = 0
    fetch('http://localhost:8081/api/v1/expenseClaim/reject/' + id, requestOptions)
      .then(res => {
        console.log(res);
        code = res.status;
        if (code !== 200) {
          return res.text()
        }
        dispatch(rejectClaim(id));
      })
      .then(res => {
        if (code !== 200)
          return Promise.reject(res)
      })
      .catch((error) => {
        console.log("error in rejecting")
      });
  }
}