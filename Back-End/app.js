const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000;
const User = require("./User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Post = require("./Posts");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// function to generate random string for secret key in jwt token
const generateRandomString = (length) => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_";
  let randomString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset[randomIndex];
  }
  return randomString;
};

const secretKey = generateRandomString(64);

const generateToken = (user) => {
  return jwt.sign({ username: user.username }, secretKey, {
    expiresIn: "2h",
  });
};

mongoose
  .connect("mongodb://localhost:27017/GeorgianFoods")
  .then(() => {
    console.log("Succesfully Connected To MongoDB");
  })
  .catch((err) => {
    console.log("Error with MongoDB connection", err);
  });

app.post("/register", (req, res) => {
  const { username, gmail, password } = req.body;

  User.findOne({ $or: [{ username }, { gmail }] }).then((existingUser) => {
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "ასეთი მომხმარებელი უკვე არსებობს" });
    }

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.error("Error hashing password", err);
        return res
          .status(500)
          .json({ message: "მოხდა რაღაც შეცდომა სერვერზე" });
      }

      const newUser = new User({
        username,
        gmail,
        password: hash,
      });

      newUser
        .save()
        .then(() => {
          console.log("User Registered Succesfully");
          res.status(200).json({ message: "რეგისტრაცია დასრულდა წარმატებით" });
        })
        .catch((err) => {
          console.log("Internal server error", err);
          res.status(500).json({
            message:
              "მოხდა რაღაც შეცდომა მომხმარებელი ვერ დარეგისტრირდა გთხოვთ ცადოთ ხელახლა",
          });
        });
    });
  });
});

app.post("/login", (req, res) => {
  const { username, gmail, password } = req.body;

  User.findOne({ username, gmail })
    .then((user) => {
      if (!user) {
        console.log("User not found");
        return res.status(404).json({
          error: "User not found",
          message: "მომხმარებელი ვერ მოიძებნა",
        });
      }

      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            const token = generateToken({
              username: user.username,
            });
            res
              .status(200)
              .json({ message: "შესვლა წარმატებით დასრულდა", token });
          } else {
            res
              .status(401)
              .json({ message: "არასწორი პაროლი ან მეილი და სახელი" });
          }
        })
        .catch((err) => {
          console.error("Error comparing passwords:", err);
          res.status(500).json({ error: "Internal Server Error" });
        });
    })
    .catch((err) => {
      // Error occurred while finding the user
      console.error("Error finding user:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

const cloudinarySecret = process.env.CLOUDINARY_SECRET_KEY;
const cloudinaryKey = process.env.CLOUDINARY_API_KEY;

cloudinary.config({
  cloud_name: "dkjabjayn",
  api_key: cloudinaryKey,
  api_secret: cloudinarySecret,
});

app.post("/loadPosts", async (req, res) => {
  try {
    const posts = await Post.find({});
    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error loading posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  res.send(`Hello if u see this page please leave`);
});

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
