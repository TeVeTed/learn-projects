const
	todosController = require('../controllers').todos,
	todoItemsController = require('../controllers').todoItems;

const home = (req, res) => {
	return res.status(200).send({
		message: 'Welcome to the Todos API!'
	});
};

const unknown = (req, res) => {
	return res.status(405).send({
		message: 'Method Not Allowed'
	});
};

module.exports = app => {
	app.get(   '/api',                                 home                       );
	app.get(   '/api/todos',                           todosController.list       );
	app.post(  '/api/todos',                           todosController.create     );
	app.get(   '/api/todos/:todoId',                   todosController.retrieve   );
	app.put(   '/api/todos/:todoId',                   todosController.update     );
	app.delete('/api/todos/:todoId',                   todosController.destroy    );
	app.post(  '/api/todos/:todoId/items',             todoItemsController.create );
	app.all(   '/api/todos/:todoId/items',             unknown                    );
	app.put(   '/api/todos/:todoId/items/:todoItemId', todoItemsController.update );
	app.delete('/api/todos/:todoId/items/:todoItemId', todoItemsController.destroy);
};