const express=require("express")
const app=express()
const mysql=require("mysql")
app.use(express.urlencoded({extended: false}));

app.use(express.json());
app.set('views', './views');
app.set('view engine', 'ejs');
const port=process.env.PORT||8000
var connection = mysql.createConnection({
    host: "ranvijay.chxinhoqrcbf.us-east-1.rds.amazonaws.com",
    user: "ranvijay",
    password: "ranvijay123",
    port: 3306,
    database: "db",             
  });
  
  connection.connect(function (err) {
    if (err) { 
      console.error("Database connection failed: " + err.stack);
      return;
    }
   
    console.log("Connected to database.");
  });


app.get("/",(req,res)=>{
    res.render("home") 
})
app.get("/guest",(req,res)=>{
    res.render("guest")
})
app.get("/care", (req, res) => {
    connection.query("select * from feedback", (err, obj) => {
      console.log(obj);
      res.render("care", { obj: obj });
    });
  });
  app.post("/saveComp", (req, res) => {
    console.log(req.body);
    connection.query(
      "insert into feedback (name,complaint) values (?,?)",
      [req.body.name, req.body.complaint],
      (err, obj) => {
        console.log("inserted");
  
        res.render("home");
      }
    );
  });
app.listen(port, function() {
    console.log("Server started on port 8000");
});