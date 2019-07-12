/*
 * Base API Error class to be extended by specialized error classes.
 *
 * Example error class with a static message:
 *
    class BadRequest extends BaseAPIError {
       get message() {
           return "Bad request.";
       }

       get code() {
           return HttpStatusCodes.BAD_REQUEST;
       }
        
       get type() {
        return "http://www.iana.org/assignments/http-status-codes#400";
      }
   }
 *
 * Example error class with a dynamic message:
 *
   class BucketNotFound extends BaseAPIError {
      constructor(bucketType) {
          super();
          this.bucketType = bucketType;
      }

      get message() {
          return `Bucket of type ${this.bucketType} not found.`;
      }

      get code() {
          return HttpStatusCodes.NOT_FOUND;
      }
      
      get type() {
        return "http://www.iana.org/assignments/http-status-codes#404";
      }
   }
 *
 */
class BaseAPIError extends Error {

    constructor(meta) {
        super();
        this.meta = meta;
    }

    get name() {
        return this.constructor.name;
    }

    get statusCode() {
        throw new Error("Must be overriden by subclasses!");
    }

    get message() {
        throw new Error("Must be overriden by subclasses!");
    }

    get type() {
        throw new Error("Must be overriden by subclasses!");
    }

    get data() {
        return {
            statusCode: this.statusCode,
            type: this.type,
            title: this.message,
            meta: this.meta
        };
    }

    get json() {
        return {
            statusCode: this.statusCode,
            type: this.type,
            title: this.message
        };
    }
}

module.exports = BaseAPIError;