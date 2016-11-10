// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
   { _id: 7, task: 'Laundry', description: 'Wash clothes' },
   { _id: 27, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
   { _id: 44, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
});

app.get('/api/todos', function index(req, res) {
  res.json({ todos: todos });
});

app.post('/api/todos', function create(req, res) {
  var newTodo = req.body;
  if (todos.length > 0) {
    newTodo._id = todos[todos.length - 1]._id + 1;
  } else {
    newTodo._id = 1;
  }
  todos.push(newTodo);
  res.json(newTodo);
});

app.get('/api/todos/:id', function show(req, res) {
  var todoId = parseInt(req.params.id);
  var result = todos.filter(function(f) {
    return f._id === todoId;
  })[0];
  res.json(result);
});

app.put('/api/todos/:id', function update(req, res) {
  //var todoId = parseInt(req.params.id);
  var updatedTodo = todos.findIndex(function(element, index) {
    return (element._id === parseInt(req.params.id));
  })
  console.log('updating todo with index', updatedTodo);
  var todoToUpdate = todos[updatedTodo];
  console.log(todoToUpdate);
  res.json(req.params);
});

app.delete('/api/todos/:id', function destroy(req, res) {
  console.log('todos delete', req.params);
     var todoId = req.params.id;
     var deleteTodoIndex = todos.findIndex(function(element, index) {
       return (element._id === parseInt(req.params.id)); //params are strings
     });
     for (var i=0; i < todos.length; i++) {
           if (todos[i]._id == req.params.id) {
            var todoToDelete = todos[i];
            todos.splice(todos[i], 1);
            res.json(todoToDelete);
            break;
         }
    }
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
