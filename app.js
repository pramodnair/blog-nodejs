const express = require("express");
const bodyParser = require("body-parser");

const app = express()

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("welcome", {version: "1"});
});

app.listen(3000, ()=> {
    console.log("Server up and running!");
})
