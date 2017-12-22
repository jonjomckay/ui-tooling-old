export default class TenantSource {
    static fetch() {
        const request = {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        };

        return fetch('https://staging.manywho.com/api/admin/1/tenant', request)
            .then(response => response.json());
    }
}