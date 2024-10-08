const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose")

//file-imports
const { userDataValidation} = require("./utils/authUtil")
const userModel = require("./models/userModel")

// constants
const app = express();
const PORT = process.env.PORT;

//db connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("mongoDb connected sucesfully.."))
.catch((err)=> console.log(err));

//Middlewares
app.set('view engine','ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json());  

// API's
app.get('/',(req,res)=>{ 
    return res.send("Server is up and running...")
})


app.get('/register',(req,res)=>{ 
    return res.render("registerPage");
})

app.post('/register', async (req,res)=>{ 
    console.log(req.body);

    const {name, username , password} = req.body

    //data validation
    try { 
        await userDataValidation({name , username, password});
    } 
    catch(error){ 
        return res.status(400).json(error);
    }

    const userObj = new userModel({
        name: name,
        username: username,
        password: password
    });

    try { 
        const userDb = await userObj.save();

        return res.status(201).json({
            message: "Register Successfull.",
            data: userDb,
        });
    } catch(error){ 
        return res.status(500).json({ 
            message:"Internal server error",
            error: error,
        })
    }

    return res.send("all Ok..")
})

app.get('/login',(req,res)=>{ 
    return res.render("loginPage");
})



app.listen(PORT, ()=>{ 
    console.log(`server is runnig at http://localhost:${PORT}`);
})