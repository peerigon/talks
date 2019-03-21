// isomorphic-fetch required because of Node.js
import fetch from "isomorphic-fetch";

fetch('//offline-news-api.herokuapp.com/stories')
    .then(response => {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(stories => {
        console.log(stories);
    });
