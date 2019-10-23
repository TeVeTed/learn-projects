const
	pg = require('pg'),
	cs = 'postgres://postgres:pass@localhost:5432/ydb',
	client = new pg.Client(cs);

client.connect();

client.query('SELECT * FROM cars')
	.then(res => {
		const fields = res.fields.map(field => field.name);

		console.log(fields);
	})
	.catch(err => console.log(err))
	.finally(() => client.end());
