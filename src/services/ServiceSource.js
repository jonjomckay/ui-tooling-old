export default class ServiceSource {
    static fetchAll() {
        const request = {
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN
            }
        };

        return fetch('https://staging.manywho.com/api/draw/1/element/service', request)
            .then(response => response.json());
    }
}