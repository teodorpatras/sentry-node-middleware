const express = require('express');
const app = express();
const Sentry = require('@sentry/node');
const bodyParser = require('body-parser')
const BucketNotFoundError = require('./errors/BucketNotFoundError');
const InternalBucketError = require('./errors/InternalBucketError');
const BaseAPIError = require('./errors/BaseAPIError');

Sentry.init({ dsn: process.env.SENTRY_DSN });

app.use(bodyParser.json())
// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

const getBuckets = (req, res) => {
    return new Promise((resolve, reject) => {
        throw new InternalBucketError({ info: { detail: 'arn:aws:s3:::* not available' }, version: '1.2.3' });
    });
}

app.get('/buckets', async (req, res, next) => {
    try {
        await getBuckets(req, res);
    } catch (e) {
        return next(e);
    }
});

app.use((err, req, res, next) => {
    Sentry.withScope(scope => {
        scope.setExtras(err.data);
        // Sentry.errorHandler handles only errors
        // without statusCode or with statusCode >= 500
        if (err.statusCode >= 500) {
            Sentry.Handlers.errorHandler()(err, req, res, next);
        } else {
            Sentry.captureException(err);
        }
    });
    res.statusCode = err.statusCode ? err.statusCode : 500;
    res.send(err.json);
});

app.listen(3000);
console.log('Server listening on 3000...');
