import express from 'express';
import morgan from 'morgan';

const app = express();

function logger (req, res, next) {
    console.log("I'm Logger");
    next();
}

function logger2 (req, res, next) {
    console.log("I'm Logger2");
    next();
}

app.use(logger);
app.use(logger2);
app.use(morgan('dev'));

app.listen(3000, function(){
    console.log('Server is listening')
})