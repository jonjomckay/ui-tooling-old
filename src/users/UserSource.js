export default class UserSource {
    static fetchAll() {
        const request = {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        };

        return fetch('https://staging.manywho.com/api/admin/1/users', request)
            .then(response => response.json());
    }

    static fetchMe() {
        const request = {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        };

        return fetch('https://staging.manywho.com/api/admin/1/users/me', request)
            .then(response => response.json());
    }
}