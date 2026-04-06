const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"Root@1234",
  database:"college_event"
});

db.connect(err=>{
  if(err) console.log(err);
  else console.log("DB Connected");
});

app.get("/events",(req,res)=>{
  db.query(`
    SELECT e.id,e.name,e.capacity,
    COUNT(r.id) AS registered
    FROM events e
    LEFT JOIN registrations r ON e.id=r.event_id
    GROUP BY e.id
  `,(err,result)=>res.json(result));
});

app.post("/register",(req,res)=>{
  const {name,email,phone,kuid,event_id}=req.body;

  db.query("SELECT COUNT(*) AS count FROM registrations WHERE kuid=?",[kuid],(err,total)=>{
    if(total[0].count>=3) return res.send("Max 3 events allowed");

    db.query("SELECT * FROM registrations WHERE kuid=? AND event_id=?",
    [kuid,event_id],(err,dup)=>{
      if(dup.length>0) return res.send("Already registered");

      db.query("SELECT COUNT(*) AS count FROM registrations WHERE event_id=?",
      [event_id],(err,count)=>{
        db.query("SELECT capacity FROM events WHERE id=?",
        [event_id],(err,cap)=>{
          if(count[0].count>=cap[0].capacity)
            return res.send("Event Full");

          db.query("INSERT INTO registrations (name,email,phone,kuid,event_id) VALUES (?,?,?,?,?)",
          [name,email,phone,kuid,event_id],
          ()=>res.send("Registration Successful"));
        });
      });
    });
  });
});

app.get("/registrations",(req,res)=>{
  db.query(`
    SELECT r.*,e.name AS event_name
    FROM registrations r
    JOIN events e ON r.event_id=e.id
  `,(err,result)=>res.json(result));
});

app.delete("/delete/:id",(req,res)=>{
  db.query("DELETE FROM registrations WHERE id=?",[req.params.id],
  ()=>res.send("Deleted"));
});

app.listen(3000,()=>console.log("Server running"));