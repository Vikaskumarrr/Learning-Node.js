const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const mongoDbSession = require("connect-mongodb-session")(session);

//file-imports
const userModel = require("./userSchema");

//contant
const app = express();
const MONGO_URL = "mongodb+srv://vikas:vikas@cluster0.q8ksl.mongodb.net/augTestDB"

const store = new mongoDbSession({ 
    url : MONGO_URL,
    collection : "sessions",

})

// Middleware
app.use(express.urlencoded({ extended: true })); // Global middleware
app.use(express.json()); // JSON body parser 

app.use(
    session({    
    secret: "This is aug backend module",  
    store : store,
    resave : false,
    saveUninitialized : false , 
    }) 
);

// db connection 

mongoose.connect(MONGO_URL).then(() => {
    console.log("mongoose connected sucessfully");
}).catch((err) => {
    console.log(err);
})


app.get("/", (req, res) => {
    return res.send("Server is running ")
})

//register form
app.get("/register-form", (req , res) => {
    return res.send(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Register Form</h1>
    <form action="/register-user" method="POST">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name"><br>
        <label for="email">email:</label>
        <input type="email" id="email" name="email"><br>
        <label for="password">password:</label>
        <input type="password" id="password" name="password"><br>
        <button type="submit">submit</button>
    </form>
</body>
</html> `);
})

app.post("/register-user", async (req, res) => {
    console.log(req.body);

    const { name, email, password } = req.body;

    try {
        const userDb = await userModel.create({
            //schema : client
            name: name,
            email: email,
            password: password,
        });

        return res.status(201).json({
            message: "User created sucessfully",
            data: userDb
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
});

//login form
app.get("/login-form", (req, res)=>{ 
    return res.send(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Login Form</h1>
    <form action="/login-user" method="POST">
        <label for="email">email:</label>
        <input type="email" id="email" name="email"><br>
        <label for="password">password:</label>
        <input type="password" id="password" name="password"><br>
        <button type="submit">submit</button>
    </form>
</body>
</html> `);
})

app.post("/login-user" , async (req, res)=>{ 

    // find the user with email
    // compare the password
    // seesion base authantication

    console.log(req.body)
    try{ 
        const userDb = await userModel.findOne({email : req.body.email})

        // if user not found
        if(!userDb)
        { 
            return res.status(400).json("User not found please register first")
        }

        // compare password

        if(userDb.password !== req.body.password){ 
            return res.status(400).json("Incorrect password")
        }

        // session 
        console.log(req.session);
        req.session.isAuth = ture ;


        return res.status(200).json("Login succesfully")
    } catch(error)
    { 
        return res.status(500).json({
            message: "Internal server error",
            error: error
     });
    }

})

    app.get('/dashboard', (req , res)=>{ 
        return res.send("Dashboard Page!!!!!");
    })

app.listen(8000, () => {
    console.log("server is runnig PORT:8000")
})
