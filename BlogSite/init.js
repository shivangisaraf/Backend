const mongoose = require("mongoose");
const Post = require("./models/post.js");

main().then(()=>{
  console.log("Connection done");
}).catch((err)=>{
  console.log(err);
});

async function main(){
  await mongoose.connect("mongodb://127.0.0.1/Blog-Post");
}

let allPost = [
  {
    name: "Shyam",
    content: "I love to do research works",
    created_at: new Date()
  },
  {
    name: "Alex",
    content: "I am a web developer",
    created_at: new Date()
  },
  {
    name: "Benjamin",
    content: "I am a scientist",
    created_at: new Date()
  },
]

Post.insertMany(allPost);