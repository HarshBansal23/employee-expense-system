export const saveExpenseClaim = (payload) => {
    return {type: "ADD_EXPENSE_CLAIM", payload: {message: "Successfully added expense!!"}}
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
                // console.log(res.json())
                if(res.status === 201){
                    console.log("success");
                    dispatch(saveExpenseClaim())
                }
            })
        
    }

}

export const findExpenseClaims = (payload) => {
    return {type: "FIND_EXPENSE_CLAIMS", payload}
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

const removeExpenseClaim = (payload) => {
    return { type: "DELETE_EXPENSE_CLAIM", payload };
  };
  
  export const deleteExpenseClaim = (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    return (dispatch) => {
      let message = "";
      fetch("http://localhost:8081/api/v1/expenseClaim/" + id, requestOptions)
        .then((res) => {
          console.log(res);
  
          if (res.status === 200) {
            message = "succesfully deleted expense claim";
          } else message = "failed";
  
          return res.json();
        })
        .then((data) => {
          console.log(data);
          dispatch(removeExpenseClaim({ expenseClaim: data, message }));
        });
    };
  };
  

