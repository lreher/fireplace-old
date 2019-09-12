var test = require('tape'),
    errors = require('../');

function testDeflateInflate(t, error, name, expecedString){
    var originalString = JSON.stringify(error),
        inflatedError = new errors[error.code](JSON.parse(originalString)),
        newString = JSON.stringify(inflatedError);

     t.equal(JSON.stringify(error), expecedString, name + ' stringifys correctly');

    t.equal(originalString, newString, name + ' serialises correctly');
}

function testErrorSetup(ErrorConstructor, name){
    var error = new ErrorConstructor(),
        fileName = ErrorConstructor.name.substring(0, 1).toLowerCase() +
            ErrorConstructor.name.substring(1) + '.js';

    test('check ' + name + ' passes instanceof', function(t){
        t.plan(3);
        t.ok(error instanceof Error, name + ' is instance of Error');
        t.ok(error instanceof errors.BaseError, name + ' is instance of BaseError');
        t.ok(error instanceof ErrorConstructor, name + ' is instance of ' + ErrorConstructor.name);
    });

    test('check ' + name + ' passes isGenericError' , function(t){
        t.plan(2);
        t.ok(errors.BaseError.isGenericError(error), name + ' is a GenericError');
        t.ok(errors.BaseError.isGenericError(JSON.parse(JSON.stringify(error))), name + ' is a GenericError after serialization');
    });

    test('check ' + name + ' has truncated stack correctly', function(t){
        t.plan(2);
        t.ok(error.stack, name + ' has a stack');
        t.notOk(~error.stack.indexOf(fileName), name + ' stack trace should be trimmed');
    });

    test('check ' + name + ' has correct message and valueOf', function(t){
        t.plan(3);
        t.equal(error.message, ErrorConstructor.prototype.code + ': ' + ErrorConstructor.name, name + ' message defaulted correctly');
        t.equal(error.toString(), ErrorConstructor.prototype.code + ': ' + ErrorConstructor.name, name + ' toString is set correctly');
        t.equal(error.valueOf(), error, name + ' valueOf returns the instance');
    });

    test('check ' + name + ' has codes setup correctly', function(t){
        t.plan(3);
        t.ok(error.code, name + ' has a code: ' + error.code);
        t.equal(error.code, ErrorConstructor.prototype.code, name + ' has correct code');
        t.equal(errors[ErrorConstructor.prototype.code], ErrorConstructor, name + ' has constructor exposed as code');
    });
}

function testSerialisation(ErrorConstructor, name){
    var testMessage = 'TEST ERROR',
        testData = {foo: 'bar'},
        testDataWithMessage = {things: 'stuff', message: 'majigger'},
        error = new ErrorConstructor(),
        errorWithMessage = new ErrorConstructor(testMessage),
        errorWithData = new ErrorConstructor(testData),
        errorWithDataAndMessage = new ErrorConstructor(testDataWithMessage);

    test('check ' + name + ' serialises correctly without parameters', function(t){
        t.plan(2);
        testDeflateInflate(
            t,
            error,
            name,
            '{"__genericError":true,"message":"' +
                error.toString() + '","code":' +
                ErrorConstructor.prototype.code + '}'
            );
    });

    test('check ' + name + ' serialises correctly with a message', function(t){
        t.plan(4);

        t.equal(errorWithMessage.message, testMessage, name + ' message set correctly');
        t.equal(errorWithMessage.toString(), testMessage, name + ' toString correctly returns message');

        testDeflateInflate(
            t,
            errorWithMessage,
            name,
            '{"__genericError":true,"message":"' +
                testMessage + '","code":' +
                ErrorConstructor.prototype.code + '}'
            );
    });

    test('check ' + name + ' serialises correctly with data and default message', function(t){
        t.plan(4);

        t.equal(errorWithData.message, error.toString(), name + ' message set correctly with data and default message');
        t.equal(errorWithData.toString(), ErrorConstructor.prototype.code + ': ' + ErrorConstructor.name, name + ' toString returns correct message with data and default message');

        testDeflateInflate(
            t,
            errorWithData,
            name,
            '{"__genericError":true,"foo":"bar","message":"' +
                error.toString() + '","code":' +
                ErrorConstructor.prototype.code + '}'
            );
    });

    test('check ' + name + ' serialises correctly with data and message', function(t){
        t.plan(4);

        t.equal(errorWithDataAndMessage.message, testDataWithMessage.message, name + ' message set correctly with data and message');
        t.equal(errorWithDataAndMessage.toString(), testDataWithMessage.message, name + ' toString returns correct message with data and message');

        testDeflateInflate(
            t,
            errorWithDataAndMessage,
            name,
            '{"__genericError":true,"things":"stuff","message":"' +
                testDataWithMessage.message + '","code":' +
                ErrorConstructor.prototype.code + '}'
            );
    });
}

function runErrorTests(ErrorConstructor, name){
    testErrorSetup(ErrorConstructor, name);
    testSerialisation(ErrorConstructor, name);
}

for(var key in errors){
    if(isNaN(key)){
        runErrorTests(errors[key], key);
    }
}

