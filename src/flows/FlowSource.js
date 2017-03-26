export default class FlowSource {
    static fetch(id) {
        const request = {
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN
            }
        };

        return fetch('https://staging.manywho.com/api/draw/1/flow/' + id, request)
            .then(response => response.json());
    }

    static fetchAll() {
        const request = {
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN
            }
        };

        return fetch('https://staging.manywho.com/api/draw/1/flow', request)
            .then(response => response.json());
    }
}