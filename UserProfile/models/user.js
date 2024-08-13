import mongoose from "mongoose";

mongoose.connect(`mongodb://127.0.0.1:27017/testapp`);

const userSchema = mongoose.Schema({
    name : String,
    image : String,
    email:  String 
});

const userModel = mongoose.model("user", userSchema);

export default userModel; 