# generic-errors

Generic error constructors with common http codes.

Also doesn't pollute the stack with its own depth.

## Usage

Install:

    npm install generic-errors

Require the errors:

    var errors = require('generic-errors');

Use an error:

    var notFound = new errors.NotFound('Couldn't find the thing');

Add additional Properties to the error

    var unprocessable = new errors.Unprocessable({ message: 'Cant Process', fields: ['foo', bar] });


## Available constructors:

    BaseError           // Use to make custom errors, easier to inherit from than Error
    Forbidden           // 403
    NotFound            // 404
    PreconditionFailed  // 412
    Teapot              // 418
    Unauthorised        // 401
    Unprocessable       // 422


## Detection

After serialization Generic Errors can still be detected using the `isGenericError` function attacted to the BaseError constructor.

    var notFound = new errors.NotFound(),
        serializedError = JSON.parse(JSON.stringify(notFound));

    errors.BaseError.isGenericError(serializedError);  // true


