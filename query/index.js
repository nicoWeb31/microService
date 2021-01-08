import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use((req, res,next) => {

    console.log(req.body)
    next();
})

//
// posts = {
//     'sdfsdfs': {
//         id:'sdfsdfs',
//         title: 'titre du post',
//         comments: [{id:'sdfsdf', content:'tsdfsfsdfsd'}]
//     }
// }
let posts = {};

app.get("/posts", (req, res) => {
    res.send(posts);
});

app.post("/events", (req, res) => {
    console.log(req.body)
    const { type, data } = req.body;
    if (type === "postCreate") {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }
    
    if (type === "CommentCreated") {
        const { id, content, postId, status } = data;
        const post = posts[postId];

        
        post.comments.push({ id, content,status });
    }
    
    
    console.log("🚀 ~ file: index.js ~ line 19 ~ posts", posts)
    res.send({})
});

app.listen(4001, () => {
    console.log("listening on 4001 , query server");
});
