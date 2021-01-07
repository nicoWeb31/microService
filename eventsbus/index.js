import express from 'express';
import axios from 'axios';




const app = express();
app.use(express.json());


app.post('/event',(req, res) => {
    const event = req.body;

    axios.post('http://localhost:4000/events',{event})//posts
    axios.post('http://localhost:4005/events',{event})//comments
    axios.post('http://localhost:4001/events',{event})//query service


    res.send({status: 'success'})

})



app.listen(4003,() => {
    console.log('server eventBus work on port 4006');
})