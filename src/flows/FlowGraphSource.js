export default class FlowGraphSource {
    static fetch(id) {
        const request = {
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN
            }
        };

        return fetch('https://staging.manywho.com/api/draw/1/graph/flow/' + id, request)
            .then(response => response.json());
    }
}