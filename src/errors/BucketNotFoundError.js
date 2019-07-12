const BaseAPIError = require('./BaseAPIError');

class BucketNotFoundError extends BaseAPIError {
    get message() {
        return 'This is not the bucket you are looking for.';
    }

    get statusCode() {
        return 404;
    }

    get type() {
        return 'https://tools.ietf.org/html/rfc7231#section-6.5.4';
    }
}

module.exports = BucketNotFoundError;