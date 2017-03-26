export default class FlowElementSource {
    static create = (flow, editingToken, element) => {
        const request = {
            body: JSON.stringify(element),
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN,
                'Content-Type': 'application/json'
            },
            method: 'POST'
        };

        return fetch('https://staging.manywho.com/api/draw/1/flow/' + flow + '/' + editingToken + '/element/map', request)
            .then(response => response.json());
    };
}