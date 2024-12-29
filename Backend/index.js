const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const {v4: uuidv4 } = require("uuid");
const app = express();

const PORT = 8080;

app.use(cors());  //The cors middleware automatically adds the necessary headers to allow cross-origin requests
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// creating connection to the Database
const connection = mysql.createConnection({
    host: "localhost",
    user:"root",
    database:"finance_Tracker_DB",
    password:"MySQL@123"
})


// fetching user data for login
app.get("/", (req, res)=>{
    let q = `SELECT *FROM user`;
    try{
        connection.query(q, (err, users)=>{
            if(err) throw err;
            res.status(200).json(users);
        })
    }catch(err){
        res.status(400);
    }
})

// storing user data-- register
app.post("/", (req,res)=>{
    let id = uuidv4();
    let {username, email, password} = req.body;
    let q = `INSERT INTO user (id, username, email,password) VALUES ('${id}', '${username}', '${email}', '${password}')`;
    try{
        connection.query(q, (err, result)=>{
            if(err) throw err;
            res.status(201).json({
                message : "User added successfully!",
                ok:true
            })
        })
    }catch(err){
        res.status(500).json({
            message:"An error occurred while adding the user",
            ok : false
        })
    }
})

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
})