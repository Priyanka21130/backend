const express = require("express");
const app = express();
const port = 8000;
const path = require("path");

const { v4:uuidv4} =require('uuid');


app.use(express.urlencoded({extended:true}));


app.set("views engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts =[
    {
        id:uuidv4(),
        username:"pihuworld",
        content:"I love coding"
    },
    {
        id:uuidv4(),
        
        username:"priyanka",
        content:"Hard work is important to achieve success!"
    },
    {
        id:uuidv4(),
        username:"Khushi",
        content:"I got selected in my 1st intership!"
    }
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
   let {username,content} = req.body;
   let id =uuidv4();
   posts.push({id, username,content});
   res.redirect("/posts");
    
});

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id === p.id);
    console.log(id);
    res.render("show.ejs", {post});
     
 });

 app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=>id === p.id);
    post.content = newContent;
    console.log(post);
    res.send("patch is working");
 });

 app.get("post/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id === p.id);
    res.render("edit.ejs",{post});
 });


app.listen(port, ()=>{
    console.log("listening to port:8000");
});