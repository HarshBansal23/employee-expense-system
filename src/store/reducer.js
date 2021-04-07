const initialState = {
    claims: [],
    projects: [],
    expenses: [],
}

const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case "ADD_EXPENSE_CLAIM":
            let list = [...state.claims, payload.claim]
            return { claims: list, expenses: state.expenses, projects: state.projects, alert: payload.alert, added: true};

        case "ADD_EXPENSE_CLAIM_FAILED":
            return {
                alert: payload.alert,
            };

        case "FIND_PROJECTS":
            return { claims: state.claims, projects: payload, expenses: state.expenses }

        case "FIND_EXPENSES":
            return { claims: state.claims, expenses: payload, projects: state.projects }

        case "FIND_EXPENSE_CLAIMS":
            return { claims: payload, expenses: payload, projects: state.projects, message: "" }

        case "UPDATE_CLAIM":
            return { updated: true, alert: payload.alert };

        case "UPDATE_CLAIM_FAILED":
            return { claim: state.claim, alert: payload.alert };

        case "DELETE_EXPENSE_CLAIM":
            let filteredList = state.claims.filter(
                (claim) => claim.expenseCodeId !== parseInt(payload.id)
            );
            return { claims: filteredList, alert: payload.alert }

        case "DELETE_EXPENSE_CLAIM_FAILED":
            return { claims: state.claims, alert: payload.alert };

        default:
            return state;
    }
}

export default reducer;