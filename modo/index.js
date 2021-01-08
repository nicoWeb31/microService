import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(morgan('dev'));





app.listen(4003,()=>{
    console.log("sever modo run on port 4003");
})