export default class FlowSource {
    static fetch(id) {
        const request = {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        };

        return fetch('https://staging.manywho.com/api/draw/1/flow/' + id, request)
            .then(response => response.json());
    }

    static fetchAll() {
        const request = {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        };

        return fetch('https://staging.manywho.com/api/draw/1/flow', request)
            .then(response => response.json());
    }
}