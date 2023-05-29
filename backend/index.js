const express = require("express");
const cors  = require("cors");
const env = require("dotenv");
const app = express();

env.config({path:__dirname + "/env/.env"});
const port = 3001;

const submissionRoutes = require("./routes/submission");

app.use(cors());
app.use("/submit",submissionRoutes);

app.all("/*",(req,res)=>{
    res.send("page not found");
});

app.listen(port, ()=>{
    console.log("running on port " + port);
});