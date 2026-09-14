const express=require("express");
const app=express();
const port=3000;
const {v4:uuidv4 }=require("uuid")
const path=require("path");
var methodOverride = require('method-override')

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'))

let posts = [
    {   id:uuidv4(),
        username: "tech_guru",
        content: "Just deployed my first Express app with EJS templates! Loving backend development."
    },
    {   id:uuidv4(),
        username: "coder_sam",
        content: "Remember to always use path.join(__dirname, 'views') to prevent path resolution bugs."
    },
    {   id:uuidv4(),
        username: "design_daily",
        content: "Minimalist UI design makes the web a better place for everyone."
    },
    {   id:uuidv4(),
        username: "dev_community",
        content: "What's your favorite JavaScript framework in 2026? Drop your thoughts below!"
    }
];


//view post
app.get('/posts',(req,res)=>{
    res.render("index.ejs",{posts});
});

//view new page
app.get('/posts/new',(req,res)=>{
    res.render("new.ejs",{posts});
});

//add post
app.post('/posts', (req, res) => {
    let {id=uuidv4(), username, content } = req.body; 
    posts.push({id, username, content });
    
    res.redirect("/posts"); 
});

//view info page of a perticular user
app.get('/posts/:id',(req, res) => {
    let { id } = req.params; 
    let post= posts.find((p)=>{return id==p.id;});
    res.render("show.ejs",{post})
});

//view edit page of a perticular user
app.get('/posts/:id/edit',(req, res) => {
    let { id } = req.params; 
    let post= posts.find((p)=>{return id==p.id;});
    res.render("edit.ejs",{post})
});

//update perticular content
app.patch('/posts/:id',(req, res) => {
    let { id } = req.params; 
    let newContent = req.body.content;
    let post = posts.find((p)=>{return id==p.id;});
    post.content = newContent;
    res.redirect("/posts")
});

//delete perticular post
app.delete('/posts/:id',(req, res) => {
    let { id } = req.params; 
    posts = posts.filter((p)=>{return id!=p.id;});
    res.redirect("/posts")
});
app.listen(port,()=>{
    console.log(`Listing at port:${port}`)
});

