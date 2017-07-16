const SET_USER_DATA = 'SET_USER_DATA';

const initialState = {
    isFetching: false,
    user: {},
};

export default function reducer(state = initialState, action = {}) {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                isFetching: false,
                user: {
                    ...state.user,
                    ...action.user,
                },
            };
        default:
            return state;
    }
}

function receiveUser(user) {
    return {
        type: SET_USER_DATA,
        isFetching: false,
        user,
    };
}

export function setUserData(props) {
    return dispatch => {

        dispatch(receiveUser(props));

    };
}
