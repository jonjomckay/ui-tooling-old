export const logout = () => {
    localStorage.removeItem('token');

    return {
        type: 'USER_LOGOUT'
    };
};

export const setToken = (token) => {
    localStorage.setItem('token', token);

    return {
        type: 'USER_SET_TOKEN',
        token
    };
};