export default class TenantSource {
    static fetch() {
        const request = {
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN
            }
        };

        return fetch('https://staging.manywho.com/api/admin/1/tenant', request)
            .then(response => response.json());
    }
}