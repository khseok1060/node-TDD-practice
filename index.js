import express from 'express';
import morgan from 'morgan';

const app = express();

function commonmw (req, res, next) {
    console.log('middlewr');
    next(new Error('error occurred'));
}

function errormw (err, req, res, next) {
    console.log(err.message);
    next();
}

app.use(commonmw);
app.use(errormw);
app.use(morgan('dev'));

app.listen(3000, function(){
    console.log('Server is listening')
})