import mongoose from "mongoose";

mongoose.connect(`mongodb://127.0.0.1:27017/registerhere`).then(() => {
    console.log(`Connection successful`);
}).catch((e) => {
    console.log(`No connection`);
});

const loginSchema = mongoose.Schema({
    name: String,
    password : String
});

const collection = new mongoose.model("collection1", loginSchema);

export default collection;

