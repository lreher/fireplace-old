var endOfArgs = {},
    slice = Array.prototype.slice.call.bind(Array.prototype.slice);

function placeholder(transform){
    return {
        transform: transform,
        placeholder: placeholder
    };
}

function shuv(fn){
    var outerArgs = slice(arguments, 1);

    if(typeof fn !== 'function'){
        throw new Error('No or non-function passed to shuv');
    }

    return function(){
        var context = this,
            innerArgs = slice(arguments),
            finalArgs = [],
            append = true;

        for(var i = 0; i < outerArgs.length; i++){
            var outerArg = outerArgs[i];

            if(outerArg === endOfArgs){
                append = false;
                break;
            }

            if(outerArg === placeholder){
                finalArgs.push(innerArgs.shift());
                continue;
            }

            if(outerArg && typeof outerArg === 'object' && 'placeholder' in outerArg){
                var arg = innerArgs.shift(),
                    transform = outerArg.transform,
                    result;

                if(transform != null){
                    if(typeof transform === 'function'){
                        result = transform(arg);
                    }else{
                        result = arg[transform];
                    }
                }

                finalArgs.push(result);

                continue;
            }

            finalArgs.push(outerArg);
        }

        if(append){
            finalArgs = finalArgs.concat(innerArgs);
        }

        return fn.apply(context, finalArgs);
    };
}

shuv._ = placeholder;
shuv.$ = endOfArgs;

module.exports = shuv;