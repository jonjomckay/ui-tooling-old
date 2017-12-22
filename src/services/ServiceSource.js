export default class ServiceSource {
    static fetchAll() {
        const request = {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        };

        return fetch('https://staging.manywho.com/api/draw/1/element/service', request)
            .then(response => response.json());
    }
}