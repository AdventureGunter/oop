/**
 * Created by User on 26.05.2017.
 */
let CustomES5 = require('./CustomArrayES5.js');
let CustomES6 = require('./CustomArrayES6.js');

/*
new CustomES5([1,2,3,4,5])
    .then(res => {
        console.log(res);
        return res;
    })
    .mapAsync(res => res + '1')
    .then(res => console.log(res))
    .catch(err => console.log(err));*/

CustomES6.resolve([1,2,3,4,5]).mapAsync(res => res + '1').then(res => console.log(this));
