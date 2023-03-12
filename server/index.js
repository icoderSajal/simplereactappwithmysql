const express =require("express");
const app =express();
const bodyParser =require("body-parser");
const mysql = require("mysql2")
const cors =require("cors");
const db =mysql.createPool({
    host:"localhost",
    user:"root",
    password:"root",
    database:"curd_contact"
})
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
// api for get te data 
app.get("/api/get",(req,resp)=>{
    const sqlGet="SELECT * FROM contact_db";
    db.query(sqlGet,(error,result)=>{
        resp.send(result);
    })
})
// api for get te data 
app.post("/api/post",(req,resp)=>{
    const{name,email,contact}= req.body;
    const sqlInsert="INSERT INTO contact_db (name,email,contact) VALUES(?,?,?)";
    db.query(sqlInsert,[name,email,contact],(error,result)=>{
        if(error)
        {
            console.log(error)
        }
    })
})


///For deleted 
app.delete("/api/remove/:id",(req,resp)=>{
    const{id}= req.params;
    const sqlRemove="DELETE FROM  contact_db WHERE id= ?";
    db.query(sqlRemove ,id,(error,result)=>{
        if(error)
        {
            console.log(error)
        }
    })
})

/// get the data for update

app.get("/api/get/:id",(req,resp)=>{
    const {id}= req.params;
    const sqlGet="SELECT * FROM contact_db WHERE id=?";
    db.query(sqlGet,id,(error,result)=>{
        if(error)
        {
            console.log(error);
        }
        resp.send(result);
    })
})

// update

app.put("/api/update/:id",(req,resp)=>{
    const {id}= req.params;
    const{name,email,contact}= req.body;
    const sqlUpdate="UPDATE contact_db  SET name=?,email=?,contact=? WHERE id=?";
    db.query(sqlUpdate,[name,email,contact,id],(error,result)=>{
        if(error)
        {
            console.log(error);
        }
        resp.send(result);
    })
})
//app.("/api/post",(req,resp)=>{
    // const sqlInsert="INSERT INTO contact_db (name,email,contact) VALUES('sajal','sajal@gmail.com',9205448629)";
    // db.query(sqlInsert,(err,result)=>{
    //     console.log("error",err);
    //     console.log("result",result);
    //     resp.send("Hello Express");
    // })
    
//})

app.listen(5000,()=>{
    console.log("server is running on port 5000")
})
