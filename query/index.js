import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//
// posts = {
//     'sdfsdfs': {
//         id:'sdfsdfs',
//         title: 'titre du post',
//         comments: [{id:'sdfsdf', content:'tsdfsfsdfsd'}]
//     }
// }
const posts = {};

app.get("/posts", (req, res) => {});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  if (type === "postCreate") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId } = data;
    const post = posts[id];

    post.comments.push({ id, content });
  }
});

app.listen(4001, () => {
  console.log("listening on 4001 , query server");
});
