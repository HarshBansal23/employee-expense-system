const initialState = {
    message: '',
    claims: [
    ]
}

const reducer = (state = initialState, { type, payload }) => {

    // console.log(type);
    switch (type) {
        
    case "ADD_EXPENSE_CLAIM":
        return {message: payload.message, claim: state.claim};

    case "FIND_EXPENSE_CLAIMS":
        console.log(payload)
        return {claims: payload}
    
    default:
        return state
    }
}

export default reducer;


