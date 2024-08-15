import express from "express";
import url from "url";
import collection from "./models/user.js";
import path from "path";
import hbs from "hbs";
const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({ extended : false}));
app.use(express.static(path.join(__dirname, 'public')));

const port = 3000;

app.get("/", (req,res)=>{
    res.render("login");
})

app.get("/login", (req,res)=>{
    res.render("login");
})

app.get("/signup", (req,res)=>{
    res.render("signup");
})

app.post("/signup", async (req,res)=>{
     const data = {
        name : req.body.name,
        password : req.body.password
     }

  await collection.insertMany([data]);
  res.render("Home");
});

app.post("/login", async (req,res)=>{

    try{
     const check = await collection.findOne({name : req.body.name});

     if(check.password === req.body.password || check.name === req.body.name){
        res.render("Home");
     }else{
        res.send("Incorrect Password or name");
     }
    }catch{
       res.send("Incorrect name or password")
    }

   
})

app.listen(port , ()=>{
    console.log(`Listening to the port ${port}`);
})