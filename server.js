const express = require('express')
const app = express();

// Creating the api 

app.get('/home',(req , res)=>{ 
    console.log("hii from api");
    return res.send("Server is up and running....")
})

// Making the query 

app.get('/api' , (req, res)=>{ 
    console.log(req.query);
    // console.log(req.query.key.split(","));
    return res.send("Query is working..")
})

// params 
app.get('/profile/:api1' , (req , res)=>{ 
    console.log(req.params);
return res.send("param are shwoing..")
})

app.get('/profile/:api1/:api2' , (req , res)=>{ 
        console.log(req.params);
    return res.send("param are shwoing..")
})

app.listen(8000 ,()=>{ 
    console.log("Server is runing on PORT:8000");
});