const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogs");

const postSchema = mongoose.Schema({
  title: String,
  content: String,
});

const Post = mongoose.model("Post", postSchema);

const defaultPost = [
  {
    title: "Start Blogging",
    content:
      "Welcome Blogger!! Click on compose to start your blogging journey...",
  },
];

app.get("/", (req, res) => {
  Post.find({}, (err, posts) => {
    console.log(posts);
    if (posts.length !== 0) {
      res.render("welcome", { posts: posts });
    } else {
      res.render("welcome", { posts: defaultPost });
    }
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const title = _.lowerCase(req.body.title);
  const content = req.body.content;
  const post = new Post({
    title: title,
    content: content,
  });
  if (!title || !content) {
    res.redirect("/compose");
  } else {
    post.save();
    res.redirect("/");
  }
});

app.get("/posts/:title", (req, res) => {
  const title = _.lowerCase(req.params.title);
  console.log(title);
  Post.findOne({ title: title }, (err, post) => {
    if (post) {
      res.render("post", { post: post });
    } else {
      res.render("error", { title: title });
    }
  });
});

app.post("/posts/delete", (req, res) => {
  console.log(req.body.params);
});

app.listen(3000, () => {
  console.log("Server up and running!");
});
