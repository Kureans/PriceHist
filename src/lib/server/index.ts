import { createClient } from '@supabase/supabase-js';
import { SUPABASE_KEY, SUPABASE_URL } from '$env/static/private';
import { type Database } from '$lib/types/supabase';

const client = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);

export async function findProduct(queryTerms: string[]) {
	let dbQueryString = queryTerms.reduce((accumulator, term) => {
		const formattedTerm = `\`${term}\` & `;
		return accumulator.concat(formattedTerm);
	}, '');
	dbQueryString = dbQueryString.slice(0, -2);
	console.log(dbQueryString);
	const { data, error } = await client
		.from('queries')
		.select()
		.textSearch('query_string', dbQueryString);
	if (error) {
		return {'message': 'Error!'};
	}
    console.log(`Data: ${data}`);
	if (data.length === 0) {
		return {'message': 'No Results Found. Would you like to start tracking your new search term?'};
	}

    return { 'queries': data };
}

export async function getPrices(queryId: number) {
	const { data, error } = await client
	.from('prices')
	.select(`
		*,
		queries ( query_string )
	`)
	.eq('query_id', queryId);

    if (error) {
		return {'message': 'Error!'};
	}
    data.forEach(row => {
        console.log(row);
    });

    return {'prices': data};
}

export async function insertQuery(queryString: string|null, excludeString: string|null) {
	if (queryString == null) {
		return {'message': "Error"};
	}
	const dtNow = new Date().toISOString();
	console.log(dtNow);
	const { error } = await client
		.from('queries')
		.insert({
			created_at: dtNow,
			query_string: queryString,
			exclude_string: excludeString
		});
	if (error) {
		return {'message': 'Error'};
	}
	return {'message': 'Successfully started tracking!'};
}