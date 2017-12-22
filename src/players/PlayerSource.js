export default class PlayerSource {
    static fetchAll() {
        const request = {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        };

        return fetch('https://staging.manywho.com/07f799a4-af7c-449b-ba7c-f1f526f7000a/player', request)
            .then(response => response.json());
    }

    static fetch = (player) => {
        const request = {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        };

        return fetch('https://staging.manywho.com/07f799a4-af7c-449b-ba7c-f1f526f7000a/play/' + player, request)
            .then(response => response.text());
    };

    static save = (player, content) => {
        const request = {
            body: '=' + encodeURIComponent(content),
            headers: {
                'Authorization': localStorage.getItem('token'),
                'content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            method: 'POST'
        };

        return fetch('https://staging.manywho.com/07f799a4-af7c-449b-ba7c-f1f526f7000a/play/' + player, request)
            .then(response => response.text());
    };
}