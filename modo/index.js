import express from "express";
import morgan from "morgan";
import axios from "axios";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
    console.log("body : ", req.body);
    next();
});


app.post('/events', async (req, res)=>{
    
})

app.listen(4003, () => {
    console.log("sever modo run on port 4003");
});
