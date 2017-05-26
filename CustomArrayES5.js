function AsyncArrayES5(arr) {
    if (Array.isArray(arr)){
        this.promise =  new Promise(function (resolve, reject) {
            resolve(arr);
        })
    }
    else this.promise = new Promise(arr);
}


AsyncArrayES5.prototype.then = function (resolve, reject) {
    this.promise = Promise.prototype.then.call(this.promise, resolve, reject);
    return this;
};



AsyncArrayES5.prototype.catch = function(reject) {
    this.promise = Promise.prototype.catch.call(this, reject);
    return this;
};



AsyncArrayES5.prototype.mapAsync = function(fn) {
    if (this === void 0 || this === null) {
        throw new TypeError();
    }
    if (typeof fn !== 'function') {
        throw new TypeError(fn + ' is not a function');
    }
    return this.then(function(data) {
        //console.log(data);
        if (data === void 0 || data === null) {
            throw new TypeError(data + 'is undefined or null');
        }
        var res = [];

        return Array.from(data).reduce(function(promise, item, index, array) {
            return promise.then(function () {res.push(fn(item, index, array))})
        }, Promise.resolve())
            .then(function () {return res});
    });
};

AsyncArrayES5.prototype.mapAsyncConcurrent = function(fn) {
    if (this === void 0 || this === null) {
        throw new TypeError();
    }
    if (typeof fn !== 'function') {
        throw new TypeError(fn + ' is not a function');
    }
    return Promise.prototype.then(function(data) {
        if (data === void 0 || data === null) {
            throw new TypeError(data + 'is undefined or null');
        }
        var res = [];
        for (var y = 0; y < data.length; y++){
            res.push(new Promise(function(promRes) {
                promRes(fn(data[y], y, data));
            }));
        }
        return Promise.all(res);
    });
};

AsyncArrayES5.prototype.filterAsync = function(fn) {
    if (this === void 0 || this === null) {
        throw new TypeError();
    }
    if (typeof fn !== 'function') {
        throw new TypeError(fn + ' is not a function');
    }
    return this.then(function(data) {
        if (data === void 0 || data === null) {
            throw new TypeError(data + 'is undefined or null');
        }
        var res = [];

        return Array.from(data).reduce(function(promise, item, index, array) {
                return promise.then(function() {
                    if (fn(item, index, array)) {
                        return res.push(item);
                    }
                })
            }
            , Promise.resolve())
            .then(function () {return res});
    });
};

AsyncArrayES5.prototype.forEachAsync = function(fn) {
    if (this === void 0 || this === null) {
        throw new TypeError();
    }
    if (typeof fn !== 'function') {
        throw new TypeError(fn + ' is not a function');
    }
    return this.then(function(data) {
        if (data === void 0 || data === null) {
            throw new TypeError(data + 'is undefined or null');
        }
        return Array.from(data).reduce(function (promise, item, index, arr) {
            return promise.then(function () {return fn(item, index, arr)});
        }, Promise.resolve());
    });
};

AsyncArrayES5.prototype.forEachAsyncConcurrent = function(fn) {
    if (this === void 0 || this === null) {
        throw new TypeError();
    }
    if (typeof fn !== 'function') {
        throw new TypeError(fn + ' is not a function');
    }
    return this.then(function(data) {
        if (data === void 0 || data === null) {
            throw new TypeError(data + 'is undefined or null');
        }
        var res = [];
        for (var y = 0; y < data.length; y++){
            res.push(new Promise(function(promRes) {
                promRes(fn(data[y], y, data));
            }));
        }
        return Promise.all(res)
            .then(function () {
                return data;
            });
    });
};

AsyncArrayES5.prototype.reduceAsync = function(fn, start) {
    if (this === void 0 || this === null) {
        throw new TypeError();
    }
    if (typeof fn !== 'function') {
        throw new TypeError(fn + ' is not a function');
    }
    return this.then(function(data) {
        if (data === void 0 || data === null) {
            throw new TypeError(data + 'is undefined or null');
        }
        var res = start;

        return Array.from(data).reduce(function(promise, item, index, array) {
            return promise.then(function() {
                res = fn(res, item, index, array);
            })
        }, Promise.resolve())
            .then(function() {
                return res;
            });
    });
};

module.exports = AsyncArrayES5;