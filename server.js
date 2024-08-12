const express = require('express')

const fun = (req , res , next) =>{ 
    console.log("hii1");
    next();
}

const fun2 = (req , res , next) =>{ 
    console.log("hii 2 ");
    next();
}

const app = express();

app.use(express.urlencoded({ extended: true })); // Globale middleware


app.get('/',(req ,  res)=>{ 
    return res.send("Server is up and running..")
})
 
app.get('/get-form' , (req , res) =>{ 
    return res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
    <h1>User Form</h1>
    <form action='/create-user' method='POST'>
        <label>name <input type="text" placeholder="username"></label><br>
        <label>"username" <input type="email" placeholder="email"></label><br>
        <label>"password" <input type="password" placeholder="username"></label><br>
        <button type="submit">submit</button>
        
    </form>

</body>
</html>`);
});



app.post("/create-user" , (req, res)=>{ 
    console.log(req.body)
    return res.send("form submit succesfully");
});

app.get('/dashbord' , fun , fun2,  (req, res)=>{ 
    console.log("hii 3");
    return res.send("Middleware is working..")
})

app.listen(8001 , () =>{ 
    console.log("Server is running on PORT:8001")
});