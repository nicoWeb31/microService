import express from 'express';
import { randomBytes } from 'crypto';


const app = express();
app.use(express.json({ limit: "10kb" }));
const posts = {}

app.get('/posts', async (req, res) => {
    res.send(posts);
})

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const {title } = req.body;
    posts[id] = {id, title};

    res.status(201).send(posts[id]);
})

app.listen(4000, ()=>{
    console.log('Listening on port 4000 !')
})