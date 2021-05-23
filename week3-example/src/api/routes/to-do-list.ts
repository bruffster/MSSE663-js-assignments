import express = require('express');

const app = express();


app.route('/tasks')
.get((req, res) => {
  
})
.post();

app.route('/task/:taskId')
.get()
.put()
.delete();

