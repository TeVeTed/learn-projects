const
	express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	helmet = require('helmet'),
	compression = require('compression'),
	rateLimit = require('express-rate-limit'),
	{ body, check } = require('express-validator'),
	{ pool } = require('./config');

const app = express();

const
	isProduction = process.env.NODE_ENV === 'production',
	origin = {
		origin: isProduction ? 'https://www.example.com' : '*'
	};

const
	limiter = rateLimit({
		windowMs: 60000,
		max: 5
	}),
	postLimiter = rateLimit({
		windowMs: 60000,
		max: 1
	});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(origin));
app.use(compression());
app.use(helmet());
app.use(limiter);

const getBooks = (request, response) => {
	pool.query('SELECT * FROM books', (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
};

const addBook = (request, response) => {
	const errors = validationResult(request);
	if (!errors.isEmpty()) {
		return response.status(422).json({ errors: errors.array() });
	}

	const { author, title } = request.body;

	pool.query('INSERT INTO books (author, title) VALUES ($1, $2)', [author, title], error => {
		if (error) {
			throw error;
		}
		response.status(201).json({ status: 'success', message: 'Book added.' });
	});
};

app
	.route('/books')
	.get(getBooks)
	.post(
		[
			check('author')
				.not()
				.isEmpty()
				.isLength({ min: 5, max: 255 })
				.trim(),
			check('title')
				.not()
				.isEmpty()
				.isLength({ min: 5, max: 255 })
				.trim()
		],
		postLimiter,
		addBook
	);

app.listen(process.env.PORT || 3002, () => console.log('Server listening'));
