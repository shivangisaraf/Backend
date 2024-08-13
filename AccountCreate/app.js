import express from "express";
import userModel from "./models/user.js";
import postModel from "./models/post.js";
import path from "path";
import url from "url";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
 
const app = express();
const port = 3000;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use(express.static(path.join(__dirname, 'public')));


app.get("/", (req,res)=>{
    res.render("index");
})

app.get("/login", (req,res)=>{
    res.render("login");
})

app.post("/register", async (req,res)=>{
    let {name, username, age, email, password} = req.body;

    let user = await userModel.findOne({email});
    if(user) return res.status(500).send("User already Registered");
     
    bcrypt.genSalt(10, (err,salt)=>{
        bcrypt.hash(password, salt, async (err,hash)=>{
             let user = await userModel.create({
                username,
                name,
                email,
                age,
                password : hash
            });

            let token = jwt.sign({email: email, userid: user._id}, "shhhh");
            res.cookie("token", token);
            res.send("Registered")
        })
    })

})

app.post("/login", async (req,res)=>{
    let { email, password } = req.body;

    let user = await userModel.findOne({email});
    if(!user) return res.status(500).send("User already Registered");
     
    bcrypt.compare(password, user.password, (err,result)=>{
        if(result){
            let token = jwt.sign({email: email, userid: user._id}, "shhhh");
            res.cookie("token", token);
            res.status(200).send("you can log in");
        }
        else res.redirect("/login");
    })

});

app.get("/profile", isLoggedIn, (req,res)=>{
    res.render('login')
})

app.get("/logout", (req,res)=>{
    res.cookie("token", "");
    res.redirect("/login");
})

function isLoggedIn (req, res, next){
    if(req.cookies.token === "") res.send("You must be logged in");
    else{
        let data = jwt.verify(req.cookies.token, "shhhh");
        req.user =  data; 
    }
    next();
}

app.listen(port, ()=>{
    console.log(`Listening to the port ${port}`);
})