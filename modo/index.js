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

app.post("/events", async (req, res) => {
    const { type, data : dataI } = req.body;

    if (type === "CommentCreated") {
        const status = dataI.content.includes("cono") ? "rejected" : "approved";

        const data = {
            id: dataI.id,
            postId: dataI.postId,
            status,
            content: dataI.content
            // status: status,
            // ...req.body,
        };
        console.log("🚀 ~ file: index.js ~ line 27 ~ app.post ~ data", data)

        await axios.post("http://localhost:4006/events", {
            type: "commentModerated",
            data,
        });
    }

    res.send({})
});

app.listen(4003, () => {
    console.log("sever modo run on port 4003");
});
