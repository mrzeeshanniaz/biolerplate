const express = require("express");
const logger = require('morgan');
const cors = require('cors');
const mongoose = require("mongoose");

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//use cors to allow cross origin resource sharing
app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

const port = 5000;
mongoose.connect('mongodb://localhost:27017/userDB');

const userSchema = {
    name:String
}

const User = mongoose.model("User",userSchema);


const user1 = new User({
    name:"Admin1"
});

const user2 = new User({
    name:"Admin2"
});

const defaultUsers = [user1,user2];
User.insertMany(defaultUsers,err => {
    if(err){
        console.log(err)
    }else{
        console.log("insertion suceess")
    }
});


app.get("/users", (req,res)=>{
    User.find({}, (err,users)=>{
        res.send(JSON.stringify(users))
    });
});

  app.post('/create', function(req, res) {});

app.listen(port,()=>{
    console.log("server is running on port " + port);
});
