import express from 'express';
const app = express();

function logger (req, res, next) {
    console.log("I'm Logger");
    next();
}

app.use(logger);

app.listen(3000, function(){
    console.log('Server is listening')
})