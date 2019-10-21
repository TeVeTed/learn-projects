const
    express = require('express'),
    bodyParser = require('body-parser'),
    db = require('./queries'),
    app = express(),
    port = 3000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.get('/', (request, response) => {
   response.json({ info: 'Node.js, Express, and Postgres API'});
});
app.get(   '/users',     db.getUsers   );
app.get(   '/users/:id', db.getUserById);
app.post(  '/users',     db.createUser );
app.put(   '/users/:id', db.updateUser );
app.delete('/users/:id', db.deleteUser );

app.listen(port, () => console.log(`App running on port ${port}.`));