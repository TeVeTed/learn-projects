const
	pg = require('pg'),
	R = require('ramda'),
	cs = 'postgres://postgres:pass@localhost:5432/ydb',
	client = new pg.Client(cs);

client.connect();

const query = {
	text: 'SELECT * FROM cars',
	rowMode: 'array'
};

client.query(query)
	.then(res => {
		const data = res.rows;
		console.log('all data');
		data.forEach(row => console.log(`Id: ${row[0]} Name: ${row[1]} Price: ${row[2]}`));
		console.log('Sorted prices:');

		const
			prices = data.map(x => x[2]),
			sorted = R.sort(R.comparator(R.lt), prices);

		console.log(sorted);
	})
	.finally(() => client.end());
