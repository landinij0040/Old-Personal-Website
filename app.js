//jshint esversion:6
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const _ = require("lodash");
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://admin-isaiah:Isaiah69@cluster0.b9d4n.mongodb.net/testDB",{
	useNewUrlParser: true,
	useUnifiedTopology:true
});
testSchema = new mongoose.Schema({                        // Creating test schema for the database test project
	content: String
});
Test = mongoose.model("Test", testSchema);                // Creating test collection for the database test project
projectSchema = new mongoose.Schema({                     // Creating project schema for the database to hold project title and description
	title: String,
	description: String,
	link: String,
	type: String
});
Project = mongoose.model("Project", projectSchema);       // Creating project collection for the database to hold project title and description

app.get("/", function(req,res){                           // Home page
	res.render("home");
});
app.get("/projects", function(req,res){                   // Projects page
	Project.find(function(err,foundProjects){
		console.log(foundProjects);
		res.render("projects",{
			projects: foundProjects
		});
	});
});
app.get("/data-base-test", function(req,res){             // Data base test page
	Project.findOne({title:"Data Base Test"},function(err,foundProject){
		Test.find(function(err, foundEntries){
			if (!err){
				res.render("DB-test",{
					title:foundProject.title,
					description:foundProject.description,
					entries: foundEntries
				});
			}
		});
	});
});
app.post("/data-base-test",function(req,res){
	postedEntry = new Test({
		content: req.body.newEntry
	}).save();
	console.log("postedEntry "+postedEntry.content);
	res.redirect("/data-base-test");
});
app.listen(process.env.PORT || 3000, function(){
	console.log("Server started on port 3000");
});
