import express from "express";
const app = express();
import path from "path";
import url from "url";
import userModel from "./models/user.js";
const port = 3000;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req,res)=>{
    res.render("index");
})

app.get("/read", async (req,res)=>{
    let readUser = await userModel.find();
    res.render("read", {users : readUser});
})

app.get("/edit/:userid", async (req,res)=>{
    let user = await userModel.findOne();
    res.render("edit", {user});
})

app.post("/update/:userid", async (req,res)=>{
    let {name, email, image} = req.body;
    let user = await userModel.findOneAndUpdate({_id: req.params.userid},{image, email, name }, {new: true});
    res.redirect("/read");
})

app.post("/create", async (req,res)=>{
    let {name, email, image} = req.body;

     let createdUser = await userModel.create({
       name,
       email,
       image
    });
    res.redirect("/read");
})

app.get("/delete/:id", async (req,res)=>{
   let deletedUser = await userModel.findOneAndDelete({_id :req.params.id});
   res.redirect("/read");
})

app.listen(port, ()=>{
    console.log(`Listening to the port ${port}`);
})