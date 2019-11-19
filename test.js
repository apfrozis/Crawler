
let async = require('async')


let array = [{a:1}, {a:2}, {a:3}]
let i =0;
let count = 0;

async.until(function(next){
    console.log('test ', i)
    next( null, i == 20)
}, function(next){
    console.log('iteree ', i)
    count ++;
    i +=1;
    next()
},function(err, data){
    console.log('end of until ', count)
})