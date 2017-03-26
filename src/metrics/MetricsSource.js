export default class MetricsSource {
    static get(token, endpoint) {
        const request = {
            headers: {
                'Authorization': token
            }
        };

        return fetch('https://staging.manywho.com/api/metrics/1' + endpoint, request)
            .then(response => response.json());
    }
}