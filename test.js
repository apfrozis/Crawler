


	let date = new Date();
    // let key = '090920201'
    let key = ("0" + (date.getDate() + 1)).slice(-2) + ("0" + (date.getMonth() + 1)).slice(-2) + date.getFullYear() 


console.log('Var ', key );