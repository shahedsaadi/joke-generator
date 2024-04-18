import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res)=>{
   res.render("index.ejs");
})

app.post("/submit", async(req,res)=>{
   const userName = req.body["name"];
   try {
    const result = await axios.get("https://v2.jokeapi.dev/joke/Any?type=single");
    res.render("index.ejs", {
      name: userName,
      joke: result.data.joke,
      category: result.data.category
    });
   }catch(error){
       console.log(error.response.data);
       res.status(500);
   }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });