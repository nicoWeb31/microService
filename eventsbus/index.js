import express from 'express';
import axios from 'axios';
import morgan from 'morgan';




const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
    console.log(req.body);
    next();
});


app.post('/events',async(req, res) => {

    try {
        const event = req.body;
        console.log(event)
    
        await axios.post('http://localhost:4000/events',event)//posts
        await axios.post('http://localhost:4005/events',event)//comments
        await axios.post('http://localhost:4001/events',event)//query service
        await axios.post('http://localhost:4003/events',event)//modo service



    
    
        res.send({status: 'success'})
        
    } catch (error) {
        console.log(error)
    }

})



app.listen(4006,() => {
    console.log('server eventBus work on port 4006');
})