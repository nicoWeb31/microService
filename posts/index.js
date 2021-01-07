import express from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';
import morgan from 'morgan';
import axios from 'axios';


const app = express();
app.use(express.json({ limit: "10kb" }));
app.use(cors());
app.use(morgan("dev"));

const posts = {}

app.get('/posts', async (req, res) => {
    res.send(posts);

})

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const {title } = req.body;
    posts[id] = {id, title};
    
    //send to eventBus
    await axios.post('http://localhost:4006/events',{
        type: 'postCreate',
        data: {id,title},
    })


    res.status(201).send(posts[id]);
})


app.post('/events',(req, res) => {
    console.log('received events',req.body.type);
    res.send({})
})


app.listen(4000, ()=>{
    console.log('Listening on port 4000 !')
})