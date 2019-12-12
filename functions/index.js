'use strict';
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({
    origin: true,
});
admin.initializeApp(functions.config().firebase);
const axios = require('axios').default;
const token = "3831e59ad01ee4cdce431285c5c45fbed3c531cd7aaa67219f56383462ca777e";
const instance = axios.create();

exports.LoadPictures = functions.https.onRequest((request, response) => {
    if (request.method !== 'GET') {
        return response.status(403).send('Forbidden!');
    }
    return cors(request, response, () => {
        const page = request.query.page;
        try {
            const g = instance.get(`https://api.unsplash.com/search/photos/?client_id=3831e59ad01ee4cdce431285c5c45fbed3c531cd7aaa67219f56383462ca777e&page=${page}&query=mountains`)
                .then((data) => {
                    return response.status(200).send(data.data);
                })
                .catch((error) => {
                    response.sendStatus(500);
                })
        } catch (error) {
            response.sendStatus(500);
        }
    });
});