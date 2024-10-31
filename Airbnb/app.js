const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
const path = require("path");
const { ppid } = require("process");
const app = express();
const port = 3000;

app.set("view engine", 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true}));

main().then(()=>{
  console.log("Connecting to database");
}).catch((err)=>{
  console.log(err);
});

async function main(){
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

app.get("/", (req,res)=>{
  res.send("Home Page");
});

//INDEX ROUTE
app.get("/listings", async (req,res)=>{
  let allListings = await Listing.find({});
  res.render("listing/index.ejs", { allListings });
});

//CREATE NEW ROUTE
app.get("/listings/new", (req,res)=>{
  res.render("listing/new.ejs");
})

//SHOW ROUTE 
app.get("/listings/:id", async (req,res)=>{
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("listing/show.ejs", { listing });
});

//UPDATE ROUTE
app.post("/listing", async (req,res)=>{
  // let {title, description, image, price, location, country} = req.body;
  // let newListing = new Listing({
  //   title: title,
  //   description: description,
  //   image: image,
  //   price: price,
  //   location: location,
  //   country: country
  // });

  // newListing.save().then((res)=>{
  //   console.log(res);
  // }).catch((err)=>{
  //   console.log(err);
  // });
  // res.redirect("/listings");

  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

app.get("/listing/:id/edit",async (req,res)=>{
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listing/edit.ejs", { listing });
});

app.put("/listings/:id", async (req,res)=>{
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing});
  res.redirect(`/listings/${id}`);
});

app.delete("/listings/:id",async (req,res)=>{
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});

// app.get("/testlisting", async (req,res)=>{
//   let sampleListing = new Listing({
//     title: "My villa",
//     description: "By the beach",
//     price: 1200,
//     location: "Calangute, Goa", 
//     country: "India"
//   });

//   await sampleListing.save();
//   console.log("sample saved");
//   res.send("Sucessful");
// });

app.listen(port, ()=>{
  console.log(`Listening to the port ${port}`);
});