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
const multer = require("multer");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

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
  return jwt.sign({ username: user.username, userType: user.userType }, secretKey, {
    expiresIn: "2h",
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const cloudinarySecret = process.env.CLOUDINARY_SECRET_KEY;
const cloudinaryKey = process.env.CLOUDINARY_API_KEY;

cloudinary.config({
  cloud_name: "dlqlkwvk2",
  api_key: cloudinaryKey,
  api_secret: cloudinarySecret,
});


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
        userType: 'member',
        saves: []
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
              userType: user.userType
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

app.post("/uploadPosts", upload.single("image"), (req, res) => {
  const { title, description, date } = req.body;

  const imagePathInUploads = req.file ? req.file.path : null;


  // Upload the image to Cloudinary
  cloudinary.uploader.upload(
    imagePathInUploads,
    { folder: "upload_recipes" },
    (error, result) => {
      if (error) {
        console.error("Error uploading image to Cloudinary:", error);
        return res.status(500).send("Internal Server Error");
      }

      const newPost = new Post({
        img: result.secure_url,
        description: description,
        title: title,
        date: date,
      });

      newPost
        .save()
        .then(() => {
          console.log("New Recipe added successfully");
          res.status(200).json({ message: "ახალი რეცეპტი წარმატებულად დაემატა" });
        })
        .catch((err) => {
          console.error("Error adding new post:", err);
          res.status(500).json({ message: "Internal Server Error" });
        });
    }
  );
});

app.post("/loadPosts", async (req, res) => {
  try {
    const posts = await Post.find({});
    // console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error loading posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/deletePost", async (req, res) => {
  const postId = req.body.postId; // Assuming you're sending the postId from the frontend

  try {
    // Delete the post from MongoDB
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Delete the image from Cloudinary
    const publicId = deletedPost.img.split("/").pop().split(".")[0]; // Extract publicId from Cloudinary URL
    await cloudinary.uploader.destroy(publicId);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  res.send(`Hello if u see this page please leave`);
});

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
