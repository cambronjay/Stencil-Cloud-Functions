'use strict';
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Unsplash = require('unsplash-js').default;
const unsplash = new Unsplash({ accessKey: "3831e59ad01ee4cdce431285c5c45fbed3c531cd7aaa67219f56383462ca777e", timeout: 1000 });
const cors = require('cors')({
    origin: true,
});
admin.initializeApp(functions.config().firebase);
// const axios = require('axios').default;
// const instance = axios.create();

exports.LoadPictures = functions.https.onRequest((request, response) => {
    if (request.method !== 'GET') {
        return response.status(403).send('Forbidden!');
    }
    return cors(request, response, () => {
        const page = request.query.page;
        try {
            const g = unsplash.search.photos("mountains", page, 15, { orientation: "portrait" })
                .then(toJson)
                .then(json => {
                    return response.status(200).send(json);
                })
                .catch((error) => {
                    response.sendStatus(500);
                });
        } catch (error) {
            response.sendStatus(500);
        }
    });
});