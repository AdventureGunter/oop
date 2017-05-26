/**
 * Created by User on 26.05.2017.
 */
let customArrayES6 = require('./CustomArrayES6.js');

for (let i = 0; i < 1; i++) {
    customArrayES6.resolve([2, 3, 4, 5, 6, 7, 8, 9, 10])
        .then(result => {console.log(result); return result;})
        .mapAsync(item => item + '1')
        .then(result => {console.log(result); return result;})
        .mapAsyncConcurrent(item => item + '-')
        .then(result => {console.log(result); return result;})
        .filterAsync(item => item !== '61-')
        .then(result => {console.log(result); return result;})
        .reduceAsync((res, item) => res + item + " -- || -- ", 'REDUCE start = ')
        .then(result => console.log(result))
        .catch(err => console.log(err));
    customArrayES6.resolve([2, 3, 4, 5, 6, 7, 8, 9, 10])
        .forEachAsyncConcurrent(item => console.log(item));
    customArrayES6.resolve([2, 3, 4, 5, 6, 7, 8, 9, 10])
        .forEachAsync(item => console.log(item + " aaa"));
}