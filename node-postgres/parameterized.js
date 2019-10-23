const
	pg = require('pg'),
	cs = 'postgres://postgres:pass@localhost:5432/ydb',
	client = new pg.Client(cs);

client.connect();

const
	sql = 'SELECT * FROM cars WHERE price > $1',
	values = [50000];

client.query(sql, values)
	.then(res => {
		const data = res.rows;
		data.forEach(row => console.log(row));
	})
	.finally(() => client.end());
