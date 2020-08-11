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
	content: String,
	date: String,
	time: String,
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

app.get("/linkedin", function(req, res){                // To my Linkedin page
	res.redirect("https://www.linkedin.com/in/isaiah-landin-401a431a3/");
});
app.get("/source", function(req, res){
	res.redirect("https://github.com/landinij0040/Resume");
});

app.get("/projects", function(req,res){                   // Projects page
	Project.find(function(err,foundProjects){
		res.render("projects",{
			projects: foundProjects
		});
	});
});
app.get("/data-base-test", function(req,res){             // Data base test page
	dateCheck = new Date();
	check = (dateCheck.getUTCHours() - 6) + ":" + dateCheck.getUTCMinutes();
	if(check == "11:29"){
		console.log("deleting stuff");
		Test.deleteMany({}, function(err, result){
			if(!err){
				console.log("Deleted Everything");
			}
		});
	}
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
	//Finding the date using UTC
	date = new Date();
	dateString = date.getUTCMonth()+1 +"/"+date.getUTCDate()+"/"+date.getFullYear();
	if(date.getUTCMinutes().toString().length == 1){
	 minutes = "0"+date.getUTCMinutes().toString();
	}else{
		minutes = date.getUTCMinutes().toString();
	}
	time = date.getHours() + ":" + minutes;
	postedEntry = new Test({
		content: req.body.newEntry,
		date: dateString,
		time: time
	}).save();
	res.redirect("/data-base-test");
});
app.post("/data-base-test-delete",function(req,res){
	Test.deleteMany({},function(err){
		if(err){
			console.log(err);
		}
	});
	res.redirect("/data-base-test");
});


app.listen(process.env.PORT || 3000, function(){
	console.log("Server started on port 3000");
});
