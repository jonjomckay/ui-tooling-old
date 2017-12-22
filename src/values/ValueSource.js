export default class ValueSource {
    static fetchAll() {
        const request = {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        };

        return fetch('https://staging.manywho.com/api/draw/1/element/value', request)
            .then(response => response.json());
    }
}