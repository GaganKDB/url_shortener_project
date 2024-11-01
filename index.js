const express = require('express');
const { connectToMongoDB } = require('./connect');
const urlRoute = require('./routes/url');
const app = express();
const URL= require("./models/url");
const path= require('path');
const PORT = 8005;

// Middleware to parse JSON bodies
app.use(express.json());

connectToMongoDB('mongodb://localhost:27017/short-url')
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

    // infroming express js that i am using ejs engine for SSR template
app.set("view engine","ejs");
app.set("views",path.resolve("./views")); // all views are in the home.ejs file

app.get("/test",async (req,res)=>{
const allUrls= await URL.findOne({});
return res.render("home",{
    urls:allUrls
});  
});

// Route setup
app.use("/url", urlRoute);

// get request handling
app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    
    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            { $push: { visitHistory: { timestamp: Date.now() } } },  // Ensure timestamp is added correctly
            { new: true } // This returns the updated document
        );

        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error("Error updating visit history:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.listen(PORT, () => {
    console.log(`Server started at the Port: ${PORT}`);
});
