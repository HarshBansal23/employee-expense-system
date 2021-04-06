const initialState = {
    claims: [],
    projects: [],
    expenses: [],
}

const reducer = (state = initialState, { type, payload }) => {

    switch (type) {
        
    case "ADD_EXPENSE_CLAIM":
        return {claims: state.claims, expenses: state.expenses, projects : state.projects};

    case "FIND_PROJECTS":
        console.log(payload)
        return {claims: state.claims, projects: payload,expenses : state.expenses}

    case "FIND_EXPENSES":
        console.log(payload)
        return {claims: state.claims, expenses: payload, projects : state.projects}     

    case "FIND_EXPENSE_CLAIMS":
        console.log(payload)
        return {claims: payload, expenses: payload, projects : state.projects}

    case "UPDATE_CLAIM":
        return { updated: true};

    case "DELETE_EXPENSE_CLAIM":
        let filteredList = state.claims.filter((claim) => {
            if(claim.id !== payload.id){
                return claim;
            }
        })
        return { claims: filteredList }
    
    default:
        return state
    }
}

export default reducer;