import express from "express";
import cors from "cors";
import morgan from "morgan";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use((req, res, next) => {
    console.log(req.body);
    next();
});

//
// posts = {
//     'sdfsdfs': {
//         id:'sdfsdfs',
//         title: 'titre du post',
//         comments: [{id:'sdfsdf', content:'tsdfsfsdfsd'}]
//     }
// }
let posts = {};

const handleEvent = (type, event) => {
    if (type === "postCreate") {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }

    if (type === "CommentCreated") {
        const { id, content, postId, status } = data;
        const post = posts[postId];

        post.comments.push({ id, content, status });
    }

    if (type === "commentUpdated") {
        const { id, content, status, postId } = data;
        const post = posts[postId];
        const comment = post.comments.find((comment) => {
            return comment.id === id;
        });

        comment.status = status;
        comment.content = content;
    }
};

app.get("/posts", (req, res) => {
    res.send(posts);
});

app.post("/events", (req, res) => {
    console.log(req.body);
    const { type, data } = req.body;

    handleEvent(type, data);

    res.send({});
});

app.listen(4001, async() => {
    console.log("listening on 4001 , query server");
    const res = await axios.get('http://localhost:4005/events');

    for(let event of res.data){
        console.log('processing event:', event.type)
        handleEvent(event.type,event.data)
    }

});
