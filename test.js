



let date = new Date();

let key = ("0" + (date.getDay() + 1)).slice(-2) + ("0" + (date.getMonth() + 1)).slice(-2) + date.getFullYear() 
// let c = ("0" + (date.getMonth() + 1)).slice(-2)


console.log('Var ', key);