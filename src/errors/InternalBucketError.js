const BaseAPIError = require('./BaseAPIError');

class InternalBucketError extends BaseAPIError {
    get message() {
        return 'Internal error when fetching bucket info.';
    }

    get statusCode() {
        return 500;
    }

    get type() {
        return 'https://tools.ietf.org/html/rfc7231#section-6.6.1';
    }
}

module.exports = InternalBucketError;