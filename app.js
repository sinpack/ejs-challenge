//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// Load the full build.
const _ = require('lodash');

const homeStartingContent = "Ora che ho perso la vista ci vedo di più"
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui."
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
var posts = [];
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//Call at the specified route the "html" file we need to view through its filename - HOME PAGE
app.get("/", function(req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });
});

//Call at the specified route the "html" file we need to view through its filename - ABOUT PAGE
app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});

//Call at the specified route the "html" file we need to view through its filename - ABOUT PAGE
app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
});

//Call at the specified route the "html" file we need to view through its filename - ABOUT PAGE
app.get("/compose", function(req, res) {
  res.render("compose");
});


//Click the button to redirect to the ABOUT page section
app.post("/compose", function(req, res) {
  let post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function(req, res) {
  var requestedTitle = _.lowerCase([req.params.postName]); //XRHSIMOPOIW TH LODASH vivliothiki gia na kanw mikra ta grammata kai me keno
  posts.forEach(function(post) {
    console.log(posts);
    console.log(post);
    const storedTitle = _.lowerCase(post.title);
    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    };
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
