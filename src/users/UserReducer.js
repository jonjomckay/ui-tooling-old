import update from 'immutability-helper';

const defaultState = {
    token: localStorage.getItem('token')
};

const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'USER_LOGOUT':
            return update(state, {
                token: {
                    $set: ''
                }
            });
        case 'USER_SET_TOKEN':
            return update(state, {
                token: {
                    $set: action.token
                }
            });
        default:
            return state;
    }
};

export default userReducer;