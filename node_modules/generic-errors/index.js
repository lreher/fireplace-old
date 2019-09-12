var constructors = {
    BaseError: require('./baseError'),
    Forbidden: require('./forbidden'),
    Unauthorised: require('./unauthorised'),
    NotFound: require('./notFound'),
    Unprocessable: require('./unprocessable'),
    PreconditionFailed: require('./preconditionFailed'),
    Teapot: require('./teapot'),
    Conflict: require('./conflict'),
};

for (var key in constructors) {
    constructors[constructors[key].prototype.code] = constructors[key];
}

module.exports = constructors;
