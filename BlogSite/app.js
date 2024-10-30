const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/post.js"); 
const methodOverride = require("method-override");
const path = require("path");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true}));
app.use(methodOverride("_method"));
app.use(express.json());

main().then(()=>{
  console.log("Connection successful");
}).catch((err)=>{
  console.log(err);
});

async function main(){
  await mongoose.connect("mongodb://127.0.0.1:27017/Blog-Post");
}

//INDEX ROUTE
app.get("/posts", async (req,res)=>{
  const posts = await Post.find();
  res.render("index", { posts });
});

//NEW ROUTE
app.get("/posts/new", (req,res)=>{
    res.render("new");
});

//CREATE ROUTE
app.post("/posts", (req,res)=>{
  let { name, content } = req.body;
  let newPost = new Post({
    name:name, 
    content: content,
    created_at: new Date()
  });

  newPost.save().then((res)=>{
    console.log(res)
  }).catch((err)=>{
    console.log(err)
  });

  res.redirect("posts");
});

//EDIT ROUTE
app.get("/posts/:id/edit",async (req,res)=>{
  let { id } = req.params;
  let post = await Post.findById(id);
   res.render("edit", { post });
});

//UPDATE ROUTE
app.put("/posts/:id", async (req,res)=>{
  let { id } = req.params;
  let { content: newContent } = req.body;
  let post = await Post.findByIdAndUpdate(id, { content: newContent}, { runValidators: true}, {new :true});

  res.redirect("/posts");
});

//DELETE ROUTE
app.delete("/posts/:id", async (req,res)=>{
  let { id } = req.params;
  let post = await Post.findByIdAndDelete(id);
  res.redirect("/posts");
})

app.listen(port, ()=>{
  console.log(`Listening to the port ${port}`);
});