//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");


mongoose.connect("mongodb+srv://lonely:12345@cluster0.wk0dk.mongodb.net/Blogger", function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connection set up successfully...");
  }
})

const BloggerSchema = ({
  Title: String,
  Post: String
})

const Blogs = mongoose.model("Blog", BloggerSchema);


const homeStartingContent = "Welocme to the best blogging applications out there! Open to Brainstorming and writing!";
const aboutContent = "";
const contactContent = "Contact me at: ishanhere24810@gmail.com | 9661208312";

var Posts = [];



const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get('/', (req, res) => {

  Blogs.find({},function (err, blog) {

    res.render('home', {

      Content: homeStartingContent,
      Contents: blog

    })


  });

});



app.get('/about', (req, res) => {

  res.render('about', { AboutContent: aboutContent });

});

app.get('/contact', (req, res) => {


  res.render('contact', { ContactContent: contactContent });


});

app.get('/compose', (req, res) => {

  res.render('compose', {});

});

app.post('/compose', (req, res) => {

  var newTitle = req.body.titleblog;
  var NewBlog = req.body.newblog;

  var Blogn = new Blogs({
    Title: newTitle,
    Post: NewBlog
  })

  Blogn.save();

  res.redirect('/');



});


app.get('/posts/:postID', (req, res) => {

  var requestedID = req.params.postID;

  Blogs.findOne({_id:requestedID},function (err, blog) {


    res.render("post",{
      title: blog.Title,
      post : blog.Post
    })
   
  })

});


app.listen(3005, function () {
  console.log("Server started on port 3005...");
});
