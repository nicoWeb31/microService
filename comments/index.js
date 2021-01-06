import express from "express";
import { randomBytes } from "crypto";
import cors from "cors";
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);

});

app.post("/posts/:id/comments", (req, res) => {
    const commentId = randomBytes(4).toString("hex");
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content: content });

    commentsByPostId[req.params.id] = comments;

    res.status(201).send(comments);
});

app.listen(4005, () => {
    console.log("servise càomments run well on port 4005 !");
});
