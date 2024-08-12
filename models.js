const fun = () => { 
    console.log("fun1 is exporting") 
}
const fun1 = () => { 
    console.log("fun2  --  is exporting") 
}

module.exports = {fun ,fun1} ;  
