const initialState = {
    jobs: [],
}

const jobReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_DATASET':
            return { ...state, jobs: action }
        default:
            return state
    }
}

export default jobReducer