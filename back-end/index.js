import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/myLoginRegisterDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.error("Error connecting to DB:", error);
  });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = new mongoose.model("User", userSchema);

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }).then((result) => {
    if (result) {
      if (password === result.password) {
        res.send({ message: "Login Successfull", user: result });
      } else {
        res.send({ message: "Password Incorrect", user: '' });
      }
    } else {
      res.send({ message: "User not Registered", user: '' });
    }
  });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email: email }).then((result) => {
    if (result) {
      res.send({ message: "User already Exist" });
    } else {
      const user = new User({
        name: name,
        email: email,
        password: password,
      });
      user
        .save()
        .then(() => {
          res.send({ message: "Successfully registered" });
        })
        .catch((err) => {
          res.send(err);
        });
    }
  });
});

app.listen(9002, () => {
  console.log("server started at port 9002");
});
