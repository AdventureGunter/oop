/**
 * Created by User on 26.05.2017.
 */
/**
 * Created by User on 26.05.2017.
 */
class AsyncArray {
    constructor(someObj) {
        this.promise = new Promise(someObj);
        this.resolve = Promise.prototype
    }

    then(resolve, reject) {
        return Promise.then.call(this, resolve, reject);
    }

    catch(reject) {
        return super.catch(reject);
    }

    mapAsync(fn) {
        if (this === void 0 || this === null) {
            throw new TypeError();
        }
        if (typeof fn !== 'function') {
            throw new TypeError(fn + ' is not a function');
        }
        return this.then(data => {
            let res = [];
            if (data === void 0 || data === null) {
                throw new TypeError(data + 'is undefined or null');
            }
            let obj = Object(data);
            for (let x = 0; x < obj.length; x++) {
                if (x in obj) {
                    let mappedValue = fn(obj[x], x, obj);
                    res.push(mappedValue);
                }
            }
            return res;
        })
    }
    mapAsyncConcurrent(fn) {
        if (this === void 0 || this === null) {
            throw new TypeError(this + 'is undefined or null');
        }
        if (typeof fn !== 'function') {
            throw new TypeError(fn + ' is not a function');
        }
        return this.then(data => {
            let res = [];
            if (data === void 0 || data === null) {
                throw new TypeError(data + 'is undefined or null');
            }
            let obj = Object(data);
            for (let x = 0; x < obj.length; x++) {
                res.push(new Promise(cb => cb(fn(obj[x], x, obj))));
            }
            return Promise.all(res);
        })
    }

    filterAsync(fn) {
        if (this === void 0 || this === null) {
            throw new TypeError();
        }
        if (typeof fn !== 'function') {
            throw new TypeError(fn + ' is not a function');
        }
        return this.then(data => {
            let res = [];
            if (data === void 0 || data === null) {
                throw new TypeError(data + 'is undefined or null');
            }
            let obj = Object(data);
            for (let i = 0; i < obj.length; i++) {
                if (i in obj) {
                    if (fn(obj[i], i, obj)) {
                        res.push(obj[i]);
                    }
                }
            }
            return res;
        })
    }

    forEachAsync(fn) {
        if (this === void 0 || this === null) {
            throw new TypeError();
        }
        if (typeof fn !== 'function') {
            throw new TypeError(fn + ' is not a function');
        }
        return this.then(data => {
            if (data === void 0 || data === null) {
                throw new TypeError(data + 'is undefined or null');
            }
            let obj = Object(data);
            for (let x = 0; x < obj.length; x++) {
                fn(obj[x], x, obj);
            }
        })
    }

    forEachAsyncConcurrent(fn) {
        if (this === void 0 || this === null) {
            throw new TypeError(this + 'is undefined or null');
        }
        if (typeof fn !== 'function') {
            throw new TypeError(fn + ' is not a function');
        }
        return this.then(data => {
            let res = [];
            if (data === void 0 || data === null) {
                throw new TypeError(data + 'is undefined or null');
            }
            let obj = Object(data);
            for (let x = 0; x < obj.length; x++) {
                res.push(new Promise(cb => cb(fn(obj[x], x, obj))));
            }
            Promise.all(res);
        })
    }

    reduceAsync(fn, start) {
        if (this === void 0 || this === null) {
            throw new TypeError();
        }
        if (typeof fn !== 'function') {
            throw new TypeError(fn + ' is not a function');
        }
        return this.then(data => {
            if (data === void 0 || data === null) {
                throw new TypeError('data is undefined or null');
            }
            let res = start;
            let obj = Object(data);
            for (let x = 0; x < obj.length; x++) {
                res = fn(res, obj[x], x, obj);
            }
            return res;
        })
    }
}

module.exports = AsyncArray;