const
	pg = require('pg'),
	R = require('ramda'),
	cs = 'postgres://postgres:pass@localhost:5432/ydb';

async function fetchNow() {
	const client = new pg.Client(cs);

	try {
		await client.connect();

		const result = await client.query('SELECT now()');

		return R.prop('now', R.head(result.rows));
	} finally {
		client.end();
	}
}

fetchNow()
	.then(now => console.log(now));
