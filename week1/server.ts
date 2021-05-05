import  express = require('express');
var app = express();

function serve(req: any, res:any): void {
    res.send('Hello world!!!');
}

app.use('/', serve);

app.listen(8000, function () {
    console.log('Running Server...');
});