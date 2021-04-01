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

    case "DELETE_EXPENSE_CLAIM":
            var filteredList = state.claims.filter((claim)=>{
                if(claim.id != payload.id){
                    return claim;
                }
            })
            console.log(filteredList)
            return { claims: filteredList }
    
    default:
        return state
    }
}

export default reducer;


